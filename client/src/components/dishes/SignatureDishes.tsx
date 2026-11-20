import React, { useState } from 'react';
import { Sparkles, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { SIGNATURE_ITEMS } from '../../data/restaurantData';

interface SignatureDishesProps {
  onOpenMenuDrawer?: () => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({ onOpenMenuDrawer }) => {
  const [filter, setFilter] = useState<'all' | 'tandoor' | 'south' | 'drinks'>('all');

  const filteredDishes = SIGNATURE_ITEMS.filter((dish) => {
    if (filter === 'all') return true;
    if (filter === 'tandoor') return dish.category === 'Parathas and Kulcha' || dish.category === 'Breakfast';
    if (filter === 'south') return dish.category === 'South Indian';
    if (filter === 'drinks') return dish.category === 'Beverages and Lassi' || dish.category === 'Desserts';
    return true;
  });

  return (
    <section id="signatures" className="py-24 sm:py-32 bg-[#35080E] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Golden Ambient Backlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E67E22]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E67E22]/20 border border-[#D4AF37]/30 text-[#F8C471] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>Timeless Culinary Signatures</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our 8 Iconic Signature Delights
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#F3ECE2]/80 font-light leading-relaxed">
              Handcrafted recipes that have defined the Grand Trunk Road journey for millions of travelers. Pure desi ghee, earthen tandoors, and traditional Punjabi generosity.
            </p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All 8 Signatures' },
              { id: 'tandoor', label: 'Tandoor & Breads' },
              { id: 'south', label: 'South Indian' },
              { id: 'drinks', label: 'Lassi & Treats' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-[#E67E22] text-white shadow-md'
                    : 'bg-[#4A0E17]/80 text-[#FAF7F2]/80 hover:text-white hover:bg-[#4A0E17] border border-[#D4AF37]/25'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Responsive Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group relative bg-[#4A0E17]/90 rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-[#24050A]">
                <img
                  src={dish.imagePlaceholder}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17] via-transparent to-transparent opacity-80" />

                {/* Pure Veg Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#200408]/90 border border-white/20 text-xs backdrop-blur-sm">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      dish.isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                  />
                  <span className="font-semibold text-white text-[10px]">
                    {dish.isVeg ? 'Pure Veg' : 'Non-Veg'}
                  </span>
                </div>

                {/* Punjabi Name Watermark */}
                <span className="absolute bottom-2 right-3 font-serif text-xs text-[#D4AF37]/75 font-semibold">
                  {dish.punjabiName}
                </span>
              </div>

              {/* Dish Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#F8C471] transition-colors leading-tight">
                    {dish.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#F3ECE2]/75 line-clamp-3 font-light leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#F8C471]">
                      {dish.placeholderPrice}
                    </span>
                    <span className="block text-[9px] text-gray-400 font-light">
                      {dish.priceDisclaimer}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-semibold text-[#E67E22] tracking-wider px-2 py-0.5 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30">
                    Haveli Classic
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Drawer CTA Strip */}
        <div className="mt-14 pt-8 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-[#F3ECE2]/75 font-light">
            Craving more options? Explore our full multi-cuisine menu covering breakfast, snacks, south indian, beverages & desserts.
          </p>

          {onOpenMenuDrawer && (
            <button
              onClick={onOpenMenuDrawer}
              className="px-7 py-3 rounded-full bg-[#E67E22] hover:bg-[#F39C12] text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:scale-105 flex items-center gap-2 shrink-0 border border-[#D4AF37]/40"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Open Full Menu Drawer (24 Items)</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
