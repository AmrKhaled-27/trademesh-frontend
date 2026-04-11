import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

/**
 * Authentication layout wrapper for login, signup, and OTP sequences.
 * Renders the page tightly centered in the middle of the viewport
 * and displays the Navbar in minimalist `isAuthBlock={true}` branding mode.
 * @returns {JSX.Element}
 */
export const AuthLayout = () => {
  return (
    <>
      <Navbar isAuthBlock={true} />
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 pt-24">
        <div className="w-full max-w-[31rem] bg-surface-container-lowest p-8 md:p-10 rounded-md shadow-ambient">
          <Outlet />
        </div>
      </div>
    </>
  );
};
