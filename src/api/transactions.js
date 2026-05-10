import { apiClient } from './client';

/**
 * Transactions API definitions.
 */
export const transactionsApi = {
  /**
   * Retrieves a list of all transactions where the authenticated user is either the sender or the receiver.
   * @returns {Promise<{ success: boolean, data: Array }>}
   */
  getMyTransactions: async () => {
    return apiClient('/transactions/me', {
      method: 'GET',
    });
  },
};
