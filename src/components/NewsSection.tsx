import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Starfield from "./Starfield"; // ⭐ add stars everywhere

type Article = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
  source: string;
};

// fallback images (used only when absolutely needed)
const fallbackImages = [
  "https://images.unsplash.com/photo-1580428180121-cf6631fd988c?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1447433819943-74a20887a81e?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&w=1080&q=80",
];

export function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const all: Article[] = [];

        // 1. Spaceflight News
        const sfRes = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=20");
        const sfData = await sfRes.json();
        all.push(
          ...sfData.results.map((a: any) => ({
            id: `sf-${a.id}`,
            title: a.title,
            summary: a.summary,
            url: a.url,
            image_url: a.image_url,
            published_at: a.published_at,
            source: a.news_site,
          }))
        );

        // 2. Launch Library
        const launchRes = await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10");
        const launchData = await launchRes.json();
        all.push(
          ...launchData.results.map((l: any) => ({
            id: `ll-${l.id}`,
            title: `Upcoming Launch: ${l.name}`,
            summary: l.mission?.description || "Upcoming space mission.",
            url: l.url,
            image_url: l.image || "",
            published_at: l.net,
            source: "Launch Library",
          }))
        );

        // 3. NASA RSS
        const nasaRes = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss"
        );
        const nasaData = await nasaRes.json();
        all.push(
          ...nasaData.items.slice(0, 10).map((n: any, i: number) => ({
            id: `nasa-${i}`,
            title: n.title,
            summary: n.description || "NASA breaking news update.",
            url: n.link,
            image_url: n.enclosure?.link || "",
            published_at: n.pubDate,
            source: "NASA",
          }))
        );

        // 4. Phys.org Physics RSS
        const physRes = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://phys.org/rss-feed/physics-news/"
        );
        const physData = await physRes.json();
        all.push(
          ...physData.items.slice(0, 10).map((p: any, i: number) => ({
            id: `phys-${i}`,
            title: p.title,
            summary: p.description || "Physics news update.",
            url: p.link,
            image_url: p.enclosure?.link || "",
            published_at: p.pubDate,
            source: "Phys.org",
          }))
        );

        // 5. Scientific American (Space RSS)
        const saRes = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://www.scientificamerican.com/feed/space/"
        );
        const saData = await saRes.json();
        all.push(
          ...saData.items.slice(0, 10).map((s: any, i: number) => ({
            id: `sciam-${i}`,
            title: s.title,
            summary: s.description || "Scientific American space update.",
            url: s.link,
            image_url: s.enclosure?.link || "",
            published_at: s.pubDate,
            source: "Scientific American",
          }))
        );

        // ✅ Filter: no empty image + no duplicates
        const seen = new Set();
        const filtered = all.filter((a) => {
          if (!a.image_url) return false; // skip missing images
          if (seen.has(a.image_url)) return false; // skip duplicates
          seen.add(a.image_url);
          return true;
        });

        // Sort by date
        const sorted = filtered.sort(
          (a, b) =>
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );

        setArticles(sorted);
      } catch (err) {
        console.error("Error fetching space news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* ⭐ star background */}
      <Starfield density={80} />

      <div className="absolute inset-0 gradient-cosmic opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-futuristic text-5xl md:text-6xl mb-6 neon-text">
            Latest Space & Physics News
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time updates on space exploration, physics breakthroughs, rockets, and missions worldwide.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading news...</p>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, visibleCount).map((article, index) => (
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
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="glass px-3 py-1 rounded-full text-xs font-medium text-cyan-400 flex items-center space-x-1">
                        <Globe className="w-4 h-4" />
                        <span>{article.source}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    </div>

                    <h4 className="font-futuristic text-xl mb-3 text-white leading-tight group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h4>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors text-sm font-medium group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < articles.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:neon-glow transition-all duration-300 font-medium"
                >
                  Load More News
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
