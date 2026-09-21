import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { Sparkles, MapPin, Heart, ChevronRight, ChevronLeft, Music, Users, CheckCircle2 } from 'lucide-react';

// Gallery image count (G1 to G63)
const generateShuffledGalleryIndices = () => {
  const indices = Array.from({ length: 63 }, (_, i) => i + 1);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

export const HomePage = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [serviceSlide, setServiceSlide] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [featuredImagesIndex, setFeaturedImagesIndex] = useState(0);
  const [shuffledIndices, setShuffledIndices] = useState(() => generateShuffledGalleryIndices());
  const testimonialProgress = useMotionValue(0);
  const testimonialAutoplayDuration = 7;
  const featuredAutoplayDuration = 4500;

  const heroImages = [
    '/gallery/hero1.jpg',
    '/gallery/hero3.jpg',
  ];
  const decorativeImages = {
    chant: '/gallery/chant.png',
    butterfly: '/gallery/butterfly.jpg',
    spb: '/gallery/spb.png',
  };
  const whatsappLink =
    'https://wa.me/918595319969?text=Hi%20Mangalgatha%20team!%20I%20would%20love%20to%20plan%20my%20wedding%20with%20you.';

  const stats = [
    { value: '50+', label: 'Weddings Planned' },
    { value: '5+', label: 'Years Experience' },
    { value: '100%', label: 'Happy Clients' },

  ];

  const services = [
    { title: 'DESIGN', subtitle: 'Exquisite Decor', desc: 'Transforming spaces into magical settings with our creative designs and meticulous attention to detail.', icon: Sparkles, features: ['Theme Selection', 'Floral Arrangements', 'Lighting Design', 'Stage Setup'] },
    { title: 'MUSICAL', subtitle: 'Entertainment', desc: 'Curating the perfect soundtrack and entertainment for your celebrations, from classical to contemporary.', icon: Music, features: ['Live Bands', 'Professional DJs', 'Traditional Artists', 'Sound Systems'] },
    { title: 'DESTINATION', subtitle: 'Pan India Planning', desc: 'Planning your dream wedding at the most beautiful locations across India, handling all logistics seamlessly.', icon: MapPin, features: ['Venue Scouting', 'Travel Logistics', 'Local Vendor Coordination', 'Guest Hospitality'] },
    { title: 'MANAGEMENT', subtitle: 'Vendor Coordination', desc: 'Managing all your vendors to ensure a cohesive and stress-free planning experience from start to finish.', icon: Users, features: ['Catering Management', 'Photography/Video', 'Makeup Artists', 'Invitations'] },
    { title: 'TRANSPORTATION', subtitle: 'Logistics & Travel', desc: 'Ensuring smooth transportation and logistics for you and your guests throughout the wedding festivities.', icon: Users, features: ['Luxury Car Rentals', 'Guest Transfers', 'Valet Services', 'Travel Bookings'] },
    { title: 'BUDGET MANAGEMENT', subtitle: 'Financial Planning', desc: 'Helping you maximize your budget while ensuring every aspect of your wedding meets your expectations.', icon: CheckCircle2, features: ['Budget Tracking', 'Vendor Negotiations', 'Payment Schedules', 'Cost Optimization'] },
  ];
  const socialEvents = [
    { title: 'Engagement Ceremony', image: '/gallery/G8.jpg' },
    { title: 'Gaye Holud', image: '/gallery/G20.jpg' },
    { title: 'Mehndi Ceremony', image: '/gallery/social-mehndi.jpg' },
    { title: 'Sangeet Night', image: '/gallery/G35.jpg' },
    { title: 'Baraat Celebrations', image: '/gallery/G42.jpg' },
    { title: 'Wedding Ceremony', image: '/gallery/G55.jpg' },
    { title: 'Reception Entry', image: '/gallery/G58.jpg' },
    { title: 'Rice Ceremony (Annaprashan)', image: '/gallery/social-rice-ceremony.jpg' },
    { title: 'Baby Shower', image: '/gallery/social-baby-shower.jpg' },
    { title: 'Birthday Party', image: '/gallery/social-birthday.jpg' },
    { title: 'Anniversary Celebration', image: '/gallery/social-anniversary.jpg' },
  ];
  const testimonials = [
    {
      quote:
        'I recently celebrated my wedding and they did a great job at managing the whole event. Starting with the decor to the food, everything was handled with great attention to detail. Was really satisfied and would totally recommend.',
      name: 'Rahul  & Avipsha',
      image: '/gallery/G66.jpeg',
    },
    {
      quote:
        'Referred by one of their intern Rooprekha Ghosh, Mangalgatha was the best decision I took for my wedding. From decor to coordination, everything was flawless. The team was super professional, creative, and easy to work with. Could not have asked for a better experience. Highly recommend.',
      name: 'Shreya & Deb',
      image: '/gallery/G67.jpg',
    },
        {
      quote:
        "Excellent food preparation with well coordinated professional service. Highly recommend. We took their service for our brother's marriage; professional with a human touch.",
      name: 'Sneha & Anand',
      image: '/gallery/G25.jpg',
    },
    {
      quote:
        'Food bhi tasty tha aur photography bhi top class. Kya combination hai inka! Pratham ne ek bhi important moment miss nahi kiya. Every photo feels alive. Super happy with the outcome.',
      name: 'NIK CHAUHAN',
      image: '/gallery/test4.jpg',
    },
    {
      quote:
        'It started raining during our event, but Mangalgatha had a backup plan in place. The tent and covered area were set up so fast. No panic, no stress. Huge thanks to the team for capturing emotions even in chaos. Best Mangalgatha.',
      name: 'JAGATPATI DAS',
      image: '/gallery/test1.jpg',
    },
    {
      quote:
        'Baraat entry ka pura coordination team ne sambhala. DJ van, cold pyro, flower shots - sab planned tha. Guests full energy mein the. Mangalgatha rocks.',
      name: 'GUDDU AGARWAL',
      image: '/gallery/test2.jpeg',
    },
  ];

  const visibleServices = services.slice(serviceSlide, serviceSlide + 3);
  const activeTestimonial = testimonials[testimonialSlide];
  const nextTestimonialSlide = () => {
    setTestimonialSlide((current) => (current + 1) % testimonials.length);
  };
  const previousTestimonialSlide = () => {
    setTestimonialSlide((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  // ── SEO Meta Tags ──
  useEffect(() => {
    document.title = 'Mangalgatha — Best Bengali Wedding Planner in Kolkata | Venue, Décor & Planning';
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Mangalgatha is Kolkata's trusted Bengali wedding planner. Full-service planning, venue sourcing, décor design, Gaye Holud coordination & 50+ weddings delivered. Call +91 8595319969.");
    setMeta('link[rel="canonical"]', 'href', 'https://mangalgatha.in/');
    setMeta('meta[property="og:title"]', 'content', 'Mangalgatha — Best Bengali Wedding Planner in Kolkata');
    setMeta('meta[property="og:description"]', 'content', "Kolkata's trusted Bengali wedding planner. Full-service planning, venue sourcing, décor design, Gaye Holud coordination & 50+ weddings delivered.");
    setMeta('meta[property="og:url"]', 'content', 'https://mangalgatha.in/');
    return () => { document.title = 'Mangalgatha — Bengali Wedding Planner in Kolkata'; };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setServiceSlide((current) => (current >= services.length - 3 ? 0 : current + 1));
    }, 2600);

    return () => window.clearInterval(timer);
  }, [services.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroImages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedImagesIndex((current) => {
        const nextIndex = current + 1;
        if (nextIndex >= shuffledIndices.length - 5) {
          setShuffledIndices(generateShuffledGalleryIndices());
          return 0;
        }
        return nextIndex;
      });
    }, featuredAutoplayDuration);

    return () => window.clearInterval(timer);
  }, [shuffledIndices.length]);

  useEffect(() => {
    testimonialProgress.set(0);

    const animation = animate(testimonialProgress, 1, {
      duration: testimonialAutoplayDuration,
      ease: 'linear',
      onComplete: nextTestimonialSlide,
    });

    return () => animation.stop();
  }, [testimonialAutoplayDuration, testimonialProgress, testimonialSlide]);

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness", "WebSite"],
        "name": "Mangalgatha Wedding Planners",
        "url": "https://mangalgatha.in/",
        "logo": "https://mangalgatha.in/gallery/mglogo.png",
        "image": "https://mangalgatha.in/gallery/mglogo.png",
        "telephone": "+91-8595319969",
        "email": "info@mangalgatha.in",
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "Room No-702, 7th Floor, Sidco Global Tower, CN 8/2, CN Block, Sector V",
            "addressLocality": "Bidhannagar, Kolkata",
            "addressRegion": "West Bengal",
            "postalCode": "700091",
            "addressCountry": "IN"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Bengal Eco Intelligent Park, EM Block, Sector V",
            "addressLocality": "Bidhannagar, Kolkata",
            "addressRegion": "West Bengal",
            "postalCode": "700091",
            "addressCountry": "IN"
          }
        ],
        "priceRange": "₹₹₹",
        "sameAs": [
          "https://www.instagram.com/mangalgatha?igsh=MTBtMTR3N3ViYXdyMw==",
          "https://www.facebook.com/profile.php?id=61589136157686"
        ]
      }) }} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={heroImages[heroSlide]}
              initial={{ opacity: 0.35, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0.25, scale: 1.04 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              src={heroImages[heroSlide]}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10 items-center">
            <div className="text-center xl:text-left text-white">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brand-white font-script text-3xl md:text-4xl mb-4"
              >
                Your dream wedding, Just a Whatsapp away!
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 flex justify-center xl:justify-start"
              >
                <img
                  src="/gallery/mglogo.png"
                  alt="Mangalgatha"
                  className="w-full max-w-140 rounded-xl bg-white/90 p-3 shadow-2xl md:p-4"
                />
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mx-auto xl:mx-0 w-full max-w-95"
            >
              <div className="border-10px border-white bg-black/30 backdrop-blur-md p-6 md:p-8 text-center text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                <div className="flex justify-center mb-0">
                  <img src="/gallery/topor.png" alt="" aria-hidden="true" className="h-24 w-32 object-contain" />
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold leading-none drop-shadow-md">
                  NEED A
                </h2>
                <h3 className="text-5xl md:text-6xl font-serif font-bold leading-none drop-shadow-md mb-5">
                  PLANNER?
                </h3>
                <p className="text-2xl md:text-[2rem] leading-tight text-white/95">
                  Good, we are here
                </p>
                <p className="text-2xl md:text-[2rem] leading-tight text-white/95 mb-8">
                  to <span className="font-bold">PLAN FOR</span> you
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-[#ff4b6e] px-8 py-3 text-base font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-transform hover:-translate-y-1 hover:bg-[#ff365f]"
                >
                  Enquiry
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.16] pointer-events-none">
          <div className="absolute inset-0 bg-[url('/gallery/bg.jpg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-white/78"></div>
        <img
          src={decorativeImages.butterfly}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-6 hidden w-24 opacity-15 mix-blend-multiply md:block"
          loading="lazy"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <p className="text-4xl md:text-5xl font-bold text-brand-red mb-2">{stat.value}</p>
                <p className="text-stone-500 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.16] pointer-events-none">
          <div className="absolute inset-0 bg-[url('/gallery/bg.jpg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-white/82"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 uppercase tracking-tight">
              OUR <span className="text-brand-red">SERVICES</span>
            </h2>
            <div className="flex justify-center items-center mt-4">
              <div className="h-px w-12 bg-stone-200"></div>
              <Heart size={16} className="mx-4 text-brand-red fill-brand-red" />
              <div className="h-px w-12 bg-stone-200"></div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-8">
              {Array.from({ length: services.length - 2 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setServiceSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${serviceSlide === index ? 'w-12 bg-brand-red' : 'w-2.5 bg-stone-300 hover:bg-stone-400'}`}
                  aria-label={`Go to service slide ${index + 1}`}
                />
              ))}
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {visibleServices.map((service, i) => (
              <div key={`${service.subtitle}-${serviceSlide}-${i}`} className="relative overflow-hidden bg-white border border-stone-200 px-8 py-9 shadow-[0_12px_35px_rgba(0,0,0,0.06)]">
                <img
                  src={decorativeImages.chant}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 right-4 w-32 opacity-[0.1] mix-blend-multiply"
                  loading="lazy"
                />
                <div className="flex items-start justify-between mb-12">
                  <div className="w-28 h-28 rounded-full bg-rose-50 flex items-center justify-center">
                    <service.icon size={46} strokeWidth={1.2} className="text-brand-red" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white text-xl font-bold flex items-center justify-center">
                    {String(serviceSlide + i + 1).padStart(2, '0')}
                  </div>
                </div>

                <h3 className="text-xs font-bold text-brand-red uppercase tracking-[0.35em] mb-5">
                  {service.title}
                </h3>
                <h4 className="text-4xl font-serif font-bold text-stone-900 uppercase tracking-tight mb-8 relative inline-block">
                  {service.subtitle}
                  <span className="absolute -bottom-3 left-0 w-20 h-0.5 bg-brand-red/35"></span>
                </h4>
                <p className="text-stone-500 text-lg leading-9 mb-10">
                  {service.desc}
                </p>

                <ul className="space-y-4 mb-14">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-stone-600 text-sm uppercase tracking-[0.18em]">
                      <div className="w-2 h-2 bg-rose-300 rounded-full mr-4"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="inline-flex items-center text-stone-900 text-sm font-bold uppercase tracking-[0.35em] hover:text-brand-red transition-colors border-b border-stone-200 pb-3">
                  Enquire Now
                  <ChevronRight size={16} className="ml-3" />
                </Link>
              </div>
            ))}
          </div>
          </div>

          <div className="mt-20 text-center">
            <Link to="/services" className="inline-block gradient-brand text-white px-12 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/gallery/hero2.jpg')] bg-cover bg-center opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-stone-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <p className="text-brand-red font-bold tracking-widest uppercase mb-4">Our Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-bold">Featured Weddings</h2>
            </div>
            <Link to="/gallery" className="mt-6 md:mt-0 text-white/60 hover:text-white font-bold inline-flex items-center">
              VIEW ALL WORKS <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {shuffledIndices.slice(featuredImagesIndex, featuredImagesIndex + 6).map((imageNum, idx) => {
                const getImageExtension = (num: number) => {
                  if (num === 50 || num === 60 || num === 63) return 'webp';
                  return 'jpg';
                };
                const extension = getImageExtension(imageNum);
                return (
                  <motion.div
                    key={`${featuredImagesIndex}-${imageNum}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                    className="relative aspect-4/5 rounded-2xl overflow-hidden group"
                  >
                    <img
                      src={`/gallery/G${imageNum}.${extension}`}
                      alt={`Wedding ${imageNum}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-6 text-4xl md:text-5xl font-bold uppercase tracking-tight text-stone-900">
              Real Celebrations,
              <span className="block text-brand-red">Fresh Inspiration</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-600">
              From engagement to reception, and every family milestone in between — a look at the social events Mangalgatha brings to life.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/gallery"
                className="inline-flex items-center rounded-full bg-brand-red px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-transform hover:-translate-y-1"
              >
                Explore Gallery
              </Link>
              <a
                href="https://www.instagram.com/mangalgatha?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] text-stone-700 transition-colors hover:text-brand-red"
              >
                View Instagram
                <ChevronRight size={16} className="ml-2" />
              </a>
            </div>
          </div>

          <div className="relative mt-14 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white to-transparent sm:w-16" />

            <div className="marquee-track flex w-max gap-4 py-6 sm:gap-5">
              {[...socialEvents, ...socialEvents].map((event, index) => (
                <div
                  key={`${event.title}-${index}`}
                  className="group relative w-56 shrink-0 sm:w-64"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out group-hover:z-10 group-hover:scale-110 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-64 w-full object-cover sm:h-72"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white">{event.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials" className="relative overflow-hidden py-24 bg-[#eef2f3]">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div className="absolute inset-0 bg-[url('/gallery/bg.jpg')] bg-cover bg-center" />
        </div>
        <img
          src={decorativeImages.spb}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 right-6 hidden w-24 opacity-20 mix-blend-multiply md:block"
          loading="lazy"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 uppercase tracking-tight">What Our <span className="text-brand-red">Clients Say</span></h2>
            <div className="flex justify-center items-center mt-4">
              <div className="h-px w-12 bg-stone-300"></div>
              <Heart size={16} className="mx-4 text-brand-red fill-brand-red" />
              <div className="h-px w-12 bg-stone-300"></div>
            </div>
          </div>

          <div className="relative z-10 rounded-[2.2rem] border border-white/70 bg-linear-to-br from-white via-[#fff8f4] to-[#fff2f5] px-6 py-8 md:px-10 md:py-10 shadow-[0_24px_70px_rgba(157,23,77,0.14)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid gap-10 lg:grid-cols-[390px_1fr]"
              >
                <div className="relative mx-auto lg:mx-0">
                  <div className="absolute -left-5 top-3 h-[84%] w-4 rounded-full bg-linear-to-b from-amber-300 to-amber-500"></div>
                  <div className="absolute left-0 top-12 h-[68%] w-4 rounded-full bg-linear-to-b from-rose-300 to-rose-500"></div>
                  <div className="h-84 w-84 overflow-hidden rounded-4xl border-4 border-white shadow-[0_18px_42px_rgba(0,0,0,0.14)]">
                    <img src={activeTestimonial.image} alt={activeTestimonial.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="absolute -bottom-4 right-6 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-red shadow-md">
                    Verified Review
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-6xl leading-none text-rose-200 font-serif">"</p>
                  <p className="mt-2 max-w-4xl text-xl md:text-[1.9rem] leading-[1.75] text-stone-700 italic">
                    {activeTestimonial.quote}
                  </p>
                  <p className="mt-8 text-lg font-semibold uppercase tracking-[0.24em] text-brand-red">
                    {activeTestimonial.name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={previousTestimonialSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-200 bg-white text-stone-700 transition-colors hover:bg-rose-50"
                  aria-label="Show previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonialSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-200 bg-white text-stone-700 transition-colors hover:bg-rose-50"
                  aria-label="Show next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-stone-200">
                <motion.div className="h-full origin-left rounded-full bg-brand-red" style={{ scaleX: testimonialProgress }} />
              </div>

              <div className="flex items-center justify-center gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setTestimonialSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${testimonialSlide === index ? 'w-10 bg-brand-red' : 'w-2.5 bg-stone-300 hover:bg-stone-400'}`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-3 py-2.5 text-white shadow-[0_14px_30px_rgba(37,211,102,0.35)] transition-transform hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(37,211,102,0.42)]"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#25D366]">
          <svg viewBox="0 0 24 24" className="h-5.5 w-5.5 fill-current" aria-hidden="true">
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.32.17 11.88c0 2.1.55 4.15 1.59 5.96L0 24l6.34-1.66a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.43zm-8.46 18.3h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.76.99 1-3.67-.24-.38a9.89 9.89 0 0 1-1.52-5.24c0-5.46 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7 2.9 9.86 9.86 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.91 9.9zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.23-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.24 3.09c.15.2 2.13 3.24 5.15 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
          </svg>
        </span>
        <span className="pr-1 text-sm font-semibold tracking-wide">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
