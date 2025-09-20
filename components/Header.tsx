


import React from 'react';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { Leaf } from 'lucide-react';

interface HeaderProps {
    children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <ReactRouterDOM.NavLink to="/" className="flex items-center gap-2 text-xl font-bold">
                    <Leaf className="text-green-500" />
                    <span>Daily Pi Mart</span>
                </ReactRouterDOM.NavLink>
                {children}
            </div>
        </header>
    );
};