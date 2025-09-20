
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Send } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Brand & About */}
                    <div className="space-y-4">
                        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-white">
                            <Leaf className="text-green-400" />
                            <span>Daily Pi Mart</span>
                        </NavLink>
                        <p className="text-sm">Your one-stop shop for fresh groceries, powered by the Pi Network.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
                            <li><NavLink to="/products" className="hover:text-white">Products</NavLink></li>
                            <li><NavLink to="/orders" className="hover:text-white">My Orders</NavLink></li>
                            <li><NavLink to="/account" className="hover:text-white">Account</NavLink></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact & Legal */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact & Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="mailto:support@dailypimart.store" className="hover:text-white">support@dailypimart.store</a></li>
                            <li className="text-gray-400">123 Pioneer Plaza, Mainnet City</li>
                            <li><NavLink to="/legal/terms" className="hover:text-white">Terms of Service</NavLink></li>
                            <li><NavLink to="/legal/privacy" className="hover:text-white">Privacy Policy</NavLink></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Social */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Join Our Newsletter</h3>
                        <p className="text-sm mb-3">Get the latest deals and updates.</p>
                        <form className="flex" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full rounded-l-md border-0 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400"
                            />
                            <button type="submit" className="bg-green-500 hover:bg-green-600 p-2 rounded-r-md">
                                <Send size={20} className="text-white" />
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-4">
                <p className="container mx-auto px-4 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Daily Pi Mart. All Rights Reserved. A project for the Pi Network Hackathon.
                </p>
            </div>
        </footer>
    );
};
