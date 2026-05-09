/**
 * Reusable Typography component to handle standard text and heading styles.
 * @param {Object} props - Component props.
 * @param {'display-lg' | 'display-md' | 'h1' | 'h2' | 'h3' | 'body-lg' | 'body-md' | 'body-sm' | 'label'} [props.variant='body'] - Style variant matching the design system.
 * @param {string | React.ElementType} [props.component] - HTML tag to render as.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @param {React.ReactNode} props.children - The text content.
 * @returns {JSX.Element}
 */
export const Typography = ({ variant = 'body', component, className = '', children, ...props }) => {
  const baseStyle =
    variant.startsWith('display') || variant.startsWith('h') ? 'font-display' : 'font-body';

  const variants = {
    'display-lg': 'text-5xl font-bold tracking-tight',
    'display-md': 'text-4xl font-bold tracking-tight',
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    'body-lg': 'text-lg',
    'body-md': 'text-base',
    'body-sm': 'text-sm',
    label: 'text-xs font-semibold uppercase tracking-wider',
  };

  const Component =
    component || (variant.startsWith('display') ? 'h1' : variant.startsWith('h') ? variant : 'p');

  return (
    <Component className={`${baseStyle} ${variants[variant] || ''} ${className}`} {...props}>
      {children}
    </Component>
  );
};
