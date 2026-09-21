import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact Us', path: '/contact' },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-stone-700 pt-20 pb-8">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(245,238,231,0.95), rgba(245,238,231,0.95)), url('/gallery/bg.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,138,68,0.12),transparent_45%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-12 items-start">
          <div className="text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.35em] text-brand-red mb-5">Explore</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-stone-600 max-w-xs mx-auto lg:mx-0">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-brand-red transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md text-center">
            <Link to="/" className="inline-flex justify-center mb-6">
              <img
                src="/gallery/mglogo.png"
                alt="Mangalgatha"
                className="h-24 w-auto object-contain drop-shadow-sm"
                loading="lazy"
              />
            </Link>
            <p className="text-stone-600 text-[15px] leading-8 max-w-md mx-auto">
              We are a team of dedicated wedding planners committed to making your special day unforgettable. From concept to execution, we handle every detail with care and precision.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <a
                href="https://www.instagram.com/mangalgatha?igsh=MTBtMTR3N3ViYXdyMw=="
                target="_blank"
                rel="noreferrer"
                className="text-stone-700 hover:text-brand-red transition-colors"
                aria-label="Mangalgatha Instagram"
              >
                <Instagram size={22} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589136157686&sk=directory_contact_info" target="_blank" rel="noreferrer" className="text-stone-700 hover:text-brand-red transition-colors" aria-label="Mangalgatha Facebook">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-stone-700 hover:text-brand-red transition-colors">
                <Twitter size={22} />
              </a>
              <a href="#" className="text-stone-700 hover:text-brand-red transition-colors">
                <Youtube size={22} />
              </a>
            </div>
          </div>

          <div className="text-center lg:text-left max-w-sm mx-auto lg:mx-0 lg:justify-self-end">
            <p className="text-[11px] uppercase tracking-[0.35em] text-brand-red mb-5">Contact</p>
            <div className="space-y-4 text-sm text-stone-600">
              <div className="flex items-start justify-center lg:justify-start">
                <MapPin size={18} className="mr-3 text-brand-red shrink-0 mt-1" />
                <span>Bengal Eco Intelligent Park, EM Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Phone size={18} className="mr-3 text-brand-red shrink-0" />
                <span>+91 8595319969</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Mail size={18} className="mr-3 shrink-0 text-brand-red" />
                <span>info@mangalgatha.in</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.35em] text-brand-red mb-4">Calculate Your Budget</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white text-stone-800 px-4 py-3 rounded-l-xl focus:outline-none w-full text-sm border border-stone-300 placeholder:text-stone-400"
                />
                <button className="bg-brand-red text-white px-5 py-3 rounded-r-xl hover:bg-brand-red/90 transition-colors">
                  Contact
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-stone-300 text-center text-stone-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Mangalgatha Wedding Planners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
