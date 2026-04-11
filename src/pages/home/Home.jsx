import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <header className="mb-12 text-center w-full max-w-4xl mx-auto flex flex-col items-start bg-surface-container-low p-8 rounded-md shadow-sm">
        <Typography variant="h1" className="text-primary mb-2">
          TradeMesh Marketplace
        </Typography>
        <Typography variant="body-md" className="text-secondary">
          Welcome to your new architectural digital space.
        </Typography>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-surface-container-lowest p-8 rounded-md shadow-ambient text-center flex flex-col justify-center items-center h-64 border-t-4 border-primary">
          <Typography variant="h2" className="mb-4">
            Discover Products
          </Typography>
          <Typography variant="body-md" className="text-secondary mb-6">
            Browse our top-quality architectural materials.
          </Typography>
          <Button variant="primary" onClick={() => navigate('/market')}>
            Go to Feed
          </Button>
        </section>

        <section className="bg-surface-container-lowest p-8 rounded-md shadow-ambient text-center flex flex-col justify-center items-center h-64 border-t-4 border-secondary">
          <Typography variant="h2" className="mb-4">
            Manage Inventory
          </Typography>
          <Typography variant="body-md" className="text-secondary mb-6">
            Add, edit, or remove items from your catalog.
          </Typography>
          <Button variant="secondary" className="border" onClick={() => navigate('/studio')}>
            {' '}
            Open Inventory
          </Button>
        </section>
      </main>
    </div>
  );
};
