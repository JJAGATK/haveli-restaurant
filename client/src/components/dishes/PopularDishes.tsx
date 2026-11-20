import React, { useEffect, useRef } from 'react';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SIGNATURE_ITEMS, RESTAURANT_DATA } from '../../data/restaurantData';

gsap.registerPlugin(ScrollTrigger);

interface PopularDishesProps {
  onOpenMenuDrawer: () => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({ onOpenMenuDrawer }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const popularDishes = [
    SIGNATURE_ITEMS[0], // Amritsari Kulcha
    SIGNATURE_ITEMS[1], // Chole Bhature
    {
      id: 5,
      name: 'Dal Makhani (Haveli Handi)',
      punjabiName: 'ਦਾਲ ਮੱਖਣੀ',
      description: 'Slow-simmered overnight over charcoal embers with fresh cream, whole spices, and white churned butter.',
      category: 'Main Course',
      isVeg: true,
      isSignature: true,
      placeholderPrice: '₹320* [Est. Placeholder]',
      priceDisclaimer: '*Placeholder price - verify at counter',
      imagePlaceholder: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      available: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="popular-dishes"
      className="py-24 sm:py-32 bg-[#130307] text-[#FFF9F0] relative overflow-hidden"
    >
      {/* Sizzling Amber & Saffron Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.12)_0%,transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F8C471] block mb-2">
            Discover &nbsp;·&nbsp; Signatures
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF9F0] tracking-tight drop-shadow-md">
            Palatial Signatures
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#FAF7F2]/85 font-light max-w-xl">
            Signature Punjabi delicacies prepared fresh daily over glowing charcoal embers and pure desi ghee.
          </p>
        </div>

        {/* 3-Column Editorial Dish Cards (Delicious Royal Glass Cards) */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="royal-glass-card rounded-3xl overflow-hidden hover:border-[#E67E22]/70 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(230,126,34,0.25)]"
            >
              {/* Photo Area with Warm Vignette */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#24050A]">
                <img
                  src={dish.imagePlaceholder}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 filter brightness-100 contrast-105 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180206] via-transparent to-transparent opacity-90" />

                {/* Pure Veg Indicator */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#1A0307]/80 border border-[#D4AF37]/40 text-xs backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold text-white tracking-wide">Pure Veg</span>
                </div>

                {/* Desi Ghee Badge */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#E67E22]/90 border border-[#F8C471]/50 text-white text-[10px] font-bold backdrop-blur-md shadow-md">
                  Desi Ghee
                </div>
              </div>

              {/* Info Block */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-2.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF9F0] group-hover:text-[#F8C471] transition-colors leading-tight">
                      {dish.name.split('(')[0].trim()}
                    </h3>
                    <span className="font-mono text-sm font-bold text-[#F8C471] shrink-0 bg-[#24060E] px-2.5 py-1 rounded-lg border border-[#D4AF37]/40 shadow-sm">
                      {dish.placeholderPrice?.split('[')[0].trim()}
                    </span>
                  </div>

                  <p className="text-xs text-[#FAF7F2]/80 font-light leading-relaxed line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#D4AF37]">
                  <span className="font-serif text-xs font-semibold text-[#F8C471]">{dish.punjabiName}</span>
                  <span className="text-[10px] uppercase font-mono text-[#E67E22] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E67E22]/15 border border-[#E67E22]/35">
                    Haveli Classic
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Trigger & Price Disclaimer */}
        <div className="mt-16 pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#FAF7F2]/65 italic font-light">
            {RESTAURANT_DATA.disclaimerText}
          </p>

          <button
            onClick={onOpenMenuDrawer}
            className="px-6 py-2.5 rounded-full bg-[#20050D] hover:bg-[#340815] text-[#F8C471] hover:text-[#FFF9F0] font-bold text-xs transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:border-[#D4AF37] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center gap-2 shrink-0 border border-[#D4AF37]/45 backdrop-blur-md"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#E67E22]" />
            <span>Explore Full 24-Item Menu Drawer</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
