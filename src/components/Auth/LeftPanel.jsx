import React from 'react';
import { Link } from 'react-router-dom';

const LeftPanel = () => {
    const circles = Array(9).fill(0).map((_, i) => (
        <svg
            key={i}
            aria-hidden="true"
            className={`absolute opacity-10 ${[
                'top-0 left-0 w-48 h-48 opacity-20',
                'bottom-0 left-0 w-64 h-64 opacity-20',
                'top-20 right-20 w-24 h-24',
                'bottom-20 right-16 w-20 h-20',
                'bottom-16 right-0 w-32 h-32',
                'top-32 left-32 w-20 h-20',
                'top-40 left-40 w-24 h-24',
                'top-48 left-48 w-16 h-16',
                'top-56 left-56 w-12 h-12',
            ][i]}`}
            fill="none"
            viewBox="0 0 100 100"
        >
            <circle cx="50" cy="50" fill="white" r="50" />
        </svg>
    ));

    return (
        <div className="hidden md:flex flex-col justify-center items-start w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 relative px-12 py-16 text-white overflow-hidden">
            <Link to="/" className="flex items-center space-x-3 mb-12">
                <span className="font-extrabold text-lg tracking-wide text-indigo-300">Musyaffa Iman Supriadi | CS9</span>
            </Link>
            <h1 className="text-4xl font-bold leading-tight mb-4">
                Start your <br />
                <span className="font-extrabold text-indigo-200">journey with us</span>
            </h1>
            <p className="text-sm max-w-xs text-indigo-300">
                Join thousands of satisfied users and experience the best service platform.
            </p>
            {circles}
        </div>
    );
};

export default LeftPanel;