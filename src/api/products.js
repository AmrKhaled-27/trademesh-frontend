import { apiClient } from './client';

/**
 * Product API definitions.
 */
export const productsApi = {
  /**
   * Fetches products owned or bought by the current user.
   * @returns {Promise<{ products: Array }>}
   */
  getMyProducts: async () => {
    return apiClient('/products/me', {
      method: 'GET',
    });
  },

  /**
   * Creates a new product.
   * @param {Object} productData
   * @returns {Promise<any>}
   */
  createProduct: async (productData) => {
    return apiClient('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  /**
   * Updates an existing product.
   * @param {string|number} id
   * @param {Object} productData
   * @returns {Promise<any>}
   */
  updateProduct: async (id, productData) => {
    return apiClient(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    });
  },

  /**
   * Deletes a product.
   * @param {string|number} id
   * @returns {Promise<any>}
   */
  deleteProduct: async (id) => {
    return apiClient(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};
