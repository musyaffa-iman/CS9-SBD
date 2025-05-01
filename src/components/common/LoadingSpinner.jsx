import React from 'react';

const LoadingSpinner = ({ size = 'default', className = '' }) => {
    const sizeClasses = {
        small: 'h-4 w-4 border',
        default: 'h-8 w-8 border-2',
        large: 'h-12 w-12 border-3'
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div className={`animate-spin rounded-full border-gray-900 border-t-transparent ${sizeClasses[size]}`}></div>
        </div>
    );
};

export default LoadingSpinner;