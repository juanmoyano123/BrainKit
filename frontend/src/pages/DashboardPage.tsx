/**
 * Dashboard Page V2
 *
 * Main dashboard with new Emerald design system and progress tracking.
 * Implements F-002: Deck Creation & Management
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Target, Layers, TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useDeckStore, type Deck } from '@/stores/deckStore';
import { Button } from '@/components/ui/Button';
import { DeckCard } from '@/components/deck/DeckCard';
import { CreateDeckModal } from '@/components/deck/CreateDeckModal';
import { EditDeckModal } from '@/components/deck/EditDeckModal';
import { DeleteDeckModal } from '@/components/deck/DeleteDeckModal';
import { EmptyDeckState } from '@/components/deck/EmptyDeckState';
import { Toast } from '@/components/ui/Toast';
import { StreakBadge } from '@/components/progress/StreakBadge';
import { StatCard } from '@/components/progress/StatCard';
import { WeeklyProgress, type DayData } from '@/components/progress/WeeklyProgress';

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

  // Mock stats data (will be replaced with real data from backend)
  const mockStats = {
    streak: 12,
    cardsDue: 24,
    cardsStudiedThisWeek: 156,
    retentionRate: 87,
    weeklyData: [
      { day: 'Mon', value: 20 },
      { day: 'Tue', value: 25 },
      { day: 'Wed', value: 18 },
      { day: 'Thu', value: 30 },
      { day: 'Fri', value: 22 },
      { day: 'Sat', value: 28 },
      { day: 'Sun', value: 13 },
    ] as DayData[],
    weeklyGoal: 25,
  };

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

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Student';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">BrainKit</h1>
            </div>

            <div className="flex items-center gap-4">
              <StreakBadge count={mockStats.streak} size="sm" />
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {displayName[0].toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Stats */}
        <div className="bg-gradient-hero rounded-3xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            {/* Welcome Message */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {displayName}!
              </h2>
              <p className="text-gray-600 mb-4">
                Keep up the great work with your flashcard learning
              </p>
              {decks.length > 0 && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Deck
                </Button>
              )}
            </div>

            {/* Large Streak Badge */}
            <div>
              <StreakBadge count={mockStats.streak} size="lg" variant="active" />
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <StatCard
              icon={Target}
              value={mockStats.cardsDue}
              label="Cards Due Today"
              iconBg="accent"
            />
            <StatCard
              icon={Layers}
              value={mockStats.cardsStudiedThisWeek}
              label="Studied This Week"
              iconBg="primary"
            />
            <StatCard
              icon={TrendingUp}
              value={`${mockStats.retentionRate}%`}
              label="Retention Rate"
              meta="+3% vs last week"
              trend="up"
              iconBg="success"
            />
          </div>

          {/* Weekly Progress */}
          <WeeklyProgress
            data={mockStats.weeklyData}
            goal={mockStats.weeklyGoal}
          />
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

        {/* Decks Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Your Decks</h3>
            {decks.length > 0 && (
              <Button variant="secondary" size="sm" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Deck
              </Button>
            )}
          </div>

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
