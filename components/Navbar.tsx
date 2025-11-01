
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
    onSignInClick: () => void;
    onSignUpClick: () => void;
}

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 .972.997 10.002 10.002 0 0 1 4.354 4.354.972.997 0 0 0 .997.972h1.2A2.5 2.5 0 0 1 22 14.5v0A2.5 2.5 0 0 1 19.5 17h-1.2a1 1 0 0 0-.997.972 10.002 10.002 0 0 1-4.354 4.354.972.997 0 0 0-.972.997v1.2A2.5 2.5 0 0 1 14.5 22h-5A2.5 2.5 0 0 1 7 19.5v-1.2a1 1 0 0 0-.972-.997A10.002 10.002 0 0 1 1.674 12.95.972.997 0 0 0 .677 12H2.5A2.5 2.5 0 0 1 5 9.5v0A2.5 2.5 0 0 1 2.5 7h-2.1A2.5 2.5 0 0 1 3 4.5v-2"/>
    </svg>
);


const Navbar: React.FC<NavbarProps> = ({ onSignInClick, onSignUpClick }) => {
    const { isAuthenticated, user, signOut } = useAuth();

    const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-highlight hover:text-text-primary hover:bg-accent transition-colors";
    const activeNavLinkClasses = "bg-accent text-text-primary";

    return (
        <header className="bg-secondary/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                           <BrainIcon />
                           <span className="text-xl font-bold text-text-primary">SH AI Academy</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="/" className={({isActive}) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses} end>Home</NavLink>
                                <NavLink to="/courses" className={({isActive}) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Courses</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated ? (
                             <div className="flex items-center gap-4">
                                <span className="text-sm text-highlight">Welcome, {user?.name}</span>
                                <button onClick={signOut} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <button onClick={onSignInClick} className="text-highlight hover:text-text-primary font-medium py-2 px-4 rounded-md transition-colors duration-300">
                                    Sign In
                                </button>
                                <button onClick={onSignUpClick} className="bg-brand hover:bg-sky-400 text-primary font-bold py-2 px-4 rounded-md transition-colors duration-300">
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
