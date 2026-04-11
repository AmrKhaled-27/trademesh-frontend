import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyOtpMutation } from '../hooks/useAuth';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';

export const OTP = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tempToken = searchParams.get('tempToken');

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [formError, setFormError] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Check if token exists, otherwise redirect to login
    if (!tempToken) {
      navigate('/login');
    }
  }, [navigate, tempToken]);

  const verifyMutation = useVerifyOtpMutation({
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token);
      navigate('/');
    },
    onError: () => {
      setOtp(new Array(6).fill(''));
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    },
  });

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (index === idx ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setFormError('Please enter the 6-digit code.');
      return;
    }
    setFormError(null);
    verifyMutation.mutate({ otpString, tempToken });
  };

  const errorMessage =
    formError ||
    (verifyMutation.isError
      ? verifyMutation.error.response?.data?.message ||
        verifyMutation.error.message ||
        'Invalid or expired OTP'
      : null);

  return (
    <div className="w-full">
      <div className="mb-8">
        <Typography variant="h2" className="text-on-surface mb-2">
          Verify Identity
        </Typography>
        <Typography variant="body-md" className="text-secondary font-semibold mt-2">
          OTP is sent to your email
        </Typography>
        <Typography variant="body-sm" className="text-secondary mt-1">
          Please enter the 6-digit code sent to your registered address to continue.
        </Typography>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3 bg-red-50 text-red-500 font-medium rounded text-sm text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center">
        <div className="flex space-x-3 justify-between w-full max-w-sm mb-4">
          {otp.map((data, index) => {
            return (
              <input
                className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-semibold bg-surface-container-high outline-none rounded focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            );
          })}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-4 text-lg"
          disabled={verifyMutation.isPending}
        >
          {verifyMutation.isPending ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </form>

      <div className="mt-8 text-center space-y-4 flex flex-col items-center">
        <button className="text-secondary font-semibold text-sm hover:text-primary flex items-center cursor-pointer">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Resend Code
        </button>
        <button
          onClick={() => navigate('/login')}
          className="text-secondary text-xs hover:underline cursor-pointer"
        >
          Change verification method
        </button>
      </div>
    </div>
  );
};
