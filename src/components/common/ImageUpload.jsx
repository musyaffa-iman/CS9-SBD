import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNotification } from '../../contexts/NotificationContext';
import LoadingSpinner from './LoadingSpinner';

const ImageUpload = ({ 
    value, 
    onChange, 
    maxSize = 5 * 1024 * 1024, // 5MB
    accept = {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
}) => {
    const { error } = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(value);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        
        if (!file) return;

        try {
            setIsLoading(true);
            
            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            
            // Pass the file to parent component
            onChange(file);
        } catch (err) {
            error('Failed to process image');
            console.error('Image upload error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [onChange, error]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        multiple: false
    });

    const handleRemove = (e) => {
        e.stopPropagation();
        setPreview(null);
        onChange(null);
    };

    return (
        <div 
            {...getRootProps()} 
            className={`
                relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                transition-colors duration-200 ease-in-out
                ${isDragActive ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'}
            `}
        >
            <input {...getInputProps()} />
            
            {isLoading ? (
                <div className="py-8">
                    <LoadingSpinner />
                </div>
            ) : preview ? (
                <div className="relative group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div className="py-8">
                    <svg 
                        className="mx-auto h-12 w-12 text-gray-400" 
                        stroke="currentColor" 
                        fill="none" 
                        viewBox="0 0 48 48"
                    >
                        <path 
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                            strokeWidth={2} 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </svg>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            {isDragActive 
                                ? 'Drop the image here...'
                                : 'Drag and drop an image here, or click to select'
                            }
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG, GIF up to {Math.round(maxSize / (1024 * 1024))}MB
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;