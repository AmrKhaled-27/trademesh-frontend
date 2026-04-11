import React from 'react';
import { Typography } from '../../../components/Typography';

export const Orders = () => {
  return (
    <div>
      <Typography variant="h2" className="mb-4">
        Orders
      </Typography>
      <div className="bg-surface-container-low p-8 rounded-lg shadow-sm">
        <Typography variant="body-md" className="text-secondary">
          Fulfill and manage your recent transactions.
        </Typography>
      </div>
    </div>
  );
};
