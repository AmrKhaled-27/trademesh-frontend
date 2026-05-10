import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '../api/transactions';

/**
 * Query hook to fetch current user's transactions.
 */
export const useMyTransactionsQuery = (options = {}) => {
  return useQuery({
    queryKey: ['myTransactions'],
    queryFn: transactionsApi.getMyTransactions,
    ...options,
  });
};
