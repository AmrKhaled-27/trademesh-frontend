import React from 'react';
import { Typography } from '../../../components/Typography';

export const Dashboard = () => {
  return (
    <div>
      <Typography variant="h2" className="mb-4">
        Dashboard
      </Typography>
      <div className="bg-surface-container-low p-8 rounded-lg shadow-sm">
        <Typography variant="body-md" className="text-secondary">
          Overview of your storefront.
        </Typography>
      </div>
    </div>
  );
};
