import { apiClient } from './client';

/**
 * Wallet API definitions targeting the /wallet endpoints.
 */
export const walletApi = {
  /**
   * Deposits money into the wallet.
   * @param {Object} payload
   * @param {number} payload.amount
   * @param {string} payload.cardNumber
   * @param {string} payload.cvv
   * @param {string} payload.expiryDate
   * @returns {Promise<any>}
   */
  depositWallet: async (payload) => {
    return apiClient('/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Withdraws money from the wallet.
   * @param {Object} payload
   * @param {number} payload.amount
   * @param {string} payload.bankAccountNumber
   * @returns {Promise<any>}
   */
  withdrawWallet: async (payload) => {
    return apiClient('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
