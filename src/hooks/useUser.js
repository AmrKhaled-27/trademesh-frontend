import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user';

/**
 * Query hook to fetch the current authenticated user's profile.
 * Automatically disabled if no token is found in localStorage.
 * @param {Object} [options={}] - Additional react-query query options.
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export const useCurrentUserQuery = (options = {}) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userApi.getCurrentUser(),
    enabled: !!token, // Only run the query if a token exists
    ...options,
  });
};
