import React, { useEffect } from 'react';
import { ArrowLeft, Car, ShieldCheck, Zap, Clock, MapPin, UtensilsCrossed } from 'lucide-react';
import { IMAGES, RESTAURANT_DATA } from '../../data/restaurantData';

interface CultureHubPageProps {
  onBackToHome: () => void;
  onExploreMenuClick?: () => void;
}

export const CultureHubPage: React.FC<CultureHubPageProps> = ({
  onBackToHome,
  onExploreMenuClick,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#130307] text-[#FFF9F0] relative overflow-hidden pt-28 pb-24">
      {/* Saffron & Amber Royal Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.15)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Return Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20050D] hover:bg-[#340815] text-[#F8C471] hover:text-white text-xs font-bold border border-[#D4AF37]/40 transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dining Experience</span>
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="text-left max-w-4xl space-y-4 mb-16 sm:mb-24">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F8C471] block">
            Cultural Sanctum &nbsp;·&nbsp; Grand Trunk Road
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-[#FFF9F0] tracking-tight leading-[1.05] drop-shadow-lg">
            Palatial Punjabi Culture Hub
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F2]/90 font-light leading-relaxed max-w-2xl">
            An iconic roadside sanctuary on the Jalandhar-Phagwara corridor celebrating authentic village architecture, soaring royal durbars, and timeless highway hospitality.
          </p>
        </div>

        {/* Feature 1: The Iconic Classic Car Portico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-5 text-left">
            <span className="text-[11px] font-bold text-[#F8C471] uppercase tracking-[0.2em] block">
              Architectural Landmark
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FFF9F0] tracking-tight">
              The Classic Car at the Grand Entrance
            </h2>
            <p className="text-sm text-[#FAF7F2]/90 font-light leading-relaxed">
              Before crossing the carved sandstone threshold, road travelers and multigenerational families are greeted by our signature vintage automobile stationed permanently outside the grand archway. Over decades of highway journeys along the Grand Trunk Road, it has become an iconic photo landmark for millions of travelers.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#20050D] border border-[#D4AF37]/35 text-xs text-[#F8C471] shadow-md">
                <Car className="w-4 h-4 text-[#E67E22]" />
                <span className="font-medium">Permanent Landmark Portico · Grand Trunk Road</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl aspect-[16/11] bg-[#20050D] group">
              <img
                src={IMAGES.classicCar}
                alt="Classic Vintage Car Parked at Haveli Entrance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130307]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-serif font-bold text-[#F8C471]">
                Classic Car Landmark Portico
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Grand Chandeliers & Royal Durbar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl aspect-[16/11] bg-[#20050D] group">
              <img
                src={IMAGES.palatialChandeliers}
                alt="Grand Chandeliers and Soaring Ceilings at Haveli"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130307]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-serif font-bold text-[#F8C471]">
                Cascading Crystal & Brass Chandeliers
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="text-[11px] font-bold text-[#F8C471] uppercase tracking-[0.2em] block">
              Palatial Dining Hall
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FFF9F0] tracking-tight">
              Dine Beneath Cascading Chandeliers
            </h2>
            <p className="text-sm text-[#FAF7F2]/90 font-light leading-relaxed">
              Step inside to soaring ceilings illuminated by magnificent crystal and warm brass luminaires. Intricately carved sandstone jharokhas, antique brass cauldrons, and traditional baithaks evoke the royal court banquets of historic Punjab while you feast on fresh tandoor breads and slow-simmered handi curries.
            </p>
            {onExploreMenuClick && (
              <div className="pt-2">
                <button
                  onClick={onExploreMenuClick}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] text-white text-xs font-bold shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer border border-[#F8C471]/40"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Explore The Palatial Menu</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feature 3: Highway Comforts & Amenities Strip */}
        <div className="royal-glass rounded-3xl p-8 sm:p-12 mb-20 text-left border border-[#D4AF37]/35">
          <span className="text-[11px] font-bold text-[#F8C471] uppercase tracking-[0.25em] block mb-2">
            Highway Traveler Comforts
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF9F0] mb-8">
            Complete Highway Services & Facilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-[#1C040A] border border-[#D4AF37]/30 space-y-2 shadow-md">
              <Clock className="w-5 h-5 text-[#E67E22]" />
              <h3 className="font-serif text-sm font-bold text-[#FFF9F0]">19.5h Continuous Dining</h3>
              <p className="text-xs text-[#FAF7F2]/75 font-light">
                Open daily from 5:00 AM to 12:30 AM for breakfast, lunch, tea, and late-night highway dining.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C040A] border border-[#D4AF37]/30 space-y-2 shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#E67E22]" />
              <h3 className="font-serif text-sm font-bold text-[#FFF9F0]">300+ Free Secured Parking</h3>
              <p className="text-xs text-[#FAF7F2]/75 font-light">
                Expansive guarded lot accommodating private family sedans, SUVs, and highway tour buses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C040A] border border-[#D4AF37]/30 space-y-2 shadow-md">
              <Zap className="w-5 h-5 text-[#E67E22]" />
              <h3 className="font-serif text-sm font-bold text-[#FFF9F0]">24/7 EV Fast Charging</h3>
              <p className="text-xs text-[#FAF7F2]/75 font-light">
                High-speed charging bays on-site for electric road trips along the Grand Trunk Road.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C040A] border border-[#D4AF37]/30 space-y-2 shadow-md">
              <MapPin className="w-5 h-5 text-[#E67E22]" />
              <h3 className="font-serif text-sm font-bold text-[#FFF9F0]">GT Road Location</h3>
              <p className="text-xs text-[#FAF7F2]/75 font-light">
                Convenient highway pit-stop at Khajurla, between Jalandhar and Phagwara, Punjab.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/20">
          <button
            onClick={onBackToHome}
            className="text-xs font-bold text-[#F8C471] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dining Experience</span>
          </button>

          <a
            href={RESTAURANT_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#E67E22] hover:text-[#F8C471] transition-colors"
          >
            Get Highway Directions on Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
};
