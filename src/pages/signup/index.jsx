import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../hooks/useAuth';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState(null);

  const signupMutation = useSignupMutation({
    onSuccess: (response) => {
      navigate(`/otp?tempToken=${response.data.tempToken}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords don't match");
      return;
    }
    setFormError(null);
    signupMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  const errorMessage =
    formError ||
    (signupMutation.isError
      ? signupMutation.error.response?.data?.message ||
        signupMutation.error.message ||
        'Failed to sign up'
      : null);

  return (
    <div className="w-full">
      <div className="mb-8">
        <Typography variant="h2" className="text-on-surface mb-2">
          Create your account
        </Typography>
        <Typography variant="body-md" className="text-secondary">
          Start your merchant journey with TradeMesh today.
        </Typography>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 font-medium rounded">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="FULL NAME"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="WORK EMAIL"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Input
            label="CONFIRM PASSWORD"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-4 mt-4"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? 'Processing...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-8 pt-8 border-t border-surface-dim text-center">
        <Typography variant="body-sm" className="text-secondary inline">
          Already have an account?{' '}
        </Typography>
        <button
          onClick={() => navigate('/login')}
          className="text-primary font-bold text-sm hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
