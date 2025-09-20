
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';

interface HeaderProps {
    children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <NavLink to="/" className="flex items-center gap-2 text-xl font-bold">
                    <Leaf className="text-green-500" />
                    <span>Daily Pi Mart</span>
                </NavLink>
                <div className="flex items-center gap-6">
                    {children}
                </div>
            </div>
        </header>
    );
};
