import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import Grid from '../components/Grid';
import Card from '../components/Card';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import ImageUpload from '../components/common/ImageUpload';
import useApi from '../hooks/useApi';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getAllItems, getAllStores, createItem } from '../services/api';

const ItemsPage = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        price: '',
        store_id: '',
        stock: '',
        image: null
    });
    const [creating, setCreating] = useState(false);

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

    const handleCreateItem = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('price', form.price);
            formData.append('store_id', form.store_id);
            formData.append('stock', form.stock);
            if (form.image) {
                formData.append('image', form.image);
            }

            await createItem(formData);
            setShowModal(false);
            setForm({
                name: '',
                price: '',
                store_id: '',
                stock: '',
                image: null
            });
            execute(); // Refresh items list
        } catch (error) {
            console.error('Failed to create item:', error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with Create Button */}
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Items</h1>
                    <Button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white">
                        Create Item
                    </Button>
                </div>

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

                {/* Create Item Modal */}
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Item">
                    <form onSubmit={handleCreateItem} className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                value={form.price}
                                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                value={form.stock}
                                onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                                required
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Store ID</label>
                            <input
                                type="text"
                                value={form.store_id}
                                onChange={e => setForm(f => ({ ...f, store_id: e.target.value }))}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                                required
                                placeholder="Enter store ID"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <ImageUpload
                                onChange={file => setForm(f => ({ ...f, image: file }))}
                                accept="image/*"
                                maxSize={5 * 1024 * 1024} // 5MB
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button" onClick={() => setShowModal(false)} className="bg-gray-300">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={creating} className="bg-indigo-600 text-white">
                                {creating ? 'Creating...' : 'Create Item'}
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </AppLayout>
    );
};

export default ItemsPage;