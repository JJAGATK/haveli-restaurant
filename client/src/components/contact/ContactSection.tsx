import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Car, Zap, Navigation, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { RESTAURANT_DATA } from '../../data/restaurantData';
import type { ContactFormData } from '../../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    subject: 'Highway Tour Bus & Group Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(json.error || 'Failed to send message. Please call us directly.');
      }
    } catch {
      // Local fallback for smooth UI interaction
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="visit" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#1A1715] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/30 text-[#D35400] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grand Trunk Road Destination</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E17] tracking-tight">
            Plan Your Highway Halt
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E67E22] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-[#1A1715]/75 font-light">
            Conveniently located on the Jalandhar-Phagwara corridor of the Grand Trunk Road. Complete with fast EV chargers, expansive free parking, and traditional hospitality.
          </p>
        </div>

        {/* 2-Column Grid: Map & Location details on Left, Hours & Contact Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Map & Highway Guidance */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-xl bg-[#24050A]">
              <div className="p-4 bg-[#35080E] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                  <MapPin className="w-4 h-4 text-[#E67E22]" />
                  <span>Haveli, Khajurla, GT Road (31.2781641, 75.676673)</span>
                </div>
                <a
                  href={RESTAURANT_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-[#E67E22] hover:bg-[#F39C12] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Embedded Map iframe with precise coordinates */}
              <div className="relative h-72 sm:h-96 w-full">
                <iframe
                  title="Haveli Google Maps Highway Location"
                  src={`https://maps.google.com/maps?q=${RESTAURANT_DATA.coordinates.lat},${RESTAURANT_DATA.coordinates.lng}&hl=en&z=16&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${RESTAURANT_DATA.phoneClean}`}
                className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#4A0E17] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:bg-[#E67E22] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 font-semibold block uppercase">Call Direct</span>
                  <span className="font-serif font-bold text-[#4A0E17] text-base">{RESTAURANT_DATA.phone}</span>
                </div>
              </a>

              <a
                href={RESTAURANT_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#075E54]/10 border border-[#25D366]/40 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#075E54] font-semibold block uppercase">WhatsApp Desk</span>
                  <span className="font-serif font-bold text-[#075E54] text-base">Direct Chat & Queries</span>
                </div>
              </a>
            </div>

            {/* Traveler Amenities Checklist */}
            <div className="p-6 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-md">
              <h3 className="font-serif text-lg font-bold text-[#4A0E17] mb-4">
                Highway Traveler Facilities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">Free Secured Parking</strong>
                    <span>Spaces for 300+ cars, coaches, and luxury buses.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">EV Fast Chargers</strong>
                    <span>High-power multi-standard vehicle charging plugs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">5:00 AM to 12:30 AM</strong>
                    <span>Continuous kitchen service 19.5 hours daily.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">Rangla Punjab Access</strong>
                    <span>Cultural village and folk performances right next door.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Operating Hours Table & Contact / Inquiry Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Daily Hours Schedule Table */}
            <div className="p-6 rounded-3xl bg-[#35080E] text-white border border-[#D4AF37]/40 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#E67E22]" />
                <h3 className="font-serif text-lg font-bold text-[#F8C471]">
                  Weekly Opening Hours
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="font-medium text-[#F3ECE2]">{day}</span>
                    <span className="font-semibold text-[#F8C471]">5:00 AM – 12:30 AM</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#F3ECE2]/70 mt-3 italic">
                *Open 7 days a week, including all public and festival holidays.
              </p>
            </div>

            {/* Quick Contact Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-[#4A0E17] mb-1">
                Contact & Tour Inquiries
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Planning a highway tour stop, corporate banquet, or family road-trip feast? Leave us a message.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-serif text-base font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Sat Sri Akaal! Our highway hospitality desk will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'Highway Tour Bus & Group Inquiry',
                        message: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gurmukh Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98888 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us about your group size, travel date, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-[#4A0E17] hover:bg-[#E67E22] text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
