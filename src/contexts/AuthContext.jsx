import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    const response = await api.get(`/user/${userData.email}`);
                    if (response.success) {
                        setUser(response.payload);
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/user/login', null, { params: { email, password }});
            if (response.success) {
                setUser(response.payload);
                localStorage.setItem('user', JSON.stringify(response.payload));
                return response.payload;
            }
            throw new Error(response.message || 'Login failed');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/user/register', null, { params: userData });
            if (response.success) {
                setUser(response.payload);
                localStorage.setItem('user', JSON.stringify(response.payload));
                return response.payload;
            }
            throw new Error(response.message || 'Registration failed');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = async (userData) => {
        try {
            const response = await api.put('/user', userData);
            if (response.success) {
                setUser(response.payload);
                localStorage.setItem('user', JSON.stringify(response.payload));
                return response.payload;
            }
            throw new Error(response.message || 'Update failed');
        } catch (error) {
            console.error('Update failed:', error);
            throw error;
        }
    };

    const topUpBalance = async (amount) => {
        try {
            const response = await api.post('/user/topUp', { 
                id: user.id, 
                amount: Number(amount)
            });
            if (response.success) {
                setUser(response.payload);
                localStorage.setItem('user', JSON.stringify(response.payload));
                return response.payload;
            }
            throw new Error(response.message || 'Top up failed');
        } catch (error) {
            console.error('Top up failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout, 
            register, 
            updateUser,
            topUpBalance 
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;