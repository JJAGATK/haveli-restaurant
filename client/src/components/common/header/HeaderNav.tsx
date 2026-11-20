import React from 'react';

export interface NavItem {
  id: string;
  label: string;
}

interface HeaderNavProps {
  activeSection: string;
  currentPage: 'home' | 'culture' | 'admin';
  onNavigate: (targetId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  currentPage,
  onNavigate,
}) => {
  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home' },
    { id: 'story', label: 'Story' },
    { id: 'menu', label: 'Menu' },
    { id: 'menu-showcase', label: 'Feasts' },
    { id: 'culture', label: 'Culture Hub' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 px-1" aria-label="Primary Navigation">
      {navItems.map((item) => {
        const isActive =
          item.id === 'culture'
            ? currentPage === 'culture'
            : currentPage === 'home' && activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative px-2.5 xl:px-3.5 py-1 text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center justify-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-full cursor-pointer ${
              isActive
                ? 'text-[#F8C471] font-bold'
                : 'text-[#FAF7F2]/80 hover:text-white hover:-translate-y-0.5'
            }`}
          >
            <span>{item.label}</span>

            {/* Glowing Golden Active Pip */}
            {isActive && (
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E67E22] rounded-full shadow-[0_0_8px_rgba(230,126,34,0.9)]"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
