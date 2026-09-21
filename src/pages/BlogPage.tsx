import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, ArrowRight, Clock, Calendar, Tag,
  MapPin, Phone, Star, ChevronDown, ChevronUp,
  BookOpen, TrendingUp, Award, Users,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { ContactFormSection } from '../components/ContactFormSection';

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const JSONLD_WEBPAGE = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'The Mangalgatha Journal — Bengali Wedding Blog',
  description:
    'Expert Bengali wedding planning tips, Gaye Holud guides, décor ideas, Kolkata venue reviews, and real wedding stories from Mangalgatha — Kolkata\'s trusted wedding planner.',
  url: 'https://mangalgatha.in/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Mangalgatha Wedding Planners',
    url: 'https://mangalgatha.in',
    logo: { '@type': 'ImageObject', url: 'https://mangalgatha.in/gallery/mglogo.png' },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Room No-702, 7th Floor, Sidco Global Tower, CN 8/2, CN Block, Sector V',
        addressLocality: 'Bidhannagar, Kolkata',
        addressRegion: 'West Bengal',
        postalCode: '700091',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Bengal Eco Intelligent Park, EM Block, Sector V',
        addressLocality: 'Bidhannagar, Kolkata',
        addressRegion: 'West Bengal',
        postalCode: '700091',
        addressCountry: 'IN',
      },
    ],
    telephone: '+91-8595319969',
    email: 'info@mangalgatha.in',
    sameAs: [
      'https://www.instagram.com/mangalgatha?igsh=MTBtMTR3N3ViYXdyMw==',
      'https://www.facebook.com/profile.php?id=61589136157686',
    ],
  },
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'Bengali Wedding Planning' },
    { '@type': 'Thing', name: 'Wedding Planner Kolkata' },
    { '@type': 'Thing', name: 'Gaye Holud Ceremony' },
    { '@type': 'Thing', name: 'Bengali Wedding Rituals' },
  ],
};

const JSONLD_BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mangalgatha.in/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mangalgatha.in/blog' },
  ],
};

const JSONLD_LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'EventPlanner',
  name: 'Mangalgatha Wedding Planners',
  image: 'https://mangalgatha.in/gallery/mglogo.png',
  url: 'https://mangalgatha.in',
  telephone: '+91-8595319969',
  email: 'info@mangalgatha.in',
  priceRange: '₹₹₹',
  servesCuisine: 'Bengali Wedding Planning',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Room No-702, 7th Floor, Sidco Global Tower, CN 8/2, CN Block, Sector V, Bidhannagar',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700091',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Bengal Eco Intelligent Park, EM Block, Sector V, Bidhannagar',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700091',
      addressCountry: 'IN',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.5726,
    longitude: 88.3639,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/mangalgatha?igsh=MTBtMTR3N3ViYXdyMw==',
    'https://www.facebook.com/profile.php?id=61589136157686',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
  },
};

const JSONLD_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a wedding planner cost in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wedding planner fees in Kolkata typically range from ₹50,000 for day-of coordination to ₹3–8 lakh for full-service planning. At Mangalgatha, our packages start at ₹75,000 and scale based on guest count, venues, and services required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Gaye Holud in a Bengali wedding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gaye Holud is a pre-wedding turmeric ceremony held separately for the bride and groom. Turmeric paste (holud) is applied to the couple by family members, symbolising purification and blessings. It is traditionally accompanied by music, singing, and festive food including hilsa fish and mishti doi.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main Bengali wedding rituals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bengali Hindu weddings include: Paka Dekha (formal engagement), Aashirbaad (blessings), Gaye Holud (turmeric ceremony), Dodhi Mongol (morning ritual), Bor Jatri (groom\'s procession), Subho Drishti (auspicious first look), Mala Badal (garland exchange), Saptapadi/Saat Paak (seven steps), Sindoor Daan, Bou Bhat (reception), and Bashi Biye.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best wedding venues in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top wedding venues in Kolkata include heritage Rajbaris like Rajbari Bawali and Itachuna Rajbari, luxury banquets in Salt Lake and New Town, rooftop venues in South Kolkata, and garden venues in Rajarhat. Mangalgatha has strong relationships with 50+ venues across Kolkata and West Bengal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I plan a Bengali wedding under ₹15 lakh in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A beautiful Bengali wedding in Kolkata can be planned for ₹10–15 lakh for 150–200 guests. Key savings come from choosing community halls over luxury hotels, booking vendors 6–12 months in advance, using fresh local flowers, and focusing décor spend on the mandap area. Mangalgatha can help you build a realistic budget for your wedding.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Mangalgatha a good wedding planner in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mangalgatha is one of Kolkata\'s most trusted Bengali wedding planners, with 4.9/5 rating from 120+ client reviews. We specialise in Bengali rituals, décor, artist management, and photography coordination. Our office is in Sector V, Bidhannagar, Kolkata — call us at +91 8595319969.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food is served at a Bengali wedding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A traditional Bengali wedding menu features multiple courses: starters like fish fry and vegetable chops, followed by rice, dal, shukto (bitter vegetable medley), various fish preparations including hilsa (ilish), mutton curry (kosha mangsho), chutney, papad, and desserts such as mishti doi, sandesh, rasgulla, and payesh. For 200+ guests in Kolkata, caterers typically offer 15–25 dishes. Mangalgatha coordinates with top Bengali caterers across Kolkata to design menus that honour tradition while accommodating dietary preferences.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book a wedding planner in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ideally, book your wedding planner 12–18 months before the wedding date. This allows time for venue shortlisting (top Kolkata venues book out 8–10 months ahead), vendor negotiation, and budget planning. For peak Bengali wedding season (November–February), booking 18 months ahead is recommended. However, Mangalgatha has successfully planned weddings in as little as 3 months for smaller gatherings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a wedding planner and a wedding decorator in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A wedding decorator handles only the visual design — mandap setup, stage décor, lighting, and floral arrangements. A wedding planner like Mangalgatha manages the entire event end-to-end: venue selection, vendor coordination (caterer, photographer, videographer, makeup artist, DJ/band), guest logistics, timeline management, budget tracking, and on-the-day execution. Most Kolkata couples benefit from a full-service planner who also oversees décor to ensure a cohesive experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Mangalgatha handle Bengali Muslim weddings (Nikah) in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Mangalgatha plans both Bengali Hindu and Bengali Muslim weddings. For Nikah ceremonies in Kolkata, we coordinate with Qazis, arrange Mehr documentation, plan Walima receptions, and manage halal catering. We understand the cultural nuances of Bengali Muslim weddings including Mehendi nights, Bou Bhat traditions, and family-side coordination. Our vendor network includes halal caterers, Muslim-friendly venues, and experienced decorators across Kolkata.',
      },
    },
  ],
};

// ─── Blog post data ────────────────────────────────────────────────────────────
const featured = {
  category: 'Bengali Rituals',
  categoryKey: 'rituals',
  title: "The Complete Guide to Gaye Holud — Kolkata's Most Joyful Wedding Ceremony",
  excerpt:
    'From the turmeric paste to the music, the hilsa fish to the sindoor box — a complete planning guide for Gaye Holud that your family will talk about for generations.',
  date: 'June 2025',
  readTime: '8 min read',
  author: 'Mangalgatha Team',
  img: '/gallery/G22.jpg',
  badge: 'Bengali Rituals',
  slug: 'gaye-holud-guide',
};

const posts = [
  {
    id: 1,
    category: 'Bengali Rituals',
    categoryKey: 'rituals',
    title: 'All 12 Bengali Wedding Rituals Explained — A Complete Family Guide',
    excerpt:
      'Paka Dekha to Bou Bhat — understand every ceremony in a Bengali Hindu wedding so you can plan each one with confidence and love.',
    date: 'May 2025',
    readTime: '10 min',
    img: '/gallery/G19.jpg',
    slug: 'bengali-wedding-rituals-guide',
  },
  {
    id: 2,
    category: 'Décor & Design',
    categoryKey: 'decor',
    title: "Pastel Weddings Are Taking Over Kolkata — Here's How to Do It Right",
    excerpt:
      'Peach, mint, and ivory are replacing traditional red in 2025. We break down the palette, florals, and mandap setups that are leading the trend across Kolkata banquets.',
    date: 'April 2025',
    readTime: '6 min',
    img: '/gallery/G17.jpg',
    slug: 'pastel-wedding-decor-kolkata',
  },
  {
    id: 3,
    category: 'Planning Tips',
    categoryKey: 'planning',
    title: 'Wedding Planner Cost in Kolkata — What to Expect in 2025',
    excerpt:
      'From coordination-only packages (₹50K) to full luxury planning (₹8L+) — an honest, detailed breakdown of what wedding planners charge in Kolkata.',
    date: 'April 2025',
    readTime: '7 min',
    img: '/gallery/G48.jpg',
    slug: 'wedding-planner-cost-kolkata-2025',
  },
  {
    id: 4,
    category: 'Venues',
    categoryKey: 'venues',
    title: '10 Best Wedding Venues in Kolkata — Rajbari, Rooftop & More',
    excerpt:
      'Heritage palaces, Salt Lake banquets, Rajarhat garden venues — we rate the 10 best wedding venues in Kolkata for every guest count and budget in 2025.',
    date: 'March 2025',
    readTime: '9 min',
    img: '/gallery/G20.jpg',
    slug: 'best-wedding-venues-kolkata',
  },
  {
    id: 5,
    category: 'Budget Weddings',
    categoryKey: 'budget',
    title: 'Plan a Beautiful Bengali Wedding Under ₹15 Lakh — A Real Breakdown',
    excerpt:
      "Yes, it's possible. Here's how to prioritise spend, where to save wisely, and which Kolkata vendors give the best value for money.",
    date: 'March 2025',
    readTime: '8 min',
    img: '/gallery/G51.jpg',
    slug: 'budget-wedding-under-15-lakh-kolkata',
  },
  {
    id: 6,
    category: 'Décor & Design',
    categoryKey: 'decor',
    title: "LED Mandap Ideas for Bengali Weddings — Kolkata's Favourite 2025 Trend",
    excerpt:
      'Personalise your mandap with childhood photo slideshows, family reels, and custom LED displays. Here are the designs Kolkata couples loved most.',
    date: 'Feb 2025',
    readTime: '5 min',
    img: '/gallery/G25.jpg',
    slug: 'led-mandap-ideas-bengali-weddings',
  },
  {
    id: 7,
    category: 'Planning Tips',
    categoryKey: 'planning',
    title: 'Your Wedding Planning Checklist — The Kolkata Edition (18 Months to Wedding Day)',
    excerpt:
      'Month-by-month every vendor, booking, and detail to confirm for a stress-free Bengali wedding in Kolkata — from venue booking to farewell gate.',
    date: 'Feb 2025',
    readTime: '11 min',
    img: '/gallery/G53.jpg',
    slug: 'wedding-planning-checklist-kolkata',
  },
  {
    id: 8,
    category: 'Venues',
    categoryKey: 'venues',
    title: "Why Rajbari Weddings Are Kolkata's Most Romantic Trend Right Now",
    excerpt:
      'Heritage architecture, old-world charm, and stunning photography backdrops — Rajbari weddings offer something no banquet hall ever could.',
    date: 'Jan 2025',
    readTime: '6 min',
    img: '/gallery/G24.jpg',
    slug: 'rajbari-wedding-kolkata',
  },
  {
    id: 9,
    category: 'Destination',
    categoryKey: 'destination',
    title: 'Destination Weddings from Kolkata — Top Locations for Bengali Couples',
    excerpt:
      'From Udaipur palaces to Goa beachfronts and Kerala backwaters — a detailed guide to the best destination wedding locations for Bengali couples, with budget ranges, travel tips, and how to keep every ritual intact away from home.',
    date: 'Jan 2025',
    readTime: '9 min',
    img: '/gallery/G55.jpg',
    slug: 'destination-weddings-kolkata-bengali-couples',
  },
  {
    id: 10,
    category: 'Planning Tips',
    categoryKey: 'planning',
    title: 'Bengali Wedding Catering — Menu Ideas for 200+ Guests in Kolkata',
    excerpt:
      'From ilish paturi and kosha mangsho to mishti doi and sandesh — how to design a 20-course Bengali wedding menu that wows your guests without breaking the budget. Includes caterer recommendations across Kolkata.',
    date: 'Dec 2024',
    readTime: '8 min',
    img: '/gallery/G29.jpg',
    slug: 'bengali-wedding-catering-menu-kolkata',
  },
  {
    id: 11,
    category: 'Décor & Design',
    categoryKey: 'decor',
    title: 'Top 15 Bengali Wedding Photography Poses Every Couple Should Try',
    excerpt:
      'Subho Drishti with the betel leaf, the sindoor moment, topor and mukut close-ups — 15 iconic Bengali wedding photography poses that your photographer must capture, with real examples from Kolkata weddings.',
    date: 'Nov 2024',
    readTime: '6 min',
    img: '/gallery/G30.jpg',
    slug: 'bengali-wedding-photography-poses',
  },
  {
    id: 12,
    category: 'Bengali Rituals',
    categoryKey: 'rituals',
    title: 'How to Choose the Perfect Bengali Bridal Saree — Banarasi, Tant & Kanjivaram',
    excerpt:
      'Red Banarasi or ivory Tant? Kanjivaram silk or handloom? A bride\'s guide to choosing the perfect Bengali wedding saree — with Kolkata shopping recommendations, price ranges, and styling tips for every ceremony from Gaye Holud to reception.',
    date: 'Oct 2024',
    readTime: '7 min',
    img: '/gallery/G31.jpg',
    slug: 'bengali-bridal-saree-guide-kolkata',
  },
];

const popularPosts = [
  { num: '01', title: 'All 12 Bengali Wedding Rituals Explained' },
  { num: '02', title: 'Wedding Planner Cost in Kolkata 2025' },
  { num: '03', title: '10 Best Wedding Venues in Kolkata' },
  { num: '04', title: 'Gaye Holud — The Complete Planning Guide' },
  { num: '05', title: 'Beautiful Bengali Wedding Under ₹15 Lakh' },
  { num: '06', title: 'Bengali Wedding Catering — Menu Ideas' },
  { num: '07', title: 'Bengali Bridal Saree — Banarasi, Tant & More' },
];

const tags = [
  'Gaye Holud', 'Saat Paak', 'Mandap', 'Rajbari', 'Décor', 'Budget',
  'Checklist', 'Venues', 'LED Mandap', 'Music', 'Catering', 'Photography',
  'Destination', 'Subho Drishti', 'Sindoor Daan', 'Bou Bhat', 'Aashirbaad',
  'Bridal Saree', 'Wedding Menu', 'Nikah', 'Bor Jatri', 'Paka Dekha', 'Hilsa Fish',
];

const filterOptions = [
  { label: 'All Posts', key: 'all' },
  { label: 'Bengali Rituals', key: 'rituals' },
  { label: 'Décor & Design', key: 'decor' },
  { label: 'Planning Tips', key: 'planning' },
  { label: 'Venues', key: 'venues' },
  { label: 'Budget Weddings', key: 'budget' },
  { label: 'Destination', key: 'destination' },
];

const stats = [
  { icon: Award, label: 'Happy Couples', value: '50+' },
  { icon: Star, label: 'Average Rating', value: '4.9 / 5' },
  { icon: Users, label: 'Vendor Network', value: '300+' },
  { icon: TrendingUp, label: 'Years in Kolkata', value: '5+' },
  { icon: BookOpen, label: 'Blog Articles', value: '50+' },
  { icon: MapPin, label: 'Cities Served', value: '15+' },
];

const areasServed = [
  'Salt Lake', 'New Town', 'Rajarhat', 'South Kolkata', 'Ballygunge',
  'Park Street', 'Howrah', 'Behala', 'Dumdum', 'Barasat',
  'Serampore', 'Barrackpore', 'Durgapur', 'Siliguri', 'All of West Bengal',
];

const faqs = [
  {
    q: 'How much does a wedding planner cost in Kolkata?',
    a: 'Wedding planner fees in Kolkata range from ₹50,000 for day-of coordination to ₹3–8 lakh for full-service planning. At Mangalgatha, packages start at ₹75,000. The cost depends on guest count, number of events (Gaye Holud, wedding day, reception), and level of décor. We offer transparent pricing — call us at +91 8595319969 for a free consultation.',
  },
  {
    q: 'What is Gaye Holud and how do I plan it?',
    a: "Gaye Holud is the vibrant pre-wedding turmeric ceremony in Bengali Hindu weddings. Turmeric paste is applied to the couple by family members, symbolising purification and blessings. Planning involves: booking a dhol group, arranging hilsa fish and mishti doi, coordinating matching yellow sarees for the bride's side and white-and-yellow dhotis for the groom's side, and setting up a flower-decorated stage. Mangalgatha handles Gaye Holud as a standalone event.",
  },
  {
    q: 'What are all the Bengali wedding rituals in order?',
    a: '1) Paka Dekha — formal engagement meeting. 2) Aashirbaad — separate blessing ceremonies. 3) Gaye Holud — turmeric ceremony. 4) Dodhi Mongol — early-morning ritual. 5) Bor Jatri — groom\'s procession. 6) Subho Drishti — auspicious first look. 7) Mala Badal — garland exchange. 8) Saptapadi / Saat Paak — seven sacred steps. 9) Sindoor Daan — vermilion ceremony. 10) Bou Bhat — post-wedding reception. 11) Bashi Biye — second-day rituals. 12) Phool Sajja — decorated bridal chamber ceremony.',
  },
  {
    q: 'Which are the best wedding venues in Kolkata in 2025?',
    a: 'Top wedding venues in Kolkata include: Rajbari Bawali and Itachuna Rajbari (heritage), ITC Royal Bengal and Taj Bengal (luxury), Swissotel Kolkata and JW Marriott (modern), rooftop venues in Ballygunge, garden venues in Rajarhat and New Town, and community venues for budget weddings. Mangalgatha has negotiated rates at 50+ venues across Kolkata.',
  },
  {
    q: 'Can I plan a Bengali wedding in Kolkata under ₹15 lakh?',
    a: 'Absolutely. For 150–200 guests, a dignified Bengali wedding in Kolkata can be executed for ₹10–15 lakh. Key strategies: book a community hall (₹1–2L) instead of a luxury hotel (₹5L+), use fresh local marigolds and tube-roses instead of orchids, book DJ + dhol instead of a live band, and focus décor budget on the mandap. Mangalgatha offers a dedicated budget wedding planning package.',
  },
  {
    q: 'Does Mangalgatha plan destination weddings from Kolkata?',
    a: 'Yes. Mangalgatha plans destination weddings for Bengali couples across India and internationally — Udaipur, Goa, Jaipur, Kerala backwaters, Coorg, and destinations in Thailand, Bali, and Sri Lanka. We handle travel coordination, local vendor sourcing, and all Bengali rituals at the destination.',
  },
  {
    q: 'What food is served at a Bengali wedding?',
    a: 'A traditional Bengali wedding menu features multiple courses: starters like fish fry and vegetable chops, followed by rice, dal, shukto (bitter vegetable medley), various fish preparations including hilsa (ilish), mutton curry (kosha mangsho), chutney, papad, and desserts such as mishti doi, sandesh, rasgulla, and payesh. For 200+ guests in Kolkata, caterers typically serve 15–25 dishes. Mangalgatha works with top Bengali caterers across Kolkata to design menus that honour tradition while accommodating dietary needs.',
  },
  {
    q: 'How far in advance should I book a wedding planner in Kolkata?',
    a: 'Ideally, book your wedding planner 12–18 months before the wedding date. This gives time for venue shortlisting (top Kolkata venues book out 8–10 months ahead), vendor negotiation, and detailed budget planning. For peak Bengali wedding season (November–February), 18 months is recommended. However, Mangalgatha has successfully planned weddings in as little as 3 months for intimate gatherings.',
  },
  {
    q: 'What is the difference between a wedding planner and a wedding decorator in Kolkata?',
    a: 'A wedding decorator handles only visual design — mandap setup, stage décor, lighting, and florals. A full-service wedding planner like Mangalgatha manages the entire event: venue selection, vendor coordination (caterer, photographer, videographer, makeup artist, DJ/band), guest logistics, timeline management, budget tracking, and on-the-day execution. Most Kolkata couples benefit from a planner who also oversees décor for a cohesive experience.',
  },
  {
    q: 'Does Mangalgatha handle Bengali Muslim weddings (Nikah) in Kolkata?',
    a: 'Yes. Mangalgatha plans both Bengali Hindu and Bengali Muslim weddings. For Nikah ceremonies in Kolkata, we coordinate with Qazis, arrange Mehr documentation, plan Walima receptions, and manage halal catering. We understand the cultural nuances of Bengali Muslim weddings including Mehendi nights, Bou Bhat traditions, and family-side coordination. Our vendor network includes halal caterers, Muslim-friendly venues, and experienced decorators across Kolkata.',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ── Dynamic page meta ──────────────────────────────────────────────────────
  useEffect(() => {
    document.title =
      'Wedding Blog | Mangalgatha — Bengali Wedding Planner in Kolkata | Tips, Rituals & Décor';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc)
      metaDesc.setAttribute(
        'content',
        "Expert wedding planning tips, Gaye Holud guides, décor ideas, Kolkata venue reviews, and real wedding stories from Mangalgatha — Kolkata's trusted Bengali wedding planner.",
      );
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'The Mangalgatha Journal — Bengali Wedding Blog, Kolkata');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc)
      ogDesc.setAttribute(
        'content',
        'Bengali ritual guides, wedding planning checklists, Kolkata venue reviews, and décor inspiration from Mangalgatha Wedding Planners.',
      );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://mangalgatha.in/blog');
    return () => {
      document.title = 'Mangalgatha — Bengali Wedding Planner in Kolkata';
    };
  }, []);

  const filteredPosts =
    activeFilter === 'all' ? posts : posts.filter((p) => p.categoryKey === activeFilter);

  return (
    <div className="pt-24 min-h-screen bg-white relative">

      {/* ── JSON-LD Structured Data (injected into head) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_WEBPAGE) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_BREADCRUMB) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_LOCAL_BUSINESS) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_FAQ) }}
      />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')]" />
      </div>

      {/* ── Breadcrumb (semantic nav) ── */}
      <nav
        aria-label="Breadcrumb"
        className="relative z-10 border-y border-stone-200/80 bg-white/75 backdrop-blur-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-stone-500 list-none">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-brand-red transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li><ChevronRight size={14} /></li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-stone-800" itemProp="name">Blog</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative z-10 py-16 md:py-24 overflow-hidden bg-stone-950">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/gallery/G23.jpg"
            alt="Bengali wedding decoration Kolkata"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,175,55,0.18),transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">
            The Mangalgatha Journal · Bengali Wedding Blog · Kolkata
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] max-w-2xl mb-5">
            Wedding wisdom,{' '}
            <em className="italic text-brand-gold">rooted in Bengal.</em>
          </h1>
          <p className="text-stone-300 text-base max-w-xl leading-relaxed mb-8">
            Expert guides on Bengali wedding rituals, décor trends, Kolkata wedding venues,
            planning checklists, and real wedding stories — by Kolkata's trusted wedding planner.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+918595319969"
              className="inline-flex items-center gap-2 bg-brand-red text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-rose-700 transition-colors"
            >
              <Phone size={13} /> +91 8595319969
            </a>
            <a
              href="https://wa.me/918595319969"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-[#1da851] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </header>

      {/* ── Stats bar ── */}
      <section
        aria-label="Mangalgatha statistics"
        className="relative z-10 bg-stone-950 border-b border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-stone-800">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center py-5 px-3 text-center">
                <Icon size={16} className="text-brand-gold mb-2 shrink-0" />
                <span className="font-serif text-xl font-bold text-white leading-none">{value}</span>
                <span className="text-[9px] uppercase tracking-widest text-stone-400 mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alpona divider ── */}
      <div className="relative z-10 flex items-center gap-6 px-6 md:px-12 py-6 border-b border-stone-200">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="font-serif text-lg text-brand-gold tracking-[0.3em] whitespace-nowrap">
          ✦ &nbsp; मंगलगाथा &nbsp; ✦
        </span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* ── Filter bar ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex gap-2 flex-wrap border-b border-stone-100">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setActiveFilter(opt.key)}
            aria-pressed={activeFilter === opt.key}
            className={cn(
              'px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-200',
              activeFilter === opt.key
                ? 'bg-brand-red text-white border-brand-red'
                : 'bg-white text-stone-500 border-stone-200 hover:border-brand-red hover:text-brand-red',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Featured post ── */}
      <article
        aria-label="Featured blog article"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <meta itemProp="publisher" content="Mangalgatha Wedding Planners" />
        <meta itemProp="author" content="Mangalgatha Team" />
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-6">
          ✦ Featured Article
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 border border-stone-200 overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
          <div className="relative min-h-75 md:min-h-105 overflow-hidden">
            <img
              src={featured.img}
              alt="Gaye Holud Bengali wedding ceremony Kolkata"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="eager"
              itemProp="image"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/40 to-transparent" />
            <span className="absolute top-4 left-4 bg-stone-950 text-brand-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
              {featured.badge}
            </span>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red mb-3" itemProp="articleSection">
              {featured.category}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-[1.2] mb-4 text-stone-900" itemProp="headline">
              {featured.title}
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-5" itemProp="description">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-stone-400 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                <time itemProp="datePublished" dateTime="2025-06">{featured.date}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> {featured.readTime}
              </span>
              <span itemProp="author">By {featured.author}</span>
            </div>
            <Link
              to={`/blog/${featured.slug}`}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-red border-b border-brand-red pb-0.5 w-fit hover:gap-4 transition-all duration-200"
              itemProp="url"
            >
              Read Article <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>

      {/* ── Main grid + sidebar ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

        {/* Posts grid */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-6">
            ✦ Latest Articles
          </p>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group border border-stone-200 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <meta itemProp="publisher" content="Mangalgatha Wedding Planners" />
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      itemProp="image"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-stone-900/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-red mb-2" itemProp="articleSection">
                      {post.category}
                    </p>
                    <h3 className="font-serif text-xl font-bold leading-snug mb-2 text-stone-900 group-hover:text-brand-red transition-colors" itemProp="headline">
                      {post.title}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 line-clamp-2" itemProp="description">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        <time itemProp="datePublished">{post.date}</time>
                      </span>
                      <span className="bg-stone-100 px-2 py-0.5 font-medium flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-10">
            <button className="border border-stone-300 bg-transparent px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:border-brand-red hover:text-brand-red transition-colors duration-200">
              Load More Articles
            </button>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="lg:sticky lg:top-24 space-y-6">

          {/* WhatsApp CTA */}
          <div className="bg-stone-950 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <img src="/gallery/G62.jpg" alt="Bengali wedding" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-stone-950/70" />
            <div className="relative z-10">
              <p className="font-serif text-base italic text-white/90 mb-1 leading-snug">
                "Your dream Bengali wedding, just a WhatsApp away."
              </p>
              <p className="text-stone-400 text-[10px] mb-4">Kolkata's trusted wedding planner</p>
              <a
                href="https://wa.me/918595319969"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with Mangalgatha on WhatsApp"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-[#1da851] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat With Us
              </a>
              <div className="mt-3">
                <a
                  href="tel:+918595319969"
                  className="text-[10px] text-stone-400 hover:text-white transition-colors flex items-center justify-center gap-1"
                >
                  <Phone size={10} /> +91 8595319969
                </a>
              </div>
            </div>
          </div>

          {/* Popular posts */}
          <div className="border border-stone-200 bg-white p-6">
            <h4 className="font-serif text-lg font-bold border-b border-stone-100 pb-3 mb-4 text-stone-900">
              Popular Articles
            </h4>
            <ul className="space-y-0">
              {popularPosts.map((p) => (
                <li key={p.num} className="flex gap-3 items-start py-3 border-b border-stone-50 last:border-0">
                  <span className="font-serif text-2xl text-stone-200 font-light leading-none mt-0.5 shrink-0">
                    {p.num}
                  </span>
                  <span className="text-xs text-stone-700 leading-snug hover:text-brand-red cursor-pointer transition-colors">
                    {p.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tag cloud */}
          <div className="border border-stone-200 bg-white p-6">
            <h4 className="font-serif text-lg font-bold border-b border-stone-100 pb-3 mb-4 text-stone-900">
              Browse Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest border border-stone-200 px-2.5 py-1.5 text-stone-500 hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  <Tag size={8} />
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* Gallery preview strip */}
          <div className="border border-stone-200 bg-white p-6">
            <h4 className="font-serif text-lg font-bold border-b border-stone-100 pb-3 mb-4 text-stone-900">
              From Our Gallery
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {['/gallery/G1.jpg', '/gallery/G18.jpg', '/gallery/G32.jpg',
                '/gallery/G49.jpg', '/gallery/G27.jpg', '/gallery/G56.jpg'].map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden">
                    <img
                      src={src}
                      alt="Mangalgatha gallery preview"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
            </div>
            <Link
              to="/gallery"
              className="mt-3 block text-center text-[10px] font-bold uppercase tracking-widest text-brand-red hover:underline"
            >
              View Full Gallery →
            </Link>
          </div>

          {/* Areas served */}
          <div className="border border-stone-200 bg-white p-6">
            <h4 className="font-serif text-lg font-bold border-b border-stone-100 pb-3 mb-4 text-stone-900 flex items-center gap-2">
              <MapPin size={15} className="text-brand-red" /> Areas We Serve
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {areasServed.map((area) => (
                <span
                  key={area}
                  className="text-[10px] bg-stone-50 border border-stone-100 px-2 py-1 text-stone-600"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-stone-400 mt-3 leading-relaxed">
              Based in Sector V, Bidhannagar, Kolkata. Serving all of West Bengal for Bengali weddings.
            </p>
          </div>
        </aside>
      </div>

      {/* ── FAQ Section (FAQPage schema) ── */}
      <section
        aria-label="Frequently Asked Questions about Bengali Wedding Planning in Kolkata"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="border-t border-stone-200 pt-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2 text-center">
              ✦ Expert Answers
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 text-center mb-3 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500 text-sm text-center mb-10">
              Common questions about Bengali weddings, Gaye Holud planning, Kolkata venues, and wedding planner costs — answered by the Mangalgatha team.
            </p>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-stone-200 bg-white overflow-hidden"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-stone-50 transition-colors"
                  >
                    <span
                      className="font-serif text-base font-bold text-stone-900 leading-snug"
                      itemProp="name"
                    >
                      {faq.q}
                    </span>
                    <span className="shrink-0 text-brand-red mt-0.5">
                      {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p
                          className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100"
                          itemProp="text"
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-stone-500 text-sm mb-4">
                Have a question not covered here? Talk to our team directly.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href="tel:+918595319969"
                  className="inline-flex items-center gap-2 border border-stone-300 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-stone-700 hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  <Phone size={13} /> Call Us
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-rose-700 transition-colors"
                >
                  Send Enquiry <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Long-Form Content Section ── */}
      <section
        aria-label="About Bengali wedding planning in Kolkata"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2 text-center">
            ✦ Wedding Planning in Kolkata
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 text-center mb-8 leading-tight">
            Why Kolkata Is the Heart of Bengali Wedding Culture
          </h2>
          <div className="prose prose-stone prose-sm max-w-none text-stone-600 leading-relaxed space-y-4">
            <p>
              Kolkata has been the cultural capital of Bengali weddings for generations. From the ornate Rajbaris of South Kolkata
              to the modern banquet halls of Salt Lake and New Town, the city offers an unmatched diversity of{' '}
              <Link to="/gallery" className="text-brand-red hover:underline font-medium">wedding venues</Link>{' '}
              that cater to every style and budget. Whether you envision a grand affair for 500 guests or an intimate
              celebration with close family, finding the right wedding planner in Kolkata is the first step towards
              turning your vision into reality.
            </p>
            <p>
              A Bengali wedding is far more than a single ceremony — it is a multi-day celebration steeped in ritual,
              emotion, and artistry. From the joyful Gaye Holud, where turmeric paste blesses the couple, to the sacred
              Saat Paak and the emotional Sindoor Daan, every ritual carries centuries of cultural significance. A
              professional Bengali wedding planner understands the precise sequence, timing, and vendor requirements for
              each ceremony, ensuring that nothing is overlooked while your family stays present in every moment.
            </p>
            <p>
              At{' '}
              <Link to="/" className="text-brand-red hover:underline font-medium">Mangalgatha</Link>, we have planned over
              50 weddings across Kolkata, Howrah, and greater West Bengal. Our{' '}
              <Link to="/services" className="text-brand-red hover:underline font-medium">services</Link>{' '}
              span venue scouting, décor design, catering coordination, artist and entertainment management, bridal
              styling consultation, and complete day-of execution. We work with a curated network of 300+ trusted
              vendors — from photographers who specialise in candid Bengali wedding moments to caterers renowned
              for authentic Bengali cuisine featuring ilish, kosha mangsho, and traditional mishti.
            </p>
            <p>
              Whether you are searching for the best wedding planner in Kolkata, need guidance on Bengali wedding
              rituals, or want a transparent cost estimate for your dream celebration, Mangalgatha is here to help. We
              believe every couple deserves a wedding that reflects their story — rooted in Bengali tradition, yet
              uniquely their own.{' '}
              <Link to="/contact" className="text-brand-red hover:underline font-medium">Contact us today</Link>{' '}
              for a free consultation and let us bring your dream Bengali wedding to life.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Mangalgatha — trust signals ── */}
      <section
        aria-label="Why choose Mangalgatha as your wedding planner in Kolkata"
        className="relative z-10 bg-stone-950 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-3 text-center">
            ✦ Why Mangalgatha
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white text-center mb-3">
            Kolkata's Most Trusted Bengali Wedding Planner
          </h2>
          <p className="text-stone-400 text-sm text-center max-w-2xl mx-auto mb-12">
            Mangalgatha has planned 50+ weddings across Kolkata and West Bengal. Our team understands
            every nuance of Bengali Hindu and Bengali Muslim wedding traditions, and we work with
            vendors who match your vision and budget.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800">
            {[
              {
                img: '/gallery/G21.jpg',
                title: 'Deep Bengali Ritual Knowledge',
                body: 'From Paka Dekha to Bou Bhat, we have planned every Bengali ceremony. We brief every vendor on ritual timings and cultural sensitivities so your family can be fully present.',
              },
              {
                img: '/gallery/G28.jpg',
                title: 'Kolkata Venue Network',
                body: 'Negotiated rates at 50+ Kolkata venues — Rajbari heritage properties, Salt Lake banquets, New Town convention halls, South Kolkata terraces, and garden venues in Rajarhat.',
              },
              {
                img: '/gallery/G57.jpg',
                title: 'Transparent Budget Planning',
                body: 'No hidden costs. We give you an itemised cost estimate in writing before you sign anything. Our budget planning tool helps you allocate spend across décor, catering, music, photography, and logistics.',
              },
            ].map(({ img, title, body }) => (
              <div key={title} className="bg-stone-950 p-8 relative group overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="relative z-10">
                  <div className="w-8 h-px bg-brand-gold mb-5" />
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <div className="relative z-10 mx-4 sm:mx-6 lg:mx-auto max-w-7xl my-16">
        <div className="bg-stone-50 border border-stone-200 py-12 px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img src="/gallery/G21.jpg" alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red mb-3">
              Stay in the loop
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-2">
              Get Bengali wedding tips in your inbox
            </h2>
            <p className="text-stone-500 text-sm mb-6">
              Monthly guides on Bengali rituals, Kolkata venues, real wedding stories, and décor trends.
              No spam, unsubscribe anytime.
            </p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="flex-1 border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none focus:border-brand-red transition-colors"
              />
              <button
                type="submit"
                className="bg-brand-red text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Contact CTA ── */}
      <ContactFormSection />
    </div>
  );
};

export default BlogPage;
