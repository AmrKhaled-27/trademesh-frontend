import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { StudioLayout } from './layouts/StudioLayout';

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { OTP } from './pages/OTP';

import { Market } from './pages/market';
import { ProductDetails } from './pages/product-details';
import Home from './pages/home/index';
import { Wallet } from './pages/studio/wallet';
import { Inventory } from './pages/studio/inventory';
import { Analytics } from './pages/studio/analytics';
import { Transactions } from './pages/studio/transactions';
import { APIKey } from './pages/studio/api-key';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
        </Route>

        {/* MAIN APP (MARKET + HOME + DETAILS) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />

          {/* PRODUCT DETAILS */}
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>

        {/* STUDIO DASHBOARD */}
        <Route
          path="/studio"
          element={
            <ProtectedRoute>
              <StudioLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/studio/inventory" replace />} />

          <Route path="wallet" element={<Wallet />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="api-key" element={<APIKey />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
