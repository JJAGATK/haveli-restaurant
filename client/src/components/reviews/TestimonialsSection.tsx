import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES, RESTAURANT_DATA } from '../../data/restaurantData';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const items = cardsRef.current?.children;
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      id: 1,
      author: 'HARMEET SINGH & FAMILY',
      rating: 5,
      date: 'Highway Traveler Review',
      quote:
        'The vintage car at the grand entrance is an iconic road trip landmark. Inside, the soaring ceilings with cascading crystal chandeliers take your breath away—matched by exceptional tandoor kulchas and charcoal-simmered dal makhani.',
    },
    {
      id: 2,
      author: 'RADHIKA SHARMA',
      rating: 5,
      date: 'Road Trip Enthusiast',
      quote:
        'A true palatial sanctuary on the Grand Trunk Road. Dining in the grand durbar beneath glowing chandeliers with fresh earthenware kulhad lassi made our journey unforgettable.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-24 sm:py-32 bg-[#130307] text-[#FFF9F0] relative overflow-hidden"
    >
      {/* Saffron & Amber Warm Ambient Lights */}
      <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F8C471] block mb-2">
            Guest Reflections
          </span>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF9F0] tracking-tight drop-shadow-md">
              What Our Visitors Say
            </h2>

            {/* Google Rating 4.4 from ~70k Reviews */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A0A0E] border border-[#D4AF37]/40 text-xs text-[#F8C471] backdrop-blur-md shadow-lg">
              <Star className="w-4 h-4 text-[#F39C12] fill-current" />
              <span className="font-bold text-[#FFF9F0] text-sm">4.4 ★</span>
              <span className="text-[#F8C471]/80 font-medium">From {RESTAURANT_DATA.reviewCountFormatted}</span>
            </div>
          </div>
        </div>

        {/* 3-Column Layout: Left Photo + 2 Review Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Atmospheric Photography */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-[#24050A] min-h-[320px] relative group">
            <img
              src={IMAGES.palatialChandeliers}
              alt="Haveli Grand Palatial Chandeliers & Durbar"
              className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 filter brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180206]/95 via-[#180206]/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-xs">
              <span className="font-serif font-bold text-[#F8C471] block">
                Palatial Grandeur & Chandeliers
              </span>
              <p className="text-[11px] text-[#FAF7F2]/85 mt-0.5 font-light">
                Dining beneath glowing chandeliers with the classic car landmark outside.
              </p>
            </div>
          </div>

          {/* Column 2: Testimonial Card 1 */}
          <div className="lg:col-span-4 rounded-3xl royal-glass-card p-8 flex flex-col justify-between hover:border-[#E67E22]/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#F8C471] uppercase tracking-[0.2em] font-mono">
                  {testimonials[0].author}
                </span>
                <div className="flex items-center text-[#F39C12]">
                  {[...Array(testimonials[0].rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <Quote className="w-6 h-6 text-[#D4AF37]/40 mb-3" />

              <p className="text-xs sm:text-sm text-[#FAF7F2]/90 font-light leading-relaxed">
                "{testimonials[0].quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 text-[10px] text-[#F8C471]/70 font-mono">
              {testimonials[0].date} · Verified Highway Halt
            </div>
          </div>

          {/* Column 3: Testimonial Card 2 */}
          <div className="lg:col-span-4 rounded-3xl royal-glass-card p-8 flex flex-col justify-between hover:border-[#E67E22]/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#F8C471] uppercase tracking-[0.2em] font-mono">
                  {testimonials[1].author}
                </span>
                <div className="flex items-center text-[#F39C12]">
                  {[...Array(testimonials[1].rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <Quote className="w-6 h-6 text-[#D4AF37]/40 mb-3" />

              <p className="text-xs sm:text-sm text-[#FAF7F2]/90 font-light leading-relaxed">
                "{testimonials[1].quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 text-[10px] text-[#F8C471]/70 font-mono">
              {testimonials[1].date} · Verified Highway Halt
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
