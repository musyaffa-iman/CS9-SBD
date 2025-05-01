import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Grid from '../components/Grid';
import { getStoreById, getStoreItems, updateStore, deleteStore } from '../services/api';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import useApi from '../hooks/useApi';
import { formatCurrency } from '../utils/formatUtils';

const StorePage = () => {
    const { id } = useParams();
    const { data: store, loading, error, execute } = useApi(() => getStoreById(id), [id]);
    const { data: storeItems, loading: itemsLoading, execute: reloadItems } = useApi(() => getStoreItems(id), [id]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('edit');
    const [form, setForm] = useState({ name: '', address: '' });
    const [actionLoading, setActionLoading] = useState(false);

    // Modal handlers
    const openEditModal = () => {
        setModalMode('edit');
        setForm({ name: store.name, address: store.address });
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    // Update store
    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            await updateStore({ ...form, id });
            await execute();
            closeModal();
        } catch (err) {
            // handle error
        } finally {
            setActionLoading(false);
        }
    };
    // Delete store
    const handleDelete = async () => {
        if (!window.confirm('Delete this store?')) return;
        setActionLoading(true);
        try {
            await deleteStore(id);
            window.location.href = '/stores';
        } catch (err) {
            // handle error
        } finally {
            setActionLoading(false);
        }
    };

    if (error || !store) {
        return (
            <AppLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading store</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error || 'Store not found'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="bg-white">
                {/* Edit/Delete Buttons (admin/owner only) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex justify-end space-x-2">
                    <Button onClick={openEditModal} className="bg-yellow-500 text-white">Edit Store</Button>
                    <Button onClick={handleDelete} className="bg-red-600 text-white">Delete Store</Button>
                </div>
                {/* Store Header */}
                <div className="relative">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-96 object-cover"
                            src={store.banner_url || store.image_url || '/placeholder-store-banner.jpg'}
                            alt={store.name}
                        />
                        <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" />
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-6">
                            <img
                                className="h-24 w-24 rounded-full ring-4 ring-white"
                                src={store.image_url || '/placeholder-store.jpg'}
                                alt={store.name}
                            />
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    {store.name}
                                </h1>
                                <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                                    {store.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Store Info */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-16 lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Location</h3>
                                    <p className="mt-2 text-base text-gray-500">{store.address}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Rating</h3>
                                    <div className="mt-2 flex items-center">
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
                                        <span className="ml-1 text-sm text-gray-500">
                                            {store.rating || 'No ratings'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                                    <p className="mt-2 text-base text-gray-500">{store.email}</p>
                                    <p className="mt-2 text-base text-gray-500">{store.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 lg:mt-0 lg:col-span-8">
                            <div className="border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Items</h2>
                            </div>

                            {Array.isArray(storeItems) && storeItems.length > 0 ? (
                                <div className="mt-8">
                                    <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="gap-6">
                                        {storeItems.map((item) => (
                                            <Link
                                                key={item.id}
                                                to={`/items/${item.id}`}
                                                className="group"
                                            >
                                                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                                                    <div className="aspect-w-16 aspect-h-9">
                                                        <img
                                                            src={item.image_url || '/placeholder-item.jpg'}
                                                            alt={item.name}
                                                            className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                                                            {item.name}
                                                        </h3>
                                                        <div className="mt-2 flex justify-between items-center">
                                                            <p className="text-gray-600">
                                                                {formatCurrency(item.price)}
                                                            </p>
                                                            <span className="text-sm text-gray-500">
                                                                {item.stock} in stock
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </Grid>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        No items available
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        This store hasn't listed any items yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Modal isOpen={showModal} onClose={closeModal} title="Edit Store">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="mt-1 block w-full border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} required className="mt-1 block w-full border rounded" />
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

export default StorePage;