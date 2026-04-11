import { apiClient } from './client';

/**
 * User API definitions targeting the /users endpoints.
 */
export const userApi = {
  /**
   * Fetches the current logged-in user profile utilizing the HTTP bearer token.
   * @returns {Promise<any>}
   */
  getCurrentUser: async () => {
    return apiClient('/users/me', {
      method: 'GET',
    });
  },
};
