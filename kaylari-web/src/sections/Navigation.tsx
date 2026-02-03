import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavigationProps {
  isAdmin?: boolean;
}

export default function Navigation({ isAdmin = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Collections', href: '#collections' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  if (isAdmin) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-[#1A0A0F] border-b border-[#D4AF37]/20">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="font-hindi text-2xl text-[#D4AF37]">कायलारी</span>
            <span className="text-white font-['Playfair_Display'] text-xl">Admin</span>
          </a>
          <a
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Back to Site
          </a>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          isScrolled
            ? 'max-w-5xl glass rounded-full shadow-lg border border-[#D4AF37]/20 mx-4 sm:mx-auto'
            : 'max-w-7xl'
        }`}
      >
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-hindi text-2xl text-[#8B1538]">कायलारी</span>
            <span
              className={`font-['Playfair_Display'] text-xl font-semibold transition-colors ${
                isScrolled ? 'text-[#1A0A0F]' : 'text-[#1A0A0F]'
              }`}
            >
              Kaylari
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  isScrolled ? 'text-[#1A0A0F]' : 'text-[#1A0A0F]'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Admin Link (Hidden) */}
          <a
            href="/admin"
            className="hidden text-xs text-[#1A0A0F]/30 hover:text-[#1A0A0F]/50 transition-colors"
          >
            Admin
          </a>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="p-2 hover:bg-[#8B1538]/5 rounded-full transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5 text-[#1A0A0F]" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-[#FFF8F0]">
              <div className="flex flex-col h-full pt-12">
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-['Playfair_Display'] font-medium text-[#1A0A0F] hover:text-[#8B1538] transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
