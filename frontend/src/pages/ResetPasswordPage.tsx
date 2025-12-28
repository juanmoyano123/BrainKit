/**
 * Reset Password Page
 *
 * Allows users to set a new password using the reset link from email.
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';

/**
 * Reset password form validation schema
 */
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const password = watch('password');

  /**
   * Check if user has a valid recovery session
   */
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setHasSession(true);
      } else {
        setError('Invalid or expired reset link. Please request a new password reset.');
      }
    };

    checkSession();
  }, []);

  /**
   * Handle password reset
   */
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (updateError) {
        throw updateError;
      }

      // Show success
      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('token') || err.message.includes('expired')) {
          setError('Your reset link has expired. Please request a new password reset.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set new password</h1>
          <p className="text-gray-600">Choose a strong password to secure your account</p>
        </div>

        <Card className="p-8">
          {/* Success Banner */}
          {success && (
            <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
              <p className="text-sm text-success-800 font-medium">Password reset successful!</p>
              <p className="text-xs text-success-700 mt-1">Redirecting to login...</p>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <p className="text-sm text-error-800 font-medium">{error}</p>
              {error.includes('expired') && (
                <a
                  href="/forgot-password"
                  className="text-xs text-error-700 underline hover:text-error-800 mt-1 inline-block"
                >
                  Request new reset link
                </a>
              )}
            </div>
          )}

          {/* Reset Password Form */}
          {hasSession && !success && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <PasswordInput
                  id="password"
                  placeholder="Create a secure password"
                  error={!!errors.password}
                  autoFocus
                  {...register('password')}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
                )}

                {/* Password Strength Indicator */}
                {password && <PasswordStrengthIndicator password={password} className="mt-3" />}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  error={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Reset Password
              </Button>
            </form>
          )}

          {/* Invalid Session State */}
          {!hasSession && !error && (
            <div className="text-center py-4">
              <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm text-gray-600">Verifying reset link...</p>
            </div>
          )}
        </Card>

        {/* Help Text */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Make sure to choose a password you haven't used before
        </p>
      </div>
    </div>
  );
};
