/**
 * Dashboard Page
 *
 * Main dashboard for authenticated users showing their decks.
 * Implements F-002: Deck Creation & Management
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useDeckStore, type Deck } from '@/stores/deckStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DeckCard } from '@/components/deck/DeckCard';
import { CreateDeckModal } from '@/components/deck/CreateDeckModal';
import { EditDeckModal } from '@/components/deck/EditDeckModal';
import { DeleteDeckModal } from '@/components/deck/DeleteDeckModal';
import { EmptyDeckState } from '@/components/deck/EmptyDeckState';
import { Toast } from '@/components/ui/Toast';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuthStore();
  const { decks, loading, error, fetchDecks, createDeck, updateDeck, deleteDeck, clearError } =
    useDeckStore();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch decks on mount
  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setToast({ message: 'Logout failed. Please try again.', type: 'error' });
    }
  };

  const handleCreateDeck = async (name: string, description?: string) => {
    const newDeck = await createDeck(name, description);
    setToast({ message: 'Deck created successfully', type: 'success' });
    // Navigate to new deck detail page
    navigate(`/decks/${newDeck.id}`);
  };

  const handleEditDeck = async (deckId: string, name: string, description?: string) => {
    await updateDeck(deckId, name, description);
    setToast({ message: 'Deck updated successfully', type: 'success' });
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setToast({ message: 'Deck deleted', type: 'success' });
  };

  const openEditModal = (deck: Deck) => {
    setSelectedDeck(deck);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (deck: Deck) => {
    setSelectedDeck(deck);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">BrainKit</h1>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.display_name || user?.email?.split('@')[0]}!
            </h2>
            <p className="text-gray-600">Your AI-powered flashcard learning dashboard</p>
          </div>
          {decks.length > 0 && (
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Create Deck
            </Button>
          )}
        </div>

        {/* Email Verification Banner */}
        {user && !user.email_confirmed_at && (
          <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <p className="text-sm text-warning-800 font-medium">Please verify your email</p>
            <p className="text-xs text-warning-700 mt-1">
              We sent a verification email to {user.email}. Please check your inbox.
            </p>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
            <p className="text-sm text-error-800">{error}</p>
            <button onClick={clearError} className="text-xs text-error-600 underline mt-1">
              Dismiss
            </button>
          </div>
        )}

        {/* Deck Grid or Empty State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" />
          </div>
        ) : decks.length === 0 ? (
          <EmptyDeckState onCreateDeck={() => setIsCreateModalOpen(true)} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {decks.map((deck) => (
              <DeckCard
                key={deck.id}
                deck={deck}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}

        {/* Profile Summary Card - collapsed to bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subscription</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {profile?.subscription_tier || 'Free'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Generation Quota</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Used this month</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {profile?.generation_count_monthly || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quota limit</p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.subscription_tier === 'premium' ? 'Unlimited' : '100 / month'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateDeckModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateDeck}
      />

      <EditDeckModal
        isOpen={isEditModalOpen}
        deck={selectedDeck}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDeck(null);
        }}
        onSubmit={handleEditDeck}
      />

      <DeleteDeckModal
        isOpen={isDeleteModalOpen}
        deck={selectedDeck}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedDeck(null);
        }}
        onConfirm={handleDeleteDeck}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
