import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animations
      gsap.fromTo(
        '.hero-hindi',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'expo.out' }
      );

      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'expo.out' }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'expo.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 1.1, ease: 'elastic.out(1, 0.5)' }
      );

      // Parallax on scroll
      const imgElement = imageRef.current?.querySelector('img');
      if (imgElement) {
        gsap.to(imgElement, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FFF8F0]"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/hero-bridal.jpg"
          alt="Indian Bridal Fashion"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A0F]/80 via-[#1A0A0F]/40 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-[#D4AF37]/30 rounded-full animate-float" />
      <div className="absolute bottom-40 right-20 w-20 h-20 border border-[#D4AF37]/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            {/* Hindi Text */}
            <p className="hero-hindi font-hindi text-2xl text-[#D4AF37] mb-4">
              कायलारी
            </p>

            {/* Main Title */}
            <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold text-white leading-tight mb-6">
              Where Heritage
              <br />
              <span className="text-gold-gradient">Meets Elegance</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg sm:text-xl text-white/80 mb-8 max-w-lg">
              Discover the artistry of Indian craftsmanship. Each piece tells a story of tradition, passion, and timeless beauty.
            </p>

            {/* CTAs */}
            <div className="hero-cta flex flex-wrap gap-4">
              <a
                href="#collections"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#1A0A0F] font-medium rounded-full hover:bg-[#F4D03F] transition-colors btn-gold"
              >
                Explore Collections
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group inline-flex items-center gap-3 px-6 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all"
              >
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </span>
                Watch Our Story
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-['Playfair_Display'] font-bold text-[#D4AF37]">25+</p>
                <p className="text-sm text-white/60">Years of Craft</p>
              </div>
              <div>
                <p className="text-3xl font-['Playfair_Display'] font-bold text-[#D4AF37]">5000+</p>
                <p className="text-sm text-white/60">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-['Playfair_Display'] font-bold text-[#D4AF37]">50+</p>
                <p className="text-sm text-white/60">Artisans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1A0A0F]/95 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-[#1A0A0F] rounded-2xl overflow-hidden border border-[#D4AF37]/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]/50" />
                <p className="text-lg text-white/70">Brand Story Video</p>
                <p className="text-sm text-white/40">Video content would play here</p>
              </div>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

