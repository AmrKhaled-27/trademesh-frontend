import React, { useState } from 'react';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { Modal } from '../../../components/Modal';
import {
  useApiKeysQuery,
  useCreateApiKeyMutation,
  useRevokeApiKeyMutation,
} from '../../../hooks/useAPIKeys';
import {
  Key,
  Plus,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export const APIKey = () => {
  const { data: apiKeysData, isLoading, error } = useApiKeysQuery();
  const createMutation = useCreateApiKeyMutation();
  const revokeMutation = useRevokeApiKeyMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState(null);
  const [keyName, setKeyName] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreateKey = (e) => {
    e.preventDefault();
    createMutation.mutate(
      { name: keyName },
      {
        onSuccess: (response) => {
          const data = response?.data || response;
          setNewKeyData(data);
          setIsCreateModalOpen(false);
          setIsSuccessModalOpen(true);
          setKeyName('');
        },
      },
    );
  };

  const handleRevokeKey = (id) => {
    if (
      window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')
    ) {
      revokeMutation.mutate(id);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const columns = [
    {
      key: 'name',
      label: 'Key Name',
      render: (key) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Key size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-on-surface">{key.name}</span>
            <span className="text-xs text-secondary font-mono">ID: {key.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created Date',
      render: (key) => (
        <div className="flex items-center gap-2 text-secondary">
          <Calendar size={14} />
          <span className="text-sm">{new Date(key.createdAt).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (key) => (
        <div className="flex items-center justify-end">
          <button
            onClick={() => handleRevokeKey(key.id)}
            className="p-2 text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
            title="Revoke Key"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const apiKeys = apiKeysData?.data?.apiKeys || apiKeysData?.data || apiKeysData || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <Typography variant="body-md" className="text-secondary animate-pulse">
          Loading your API keys...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-2xl border border-red-100 text-center max-w-2xl mx-auto">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <Typography variant="h3" className="text-red-700 mb-2">
          Something went wrong
        </Typography>
        <Typography variant="body-md" className="text-red-600 mb-6">
          {error.message || 'We could not load your API keys at this time.'}
        </Typography>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-4">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={20} />
            <Typography variant="label" className="text-primary">
              Security & Integration
            </Typography>
          </div>
          <Typography variant="display-md" className="text-on-surface">
            API Keys
          </Typography>
          <Typography variant="body-lg" className="text-secondary max-w-xl">
            Manage your keys to authenticate requests to the Trademesh API from your external
            applications. Keep these keys safe.
          </Typography>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          Generate New Key
        </Button>
      </div>

      {/* Main Table Section */}
      <section className="bg-surface_container_lowest rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Typography variant="h3">Active Keys</Typography>
            <span className="px-2 py-0.5 bg-surface-container-high text-secondary rounded text-xs font-bold">
              {apiKeys?.length || 0}
            </span>
          </div>
        </div>
        <Table
          columns={columns}
          data={apiKeys || []}
          emptyMessage="You haven't generated any API keys yet. Create one to get started with the Trademesh API."
        />
      </section>

      {/* Documentation Link */}
      <div className="p-8 bg-surface-container-low rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <ExternalLink className="text-primary" size={24} />
          </div>
          <div>
            <Typography variant="h3" className="mb-1">
              Developer Documentation
            </Typography>
            <Typography variant="body-md" className="text-secondary">
              Learn how to integrate Trademesh into your workflow with our API.
            </Typography>
          </div>
        </div>
        <Button variant="secondary" className="bg-white hover:bg-gray-50 border-none shadow-sm">
          View Docs
        </Button>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Generate New API Key"
      >
        <form onSubmit={handleCreateKey} className="space-y-6">
          <div className="space-y-2">
            <Typography variant="body-md" className="text-secondary">
              Give your key a descriptive name so you know where it's being used.
            </Typography>
            <Input
              label="Key Name"
              placeholder="e.g. Production Mobile App"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 py-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 py-4"
              disabled={createMutation.isPending || !keyName.trim()}
            >
              {createMutation.isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Create Key'
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Success Modal (The "One-Time" view) */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Key Successfully Generated"
      >
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 rounded-xl flex gap-3 border border-emerald-100">
            <AlertCircle className="text-emerald-600 flex-shrink-0" size={20} />
            <Typography variant="body-sm" className="text-emerald-800">
              This is the only time your full API key will be shown. Please copy it and store it
              safely.
            </Typography>
          </div>

          <div className="space-y-2">
            <Typography variant="label" className="text-secondary">
              API KEY
            </Typography>
            <div className="relative group">
              <div className="w-full bg-surface-container-highest px-4 py-4 rounded-xl font-mono text-sm break-all pr-12 border border-surface-container-high">
                {newKeyData?.key}
              </div>
              <button
                onClick={() => copyToClipboard(newKeyData?.key)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-surface-container-high transition-all cursor-pointer"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="label" className="text-secondary">
              KEY NAME
            </Typography>
            <Typography variant="body-md" className="font-semibold">
              {newKeyData?.name}
            </Typography>
          </div>

          <Button onClick={() => setIsSuccessModalOpen(false)} className="w-full py-4 mt-4">
            I've saved my key
          </Button>
        </div>
      </Modal>
    </div>
  );
};
