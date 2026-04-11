import { apiClient } from './client';

/**
 * Authentication API endpoints mapped back to backend routes.
 */
export const authApi = {
  /**
   * Signs up a new user.
   * @param {Object} data - The user registration data.
   * @returns {Promise<any>}
   */
  signup: async (data) => {
    return apiClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Logs a user in, initiating the auth flow.
   * @param {Object} data - The login credentials (email, password).
   * @returns {Promise<any>}
   */
  login: async (data) => {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Verifies the 2FA OTP code using a temporary token.
   * @param {string} otp - The 6-digit OTP code.
   * @param {string} tempToken - Short-lived token for verification.
   * @returns {Promise<any>}
   */
  verifyOTP: async (otp, tempToken) => {
    return apiClient('/auth/verify-2fa', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
      body: JSON.stringify({ otp }),
    });
  },

  /**
   * Requests a resent OTP email for verification.
   * @param {string} tempToken - Short-lived token for verification.
   * @returns {Promise<any>}
   */
  resendOTP: async (tempToken) => {
    return apiClient('/auth/resend-otp', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });
  },
};
