import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAdmin } from '@/context/AdminContext';

gsap.registerPlugin(ScrollTrigger);

export default function Collections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { content } = useAdmin();

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.collection-card');
    if (!cards) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [content.collections]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="py-24 bg-[#FFF8F0] paisley-pattern"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-hindi text-xl text-[#D4AF37] mb-2">संग्रह</p>
          <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-[#1A0A0F] mb-4">
            Our Collections
          </h2>
          <p className="text-lg text-[#1A0A0F]/60 max-w-2xl mx-auto">
            Explore our curated collections, each piece crafted with love and tradition
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.collections.map((collection) => (
            <div
              key={collection.id}
              className="collection-card group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 collection-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-sm text-[#D4AF37] mb-1">{collection.itemCount} Items</p>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-white mb-2">
                  {collection.name}
                </h3>
                <p className="text-sm text-white/80 mb-4">{collection.description}</p>
                <div className="flex items-center gap-2 text-[#D4AF37] font-medium">
                  <span>View Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Bottom Label (always visible) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A0A0F]/80 to-transparent group-hover:opacity-0 transition-opacity">
                <h3 className="text-xl font-['Playfair_Display'] font-semibold text-white">
                  {collection.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
