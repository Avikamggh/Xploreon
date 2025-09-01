// src/components/NewsSection.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Globe } from "lucide-react";

type Article = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
  source: string;
};

/* ---------- Dense inline starfield (no extra files) ---------- */
function StarfieldInline({ density = 260 }: { density?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() < 0.9 ? 1 : 2,
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
/* ------------------------------------------------------------- */

/** Normalize image URL for dedupe (ignore query params/sizes) */
function imageKey(url: string) {
  try {
    const u = new URL(url);
    return `${u.origin}${u.pathname}`; // ignore ?query
  } catch {
    return url.split("?")[0];
  }
}

export function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    const opts: RequestInit = { cache: "no-store", signal: ac.signal };

    async function fetchJSON<T>(url: string): Promise<T> {
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
      return res.json() as Promise<T>;
    }

    async function run() {
      setLoading(true);
      setErr(null);
      try {
        // 1) Spaceflight News API v4 — articles, blogs, reports
        const sfnArticlesP = fetchJSON<any>(
          "https://api.spaceflightnewsapi.net/v4/articles/?limit=40&ordering=-published_at"
        );
        const sfnBlogsP = fetchJSON<any>(
          "https://api.spaceflightnewsapi.net/v4/blogs/?limit=25&ordering=-published_at"
        );
        const sfnReportsP = fetchJSON<any>(
          "https://api.spaceflightnewsapi.net/v4/reports/?limit=25&ordering=-published_at"
        );

        // 2) Launch Library — upcoming launches (many have images)
        const llUpcomingP = fetchJSON<any>(
          "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=20&ordering=-net"
        );

        const [sfnArticles, sfnBlogs, sfnReports, llUpcoming] = await Promise.all([
          sfnArticlesP,
          sfnBlogsP,
          sfnReportsP,
          llUpcomingP,
        ]);

        const list: Article[] = [
          ...(sfnArticles.results || []).map((a: any) => ({
            id: `sfa-${a.id}`,
            title: a.title,
            summary: a.summary || "",
            url: a.url,
            image_url: a.image_url || "",
            published_at: a.published_at,
            source: a.news_site || "Spaceflight News",
          })),
          ...(sfnBlogs.results || []).map((b: any) => ({
            id: `sfb-${b.id}`,
            title: b.title,
            summary: b.summary || "",
            url: b.url,
            image_url: b.image_url || "",
            published_at: b.published_at,
            source: b.news_site || "Spaceflight Blogs",
          })),
          ...(sfnReports.results || []).map((r: any) => ({
            id: `sfr-${r.id}`,
            title: r.title,
            summary: r.summary || "",
            url: r.url,
            image_url: r.image_url || "",
            published_at: r.published_at,
            source: r.news_site || "Spaceflight Reports",
          })),
          ...(llUpcoming.results || []).map((l: any) => ({
            id: `ll-${l.id}`,
            title: `Upcoming Launch: ${l.name}`,
            summary: l.mission?.description || "Upcoming space mission.",
            url: l.url,
            image_url: l.image || "",
            published_at: l.net,
            source: "Launch Library",
          })),
        ];

        // Filter: must have an image & dedupe by image URL (ignoring size params)
        const seen = new Set<string>();
        const withImages = list.filter((a) => {
          if (!a.image_url) return false;
          const key = imageKey(a.image_url);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        // Sort newest-first by published_at
        withImages.sort(
          (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );

        setArticles(withImages);
      } catch (e: any) {
        console.error(e);
        setErr("Couldn’t load news right now. Please refresh in a moment.");
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => ac.abort();
  }, []);

  const handleLoadMore = () =>
    setVisibleCount((prev) => Math.min(prev + 12, articles.length));

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 🌌 dense stars */}
      <StarfieldInline density={280} />
      {/* Optional site gradient veil if you use one */}
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
            Latest Space News
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Live feed from Spaceflight News & Launch Library. Images-only, deduped, newest first.
          </p>
        </motion.div>

        {/* Body */}
        {loading ? (
          <p className="text-center text-gray-400">Loading news…</p>
        ) : err ? (
          <div className="text-center text-red-300">{err}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, visibleCount).map((a, idx) => (
                <motion.article
                  key={a.id}
                  className="glass-card rounded-2xl overflow-hidden hover:neon-border transition-all duration-500 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48 overflow-hidden bg-black/30">
                    <img
                      src={a.image_url}
                      alt={a.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        // If an upstream image 404s later, hide this card’s image area
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="glass px-3 py-1 rounded-full text-xs font-medium text-cyan-400 flex items-center space-x-1">
                        <Globe className="w-4 h-4" />
                        <span>{a.source}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {isNaN(new Date(a.published_at).getTime())
                          ? a.published_at
                          : new Date(a.published_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-futuristic text-xl mb-3 text-white leading-tight group-hover:text-cyan-400 transition-colors">
                      {a.title}
                    </h3>

                    {a.summary && (
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {a.summary}
                      </p>
                    )}

                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors text-sm font-medium group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

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
