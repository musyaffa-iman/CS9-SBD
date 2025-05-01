import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {
    return (
        <Link 
            to="/" 
            className="absolute top-6 left-6 text-gray-900 hover:text-gray-700 transition-colors"
            aria-label="Back to home"
        >
            <i className="fas fa-arrow-left text-xl"></i>
        </Link>
    );
};

export default BackButton;