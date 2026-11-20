import React, { useEffect, useRef } from 'react';
import { Zap, Users, Sparkles, Car, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../data/restaurantData';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 sm:py-36 bg-[#180206] text-[#FFF9F0] relative overflow-hidden"
    >
      {/* Saffron & Amber Royal Ambient Lights */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] blur-[130px] pointer-events-none" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header & 3 Royal Gold Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F8C471]">
              <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>Culture Hub & Amenities</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF9F0] tracking-tight drop-shadow-md">
              Palatial Culture Hub
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/85 font-light leading-relaxed max-w-xl pt-1">
              Palatial Punjabi restaurant and culture hub with chandeliers and classic car parked at the entrance. An iconic Grand Trunk Road sanctuary designed to revive road travelers with regal hospitality, clay tandoor feasts, and living village heritage.
            </p>
          </div>

          {/* 3 Royal Minimalist Outlined Badges */}
          <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-6 sm:gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#32060D] border border-[#D4AF37]/50 flex items-center justify-center text-[#F8C471] shadow-lg mb-2.5 group-hover:border-[#E67E22] group-hover:bg-[#450912] group-hover:-translate-y-1 transition-all duration-300">
                <Car className="w-6 h-6 text-[#E67E22]" />
              </div>
              <span className="font-serif text-xs font-bold text-[#FFF9F0]">Classic Car</span>
              <span className="text-[10px] text-[#F8C471]/70 font-light">At Grand Entrance</span>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#32060D] border border-[#D4AF37]/50 flex items-center justify-center text-[#F8C471] shadow-lg mb-2.5 group-hover:border-[#E67E22] group-hover:bg-[#450912] group-hover:-translate-y-1 transition-all duration-300">
                <Sparkles className="w-6 h-6 text-[#E67E22]" />
              </div>
              <span className="font-serif text-xs font-bold text-[#FFF9F0]">Chandeliers</span>
              <span className="text-[10px] text-[#F8C471]/70 font-light">Palatial Durbar</span>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#32060D] border border-[#D4AF37]/50 flex items-center justify-center text-[#F8C471] shadow-lg mb-2.5 group-hover:border-[#E67E22] group-hover:bg-[#450912] group-hover:-translate-y-1 transition-all duration-300">
                <Users className="w-6 h-6 text-[#E67E22]" />
              </div>
              <span className="font-serif text-xs font-bold text-[#FFF9F0]">Culture Hub</span>
              <span className="text-[10px] text-[#F8C471]/70 font-light">Punjabi Heritage</span>
            </div>
          </div>
        </div>

        {/* Featured Showcase Card: Haveli Palatial Sanctuary */}
        <div className="royal-glass-card rounded-3xl p-8 sm:p-12 overflow-hidden hover:border-[#E67E22]/60 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F8C471]">
                <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />
                <span>The Grand Entrance & Durbar Hall</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFF9F0] tracking-tight">
                Classic Car Landmark & Grand Chandeliers
              </h3>

              <p className="text-sm text-[#FAF7F2]/90 font-light leading-relaxed">
                Before stepping inside, travelers are welcomed by our celebrated vintage classic car parked at the grand archway entrance. Step within to magnificent high ceilings crowned with cascading brass and crystal chandeliers, ornate jharokhas, and spacious royal seating.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#2E050D] border border-[#D4AF37]/25">
                  <Car className="w-5 h-5 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#FFF9F0] block">Classic Car Entrance</span>
                    <span className="text-[11px] text-[#F8C471]/75 block">Iconic vintage car parked at grand portico</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#2E050D] border border-[#D4AF37]/25">
                  <Sparkles className="w-5 h-5 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#FFF9F0] block">Grand Chandeliers</span>
                    <span className="text-[11px] text-[#F8C471]/75 block">Glowing crystal & brass palatial fixtures</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#2E050D] border border-[#D4AF37]/25">
                  <Zap className="w-5 h-5 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#FFF9F0] block">24/7 EV Fast Charging</span>
                    <span className="text-[11px] text-[#F8C471]/75 block">High-speed EV bays for highway road-trips</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#2E050D] border border-[#D4AF37]/25">
                  <ShieldCheck className="w-5 h-5 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#FFF9F0] block">300+ Free Secured Parking</span>
                    <span className="text-[11px] text-[#F8C471]/75 block">Expansive lot for family cars and coaches</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl aspect-[16/11] bg-[#24050A]">
                <img
                  src={IMAGES.palatialChandeliers}
                  alt="Haveli Grand Palatial Chandeliers & Durbar"
                  className="w-full h-full object-cover filter brightness-100 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180206]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                  <span className="font-bold text-[#F8C471]">Palatial Chandeliers</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#180206]/80 border border-[#D4AF37]/40 text-[#FAF7F2]">
                    Grand Durbar Hall
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
