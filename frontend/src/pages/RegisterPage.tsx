/**
 * Registration Page
 *
 * Implements user registration with:
 * - Email/password form with validation
 * - Google OAuth option
 * - Password strength indicator
 * - Error handling for all scenarios
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, User as UserIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';

/**
 * Registration form validation schema
 */
const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[0-9]/, 'Password must contain at least 1 number')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter'),
  displayName: z.string().max(100, 'Display name must be less than 100 characters').optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { initialize } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // Validate on change for password strength indicator
  });

  const password = watch('password');

  /**
   * Handle email/password registration
   */
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName || data.email.split('@')[0],
          },
        },
      });

      if (authError) {
        // Handle duplicate email error (Scenario 3)
        if (
          authError.message.includes('already registered') ||
          authError.message.includes('already exists')
        ) {
          throw new Error('An account with this email already exists');
        }
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create account. Please try again.');
      }

      // Show success message (Scenario 1)
      setSuccess(true);

      // Initialize auth store
      await initialize();

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Google OAuth registration
   */
  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initiate Google OAuth flow (Scenario 2)
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        throw authError;
      }

      // OAuth redirect will happen automatically
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Google sign up failed. Please try again.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600">Start studying smarter with AI-powered flashcards</p>
        </div>

        <Card className="p-8">
          {/* Success Banner (Scenario 1) */}
          {success && (
            <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
              <p className="text-sm text-success-800 font-medium">Account created successfully!</p>
              <p className="text-xs text-success-700 mt-1">
                Please check your email to verify your account. Redirecting to dashboard...
              </p>
            </div>
          )}

          {/* Error Banner (Scenarios 3 & 4) */}
          {error && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <p className="text-sm text-error-800 font-medium">{error}</p>
              {error.includes('already exists') && (
                <Link
                  to="/login"
                  className="text-xs text-error-700 underline hover:text-error-800 mt-1 inline-block"
                >
                  Sign in instead
                </Link>
              )}
            </div>
          )}

          {/* Google OAuth Button (Scenario 2) */}
          <Button
            type="button"
            variant="secondary"
            className="w-full mb-6"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name <span className="text-gray-400">(optional)</span>
              </label>
              <Input
                id="displayName"
                type="text"
                placeholder="Dr. Sarah"
                icon={<UserIcon className="w-5 h-5" />}
                error={!!errors.displayName}
                {...register('displayName')}
              />
              {errors.displayName && (
                <p className="mt-1 text-sm text-error-600">{errors.displayName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="sarah@hospital.org"
                icon={<Mail className="w-5 h-5" />}
                error={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <PasswordInput
                id="password"
                placeholder="Create a secure password"
                error={!!errors.password}
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
              )}

              {/* Password Strength Indicator (Scenario 4) */}
              {password && <PasswordStrengthIndicator password={password} className="mt-3" />}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" isLoading={isLoading} disabled={success}>
              {success ? 'Account Created' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </Card>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By creating an account, you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};
