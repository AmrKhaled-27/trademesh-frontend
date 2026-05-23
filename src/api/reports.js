import { apiClient } from './client';

export const reportsApi = {
  getFinancialSummary: async () => {
    return apiClient('/reports/financial-summary');
  },

  getSalesChart: async (days = 30) => {
    return apiClient(`/reports/sales-chart?days=${days}`);
  },

  getTopProducts: async () => {
    return apiClient('/reports/top-products');
  },
};
