import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Rocket,
  Satellite,
  Globe,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";

// ✅ EmailJS keys (your real ones)
const SERVICE_ID = "service_6reoxud";
const TEMPLATE_ID = "template_4rcdksk";
const PUBLIC_KEY = "VzjIdSQ7MiqFI1T1A";

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    info: "xploreonteam@gmail.com",
    description: "Get in touch for partnerships, inquiries, or support",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    info: "+91 7906822047",
    description: "Speak directly with our mission specialists",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Us",
    info: "India, Roorkee",
    description: "Tour our state-of-the-art facilities",
  },
];

const inquiryTypes = [
  { value: "partnership", label: "Partnership Opportunities", icon: <Satellite className="w-4 h-4" /> },
  { value: "mission", label: "Mission Consultation", icon: <Rocket className="w-4 h-4" /> },
  { value: "technology", label: "Technology Licensing", icon: <Globe className="w-4 h-4" /> },
  { value: "careers", label: "Career Opportunities", icon: <Mail className="w-4 h-4" /> },
  { value: "media", label: "Media Inquiries", icon: <Phone className="w-4 h-4" /> },
  { value: "other", label: "Other", icon: <MapPin className="w-4 h-4" /> },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Updated to use EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          company: formData.company,
          inquiryType: formData.inquiryType,
          message: formData.message,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      alert("✅ Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        company: "",
        inquiryType: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ✅ Contact Info (unchanged) */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400"
                      placeholder="your.email@domain.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-xl text-white bg-transparent"
                    >
                      <option value="">Select inquiry type</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 resize-none"
                    placeholder="Tell us about your project, questions, or how we can help you reach the stars..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    * Required fields. We'll respond within 24 hours.
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
