import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Heart, Plus, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { ContactFormSection } from '../components/ContactFormSection';

export const GalleryPage = () => {
  // ── SEO Meta Tags ──
  useEffect(() => {
    document.title = 'Wedding Gallery — Bengali Wedding Photos & Décor | Mangalgatha Kolkata';
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Browse real Bengali wedding photos from Mangalgatha — artist management, mandap décor, entertainment, and wedding shoots from 50+ weddings across Kolkata.");
    setMeta('link[rel="canonical"]', 'href', 'https://mangalgatha.in/gallery');
    setMeta('meta[property="og:title"]', 'content', 'Wedding Gallery — Bengali Wedding Photos & Décor | Mangalgatha Kolkata');
    setMeta('meta[property="og:description"]', 'content', "Browse real Bengali wedding photos from Mangalgatha — artist management, mandap décor, entertainment, and wedding shoots from 50+ weddings across Kolkata.");
    setMeta('meta[property="og:url"]', 'content', 'https://mangalgatha.in/gallery');
    return () => { document.title = 'Mangalgatha — Bengali Wedding Planner in Kolkata'; };
  }, []);

  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const categories = ['All', 'Artist Management', 'Decor', 'Entertainment', 'Wedding Shoots'];
  
  const items = [
    // Artist Management (G1-G16)
    { id: 1, category: 'Artist Management', img: '/gallery/G1.jpg' },
    { id: 2, category: 'Artist Management', img: '/gallery/G2.jpg' },
    { id: 3, category: 'Artist Management', img: '/gallery/G3.jpg' },
    { id: 4, category: 'Artist Management', img: '/gallery/G4.jpg' },
    { id: 5, category: 'Artist Management', img: '/gallery/G5.jpg' },
    { id: 6, category: 'Artist Management', img: '/gallery/G6.jpg' },
    { id: 7, category: 'Artist Management', img: '/gallery/G7.jpg' },
    { id: 8, category: 'Artist Management', img: '/gallery/G8.jpg' },
    { id: 9, category: 'Artist Management', img: '/gallery/G9.jpg' },
    { id: 10, category: 'Artist Management', img: '/gallery/G10.jpg' },
    { id: 11, category: 'Artist Management', img: '/gallery/G11.jpg' },
    { id: 12, category: 'Artist Management', img: '/gallery/G12.jpg' },
    { id: 13, category: 'Artist Management', img: '/gallery/G13.jpg' },
    { id: 14, category: 'Artist Management', img: '/gallery/G14.jpg' },
    { id: 15, category: 'Artist Management', img: '/gallery/G15.jpg' },
    { id: 16, category: 'Artist Management', img: '/gallery/G16.jpg' },
    // Decor (G17-G31)
    { id: 17, category: 'Decor', img: '/gallery/G17.jpg' },
    { id: 18, category: 'Decor', img: '/gallery/G18.jpg' },
    { id: 19, category: 'Decor', img: '/gallery/G19.jpg' },
    { id: 20, category: 'Decor', img: '/gallery/G20.jpg' },
    { id: 21, category: 'Decor', img: '/gallery/G21.jpg' },
    { id: 22, category: 'Decor', img: '/gallery/G22.jpg' },
    { id: 23, category: 'Decor', img: '/gallery/G23.jpg' },
    { id: 24, category: 'Decor', img: '/gallery/G24.jpg' },
    { id: 25, category: 'Decor', img: '/gallery/G25.jpg' },
    { id: 26, category: 'Decor', img: '/gallery/G26.jpg' },
    { id: 27, category: 'Decor', img: '/gallery/G27.jpg' },
    { id: 28, category: 'Decor', img: '/gallery/G28.jpg' },
    { id: 29, category: 'Decor', img: '/gallery/G29.jpg' },
    { id: 30, category: 'Decor', img: '/gallery/G30.jpg' },
    { id: 31, category: 'Decor', img: '/gallery/G31.jpg' },
    // Entertainment (G32-G47)
    { id: 32, category: 'Entertainment', img: '/gallery/G32.jpg' },
    { id: 33, category: 'Entertainment', img: '/gallery/G33.jpg' },
    { id: 34, category: 'Entertainment', img: '/gallery/G34.jpg' },
    { id: 35, category: 'Entertainment', img: '/gallery/G35.jpg' },
    { id: 36, category: 'Entertainment', img: '/gallery/G36.jpg' },
    { id: 37, category: 'Entertainment', img: '/gallery/G37.jpg' },
    { id: 38, category: 'Entertainment', img: '/gallery/G38.jpg' },
    { id: 39, category: 'Entertainment', img: '/gallery/G39.jpg' },
    { id: 40, category: 'Entertainment', img: '/gallery/G40.jpg' },
    { id: 41, category: 'Entertainment', img: '/gallery/G41.jpg' },
    { id: 42, category: 'Entertainment', img: '/gallery/G42.jpg' },
    { id: 43, category: 'Entertainment', img: '/gallery/G43.jpg' },
    { id: 44, category: 'Entertainment', img: '/gallery/G44.jpg' },
    { id: 45, category: 'Entertainment', img: '/gallery/G45.jpg' },
    { id: 46, category: 'Entertainment', img: '/gallery/G46.jpg' },
    { id: 47, category: 'Entertainment', img: '/gallery/G47.jpg' },
    // Wedding Shoots (G48-G63)
    { id: 48, category: 'Wedding Shoots', img: '/gallery/G48.jpg' },
    { id: 49, category: 'Wedding Shoots', img: '/gallery/G49.jpg' },
    { id: 50, category: 'Wedding Shoots', img: '/gallery/G50.webp' },
    { id: 51, category: 'Wedding Shoots', img: '/gallery/G51.jpg' },
    { id: 52, category: 'Wedding Shoots', img: '/gallery/G52.jpg' },
    { id: 53, category: 'Wedding Shoots', img: '/gallery/G53.jpg' },
    { id: 54, category: 'Wedding Shoots', img: '/gallery/G54.jpg' },
    { id: 55, category: 'Wedding Shoots', img: '/gallery/G55.jpg' },
    { id: 56, category: 'Wedding Shoots', img: '/gallery/G56.jpg' },
    { id: 57, category: 'Wedding Shoots', img: '/gallery/G57.jpg' },
    { id: 58, category: 'Wedding Shoots', img: '/gallery/G58.jpg' },
    { id: 59, category: 'Wedding Shoots', img: '/gallery/G59.jpg' },
    { id: 60, category: 'Wedding Shoots', img: '/gallery/G60.webp' },
    { id: 61, category: 'Wedding Shoots', img: '/gallery/G61.jpg' },
    { id: 62, category: 'Wedding Shoots', img: '/gallery/G62.jpg' },
    { id: 63, category: 'Wedding Shoots', img: '/gallery/G63.webp' },
  ];

  const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  return (
    <div className="pt-24 min-h-screen bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')]"></div>
      </div>

      <section className="relative z-10 border-y border-stone-200/80 bg-white/75 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-stone-500">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-stone-800">Gallery</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.28] pointer-events-none">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-[url('/gallery/bg.jpg')] bg-cover bg-left opacity-80" />
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('/gallery/bg.jpg')] bg-cover bg-right opacity-80" />
          <div className="absolute inset-0 bg-white/70" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-red uppercase tracking-[0.08em] mb-5">Gallery</h1>
            <div className="flex justify-center items-center gap-4">
              <div className="h-px w-16 bg-stone-300"></div>
              <Heart size={20} className="text-brand-red fill-brand-red" />
              <div className="h-px w-16 bg-stone-300"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 text-[10px] font-bold uppercase tracking-wider transition-all border",
                  filter === cat 
                    ? "bg-brand-red text-white border-brand-red" 
                    : "bg-white text-stone-500 border-stone-200 hover:border-brand-red"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square overflow-hidden group cursor-pointer shadow-sm border border-stone-100"
                  onClick={() => setSelectedImage(item.img)}
                >
                  <img
                    src={item.img}
                    alt={item.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-red/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-brand-red shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Plus size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-red transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactFormSection />
    </div>
  );
};
