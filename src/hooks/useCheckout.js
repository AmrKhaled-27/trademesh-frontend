import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutApi } from '../api/checkout';

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutApi.processCheckout,
    onSuccess: () => {
      // Invalidate relevant queries to refresh data after a successful checkout
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['products', 'me'] });
    },
  });
};
