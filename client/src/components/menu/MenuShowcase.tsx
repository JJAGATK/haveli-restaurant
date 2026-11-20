import React, { useEffect, useRef, useState } from 'react';
import { UtensilsCrossed, ArrowRight, Flame } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MenuShowcaseProps {
  onOpenMenuDrawer: () => void;
}

interface CulinaryChapter {
  id: string;
  categoryTag: string;
  punjabiName: string;
  title: string;
  tagline: string;
  description: string;
  plateImage: string;
  altText: string;
  plateAlign: 'left' | 'right';
  estimatedPrice: string;
  glowColor: string;
  badges: string[];
  sensoryHighlights: {
    label: string;
    detail: string;
  }[];
}

const CULINARY_CHAPTERS: CulinaryChapter[] = [
  {
    id: 'breakfast-tandoor',
    categoryTag: 'Morning Dawn to All-Day · 5:00 AM Onwards',
    punjabiName: 'ਅੰਮ੍ਰਿਤਸਰੀ ਕੁਲਚਾ ਤੇ ਛੋਲੇ ਭਟੂਰੇ',
    title: 'Fabulous Breakfasts & Tandoor',
    tagline: 'Clay Hearth Kulchas & Balloon-Puffed Bhaturas',
    description:
      'Multi-layered crisp kulchas stuffed with spiced potatoes and anardana, baked against red-hot clay tandoor walls and crowned with fresh churned white butter. Served with slow-simmered dark pindi chana and tangy pickled relishes.',
    plateImage: '/dishes/bhature-plate.png',
    altText: 'Authentic Punjabi Breakfast Amritsari Kulcha and Chole Bhature',
    plateAlign: 'left',
    estimatedPrice: '₹210 - ₹220* [Est. Placeholder]',
    glowColor: 'rgba(230, 126, 34, 0.28)',
    badges: ['100% Desi Ghee', '450°C Clay Tandoor', 'Farm White Makkhan'],
    sensoryHighlights: [
      {
        label: 'The Hearth',
        detail: 'Hand-stretched dough baked over glowing charcoal for a signature blistered crunch.',
      },
      {
        label: 'Accompaniment',
        detail: 'Dark Pindi chana simmered with dried pomegranate seeds, amla & whole spices.',
      },
      {
        label: 'Tasting Pair',
        detail: 'Freshly churned sweet lassi served in an authentic earthenware clay kulhad.',
      },
    ],
  },
  {
    id: 'royal-dinners',
    categoryTag: 'Overnight Simmered · Live Charcoal Embers',
    punjabiName: 'ਸ਼ਾਹੀ ਦਾਲ ਮੱਖਣੀ ਤੇ ਤੰਦੂਰੀ ਰੋਟੀਆਂ',
    title: 'Royal Highway Dinners',
    tagline: '16-Hour Handi Curries & Clay Oven Naans',
    description:
      'Whole black lentils and rajma slow-simmered for 16 continuous hours over dying charcoal embers in heavy brass degs. Finished with velvety dairy cream, pure desi ghee, and fragrant kasuri methi.',
    plateImage: '/dishes/dal-plate.png',
    altText: 'Haveli Royal Dal Makhani and Tandoor Curries',
    plateAlign: 'right',
    estimatedPrice: '₹280 - ₹320* [Est. Placeholder]',
    glowColor: 'rgba(212, 175, 55, 0.26)',
    badges: ['16-Hour Slow Simmer', 'Pure Cow Ghee', 'Charcoal Hearth'],
    sensoryHighlights: [
      {
        label: 'The Embers',
        detail: 'Slowly cooked overnight in brass handis so whole spices infuse deep velvety richness.',
      },
      {
        label: 'Accompaniment',
        detail: 'Crisp garlic butter naan or smoky whole-wheat tandoori rotis fresh from the fire.',
      },
      {
        label: 'Tasting Pair',
        detail: 'Pickled baby onions in sirka vinegar, spiced green chillies & fresh jeera pulao.',
      },
    ],
  },
  {
    id: 'refreshments-snacks',
    categoryTag: 'Highway Pit-Stop Refreshments · All-Day',
    punjabiName: 'ਮਲਾਈਦਾਰ ਮਿੱਠੀ ਲੱਸੀ ਤੇ ਸ਼ਾਮ ਦੇ ਸਨੈਕਸ',
    title: 'Heavenly Snacks & Sweet Lassi',
    tagline: 'Earthenware Kulhads & Crisp Street Flavors',
    description:
      'Thick, velvety sweet lassi churned in traditional wooden madhanis, served in rustic terracotta kulhads topped with a rich layer of clotted malai and green cardamom. Paired with piping hot highway samosas and crisp masala dosas.',
    plateImage: '/dishes/kulcha-plate.png',
    altText: 'Haveli Sweet Kulhad Lassi, Dosas and Highway Snacks',
    plateAlign: 'left',
    estimatedPrice: '₹120 - ₹190* [Est. Placeholder]',
    glowColor: 'rgba(243, 156, 18, 0.26)',
    badges: ['Earthen Clay Kulhad', 'Hand-Churned Malai', 'Fragrant Cardamom'],
    sensoryHighlights: [
      {
        label: 'The Churn',
        detail: 'Fresh whole-milk yogurt churned cold with aromatic green cardamom & saffron.',
      },
      {
        label: 'Accompaniment',
        detail: 'Crisp golden samosas, aloo tikki chaat & thin paper-crisp South Indian masala dosas.',
      },
      {
        label: 'Tasting Pair',
        detail: 'Strong highway masala chai infused with crushed fresh ginger, cinnamon & cloves.',
      },
    ],
  },
];

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({ onOpenMenuDrawer }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const platesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Elegant floating parallax for plates
      platesRef.current.forEach((plate, i) => {
        if (!plate) return;
        gsap.fromTo(
          plate,
          { y: 35, rotate: i % 2 === 0 ? -4 : 4 },
          {
            y: -35,
            rotate: i % 2 === 0 ? 4 : -4,
            ease: 'none',
            scrollTrigger: {
              trigger: plate,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });

      // Staggered reveal for each pavilion card
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const targetCard = cardsRef.current[index];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="menu-showcase"
      className="py-24 sm:py-32 bg-[#130307] text-[#FFF9F0] relative overflow-hidden"
      aria-label="Palatial Punjabi Culinary Showcase"
    >
      {/* Royal Amber & Saffron Atmospheric Vignettes */}
      <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.14)_0%,transparent_70%)] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="md:col-span-7 text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#20050D] border border-[#D4AF37]/35 text-[#F8C471] text-[11px] font-serif uppercase tracking-[0.22em] shadow-md">
              <span className="text-[#D4AF37] text-xs">✦</span>
              <span>ROYAL TANDOOR & DESI GHEE HEARTHS</span>
              <span className="text-[#D4AF37] text-xs">✦</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF9F0] tracking-tight leading-[1.08] drop-shadow-md">
              Palatial Feasts
            </h2>

            <p className="text-sm text-[#FAF7F2]/85 font-light leading-relaxed max-w-xl">
              From dawn breakfast tandoor kulchas to slow-simmered midnight handis on the Grand Trunk Road, each recipe is handcrafted by veteran ustads with churned desi ghee and fragrant whole spices.
            </p>
          </div>

          {/* Quick Chapter Selector Pills (Pleasing, tactile, interactive) */}
          <div className="md:col-span-5 flex flex-wrap md:justify-end gap-2 pt-2">
            {CULINARY_CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
                  activeChapterIndex === idx
                    ? 'bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white border-[#F8C471]/50 shadow-[0_2px_14px_rgba(230,126,34,0.4)]'
                    : 'bg-[#20050D]/80 hover:bg-[#340815] text-[#F8C471] border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
                }`}
              >
                {idx === 0 ? 'Breakfast & Tandoor' : idx === 1 ? 'Royal Dinners' : 'Snacks & Lassi'}
              </button>
            ))}
          </div>
        </div>

        {/* The 3 Palatial Culinary Pavilions */}
        <div className="space-y-16 sm:space-y-24">
          {CULINARY_CHAPTERS.map((chapter, idx) => {
            const isPlateLeft = chapter.plateAlign === 'left';

            return (
              <div
                key={chapter.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#20050E]/85 via-[#160308]/92 to-[#260611]/85 border border-[#D4AF37]/35 shadow-[0_25px_70px_rgba(8,1,3,0.9),inset_0_1px_0_rgba(248,196,113,0.25)] backdrop-blur-2xl p-6 sm:p-10 lg:p-14 overflow-hidden group hover:border-[#D4AF37]/60 transition-all duration-500"
              >
                {/* Atmospheric Ambient Glow behind each pavilion */}
                <div
                  className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                  style={{ backgroundColor: chapter.glowColor }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
                  {/* Plate Display Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col items-center justify-center ${
                      isPlateLeft ? 'order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <div
                      ref={(el) => {
                        platesRef.current[idx] = el;
                      }}
                      className="relative flex items-center justify-center p-3 cursor-pointer group/plate"
                      onClick={onOpenMenuDrawer}
                    >
                      {/* Decorative Concentric Royal Brass Thali Orbit Rings */}
                      <div className="absolute inset-0 rounded-full border border-[#D4AF37]/25 pointer-events-none scale-110" />
                      <div className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/15 pointer-events-none scale-125 animate-[spin_60s_linear_infinite]" />

                      {/* Sizzling Butter Aura */}
                      <div
                        className="absolute inset-4 rounded-full blur-2xl pointer-events-none transition-all duration-500 group-hover/plate:scale-110"
                        style={{ backgroundColor: chapter.glowColor }}
                      />

                      {/* The Culinary Plate Container */}
                      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 rounded-full overflow-hidden border-2 border-[#D4AF37]/70 shadow-[0_20px_60px_rgba(10,2,4,0.95)] group-hover/plate:scale-105 transition-transform duration-500 bg-[#24050A]">
                        <img
                          src={chapter.plateImage}
                          alt={chapter.altText}
                          className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover/plate:brightness-110 transition-all duration-500"
                          loading="lazy"
                        />
                        {/* Subtle inner glass rim highlight */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_12px_rgba(255,255,255,0.25)] pointer-events-none" />
                      </div>

                      {/* Floating Micro-Badge Top: Pure Veg Guarantee */}
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-[#1A0308]/90 border border-[#D4AF37]/45 text-[10px] font-bold text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Pure Vegetarian</span>
                      </div>

                      {/* Floating Micro-Badge Bottom: Hearth Method */}
                      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#E67E22] to-[#D35400] border border-[#F8C471]/50 text-[10px] font-bold text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                        <Flame className="w-3 h-3 text-[#FCF5DE]" />
                        <span>{chapter.badges[1]}</span>
                      </div>
                    </div>

                    {/* Quick Badge Row under Plate */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                      {chapter.badges.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-0.5 rounded-full bg-[#180308]/80 border border-[#D4AF37]/30 text-[10px] uppercase font-mono tracking-wider text-[#F8C471]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Culinary Story & Sensory Highlights Column */}
                  <div
                    className={`lg:col-span-7 space-y-5 text-left ${
                      isPlateLeft ? 'order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    {/* Category & Gurmukhi Header */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span className="text-[11px] font-bold text-[#E67E22] uppercase tracking-[0.2em]">
                          {chapter.categoryTag}
                        </span>
                        <span className="font-serif text-sm font-normal text-[#F8C471]/90">
                          {chapter.punjabiName}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF9F0] tracking-tight leading-tight">
                        {chapter.title}
                      </h3>

                      <p className="font-serif text-xs sm:text-sm text-[#F8C471] italic font-medium">
                        {chapter.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#FAF7F2]/90 font-light leading-relaxed">
                      {chapter.description}
                    </p>

                    {/* Pleasing 3-Point Sensory Experience Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {chapter.sensoryHighlights.map((sens, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-2xl bg-[#180308]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-1 shadow-sm"
                        >
                          <span className="text-[10px] font-bold text-[#F8C471] uppercase tracking-wider block">
                            {sens.label}
                          </span>
                          <p className="text-[11px] text-[#FAF7F2]/80 font-light leading-snug">
                            {sens.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Sovereign Action Bar with Pricing and Menu Drawer Trigger */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/25">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-[#F8C471]/70 tracking-wider block">
                          Highway Portion Guide
                        </span>
                        <span className="font-mono text-sm font-bold text-[#F8C471] bg-[#180308] px-3 py-1 rounded-lg border border-[#D4AF37]/35 inline-block shadow-sm">
                          {chapter.estimatedPrice}
                        </span>
                      </div>

                      <button
                        onClick={onOpenMenuDrawer}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] hover:from-[#F39C12] hover:to-[#E67E22] text-white text-xs font-bold tracking-wide shadow-[0_4px_18px_rgba(230,126,34,0.5)] hover:shadow-[0_6px_24px_rgba(230,126,34,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center gap-2 border border-[#F8C471]/50 cursor-pointer"
                        aria-label={`Explore ${chapter.title} in Menu Drawer`}
                      >
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        <span>Explore Full Dish Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Triggering Full 24-Item Menu Drawer */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#20050D] via-[#160308] to-[#20050D] border border-[#D4AF37]/35 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F8C471] block">
              Complete Culinary Heritage
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF9F0]">
              Browse All 24 Authentic Highway Specialities
            </h3>
            <p className="text-xs text-[#FAF7F2]/75 font-light">
              From fresh morning tandoor breads and chaat counters to hearty thalis, South Indian dosas, and churned lassis.
            </p>
          </div>

          <button
            onClick={onOpenMenuDrawer}
            className="px-8 py-3.5 rounded-full bg-[#180308] hover:bg-[#280510] text-[#F8C471] hover:text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#E67E22]" />
            <span>Open 24-Item Menu Drawer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
