import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { deleteUser } from '../services/api';

const ProfilePage = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    });

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const dataToUpdate = {
                id: user.id,
                name: formData.name,
                email: formData.email,
                ...(formData.password && { password: formData.password })
            };

            await updateUser(dataToUpdate);
            setEditMode(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await deleteUser(user.id);
            if (response.success) {
                logout();
                navigate('/');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    {!editMode && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-md">
                        {error}
                    </div>
                )}

                {editMode ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Leave blank to keep current password"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Password must have at least 8 characters, one number and one special character
                            </p>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(false);
                                    setFormData({
                                        name: user.name,
                                        email: user.email,
                                        password: ''
                                    });
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                            <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Balance</h3>
                            <p className="mt-1 text-lg text-gray-900">${user.balance || 0}</p>
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-gray-200">
                    <button
                        onClick={handleDeleteAccount}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </AppLayout>
    );
};

export default ProfilePage;