import { apiClient } from './client';

export const getApiKeys = async () => {
  return apiClient('/api-keys', {
    method: 'GET',
  });
};

export const createApiKey = async (data) => {
  return apiClient('/api-keys', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const revokeApiKey = async (id) => {
  return apiClient(`/api-keys/${id}`, {
    method: 'DELETE',
  });
};
