import React from 'react';
import { useLocation } from 'react-router-dom';
import LeftPanel from '../components/Auth/LeftPanel';
import LoginForm from '../components/Auth/AuthForm';
import SocialLinks from '../components/Auth/SocialLinks';
import BackButton from '../components/Auth/BackButton';

const LoginPage = () => {
    const location = useLocation();
    // Get the redirect path from location state or default to home
    const from = location.state?.from?.pathname || '/';

    return (
        <div className="min-h-screen bg-white">
            <BackButton />
            <div className="flex min-h-screen">
                <LeftPanel />
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-8 py-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in to your account</h2>
                    <LoginForm isLogin={true} redirectPath={from} />
                    <SocialLinks />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;