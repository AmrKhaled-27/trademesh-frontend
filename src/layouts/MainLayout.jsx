import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

/**
 * Standard global layout containing the top navigation and centering the content area.
 * Appropriate for standard user browsing (like `Home` and `Market` routes).
 * @returns {JSX.Element}
 */
export const MainLayout = () => {
  return (
    <>
      <Navbar isAuthBlock={false} />
      <div className="min-h-screen bg-surface pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};
