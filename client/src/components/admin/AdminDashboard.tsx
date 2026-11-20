import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Utensils, X, RefreshCw, Key } from 'lucide-react';
import { MASTER_MENU_ITEMS } from '../../data/restaurantData';
import type { ReservationResponse, MenuItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [apiKey, setApiKey] = useState('haveli-highway-admin-key-2026');
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu'>('reservations');

  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MASTER_MENU_ITEMS);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setStatusFeedback(null);
    try {
      const res = await fetch('/api/admin/reservations', {
        headers: { 'x-admin-key': apiKey },
      });

      if (res.ok) {
        const json = await res.json();
        setReservations(json.data || []);
      } else {
        setStatusFeedback('Invalid Admin API key. Please check credentials.');
      }
    } catch {
      // Local fallback mode for testing
      setReservations([
        {
          id: 1,
          bookingReference: 'HAV-202611-1001',
          customerName: 'Sardar Manpreet Singh',
          customerPhone: '+91 98765 43210',
          customerEmail: 'manpreet@example.com',
          reservationDate: '2026-11-20',
          reservationTime: '13:00',
          guestCount: 8,
          occasion: 'Family Highway Halt',
          specialNotes: 'Require corner traditional seating with high chairs for kids.',
          status: 'CONFIRMED',
          confirmationSent: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          bookingReference: 'HAV-202611-1002',
          customerName: 'Ananya Sharma',
          customerPhone: '+91 98112 34567',
          customerEmail: 'ananya@example.com',
          reservationDate: '2026-11-20',
          reservationTime: '20:30',
          guestCount: 4,
          occasion: 'Road Trip Dinner',
          specialNotes: 'Will require EV charging bay access upon arrival.',
          status: 'CONFIRMED',
          confirmationSent: true,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/admin/reservations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': apiKey,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      // Update local state
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      setStatusFeedback(`Reservation status changed to ${newStatus}`);
    } catch {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }
  };

  const handleToggleMenuAvailability = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
    setStatusFeedback('Menu availability toggled.');
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <section id="admin" className="py-20 bg-[#24050A] text-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#D4AF37]/30 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0E17] text-[#D4AF37] text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Haveli Staff & Operations Portal</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Highway Operations Dashboard
            </h2>
          </div>

          {/* API Key Lock Bar */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Key className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Admin Key"
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#35080E] border border-[#D4AF37]/30 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E67E22]"
              />
            </div>
            <button
              onClick={fetchAdminData}
              className="p-2 rounded-lg bg-[#E67E22] hover:bg-[#F39C12] text-white text-xs font-semibold transition-colors"
              title="Refresh / Authenticate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusFeedback && (
          <div className="my-4 p-3 rounded-xl bg-[#4A0E17] border border-[#D4AF37]/40 text-xs text-[#F8C471] flex items-center justify-between">
            <span>{statusFeedback}</span>
            <button onClick={() => setStatusFeedback(null)} className="text-gray-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center gap-2 my-6">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'reservations'
                ? 'bg-[#E67E22] text-white'
                : 'bg-[#35080E] text-[#F3ECE2] hover:bg-[#4A0E17]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Reservations ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'menu'
                ? 'bg-[#E67E22] text-white'
                : 'bg-[#35080E] text-[#F3ECE2] hover:bg-[#4A0E17]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Menu Inventory ({menuItems.length})</span>
          </button>
        </div>

        {/* Tab 1: Reservations Table */}
        {activeTab === 'reservations' && (
          <div className="bg-[#35080E] rounded-3xl border border-[#D4AF37]/30 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#F8C471]">
                Incoming Table Bookings
              </h3>
              <span className="text-xs text-gray-400">
                Sorted by most recent
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#24050A] text-[#F8C471] border-b border-[#D4AF37]/20">
                  <tr>
                    <th className="p-3.5 font-semibold">Ref ID</th>
                    <th className="p-3.5 font-semibold">Customer</th>
                    <th className="p-3.5 font-semibold">Phone</th>
                    <th className="p-3.5 font-semibold">Date & Time</th>
                    <th className="p-3.5 font-semibold">Guests</th>
                    <th className="p-3.5 font-semibold">Occasion / Notes</th>
                    <th className="p-3.5 font-semibold">Status</th>
                    <th className="p-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {reservations.map((r) => (
                    <tr key={r.id} className="hover:bg-[#4A0E17]/50 transition-colors">
                      <td className="p-3.5 font-mono text-[#D4AF37] font-bold">
                        {r.bookingReference}
                      </td>
                      <td className="p-3.5 font-medium text-white">
                        {r.customerName}
                      </td>
                      <td className="p-3.5 text-gray-300">
                        {r.customerPhone}
                      </td>
                      <td className="p-3.5 text-white">
                        <span className="block font-medium">{r.reservationDate}</span>
                        <span className="text-gray-400 text-[11px]">{r.reservationTime}</span>
                      </td>
                      <td className="p-3.5 font-bold text-white">
                        {r.guestCount}
                      </td>
                      <td className="p-3.5 max-w-xs text-gray-300">
                        <span className="font-semibold text-[#F8C471] block">{r.occasion || 'Highway Halt'}</span>
                        <span className="text-[11px] text-gray-400 truncate block">{r.specialNotes || 'None'}</span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'CONFIRMED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : r.status === 'SEATED'
                              ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                              : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateStatus(r.id, 'SEATED')}
                          className="px-2 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-[10px] font-semibold transition-colors"
                          title="Mark Seated"
                        >
                          Seat
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(r.id, 'CANCELLED')}
                          className="px-2 py-1 rounded bg-rose-700 hover:bg-rose-600 text-white text-[10px] font-semibold transition-colors"
                          title="Cancel Booking"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Menu Items Availability */}
        {activeTab === 'menu' && (
          <div className="bg-[#35080E] rounded-3xl border border-[#D4AF37]/30 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#D4AF37]/20">
              <h3 className="font-serif text-lg font-bold text-[#F8C471]">
                Menu Items Availability Management
              </h3>
              <span className="text-xs text-gray-400">
                Click toggle to mark item available / out of stock
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#24050A] border border-white/10 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-semibold text-white text-xs block leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#F8C471] block">
                      {item.category} · {item.placeholderPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleMenuAvailability(item.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                      item.available
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {item.available ? 'In Stock' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
