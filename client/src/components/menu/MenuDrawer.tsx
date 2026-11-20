import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, AlertCircle, Info, Calendar } from 'lucide-react';
import { MASTER_MENU_ITEMS, MENU_CATEGORIES } from '../../data/restaurantData';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReserveClick?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose, onReserveClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'ALL' | 'VEG' | 'NON_VEG' | 'SIGNATURE'>('ALL');

  const filteredItems = useMemo(() => {
    return MASTER_MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (dietaryFilter === 'VEG' && !item.isVeg) return false;
      if (dietaryFilter === 'NON_VEG' && item.isVeg) return false;
      if (dietaryFilter === 'SIGNATURE' && !item.isSignature) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        const matchPunjabi = item.punjabiName?.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat && !matchPunjabi) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 pointer-events-none">
        <div className="w-screen max-w-2xl bg-[#FAF7F2] text-[#1A1715] shadow-2xl flex flex-col border-l border-[#D4AF37]/50 relative z-10 pointer-events-auto transition-transform duration-300">
          {/* Drawer Header */}
          <div className="p-6 bg-[#35080E] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold tracking-wider text-white">HAVELI</span>
                <span className="text-xs text-[#D4AF37] font-serif">ਸੰਪੂਰਨ ਮੀਨੂ</span>
              </div>
              <p className="text-xs text-[#F8C471] font-light">
                Palatial 24-Item Royal Feast & Grand Trunk Road Spread
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#24050A] text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 transition-colors"
              aria-label="Close menu drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Transparency Disclaimer */}
          <div className="p-6 bg-[#F3ECE2] border-b border-gray-200 space-y-4">
            {/* Transparency Alert */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-xs text-[#4A0E17] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
              <span>
                <strong>Notice:</strong> All prices shown below are indicative placeholders. Please consult the physical printed menu on arrival.
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. kulcha, lassi, dosa, chicken)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
              />
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setDietaryFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  dietaryFilter === 'ALL'
                    ? 'bg-[#4A0E17] text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('VEG')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  dietaryFilter === 'VEG'
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Pure Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('NON_VEG')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  dietaryFilter === 'NON_VEG'
                    ? 'bg-rose-700 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Non-Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('SIGNATURE')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  dietaryFilter === 'SIGNATURE'
                    ? 'bg-[#E67E22] text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Signatures</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#E67E22] text-white'
                      : 'bg-white text-[#4A0E17] border border-[#D4AF37]/30 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="w-8 h-8 text-[#E67E22] mx-auto mb-2" />
                <p className="text-sm font-semibold">No dishes match your filter.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#D4AF37]/25 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  {/* Photo Thumbnail */}
                  <img
                    src={item.imagePlaceholder}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-100"
                    loading="lazy"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <h4 className="font-serif font-bold text-sm text-[#4A0E17] truncate">
                            {item.name}
                          </h4>
                        </div>
                        {item.punjabiName && (
                          <p className="font-serif text-[11px] text-[#D35400] pl-4">
                            {item.punjabiName}
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-xs text-[#E67E22] block">
                          {item.placeholderPrice}
                        </span>
                        <span className="text-[9px] text-gray-400 italic block">
                          *Placeholder
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 pl-4">
                      {item.description}
                    </p>

                    {item.isSignature && (
                      <span className="inline-block mt-2 ml-4 text-[10px] font-bold text-[#D4AF37] bg-[#4A0E17] px-2 py-0.5 rounded-full">
                        ★ Signature Bestseller
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between gap-3">
            <span className="text-xs text-gray-500">
              Kitchen open daily 5:00 AM – 12:30 AM
            </span>

            {onReserveClick && (
              <button
                onClick={() => {
                  onClose();
                  onReserveClick();
                }}
                className="px-5 py-2 rounded-full bg-[#E67E22] hover:bg-[#F39C12] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
