import React from 'react';
import { Typography } from '../../../components/Typography';
import { Table } from '../../../components/Table';
import { useMyTransactionsQuery } from '../../../hooks/useTransactions';
import { useCurrentUserQuery } from '../../../hooks/useUser';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingBag,
  Package,
  History,
  CheckCircle2,
  Loader2,
  TrendingUp,
  TrendingDown,
  User,
} from 'lucide-react';

/**
 * Transactions Page
 * Displays a detailed table of all monetary movements for the current user.
 */
export const Transactions = () => {
  const { data: userData } = useCurrentUserQuery();
  const { data: transactionsData, isLoading, error } = useMyTransactionsQuery();

  const userId = userData?.data?.user?.id;
  const transactions = transactionsData?.data.transactions || [];

  const columns = [
    {
      key: 'type',
      label: 'Transaction',
      render: (t) => {
        const isReceiver = t.receiverId === userId;
        const isSender = t.senderId === userId;

        let icon = <History size={18} />;
        let label = 'Transaction';
        let sublabel = t.type.replace('_', ' ');

        if (t.type === 'deposit') {
          icon = <TrendingUp size={18} className="text-green-500" />;
          label = 'Wallet Deposit';
          sublabel = 'Added funds';
        } else if (t.type === 'withdraw') {
          icon = <TrendingDown size={18} className="text-red-500" />;
          label = 'Wallet Withdrawal';
          sublabel = 'Removed funds';
        } else if (t.type === 'selling_operation') {
          if (isReceiver) {
            icon = <Package size={18} className="text-emerald-500" />;
            label = 'Sold Item';
            sublabel = t.product?.name || 'Product';
          } else {
            icon = <ShoppingBag size={18} className="text-blue-500" />;
            label = 'Purchase';
            sublabel = t.product?.name || 'Product';
          }
        }

        return (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-surface-container-high rounded-lg">{icon}</div>
            <div className="flex flex-col">
              <span className="font-semibold text-on-surface leading-tight">{label}</span>
              <span className="text-xs text-secondary capitalize">{sublabel}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'party',
      label: 'Entity',
      render: (t) => {
        const isReceiver = t.receiverId === userId;
        const otherParty = isReceiver ? t.sender : t.receiver;

        if (!otherParty) {
          return (
            <div className="flex items-center gap-2 text-secondary italic">
              <Wallet size={14} />
              <span className="text-sm">Personal Wallet</span>
            </div>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={12} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-on-surface">{otherParty.name}</span>
              <span className="text-[10px] text-secondary leading-none">{otherParty.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (t) => {
        const isReceiver = t.receiverId === userId;
        const isPositive = isReceiver;

        return (
          <div className="flex flex-col items-end">
            <span
              className={`font-display font-bold text-lg ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {isPositive ? '+' : '-'}${Number(t.amount).toFixed(2)}
            </span>
          </div>
        );
      },
    },
    {
      key: 'date',
      label: 'Date & Time',
      render: (t) => {
        const date = new Date(t.createdAt);
        return (
          <div className="flex flex-col">
            <span className="text-sm text-on-surface">
              {date.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-[10px] text-secondary">
              {date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: () => (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
          <CheckCircle2 size={12} />
          Settled
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <Typography variant="body-md" className="text-secondary animate-pulse">
          Loading your financial history...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
        <Typography variant="h3" className="text-red-700 mb-2">
          Failed to load transactions
        </Typography>
        <Typography variant="body-md" className="text-red-600 mb-4">
          {error.message || 'An unexpected error occurred while fetching your data.'}
        </Typography>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary text-on-primary rounded-2xl shadow-lg shadow-primary/20">
            <History size={28} />
          </div>
          <div>
            <Typography variant="display-sm" className="text-on-surface font-bold">
              Transaction History
            </Typography>
            <Typography variant="body-md" className="text-secondary">
              Monitor your financial activities, sales, and purchases in one place.
            </Typography>
          </div>
        </div>
      </div>

      {/* Stats Summary could be added here in the future */}

      {/* Transactions Table Section */}
      <section className="bg-surface rounded-3xl border border-surface-container-high overflow-hidden shadow-sm">
        <div className="p-6 border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-2">
            <Typography variant="h3" className="text-on-surface">
              Recent Activity
            </Typography>
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold">
              {transactions.length}
            </span>
          </div>
        </div>

        <div className="p-2">
          <Table
            columns={columns}
            data={transactions}
            emptyMessage="No transactions found. Your financial movements will appear here once you make a deposit, withdrawal, or complete a sale."
          />
        </div>
      </section>
    </div>
  );
};
