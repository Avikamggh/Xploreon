import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Rocket, Satellite, Globe, Clock } from 'lucide-react';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
  // Basic validation
  if (!formData.name || !formData.email || !formData.inquiryType || !formData.message) {
    alert("Please fill in all required fields.");
    return;
  }

  setIsSubmitting(true);

  try {
    await emailjs.send(
      "service_6reoxud",
      "template_4rcdksk", 
      {
        user_name: formData.name,
        user_email: formData.email,
        company: formData.company,
        inquiry_type: formData.inquiryType,
        message: formData.message,
        reply_to: formData.email,
      },
      "VzjIdSQ7MiqFI1T1A"
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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Custom styles for star animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .star {
          animation: twinkle 2s infinite;
        }
      `}</style>

      {/* Starfield background */}
      <div className="absolute inset-0 bg-black">
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
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Contact Mission Control
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to embark on your space journey? Reach out to our team and let's explore 
            the infinite possibilities together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-cyan-400">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-cyan-400/30">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center group-hover:bg-cyan-400/20 transition-all duration-300">
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
                  </div>
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
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-cyan-400">
                Send Us A Message
              </h3>

              <div className="space-y-6">
                {/* Name and Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Company and Inquiry Type row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800">Select inquiry type...</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-gray-800">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your space exploration needs, mission requirements, or any questions you have..."
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Launching Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map section */}
        <div className="mt-16">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-cyan-400">
                  Visit Our Launch Facility
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Experience the future of space exploration firsthand. Our Roorkee facility 
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
              
              <div className="relative h-64 lg:h-80 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-900/50 to-blue-900/20 flex items-center justify-center">
                  <iframe
                      title="Roorkee Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.6139206215073!2d77.89198187462644!3d29.85426237501914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb33d6fdb7d61%3A0x5a40cbbd81e0a32d!2sRoorkee%2C%20Uttarakhand%20247667!5e0!3m2!1sen!2sin!4v1693999928174!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style="border: 0;"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
