import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Hero } from './components/hero/Hero';
import { AboutStory } from './components/about/AboutStory';
import { MenuSection } from './components/menu/MenuSection';
import { MenuShowcase } from './components/menu/MenuShowcase';
import { PopularDishes } from './components/dishes/PopularDishes';
import { TestimonialsSection } from './components/reviews/TestimonialsSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CultureHubPage } from './components/culture/CultureHubPage';

gsap.registerPlugin(ScrollTrigger);

type PageView = 'home' | 'culture' | 'admin';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [activeSection, setActiveSection] = useState('hero');
  const lenisRef = useRef<Lenis | null>(null);

  // Synchronize URL hash with page views
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setCurrentPage('admin');
      } else if (hash === 'culture') {
        setCurrentPage('culture');
      } else {
        setCurrentPage('home');
        if (hash && hash !== 'hero') {
          setActiveSection(hash);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Buttery Smooth Inertial Scrolling with Lenis on Home Page
  useEffect(() => {
    if (currentPage !== 'home') {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [currentPage]);

  const handleNavigate = (target: string) => {
    if (target === 'admin') {
      setCurrentPage('admin');
      window.history.pushState(null, '', '#admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'culture') {
      setCurrentPage('culture');
      window.history.pushState(null, '', '#culture');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      setCurrentPage('home');
      const hash = target === 'hero' ? window.location.pathname : `#${target}`;
      window.history.pushState(null, '', hash);
      setTimeout(() => {
        scrollToTarget(target);
      }, 100);
      return;
    }

    const hash = target === 'hero' ? window.location.pathname : `#${target}`;
    window.history.pushState(null, '', hash);
    scrollToTarget(target);
  };

  const scrollToTarget = (target: string) => {
    setActiveSection(target);
    const navOffset = 90;

    if (target === 'hero' || target === '') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.1, force: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(target);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -navOffset, duration: 1.2, force: true });
      } else {
        const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // ScrollSpy for Active Navigation Links
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sections = [
      'hero',
      'story',
      'menu',
      'menu-showcase',
      'popular-dishes',
      'reviews',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#100205] text-[#FFF9F0] font-sans selection:bg-[#E67E22] selection:text-white">
      {/* Universal Header with Navigation & In-Page Menu Trigger */}
      <Header
        onNavigate={handleNavigate}
        activeSection={activeSection}
        currentPage={currentPage}
        onOpenMenu={() => handleNavigate('menu')}
      />

      <main className="flex-1">
        {currentPage === 'admin' ? (
          /* Protected Staff Operations Portal */
          <div>
            <div className="bg-[#180A0E] py-3 px-4 sm:px-8 border-b border-[#D4AF37]/30 flex items-center justify-between text-white text-xs">
              <span className="font-semibold tracking-wide text-[#F8C471]">
                Viewing Staff Operations Portal
              </span>
              <button
                onClick={() => handleNavigate('hero')}
                className="px-4 py-1.5 rounded-full bg-[#E67E22] hover:bg-[#F39C12] text-white font-semibold transition-colors cursor-pointer"
              >
                Back to Website →
              </button>
            </div>
            <AdminDashboard />
          </div>
        ) : currentPage === 'culture' ? (
          /* Dedicated Palatial Culture Hub & Heritage Page */
          <CultureHubPage
            onBackToHome={() => handleNavigate('hero')}
            onExploreMenuClick={() => handleNavigate('menu')}
          />
        ) : (
          /* Editorial Dark Luxury Experience Directly Inspired by Reference Video */
          <>
            {/* 1. Cinematic Cloud-Parting Hero & Floating Information Strip */}
            <Hero
              onExploreMenuClick={() => handleNavigate('menu')}
              onExploreStoryClick={() => handleNavigate('culture')}
            />

            {/* 2. Discover Our Delicious Story (Frame 03) */}
            <AboutStory
              onExploreMenuClick={() => handleNavigate('menu')}
              onExploreCultureClick={() => handleNavigate('culture')}
            />

            {/* 3. The Full Palatial Haveli Menu (In-Page as shown in photo, NOT on the side) */}
            <MenuSection />

            {/* 4. Feasts Showcase with Alternating Floating Gourmet Plates (Frames 05 & 07) */}
            <MenuShowcase onOpenMenuDrawer={() => handleNavigate('menu')} />

            {/* 5. Discover Our Popular Dishes with 3 Editorial Cards (Frame 09) */}
            <PopularDishes onOpenMenuDrawer={() => handleNavigate('menu')} />

            {/* 6. What Our Visitors Say (Google Rating 4.4 from ~70k Reviews) (Frame 13) */}
            <TestimonialsSection />
          </>
        )}
      </main>

      {/* Universal Royal Dark Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
