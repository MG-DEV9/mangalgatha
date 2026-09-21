import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ContactFormSection } from '../components/ContactFormSection';
// Using images from /public/gallery — no placeholder image helper needed

type ServiceShowcase = {
  number: string;
  title: string;
  bookLabel: string;
  description: string;
  images: string[];
};

const showcases: ServiceShowcase[] = [
  {
    number: '01',
    title: 'Wedding Venues',
    bookLabel: 'Book Us for Wedding Venue',
    description:
      'Explore a wide range of stunning wedding venues available with us. From elegant villas, grand banquet halls to charming marriage halls, luxurious hotels, and serene resorts, we bring you the best options in your city or anywhere across India. Tailored to your style and needs, we ensure your dream venue is just a click away.',
    images: [
      '/gallery/01%20Wedding%20Venues/venue%202.jpg',
      '/gallery/01%20Wedding%20Venues/venue%203.webp',
      '/gallery/01%20Wedding%20Venues/venue%204.webp',
      '/gallery/01%20Wedding%20Venues/venue%205.avif',
      '/gallery/01%20Wedding%20Venues/venue%206.jpeg',
    ]
  },
  {
    number: '02',
    title: 'Exquisite Decor',
    bookLabel: 'Book Us for Decor',
    description:
      'Transform your wedding into a visual dream with curated floral styling, statement stage design, mood lighting, and beautifully layered decor details. We shape each venue around your story, theme, and personal taste.',
    images: [
      '/gallery/02%20Exquisite%20Decor/decor%202.jpg',
      '/gallery/02%20Exquisite%20Decor/decor%203.jpg',
      '/gallery/02%20Exquisite%20Decor/decor%204.webp',
      '/gallery/02%20Exquisite%20Decor/decor%205.jpg',
      '/gallery/02%20Exquisite%20Decor/decor%206.jpg',
    ]
  },
  {
    number: '03',
    title: 'Entertainment',
    bookLabel: 'Book Us for Entertainment',
    description:
      'From soulful live music and celebrity artists to energetic DJs and performance acts, we create entertainment experiences that keep every ceremony and celebration unforgettable for you and your guests.',
    images: [
      '/gallery/03%20Entertainment/entertainment%203.jpg',
      '/gallery/03%20Entertainment/entertainment%204.jpg',
      '/gallery/03%20Entertainment/entertainment%205.jpeg',
      '/gallery/03%20Entertainment/entertainment%206.jpeg',
      '/gallery/03%20Entertainment/entertainmnet%202.jpg',
    ]
  },
  {
    number: '04',
    title: 'Across India Destination Weddings',
    bookLabel: 'Book Us for Destination Wedding',
    description:
      'Plan a wedding journey beyond the ordinary with handpicked destination venues, travel planning, guest hospitality, and seamless on-ground coordination so your celebration feels luxurious and effortless from start to finish.',
    images: [
      '/gallery/04%20Destination%20Weddings/benaras%20wedding.jpg',
      '/gallery/04%20Destination%20Weddings/goa%20wedding%202.jpeg',
      '/gallery/04%20Destination%20Weddings/goa%20wedding.jpg',
      '/gallery/04%20Destination%20Weddings/jaipur%20wedding.jpg',
      '/gallery/04%20Destination%20Weddings/rajasthan-wedding%201.jpeg',
    ]
  },
  {
    number: '05',
    title: 'Vendor Coordination',
    bookLabel: 'Book Us for Coordination',
    description:
      'We bring every moving part together with precision, managing caterers, photographers, makeup artists, invitation partners, and technical teams so your functions stay smooth, timely, and stress free.',
    images: [
      '/gallery/05%20Vendor%20Coordination/492752072_1180010380736556_2119425243583135690_n.jpg',
      '/gallery/05%20Vendor%20Coordination/Alexa_Anuj_wedding_mandap_florals.webp',
      '/gallery/05%20Vendor%20Coordination/Featured%20-%201620%20x%201080%20(2).webp',
      '/gallery/05%20Vendor%20Coordination/Pre-wedding-photoshoot-scaled.jpg',
      '/gallery/05%20Vendor%20Coordination/Meckup%20artist.png',
    ]
  },
  {
    number: '06',
    title: 'Logistics & Travel',
    bookLabel: 'Book Us for Logistics',
    description:
      'Ensure flawless guest movement and event flow with our transport planning, travel bookings, guest pickups, luxury vehicle arrangements, and logistical support across every stage of the wedding.',
    images: [
      '/gallery/06 Logistics & Travel/LT1.avif',
      '/gallery/06 Logistics & Travel/LT2.avif',
      '/gallery/06 Logistics & Travel/LT3.jpg',
      '/gallery/06 Logistics & Travel/LT4.jpg',
      '/gallery/06 Logistics & Travel/LT5.jpeg',
      '/gallery/06 Logistics & Travel/LT6.jpeg',
      '/gallery/06 Logistics & Travel/LT7.jpg',
      '/gallery/06 Logistics & Travel/LT8.jpg',
    ]
  },
];

export const ServicesPage = () => {
  const whatsappNumber = '918595319969';
  const getServiceWhatsAppLink = (serviceTitle: string) => {
    const message = `Hi Mangalgatha team! I would like to inquire about ${serviceTitle.toLowerCase()}.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // ── SEO Meta Tags ──
  useEffect(() => {
    document.title = 'Wedding Planning Services in Kolkata — Venues, Décor, Catering | Mangalgatha';
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Explore Mangalgatha's wedding planning services: venue sourcing, mandap décor, artist management, photography coordination, catering & budget planning across Kolkata.");
    setMeta('link[rel="canonical"]', 'href', 'https://mangalgatha.in/services');
    setMeta('meta[property="og:title"]', 'content', 'Wedding Planning Services in Kolkata — Venues, Décor, Catering | Mangalgatha');
    setMeta('meta[property="og:description"]', 'content', "Explore Mangalgatha's wedding planning services: venue sourcing, mandap décor, artist management, photography coordination, catering & budget planning across Kolkata.");
    setMeta('meta[property="og:url"]', 'content', 'https://mangalgatha.in/services');
    return () => { document.title = 'Mangalgatha — Wedding Planner'; };
  }, []);

  const [activeImages, setActiveImages] = useState<Record<number, number>>(
    () => Object.fromEntries(showcases.map((_, index) => [index, 0]))
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImages((current) =>
        Object.fromEntries(
          showcases.map((showcase, index) => [
            index,
            ((current[index] ?? 0) + 1) % showcase.images.length,
          ])
        )
      );
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  const goToImage = (sectionIndex: number, imageIndex: number) => {
    setActiveImages((current) => ({
      ...current,
      [sectionIndex]: imageIndex,
    }));
  };

  const shiftImage = (sectionIndex: number, direction: -1 | 1) => {
    setActiveImages((current) => {
      const total = showcases[sectionIndex].images.length;
      const next = ((current[sectionIndex] ?? 0) + direction + total) % total;
      return { ...current, [sectionIndex]: next };
    });
  };

  return (
    <div className="pt-24 min-h-screen relative">
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/gallery/bg.jpg')] bg-cover bg-center" />
      </div>

      <section className="relative z-10 border-y border-stone-200/80 bg-white/75 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-stone-500">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-stone-800">Our Services</span>
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-red uppercase tracking-[0.08em] mb-5">
            Our Services
          </h1>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-16 bg-stone-300"></div>
            <Heart size={20} className="text-brand-red fill-brand-red" />
            <div className="h-px w-16 bg-stone-300"></div>
          </div>
        </div>
      </section>

      {showcases.map((showcase, sectionIndex) => {
        const activeImage = activeImages[sectionIndex] ?? 0;
        const isReversed = sectionIndex % 2 === 1;

        return (
          <section key={showcase.title} className="relative z-10 py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-start ${isReversed ? 'xl:[&>*:first-child]:order-2 xl:[&>*:last-child]:order-1' : ''}`}>
                <div>
                  <div className="mb-8">
                    <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight">
                      {showcase.number} <span className="ml-3 md:ml-6 uppercase">{showcase.title}</span>
                    </h2>
                  </div>

                  <div className="max-w-3xl">
                    <p className="text-lg md:text-xl leading-10 text-stone-700">
                      {showcase.description}
                    </p>
                  </div>

                  <div className="mt-10">
                    <a
                      href={getServiceWhatsAppLink(showcase.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-2xl bg-brand-red px-8 py-4 text-white text-xl font-medium shadow-lg shadow-brand-red/20 transition-transform hover:-translate-y-1 hover:bg-rose-700"
                    >
                      {showcase.bookLabel}
                    </a>
                  </div>

                  <div className="mt-14">
                    <div className="flex items-center gap-3 mb-5">
                      <button
                        type="button"
                        onClick={() => shiftImage(sectionIndex, -1)}
                        className="h-11 w-11 rounded-full border border-white/70 bg-white/80 text-stone-700 shadow-sm backdrop-blur hover:text-brand-red"
                        aria-label={`Previous ${showcase.title} image`}
                      >
                        <ChevronLeft size={18} className="mx-auto" />
                      </button>
                      <button
                        type="button"
                        onClick={() => shiftImage(sectionIndex, 1)}
                        className="h-11 w-11 rounded-full border border-white/70 bg-white/80 text-stone-700 shadow-sm backdrop-blur hover:text-brand-red"
                        aria-label={`Next ${showcase.title} image`}
                      >
                        <ChevronRight size={18} className="mx-auto" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {showcase.images.map((image, imageIndex) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => goToImage(sectionIndex, imageIndex)}
                          className={`group overflow-hidden rounded-xl border bg-white ${activeImage === imageIndex ? 'border-brand-red shadow-lg' : 'border-stone-200'}`}
                        >
                          <img
                            src={image}
                            alt={`${showcase.title} preview ${imageIndex + 1}`}
                            className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="xl:pt-20">
                  <button
                    type="button"
                    onClick={() => setSelectedImage(showcase.images[activeImage])}
                    className="group block w-full overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.12)]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={showcase.images[activeImage]}
                        initial={{ opacity: 0.2, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.2, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        src={showcase.images[activeImage]}
                        alt={showcase.title}
                        className="h-105 md:h-140 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-brand-red transition-colors"
              aria-label="Close image viewer"
            >
              <X size={30} />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={selectedImage}
              alt="Service enlarged view"
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactFormSection />
    </div>
  );
};
