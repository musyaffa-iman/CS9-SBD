import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'border border-indigo-600 text-indigo-700 hover:bg-indigo-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
};

const sizes = {
    small: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2',
    large: 'px-6 py-3'
};

const Button = ({
    children,
    variant = 'primary',
    size = 'default',
    loading = false,
    disabled = false,
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed';
    
    return (
        <button
            className={`
                ${baseClasses}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <LoadingSpinner size="small" className="mr-2" />
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;