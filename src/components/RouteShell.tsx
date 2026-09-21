import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { OpeningLoader } from './OpeningLoader';

// Lazy-loaded pages — each becomes its own JS chunk
const HomePage        = lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage       = lazy(() => import('../pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage    = lazy(() => import('../pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const GalleryPage     = lazy(() => import('../pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const TestimonialsPage = lazy(() => import('../pages/TestimonialsPage'));
const ContactPage     = lazy(() => import('../pages/ContactPage'));
const BlogPage        = lazy(() => import('../pages/BlogPage'));

export const RouteShell = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, pathname === '/' ? 2200 : 1300);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <OpeningLoader visible={isLoading} />
      <ScrollToTop />
      <div className="site-shell flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          {/* Suspense fallback is invisible — OpeningLoader already covers route transitions */}
          <Suspense fallback={<div aria-hidden="true" />}>
            <Routes>
              <Route path="/"            element={<HomePage />} />
              <Route path="/about"       element={<AboutPage />} />
              <Route path="/services"    element={<ServicesPage />} />
              <Route path="/gallery"     element={<GalleryPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact"     element={<ContactPage />} />
              <Route path="/blog"        element={<BlogPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

