import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart } from 'lucide-react';
import { bengaliWeddingImage } from '../utils/bengaliWeddingImages';

export const AboutPage = () => {
  // ── SEO Meta Tags ──
  useEffect(() => {
    document.title = 'About Mangalgatha — Our Story | Bengali Wedding Planner in Kolkata';
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Meet the Mangalgatha team — Kolkata's dedicated Bengali wedding planners with 5+ years of experience, 50+ weddings, and a passion for honouring every ritual.");
    setMeta('link[rel="canonical"]', 'href', 'https://mangalgatha.in/about');
    setMeta('meta[property="og:title"]', 'content', 'About Mangalgatha — Our Story | Bengali Wedding Planner in Kolkata');
    setMeta('meta[property="og:description"]', 'content', "Meet the Mangalgatha team — Kolkata's dedicated Bengali wedding planners with 5+ years of experience, 50+ weddings, and a passion for honouring every ritual.");
    setMeta('meta[property="og:url"]', 'content', 'https://mangalgatha.in/about');
    return () => { document.title = 'Mangalgatha — Bengali Wedding Planner in Kolkata'; };
  }, []);

  return (
    <div className="pt-24">
      <section className="relative z-10 border-y border-stone-200/80 bg-white/75 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-stone-500">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-stone-800">About Us</span>
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-red uppercase tracking-[0.08em] mb-5">About Us</h1>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-16 bg-stone-300"></div>
            <Heart size={20} className="text-brand-red fill-brand-red" />
            <div className="h-px w-16 bg-stone-300"></div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={bengaliWeddingImage(800, 1000, 'bengali,wedding,bride,groom', 40)} alt="About" className="rounded-3xl shadow-2xl" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-red rounded-3xl -z-10 hidden md:block"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-8 uppercase tracking-tight">Our Story</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Founded with a passion for creating magical moments, Mangalgatha has grown into one of the most trusted names in the wedding planning industry. We believe that every wedding is unique and deserves a personalized touch.
              </p>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Our team of experienced professionals works tirelessly to ensure that every detail, from the smallest floral arrangement to the grandest venue setup, is executed to perfection.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-bold text-brand-red mb-2">5+</h4>
                  <p className="text-stone-500 text-sm uppercase tracking-widest">Years of Magic</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-brand-red mb-2">50+</h4>
                  <p className="text-stone-500 text-sm uppercase tracking-widest">Happy Couples</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
