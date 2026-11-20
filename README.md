# Haveli (ਹਵੇਲੀ) — Production-Grade Restaurant & Highway Halt Website

> Authentic Punjabi village-themed family restaurant and legendary highway stop on the historic Grand Trunk Road (Jalandhar-Phagwara Highway, Punjab).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02.svg)](https://greensock.com/gsap/)
[![Express](https://img.shields.io/badge/Express-4.21-black.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748.svg)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38b2ac.svg)](https://tailwindcss.com/)

---

## 🏛️ Authentic Business Details (GT Road, Khajurla)

| Detail | Authentic Value |
| :--- | :--- |
| **Name** | **Haveli** (ਹਵੇਲੀ) |
| **Cuisine** | Authentic Punjabi vegetarian & non-vegetarian, street snacks, South Indian, traditional lassis & beverages |
| **Address** | Jalandhar-Phagwara Highway, Grand Trunk Rd, Khajurla, Punjab 144411, India |
| **Coordinates** | `31.2781641, 75.676673` |
| **Google Maps Link** | [Open in Google Maps](https://www.google.com/maps/place/Haveli/@31.2781641,75.676673,17z/data=!4m15!1m8!3m7!1s0x391a58d254051053:0x79a3b83ecfe44040!2sHaveli!8m2!3d31.2781641!4d75.676673!10e1!16s%2Fg%2F1td40wqh!3m5!1s0x391a58d254051053:0x79a3b83ecfe44040!8m2!3d31.2781641!4d75.676673!16s%2Fg%2F1td40wqh?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D) |
| **Phone** | **+91 98887 55550** |
| **Hours** | **Every day, 5:00 AM to 12:30 AM** (19.5 continuous hours daily) |
| **Price Level** | **Moderate (₹₹)** |
| **Google Rating** | **4.4 ★ from ~70,000+ reviews** |
| **Key Highlights** | Traditional Punjabi village ambience, family and group friendly, expansive free parking, EV fast charging available, express highway halt counter |
| **8 Exact Signatures**| Amritsari Kulcha, Chole Bhature, Stuffed Parathas, Masala Dosa, Sweet Lassi, Masala Tea, Fresh Fruit Juice, Softy |
| **Sister Attraction** | **Rangla Punjab** (Traditional cultural village with live Bhangra, puppet shows, village games & folk artisans next door) |
| **Nearby Banquet** | **The Heritage** (Regal banquet hall for grand Punjabi weddings & corporate events) |

---

## 🎨 Design Direction: Rustic Royal Punjab

- **Mood & Aesthetics**: Rustic royal Punjab inspired by centuries-old haveli architecture, scalloped sandstone jharokhas, brass degs, authentic wooden charpais (manjis), and vibrant Phulkari geometric embroideries.
- **Color Palette (CSS Variables)**:
  - Deep Royal Maroon: `#4A0E17` (Dark: `#24050A`, Light: `#6A1B24`)
  - Saffron & Marigold: `#E67E22` / `#D35400` / `#F39C12`
  - Antique Gold: `#D4AF37` / `#F8C471`
  - Terracotta: `#B84A39`
  - Warm Sand & Cream: `#FAF7F2` / `#F3ECE2`
  - Charcoal: `#1A1715`
- **Typography Engine**:
  - Expressive Display Serif: `Playfair Display` + `Cinzel` + `Rozha One` (for Gurmukhi/Indian script accents).
  - Clean Modern Body Sans: `Plus Jakarta Sans`.
- **Atmospheric Depth**:
  - SVG paper grain filter overlay (`mix-blend-mode: overlay`).
  - Phulkari dot-grid architectural backdrops.
  - Custom SVG jharokha scalloped arch clip-paths.

---

## ⚡ Animated Hero & Pinned 3D Video Section (GSAP + Lenis)

1. **Lenis Physics Smooth Scroll Engine**:
   - Integrated inertial physics-based smooth scrolling (`lenis`) bound to `gsap.ticker` and `ScrollTrigger.update` for liquid 60fps movement.
2. **Jharokha Arch Reveal**:
   - GSAP timeline dynamically unmasks the central haveli arch frame via polygon clip-path expansion (`clipPath: polygon(...)`).
3. **Split-Text Stagger**:
   - Headline words animate into view with 3D rotation (`rotationX: 25`, `y: 35`, `stagger: 0.08s`).
4. **Pinned 3D Perspective Courtyard Video (`VideoSection3D.tsx`)**:
   - Pinned 3D stage (`perspective: 1400px`) where the card transforms from an angled 3D floating framed perspective card (`rotateX: 20deg`, `rotateY: -12deg`, `scale: 0.82`) into a panoramic cinema window as you scroll.
   - High-definition ambient video loop showing authentic Punjabi village life, live tandoor embers, and rustic architecture, complete with video controls (Play/Pause, Mute/Unmute, and poster image fallback).
5. **Interactive Parallax & Floating Canvas Particles**:
   - Subtle mouse-position interpolation creates dimensional depth between the foreground arch and background courtyard photography.
   - 60fps canvas particle system rendering drifting marigold petals and shimmering golden diya sparks.
6. **Real-Time Opening Hours Badge**:
   - Dynamic hook computes whether Haveli is currently open or closed based on real 5:00 AM – 12:30 AM hours, displaying `"Open Now · Closes at 12:30 AM"` or `"Closed · Opens at 5:00 AM"`.
7. **Curated Menu Drawer (`MenuDrawer.tsx`)**:
   - A slide-over drawer modal that smoothly opens from the right when the user clicks "Menu Drawer" or "Explore Full Menu", displaying all 24 items with search, category tabs, veg/non-veg tags, and placeholder price disclaimer without cluttering the main editorial scroll.

---

## 🍽️ Pages & Sections

1. **Home**:
   - GSAP Animated Hero with live status pill and traveler emergency strip.
   - Grand Trunk Road Heritage Story & village pind culture narrative.
   - 8 Iconic Signature Delights carousel/showcase.
   - Ambience & Highway Stop features (ample free parking, 24/7 EV charging, brassware, chokidar).
   - Google Rating & Verified Traveler Reviews (4.4 from ~70k reviews).
   - Rangla Punjab cultural village & The Heritage banquet hall teaser.
2. **Menu**:
   - Complete 24-item spread across 7 categories: *Breakfast*, *Parathas and Kulcha*, *Main Course*, *South Indian*, *Snacks and Chaat*, *Beverages and Lassi*, *Desserts*.
   - Veg / Non-Veg markers.
   - Live real-time search & dietary filters (Pure Veg, Non-Veg, Signatures).
   - Sticky category navigation tabs.
   - Prominent transparency disclaimer regarding placeholder pricing.
3. **Table Reservation**:
   - Reservation form with date, time, party size (1–30), occasion, and special requests.
   - Validates that time falls within opening hours (5:00 AM to 12:30 AM), date is not in the past, and party size is within limits.
   - Instant confirmation with booking reference (e.g. `HAV-202611-4821`), celebratory confetti, and stubbed WhatsApp/SMS confirmation dispatcher.
4. **Visual Gallery**:
   - Masonry layout filterable by Architecture, Ambience, Food, and Rangla Punjab.
   - Fullscreen modal lightbox with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`).
5. **Visit & Contact**:
   - Embedded Google Map centered at coordinates `31.2781641, 75.676673`.
   - One-click Google Maps directions button.
   - Click-to-call (`+91 98887 55550`) and direct WhatsApp chat link.
   - Daily hours schedule table (Monday – Sunday: 5:00 AM – 12:30 AM).
   - Traveler bus and group inquiry form.
6. **Staff Operations Portal (`/admin`)**:
   - Protected route requiring admin key (`haveli-highway-admin-key-2026`).
   - Live reservation status tracking (mark Seated, Cancelled).
   - Menu inventory availability toggle (In Stock / Out of Stock).
7. **Footer**:
   - Complete contact info, coordinates, sister attractions, copyright, and schema metadata.

---

## 🏗️ Backend Architecture

Layered enterprise pattern built with Node.js, Express, TypeScript, and Prisma:

```
server/src/
├── config/             # Environment, opening hours, business metadata
├── controllers/        # ReservationController, MenuController, ContactController, HoursController, AdminController
├── services/           # ReservationService, MenuService, ContactService, HoursService
├── repositories/       # Prisma repository layer (ReservationRepository, MenuRepository, ContactRepository)
├── validators/         # Zod schemas (reservation, contact, menu updates)
├── middleware/         # Rate limiting, Helmet security headers, CORS, error handling, admin auth
├── utils/              # Opening hours calculator, notification stub, Pino logger
└── index.ts            # Express application bootstrap & graceful shutdown
```

### Endpoints
- `GET /api/hours`: Computes real-time status, weekly schedule, and amenities.
- `GET /api/menu`: Returns categorized menu with dietary metadata and placeholder disclaimer.
- `GET /api/menu/signatures`: Returns the 8 signature dishes.
- `POST /api/reservations`: Zod-validated table booking, operating hours check, generates reference code, dispatches notification stub.
- `POST /api/contact`: Validates visitor inquiry and stores in database.
- `GET /api/admin/reservations`: Protected endpoint listing all reservations with summary stats.
- `PATCH /api/admin/reservations/:id`: Protected reservation status updater.
- `PATCH /api/admin/menu/:id`: Protected menu availability toggle.

---

## 🚀 Quickstart & Setup Instructions

### 1. Prerequisites
- **Node.js**: v18 or higher (v26+ supported)
- **npm**: v9+

### 2. Install Dependencies
From the root `haveli` directory:
```bash
npm install
```

### 3. Initialize Database & Seed
Run Prisma to create the local SQLite database and seed all 24 menu items and sample bookings:
```bash
npm run seed
```

### 4. Run Development Servers
Start both the Express API (Port 5000) and React Vite frontend (Port 3000 with proxy) concurrently:
```bash
npm run dev
```

Open your browser at:
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api/hours`
- **Admin Portal**: Accessible via the navbar "Staff Portal" link or navigation with key `haveli-highway-admin-key-2026`.

### 5. Run Tests
Execute the unit test suite verifying hours logic and validation rules:
```bash
npm run test
```

### 6. Production Build & Local Serve
Build both frontend and backend for production deployment:
```bash
npm run build
npm start
```

---

## 🚀 Deploying to Render

This monorepo is pre-configured for seamless 1-click or manual deployment to **Render** as a fullstack web service.

### Option A: 1-Click Blueprint Deploy (Recommended)
1. Push this repository to your GitHub account (`JJAGATK/haveli-restaurant`).
2. Log in to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** → **Blueprint**.
4. Select your `haveli-restaurant` repository.
5. Render reads the included `render.yaml` and provisions the web service automatically with:
   - **Build Command**: `npm run render-build` (installs deps, runs migrations/seeds, and builds frontend & backend)
   - **Start Command**: `npm start`
   - **Health Check**: `/api/health`
6. Click **Apply**. Render will build and deploy your site with a live `https://*.onrender.com` URL.

### Option B: Manual Web Service Setup
1. On the [Render Dashboard](https://dashboard.render.com/), click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure the following fields:
   - **Name**: `haveli-restaurant`
   - **Runtime**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
4. Under **Advanced** → **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: `file:./prisma/dev.db`
   - `ADMIN_API_KEY`: `haveli-highway-admin-key-2026` (or your chosen secret)
   - `CORS_ORIGIN`: `*`
5. Click **Create Web Service**. Your app will be live within 2-3 minutes!

---

## 📋 List of Placeholders (Per Prompt Requirements)

As strictly instructed: *"Do NOT invent prices, awards, or founding year. Use clearly marked placeholder data in a single editable data file, and placeholder image slots."*

1. **Pricing**:
   - All menu prices are clearly marked as placeholders in `client/src/data/restaurantData.ts` and `server/prisma/seed.ts` (e.g. `₹220* [Est. Placeholder]` with disclaimer `*Placeholder price - please verify at venue counter`).
2. **Awards & Founding Year**:
   - Zero fabricated awards or founding dates are included in code or text.
3. **Imagery Slots**:
   - All visual slots are mapped in `IMAGES` within `restaurantData.ts` to high-resolution curated royalty-free photography representing authentic Punjabi haveli architecture, clay tandoors, brassware, and traditional culinary items, easily swappable with official venue photography.
4. **Notification Dispatcher**:
   - `server/src/utils/notificationStub.ts` provides a structured stub logging WhatsApp and Email dispatch events with message IDs, ready for plug-in of Twilio/SendGrid/Resend keys.
5. **Admin Key**:
   - Placeholder default key `haveli-highway-admin-key-2026` configured in `.env.example`.
