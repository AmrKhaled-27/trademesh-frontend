import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyOtpMutation, useResendOtpMutation } from '../../hooks/useAuth';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';

export const OTP = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tempToken = searchParams.get('tempToken');

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [formError, setFormError] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(null);
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

  const resendMutation = useResendOtpMutation({
    onSuccess: (data) => {
      setResendError(null);
      setResendSuccess(true);
      if (data?.tempToken) {
        setSearchParams({ tempToken: data.tempToken }, { replace: true });
      }
      setTimeout(() => setResendSuccess(false), 5000);
    },
    onError: (error) => {
      setResendError(error.response?.data?.message || 'Failed to resend code');
    },
  });

  const handleResend = (e) => {
    e.preventDefault();
    if (tempToken && !resendMutation.isPending) {
      setResendError(null);
      resendMutation.mutate(tempToken);
    }
  };

  const handleChange = (element, index) => {
    let value = element.value;
    if (isNaN(value)) value = value.replace(/\D/g, ''); // strip non-numeric

    // If user typed/pasted multiple characters (e.g. autofill)
    if (value.length > 1) {
      const splitValue = value.split('').slice(0, 6);
      const newOtp = [...otp];
      splitValue.forEach((char, idx) => {
        if (index + idx < 6) newOtp[index + idx] = char;
      });
      setOtp(newOtp);

      const nextFocus = Math.min(index + splitValue.length, 5);
      if (inputRefs.current[nextFocus]) {
        inputRefs.current[nextFocus].focus();
      }
      return;
    }

    setOtp([...otp.map((d, idx) => (index === idx ? value : d))]);

    // Focus next input
    if (value !== '' && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    if (pastedData.length > 0) {
      const newOtp = [...otp];
      pastedData.forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtp(newOtp);

      // Focus the last filled input or the first empty one
      const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
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
        <div className="flex gap-1.5 sm:gap-3 md:gap-4 justify-center w-full px-2 mb-4">
          {otp.map((data, index) => {
            return (
              <input
                className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-lg sm:text-xl font-semibold bg-surface-container-high outline-none rounded focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all flex-shrink-0"
                type="text"
                name="otp"
                maxLength="6"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
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
        {resendError && (
          <div className="text-red-500 font-medium text-sm text-center">{resendError}</div>
        )}
        {resendSuccess ? (
          <span className="text-green-500 font-medium text-sm flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Code resent successfully!
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendMutation.isPending}
            className={`text-secondary font-semibold text-sm flex items-center ${
              resendMutation.isPending
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:text-primary cursor-pointer'
            }`}
          >
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
            {resendMutation.isPending ? 'Resending...' : 'Resend Code'}
          </button>
        )}
      </div>
    </div>
  );
};
