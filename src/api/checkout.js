import { apiClient } from './client';

/**
 * Checkout API definitions.
 */
export const checkoutApi = {
  /**
   * Processes a checkout for a product using the user's internal wallet.
   * @param {Object} data
   * @param {string} data.productId
   * @returns {Promise<any>}
   */
  processCheckout: async (data) => {
    return apiClient('/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
