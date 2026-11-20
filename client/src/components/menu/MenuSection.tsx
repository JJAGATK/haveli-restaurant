import React, { useState, useMemo } from 'react';
import { Search, Flame, Info } from 'lucide-react';
import { MASTER_MENU_ITEMS, RESTAURANT_DATA } from '../../data/restaurantData';

type DietaryFilter = 'ALL' | 'VEG' | 'NON_VEG' | 'VEGAN' | 'SIGNATURES';

const MENU_CATEGORIES_DISPLAY = [
  { id: 'ALL', label: 'ALL ITEMS' },
  { id: 'Parathas and Kulcha', label: 'PARATHAS & KULCHA' },
  { id: 'Breakfast', label: 'BREAKFAST' },
  { id: 'Main Course', label: 'MAINS & CURRIES' },
  { id: 'South Indian', label: 'SOUTH INDIAN' },
  { id: 'Snacks and Chaat', label: 'SNACKS & CHAAT' },
  { id: 'Beverages and Lassi', label: 'BEVERAGES & LASSI' },
  { id: 'Desserts', label: 'DESSERTS' },
] as const;

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('ALL');

  const filteredItems = useMemo(() => {
    return MASTER_MENU_ITEMS.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Dietary Filter
      if (dietaryFilter === 'VEG' && !item.isVeg) return false;
      if (dietaryFilter === 'NON_VEG' && item.isVeg) return false;
      if (dietaryFilter === 'VEGAN') {
        const desc = (item.description + ' ' + (item.dietaryTags || '')).toLowerCase();
        if (desc.includes('paneer') || desc.includes('butter') || desc.includes('cream') || desc.includes('lassi') || desc.includes('softy')) {
          return false;
        }
      }
      if (dietaryFilter === 'SIGNATURES' && !item.isSignature) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchPunjabi = item.punjabiName?.toLowerCase().includes(q);
        const matchTags = item.dietaryTags?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat && !matchPunjabi && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section
      id="menu"
      className="py-24 sm:py-32 bg-[#100205] text-[#FFF9F0] relative overflow-hidden"
      aria-label="The Palatial Haveli Menu"
    >
      {/* Saffron & Amber Atmospheric Radial Glows */}
      <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.12)_0%,transparent_70%)] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.10)_0%,transparent_70%)] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Matching The Stash House Reference Image */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <span className="font-serif italic text-base sm:text-lg text-[#F8C471] tracking-wide block">
            Gastronomic Repertoire
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF9F0] tracking-tight leading-tight drop-shadow-md">
            The Palatial Haveli Menu
          </h2>

          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light leading-relaxed max-w-2xl mx-auto">
            From roaring clay tandoor embers to slow-simmered handis and clotted malai lassis. Authentic Punjabi heritage cooked with pure desi ghee and hand-ground spices.
          </p>

          {/* Golden Diamond Divider */}
          <div className="pt-2 flex items-center justify-center">
            <span className="text-[#D4AF37] text-sm select-none">◇</span>
          </div>
        </div>

        {/* Centered Large Pill Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="w-4 h-4 text-[#F8C471]/60 absolute left-4 sm:left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. 'Amritsari Kulcha', 'Dal Makhani', 'Lassi', 'Bhature')..."
              className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-full bg-[#180308]/90 border border-[#D4AF37]/35 text-xs sm:text-sm text-[#FFF9F0] placeholder-[#FAF7F2]/45 focus:outline-none focus:border-[#F8C471] focus:ring-1 focus:ring-[#F8C471] shadow-[0_8px_25px_rgba(5,1,2,0.8),inset_0_1px_0_rgba(248,196,113,0.15)] transition-all"
            />
          </div>
        </div>

        {/* Dietary Filter Pills Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
          {/* ALL DIETS */}
          <button
            onClick={() => setDietaryFilter('ALL')}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              dietaryFilter === 'ALL'
                ? 'bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] text-white shadow-[0_3px_14px_rgba(230,126,34,0.55)] border border-[#F8C471]/60'
                : 'bg-[#1C0409]/80 hover:bg-[#28050E] text-[#F8C471] border border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
            }`}
          >
            ALL DIETS
          </button>

          {/* VEGETARIAN */}
          <button
            onClick={() => setDietaryFilter('VEG')}
            className={`px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 border cursor-pointer ${
              dietaryFilter === 'VEG'
                ? 'bg-[#18361C] text-emerald-300 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                : 'bg-[#1C0409]/80 hover:bg-[#28050E] text-[#FAF7F2]/85 border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>VEGETARIAN</span>
          </button>

          {/* NON-VEG */}
          <button
            onClick={() => setDietaryFilter('NON_VEG')}
            className={`px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 border cursor-pointer ${
              dietaryFilter === 'NON_VEG'
                ? 'bg-[#3B0E14] text-rose-300 border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.35)]'
                : 'bg-[#1C0409]/80 hover:bg-[#28050E] text-[#FAF7F2]/85 border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
            }`}
          >
            <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-rose-400" />
            <span>NON-VEG</span>
          </button>

          {/* VEGAN */}
          <button
            onClick={() => setDietaryFilter('VEGAN')}
            className={`px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 border cursor-pointer ${
              dietaryFilter === 'VEGAN'
                ? 'bg-[#18361C] text-teal-300 border-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.35)]'
                : 'bg-[#1C0409]/80 hover:bg-[#28050E] text-[#FAF7F2]/85 border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
            }`}
          >
            <span className="text-teal-400 text-xs">🌿</span>
            <span>JAIN / VEGAN</span>
          </button>

          {/* CHEF SPECIALS */}
          <button
            onClick={() => setDietaryFilter('SIGNATURES')}
            className={`px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 border cursor-pointer ${
              dietaryFilter === 'SIGNATURES'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold border-[#FFF9F0]/60 shadow-[0_3px_14px_rgba(212,175,55,0.45)]'
                : 'bg-[#1C0409]/80 hover:bg-[#28050E] text-[#F8C471] border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
            }`}
          >
            <span className="text-[#D4AF37] text-xs">✦</span>
            <span>HAVELI SIGNATURES</span>
          </button>
        </div>

        {/* Horizontal Category Navigation Tabs with Gold Active Line */}
        <div className="border-b border-[#D4AF37]/25 mb-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-8 min-w-max pb-3 px-2">
            {MENU_CATEGORIES_DISPLAY.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap pb-1 ${
                    isActive
                      ? 'text-[#F8C471] font-extrabold'
                      : 'text-[#FAF7F2]/65 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#E67E22] to-[#D4AF37] shadow-[0_0_8px_rgba(230,126,34,0.8)]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Offerings Count & Subtext Meta Row */}
        <div className="flex items-center justify-between text-xs text-[#FAF7F2]/65 font-light mb-8 flex-wrap gap-2">
          <div>
            Showing <span className="font-semibold text-[#F8C471]">{filteredItems.length}</span> curated offerings
          </div>
          <div className="italic">
            Dishes freshly prepared to order in our artisanal clay tandoor hearths
          </div>
        </div>

        {/* 3-Column Dish Cards Grid (Matching The Stash House Reference Style) */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((dish) => {
              const tags = (dish.dietaryTags || '')
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);

              return (
                <div
                  key={dish.id}
                  className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1C0409]/90 via-[#140206]/95 to-[#22050E]/90 border border-[#D4AF37]/30 p-6 flex flex-col justify-between shadow-[0_12px_32px_rgba(5,1,2,0.7),inset_0_1px_0_rgba(248,196,113,0.18)] hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Veg Indicator + Signature Badge */}
                    <div className="flex items-center justify-between gap-2">
                      {/* Authentic Veg / Non-Veg Bordered Dot Symbol */}
                      <div
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                          dish.isVeg ? 'border-emerald-500' : 'border-rose-500'
                        }`}
                        title={dish.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                      >
                        {dish.isVeg ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        ) : (
                          <span className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-rose-500" />
                        )}
                      </div>

                      {/* Haveli Signature Badge */}
                      {dish.isSignature && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F8C471] text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
                          <Flame className="w-2.5 h-2.5 text-[#E67E22]" />
                          <span>HAVELI SIGNATURE</span>
                        </span>
                      )}
                    </div>

                    {/* Dish Title & Gurmukhi */}
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFF9F0] group-hover:text-[#F8C471] transition-colors leading-tight">
                        {dish.name}
                      </h3>
                      {dish.punjabiName && (
                        <span className="font-serif text-xs text-[#F8C471]/80 block font-normal">
                          {dish.punjabiName}
                        </span>
                      )}
                    </div>

                    {/* Dish Culinary Description */}
                    <p className="text-xs text-[#FAF7F2]/80 font-light leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Bottom Area: Ingredients Pills & Price */}
                  <div className="pt-4 mt-4 border-t border-[#D4AF37]/20 space-y-3">
                    {/* Ingredient / Craft Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-[#160206] text-[#FAF7F2]/75 text-[10px] border border-[#D4AF37]/20 font-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price and Counter Disclaimer */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-mono text-xs font-bold text-[#F8C471] bg-[#160206] px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                        {dish.placeholderPrice?.split('[')[0].trim()}
                      </span>
                      <span className="text-[10px] text-[#FAF7F2]/60 italic">
                        Fresh to order
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3 bg-[#1C0409]/60 rounded-3xl border border-[#D4AF37]/25">
            <p className="font-serif text-lg text-[#F8C471]">
              No dishes found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-[#FAF7F2]/70 font-light">
              Try adjusting your dietary filter or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('ALL');
                setSelectedCategory('ALL');
              }}
              className="px-5 py-2 rounded-full bg-[#E67E22] text-white text-xs font-bold shadow-md hover:bg-[#F39C12] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pricing Transparency Disclaimer */}
        <div className="mt-12 p-4 rounded-2xl bg-[#1C0409]/80 border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/80 flex items-start gap-3 shadow-md max-w-3xl mx-auto text-left">
          <Info className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#F8C471]">Menu Notice:</strong> {RESTAURANT_DATA.disclaimerText} All prices are indicative placeholders. Please verify with counter staff for exact printed menu rates.
          </p>
        </div>
      </div>
    </section>
  );
};
