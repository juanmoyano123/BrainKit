/**
 * PDF Store
 *
 * Zustand store for managing PDF upload and processing state.
 * Handles PDF file upload, text extraction, and concept generation.
 */

import { create } from 'zustand';
import { useAuthStore } from './authStore';
import type { MnemonicTechnique, MnemonicGenerationMetadata } from './mnemonicStore';

/**
 * PDF Upload Response Interface
 */
export interface PDFUploadResponse {
  extracted_concepts: string[];
  concept_count: number;
  mnemonics: {
    acrostic: MnemonicTechnique;
    story: MnemonicTechnique;
    visual: MnemonicTechnique;
  };
  metadata: MnemonicGenerationMetadata;
}

/**
 * PDF Processing State Interface
 */
interface PDFState {
  // State
  isUploading: boolean;
  uploadProgress: number;
  extractedConcepts: string[];
  pdfResult: PDFUploadResponse | null;
  error: string | null;

  // Actions
  uploadAndProcess: (file: File, deckId: string) => Promise<PDFUploadResponse>;
  selectAndGenerateFlashcards: (
    generationId: string,
    selectedType: 'acrostic' | 'story' | 'visual',
    deckId: string
  ) => Promise<{ flashcard_count: number }>;
  reset: () => void;
  setError: (error: string | null) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * PDF Store
 */
export const usePDFStore = create<PDFState>((set) => ({
  // Initial state
  isUploading: false,
  uploadProgress: 0,
  extractedConcepts: [],
  pdfResult: null,
  error: null,

  // Upload and process PDF
  uploadAndProcess: async (file: File, deckId: string) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    // Validate file
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('Only PDF files are supported');
    }

    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      throw new Error(`File is too large. Maximum size is ${maxSizeMB}MB`);
    }

    set({ isUploading: true, uploadProgress: 0, error: null });

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('deck_id', deckId);

      // Simulate progress (actual progress would need XHR)
      set({ uploadProgress: 30 });

      const response = await fetch(`${API_BASE_URL}/api/v1/pdf/upload-and-generate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      set({ uploadProgress: 70 });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { detail: 'Server error' };
        }

        if (response.status === 413) {
          throw new Error('File is too large. Maximum size is 10MB');
        }

        if (response.status === 415) {
          throw new Error('Only PDF files are supported');
        }

        if (response.status === 403) {
          throw new Error(errorData.detail || 'You have reached your monthly generation limit');
        }

        if (response.status === 504) {
          throw new Error('Processing is taking too long. Please try a smaller PDF.');
        }

        throw new Error(errorData.detail || 'Failed to process PDF');
      }

      const result: PDFUploadResponse = await response.json();

      set({
        isUploading: false,
        uploadProgress: 100,
        extractedConcepts: result.extracted_concepts,
        pdfResult: result,
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process PDF';
      set({
        isUploading: false,
        uploadProgress: 0,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Select mnemonic and generate flashcards
  selectAndGenerateFlashcards: async (
    generationId: string,
    selectedType: 'acrostic' | 'story' | 'visual',
    deckId: string
  ) => {
    const { session } = useAuthStore.getState();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    set({ isUploading: true, error: null });

    try {
      const formData = new FormData();
      formData.append('generation_id', generationId);
      formData.append('selected_type', selectedType);
      formData.append('deck_id', deckId);

      const response = await fetch(`${API_BASE_URL}/api/v1/pdf/select-and-generate-flashcards`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate flashcards');
      }

      const result = await response.json();

      set({ isUploading: false });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate flashcards';
      set({
        isUploading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  // Reset state
  reset: () => {
    set({
      isUploading: false,
      uploadProgress: 0,
      extractedConcepts: [],
      pdfResult: null,
      error: null,
    });
  },

  // Set error
  setError: (error) => set({ error }),
}));
