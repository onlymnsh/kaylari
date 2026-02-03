import { Instagram, Facebook, MapPin } from 'lucide-react';

const footerLinks = {
  collections: [
    { name: 'Bridal Wear', href: '#collections' },
    { name: 'Festive Collection', href: '#collections' },
    { name: 'Contemporary Fusion', href: '#collections' },
    { name: 'Traditional Sarees', href: '#collections' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Story', href: '#about' },
    { name: 'Artisans', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],
  support: [
    { name: 'Size Guide', href: '#' },
    { name: 'Care Instructions', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D0508] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <span className="font-hindi text-3xl text-[#D4AF37]">कायलारी</span>
              <span className="font-['Playfair_Display'] text-2xl font-semibold text-white">
                Kaylari
              </span>
            </a>
            <p className="text-white/60 mb-6 max-w-sm">
              Celebrating Indian heritage through contemporary fashion. Each piece tells a story of tradition and craftsmanship.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-white font-semibold mb-4">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2024 Kaylari. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A0A0F] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A0A0F] transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
