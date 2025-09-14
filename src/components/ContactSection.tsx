import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    info: "xploreonteam@gmail.com",
    description: "Get in touch for partnerships, inquiries, or support"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    info: "+91 7906822047",
    description: "Speak directly with our mission specialists"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Us",
    info: "India, Roorkee",
    description: "Tour our state-of-the-art facilities"
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Replace with your own IDs
  const SERVICE_ID = "service_6reoxud";
  const TEMPLATE_ID = "template_4rcdksk";
  const PUBLIC_KEY = "VzjIdSQ7MiqFI1T1A";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          company: formData.company,
          inquiryType: formData.inquiryType,
          message: formData.message,
          reply_to: formData.email
        },
        PUBLIC_KEY
      );

      console.log("EmailJS result:", result.text);
      alert("😄 Message sent successfully!");
      
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: '',
        message: ''
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("😞 Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* ... keep your starfield + design code here ... */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-futuristic text-5xl md:text-6xl mb-6 neon-text">
            Contact Mission Control
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12">
            <h3 className="font-futuristic text-2xl mb-8 text-cyan-400">
              Send Us A Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full px-4 py-3 glass rounded-xl text-white"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full px-4 py-3 glass rounded-xl text-white"
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company / Organization"
                className="w-full px-4 py-3 glass rounded-xl text-white"
              />
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass rounded-xl text-white bg-transparent"
              >
                <option value="">Select Inquiry Type</option>
                <option value="partnership">Partnership</option>
                <option value="mission">Mission Consultation</option>
                <option value="technology">Technology Licensing</option>
                <option value="careers">Careers</option>
                <option value="media">Media</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your Message"
                className="w-full px-4 py-3 glass rounded-xl text-white"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
