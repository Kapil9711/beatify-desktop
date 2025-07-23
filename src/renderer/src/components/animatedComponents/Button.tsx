import React from 'react'
import { motion } from 'motion/react'

// Optional: Heroicons for the example
// npm install @heroicons/react
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

// Define the props interface for type safety
interface ModernAnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ElementType // Type for a React component (e.g., Heroicon)
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isSuccess?: boolean
  className?: string // Additional Tailwind classes
}

const ModernAnimatedButton: React.FC<ModernAnimatedButtonProps> = ({
  text = 'Click Me',
  onClick,
  icon: IconComponent = ArrowRightIcon, // Default icon
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
    relative
    flex items-center justify-center
    font-semibold
    overflow-hidden
    cursor-pointer
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${className}
  `

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
    md: 'px-6 py-3 text-base rounded-xl gap-2',
    lg: 'px-8 py-4 text-lg rounded-2xl gap-2.5'
  }

  const variantClasses = {
    primary: `
      bg-secondary text-white
      hover:bg-blue-700
      active:bg-blue-800
      focus:ring-blue-500
    `,
    secondary: `
      bg-secondary
      hover:bg-gray-300
      active:bg-gray-400
      focus:ring-gray-400
    `,
    ghost: `
      bg-transparent text-blue-600 border border-blue-600
      hover:bg-blue-50
      active:bg-blue-100
      focus:ring-blue-500
    `
  }

  const currentVariantClasses = variantClasses[variant] || variantClasses.primary
  const currentSizeClasses = sizeClasses[size] || sizeClasses.md

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${currentVariantClasses} ${currentSizeClasses}`}
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      animate={isLoading ? 'loading' : isSuccess ? 'success' : 'rest'}
      disabled={isLoading || isSuccess} // Disable button when loading or success
    >
      {/* Background ripple on click */}
      <motion.span
        variants={{
          rest: { scale: 0, opacity: 0 },
          tap: { scale: 1, opacity: 0.2, transition: { duration: 0.4 } }
        }}
        className="absolute inset-0 bg-white rounded-full opacity-0"
        style={{ originX: 0.5, originY: 0.5 }} // Center the ripple
      />

      {/* Content wrapper for animations */}
      <motion.span
        className="relative flex items-center justify-center gap-2 z-10"
        variants={{
          rest: { x: 0 },
          hover: { x: 0 },
          tap: { x: 0 },
          loading: { x: -5, opacity: 0.7, transition: { duration: 0.3 } },
          success: { x: -5, opacity: 0.7, transition: { duration: 0.3 } }
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {!isLoading && !isSuccess && IconComponent && (
          <motion.span
            variants={{
              rest: { x: 0, opacity: 1 },
              hover: { x: 3 }, // Icon moves right slightly on hover
              tap: { x: 0 },
              loading: { x: 0, opacity: 0 }, // Hide icon during loading
              success: { x: 0, opacity: 0 } // Hide icon during success
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex items-center" // Ensure icon is centered
          >
            <IconComponent className="w-5 h-5" />
          </motion.span>
        )}

        {isLoading ? (
          <motion.span
            key="loading-text"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </motion.span>
        ) : isSuccess ? (
          <motion.span
            key="success-text"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Success!
          </motion.span>
        ) : (
          text
        )}
      </motion.span>
    </motion.button>
  )
}

export default ModernAnimatedButton

// --- How to use it ---
// In your App.tsx or any component:
/*
import React, { useState } from 'react';
import ModernAnimatedButton from './ModernAnimatedButton'; // Adjust path

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    setSuccess(false); // Reset success state
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000); // Reset success after 2 seconds
    }, 2000); // Simulate API call
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Animated Buttons</h1>

      <ModernAnimatedButton onClick={handleClick} />

      <ModernAnimatedButton
        text="Submit Data"
        variant="secondary"
        onClick={handleClick}
        isLoading={loading}
        isSuccess={success}
      />

      <ModernAnimatedButton
        text="Learn More"
        variant="ghost"
        size="sm"
        onClick={() => alert('Ghost button clicked!')}
      />

      <ModernAnimatedButton
        text="Huge Action"
        size="lg"
        onClick={() => alert('Large button clicked!')}
      />

      <ModernAnimatedButton
        text="Custom Class"
        className="w-64" // Example of custom width
        onClick={() => alert('Custom class button clicked!')}
      />
    </div>
  );
}

export default App;
*/
