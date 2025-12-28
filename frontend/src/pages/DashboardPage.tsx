/**
 * Dashboard Page
 *
 * Main dashboard for authenticated users.
 * This is a placeholder that will be expanded in future features.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.display_name || user?.email?.split('@')[0]}!
          </h2>
          <p className="text-gray-600">Your personalized AI-powered flashcard learning dashboard</p>
        </div>

        {/* Email Verification Banner */}
        {user && !user.email_confirmed_at && (
          <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <p className="text-sm text-warning-800 font-medium">Please verify your email</p>
            <p className="text-xs text-warning-700 mt-1">
              We sent a verification email to {user.email}. Please check your inbox and click the
              link to verify your account.
            </p>
          </div>
        )}

        {/* Profile Info Card */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Display Name</p>
                <p className="text-sm font-medium text-gray-900">
                  {profile?.display_name || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subscription</p>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {profile?.subscription_tier || 'Free'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="text-sm font-medium text-gray-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
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

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full" disabled>
                Create New Deck
              </Button>
              <Button variant="secondary" className="w-full" disabled>
                Browse Decks
              </Button>
              <Button variant="secondary" className="w-full" disabled>
                Start Studying
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">Coming soon in next features</p>
            </div>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8">
          <Card className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">More features coming soon!</h3>
            <p className="text-gray-600 mb-4">
              We're building AI-powered flashcard generation, spaced repetition algorithms, and
              mnemonic techniques to help you learn faster.
            </p>
            <p className="text-sm text-gray-500">
              Feature F-001 (User Authentication) is complete. Stay tuned for F-002 (Deck
              Management)!
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};
