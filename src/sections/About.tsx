import { useEffect, useRef } from 'react';
import { Award, Heart, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: 'Crafted with Love',
    description: 'Every piece is made with passion and attention to detail',
  },
  {
    icon: Users,
    title: 'Supporting Artisans',
    description: 'We work directly with skilled craftsmen across India',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest fabrics and materials make the cut',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-image',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-[#FFF8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <div className="about-image relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/about-craftsmanship.jpg"
                alt="Indian craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#D4AF37] rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B1538]/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="about-content">
            <p className="font-hindi text-xl text-[#D4AF37] mb-2">हमारी कहानी</p>
            <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-[#1A0A0F] mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-[#1A0A0F]/70">
              <p>
                Founded in 1999, Kaylari began with a simple mission: to preserve and celebrate the rich textile heritage of India. What started as a small boutique in Jaipur has grown into a beloved brand known for its exquisite craftsmanship and timeless designs.
              </p>
              <p>
                We work directly with artisans from across India – from the weavers of Banaras to the embroiderers of Lucknow, the block printers of Rajasthan to the mirror workers of Gujarat. Each piece in our collection is a testament to their skill and dedication.
              </p>
              <p>
                Our designs blend traditional techniques with contemporary aesthetics, creating pieces that honor the past while embracing the future. Whether it is a bridal lehenga or a festive kurta, every Kaylari creation tells a story of heritage, craftsmanship, and love.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-8 border-t border-[#1A0A0F]/10">
              <p className="font-hindi text-2xl text-[#8B1538]">प्रिया शर्मा</p>
              <p className="text-sm text-[#1A0A0F]/60">Founder & Creative Director</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-grid grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card group p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-[#D4AF37]/10"
            >
              <div className="w-14 h-14 rounded-full bg-[#8B1538]/10 flex items-center justify-center mb-6 group-hover:bg-[#8B1538] transition-colors">
                <value.icon className="w-6 h-6 text-[#8B1538] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-semibold text-[#1A0A0F] mb-3">
                {value.title}
              </h3>
              <p className="text-[#1A0A0F]/60">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
