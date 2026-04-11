import React from 'react';
import { Typography } from '../../../components/Typography';

export const Inventory = () => {
  return (
    <div>
      <Typography variant="h2" className="mb-4">
        Inventory
      </Typography>
      <div className="bg-surface-container-low p-8 rounded-lg shadow-sm">
        <Typography variant="body-md" className="text-secondary">
          Manage your materials and catalog.
        </Typography>
      </div>
    </div>
  );
};
