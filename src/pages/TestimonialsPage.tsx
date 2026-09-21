import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, PhoneCall } from 'lucide-react';
import { bengaliWeddingImage } from '../utils/bengaliWeddingImages';

const TestimonialsPage = () => {
  // ── SEO Meta Tags ──
  useEffect(() => {
    document.title = 'Client Reviews & Testimonials — Mangalgatha Wedding Planner Kolkata';
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Read what couples say about Mangalgatha — 4.9/5 rating from 120+ reviews. Real stories from Bengali weddings planned across Kolkata and West Bengal.");
    setMeta('link[rel="canonical"]', 'href', 'https://mangalgatha.in/testimonials');
    setMeta('meta[property="og:title"]', 'content', 'Client Reviews & Testimonials — Mangalgatha Wedding Planner Kolkata');
    setMeta('meta[property="og:description"]', 'content', "Read what couples say about Mangalgatha — 4.9/5 rating from 120+ reviews. Real stories from Bengali weddings planned across Kolkata and West Bengal.");
    setMeta('meta[property="og:url"]', 'content', 'https://mangalgatha.in/testimonials');
    return () => { document.title = 'Mangalgatha — Bengali Wedding Planner in Kolkata'; };
  }, []);

  const testimonials = [
   
    {
      id: 1,
      couple: 'Rahul & Avipsha',
      image: '/gallery/G66.jpeg',
      text: 'I recently celebrated my wedding and they did a great job at managing the whole event. Starting with the decor to the food, everything was handled with great attention to detail. Was really satisfied and would totally recommend.'
    },
    {
      id: 2,
      couple: 'Shreya & Deb',
      image: '/gallery/G67.jpg',
      text: 'Referred by one of their intern Rooprekha Ghosh, Mangalgatha was the best decision I took for my wedding. From decor to coordination, everything was flawless. The team was super professional, creative, and easy to work with. Could not have asked for a better experience. Highly recommend.'
    },
     {
      id: 3,
      couple: 'Sneha & Anand',
      image: '/gallery/G25.jpg',
      text: "Excellent food preparation with well coordinated professional service. Highly recommend. We took their service for our brother's marriage; professional with a human touch."
    },
    {
      id: 4,
      couple: 'NIK CHAUHAN',
      image: bengaliWeddingImage(400, 400, 'bengali,wedding,ceremony,couple', 74),
      text: 'Food bhi tasty tha aur photography bhi top class. Kya combination hai inka! Pratham ne ek bhi important moment miss nahi kiya. Every photo feels alive. Super happy with the outcome.'
    },
    {
      id: 5,
      couple: 'JAGATPATI DAS',
      image: bengaliWeddingImage(400, 400, 'bengali,wedding,traditional,couple', 75),
      text: 'It started raining during our event, but Mangalgatha had a backup plan in place. The tent and covered area were set up so fast. No panic, no stress. Huge thanks to the team for capturing emotions even in chaos. Best Mangalgatha.'
    },
    {
      id: 6,
      couple: 'GUDDU AGARWAL',
      image: bengaliWeddingImage(400, 400, 'bengali,wedding,ceremony,portrait', 76),
      text: 'Baraat entry ka pura coordination team ne sambhala. DJ van, cold pyro, flower shots - sab planned tha. Guests full energy mein the. Mangalgatha rocks.'
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#f8fcfd] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-100/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-rose-100/50 rounded-full blur-[100px]"></div>
      </div>

      <section className="relative z-10 border-y border-stone-200/80 bg-white/75 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-stone-500">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-stone-800">Testimonials</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.28] pointer-events-none">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-[url('/gallery/bg.jpg')] bg-cover bg-left opacity-80" />
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('/gallery/bg.jpg')] bg-cover bg-right opacity-80" />
          <div className="absolute inset-0 bg-white/72" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-red uppercase tracking-[0.08em] mb-6">
              What Clients Say About Us
            </h1>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="h-px w-16 bg-stone-300"></div>
              <Heart size={20} className="text-brand-red fill-brand-red" />
              <div className="h-px w-16 bg-stone-300"></div>
            </div>
            <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed italic">
              We have been delighted to receive many letters of thanks from couples who have chosen Mangalgatha for their unique wedding
            </p>
          </div>

          <div className="space-y-24 relative z-10">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
              >
                <div className="relative shrink-0">
                  <div className="absolute -left-6 top-0 bottom-0 flex gap-2">
                    <div className="w-4 h-full bg-brand-gold rounded-full opacity-60"></div>
                    <div className="w-4 h-[80%] my-auto bg-brand-red rounded-full opacity-60"></div>
                  </div>

                  <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-white shadow-xl relative z-10">
                    <img
                      src={t.image}
                      alt={t.couple}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="grow relative py-8">
                  <span className="absolute -top-4 -left-8 text-8xl text-cyan-100 font-serif leading-none select-none opacity-60">&quot;</span>
                  <span className="absolute -bottom-12 -right-4 text-8xl text-cyan-100 font-serif leading-none select-none opacity-60">&quot;</span>

                  <div className="relative z-10">
                    <p className="text-stone-600 text-lg leading-relaxed mb-6 font-light italic">
                      {t.text}
                    </p>
                    <h4 className="text-rose-600 font-bold tracking-widest text-sm uppercase">
                      {t.couple}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl border border-stone-200 bg-white/88 shadow-[0_24px_70px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-80 overflow-hidden">
                <img
                  src={bengaliWeddingImage(1200, 1400, 'bengali,wedding,decor,couple', 90)}
                  alt="Wedding planning inspiration"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/65 via-stone-900/20 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                  Plan With Mangalgatha
                </div>
              </div>

              <div className="relative px-8 py-10 md:px-12 md:py-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(225,29,72,0.12),transparent_26%)] pointer-events-none" />

                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-brand-red">
                    Start Your Celebration
                  </p>
                  <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
                    Turn your wedding vision into a celebration that feels beautifully yours.
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 md:text-lg">
                    From venue styling to full planning, we shape every detail around your story with warmth, elegance, and ease. Share your ideas with us and let&apos;s bring them to life.
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-red px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:bg-rose-700"
                    >
                      Start Planning
                      <ChevronRight size={18} />
                    </Link>

                    <a
                      href="tel:+918595319969"
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-stone-300 px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-stone-700 transition-colors hover:border-brand-red hover:text-brand-red"
                    >
                      Call Us
                      <PhoneCall size={18} />
                    </a>
                  </div>

                  <div className="mt-10 flex items-center gap-4 text-sm text-stone-500">
                    <div className="h-px w-12 bg-stone-300" />
                    Personal planning support for intimate weddings and grand celebrations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TestimonialsPage;
