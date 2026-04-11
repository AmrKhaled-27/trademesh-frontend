import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';

/**
 * Mutation hook for logging in.
 * @param {Object} [options] - Additional react-query mutation options.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useLoginMutation = (options) => {
  return useMutation({
    mutationFn: authApi.login,
    ...options,
  });
};

/**
 * Mutation hook for signing up a new user.
 * @param {Object} [options] - Additional react-query mutation options.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useSignupMutation = (options) => {
  return useMutation({
    mutationFn: authApi.signup,
    ...options,
  });
};

/**
 * Mutation hook for verifying a 2FA OTP.
 * @param {Object} [options] - Additional react-query mutation options.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useVerifyOtpMutation = (options) => {
  return useMutation({
    mutationFn: ({ otpString, tempToken }) => {
      return authApi.verifyOTP(otpString, tempToken);
    },
    ...options,
  });
};

/**
 * Mutation hook for resending an OTP code.
 * @param {Object} [options] - Additional react-query mutation options.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useResendOtpMutation = (options) => {
  return useMutation({
    mutationFn: (tempToken) => {
      return authApi.resendOTP(tempToken);
    },
    ...options,
  });
};
