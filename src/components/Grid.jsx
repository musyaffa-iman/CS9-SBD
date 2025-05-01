import React from 'react';
import Card from './Card';

const Grid = ({ 
    children,
    title,
    columns = { mobile: 1, tablet: 2, desktop: 4 },
    gap = 'gap-6',
    onLoadMore,
    showLoadMore = false
}) => {
    return (
        <section className="max-w-[1280px] mx-auto px-6 mt-10 mb-16">
            {title && (
                <h2 className="text-gray-900 font-semibold text-base mb-6 select-none">
                    {title}
                </h2>
            )}
            
            <div className={`grid grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} ${gap}`}>
                {children}
            </div>

            {showLoadMore && (
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={onLoadMore}
                        className="bg-gray-900 text-white text-xs font-semibold px-6 py-2 rounded-md hover:bg-gray-800 transition"
                        type="button"
                    >
                        Load more...
                    </button>
                </div>
            )}
        </section>
    );
};

export default Grid;