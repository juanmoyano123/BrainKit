/**
 * CreateDeckModal Component
 *
 * Modal for creating a new deck.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

const createDeckSchema = z.object({
  name: z
    .string()
    .min(1, 'Deck name is required')
    .max(100, 'Deck name must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
});

type CreateDeckFormData = z.infer<typeof createDeckSchema>;

interface CreateDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description?: string) => Promise<void>;
}

export const CreateDeckModal: React.FC<CreateDeckModalProps> = ({
  isOpen,
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
  } = useForm<CreateDeckFormData>({
    resolver: zodResolver(createDeckSchema),
  });

  const handleFormSubmit = async (data: CreateDeckFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(data.name, data.description);
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create deck');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Deck">
      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-sm text-error-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Deck Name *
          </label>
          <Input
            id="name"
            placeholder="e.g., ACLS Medications"
            error={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <Textarea
            id="description"
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
            Create Deck
          </Button>
        </div>
      </form>
    </Modal>
  );
};
