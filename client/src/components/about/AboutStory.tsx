import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../data/restaurantData';

gsap.registerPlugin(ScrollTrigger);

interface AboutStoryProps {
  onExploreMenuClick?: () => void;
  onExploreCultureClick?: () => void;
}

export const AboutStory: React.FC<AboutStoryProps> = ({
  onExploreMenuClick,
  onExploreCultureClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textColRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        imageColRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="py-24 sm:py-32 bg-[#130307] text-[#FFF9F0] relative overflow-hidden"
    >
      {/* Saffron & Royal Amber Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.15)_0%,transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Editorial Narrative */}
          <div ref={textColRef} className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F8C471] block">
              Discover &nbsp;·&nbsp; Heritage & Legacy
            </span>

            {/* Kinetic Layered Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF9F0] tracking-tight leading-[1.08] drop-shadow-md">
              Palatial Punjabi Legacy
            </h2>

            <p className="text-sm sm:text-base text-[#FAF7F2]/90 font-light leading-relaxed max-w-xl">
              Stationed on the historic Grand Trunk Road, Haveli is an opulent sanctuary of living Punjabi heritage. Welcomed by our vintage car landmark at the arched sandstone entrance, guests dine beneath soaring ceilings and cascading crystal chandeliers—served with timeless royal hospitality and slow-simmered clay tandoor delicacies.
            </p>

            {/* Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              {onExploreCultureClick && (
                <button
                  onClick={onExploreCultureClick}
                  className="px-6 py-2.5 rounded-full bg-[#1A0A0E] hover:bg-[#2D1018] text-[#F8C471] hover:text-white text-xs font-bold border border-[#D4AF37]/45 shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Explore Dedicated Culture Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E67E22]" />
                </button>
              )}

              {onExploreMenuClick && (
                <button
                  onClick={onExploreMenuClick}
                  className="text-xs font-bold text-[#F8C471]/90 hover:text-white border-b border-[#D4AF37]/50 hover:border-white pb-0.5 transition-colors cursor-pointer"
                >
                  View The Palatial Menu →
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Architectural Window Imagery */}
          <div ref={imageColRef} className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_25px_70px_rgba(5,1,2,0.9)] bg-[#1A0A0E] aspect-[16/11] group">
              <img
                src={IMAGES.villageAmbience}
                alt="Haveli Palatial Punjabi Culture Hub & Chandeliers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0709]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl royal-glass text-xs">
                <span className="font-serif font-bold text-[#F8C471] block">
                  Grand Durbar & Cultural Sanctum
                </span>
                <p className="text-[11px] text-[#FFF9F0]/85 mt-0.5 font-light">
                  Ornate sandstone jharokhas, glowing chandeliers, antique brassware, and royal Punjabi hospitality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
