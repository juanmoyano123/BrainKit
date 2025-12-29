/**
 * PDFUploadModal Component
 *
 * Modal for uploading a PDF file and extracting learning content.
 */

import React, { useState, useRef, useCallback } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FileUp, X, FileText, Loader2 } from 'lucide-react';
import { usePDFStore } from '@/stores/pdfStore';
import type { PDFUploadResponse } from '@/stores/pdfStore';

interface PDFUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  deckId: string;
  onSuccess: (result: PDFUploadResponse) => void;
}

export const PDFUploadModal: React.FC<PDFUploadModalProps> = ({
  isOpen,
  onClose,
  deckId,
  onSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadAndProcess, isUploading, uploadProgress, error, reset, setError } = usePDFStore();

  const handleFileSelect = useCallback(
    (file: File) => {
      // Validate file type
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setError('Only PDF files are supported');
        return;
      }

      // Validate file size (10MB max)
      const maxSizeMB = 10;
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File is too large. Maximum size is ${maxSizeMB}MB`);
        return;
      }

      setSelectedFile(file);
      setError(null);
    },
    [setError]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await uploadAndProcess(selectedFile, deckId);
      onSuccess(result);
      handleClose();
    } catch (err) {
      // Error is already set in the store and displayed in the UI (line 119-123)
      console.error('PDF upload failed:', err);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    reset();
    onClose();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Import from PDF">
      <div className="space-y-4">
        {/* Instructions */}
        <p className="text-sm text-gray-600">
          Upload a PDF file to automatically extract key concepts and generate flashcards.
        </p>

        {/* Error display */}
        {error && (
          <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
            <p className="text-sm text-error-800">{error}</p>
          </div>
        )}

        {/* File drop zone */}
        {!selectedFile && !isUploading && (
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileUp className="w-10 h-10 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 mb-2">
              Drag and drop your PDF here, or{' '}
              <button
                type="button"
                className="text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        )}

        {/* Selected file */}
        {selectedFile && !isUploading && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="w-8 h-8 text-primary-600" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Upload progress */}
        {isUploading && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Processing PDF...</p>
                <p className="text-xs text-gray-500">
                  Extracting concepts and generating mnemonics
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-center text-gray-500">
              This may take a minute depending on the PDF size
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-2">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            isLoading={isUploading}
          >
            <FileUp className="w-4 h-4 mr-2" />
            Process PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};
