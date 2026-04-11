import { Link } from 'react-router-dom';

/**
 * TradeMesh Logo component acting as a Home link.
 * @param {Object} props - Component props.
 * @param {string} [props.className=''] - Additional CSS classes for spacing or sizing constraints.
 * @returns {JSX.Element}
 */
export const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <img src="/favicon.svg" alt="TradeMesh Logo" className="w-8 h-8" />
      <span className="font-display font-bold text-xl tracking-tight text-on-surface">
        TradeMesh
      </span>
    </Link>
  );
};
