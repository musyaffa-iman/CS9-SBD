import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatUtils';

const Header = () => {
    const { user, logout } = useAuth();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Stores', href: '/stores' },
        { name: 'Items', href: '/items' },
    ];

    return (
        <header className="bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-gray-100 lg:border-none">
                    <div className="flex items-center">
                        <Link to="/">
                            <span className="sr-only">Musyaffa Iman Supriadi | CS9</span>
                            <span className="font-extrabold text-lg tracking-wide text-indigo-700">Musyaffa Iman Supriadi | CS9</span>
                        </Link>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            {navigation.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <span className="text-sm text-gray-500">
                                    Balance: {formatCurrency(user.balance)}
                                </span>
                                <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                                            alt=""
                                        />
                                    </Menu.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/profile"
                                                        className={`${
                                                            active ? 'bg-gray-100' : ''
                                                        } block px-4 py-2 text-sm text-gray-700`}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/transactions"
                                                        className={`${
                                                            active ? 'bg-gray-100' : ''
                                                        } block px-4 py-2 text-sm text-gray-700`}
                                                    >
                                                        Transactions
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/top-up"
                                                        className={`${
                                                            active ? 'bg-gray-100' : ''
                                                        } block px-4 py-2 text-sm text-gray-700`}
                                                    >
                                                        Top Up
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={logout}
                                                        className={`${
                                                            active ? 'bg-gray-100' : ''
                                                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-gray-50"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-block bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-700"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {navigation.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default Header;