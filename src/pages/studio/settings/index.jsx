import React from 'react';
import { Typography } from '../../../components/Typography';

export const Settings = () => {
  return (
    <div>
      <Typography variant="h2" className="mb-4">
        Settings
      </Typography>
      <div className="bg-surface-container-low p-8 rounded-lg shadow-sm">
        <Typography variant="body-md" className="text-secondary">
          Configure your studio and account preferences.
        </Typography>
      </div>
    </div>
  );
};
