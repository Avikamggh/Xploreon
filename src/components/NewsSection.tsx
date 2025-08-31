import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Zap, Award, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const newsArticles = [
  {
    id: 1,
    title: "Xploreon Secures $25M Series A Funding",
    excerpt: "Leading aerospace investors back our vision for reusable rocket technology, enabling accelerated development of our first orbital vehicle.",
    date: "2024-12-15",
    category: "Funding",
    image: "https://images.unsplash.com/photo-1646582744759-48c4c7b71950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2glMjBuaWdodHxlbnwxfHx8fDE3NTY2MDU0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: <Zap className="w-5 h-5" />,
    featured: true
  },
  {
    id: 2,
    title: "First Engine Test Fire Success",
    excerpt: "Our prototype rocket engine completes its first static fire test, achieving 78% of target thrust with clean burn characteristics.",
    date: "2024-11-28",
    category: "Development",
    image: "https://images.unsplash.com/photo-1751917272106-23e3de73bf2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc1NjYwNTQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: <Award className="w-5 h-5" />,
    featured: false
  },
  {
    id: 3,
    title: "NASA Partnership for Testing Facility",
    excerpt: "Strategic agreement with NASA to utilize Stennis Space Center for advanced propulsion testing and validation programs.",
    date: "2024-11-10",
    category: "Partnership",
    image: "https://images.unsplash.com/photo-1672011123326-444f4b0b7180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHN0YXRpb24lMjBlYXJ0aCUyMG9yYml0fGVufDF8fHx8MTc1NjYwNTMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: <Globe className="w-5 h-5" />,
    featured: false
  },
  {
    id: 4,
    title: "Team Expansion: 15 New Engineers",
    excerpt: "Growing our engineering talent with experts from SpaceX, Blue Origin, and top aerospace programs to accelerate development.",
    date: "2024-10-22",
    category: "Company",
    image: "https://images.unsplash.com/photo-1622234365860-c8ae2e35b56c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb25hdXQlMjBzcGFjZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2NjA1MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: <Zap className="w-5 h-5" />,
    featured: false
  },
  {
    id: 5,
    title: "Sustainability Focus: Carbon-Neutral Goals",
    excerpt: "Announcing our commitment to carbon-neutral operations and sustainable rocket fuel development for environmentally conscious space access.",
    date: "2024-10-05",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNhdGVsbGl0ZSUyMG9yYml0fGVufDF8fHx8MTc1NjYwNTMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: <Globe className="w-5 h-5" />,
    featured: false
  },
  {
    id: 6,
    title: "CEO Keynote at Space Tech Conference",
    excerpt: "Our founder presents the future of reusable rockets at the International Space Development Conference, outlining our 2026 flight plans.",
    date: "2024-09-18",
    category: "Company",
    image: "https://images.unsplash.com/photo-1605703905070-24220ce7f693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwc3BhY2UlMjBzdGFycyUyMG5lYnVsYXxlbnwxfHx8fDE3NTY1NzI2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: <Award className="w-5 h-5" />,
    featured: false
  }
];

const categories = [
  { name: "All", count: newsArticles.length },
  { name: "Funding", count: newsArticles.filter(article => article.category === "Funding").length },
  { name: "Development", count: newsArticles.filter(article => article.category === "Development").length },
  { name: "Partnership", count: newsArticles.filter(article => article.category === "Partnership").length },
  { name: "Company", count: newsArticles.filter(article => article.category === "Company").length }
];

export function NewsSection() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredArticles = selectedCategory === "All" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-cosmic">
        <div className="absolute inset-0 opacity-5">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-cyan-400 rounded-full star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
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
            News & Updates
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow our journey from startup to space as we develop revolutionary reusable rocket technology.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white neon-glow'
                  : 'glass text-gray-300 hover:text-cyan-400 hover:neon-border'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Featured article */}
        {selectedCategory === "All" && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {filteredArticles
              .filter(article => article.featured)
              .map((article) => (
                <div
                  key={article.id}
                  className="glass-card rounded-3xl overflow-hidden neon-glow hover:scale-[1.02] transition-all duration-500 cursor-pointer"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-deep-space/80 lg:bg-gradient-to-r lg:from-transparent lg:to-deep-space"></div>
                      <div className="absolute top-6 left-6">
                        <span className="glass px-4 py-2 rounded-full text-sm font-medium text-cyan-400 flex items-center space-x-2">
                          {article.icon}
                          <span>{article.category}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-3 mb-4 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                        <span className="text-cyan-400">•</span>
                        <span>Featured</span>
                      </div>
                      
                      <h3 className="font-futuristic text-3xl lg:text-4xl mb-6 text-white leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {article.excerpt}
                      </p>
                      
                      <button className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors font-medium group">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles
            .filter(article => !article.featured || selectedCategory !== "All")
            .map((article, index) => (
              <motion.div
                key={article.id}
                className="glass-card rounded-2xl overflow-hidden hover:neon-border transition-all duration-500 cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="glass px-3 py-1 rounded-full text-xs font-medium text-cyan-400 flex items-center space-x-1">
                      {article.icon}
                      <span>{article.category}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  
                  <h4 className="font-futuristic text-xl mb-3 text-white leading-tight group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h4>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  
                  <button className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors text-sm font-medium group">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Newsletter signup */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="font-futuristic text-3xl mb-6 text-cyan-400">
              Stay Connected to the Stars
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest updates on our missions, technological breakthroughs, 
              and exclusive insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 glass rounded-full focus:neon-border focus:outline-none text-white placeholder-gray-400"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:neon-glow transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}