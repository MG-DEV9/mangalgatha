import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { bengaliWeddingImage } from '../utils/bengaliWeddingImages';

export const ContactFormSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-stone-950" />
      <div className="absolute inset-0 opacity-20">
        <img
          src={bengaliWeddingImage(1600, 900, 'bengali,wedding,couple,romantic', 131)}
          alt="Wedding couple"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(190,24,93,0.18),transparent_32%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
          <div className="rounded-4xl border border-white/10 bg-white/6 backdrop-blur-md p-8 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
            <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-5">
              Let&apos;s Plan Together
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6 uppercase tracking-[0.04em]">
              Turn Your Wedding Vision Into A Beautiful Celebration
            </h2>
            <p className="text-stone-300 text-lg leading-8 max-w-2xl mb-10">
              From venue styling to full celebration planning, we shape every detail around your story. Tell us what you&apos;re dreaming of and we&apos;ll help you build it with warmth, elegance, and ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-red px-8 py-4 text-white font-bold uppercase tracking-[0.22em] shadow-lg hover:bg-rose-700 transition-colors"
              >
                Start Planning
                <ArrowRight size={18} className="ml-3" />
              </Link>
              <a
                href="tel:+918595319969"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-white font-bold uppercase tracking-[0.22em] hover:bg-white hover:text-stone-900 transition-colors"
              >
                Call Us
                <PhoneCall size={18} className="ml-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
                <img
                  src={bengaliWeddingImage(700, 900, 'bengali,wedding,bride', 132)}
                  alt="Bride portrait"
                  className="h-55 md:h-65 w-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
                <img
                  src={bengaliWeddingImage(700, 700, 'bengali,wedding,smile,bride', 134)}
                  alt="Bengali wedding portrait"
                  className="h-55 md:h-62.5 w-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4 pt-10">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
                <img
                  src={bengaliWeddingImage(700, 700, 'bengali,wedding,couple,ritual', 135)}
                  alt="Bengali wedding ritual"
                  className="h-55 md:h-62.5 w-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
                <img
                  src={bengaliWeddingImage(700, 900, 'bengali,wedding,ceremony', 133)}
                  alt="Wedding ceremony"
                  className="h-65 md:h-80 w-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
