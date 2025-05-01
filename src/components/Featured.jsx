import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import { formatCurrency } from '../utils/formatUtils';

const Featured = ({ 
    title = 'Featured',
    items = [],
    type = 'items', // 'items' or 'stores'
    loading = false,
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
                        }, index * 200); // Stagger animation by 200ms per item
                    });
                }
            },
            { threshold: 0.1 }
        );

        const currentSectionRef = sectionRef.current;
        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse">
                    <div className="h-8 w-1/4 bg-gray-200 rounded mb-6"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(displayCount)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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
                    <Link
                        key={item.id}
                        to={`/${type}/${item.id}`}
                        className="group feature-item opacity-0 translate-y-4 transition-all duration-700 ease-out"
                    >
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={item.image_url || 'placeholder.jpg'}
                                    alt={item.name}
                                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                                    {item.name}
                                </h3>
                                {type === 'items' && (
                                    <div className="mt-2 flex justify-between items-center">
                                        <p className="text-gray-600">
                                            {formatCurrency(item.price)}
                                        </p>
                                        <span className="text-sm text-gray-500">
                                            {item.stock} in stock
                                        </span>
                                    </div>
                                )}
                                {type === 'stores' && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        {item.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Featured;