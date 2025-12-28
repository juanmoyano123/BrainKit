/**
 * EditDeckModal Component
 *
 * Modal for editing a deck's name and description.
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import type { Deck } from '@/stores/deckStore';

const editDeckSchema = z.object({
  name: z
    .string()
    .min(1, 'Deck name is required')
    .max(100, 'Deck name must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
});

type EditDeckFormData = z.infer<typeof editDeckSchema>;

interface EditDeckModalProps {
  isOpen: boolean;
  deck: Deck | null;
  onClose: () => void;
  onSubmit: (deckId: string, name: string, description?: string) => Promise<void>;
}

export const EditDeckModal: React.FC<EditDeckModalProps> = ({
  isOpen,
  deck,
  onClose,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditDeckFormData>({
    resolver: zodResolver(editDeckSchema),
  });

  // Reset form when deck changes
  useEffect(() => {
    if (deck) {
      reset({
        name: deck.name,
        description: deck.description || '',
      });
    }
  }, [deck, reset]);

  const handleFormSubmit = async (data: EditDeckFormData) => {
    if (!deck) return;

    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(deck.id, data.name, data.description);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update deck');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Deck">
      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-sm text-error-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
            Deck Name *
          </label>
          <Input
            id="edit-name"
            placeholder="e.g., ACLS Medications"
            error={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <Textarea
            id="edit-description"
            placeholder="e.g., Emergency cardiac drug protocols"
            rows={3}
            error={!!errors.description}
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
