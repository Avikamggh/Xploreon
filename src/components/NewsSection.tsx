
import Starfield from "./Starfield"; // ⭐ add stars everywhere
// src/components/NewsSection.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback"; // or swap to <img />

type Article = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
  source: string;
};

// -------- inline starfield (no separate file needed) --------
function StarfieldInline({ density = 80 }: { density?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() < 0.85 ? 1 : 2,
        delay: `${Math.random() * 5}s`,
        dur: `${3 + Math.random() * 4}s`,
      })),
    [density]
  );

  return (
    <>
      {/* local keyframes so you don’t have to touch global CSS */}
      <style>{`
        @keyframes xp-star-twinkle {
          0%,100% { opacity:.25; transform:scale(1); }
          50%     { opacity:.9;  transform:scale(1.15); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden text-white/40">
        {stars.map(s => (
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
// ------------------------------------------------------------

export function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const noStore: RequestInit = { cache: "no-store" };
    const now = Date.now(); // bust RSS caches

    async function fetchJSON<T>(url: string) {
      const res = await fetch(url, noStore);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return (await res.json()) as T;
    }

    async function run() {
      setLoading(true);
      setErr(null);
      try {
        const results: Article[][] = await Promise.all([
          // Spaceflight News (newest-first)
          fetchJSON<any>(
            "https://api.spaceflightnewsapi.net/v4/articles/?limit=20&ordering=-published_at"
          ).then(data =>
            (data.results || []).map((a: any) => ({
              id: `sf-${a.id}`,
              title: a.title,
              summary: a.summary,
              url: a.url,
              image_url: a.image_url || "",
              published_at: a.published_at,
              source: a.news_site || "Spaceflight News",
            }))
          ),

          // Launch Library (upcoming, newest net first)
          fetchJSON<any>(
            "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&ordering=-net"
          ).then(data =>
            (data.results || []).map((l: any) => ({
              id: `ll-${l.id}`,
              title: `Upcoming Launch: ${l.name}`,
              summary: l.mission?.description || "Upcoming space mission.",
              url: l.url,
              image_url: l.image || "",
              published_at: l.net,
              source: "Launch Library",
            }))
          ),

          // NASA RSS (cache-busted)
          fetchJSON<any>(
            `https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss&_=${now}`
          ).then(data =>
            (data.items || []).slice(0, 12).map((n: any, i: number) => ({
              id: `nasa-${i}-${now}`,
              title: n.title,
              summary: n.description || "NASA breaking news update.",
              url: n.link,
              image_url: n.enclosure?.link || "",
              published_at: n.pubDate,
              source: "NASA",
            }))
          ),

          // Phys.org Physics (cache-busted)
          fetchJSON<any>(
            `https://api.rss2json.com/v1/api.json?rss_url=https://phys.org/rss-feed/physics-news/&_=${now}`
          ).then(data =>
            (data.items || []).slice(0, 12).map((p: any, i: number) => ({
              id: `phys-${i}-${now}`,
              title: p.title,
              summary: p.description || "Physics news update.",
              url: p.link,
              image_url: p.enclosure?.link || "",
              published_at: p.pubDate,
              source: "Phys.org",
            }))
          ),

          // Scientific American – Space (cache-busted)
          fetchJSON<any>(
            `https://api.rss2json.com/v1/api.json?rss_url=https://www.scientificamerican.com/feed/space/&_=${now}`
          ).then(data =>
            (data.items || []).slice(0, 12).map((s: any, i: number) => ({
              id: `sciam-${i}-${now}`,
              title: s.title,
              summary: s.description || "Scientific American space update.",
              url: s.link,
              image_url: s.enclosure?.link || "",
              published_at: s.pubDate,
              source: "Scientific American",
            }))
          ),
        ]);

        // Merge → require image → dedupe by image → newest first
        const merged = results.flat();

        const seenImages = new Set<string>();
        const withImages = merged.filter(a => {
          if (!a.image_url) return false;
          if (seenImages.has(a.image_url)) return false;
          seenImages.add(a.image_url);
          return true;
        });

        withImages.sort(
          (a, b) =>
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );

        if (!cancelled) setArticles(withImages);
      } catch (e: any) {
        console.error(e);
        if (!cancelled) setErr("News failed to load. Please refresh.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoadMore = () => setVisibleCount(prev => prev + 6);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* stars */}
      <StarfieldInline density={90} />

      {/* optional soft gradient overlay if you use it elsewhere */}
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
            Real-time updates on space exploration, physics breakthroughs, rockets, and missions worldwide.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading news…</p>
        ) : err ? (
          <div className="text-center text-red-300">{err}</div>
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
                    {/* If you don’t have ImageWithFallback, replace with a normal img */}
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
                      <span>
                        {isNaN(new Date(article.published_at).getTime())
                          ? article.published_at
                          : new Date(article.published_at).toLocaleDateString()}
                      </span>
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
