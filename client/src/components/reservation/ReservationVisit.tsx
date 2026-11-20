import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle2, AlertCircle, MapPin, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RESTAURANT_DATA } from '../../data/restaurantData';
import type { ReservationFormData, ReservationResponse } from '../../types';

gsap.registerPlugin(ScrollTrigger);

export const ReservationVisit: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    reservationDate: defaultDate,
    reservationTime: '13:00',
    guestCount: 4,
    occasion: 'Family Highway Halt',
    specialNotes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<ReservationResponse | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeSlots = [
    '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (!formData.customerName.trim() || formData.customerName.length < 2) {
      setErrorMessage('Please enter a valid customer name.');
      setIsLoading(false);
      return;
    }

    const cleanPhone = formData.customerPhone.replace(/[\s\-]/g, '');
    if (!/^(?:\+91)?[6789]\d{9}$/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number (+91 optional).');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          guestCount: Number(formData.guestCount),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setConfirmationData(result.data);
        triggerConfetti();
      } else {
        const msg = result.details
          ? result.details.map((d: { message: string }) => d.message).join('. ')
          : result.error || 'Failed to submit reservation. Please try again.';
        setErrorMessage(msg);
      }
    } catch {
      setErrorMessage('Network error communicating with Haveli reservation desk. Please call us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E67E22', '#D4AF37', '#F8C471', '#D35400'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section
      ref={sectionRef}
      id="reservation-visit"
      className="py-24 sm:py-32 bg-[#130307] text-[#FFF9F0] relative overflow-hidden"
    >
      {/* Saffron & Amber Royal Ambient Lights */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.12)_0%,transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F8C471] block mb-2">
            Table Reservations
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF9F0] tracking-tight drop-shadow-md">
            Dine Under The Chandeliers
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#FAF7F2]/85 font-light max-w-xl">
            Reserve your table beneath our grand chandeliers. Welcoming road-trippers and families daily on the Grand Trunk Road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Reservation Form (Royal Glass Card) */}
          <div className="lg:col-span-6">
            {confirmationData ? (
              <div className="royal-glass-card p-8 sm:p-10 rounded-3xl text-center animate-in zoom-in-95 duration-300 border border-[#D4AF37]/40 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-[0.2em] block mb-1">
                  Sat Sri Akaal! Booking Confirmed
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#FFF9F0] mb-2">
                  We Await You, {confirmationData.customerName}
                </h3>

                <p className="text-xs text-[#F8C471] mb-2">
                  Your table beneath the grand chandeliers is reserved at our Palatial Culture Hub.
                </p>

                <div className="inline-block px-4 py-2 my-4 rounded-xl bg-[#32060D] border border-[#D4AF37]/50 text-[#F8C471] font-mono text-sm sm:text-base font-bold shadow-md">
                  Booking ID: {confirmationData.bookingReference}
                </div>

                <div className="grid grid-cols-2 gap-3 my-4 text-xs text-left">
                  <div className="p-3 bg-[#24050A] rounded-xl border border-[#D4AF37]/25">
                    <span className="text-[#F8C471]/70 block text-[10px]">Date</span>
                    <span className="font-bold text-[#FFF9F0]">{confirmationData.reservationDate}</span>
                  </div>
                  <div className="p-3 bg-[#24050A] rounded-xl border border-[#D4AF37]/25">
                    <span className="text-[#F8C471]/70 block text-[10px]">Time</span>
                    <span className="font-bold text-[#FFF9F0]">{confirmationData.reservationTime}</span>
                  </div>
                  <div className="p-3 bg-[#24050A] rounded-xl border border-[#D4AF37]/25">
                    <span className="text-[#F8C471]/70 block text-[10px]">Party Size</span>
                    <span className="font-bold text-[#FFF9F0]">{confirmationData.guestCount} Guests</span>
                  </div>
                  <div className="p-3 bg-[#24050A] rounded-xl border border-[#D4AF37]/25">
                    <span className="text-[#F8C471]/70 block text-[10px]">Contact</span>
                    <span className="font-bold text-[#FFF9F0]">{confirmationData.customerPhone}</span>
                  </div>
                </div>

                <p className="text-xs text-[#FAF7F2]/80 mb-6 font-light">
                  Present this reference upon arrival at our Grand Trunk Road reception desk beneath the chandeliers.
                </p>

                <button
                  onClick={() => setConfirmationData(null)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(230,126,34,0.4)] hover:-translate-y-0.5 active:scale-[0.98] border border-[#F8C471]/40 cursor-pointer"
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="royal-glass-card p-7 sm:p-9 rounded-3xl space-y-5 border border-[#D4AF37]/35 shadow-2xl"
              >
                <div className="border-b border-[#D4AF37]/20 pb-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF9F0] tracking-tight">
                    Palatial Durbar Reservation
                  </h3>
                  <p className="text-xs text-[#F8C471]/80 font-light mt-1">
                    Reserve tables under the chandeliers (5:00 AM – 12:30 AM daily)
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#F8C471] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#E67E22]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sardar Harpreet Singh"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24050A] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#F8C471] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#E67E22]" />
                      <span>Phone (+91 10-digit) *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98888 12345"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24050A] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#F8C471] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E67E22]" />
                      <span>Date *</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.reservationDate}
                      onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24050A] border border-[#D4AF37]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#F8C471] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E67E22]" />
                      <span>Time (5:00 AM – 12:30 AM) *</span>
                    </label>
                    <select
                      value={formData.reservationTime}
                      onChange={(e) => setFormData({ ...formData, reservationTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24050A] border border-[#D4AF37]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#24050A] text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#F8C471] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#E67E22]" />
                      <span>Guests (Max 30) *</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      required
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value, 10) || 1 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24050A] border border-[#D4AF37]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#F8C471] uppercase tracking-wider mb-1.5">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24050A] border border-[#D4AF37]/30 text-white text-xs sm:text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                    >
                      <option value="Family Highway Halt" className="bg-[#24050A]">Family Highway Halt</option>
                      <option value="Road Trip Rest & Dine" className="bg-[#24050A]">Road Trip Rest & Dine</option>
                      <option value="Birthday / Anniversary" className="bg-[#24050A]">Birthday / Anniversary</option>
                      <option value="Tour Group Halt" className="bg-[#24050A]">Tour Group Halt</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#F8C471] uppercase tracking-wider mb-1.5">
                    Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Baby high chairs, EV charging parking space, quiet corner..."
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24050A] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] hover:from-[#F39C12] hover:to-[#E67E22] text-white font-bold text-sm shadow-[0_6px_25px_rgba(230,126,34,0.5)] hover:shadow-[0_8px_32px_rgba(230,126,34,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 border border-[#F8C471]/50 disabled:opacity-50"
                >
                  {isLoading ? <span>Confirming Table...</span> : <span>Confirm Table Reservation</span>}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Embedded Map & Highway Visit Guide (Royal Glass) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Embedded Google Map */}
            <div className="royal-glass-card rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/35">
              <div className="p-4 bg-[#2C050B] text-white flex items-center justify-between border-b border-[#D4AF37]/25">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-[#E67E22]" />
                  <span className="text-[#FFF9F0]">GT Road, Khajurla (31.2781641, 75.676673)</span>
                </div>

                <a
                  href={RESTAURANT_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E67E22] to-[#D35400] hover:from-[#F39C12] hover:to-[#E67E22] text-white text-xs font-bold transition-all shadow-md hover:-translate-y-0.5 active:scale-[0.98] flex items-center gap-1.5 border border-[#F8C471]/40"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>

              <div className="relative h-64 sm:h-72 w-full">
                <iframe
                  title="Haveli Google Maps Location"
                  src={`https://maps.google.com/maps?q=${RESTAURANT_DATA.coordinates.lat},${RESTAURANT_DATA.coordinates.lng}&hl=en&z=16&output=embed`}
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Quick Contact & Emergency Calls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${RESTAURANT_DATA.phoneClean}`}
                className="p-4 rounded-2xl royal-glass-card hover:border-[#E67E22]/60 transition-all duration-300 flex items-center gap-3.5 group hover:-translate-y-0.5 shadow-lg border border-[#D4AF37]/30"
              >
                <div className="w-11 h-11 rounded-xl bg-[#35070F] border border-[#D4AF37]/40 text-[#F8C471] flex items-center justify-center shrink-0 group-hover:bg-[#E67E22] group-hover:text-white transition-colors shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#F8C471]/70 font-bold block uppercase tracking-wider">Call Direct</span>
                  <span className="font-serif font-black text-[#FFF9F0] text-sm">{RESTAURANT_DATA.phone}</span>
                </div>
              </a>

              <a
                href={RESTAURANT_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl royal-glass-card hover:border-[#25D366]/60 transition-all duration-300 flex items-center gap-3.5 group hover:-translate-y-0.5 shadow-lg border border-[#D4AF37]/30"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center shrink-0 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">WhatsApp Desk</span>
                  <span className="font-serif font-black text-[#FFF9F0] text-sm">Instant Route Help</span>
                </div>
              </a>
            </div>

            {/* Hours Schedule */}
            <div className="p-5 rounded-2xl royal-glass-card text-xs border border-[#D4AF37]/30 shadow-lg">
              <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-[#D4AF37]/20">
                <span className="font-bold text-[#F8C471]">Operating Hours:</span>
                <span className="text-white font-bold">Every Day, 5:00 AM – 12:30 AM</span>
              </div>
              <p className="text-[11px] text-[#FAF7F2]/75 font-light">
                Continuous service on the Grand Trunk Road. Ample secured parking for buses and cars + 24/7 EV fast charging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
