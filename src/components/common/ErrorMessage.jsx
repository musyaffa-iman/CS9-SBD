import React from 'react';

const ErrorMessage = ({ message, className = '' }) => {
    if (!message) return null;

    return (
        <div className={`bg-red-50 text-red-500 p-4 rounded-md ${className}`}>
            {message}
        </div>
    );
};

export default ErrorMessage;