/**
 * Reusable Button component with standardized variants.
 * @param {Object} props - Component props.
 * @param {'primary' | 'secondary' | 'tertiary'} [props.variant='primary'] - Visual variation of the button.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @param {React.ReactNode} props.children - Content to display inside the button.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Button HTML type.
 * @returns {JSX.Element}
 */
export const Button = ({
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'px-6 py-3 rounded tracking-wide transition-all font-medium flex justify-center items-center outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70';

  const variants = {
    primary: 'bg-primary-gradient text-on-primary shadow-sm hover:opacity-90',
    secondary: 'bg-surface-container-highest text-on-surface hover:bg-surface-dim',
    tertiary: 'text-primary font-bold hover:underline bg-transparent px-0 py-0',
  };

  return (
    <button type={type} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
