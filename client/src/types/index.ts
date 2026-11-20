export interface MenuItem {
  id: number;
  name: string;
  punjabiName?: string | null;
  description: string;
  category: 'Breakfast' | 'Parathas and Kulcha' | 'Main Course' | 'South Indian' | 'Snacks and Chaat' | 'Beverages and Lassi' | 'Desserts';
  isVeg: boolean;
  isSignature: boolean;
  placeholderPrice: string; // Clearly marked placeholder
  priceDisclaimer: string;
  imagePlaceholder: string;
  available: boolean;
  dietaryTags: string;
  spiceLevel?: string | null;
}

export interface ReservationFormData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  occasion?: string;
  specialNotes?: string;
}

export interface ReservationResponse {
  id: number;
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  occasion?: string | null;
  specialNotes?: string | null;
  status: string;
  confirmationSent: boolean;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}

export interface OpeningHoursStatus {
  isOpen: boolean;
  statusBadge: string;
  statusDetails: string;
  nextEvent: string;
  currentHours: string;
  currentTimeString: string;
  dayOfWeek: string;
  weeklySchedule?: Array<{ day: string; hours: string }>;
  highwayAmenities?: Array<{ name: string; description: string }>;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  travelerType: 'Family' | 'Highway Traveler' | 'Road Tripper' | 'Tour Group' | 'Foodie';
  comment: string;
  favoriteDish: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  punjabiTitle?: string;
  category: 'Architecture' | 'Ambience' | 'Food' | 'Culture Hub' | 'Rangla Punjab';
  imageUrl: string;
  caption: string;
}
