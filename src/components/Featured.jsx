import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import Card from './Card';

const Featured = ({ 
    title = 'Featured',
    items = [],
    type = 'items',
    error = null
}) => {
    const { isMobile } = useWindowSize();
    const displayCount = isMobile ? 2 : 4;
    const displayItems = Array.isArray(items) ? items.slice(0, displayCount) : [];
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    const items = entry.target.querySelectorAll('.feature-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('opacity-100', 'translate-y-0');
                        }, index * 200);
                    });
                }
            },
            { threshold: 0.1 }
        );

        const currentSectionRef = sectionRef.current;
        if (currentSectionRef) observer.observe(currentSectionRef);

        return () => {
            if (currentSectionRef) observer.unobserve(currentSectionRef);
        };
    }, []);

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <section 
            ref={sectionRef} 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 opacity-0 translate-y-4 transition-all duration-1000 ease-out"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <Link
                    to={`/${type}`}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    View all
                    <span className="ml-2" aria-hidden="true">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayItems.map((item) => (
                    <div
                        key={item.id}
                        className="feature-item opacity-0 translate-y-4 transition-all duration-700 ease-out"
                    >
                        {type === 'items' ? (
                            <Card item={item} type="item" />
                        ) : (
                            <Link to={`/${type}/${item.id}`}>
                                <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
                                    <img
                                        src={item.image_url || '/placeholder-store.jpg'}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {item.address}
                                        </p>
                                        <div className="mt-4 flex items-center text-sm text-gray-500">
                                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="ml-1">{item.rating || 'No ratings'}</span>
                                            <span className="mx-2">•</span>
                                            <span>{item.total_items || 0} items</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Featured;
