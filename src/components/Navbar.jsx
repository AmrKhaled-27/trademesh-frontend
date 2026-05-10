import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Typography } from './Typography';
import { Button } from './Button';
import { useCurrentUserQuery } from '../hooks/useUser';

/**
 * Main application navigation component with balance and auth status logic.
 * @param {Object} props - Component props.
 * @param {boolean} [props.isAuthBlock=false] - Whether to render in minimalist auth mode.
 * @returns {JSX.Element}
 */
export const Navbar = ({ isAuthBlock = false }) => {
  const location = useLocation();

  // We only really need to fetch this if we're not in an auth block.
  const { data: userData, isLoading } = useCurrentUserQuery({
    enabled: !isAuthBlock && !!localStorage.getItem('token'),
  });

  const balance = userData?.data?.user?.balance ?? 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4  backdrop-blur-2xl backdrop-saturate-150 border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="flex items-center space-x-12">
        <Logo />

        {!isAuthBlock && (
          <div className="hidden md:flex space-x-8">
            <Link
              to="/market"
              className={`font-body font-medium text-sm transition-colors ${
                location.pathname === '/market' || location.pathname === '/'
                  ? 'text-primary'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              Market
            </Link>
            <Link
              to="/studio"
              className={`font-body font-medium text-sm transition-colors ${
                location.pathname.startsWith('/studio')
                  ? 'text-primary'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              Seller Studio
            </Link>
          </div>
        )}
      </div>

      {!isAuthBlock && (
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <Typography variant="label" className="text-secondary opacity-70">
              Wallet Balance
            </Typography>
            <Typography variant="body-md" className="font-display font-bold text-primary">
              $2,450.00
            </Typography>
          </div>
          <div className="w-px h-8 bg-surface-container-low mx-4 hidden md:block"></div>
          <Button
            variant="secondary"
            className="hidden md:flex py-2 px-4 shadow-none bg-surface-container-low text-xs"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};
