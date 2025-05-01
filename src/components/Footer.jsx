import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white pt-10 pb-6">
            <div className="max-w-[1280px] mx-auto px-6 text-center sm:text-left">
                <div className="mb-8 max-w-md mx-auto sm:mx-0">
                    <p className="font-semibold text-lg mb-2 select-none text-indigo-200">
                        Let's get started on something great
                    </p>
                    <p className="text-xs text-indigo-300 mb-4">
                        Join over 4,000+ startups already growing with Untitled.
                    </p>
                    <div className="flex justify-center sm:justify-start space-x-3">
                        <button className="border border-indigo-300 text-indigo-200 text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-800 hover:text-white transition" type="button">
                            Chat to us
                        </button>
                        <button className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-700 transition" type="button">
                            Get started
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-8 text-xs text-indigo-300 font-normal mb-8">
                    <div className="space-y-2">
                        <p className="font-semibold text-indigo-200 select-none">Product</p>
                        <a className="block hover:text-white" href="#">Overview</a>
                        <a className="block hover:text-white" href="#">Features</a>
                        <a className="block hover:text-white" href="#">Solutions</a>
                        <a className="block hover:text-white" href="#">Tutorials</a>
                        <a className="block hover:text-white" href="#">Pricing</a>
                        <a className="block hover:text-white" href="#">Releases</a>
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-indigo-200 select-none">Company</p>
                        <a className="block hover:text-white" href="#">About us</a>
                        <a className="block hover:text-white" href="#">Careers</a>
                        <a className="block hover:text-white" href="#">Press</a>
                        <a className="block hover:text-white" href="#">News</a>
                        <a className="block hover:text-white" href="#">Media kit</a>
                        <a className="block hover:text-white" href="#">Contact</a>
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-indigo-200 select-none">Resources</p>
                        <a className="block hover:text-white" href="#">Blog</a>
                        <a className="block hover:text-white" href="#">Guides</a>
                        <a className="block hover:text-white" href="#">Events</a>
                        <a className="block hover:text-white" href="#">Help centre</a>
                        <a className="block hover:text-white" href="#">Tutorials</a>
                        <a className="block hover:text-white" href="#">Support</a>
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-indigo-200 select-none">Use cases</p>
                        <a className="block hover:text-white" href="#">Startups</a>
                        <a className="block hover:text-white" href="#">Enterprise</a>
                        <a className="block hover:text-white" href="#">Government</a>
                        <a className="block hover:text-white" href="#">SaaS centre</a>
                        <a className="block hover:text-white" href="#">Marketplaces</a>
                        <a className="block hover:text-white" href="#">Ecommerce</a>
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-indigo-200 select-none">Social</p>
                        <a className="block hover:text-white" href="#">LinkedIn</a>
                        <a className="block hover:text-white" href="#">Twitter</a>
                        <a className="block hover:text-white" href="#">Facebook</a>
                        <a className="block hover:text-white" href="#">Dribbble</a>
                        <a className="block hover:text-white" href="#">AngelList</a>
                        <a className="block hover:text-white" href="#">GitHub</a>
                    </div>
                </div>
                <div className="border-t border-indigo-700 pt-4 text-xs text-indigo-400 select-none">
                    © {new Date().getFullYear()} Musyaffa Iman Supriadi | CS9. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;