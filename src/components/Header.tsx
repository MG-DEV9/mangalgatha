import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
  ];

  const rightLinks = [
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-brand-red/30 backdrop-blur-md",
      isScrolled ? "bg-white shadow-md py-2" : "bg-white/0 shadow-none py-3"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-center md:space-x-12">
          
          {/* Left Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {leftLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-lg font-serif italic font-semibold tracking-[0.04em] transition-colors hover:text-brand-red text-brand-gold",
                  location.pathname === link.path && "text-brand-red"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link to="/" className="flex items-center justify-center">
            <img
              src="/gallery/mglogo.png"
              alt="Mangalgatha"
              className="h-14 w-auto md:h-16 object-contain"
            />
          </Link>

          {/* Right Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {rightLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-lg font-serif italic font-semibold tracking-[0.04em] transition-colors hover:text-brand-red text-brand-gold",
                  location.pathname === link.path && "text-brand-red"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-stone-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 shadow-xl md:hidden overflow-hidden backdrop-blur-md border-b border-brand-red/20"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {allLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block text-2xl font-serif italic font-semibold tracking-[0.04em] text-stone-800 hover:text-brand-red",
                    location.pathname === link.path && "text-brand-red"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
