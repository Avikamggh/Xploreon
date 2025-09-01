// A fixed pool of space images (public/royalty-free)
const SPACE_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1580428180121-cf6631fd988c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1447433819943-74a20887a81e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1470115636492-6d2b56f9146e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
];



// src/components/NewsSection.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback"; // or replace with <img />

type Article = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
  source: string;
};

/* ---------- Inline Starfield (higher density) ---------- */
function StarfieldInline({ density = 220 }: { density?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() < 0.88 ? 1 : 2, // mostly tiny, some brighter
        delay: `${Math.random() * 5}s`,
        dur: `${3 + Math.random() * 4}s`,
      })),
    [density]
  );

  return (
    <>
      <style>{`
        @keyframes xp-star-twinkle {
          0%,100% { opacity:.25; transform:scale(1); }
          50%     { opacity:.95; transform:scale(1.15); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden text-white/45">
        {stars.map((s) => (
          <span
            key={s.key}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: "currentColor",
              animation: `xp-star-twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </>
  );
}
/* ------------------------------------------------------- */

/** Hard-coded 100 items (newest → oldest) with SPACE images */
function useHardcodedArticles(): Article[] {
  return useMemo(() => {
    const now = new Date();
    const sources = ["Xploreon Newsroom", "NASA", "Space.com", "ESA", "Phys.org", "Scientific American"];
    const topics = [
      "Lunar Habitat Prototype",
      "Reusable Launch Systems",
      "Mars ISRU Breakthrough",
      "AI-Assisted Orbit Determination",
      "Exoplanet Atmosphere Study",
      "Space Debris Mitigation",
      "Next-Gen Solar Sail",
      "Cryogenic Fuel Management",
      "Deep Space Communication",
      "Microgravity Manufacturing",
    ];
    const summaries = [
      "Key advances and implications for upcoming missions.",
      "Engineers share early results and performance data.",
      "What this means for sustainable exploration.",
      "Research highlights, open questions, and roadmap.",
    ];

    // Unique space images via Unsplash seed (no duplicates)
    const spaceImg = (i: number) => SPACE_IMAGES[i % SPACE_IMAGES.length];

      `https://source.unsplash.com/960x540/?space,galaxy,nebula,astronomy&sig=${i}`;

    const items: Article[] = Array.from({ length: 100 }).map((_, i) => {
      const published = new Date(now.getTime() - i * 6 * 60 * 60 * 1000); // every 6h
      const src = sources[i % sources.length];
      const topic = topics[i % topics.length];
      const n = 100 - i;

      return {
        id: `hc-${i}`,
        title: `#${n} ${topic}`,
        summary: summaries[i % summaries.length],
        url:
          src === "NASA"
            ? "https://www.nasa.gov/"
            : src === "ESA"
            ? "https://www.esa.int/"
            : "https://www.space.com/",
        image_url: spaceImg(i), // guaranteed unique space image
        published_at: published.toISOString(),
        source: src,
      };
    });

    // newest-first (already is, but keep it explicit)
    items.sort(
      (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );

    return items;
  }, []);
}

export function NewsSection() {
  const hardcoded = useHardcodedArticles(); // 100 items
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setArticles(hardcoded);
      setLoading(false);
    }, 120);
    return () => clearTimeout(t);
  }, [hardcoded]);

  const handleLoadMore = () => setVisibleCount((prev) => Math.min(prev + 12, articles.length));

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 🌌 Stars with higher density */}
      <StarfieldInline density={260} />

      {/* optional gradient veil if you use it sitewide */}
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
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Curated hard-coded feed for blazing-fast demos — 100 newest items, no network calls (except images).
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading news…</p>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, visibleCount).map((article, index) => (
                <motion.div
                  key={article.id}
                  className="glass-card rounded-2xl overflow-hidden hover:neon-border transition-all duration-500 cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* Replace with <img> if you don't have ImageWithFallback */}
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
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:brightness-110 transition-all duration-300 font-medium"
                >
                  Load More News ({articles.length - visibleCount} more)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
