/**
 * Forgot Password Page
 *
 * Allows users to request a password reset email.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

/**
 * Forgot password form validation schema
 */
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  /**
   * Handle password reset request
   */
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);

      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      // Always show success (don't reveal if email exists)
      setSuccess(true);
    } catch {
      // Always show success for security (prevent email enumeration)
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset your password</h1>
          <p className="text-gray-600">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        <Card className="p-8">
          {success ? (
            // Success State
            <div>
              <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
                <p className="text-sm text-success-800 font-medium">Check your email</p>
                <p className="text-xs text-success-700 mt-1">
                  If an account exists with this email, you will receive a password reset link
                  shortly.
                </p>
              </div>

              <Link to="/login">
                <Button variant="secondary" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Button>
              </Link>

              <p className="mt-4 text-center text-sm text-gray-600">
                Didn't receive an email?{' '}
                <button
                  onClick={() => setSuccess(false)}
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  autoComplete="email"
                  autoFocus
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Send Reset Link
              </Button>

              {/* Back to Login */}
              <Link to="/login">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Button>
              </Link>
            </form>
          )}
        </Card>

        {/* Help Text */}
        <p className="mt-6 text-center text-xs text-gray-500">
          The reset link will expire after 1 hour for security reasons
        </p>
      </div>
    </div>
  );
};
