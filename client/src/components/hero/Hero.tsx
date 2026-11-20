import React, { useEffect, useRef } from 'react';
import { Compass, MapPin, Clock, Phone, UtensilsCrossed } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES, RESTAURANT_DATA } from '../../data/restaurantData';
import { useOpeningHours } from '../../hooks/useOpeningHours';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreMenuClick: () => void;
  onExploreStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenuClick,
  onExploreStoryClick,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const cloudLeftRef = useRef<HTMLImageElement>(null);
  const cloudRightRef = useRef<HTMLImageElement>(null);
  const cloudCenterRef = useRef<HTMLImageElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);
  const status = useOpeningHours();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let xQuick: gsap.QuickToFunc | null = null;
    let yQuick: gsap.QuickToFunc | null = null;

    const ctx = gsap.context(() => {
      // 1. Cinematic Cloud-Parting & Background Zoom Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Initial state
      gsap.set([cloudLeftRef.current, cloudRightRef.current], { opacity: 0.5 });
      gsap.set(cloudCenterRef.current, { opacity: 0.35 });

      // Part clouds outward with fluid momentum
      tl.to(
        cloudLeftRef.current,
        {
          xPercent: -80,
          scale: 1.2,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        cloudRightRef.current,
        {
          xPercent: 80,
          scale: 1.2,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        cloudCenterRef.current,
        {
          scale: 1.3,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        0
      );

      // Courtyard background scales in gracefully as clouds dissolve
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.08, filter: 'brightness(0.45) saturate(1.15)' },
        { scale: 1.0, filter: 'brightness(0.55) saturate(1.3)', duration: 1.4, ease: 'power2.out' },
        0
      );

      // Headline Words & Subtitle Stagger In with zero perceptual lag
      const titleWords = titleContainerRef.current?.querySelectorAll('.hero-title-word');
      if (titleWords && titleWords.length > 0) {
        tl.fromTo(
          titleWords,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out' },
          0.1
        );
      }

      const fadeElements = titleContainerRef.current?.querySelectorAll('.hero-anim-fade');
      if (fadeElements && fadeElements.length > 0) {
        tl.fromTo(
          fadeElements,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out' },
          0.2
        );
      }

      // Floating bottom info bar rises smoothly
      if (infoBarRef.current) {
        tl.fromTo(
          infoBarRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.3
        );
      }

      // Initialize quickTo for subtle, butter-smooth mouse parallax on background
      if (bgImageRef.current) {
        xQuick = gsap.quickTo(bgImageRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
        yQuick = gsap.quickTo(bgImageRef.current, 'y', { duration: 1.2, ease: 'power2.out' });
      }
    }, heroRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || prefersReduced || !xQuick || !yQuick) return;
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * -12;
      const yOffset = (e.clientY / innerHeight - 0.5) * -12;
      xQuick(xOffset);
      yQuick(yOffset);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[96vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#130307] text-[#FFF9F0] pt-28 sm:pt-36 pb-12 sm:pb-20"
      aria-label="Haveli Welcome"
    >
      {/* 1. Cinematic Background Courtyard Photography */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 bg-cover bg-center filter brightness-[0.55] saturate-135 scale-105 will-change-transform"
        style={{ backgroundImage: `url(${IMAGES.heroHaveli})` }}
      />

      {/* Atmospheric Royal Velvet & Saffron Amber Vignettes */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#130307] via-[#24060E]/50 to-[#130307]/80 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#130307_82%)] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.22)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)] blur-[130px] pointer-events-none" />

      {/* 2. Organic Billowing Parting Clouds (GSAP Animated) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden="true">
        <img
          ref={cloudLeftRef}
          src="/clouds/cloud-left.png"
          alt=""
          className="absolute -top-12 -left-28 w-[85vw] max-w-[1300px] h-[105vh] object-cover mix-blend-screen opacity-70 will-change-transform"
        />
        <img
          ref={cloudRightRef}
          src="/clouds/cloud-right.png"
          alt=""
          className="absolute -top-12 -right-28 w-[85vw] max-w-[1300px] h-[105vh] object-cover mix-blend-screen opacity-70 will-change-transform"
        />
        <img
          ref={cloudCenterRef}
          src="/clouds/cloud-center.png"
          alt=""
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[950px] object-cover mix-blend-screen opacity-50 will-change-transform"
        />
      </div>

      {/* 3. Center Cinematic Brand Typography */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 w-full text-center my-auto pt-10 sm:pt-16">
        <div ref={titleContainerRef} className="space-y-4 sm:space-y-6">
          {/* Authentic Welcome Tag */}
          <div className="hero-anim-fade inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#2B0711]/90 via-[#180308]/95 to-[#2B0711]/90 backdrop-blur-2xl border border-[#D4AF37]/45 text-[#F8C471] text-[11px] font-serif uppercase tracking-[0.25em] shadow-[0_4px_25px_rgba(15,2,5,0.7),inset_0_1px_0_rgba(248,196,113,0.3)]">
            <span className="text-[#D4AF37] text-xs">✦</span>
            <span>ਜੀ ਆਇਆਂ ਨੂੰ &nbsp;·&nbsp; PALATIAL CULTURE HUB &nbsp;·&nbsp; GRAND TRUNK ROAD</span>
            <span className="text-[#D4AF37] text-xs">✦</span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#FFF9F0] leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
            <span className="inline-block hero-title-word mr-3 sm:mr-4">HAVELI</span>
            <span className="inline-block hero-title-word text-[#F8C471] font-serif text-3xl sm:text-5xl lg:text-6xl font-normal ml-1">
              ਹਵੇਲੀ
            </span>
          </h1>

          {/* Palatial Descriptor & Sub-headline */}
          <div className="hero-anim-fade space-y-2 max-w-3xl mx-auto">
            <p className="font-serif text-base sm:text-xl md:text-2xl font-bold text-[#F8C471] tracking-wide">
              Palatial Punjabi Restaurant & Culture Hub
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#FAF7F2]/90 font-light leading-relaxed max-w-2xl mx-auto">
              Palatial dining beneath crystal chandeliers, heralded by our iconic vintage car landmark on the Grand Trunk Road.
            </p>
          </div>

          {/* Signature Hallmarks Typographic Strip */}
          <div className="hero-anim-fade flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#F8C471]/90">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Vintage Car Portico</span>
            </span>
            <span className="text-[#D4AF37]/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Grand Chandeliers</span>
            </span>
            <span className="text-[#D4AF37]/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Punjabi Heritage Hub</span>
            </span>
          </div>

          {/* Luxury Royal & Delicious Action Buttons */}
          <div className="hero-anim-fade flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={onExploreMenuClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] hover:from-[#F39C12] hover:to-[#E67E22] text-white font-bold text-sm tracking-wide shadow-[0_6px_28px_rgba(230,126,34,0.55)] hover:shadow-[0_8px_35px_rgba(230,126,34,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 border border-[#F8C471]/50 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-white" />
              <span>Explore The Palatial Menu</span>
            </button>

            <button
              onClick={onExploreStoryClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1A0A0E]/80 hover:bg-[#2D1018] text-[#FAF7F2] hover:text-white font-semibold text-sm border border-[#D4AF37]/40 backdrop-blur-xl hover:border-[#D4AF37]/70 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#F8C471]" />
              <span>Explore Culture Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Floating Highway Information Strip (Royal Liquid Glass) */}
      <div
        ref={infoBarRef}
        className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-10 sm:mt-16"
      >
        <div className="royal-glass rounded-2xl sm:rounded-3xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/20 text-left">
          {/* Column 1: Locate Us */}
          <div className="flex items-start gap-3.5 pt-2 md:pt-0 group hover:bg-[#200A10]/40 p-2 -m-2 rounded-2xl transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#1E0B10] border border-[#D4AF37]/40 flex items-center justify-center text-[#E67E22] shrink-0 shadow-md">
              <MapPin className="w-5 h-5 text-[#F8C471]" />
            </div>
            <div>
              <span className="font-serif text-[11px] font-bold text-[#F8C471] uppercase tracking-wider block">
                Locate Us
              </span>
              <p className="text-xs text-[#FFF9F0] mt-0.5 line-clamp-1 font-semibold">
                Grand Trunk Rd, Khajurla, Punjab 144411
              </p>
              <span className="text-[10px] text-[#F8C471]/80 block font-mono">
                Palatial Entrance · Classic Car Landmark
              </span>
            </div>
          </div>

          {/* Column 2: Open Hours */}
          <div className="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-5 group hover:bg-[#200A10]/40 p-2 -m-2 rounded-2xl transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#1E0B10] border border-[#D4AF37]/40 flex items-center justify-center text-[#E67E22] shrink-0 shadow-md">
              <Clock className="w-5 h-5 text-[#E67E22]" />
            </div>
            <div>
              <span className="font-serif text-[11px] font-bold text-[#F8C471] uppercase tracking-wider block">
                Open Hours
              </span>
              <p className="text-xs text-[#FFF9F0] font-bold mt-0.5">
                Daily 5:00 AM – 12:30 AM
              </p>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{status.statusBadge} · 19.5h continuous feasts</span>
              </span>
            </div>
          </div>

          {/* Column 3: Direct Reservation */}
          <div className="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-5 group hover:bg-[#200A10]/40 p-2 -m-2 rounded-2xl transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#1E0B10] border border-[#D4AF37]/40 flex items-center justify-center text-[#E67E22] shrink-0 shadow-md">
              <Phone className="w-5 h-5 text-[#E67E22]" />
            </div>
            <div>
              <span className="font-serif text-[11px] font-bold text-[#F8C471] uppercase tracking-wider block">
                Table & Halts
              </span>
              <a
                href={`tel:${RESTAURANT_DATA.phoneClean}`}
                className="text-xs text-[#FFF9F0] font-bold mt-0.5 block hover:text-[#E67E22] transition-colors"
              >
                {RESTAURANT_DATA.phone}
              </a>
              <span className="text-[10px] text-[#FAF7F2]/80 block font-light">
                Palatial Dining & Highway Halts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
