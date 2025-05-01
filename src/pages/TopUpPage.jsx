import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import { useAuth } from '../contexts/AuthContext';

const SUGGESTED_AMOUNTS = [10, 25, 50, 100, 200, 500];

const TopUpPage = () => {
    const { user, topUpBalance } = useAuth();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await topUpBalance(amount);
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-md mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Top Up Balance</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Add funds to your account to make purchases.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-md">
                        {error}
                    </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700">Current Balance</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        ${user.balance || 0}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount to Add
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="block w-full pl-7 pr-12 px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Suggested Amounts
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {SUGGESTED_AMOUNTS.map((suggestedAmount) => (
                                <button
                                    key={suggestedAmount}
                                    type="button"
                                    onClick={() => setAmount(suggestedAmount)}
                                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    ${suggestedAmount}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !amount || amount <= 0}
                        className={`w-full bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition
                            ${(loading || !amount || amount <= 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Add Funds'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default TopUpPage;