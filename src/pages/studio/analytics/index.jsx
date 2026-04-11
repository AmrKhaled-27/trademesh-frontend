import React from 'react';
import { Typography } from '../../../components/Typography';

export const Analytics = () => {
  return (
    <div>
      <Typography variant="h2" className="mb-4">
        Analytics
      </Typography>
      <div className="bg-surface-container-low p-8 rounded-lg shadow-sm">
        <Typography variant="body-md" className="text-secondary">
          Track sales and customer engagement.
        </Typography>
      </div>
    </div>
  );
};
