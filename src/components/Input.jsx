import { forwardRef } from 'react';

/**
 * Standardized Input field with label and error state handling.
 * @type {React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string, className?: string } & React.RefAttributes<HTMLInputElement>>}
 */
export const Input = forwardRef(({ label, className = '', error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1 mb-4 w-full">
      {label && <label className="text-secondary text-sm font-semibold mb-1">{label}</label>}
      <input
        ref={ref}
        className={`w-full bg-surface-container-high px-4 py-3 rounded outline-none focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all text-on-surface ${
          error ? 'border-b-2 border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
