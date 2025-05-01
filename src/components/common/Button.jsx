import React from 'react';

const Button = ({ 
    variant = 'primary',
    size = 'default',
    fullWidth = false,
    className = '',
    loading = false,
    children,
    ...props 
}) => {
    const baseClasses = 'inline-flex justify-center items-center font-medium rounded-md focus:outline-none transition-colors duration-200';
    
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
        secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    const sizes = {
        small: 'px-2.5 py-1.5 text-xs',
        default: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base'
    };

    return (
        <button
            className={`
                ${baseClasses}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${loading ? 'opacity-75 cursor-not-allowed' : ''}
                ${className}
            `}
            disabled={props.disabled || loading}
            {...props}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
};

export default Button;