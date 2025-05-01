import React from 'react';

const SocialLinks = () => (
    <div className="mt-12 w-full max-w-sm flex items-center space-x-4 text-gray-600 text-xs font-semibold">
        <span>FOLLOW</span>
        <a aria-label="Facebook" className="hover:text-indigo-600 transition-colors" href="#">
            <i className="fab fa-facebook-f" />
        </a>
        <a aria-label="Twitter" className="hover:text-indigo-600 transition-colors" href="#">
            <i className="fab fa-twitter" />
        </a>
        <a aria-label="Instagram" className="hover:text-indigo-600 transition-colors" href="#">
            <i className="fab fa-instagram" />
        </a>
    </div>
);

export default SocialLinks;