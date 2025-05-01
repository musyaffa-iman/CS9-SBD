import React from 'react';
import LeftPanel from '../components/Auth/LeftPanel';
import AuthForm from '../components/Auth/AuthForm';
import SocialLinks from '../components/Auth/SocialLinks';
import BackButton from '../components/Auth/BackButton';

const SignupPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <BackButton />
            <div className="flex min-h-screen">
                <LeftPanel />
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-8 py-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>
                    <AuthForm isLogin={false} />
                    <SocialLinks />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;