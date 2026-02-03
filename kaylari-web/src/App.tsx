import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdminProvider } from '@/context/AdminContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Collections from '@/sections/Collections';
import Gallery from '@/sections/Gallery';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import AdminDashboard from '@/admin/AdminDashboard';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Check if we're on admin page
    const isAdminPage = window.location.pathname === '/admin';
    
    if (!isAdminPage) {
      document.documentElement.style.scrollBehavior = 'smooth';
      ScrollTrigger.refresh();
    }

    return () => {
      if (!isAdminPage) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  // Simple routing based on pathname
  const isAdminPage = window.location.pathname === '/admin';

  if (isAdminPage) {
    return (
      <AdminProvider>
        <AdminDashboard />
      </AdminProvider>
    );
  }

  return (
    <AdminProvider>
      <div className="relative">
        <Navigation />
        <main>
          <Hero />
          <Collections />
          <Gallery />
          <About />
          <Contact />
          <Footer />
        </main>
      </div>
    </AdminProvider>
  );
}

export default App;
