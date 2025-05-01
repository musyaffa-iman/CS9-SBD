import React from 'react';

export const FormGroup = ({ children, className = '' }) => (
    <div className={`space-y-1 ${className}`}>
        {children}
    </div>
);

export const FormLabel = ({ children, htmlFor, required, className = '' }) => (
    <label 
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-700 ${className}`}
    >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
);

export const FormInput = React.forwardRef(({
    type = 'text',
    error,
    className = '',
    ...props
}, ref) => (
    <>
        <input
            ref={ref}
            type={type}
            className={`
                w-full border rounded px-4 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-black
                disabled:bg-gray-50 disabled:text-gray-500
                ${error ? 'border-red-300' : 'border-gray-300'}
                ${className}
            `}
            {...props}
        />
        {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
    </>
));

export const FormTextarea = React.forwardRef(({
    error,
    className = '',
    ...props
}, ref) => (
    <>
        <textarea
            ref={ref}
            className={`
                w-full border rounded px-4 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-black
                disabled:bg-gray-50 disabled:text-gray-500
                ${error ? 'border-red-300' : 'border-gray-300'}
                ${className}
            `}
            {...props}
        />
        {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
    </>
));

export const FormSelect = React.forwardRef(({
    children,
    error,
    className = '',
    ...props
}, ref) => (
    <>
        <select
            ref={ref}
            className={`
                w-full border rounded px-4 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-black
                disabled:bg-gray-50 disabled:text-gray-500
                ${error ? 'border-red-300' : 'border-gray-300'}
                ${className}
            `}
            {...props}
        >
            {children}
        </select>
        {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
    </>
));

export const FormCheckbox = React.forwardRef(({
    label,
    error,
    className = '',
    ...props
}, ref) => (
    <div className={className}>
        <label className="flex items-center">
            <input
                ref={ref}
                type="checkbox"
                className={`
                    w-4 h-4 text-black border-gray-300 rounded
                    focus:ring-black disabled:opacity-50
                    ${error ? 'border-red-300' : ''}
                `}
                {...props}
            />
            {label && (
                <span className="ml-2 text-sm text-gray-700">{label}</span>
            )}
        </label>
        {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
    </div>
));

export const FormRadio = React.forwardRef(({
    label,
    error,
    className = '',
    ...props
}, ref) => (
    <div className={className}>
        <label className="flex items-center">
            <input
                ref={ref}
                type="radio"
                className={`
                    w-4 h-4 text-black border-gray-300
                    focus:ring-black disabled:opacity-50
                    ${error ? 'border-red-300' : ''}
                `}
                {...props}
            />
            {label && (
                <span className="ml-2 text-sm text-gray-700">{label}</span>
            )}
        </label>
        {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
    </div>
));

export const FormHelperText = ({ children, className = '' }) => (
    <p className={`mt-1 text-xs text-gray-500 ${className}`}>
        {children}
    </p>
);

export const FormErrorText = ({ children, className = '' }) => (
    <p className={`mt-1 text-xs text-red-500 ${className}`}>
        {children}
    </p>
);

export const FormActions = ({ children, className = '' }) => (
    <div className={`flex justify-end space-x-3 mt-6 ${className}`}>
        {children}
    </div>
);