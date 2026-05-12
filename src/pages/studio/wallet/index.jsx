import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { useCurrentUserQuery } from '../../../hooks/useUser';
import { walletApi } from '../../../api/wallet';

export const Wallet = () => {
  const queryClient = useQueryClient();
  const { data: userData, isLoading: isUserLoading } = useCurrentUserQuery();
  const balance = userData?.data?.user?.balance ?? 0;

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Forms state
  const [depositForm, setDepositForm] = useState({
    amount: '',
    cardNumber: '',
    cvv: '',
    expiryDate: '',
  });
  const [withdrawForm, setWithdrawForm] = useState({ amount: '', bankAccountNumber: '' });

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const closeModals = () => {
    setIsDepositOpen(false);
    setIsWithdrawOpen(false);
    setDepositForm({ amount: '', cardNumber: '', cvv: '', expiryDate: '' });
    setWithdrawForm({ amount: '', bankAccountNumber: '' });
    resetMessages();
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    resetMessages();

    try {
      await walletApi.depositWallet({
        ...depositForm,
        amount: Number(depositForm.amount),
      });
      setSuccess('Deposit successful!');
      queryClient.invalidateQueries(['currentUser']);
      setTimeout(closeModals, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Deposit failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    resetMessages();

    try {
      await walletApi.withdrawWallet({
        ...withdrawForm,
        amount: Number(withdrawForm.amount),
      });
      setSuccess('Withdrawal successful!');
      queryClient.invalidateQueries(['currentUser']);
      setTimeout(closeModals, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Withdrawal failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Typography variant="h2">Wallet</Typography>

      <div className="bg-surface-container border border-white/5 rounded-2xl p-6 max-w-sm">
        <Typography variant="label" className="text-secondary opacity-70 mb-2 block">
          Wallet Balance
        </Typography>
        <Typography variant="h2" className="font-display font-bold text-primary mb-6">
          {isUserLoading
            ? '$---'
            : `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
        </Typography>

        <div className="flex gap-4">
          <Button
            variant="primary"
            className="flex-1 py-2 text-sm"
            onClick={() => {
              closeModals();
              setIsDepositOpen(true);
            }}
          >
            Deposit
          </Button>
          <Button
            variant="secondary"
            className="flex-1 py-2 text-sm"
            onClick={() => {
              closeModals();
              setIsWithdrawOpen(true);
            }}
          >
            Withdraw
          </Button>
        </div>
      </div>

      <Modal isOpen={isDepositOpen} onClose={closeModals} title="Deposit to Wallet">
        <form onSubmit={handleDeposit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded text-sm">
              {success}
            </div>
          )}

          <Input
            label="Amount ($)"
            type="number"
            min="1"
            required
            value={depositForm.amount}
            onChange={(e) => setDepositForm({ ...depositForm, amount: e.target.value })}
          />
          <Input
            label="Card Number"
            type="text"
            required
            value={depositForm.cardNumber}
            onChange={(e) => setDepositForm({ ...depositForm, cardNumber: e.target.value })}
          />
          <div className="flex gap-4">
            <Input
              label="Expiry Date (MM/YY)"
              type="text"
              required
              value={depositForm.expiryDate}
              onChange={(e) => setDepositForm({ ...depositForm, expiryDate: e.target.value })}
            />
            <Input
              label="CVV"
              type="text"
              required
              value={depositForm.cvv}
              onChange={(e) => setDepositForm({ ...depositForm, cvv: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            disabled={isLoading || success}
          >
            {isLoading ? 'Processing...' : 'Deposit'}
          </Button>
        </form>
      </Modal>

      <Modal isOpen={isWithdrawOpen} onClose={closeModals} title="Withdraw from Wallet">
        <form onSubmit={handleWithdraw} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded text-sm">
              {success}
            </div>
          )}

          <Input
            label="Amount ($)"
            type="number"
            min="1"
            required
            value={withdrawForm.amount}
            onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
          />
          <Input
            label="Bank Account Number"
            type="text"
            required
            value={withdrawForm.bankAccountNumber}
            onChange={(e) =>
              setWithdrawForm({ ...withdrawForm, bankAccountNumber: e.target.value })
            }
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            disabled={isLoading || success}
          >
            {isLoading ? 'Processing...' : 'Withdraw'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
