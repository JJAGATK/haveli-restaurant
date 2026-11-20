import React from 'react';
import { RESTAURANT_DATA } from '../../../data/restaurantData';
import type { OpeningHoursStatus } from '../../../types';

interface HeaderBrandProps {
  onHomeClick: () => void;
  status?: OpeningHoursStatus;
}

export const HeaderBrand: React.FC<HeaderBrandProps> = ({ onHomeClick, status }) => {
  return (
    <button
      onClick={onHomeClick}
      className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shrink-0 cursor-pointer"
      aria-label="Haveli Restaurant Home"
    >
      {/* Royal Sandstone & Brass Jharokha Emblem */}
      <div className="w-10 h-10 rounded-xl bg-[#32060D] border border-[#D4AF37]/70 flex items-center justify-center p-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-hover:border-[#E67E22] group-hover:scale-105 transition-all duration-300">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-[#D4AF37] group-hover:text-[#F8C471] transition-colors"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M50 5 C35 5 20 20 20 40 L20 85 L80 85 L80 40 C80 20 65 5 50 5 Z M50 15 C60 15 70 25 70 40 L70 75 L30 75 L30 40 C30 25 40 15 50 15 Z" />
          <circle cx="50" cy="38" r="6" fill="#E67E22" />
          <path d="M40 75 Q50 62 60 75" fill="none" stroke="#D4AF37" strokeWidth="3" />
        </svg>
      </div>

      {/* Royal Typography with Gurmukhi script & Live Highway Dot */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-lg sm:text-xl font-black tracking-wider text-[#FFF9F0] drop-shadow-sm group-hover:text-[#F8C471] transition-colors">
            HAVELI
          </span>
          <span className="font-serif text-xs sm:text-sm text-[#F8C471] font-bold opacity-95 group-hover:opacity-100 transition-opacity">
            {RESTAURANT_DATA.punjabiName}
          </span>
        </div>
        <div className="flex items-center gap-1.5 xl:gap-2 text-[10px] text-[#F8C471]/80 tracking-wider font-medium">
          <span className="uppercase hidden md:inline">GT Road · Jalandhar-Phagwara</span>
          <span className="uppercase md:hidden">GT Road</span>
          {status && (
            <>
              <span className="text-[#D4AF37]/40">•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden xl:inline">Open 5 AM – 12:30 AM</span>
                <span className="xl:hidden">Open</span>
              </span>
            </>
          )}
        </div>
      </div>
    </button>
  );
};
