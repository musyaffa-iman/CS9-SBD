import React, { useEffect, useRef } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import Featured from '../components/Featured';
import useApi from '../hooks/useApi';

const HomePage = () => {
    const { data: featuredStores, loading: storesLoading } = useApi('/stores?featured=true');
    const { data: featuredItems, loading: itemsLoading } = useApi('/items?featured=true');
    
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }
            },
            { threshold: 0.1 }
        );

        const currentHeroRef = heroRef.current;
        if (currentHeroRef) {
            observer.observe(currentHeroRef);
        }

        return () => {
            if (currentHeroRef) {
                observer.unobserve(currentHeroRef);
            }
        };
    }, []);

    return (
        <AppLayout>
            <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-white min-h-screen">
                {/* Hero Section */}
                <div className="relative">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&sat=-100"
                            alt="People working on laptops"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
                    </div>
                    <div 
                        ref={heroRef}
                        className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 opacity-0 translate-y-4 transition-all duration-1000 ease-out"
                    >
                        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white">Take control of your</span>
                            <span className="block text-indigo-200">digital marketplace</span>
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                            Discover amazing products from trusted stores. Start your journey with us today.
                        </p>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <a
                                    href="/stores"
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                                >
                                    Browse Stores
                                </a>
                                <a
                                    href="/items"
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                                >
                                    View Items
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Sections */}
                <Featured 
                    title="Featured Stores"
                    items={featuredStores}
                    type="stores"
                    loading={storesLoading}
                />

                <Featured 
                    title="Featured Items"
                    items={featuredItems}
                    type="items"
                    loading={itemsLoading}
                />
            </div>
        </AppLayout>
    );
};

export default HomePage;
