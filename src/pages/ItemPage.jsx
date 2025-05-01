import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import useApi from '../hooks/useApi';
import { formatCurrency } from '../utils/formatUtils';
import { useAuth } from '../contexts/AuthContext';
import { createTransaction } from '../services/api';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: item, loading, error } = useApi(`/items/${id}`);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePurchase = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        try {
            await createTransaction({
                item_id: id,
                quantity: quantity,
                user_id: user.id
            });
            navigate('/transactions');
        } catch (error) {
            console.error('Purchase error:', error);
        } finally {
            setIsSubmitting(false);
            setShowPurchaseModal(false);
        }
    };

    if (loading) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <LoadingSpinner />
                </div>
            </AppLayout>
        );
    }

    if (error || !item) {
        return (
            <AppLayout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading item</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error || 'Item not found'}</p>
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
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        {/* Image */}
                        <div className="w-full aspect-w-1 aspect-h-1">
                            <img
                                src={item.image_url || '/placeholder-item.jpg'}
                                alt={item.name}
                                className="w-full h-full object-center object-cover rounded-lg"
                            />
                        </div>

                        {/* Item details */}
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                {item.name}
                            </h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Item information</h2>
                                <p className="text-3xl text-gray-900">{formatCurrency(item.price)}</p>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div className="text-base text-gray-700 space-y-6">
                                    <p>{item.description}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-500">
                                        {item.stock} items in stock
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Button
                                    onClick={() => setShowPurchaseModal(true)}
                                    disabled={item.stock === 0}
                                    className="w-full"
                                >
                                    {item.stock === 0 ? 'Out of Stock' : 'Purchase Item'}
                                </Button>
                            </div>

                            {/* Store information */}
                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h3 className="text-sm font-medium text-gray-900">Seller Information</h3>
                                <div className="mt-4 flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={item.store?.image_url || '/placeholder-store.jpg'}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-sm font-bold text-gray-900">
                                            {item.store?.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {item.store?.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Purchase Modal */}
            <Modal
                isOpen={showPurchaseModal}
                onClose={() => setShowPurchaseModal(false)}
                title="Purchase Item"
            >
                <div className="mt-4">
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Quantity
                    </label>
                    <div className="mt-1">
                        <input
                            type="number"
                            min="1"
                            max={item.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.min(item.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-gray-500">
                        Total: {formatCurrency(item.price * quantity)}
                    </p>
                </div>

                <div className="mt-5 sm:mt-6">
                    <Button
                        onClick={handlePurchase}
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Processing...' : 'Confirm Purchase'}
                    </Button>
                </div>
            </Modal>
        </AppLayout>
    );
};

export default ItemPage;