import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/restaurantData';
import type { GalleryPhoto } from '../../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for Lightbox (Esc, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;

      if (e.key === 'Escape') {
        setActivePhoto(null);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const navigateLightbox = (direction: number) => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + direction + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#1A1715] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30 text-[#D35400] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E17] tracking-tight">
            The Haveli Visual Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E67E22] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-[#1A1715]/75 font-light">
            Glimpses into our sandstone architecture, village courtyards, live tandoor kitchens, and the vibrant folk shows of Rangla Punjab.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['All', 'Architecture', 'Ambience', 'Food', 'Rangla Punjab'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#4A0E17] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-[#24050A] border border-[#D4AF37]/30 shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300"
            >
              <div className="h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#24050A]/95 via-[#35080E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-wider">
                    {photo.category}
                  </span>
                  <div className="p-1.5 rounded-full bg-[#E67E22] text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-white leading-snug">
                  {photo.title}
                </h3>
                {photo.punjabiTitle && (
                  <p className="font-serif text-xs text-[#F8C471] mb-1">
                    {photo.punjabiTitle}
                  </p>
                )}
                <p className="text-[11px] text-[#F3ECE2]/80 line-clamp-2">
                  {photo.caption}
                </p>
              </div>

              {/* Always Visible Category Chip */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-white/90">
                {photo.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-[#24050A] rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#35080E]/80 text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 focus:outline-none transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={() => navigateLightbox(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#35080E]/80 text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 focus:outline-none transition-colors hidden sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={() => navigateLightbox(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#35080E]/80 text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 focus:outline-none transition-colors hidden sm:block"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="h-[55vh] sm:h-[65vh] w-full bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="p-6 bg-[#35080E] text-white border-t border-[#D4AF37]/30">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-serif text-xl font-bold text-white">
                  {activePhoto.title}
                </h3>
                <span className="text-xs font-semibold text-[#E67E22] uppercase tracking-wider">
                  {activePhoto.category}
                </span>
              </div>
              {activePhoto.punjabiTitle && (
                <p className="font-serif text-sm text-[#F8C471] mb-1">
                  {activePhoto.punjabiTitle}
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#F3ECE2]/80 leading-relaxed font-light">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
