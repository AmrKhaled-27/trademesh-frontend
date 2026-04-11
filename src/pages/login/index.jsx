import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../hooks/useAuth';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLoginMutation({
    onSuccess: (response) => {
      navigate(`/otp?tempToken=${response.data.tempToken}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const errorMessage = loginMutation.isError
    ? loginMutation.error.response?.data?.message ||
      loginMutation.error.message ||
      'Failed to login'
    : null;

  return (
    <div className="w-full">
      <div className="mb-8">
        <Typography variant="h2" className="text-on-surface mb-2">
          Welcome Back
        </Typography>
        <Typography variant="body-md" className="text-secondary">
          Please enter your credentials to access your account.
        </Typography>
      </div>

      {errorMessage && <div className="mb-4 text-red-500 font-medium">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="EMAIL ADDRESS"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <Input
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-6 py-4"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Loading...' : 'Login'}
        </Button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-4">
        <span className="h-px bg-surface-dim w-full"></span>
      </div>

      <div className="mt-8 text-center">
        <Typography variant="body-sm" className="text-secondary inline">
          New to the network?{' '}
        </Typography>
        <button
          onClick={() => navigate('/signup')}
          className="text-primary font-bold text-sm hover:underline cursor-pointer"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};
