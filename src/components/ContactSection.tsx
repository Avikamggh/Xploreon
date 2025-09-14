import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Rocket, Satellite, Globe, Clock } from 'lucide-react';
import { Button } from './ui/button';
import emailjs from '@emailjs/browser';   // ✅ Added

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

const inquiryTypes = [
  { value: "partnership", label: "Partnership Opportunities", icon: <Satellite className="w-4 h-4" /> },
  { value: "mission", label: "Mission Consultation", icon: <Rocket className="w-4 h-4" /> },
  { value: "technology", label: "Technology Licensing", icon: <Globe className="w-4 h-4" /> },
  { value: "careers", label: "Career Opportunities", icon: <Mail className="w-4 h-4" /> },
  { value: "media", label: "Media Inquiries", icon: <Phone className="w-4 h-4" /> },
  { value: "other", label: "Other", icon: <MapPin className="w-4 h-4" /> }
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

  // ✅ Now uses EmailJS instead of fake delay
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_6reoxud",     // your EmailJS service ID
        "template_4rcdksk",    // your EmailJS template ID
        {
          user_name: formData.name,
          user_email: formData.email,
          company: formData.company,
          inquiryType: formData.inquiryType,
          message: formData.message,
          reply_to: formData.email,
        },
        "VzjIdSQ7MiqFI1T1A"    // your EmailJS public key
      );

      alert("✅ Message sent successfully! We'll get back to you soon.");
      setFormData({ name: '', email: '', company: '', inquiryType: '', message: '' });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again.");
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
      {/* Starfield background */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-black via-deep-space to-nebula-blue/30">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full star"
              style={{
                width: Math.random() > 0.5 ? '1px' : '2px',
                height: Math.random() > 0.5 ? '1px' : '2px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Nebula effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
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
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to embark on your space journey? Reach out to our team and let's explore 
            the infinite possibilities together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact information */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-futuristic text-2xl mb-8 text-cyan-400">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-4 p-4 rounded-2xl hover:neon-border transition-all duration-300">
                      <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                        <div className="text-cyan-400">
                          {contact.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {contact.title}
                        </h4>
                        <p className="text-cyan-400 mb-2 font-medium">
                          {contact.info}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Business hours */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="font-medium text-white mb-4">Mission Control Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-cyan-400">24/7 Operations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weekends</span>
                    <span className="text-cyan-400">Emergency Only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-cyan-400">Within 4 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
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
                {/* --- your form fields (unchanged) --- */}
                {/* they all still bind to formData and handleChange */}
                {/* submit button stays the same */}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map or additional info */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-futuristic text-3xl mb-6 text-cyan-400">
                  Visit Our Launch Facility
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Experience the future of space exploration firsthand. Our Cape Canaveral facility 
                  features cutting-edge mission control, satellite assembly cleanrooms, and launch 
                  observation decks.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">India, Roorkee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">Tours available Monday-Friday, 9 AM - 4 PM</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Rocket className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">Security clearance required for certain areas</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-80 glass rounded-2xl overflow-hidden">
                <iframe
                  title="Roorkee Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.6139206215073!2d77.89198187462644!3d29.85426237501914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb33d6fdb7d61%3A0x5a40cbbd81e0a32d!2sRoorkee%2C%20Uttarakhand%20247667!5e0!3m2!1sen!2sin!4v1693999928174!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div className="w-full h-full bg-gradient-to-br from-deep-space to-nebula-blue/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
