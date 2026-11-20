import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface HeaderActionsProps {
  onOpenMenu: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  onOpenMenu,
}) => {
  return (
    <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
      {/* Explore Menu CTA Button (Sizzling Saffron Glow) */}
      <button
        onClick={onOpenMenu}
        className="px-4 xl:px-5 py-1.5 xl:py-2 rounded-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] hover:from-[#F39C12] hover:to-[#E67E22] text-white font-bold text-xs xl:text-sm shadow-[0_4px_20px_rgba(230,126,34,0.5)] hover:shadow-[0_6px_26px_rgba(230,126,34,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center gap-1.5 xl:gap-2 border border-[#F8C471]/50 whitespace-nowrap cursor-pointer"
        aria-label="View Palatial Menu"
      >
        <UtensilsCrossed className="w-3.5 h-3.5 text-white" />
        <span>Explore Menu</span>
      </button>
    </div>
  );
};
