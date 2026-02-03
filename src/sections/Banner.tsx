import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      // Image scale and parallax
      gsap.fromTo(
        image.querySelector('img'),
        { scale: 1.2 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        text,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] bg-[#1a1a1a] overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        {/* Left: Text Content */}
        <div
          ref={textRef}
          className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 lg:py-0"
        >
          <p className="text-sm font-medium tracking-widest text-white/60 uppercase mb-4">
            Limited Time
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Montserrat'] font-bold text-white leading-tight mb-6">
            Summer
            <br />
            Collection
            <br />
            <span className="text-outline text-white">2024</span>
          </h2>
          <p className="text-lg text-white/70 max-w-md mb-8">
            Light fabrics, vibrant colors, and effortless style. Discover pieces designed for sun-soaked days and warm evenings.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#new-arrivals"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1a1a1a] font-medium rounded-full hover:bg-[#f5f5f5] transition-colors"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 px-6">
              <div className="text-center">
                <p className="text-2xl font-['Montserrat'] font-bold text-white">30%</p>
                <p className="text-xs text-white/60">Off</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-['Montserrat'] font-bold text-white">48h</p>
                <p className="text-xs text-white/60">Left</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div ref={imageRef} className="relative h-[50vh] lg:h-auto overflow-hidden">
          <img
            src="/banner-summer.jpg"
            alt="Summer Collection"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent lg:opacity-100 opacity-50" />
        </div>
      </div>
    </section>
  );
}
