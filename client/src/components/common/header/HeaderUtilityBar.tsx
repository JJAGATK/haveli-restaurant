import React from 'react';
import { MapPin, Phone, ShieldCheck } from 'lucide-react';
import { RESTAURANT_DATA } from '../../../data/restaurantData';
import type { OpeningHoursStatus } from '../../../types';

interface HeaderUtilityBarProps {
  status: OpeningHoursStatus;
  currentPage: 'home' | 'admin';
  onAdminClick: () => void;
}

export const HeaderUtilityBar: React.FC<HeaderUtilityBarProps> = ({
  status,
  currentPage,
  onAdminClick,
}) => {
  return (
    <div className="bg-[#1A0205] text-[#FCF5DE] border-b border-[#D4AF37]/20 text-[11px] py-1.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Highway Coordinates & Real-Time Operational Schedule */}
        <div className="flex items-center space-x-5">
          <span className="flex items-center gap-1.5 text-[#F8C471]/90">
            <MapPin className="w-3.5 h-3.5 text-[#E67E22] shrink-0" />
            <span className="truncate">Grand Trunk Rd, Khajurla, Punjab 144411 (Jalandhar-Phagwara)</span>
          </span>
          <span className="text-[#D4AF37]/35">•</span>
          <span className="flex items-center gap-1.5">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            <span className="font-semibold text-white">{status.statusBadge}:</span>
            <span className="text-[#F8C471] font-medium">
              {status.isOpen ? 'Closes at 12:30 AM' : 'Opens at 5:00 AM'}
            </span>
          </span>
        </div>

        {/* Right: Emergency Traveler Call & Staff Operations Shortcut */}
        <div className="flex items-center space-x-4 shrink-0">
          <a
            href={`tel:${RESTAURANT_DATA.phoneClean}`}
            className="flex items-center gap-1.5 text-white hover:text-[#E67E22] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#E67E22]" />
            <span className="font-semibold">{RESTAURANT_DATA.phone}</span>
          </a>
          <span className="text-[#D4AF37]/35">•</span>
          <button
            onClick={onAdminClick}
            className={`flex items-center gap-1 text-[11px] transition-colors ${
              currentPage === 'admin'
                ? 'text-[#E67E22] font-bold'
                : 'text-[#F8C471]/80 hover:text-white'
            }`}
            title="Protected Staff Operations Portal"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Staff Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
