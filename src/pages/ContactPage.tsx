/// <reference types="vite/client" />
import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, MapPin, Mail, Phone, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { bengaliWeddingImage } from '../utils/bengaliWeddingImages';

const referralSources = ['A Friend', 'Instagram', 'Facebook', 'Google or Website'];

const planningOptions = [
  'Full Wedding Planning (Complete turn key wedding planning and management)',
  'On-the-day wedding coordination',
  'Wedding Consultancy',
  'Intimate Wedding Planning (With a maximum of 100 guests)',
  'Remote Wedding Planning (We plan the entire wedding remotely for you)',
  'Celebration at home (For a maximum guest list of 35 people, we plan, curate and style your celebration)',
];

const ContactPage = () => {
  // ── SEO Meta Tags ──
  useEffect(() => {
    document.title = 'Contact Mangalgatha — Bengali Wedding Planner in Kolkata | Free Consultation';
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Get in touch with Mangalgatha for a free wedding planning consultation. Office: Sector V, Bidhannagar, Kolkata 700091. Call +91 8595319969 or WhatsApp us.");
    setMeta('link[rel="canonical"]', 'href', 'https://mangalgatha.in/contact');
    setMeta('meta[property="og:title"]', 'content', 'Contact Mangalgatha — Bengali Wedding Planner in Kolkata | Free Consultation');
    setMeta('meta[property="og:description"]', 'content', "Get in touch with Mangalgatha for a free wedding planning consultation. Office: Sector V, Bidhannagar, Kolkata 700091. Call +91 8595319969 or WhatsApp us.");
    setMeta('meta[property="og:url"]', 'content', 'https://mangalgatha.in/contact');
    return () => { document.title = 'Mangalgatha — Bengali Wedding Planner in Kolkata'; };
  }, []);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bride_groom_name: '',
    phone: '',
    email: '',
    event_date_dd: '',
    event_date_mm: '',
    event_date_yyyy: '',
    event_details: '',
    guests: '',
  });

  const [sources, setSources] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showPigeon, setShowPigeon] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const { value, checked } = e.target;
    setState((prev) => 
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        title: `Inquiry from ${formData.first_name} ${formData.last_name}`,
        first_name: formData.first_name,
        last_name: formData.last_name,
        bride_groom_name: formData.bride_groom_name,
        email: formData.email,
        phone: formData.phone,
        event_date: `${formData.event_date_dd}/${formData.event_date_mm}/${formData.event_date_yyyy}`,
        guests: formData.guests,
        source: sources.join(', '),
        services: services.join(', '),
        event_details: formData.event_details,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'default_public_key'
      );

      setSubmitStatus('success');
      setShowPigeon(true);
      setTimeout(() => setShowPigeon(false), 4500);
      setFormData({
        first_name: '',
        last_name: '',
        bride_groom_name: '',
        phone: '',
        email: '',
        event_date_dd: '',
        event_date_mm: '',
        event_date_yyyy: '',
        event_details: '',
        guests: '',
      });
      setSources([]);
      setServices([]);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24">
      {/* ── Wedding Success Overlay ── */}
      <AnimatePresence>
        {showPigeon && (
          <motion.div
            key="wedding-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden pointer-events-none"
          >
            {/* Backdrop — warm crimson-gold radial */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 55%, rgba(212,175,55,0.32) 0%, rgba(190,18,60,0.70) 30%, rgba(90,5,20,0.92) 68%, rgba(15,3,8,0.97) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* ── Wedding card ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.55, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.55, y: 50 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-20 flex flex-col items-center text-center px-8 md:px-14 py-10 rounded-3xl max-w-md w-full mx-4"
              style={{
                background: 'linear-gradient(150deg, rgba(243,121,128,0.30) 0%, rgba(255,255,255,0.08) 45%, rgba(184,138,68,0.16) 100%)',
                border: '1.5px solid rgba(184,138,68,0.50)',
                boxShadow: '0 0 50px rgba(243,121,128,0.55), 0 0 100px rgba(184,138,68,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Mandap arch SVG top decoration */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-48 pointer-events-none select-none">
                <svg viewBox="0 0 200 60" width="200" height="60" xmlns="http://www.w3.org/2000/svg">
                  {/* Main arch */}
                  <path d="M10 58 Q10 8 100 8 Q190 8 190 58" stroke="#B88A44" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
                  {/* Inner arch */}
                  <path d="M26 58 Q26 22 100 22 Q174 22 174 58" stroke="#B88A44" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
                  {/* Hanging marigold dots */}
                  {[20, 44, 68, 100, 132, 156, 180].map((cx, i) => {
                    const cy = i === 3 ? 10 : i === 0 || i === 6 ? 54 : i === 1 || i === 5 ? 30 : 18;
                    return <circle key={i} cx={cx} cy={cy} r="4" fill="#B88A44" opacity="0.85" />;
                  })}
                  {/* Side pillars */}
                  <rect x="6" y="35" width="8" height="23" rx="4" fill="#F37980" opacity="0.6" />
                  <rect x="186" y="35" width="8" height="23" rx="4" fill="#F37980" opacity="0.6" />
                  {/* Top kalash */}
                  <ellipse cx="100" cy="6" rx="10" ry="7" fill="#B88A44" opacity="0.9" />
                  <ellipse cx="100" cy="3" rx="5" ry="3" fill="#F37980" opacity="0.8" />
                  <circle cx="100" cy="1" r="2" fill="#B88A44" />
                </svg>
              </div>

              {/* Spinning wedding ring */}
              <motion.div
                animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ rotateY: { duration: 3, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
                className="text-6xl mb-1 mt-4 select-none"
                style={{ filter: 'drop-shadow(0 0 14px #B88A44) drop-shadow(0 0 28px rgba(243,121,128,0.5))' }}
              >
                💍
              </motion.div>

              {/* Bengali script */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-amber-300 font-serif text-xl mb-1 select-none"
                style={{ textShadow: '0 1px 12px rgba(184,138,68,0.8)', letterSpacing: '0.08em' }}
              >
                मंगलगाथा
              </motion.p>

              {/* Main heading */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white font-serif text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{ textShadow: '0 2px 24px rgba(184,138,68,0.6), 0 0 50px rgba(243,121,128,0.4)' }}
              >
                Message Sent! 💌
              </motion.h2>

              {/* Divider with couple icons */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="flex items-center gap-3 mb-3 w-full justify-center"
              >
                <div className="h-px flex-1 bg-linear-to-r from-transparent to-amber-400/50" />
                <span className="text-lg select-none">👰🤵</span>
                <div className="h-px flex-1 bg-linear-to-l from-transparent to-amber-400/50" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="text-amber-100 text-base leading-7 mb-2"
              >
                Your wedding journey begins here. 🌹
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-white/50 text-sm"
              >
                We&apos;ll reach out soon to plan your dream day ✨
              </motion.p>

              {/* Bottom mandap base decoration */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none px-4">
                <svg viewBox="0 0 300 20" width="100%" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10 Q75 0 150 10 Q225 20 300 10" stroke="#B88A44" strokeWidth="1.5" fill="none" opacity="0.5" />
                  {[30, 90, 150, 210, 270].map((cx, i) => (
                    <circle key={i} cx={cx} cy={i % 2 === 0 ? 6 : 14} r="3" fill="#B88A44" opacity="0.7" />
                  ))}
                </svg>
              </div>
            </motion.div>

            {/* ── Rising wedding bubbles ── */}
            {[
              { emoji: '💍', size: 46, x: '5%',  delay: 0.0, dur: 3.8 },
              { emoji: '💐', size: 52, x: '14%', delay: 0.4, dur: 4.0 },
              { emoji: '❤️', size: 40, x: '24%', delay: 0.7, dur: 3.3 },
              { emoji: '🪔', size: 38, x: '34%', delay: 0.2, dur: 3.6 },
              { emoji: '💒', size: 56, x: '44%', delay: 0.9, dur: 4.2 },
              { emoji: '🥂', size: 42, x: '54%', delay: 0.1, dur: 3.5 },
              { emoji: '🌹', size: 48, x: '64%', delay: 0.5, dur: 3.9 },
              { emoji: '💍', size: 34, x: '74%', delay: 0.8, dur: 3.2 },
              { emoji: '🎊', size: 50, x: '83%', delay: 0.3, dur: 4.1 },
              { emoji: '💐', size: 36, x: '92%', delay: 0.6, dur: 3.7 },
              { emoji: '❤️', size: 44, x: '10%', delay: 1.2, dur: 3.4 },
              { emoji: '🪔', size: 30, x: '30%', delay: 1.5, dur: 3.8 },
              { emoji: '🥂', size: 54, x: '50%', delay: 1.1, dur: 4.0 },
              { emoji: '🌹', size: 38, x: '70%', delay: 1.4, dur: 3.6 },
              { emoji: '🎊', size: 44, x: '88%', delay: 1.3, dur: 3.3 },
              { emoji: '💒', size: 32, x: '20%', delay: 1.8, dur: 3.9 },
              { emoji: '💍', size: 58, x: '60%', delay: 1.7, dur: 4.1 },
              { emoji: '💐', size: 28, x: '40%', delay: 2.0, dur: 3.5 },
            ].map((h, i) => (
              <motion.div
                key={`bubble-${i}`}
                initial={{ opacity: 0, y: '108vh', scale: 0.3 }}
                animate={{
                  opacity: [0, 0.92, 0.92, 0],
                  y: ['108vh', '65vh', '22vh', '-8vh'],
                  scale: [0.3, 1, 1.08, 0.75],
                  x: [0, (i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? -15 : 15), 0],
                }}
                transition={{
                  delay: h.delay,
                  duration: h.dur,
                  ease: 'easeOut',
                  times: [0, 0.3, 0.72, 1],
                }}
                className="absolute pointer-events-none select-none"
                style={{ left: h.x, bottom: 0, fontSize: h.size, lineHeight: 1, zIndex: 15 }}
              >
                {h.emoji}
              </motion.div>
            ))}

            {/* ── Marigold & rose petal rain from top ── */}
            {['🌸', '🌺', '🌼', '🌸', '🌹', '🌼', '🌺', '🌸', '🌹', '🌼', '🌺', '🌸'].map((p, i) => (
              <motion.span
                key={`petal-${i}`}
                initial={{ opacity: 0, y: '-8vh', rotate: 0 }}
                animate={{
                  opacity: [0, 0.9, 0.9, 0],
                  y: ['-8vh', '25vh', '65vh', '108vh'],
                  rotate: [0, 160 + i * 30, 320 + i * 40],
                  x: [`${6 + i * 8}vw`, `${6 + i * 8 + (i % 2 === 0 ? 4 : -4)}vw`],
                }}
                transition={{
                  delay: 0.05 + i * 0.22,
                  duration: 3.2 + (i % 3) * 0.6,
                  ease: 'linear',
                }}
                className="absolute pointer-events-none select-none text-xl md:text-2xl"
                style={{ top: 0, zIndex: 12 }}
              >
                {p}
              </motion.span>
            ))}

            {/* ── Diya / sparkle burst particles ── */}
            {['🪔', '✨', '🌟', '🪔', '💫', '✨', '🪔', '🌟', '💫', '🪔', '✨', '🌟'].map((s, i) => (
              <motion.span
                key={`spark-${i}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1.4, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (80 + i * 18)],
                  y: [0, -(90 + i * 25)],
                }}
                transition={{
                  delay: 0.15 + i * 0.15,
                  duration: 1.8 + (i % 3) * 0.4,
                  ease: 'easeOut',
                }}
                className="absolute pointer-events-none select-none text-xl md:text-2xl"
                style={{
                  left: `${12 + (i * 7) % 76}%`,
                  top: `${35 + (i * 5) % 30}%`,
                  zIndex: 18,
                }}
              >
                {s}
              </motion.span>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
      <section className="border-y border-stone-200/80 bg-white/65 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-stone-500">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-stone-800">Contact Us Now</span>
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
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-red uppercase tracking-[0.08em] mb-5">
              Contact Us
            </h1>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="h-px w-16 bg-stone-300"></div>
              <Heart size={20} className="text-brand-red fill-brand-red" />
              <div className="h-px w-16 bg-stone-300"></div>
            </div>
            <p className="text-stone-600 max-w-3xl mx-auto text-sm md:text-base leading-7">
              Tell us your story, your event details, and the kind of celebration you dream about. We will shape it into a wedding experience that feels deeply personal.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-14 md:py-20">
        <div className="absolute inset-0 opacity-[0.22] pointer-events-none">
          <div className="absolute inset-0 bg-[url('/gallery/bg.jpg')] bg-cover bg-center" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 border border-stone-200 shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.aside
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-b lg:border-b-0 lg:border-r border-stone-200 p-5 md:p-8"
              >
                <div className="overflow-hidden border border-stone-200">
                  <img
                    src={bengaliWeddingImage(900, 1100, 'bengali,wedding,stage,decor', 81)}
                    alt="Wedding stage decor"
                    className="w-full h-80 md:h-115 object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="text-center pt-8">
                  <h2 className="text-3xl font-serif text-brand-red mb-6">Contact Us</h2>
                  <div className="space-y-4 text-stone-600 text-sm leading-7">
        
                    <p className="flex items-start justify-center gap-3">
                      <MapPin size={18} className="text-brand-red mt-1 shrink-0" />
                      <span>Bengal Eco Intelligent Park, EM Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091</span>
                    </p>
                    <p className="flex items-center justify-center gap-3">
                      <Mail size={18} className="text-brand-red shrink-0" />
                      <span>info.mangalgatha.in</span>
                    </p>
                    <p className="flex items-center justify-center gap-3">
                      <Phone size={18} className="text-brand-red shrink-0" />
                      <span>+91 8595319969</span>
                    </p>
                    <p>Tel: +91 8595319969</p>
                  </div>
                </div>
              </motion.aside>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-5 md:p-8 lg:p-10"
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-serif text-brand-red mb-3">Please Share Your Details</h2>
                  <p className="text-stone-600 text-sm leading-7 max-w-2xl">
                    Share a few details about your wedding vision and let us guide you through the planning journey with ease, warmth, and thoughtful execution.
                  </p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">First Name</span>
                      <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required className="w-full border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-red" />
                    </label>
                    <label className="block">
                      <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">Last Name</span>
                      <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required className="w-full border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-red" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">Bride & Groom&apos;s Name *</span>
                    <input type="text" name="bride_groom_name" value={formData.bride_groom_name} onChange={handleInputChange} required className="w-full border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-red" />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">Phone * </span>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-red" />
                    </label>
                    <label className="block">
                      <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">Email Address *</span>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-red" />
                    </label>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-700 mb-3">Where did you hear about us? *</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-600">
                      {referralSources.map((source) => (
                        <label key={source} className="flex items-center gap-3">
                          <input type="checkbox" value={source} checked={sources.includes(source)} onChange={(e) => handleCheckboxChange(e, setSources)} className="h-4 w-4 border-stone-300 accent-brand-red" />
                          <span>{source}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-serif text-stone-900 mb-2">What do you need us to do?</h3>
                    <p className="text-sm text-stone-600 leading-7 mb-4">
                      In light of the current times, we have devised some simple ways to make the process of planning your celebrations easier and hassle free. Choose from one of our many services.
                    </p>
                    <div className="space-y-3 text-sm text-stone-700">
                      {planningOptions.map((option) => (
                        <label key={option} className="flex items-start gap-3">
                          <input type="checkbox" value={option} checked={services.includes(option)} onChange={(e) => handleCheckboxChange(e, setServices)} className="mt-1 h-4 w-4 border-stone-300 accent-brand-red" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">When is your event? *</span>
                    <div className="flex gap-4">
                      <label className="block">
                        <input type="text" name="event_date_dd" value={formData.event_date_dd} onChange={handleInputChange} maxLength={2} required className="w-16 border border-stone-300 bg-white px-3 py-3 text-center outline-none focus:border-brand-red" />
                        <span className="block text-[11px] tracking-[0.22em] text-stone-500 mt-2 text-center">DD</span>
                      </label>
                      <label className="block">
                        <input type="text" name="event_date_mm" value={formData.event_date_mm} onChange={handleInputChange} maxLength={2} required className="w-16 border border-stone-300 bg-white px-3 py-3 text-center outline-none focus:border-brand-red" />
                        <span className="block text-[11px] tracking-[0.22em] text-stone-500 mt-2 text-center">MM</span>
                      </label>
                      <label className="block">
                        <input type="text" name="event_date_yyyy" value={formData.event_date_yyyy} onChange={handleInputChange} maxLength={4} required className="w-20 border border-stone-300 bg-white px-3 py-3 text-center outline-none focus:border-brand-red" />
                        <span className="block text-[11px] tracking-[0.22em] text-stone-500 mt-2 text-center">YYYY</span>
                      </label>
                    </div>
                  </div>

                  <label className="block">
                    <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">Tell us about your event *</span>
                    <span className="block text-sm text-stone-500 mb-3">
                      The number and kind of functions you&apos;re planning. Venues, style, anything else you&apos;d like to tell us :)
                    </span>
                    <textarea name="event_details" value={formData.event_details} onChange={handleInputChange} required rows={6} className="w-full border border-stone-300 bg-white px-4 py-3 outline-none resize-none focus:border-brand-red" />
                  </label>

                  <label className="block">
                    <span className="block text-xs uppercase tracking-[0.18em] text-stone-700 mb-2">How many guests are you expecting?</span>
                    <input type="text" name="guests" value={formData.guests} onChange={handleInputChange} className="w-full border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-red" />
                  </label>

                  <div className="flex flex-col gap-3">
                    {submitStatus === 'success' && (
                      <div className="bg-green-50 text-green-800 p-4 border border-green-200">
                        Thank you for your inquiry! We&apos;ll get back to you shortly.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="bg-red-50 text-red-800 p-4 border border-red-200">
                        There was an error sending your message. Please try again or contact us directly.
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button disabled={isSubmitting} className="flex items-center gap-2 bg-stone-900 px-7 py-3 text-white text-xs uppercase tracking-[0.2em] hover:bg-brand-red transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                        {isSubmitting ? 'Sending...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>

          <div className="mt-14 border border-stone-200 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d460.51270890037495!2d88.426745!3d22.5753004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b0bec3481d%3A0xe3a617d1a7f7d08f!2sHaldia%20petrochemicals%20Ltd.!5e0!3m2!1sen!2sin!4v1789982710953!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mangalgatha Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
