import React, { useState } from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';
import { REVIEW_HIGHLIGHTS, RESTAURANT_DATA } from '../../data/restaurantData';

export const ReviewHighlights: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredReviews = selectedFilter === 'All'
    ? REVIEW_HIGHLIGHTS
    : REVIEW_HIGHLIGHTS.filter((r) => r.travelerType === selectedFilter);

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#1A1715] relative overflow-hidden border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Overall Google Rating Display */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30 text-[#D35400] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Voice of the Travelers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E17] tracking-tight">
              Trusted by 70,000+ Highway Explorers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#1A1715]/70 max-w-xl font-light">
              Generations of road-trippers have stopped at Haveli on the Grand Trunk Road. Here is what they love most.
            </p>
          </div>

          {/* Big Rating Summary Badge */}
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-white border border-[#D4AF37]/40 shadow-md">
            <div className="text-center px-2">
              <span className="font-serif text-4xl sm:text-5xl font-black text-[#E67E22] block leading-none">
                {RESTAURANT_DATA.googleRating}
              </span>
              <div className="flex items-center justify-center gap-0.5 text-[#E67E22] mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-xs">
              <span className="font-bold text-[#4A0E17] block">Google Verified Reviews</span>
              <span className="text-gray-500 block">{RESTAURANT_DATA.reviewCountFormatted}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Top GT Road Highway Halt</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {['All', 'Family', 'Highway Traveler', 'Road Tripper', 'Tour Group'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-[#4A0E17] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]/20 absolute top-6 right-6" />

              <div>
                {/* Rating Stars & Traveler Type */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-[#E67E22]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#4A0E17] border border-[#D4AF37]/30">
                    {rev.travelerType}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-[#1A1715]/85 leading-relaxed mb-6 font-light italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#4A0E17] block text-sm">
                    {rev.author}
                  </span>
                  <span className="text-gray-500 text-[11px]">
                    {rev.city} · {rev.date}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase">Favorite Pick</span>
                  <span className="text-[11px] font-semibold text-[#E67E22]">
                    {rev.favoriteDish}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
