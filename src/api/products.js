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

  /**
   * Bulk uploads products via CSV file.
   * @param {File} file - CSV file containing product data.
   * @returns {Promise<any>}
   */
  bulkUploadProducts: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient('/products/bulk', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Fetches all products with optional filters.
   * @param {Object} filters - Search and brand filters.
   * @returns {Promise<Array>}
   */
  getAllProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.brand) params.append('brand', filters.brand);

    const queryString = params.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    return apiClient(endpoint, {
      method: 'GET',
    });
  },
  /**
   * Fetches a single product by ID.
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  getProductById: async (id) => {
    return apiClient(`/products/${id}`, {
      method: 'GET',
    });
  },
};
