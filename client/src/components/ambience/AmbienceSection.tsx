import React from 'react';
import { Car, Zap, Users, Sparkles, Coffee, ShieldCheck, Clock } from 'lucide-react';
import { IMAGES } from '../../data/restaurantData';

export const AmbienceSection: React.FC = () => {
  const highlights = [
    {
      icon: <Users className="w-6 h-6 text-[#E67E22]" />,
      title: 'Traditional Pind Ambience',
      description: 'Handcrafted village courtyards, colorful phulkari drapery, heritage wooden charpais (manjis), and brass utensils recreating ancient Punjab.',
    },
    {
      icon: <Car className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Ample Free Parking',
      description: 'Expansive on-ground parking lots with dedicated security attendants, accommodating hundreds of family vehicles, SUVs, and private tour buses.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#E67E22]" />,
      title: '24/7 EV Fast Charging',
      description: 'Modern high-speed electric vehicle charging stations installed right on the GT Road corridor, powering your road trip while you dine.',
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Quick Highway Halt & Food Court',
      description: 'Traveling on a tight schedule? Enjoy our express counter for hot cutting chai, samosas, softy ice cream cones, and packaged travel snacks.',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#E67E22]" />,
      title: 'Open 5:00 AM – 12:30 AM',
      description: 'Nineteen and a half hours of continuous culinary service daily, ready for early morning highway travelers and midnight road-trippers alike.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Spotless Family Restrooms',
      description: 'High-hygiene, accessible family restrooms and baby care facilities continually sanitized for the comfort of long-distance travelers.',
    },
  ];

  return (
    <section id="ambience" className="py-20 lg:py-28 bg-[#30070E] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Jharokha Gradients */}
      <div className="absolute inset-0 bg-jharokha-mesh opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E67E22]/20 border border-[#E67E22]/40 text-[#F8C471] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />
            <span>Highway Comfort & Village Heart</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Haveli Highway Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E67E22] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-[#F3ECE2]/80 font-light">
            Designed from the ground up to provide seamless rest, authentic dining, and true Punjabi warmth to travelers on the Grand Trunk Road.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#4A0E17]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#4A0E17] transition-all duration-300 shadow-lg group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#24050A] border border-[#D4AF37]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#F8C471] transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F3ECE2]/75 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ambience Visual Montage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-3xl overflow-hidden border border-[#D4AF37]/40 p-2 bg-[#24050A]">
          <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl group">
            <img
              src={IMAGES.brassUtensils}
              alt="Royal Punjabi Brass Utensils"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div>
                <span className="font-serif text-sm font-bold text-[#F8C471] block">Royal Brass Serveware</span>
                <span className="text-[11px] text-white/80">Traditional degs, thalis & matkas</span>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl group">
            <img
              src={IMAGES.tandoorOven}
              alt="Live Charcoal Tandoor Baking"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div>
                <span className="font-serif text-sm font-bold text-[#F8C471] block">Live Charcoal Tandoor</span>
                <span className="text-[11px] text-white/80">Fresh kulchas & naans straight from clay ovens</span>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl group">
            <img
              src={IMAGES.evCharging}
              alt="Electric Vehicle Fast Charging Station"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div>
                <span className="font-serif text-sm font-bold text-[#F8C471] block">EV Charging & Parking</span>
                <span className="text-[11px] text-white/80">Fast highway road-trip charging bays</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
