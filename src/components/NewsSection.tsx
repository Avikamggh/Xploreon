import React, { useEffect, useState } from "react";
import { Calendar, ArrowRight, Globe, Loader, RefreshCw } from "lucide-react";

type Article = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
  source: string;
};

// Fallback images for when article images fail to load
const fallbackImages = [
  "https://images.unsplash.com/photo-1580428180121-cf6631fd988c?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1447433819943-74a20887a81e?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&w=1080&q=80",
  "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&w=1080&q=80",
];

// Image component with fallback
const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  className: string;
}> = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && src) {
      setHasError(true);
      const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
      setImgSrc(randomFallback);
    }
  };

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <img
      src={imgSrc || fallbackImages[0]}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

// Starfield component
const Starfield: React.FC = () => {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    animationDelay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
};

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allArticles: Article[] = [];

      // 1. Spaceflight News API - Most reliable for space news
      try {
        const spaceflightRes = await fetch(
          'https://api.spaceflightnewsapi.net/v4/articles/?limit=25&ordering=-published_at',
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );
        
        if (spaceflightRes.ok) {
          const spaceflightData = await spaceflightRes.json();
          const spaceflightArticles = spaceflightData.results.map((article: any) => ({
            id: `spaceflight-${article.id}`,
            title: article.title,
            summary: article.summary || 'Space news update from Spaceflight News.',
            url: article.url,
            image_url: article.image_url || '',
            published_at: article.published_at,
            source: article.news_site || 'Spaceflight News'
          }));
          allArticles.push(...spaceflightArticles);
        }
      } catch (err) {
        console.warn('Spaceflight News API failed:', err);
      }

      // 2. Launch Library API for upcoming launches
      try {
        const launchRes = await fetch(
          'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=15&ordering=net',
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );
        
        if (launchRes.ok) {
          const launchData = await launchRes.json();
          const launchArticles = launchData.results.map((launch: any) => ({
            id: `launch-${launch.id}`,
            title: `Upcoming Launch: ${launch.name}`,
            summary: launch.mission?.description || `${launch.launch_service_provider?.name || 'Space agency'} is preparing to launch ${launch.rocket?.configuration?.name || 'a rocket'}.`,
            url: launch.url || `https://thespacedevs.com/launch/${launch.id}`,
            image_url: launch.image || launch.rocket?.configuration?.image_url || '',
            published_at: launch.net,
            source: launch.launch_service_provider?.name || 'Launch Library'
          }));
          allArticles.push(...launchArticles.slice(0, 10)); // Limit launches
        }
      } catch (err) {
        console.warn('Launch Library API failed:', err);
      }

      // 3. Try NASA RSS via RSS2JSON
      try {
        const nasaRes = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss&api_key=your_api_key&count=15`
        );
        
        if (nasaRes.ok) {
          const nasaData = await nasaRes.json();
          if (nasaData.status === 'ok' && nasaData.items) {
            const nasaArticles = nasaData.items.map((item: any, index: number) => ({
              id: `nasa-${Date.now()}-${index}`,
              title: item.title,
              summary: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || 'NASA news update.',
              url: item.link,
              image_url: item.thumbnail || item.enclosure?.link || '',
              published_at: item.pubDate,
              source: 'NASA'
            }));
            allArticles.push(...nasaArticles);
          }
        }
      } catch (err) {
        console.warn('NASA RSS failed:', err);
      }

      // 4. Alternative: Try a different RSS service
      try {
        const physRes = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://phys.org/rss-feed/space-news/&count=10`
        );
        
        if (physRes.ok) {
          const physData = await physRes.json();
          if (physData.status === 'ok' && physData.items) {
            const physArticles = physData.items.map((item: any, index: number) => ({
              id: `phys-${Date.now()}-${index}`,
              title: item.title,
              summary: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || 'Physics and space news.',
              url: item.link,
              image_url: item.thumbnail || '',
              published_at: item.pubDate,
              source: 'Phys.org'
            }));
            allArticles.push(...physArticles);
          }
        }
      } catch (err) {
        console.warn('Phys.org RSS failed:', err);
      }

      // Filter out articles without images and duplicates
      const seen = new Set<string>();
      const uniqueArticles = allArticles.filter(article => {
        // Skip if no image and no fallback will work
        if (!article.image_url && !fallbackImages.length) return false;
        
        // Check for duplicates by URL or title
        const key = article.url + '|' + article.title;
        if (seen.has(key)) return false;
        seen.add(key);
        
        return true;
      });

      // Sort by date (newest first)
      uniqueArticles.sort((a, b) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

      if (uniqueArticles.length === 0) {
        throw new Error('No articles could be fetched from any news source');
      }

      setArticles(uniqueArticles);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => setVisibleCount(prev => prev + 6);
  const handleRefresh = () => fetchNews();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Latest Space & Physics News
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time updates from NASA, SpaceX, and leading space agencies worldwide
          </p>
          
          {/* Refresh button and last updated */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg transition-colors text-blue-300 hover:text-blue-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh News
            </button>
            {lastUpdated && (
              <span className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {loading && articles.length === 0 ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
            <p className="text-gray-400">Fetching latest space news...</p>
          </div>
        ) : error && articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, visibleCount).map((article, index) => (
                <div
                  key={article.id}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-500 cursor-pointer group hover:transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-cyan-400 flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>{article.source}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    </div>

                    <h4 className="text-xl font-semibold mb-3 text-white leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors text-sm font-medium group/link"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < articles.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-medium text-white"
                >
                  Load More News ({articles.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Total articles count */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Showing {Math.min(visibleCount, articles.length)} of {articles.length} articles
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
