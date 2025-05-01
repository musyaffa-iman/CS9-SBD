import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import Grid from '../components/Grid';
import Card from '../components/Card';
import useApi from '../hooks/useApi';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getAllItems, getAllStores } from '../services/api';

const ItemsPage = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const { data: storesData } = useApi(() => getAllStores(), []);
    const stores = Array.isArray(storesData?.payload) ? storesData.payload : [];
    
    const { data, loading, error, execute } = useApi(() => getAllItems(), []);
    const items = Array.isArray(data?.payload) ? data.payload : [];

    useEffect(() => {
        execute();
    }, [execute]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        execute();
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="mb-8 bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                                    Search Items
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                                    placeholder="Search by name..."
                                />
                            </div>
                            <div>
                                <label htmlFor="store" className="block text-sm font-medium text-gray-700">
                                    Store
                                </label>
                                <select
                                    id="store"
                                    value={selectedStore}
                                    onChange={(e) => setSelectedStore(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">All Stores</option>
                                    {stores?.map(store => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                                    Min Price
                                </label>
                                <input
                                    type="number"
                                    id="minPrice"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                                    Max Price
                                </label>
                                <input
                                    type="number"
                                    id="maxPrice"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </form>
                </div>

                {/* Error State */}
                {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-8">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading items</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Items Grid */}
                {items.length > 0 ? (
                    <Grid>
                        {items.map((item) => (
                            <Card 
                                key={item.id} 
                                item={item} 
                                type="item" 
                            />
                        ))}
                    </Grid>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default ItemsPage;