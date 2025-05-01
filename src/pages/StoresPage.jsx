import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Grid from '../components/Grid';
import useApi from '../hooks/useApi';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getAllStores, createStore, updateStore, deleteStore } from '../services/api';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

const StoresPage = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
    const [selectedStore, setSelectedStore] = useState(null);
    const [form, setForm] = useState({ name: '', address: '' });
    const [actionLoading, setActionLoading] = useState(false);

    const queryString = new URLSearchParams({
        page,
        search: searchQuery,
    }).toString();

    // Fetch stores using API function, expect array in payload (no dummy data)
    const { data, loading, error, execute } = useApi(getAllStores, []);
    const stores = Array.isArray(data?.payload) ? data.payload : [];
    const hasMore = false; // Adjust if you implement pagination

    useEffect(() => {
        execute();
    }, [execute]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [loading, hasMore]);

    useInfiniteScroll(loadMore, { disabled: !hasMore || loading });

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset page when applying new search
    };

    // Modal handlers
    const openCreateModal = () => {
        setModalMode('create');
        setForm({ name: '', address: '' });
        setShowModal(true);
    };
    const openEditModal = (store) => {
        setModalMode('edit');
        setSelectedStore(store);
        setForm({ name: store.name, address: store.address });
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedStore(null);
    };

    // Create or update store
    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            if (modalMode === 'create') {
                await createStore(form);
            } else if (modalMode === 'edit' && selectedStore) {
                await updateStore({ ...form, id: selectedStore.id });
            }
            await execute(); // Refresh list
            closeModal();
        } catch (err) {
            // handle error
        } finally {
            setActionLoading(false);
        }
    };

    // Delete store
    const handleDelete = async (store) => {
        if (!window.confirm('Delete this store?')) return;
        setActionLoading(true);
        try {
            await deleteStore(store.id);
            await execute();
        } catch (err) {
            // handle error
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Create Store Button */}
                <div className="mb-4 flex justify-end">
                    <Button onClick={openCreateModal} className="bg-indigo-600 text-white">Create Store</Button>
                </div>
                {/* Search Bar */}
                <div className="mb-8 bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSearch} className="max-w-lg">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search Stores
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                id="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                                placeholder="Search by store name or location..."
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Error State */}
                {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-8">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading stores</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stores Grid */}
                {stores.length > 0 ? (
                    <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="gap-6">
                        {stores.map((store) => (
                            <div key={store.id} className="relative group">
                                <Link to={`/stores/${store.id}`}
                                    className="block group">
                                    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={store.image_url || '/placeholder-store.jpg'}
                                                alt={store.name}
                                                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                                                {store.name}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {store.address}
                                            </p>
                                            <div className="mt-4 flex items-center text-sm text-gray-500">
                                                <svg 
                                                    className="h-5 w-5 text-yellow-400" 
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                    />
                                                </svg>
                                                <span className="ml-1">{store.rating || 'No ratings'}</span>
                                                <span className="mx-2">•</span>
                                                <span>{store.total_items || 0} items</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {/* Edit/Delete buttons (show for admin/owner) */}
                                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                                    <Button size="sm" onClick={() => openEditModal(store)} className="bg-yellow-500 text-white">Edit</Button>
                                    <Button size="sm" onClick={() => handleDelete(store)} className="bg-red-600 text-white">Delete</Button>
                                </div>
                            </div>
                        ))}
                    </Grid>
                ) : !loading ? (
                    <div className="text-center py-12">
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No stores found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search criteria
                        </p>
                    </div>
                ) : null}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-8">
                        {/* LoadingSpinner removed */}
                    </div>
                )}
                {/* Store Modal */}
                <Modal isOpen={showModal} onClose={closeModal} title={modalMode === 'create' ? 'Create Store' : 'Edit Store'}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="mt-1 block w-full border rounded px-4 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} required className="mt-1 block w-full border rounded px-4 py-2" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" onClick={closeModal} className="bg-gray-300">Cancel</Button>
                            <Button type="submit" className="bg-indigo-600 text-white" disabled={actionLoading}>{actionLoading ? 'Saving...' : 'Save'}</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </AppLayout>
    );
};

export default StoresPage;