import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AuthForm = ({ isLogin = true, redirectPath = '/' }) => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                navigate(redirectPath);
            } else {
                if (!formData.name) {
                    throw new Error('Name is required');
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    throw new Error('Please enter a valid email address');
                }

                const passwordRegex = /^(?=.*[0-9])(?=.*\W).{8,}$/;
                if (!passwordRegex.test(formData.password)) {
                    throw new Error('Password must have at least 8 characters, one number and one special character');
                }

                await register(formData);
                navigate('/');
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded">
                    {error}
                </div>
            )}

            {!isLogin && (
                <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                        Full Name
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>
            )}

            <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                    Email address
                </label>
                <input
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    type="email"
                    placeholder="name@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                    Password
                </label>
                <input
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    type="password"
                    placeholder="****************"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                />
                <p className="mt-1 text-xs text-gray-500">
                    {!isLogin && 'Password must have at least 8 characters, one number and one special character'}
                </p>
            </div>

            {isLogin && (
                <div className="flex justify-between items-center text-xs text-gray-600">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="w-3 h-3 border border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                        <span className="font-normal">Remember me</span>
                    </label>
                </div>
            )}

            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-indigo-600 text-white font-semibold px-6 py-2 rounded text-sm hover:bg-indigo-700 transition 
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                </button>
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => navigate(isLogin ? '/register' : '/login')}
                    className="border border-indigo-600 text-indigo-700 font-semibold px-6 py-2 rounded text-sm hover:bg-indigo-50 transition"
                >
                    {isLogin ? 'Sign up' : 'Login'}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;