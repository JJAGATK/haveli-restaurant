import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, UtensilsCrossed } from 'lucide-react';
import { useOpeningHours } from '../../hooks/useOpeningHours';
import { HeaderBrand } from './header/HeaderBrand';
import { HeaderNav } from './header/HeaderNav';
import { HeaderActions } from './header/HeaderActions';
import { HeaderMobileDrawer } from './header/HeaderMobileDrawer';

interface HeaderProps {
  onNavigate: (target: string) => void;
  activeSection: string;
  currentPage: 'home' | 'culture' | 'admin';
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
  currentPage,
  onOpenMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const status = useOpeningHours();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 sm:top-3 inset-x-0 z-50 flex flex-col items-center px-0 sm:px-4 xl:px-6 pointer-events-none transition-all duration-300">
      {/* Delicious & Royal Floating Glass Navigation Capsule */}
      <div
        className={`pointer-events-auto w-full max-w-7xl mx-auto px-3 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 rounded-none sm:rounded-2xl lg:rounded-full ${
          isScrolled
            ? 'bg-gradient-to-r from-[#24060E]/95 via-[#180308]/98 to-[#24060E]/95 backdrop-blur-2xl border-b sm:border border-[#D4AF37]/45 shadow-[0_16px_45px_rgba(10,2,4,0.92),inset_0_1px_0_rgba(248,196,113,0.35)]'
            : 'bg-gradient-to-r from-[#24060E]/88 via-[#180308]/90 to-[#24060E]/88 backdrop-blur-xl border-b sm:border border-[#D4AF37]/35 shadow-[0_10px_36px_rgba(10,2,4,0.8),inset_0_1px_0_rgba(248,196,113,0.25)]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 xl:gap-4">
          {/* Brand Identity with Authentic Gurmukhi & Live Status */}
          <HeaderBrand
            onHomeClick={() => onNavigate('hero')}
            status={status}
          />

          {/* Desktop Single-Line Editorial Nav Links */}
          <HeaderNav
            activeSection={activeSection}
            currentPage={currentPage}
            onNavigate={onNavigate}
          />

          {/* Desktop Sovereign Explore Menu CTA */}
          <HeaderActions
            onOpenMenu={onOpenMenu || (() => onNavigate('menu'))}
          />

          {/* Mobile Fast Action Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onNavigate('menu')}
              className="bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] text-white p-2 sm:px-3 sm:py-2 rounded-full shadow-[0_2px_14px_rgba(230,126,34,0.5)] active:scale-95 transition-transform border border-[#F8C471]/40 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              aria-label="View Menu"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Menu</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#32060D] text-[#F8C471] border border-[#D4AF37]/35 hover:text-white focus:outline-none active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle Navigation Drawer"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <HeaderMobileDrawer
          isOpen={mobileMenuOpen}
          activeSection={activeSection}
          currentPage={currentPage}
          status={status}
          onNavigate={onNavigate}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};
