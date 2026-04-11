/**
 * Base URL for all backend requests.
 * @constant {string}
 */
export const BASE_URL = 'http://localhost:3000/api';

/**
 * Validates and handles common HTTP application errors.
 * Includes a global interceptor for 401 Unauthorized (forcing logout).
 * @param {Response} response - Fetch API Response.
 * @returns {Promise<any>} Processed JSON data.
 * @throws {Error} Contains Axios-like formatted message details for failures.
 */
export const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'An error occurred');
    error.response = { data };
    throw error;
  }

  return data;
};

/**
 * Universal wrapper for backend HTTP requests appending the `Authorization` header automatically.
 * @param {string} endpoint - The relative endpoint path (e.g. `/auth/login`).
 * @param {RequestInit} [options={}] - Standard Fetch API configuration overrides.
 * @returns {Promise<any>}
 */
export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
};
