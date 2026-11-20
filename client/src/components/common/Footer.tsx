import React from 'react';
import { MapPin, Phone, Clock, Compass, ExternalLink, ShieldCheck, Heart, Car, Zap, Coffee, Utensils } from 'lucide-react';
import { RESTAURANT_DATA } from '../../data/restaurantData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0F0205] text-[#FFF9F0] relative overflow-hidden border-t border-[#D4AF37]/30">
      {/* Delicate Golden Shimmer Horizon Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-left">
          {/* Column 1: Brand & Heritage */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1C040A] border border-[#D4AF37]/60 flex items-center justify-center p-1.5 shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]" fill="currentColor">
                  <path d="M50 5 C35 5 20 20 20 40 L20 85 L80 85 L80 40 C80 20 65 5 50 5 Z M50 15 C60 15 70 25 70 40 L70 75 L30 75 L30 40 C30 25 40 15 50 15 Z" />
                  <circle cx="50" cy="38" r="6" fill="#E67E22" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl font-black tracking-wider text-[#FFF9F0]">HAVELI</span>
                <span className="block text-xs text-[#F8C471] font-serif">{RESTAURANT_DATA.punjabiName} · Jalandhar-Phagwara Highway</span>
              </div>
            </div>

            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed mb-6 font-light">
              Palatial Punjabi dining and culture hub on the Grand Trunk Road, heralded by our entrance vintage car and cascading crystal chandeliers.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#F8C471] bg-[#1C040A] p-2.5 rounded-xl border border-[#D4AF37]/35 w-fit shadow-md">
              <span className="font-bold text-white text-sm">4.4 ★</span>
              <span className="font-light text-[#F8C471]/80">Based on {RESTAURANT_DATA.reviewCountFormatted}</span>
            </div>
          </div>

          {/* Column 2: Hours & Traveler Comforts */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F8C471] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E67E22]" />
              <span>Operating Hours</span>
            </h3>

            <div className="space-y-2 text-sm text-[#FAF7F2]/90 mb-6">
              <div className="flex justify-between py-1 border-b border-[#D4AF37]/20">
                <span className="font-medium text-[#FFF9F0]">Every Day:</span>
                <span className="text-[#F8C471] font-bold">5:00 AM – 12:30 AM</span>
              </div>
              <p className="text-xs text-[#F8C471]/70 pt-1 font-light">
                Breakfast, all-day tandoor parathas, lunch thalis, evening snacks, and late-night highway dining.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#FAF7F2]/75 font-light">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#E67E22]" />
                <span>Expansive Free Parking for Buses & Cars</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#E67E22]" />
                <span>24/7 EV Fast Charging Station On-Site</span>
              </div>
            </div>
          </div>

          {/* Column 3: Location & Coordinates */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F8C471] mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#E67E22]" />
              <span>Highway Location</span>
            </h3>

            <div className="space-y-3 text-sm text-[#FAF7F2]/90">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E67E22] shrink-0 mt-1" />
                <span className="font-light">{RESTAURANT_DATA.address}</span>
              </p>

              <div className="text-xs text-[#F8C471] bg-[#2C050B] p-2 rounded-xl border border-[#D4AF37]/35 font-mono shadow-sm">
                GPS: {RESTAURANT_DATA.coordinates.lat}, {RESTAURANT_DATA.coordinates.lng}
              </div>

              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E67E22] shrink-0" />
                <a href={`tel:${RESTAURANT_DATA.phoneClean}`} className="hover:text-[#F8C471] font-bold text-[#FFF9F0] transition-colors">
                  {RESTAURANT_DATA.phone}
                </a>
              </p>

              <a
                href={RESTAURANT_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E67E22] hover:text-[#F8C471] font-bold mt-1 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Highway Amenities & Quick Links */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F8C471] mb-4">
              Highway Amenities
            </h3>

            <div className="space-y-3 text-xs text-[#FAF7F2]/85 mb-6">
              <div className="p-3 bg-[#1A0A0E] rounded-2xl border border-[#D4AF37]/25 shadow-sm">
                <div className="font-bold text-[#FFF9F0] text-sm flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-[#E67E22]" />
                  <span>Pure Desi Ghee Kitchen</span>
                </div>
                <p className="mt-1 text-[#F8C471]/70 text-[11px] leading-relaxed font-light">
                  Live tandoor breads, clay oven kulchas, slow-simmered handis & churned sweet lassi.
                </p>
              </div>

              <div className="p-3 bg-[#1A0A0E] rounded-2xl border border-[#D4AF37]/25 shadow-sm">
                <div className="font-bold text-[#FFF9F0] text-sm flex items-center gap-2">
                  <Coffee className="w-3.5 h-3.5 text-[#E67E22]" />
                  <span>Express Takeaway Counter</span>
                </div>
                <p className="mt-1 text-[#F8C471]/70 text-[11px] leading-relaxed font-light">
                  Quick highway halt for piping hot masala chai, parathas, and snacks on the go.
                </p>
              </div>
            </div>

            {/* Admin Portal Shortcut */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex gap-3 text-xs text-[#F8C471]/60 font-light">
                <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition-colors">Facebook</span>
              </div>

              <button
                onClick={() => onNavigate('admin')}
                className="text-xs text-[#F8C471] hover:text-white flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity font-semibold"
              >
                <ShieldCheck className="w-3 h-3 text-[#E67E22]" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer per requirement */}
        <div className="mt-12 pt-6 border-t border-[#D4AF37]/20 text-center">
          <p className="text-xs text-[#FAF7F2]/60 max-w-3xl mx-auto italic mb-3 font-light">
            {RESTAURANT_DATA.disclaimerText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/50 gap-2 font-light">
            <p>© {new Date().getFullYear()} Haveli (Khajurla, Punjab). All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Crafted for Grand Trunk Road highway travelers</span>
              <Heart className="w-3 h-3 text-[#E67E22] fill-current" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
