import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../api/products';

/**
 * Query hook to fetch current user's products.
 */
export const useMyProductsQuery = (options = {}) => {
  return useQuery({
    queryKey: ['myProducts'],
    queryFn: productsApi.getMyProducts,

    ...options,
  });
};

/**
 * Mutation hook to create a product.
 */
export const useCreateProductMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
    ...options,
  });
};

/**
 * Mutation hook to update a product.
 */
export const useUpdateProductMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => productsApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
    ...options,
  });
};

/**
 * Mutation hook to delete a product.
 */
export const useDeleteProductMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
    ...options,
  });
};
/**
 * Query hook to fetch all products with filters.
 */
export const useProductsQuery = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.getAllProducts(filters),
    ...options,
  });
};

/**
 * Query hook to fetch a single product's details.
 */
export const useProductDetailsQuery = (id, options = {}) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
    ...options,
  });
};
