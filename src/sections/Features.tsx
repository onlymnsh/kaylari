import { useRef, useEffect } from 'react';
import { Truck, Headphones, Shield, RotateCcw, Gift, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Gift,
    title: 'Gift Wrapping',
    description: 'Free on request',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Curated selection',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.feature-card');
    if (!cards) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Pop in animation
        gsap.fromTo(
          card,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );

        // Floating animation with different phases
        gsap.to(card, {
          y: -10,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 bg-[#f5f5f5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-[#1a1a1a]/60 uppercase mb-2">
            Why Choose Us
          </p>
          <h2 className="text-4xl sm:text-5xl font-['Montserrat'] font-bold text-[#1a1a1a]">
            The LUXE Experience
          </h2>
        </div>

        {/* Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group text-center p-6 bg-white rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors">
                <feature.icon className="w-7 h-7 text-[#1a1a1a] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-['Montserrat'] font-semibold text-[#1a1a1a] mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-[#1a1a1a]/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
