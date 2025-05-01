import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { getAllTransactions, payTransaction, deleteTransaction } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const TransactionStatus = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800'
};

const TransactionsPage = () => {
    const { user, updateUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const response = await getAllTransactions();
            if (response.success) {
                setTransactions(response.payload);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePayTransaction = async (transactionId) => {
        try {
            const response = await payTransaction(transactionId);
            if (response.success) {
                // Update the transaction in the list
                setTransactions(transactions.map(t => 
                    t.id === transactionId ? { ...t, status: 'paid' } : t
                 ));
                
                // Refresh user data to get updated balance
                const userData = await updateUser({ id: user.id });
                if (!userData) {
                    throw new Error('Failed to update user data');
                }
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;

        try {
            const response = await deleteTransaction(transactionId);
            if (response.success) {
                setTransactions(transactions.filter(t => t.id !== transactionId));
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return (
        <AppLayout>
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
            </div>
        </AppLayout>
    );

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-8 space-y-8">
                <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-md">
                        {error}
                    </div>
                )}

                <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Item
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        #{transaction.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {transaction.item_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {transaction.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${transaction.total}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${TransactionStatus[transaction.status]}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        {transaction.status === 'pending' && (
                                            <button
                                                onClick={() => handlePayTransaction(transaction.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Pay
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {transactions.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No transactions found.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default TransactionsPage;