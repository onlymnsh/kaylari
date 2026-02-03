import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Fashion Street', 'Jaipur, Rajasthan 302001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 98765 43210', '+91 141 123 4567'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@kaylari.com', 'custom@kaylari.com'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Sat: 10AM - 8PM', 'Sunday: By Appointment'],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-[#1A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-hindi text-xl text-[#D4AF37] mb-2">संपर्क</p>
          <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We would love to hear from you. Reach out for custom orders, collaborations, or just to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-[#D4AF37]/20">
            <h3 className="text-2xl font-['Playfair_Display'] font-semibold text-white mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Tell us what you are looking for..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full py-4 bg-[#D4AF37] text-[#1A0A0F] font-medium rounded-lg hover:bg-[#F4D03F] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitted ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#8B1538]/20 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-lg font-['Playfair_Display'] font-semibold text-white mb-2">
                    {info.title}
                  </h4>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-white/60">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-white/40 mb-4">Follow us on social media</p>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/60 hover:bg-[#D4AF37] hover:text-[#1A0A0F] transition-all"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
