import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAdmin } from '@/context/AdminContext';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { content } = useAdmin();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(content.images.map((img) => img.category))];

  const filteredImages =
    activeFilter === 'All'
      ? content.images
      : content.images.filter((img) => img.category === activeFilter);

  const lightboxSlides = filteredImages.map((img) => ({
    src: img.src,
    title: img.title,
    description: img.description,
  }));

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.gallery-item');
    if (!items) return;

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredImages]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 bg-[#1A0A0F]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-hindi text-xl text-[#D4AF37] mb-2">गैलरी</p>
          <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-white mb-4">
            Gallery
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A visual journey through our creations
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-[#D4AF37] text-[#1A0A0F]'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B1538]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-xs text-[#D4AF37] uppercase tracking-wider mb-1">
                  {image.category}
                </p>
                <h4 className="text-lg font-['Playfair_Display'] font-semibold text-white">
                  {image.title}
                </h4>
                {image.description && (
                  <p className="text-sm text-white/70 mt-1 line-clamp-2">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/40">No images in this category yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        styles={{
          root: { ['--yarl__color_backdrop' as string]: 'rgba(26, 10, 15, 0.98)' },
        }}
      />
    </section>
  );
}
