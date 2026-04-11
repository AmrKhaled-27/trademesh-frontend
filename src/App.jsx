import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { StudioLayout } from './layouts/StudioLayout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { OTP } from './pages/OTP';
import { Home } from './pages/Home/';
import { Dashboard } from './pages/studio/dashboard';
import { Inventory } from './pages/studio/inventory';
import { Analytics } from './pages/studio/analytics';
import { Orders } from './pages/studio/orders';
import { Settings } from './pages/studio/settings';

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
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Home />} />
        </Route>

        <Route
          path="/studio"
          element={
            <ProtectedRoute>
              <StudioLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/studio/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
