import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Typography } from './Typography';
import { useCheckoutMutation } from '../hooks/useCheckout';
import { useCurrentUserQuery } from '../hooks/useUser';
import { Wallet, CheckCircle } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, product, onSuccess }) => {
  const checkoutMutation = useCheckoutMutation();
  const { data: userResponse, isLoading: isLoadingUser } = useCurrentUserQuery();
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) return null;

  const user = userResponse?.data?.user;
  const balance = user?.balance || 0;
  const productPrice = Number(product.price);
  const hasEnoughBalance = balance >= productPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasEnoughBalance) {
      setError('Insufficient balance. Please deposit funds into your wallet.');
      return;
    }

    try {
      await checkoutMutation.mutateAsync({
        productId: product.id,
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Checkout failed. Please try again.');
    }
  };

  const handleClose = () => {
    setError('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Confirm Purchase">
      {isSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <Typography variant="h3" className="text-on-surface mb-2">
              Purchase Successful!
            </Typography>
            <Typography variant="body" className="text-secondary">
              Your order has been placed successfully.
            </Typography>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 bg-surface-container p-4 rounded-xl flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/100x100?text=No+Image';
                }}
              />
            </div>
            <div className="flex-1">
              <Typography variant="body" className="font-semibold text-on-surface line-clamp-1">
                {product.name}
              </Typography>
              <Typography variant="body-sm" className="text-secondary">
                {product.brand || 'No Brand'}
              </Typography>
            </div>
            <div className="text-right">
              <Typography variant="h4" className="text-primary font-display font-bold">
                $
                {productPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </div>
          </div>

          <div className="mb-6 border border-surface-dim rounded-xl p-4">
            <Typography
              variant="body-sm"
              className="text-secondary uppercase tracking-wider font-bold mb-3 flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" /> Payment Method
            </Typography>

            {isLoadingUser ? (
              <div className="h-6 w-32 bg-surface-dim animate-pulse rounded" />
            ) : (
              <div className="flex justify-between items-end">
                <div>
                  <Typography variant="body" className="text-on-surface font-medium">
                    TradeMesh Wallet
                  </Typography>
                  <Typography variant="body-sm" className="text-secondary mt-1">
                    Available Balance:{' '}
                    <span className="font-bold text-on-surface">
                      ${Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </Typography>
                </div>
                {!hasEnoughBalance && (
                  <Typography variant="body-sm" className="text-red-500 font-bold">
                    Insufficient Funds
                  </Typography>
                )}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <Button variant="secondary" onClick={handleClose} className="flex-1" type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                type="submit"
                disabled={checkoutMutation.isPending || !hasEnoughBalance || isLoadingUser}
              >
                {checkoutMutation.isPending ? 'Processing...' : 'Confirm Purchase'}
              </Button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};
