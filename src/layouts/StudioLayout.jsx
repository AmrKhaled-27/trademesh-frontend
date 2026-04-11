import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LayoutDashboard, Archive, TrendingUp, ShoppingCart, Settings } from 'lucide-react';
import { Typography } from '../components/Typography';

/**
 * Highly structured Seller Studio layout enforcing the sticky sidebar methodology.
 * Designed to hold independent dashboard, inventory, and analytics sections separately from the market.
 * @returns {JSX.Element}
 */
export const StudioLayout = () => {
  const navItems = [
    { name: 'Dashboard', path: '/studio/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', path: '/studio/inventory', icon: Archive },
    { name: 'Analytics', path: '/studio/analytics', icon: TrendingUp },
    { name: 'Orders', path: '/studio/orders', icon: ShoppingCart },
    { name: 'Settings', path: '/studio/settings', icon: Settings },
  ];

  return (
    <>
      <Navbar isAuthBlock={false} />
      <div className="min-h-screen bg-surface pt-24 pb-12 px-8 flex gap-8">
        {/* Sidenav positioned entirely at the left matching Navbar padding */}
        <aside className="w-64 shrink-0 flex flex-col pt-2 pr-4 border-r border-surface-container-low hidden md:flex sticky top-24 h-[calc(100vh-8rem)]">
          <Typography variant="h3" className="mb-1 text-on-surface">
            Seller Studio
          </Typography>
          <Typography variant="label" className="text-secondary mb-8">
            Verified Merchant
          </Typography>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium transition-colors ${
                    isActive
                      ? 'bg-[#ecfdf5] text-primary' // Light emerald background
                      : 'text-secondary hover:bg-[#ecfdf5] hover:text-primary'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
};
