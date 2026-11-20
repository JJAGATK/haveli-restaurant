import React from 'react';
import { Phone, UtensilsCrossed, ShieldCheck, Compass, Star, ChevronRight } from 'lucide-react';
import { RESTAURANT_DATA } from '../../../data/restaurantData';
import type { OpeningHoursStatus } from '../../../types';

interface HeaderMobileDrawerProps {
  isOpen: boolean;
  activeSection: string;
  currentPage: 'home' | 'culture' | 'admin';
  status: OpeningHoursStatus;
  onNavigate: (targetId: string) => void;
  onClose: () => void;
}

export const HeaderMobileDrawer: React.FC<HeaderMobileDrawerProps> = ({
  isOpen,
  activeSection,
  currentPage,
  status,
  onNavigate,
  onClose,
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'hero', label: 'Home', icon: Compass },
    { id: 'story', label: 'Story', icon: Compass },
    { id: 'menu', label: 'The Haveli Menu', icon: UtensilsCrossed },
    { id: 'menu-showcase', label: 'Feasts Showcase', icon: UtensilsCrossed },
    { id: 'culture', label: 'Palatial Culture Hub', icon: Compass },
    { id: 'reviews', label: 'Visitor Reviews', icon: Star },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="lg:hidden mt-2 bg-[#200408]/98 backdrop-blur-2xl border border-[#D4AF37]/35 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Real-time Highway Status Banner */}
      <div className="flex items-center justify-between p-3 mb-3 bg-[#32060D] rounded-xl border border-[#D4AF37]/30 text-xs">
        <span className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
            }`}
          />
          <span className="font-bold text-white">{status.statusBadge}</span>
        </span>
        <span className="text-[#F8C471] font-mono text-[11px] font-semibold">
          {status.isOpen ? 'Closes 12:30 AM' : 'Opens 5:00 AM'}
        </span>
      </div>

      {/* Nav Link List */}
      <div className="space-y-1.5 mb-4">
        {navItems.map((item) => {
          const isActive =
            item.id === 'culture'
              ? currentPage === 'culture'
              : currentPage === 'home' && activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                isActive
                  ? 'bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white font-bold shadow-md'
                  : 'text-[#FFF9F0]/85 hover:bg-[#35070F] hover:text-[#F8C471]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon && (
                  <item.icon
                    className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#D4AF37]'}`}
                  />
                )}
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>
          );
        })}
      </div>

      {/* Action CTA Block */}
      <div className="space-y-2 pt-3 border-t border-[#D4AF37]/25">
        <button
          onClick={() => handleItemClick('menu')}
          className="w-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(230,126,34,0.5)] flex items-center justify-center gap-2 active:scale-[0.99] transition-all border border-[#F8C471]/50 cursor-pointer"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Explore The Palatial Menu</span>
        </button>

        <div className="flex gap-2 pt-1">
          <a
            href={`tel:${RESTAURANT_DATA.phoneClean}`}
            className="flex-1 bg-[#2C050B] text-[#FFF9F0] py-2.5 rounded-xl text-center text-xs font-semibold border border-[#D4AF37]/25 flex items-center justify-center gap-1.5 hover:bg-[#3D0811]"
          >
            <Phone className="w-3.5 h-3.5 text-[#E67E22]" />
            <span>Call {RESTAURANT_DATA.phone}</span>
          </a>

          <button
            onClick={() => handleItemClick('admin')}
            className="px-4 bg-[#2C050B] text-[#F8C471] py-2.5 rounded-xl text-center text-xs font-semibold border border-[#D4AF37]/25 flex items-center justify-center gap-1 hover:bg-[#3D0811]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff</span>
          </button>
        </div>
      </div>
    </div>
  );
};
