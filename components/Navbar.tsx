
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DevziLogo from './DevziLogo';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Process', path: '/process' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const { user, signInWithGoogle, signOut } = useAuth();

  // ... (navItems setup)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex items-center justify-between pointer-events-auto">
      <Link to="/" className="flex items-center gap-4 group">
        <DevziLogo size={52} />
        <span className="font-bold text-xl tracking-tight uppercase group-hover:text-[#3B82F6] transition-colors">
          Devzi
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`relative text-[10px] font-bold tracking-widest uppercase transition-opacity hover:opacity-100 ${location.pathname === item.path ? 'opacity-100' : 'opacity-40'
              }`}
          >
            {item.name}
            {location.pathname === item.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#F97316]"
              />
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {/* Auth Button */}
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:border-[#3B82F6] transition-all"
            >
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-5 h-5 rounded-full" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest">{user.email?.split('@')[0]}</span>
            </button>
            <button
              onClick={() => signOut()}
              className="text-[10px] text-white/40 hover:text-white uppercase font-bold tracking-widest"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block px-6 py-2 rounded-full border border-white/20 hover:border-[#3B82F6] transition-all text-[10px] font-bold uppercase tracking-widest bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 hover:shadow-[#3B82F6]/10 active:scale-95 flex items-center gap-2"
          >
            <span>Sign In</span>
          </button>
        )}

        {/* Start Project button */}
        <button
          onClick={() => navigate('/architect')}
          className="px-6 py-2 rounded-full border border-white/20 hover:border-[#3B82F6] transition-all text-[10px] font-bold uppercase tracking-widest bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 hover:shadow-[#3B82F6]/10 active:scale-95"
        >
          Start Project
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
