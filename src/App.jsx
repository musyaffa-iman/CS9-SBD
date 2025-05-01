import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StoresPage from './pages/StoresPage';
import StorePage from './pages/StorePage';
import ItemsPage from './pages/ItemsPage';
import ItemPage from './pages/ItemPage';
import TransactionsPage from './pages/TransactionsPage';
import ProfilePage from './pages/ProfilePage';
import TopUpPage from './pages/TopUpPage';
import 'tailwindcss/tailwind.css';
import './App.css';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <NotificationProvider>
                    <div className="font-['Inter'] min-h-screen bg-gray-50">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<SignupPage />} />
                            <Route path="/stores" element={<StoresPage />} />
                            <Route path="/stores/:id" element={<StorePage />} />
                            <Route path="/items" element={<ItemsPage />} />
                            <Route path="/items/:id" element={<ItemPage />} />

                            {/* Protected Routes */}
                            <Route path="/transactions" element={
                                <ProtectedRoute>
                                    <TransactionsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            } />
                            <Route path="/top-up" element={
                                <ProtectedRoute>
                                    <TopUpPage />
                                </ProtectedRoute>
                            } />

                            {/* Catch all */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </NotificationProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;