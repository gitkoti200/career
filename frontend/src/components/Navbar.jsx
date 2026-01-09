import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, BarChart, Map } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Compass className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold">AI Career Guide</span>
                </div>
                <div className="flex space-x-6">
                    <Link to="/" className="hover:text-primary flex items-center"><BarChart className="w-4 h-4 mr-1" /> Home</Link>
                    <Link to="/dashboard" className="hover:text-primary flex items-center"><BarChart className="w-4 h-4 mr-1" /> Dashboard</Link>
                    <Link to="/roadmap" className="hover:text-primary flex items-center"><Map className="w-4 h-4 mr-1" /> Roadmap</Link>
                    <Link to="/profile" className="hover:text-primary flex items-center font-bold text-indigo-600"><User className="w-4 h-4 mr-1" /> Profile</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
