import React, { useState, useEffect } from "react";

// ---------- Types ----------
type Course = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  isFree: boolean;
  duration: string;
  level: string;
  videos: { id: number; title: string; url: string; duration: string }[];
};

// ---------- Sample Data ----------
const courses: Course[] = [
  {
    id: 1,
    name: "Space Web Development Fundamentals",
    description: "Master the basics of web development with our comprehensive free course",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop",
    price: 0,
    isFree: true,
    duration: "8 hours",
    level: "Beginner",
    videos: [
      { id: 1, title: "Introduction to Web Development", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", duration: "15:30" },
      { id: 2, title: "HTML Fundamentals", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", duration: "25:45" },
      { id: 3, title: "CSS Basics and Styling", url: "", duration: "30:20" },
      { id: 4, title: "CSS Flexbox and Grid", url: "", duration: "35:10" },
      { id: 5, title: "JavaScript Fundamentals", url: "", duration: "40:15" },
      { id: 6, title: "DOM Manipulation", url: "", duration: "28:30" },
      { id: 7, title: "Events and Interactivity", url: "", duration: "32:45" },
      { id: 8, title: "Responsive Design Principles", url: "", duration: "27:20" },
      { id: 9, title: "Introduction to APIs", url: "", duration: "22:15" },
      { id: 10, title: "Local Storage and Session Storage", url: "", duration: "18:40" },
      { id: 11, title: "Form Handling and Validation", url: "", duration: "25:55" },
      { id: 12, title: "Introduction to Git and GitHub", url: "", duration: "30:30" },
      { id: 13, title: "Deployment and Hosting", url: "", duration: "20:25" },
      { id: 14, title: "Project: Building Your First Website", url: "", duration: "45:00" }
    ]
  },
  {
    id: 2,
    name: "Advanced React Mastery",
    description: "Deep dive into React with hooks, context, and advanced patterns",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    price: 2999,
    isFree: false,
    duration: "12 hours",
    level: "Advanced",
    videos: [
      { id: 1, title: "Advanced React Hooks", url: "", duration: "45:30" },
      { id: 2, title: "Context API Deep Dive", url: "", duration: "35:20" },
      { id: 3, title: "Performance Optimization", url: "", duration: "50:15" }
    ]
  },
  {
    id: 3,
    name: "Cosmic JavaScript Algorithms",
    description: "Master data structures and algorithms with space-themed examples",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=250&fit=crop",
    price: 4499,
    isFree: false,
    duration: "20 hours",
    level: "Intermediate",
    videos: [
      { id: 1, title: "Big O Notation", url: "", duration: "30:45" },
      { id: 2, title: "Arrays and Strings", url: "", duration: "40:20" },
      { id: 3, title: "Linked Lists", url: "", duration: "35:10" }
    ]
  },
  {
    id: 4,
    name: "Stellar UI/UX Design",
    description: "Create beautiful and intuitive user interfaces",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=250&fit=crop",
    price: 3499,
    isFree: false,
    duration: "15 hours",
    level: "Beginner",
    videos: [
      { id: 1, title: "Design Principles", url: "", duration: "25:30" },
      { id: 2, title: "Color Theory", url: "", duration: "30:45" },
      { id: 3, title: "Typography", url: "", duration: "28:20" }
    ]
  },
  {
    id: 5,
    name: "Galactic Node.js Backend",
    description: "Build scalable backend applications with Node.js",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    price: 5999,
    isFree: false,
    duration: "25 hours",
    level: "Advanced",
    videos: [
      { id: 1, title: "Node.js Fundamentals", url: "", duration: "40:15" },
      { id: 2, title: "Express.js Framework", url: "", duration: "45:30" },
      { id: 3, title: "Database Integration", url: "", duration: "50:20" }
    ]
  }
];

// ---------- Certificate Component ----------
const Certificate: React.FC<{ courseName: string; userName: string; onClose: () => void }> = ({ 
  courseName, 
  userName, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-2xl max-w-2xl w-full relative border-2 border-yellow-400">
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="text-white hover:text-yellow-400 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-yellow-400">🏆 CERTIFICATE</h2>
            <p className="text-xl text-blue-200">OF COMPLETION</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-white">This is to certify that</p>
            <h3 className="text-3xl font-bold text-yellow-400 border-b-2 border-yellow-400 pb-2">
              {userName}
            </h3>
            <p className="text-lg text-white">has successfully completed</p>
            <h4 className="text-2xl font-semibold text-blue-200">
              {courseName}
            </h4>
          </div>
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-blue-700">
            <div className="text-center">
              <p className="text-sm text-blue-300">Date</p>
              <p className="font-semibold text-white">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-6xl">🚀</div>
            <div className="text-center">
              <p className="text-sm text-blue-300">Instructor</p>
              <p className="font-semibold text-white">Space Academy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Course Modal Component ----------
const CourseModal: React.FC<{
  course: Course;
  onClose: () => void;
}> = ({ course, onClose }) => {
  const [completed, setCompleted] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [videoProgress, setVideoProgress] = useState<{[key: number]: {
    watchedTime: number;
    totalTime: number;
    skippingDetected: boolean;
    playbackRateViolations: number;
    lastCurrentTime: number;
    startTime: number;
  }}>({});
  const [isVideoValid, setIsVideoValid] = useState<boolean>(true);

  // Initialize video tracking when a video is selected
  useEffect(() => {
    if (currentVideo && !videoProgress[currentVideo]) {
      setVideoProgress(prev => ({
        ...prev,
        [currentVideo]: {
          watchedTime: 0,
          totalTime: 0,
          skippingDetected: false,
          playbackRateViolations: 0,
          lastCurrentTime: 0,
          startTime: Date.now()
        }
      }));
      setIsVideoValid(true);
    }
  }, [currentVideo]);

  const handleVideoProgress = (videoId: number, currentTime: number, duration: number, playbackRate: number) => {
    setVideoProgress(prev => {
      const current = prev[videoId] || {
        watchedTime: 0,
        totalTime: duration,
        skippingDetected: false,
        playbackRateViolations: 0,
        lastCurrentTime: 0,
        startTime: Date.now()
      };

      // Detect skipping (jumping ahead more than 3 seconds)
      const timeDiff = currentTime - current.lastCurrentTime;
      let skippingDetected = current.skippingDetected;
      if (timeDiff > 3 && current.lastCurrentTime > 0) {
        skippingDetected = true;
      }

      // Detect excessive playback rate (more than 1.5x)
      let playbackRateViolations = current.playbackRateViolations;
      if (playbackRate > 1.5) {
        playbackRateViolations += 1;
      }

      // Calculate actual watched time (only count sequential watching)
      let watchedTime = current.watchedTime;
      if (timeDiff > 0 && timeDiff <= 2 && playbackRate <= 1.5) {
        watchedTime += timeDiff;
      }

      const newProgress = {
        watchedTime,
        totalTime: duration,
        skippingDetected,
        playbackRateViolations,
        lastCurrentTime: currentTime,
        startTime: current.startTime
      };

      // Update video validity
      const minWatchTime = duration * 0.85; // Must watch at least 85% sequentially
      const maxPlaybackViolations = Math.floor(duration / 60) * 2; // Allow 2 violations per minute
      const minSessionTime = duration * 0.7 * 1000; // Minimum time spent should be 70% of video duration
      const actualSessionTime = Date.now() - current.startTime;

      const isValid = !skippingDetected && 
                     playbackRateViolations <= maxPlaybackViolations &&
                     watchedTime >= minWatchTime &&
                     actualSessionTime >= minSessionTime;

      setIsVideoValid(isValid);

      return {
        ...prev,
        [videoId]: newProgress
      };
    });
  };

  const handleVideoEnd = (videoId: number) => {
    const progress = videoProgress[videoId];
    if (progress && isVideoValid) {
      // Additional final validation
      const watchPercentage = (progress.watchedTime / progress.totalTime) * 100;
      const sessionTime = Date.now() - progress.startTime;
      const minimumSessionTime = progress.totalTime * 0.7 * 1000; // 70% of video duration in milliseconds

      if (watchPercentage >= 85 && 
          !progress.skippingDetected && 
          progress.playbackRateViolations <= Math.floor(progress.totalTime / 60) * 2 &&
          sessionTime >= minimumSessionTime) {
        
        if (!completed.includes(videoId)) {
          setCompleted([...completed, videoId]);
          
          // Check if all videos are completed
          if (completed.length + 1 === course.videos.length) {
            setTimeout(() => setShowForm(true), 1000);
          }
        }
        setCurrentVideo(null);
      } else {
        // Video not properly watched, show warning
        alert("⚠️ Video completion not valid. Please watch the video completely without skipping or excessive fast-forwarding to unlock the next lesson.");
      }
    } else {
      alert("⚠️ Video completion not valid. Please watch the video completely without skipping or excessive fast-forwarding to unlock the next lesson.");
    }
  };

  const handleFormSubmit = () => {
    if (!userInfo.name || !userInfo.email) return;
    // Here you would typically send the data to your backend
    console.log("User info submitted:", userInfo);
    setShowForm(false);
    setShowCertificate(true);
  };

  const totalVideos = course.videos.length;
  const progress = (completed.length / totalVideos) * 100;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-40">
        <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative border border-purple-500">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-purple-500">
            <div>
              <h2 className="text-2xl font-bold text-white">{course.name}</h2>
              <p className="text-blue-300">{course.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-red-400 text-3xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Progress Bar */}
          <div className="p-6 pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-blue-300">Course Progress</span>
              <span className="text-sm font-semibold text-yellow-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-auto max-h-[60vh]">
            {/* Video Player */}
            <div className="lg:col-span-2">
              {currentVideo ? (
                <div className="space-y-4">
                  <div className="bg-black rounded-xl overflow-hidden aspect-video relative">
                    <video
                      className="w-full h-full"
                      controls
                      controlsList="nodownload nofullscreen noremoteplayback"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click menu
                      onTimeUpdate={(e) => {
                        const video = e.target as HTMLVideoElement;
                        handleVideoProgress(currentVideo, video.currentTime, video.duration, video.playbackRate);
                      }}
                      onEnded={() => handleVideoEnd(currentVideo)}
                      onRateChange={(e) => {
                        const video = e.target as HTMLVideoElement;
                        if (video.playbackRate > 2.0) {
                          video.playbackRate = 2.0; // Limit maximum playback rate
                        }
                      }}
                      onSeeking={(e) => {
                        const video = e.target as HTMLVideoElement;
                        // You could add additional seeking restrictions here if needed
                      }}
                      key={currentVideo} // Force re-render when video changes
                    >
                      <source src={course.videos.find((v) => v.id === currentVideo)?.url || "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Overlay Info */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                      <h4 className="text-white text-sm font-medium">
                        {course.videos.find((v) => v.id === currentVideo)?.title}
                      </h4>
                      <p className="text-blue-300 text-xs">
                        {course.videos.find((v) => v.id === currentVideo)?.duration}
                      </p>
                    </div>

                    {/* Validation Status */}
                    <div className={`absolute top-4 right-4 px-3 py-2 rounded-lg text-xs font-medium ${
                      isVideoValid 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    } backdrop-blur-sm`}>
                      {isVideoValid ? '✓ Valid Viewing' : '⚠️ Invalid Viewing'}
                    </div>

                    {/* Progress Information */}
                    {videoProgress[currentVideo] && (
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white">
                        <div>Sequential Watch: {Math.round((videoProgress[currentVideo].watchedTime / (videoProgress[currentVideo].totalTime || 1)) * 100)}%</div>
                        {videoProgress[currentVideo].skippingDetected && (
                          <div className="text-red-400">⚠️ Skipping Detected</div>
                        )}
                        {videoProgress[currentVideo].playbackRateViolations > 0 && (
                          <div className="text-yellow-400">⚠️ Speed Violations: {videoProgress[currentVideo].playbackRateViolations}</div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4 border border-purple-500/30">
                    <h4 className="text-white font-semibold mb-2">📖 Learning Guidelines</h4>
                    <ul className="text-blue-200 text-sm space-y-1">
                      <li>• Watch at least 85% of the video sequentially</li>
                      <li>• Maximum playback speed: 2.0x</li>
                      <li>• Skipping ahead will invalidate completion</li>
                      <li>• Video will auto-complete when properly watched</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-800/20 to-blue-800/20 rounded-xl h-64 flex items-center justify-center border border-purple-500/30">
                  <div className="text-center space-y-2">
                    <div className="text-4xl mb-4">🚀</div>
                    <p className="text-blue-300 text-lg">Select a video to start your journey</p>
                    <p className="text-blue-400 text-sm">Videos are automatically tracked for completion</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white flex items-center">
                <span className="mr-2">📚</span> Course Schedule
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {course.videos.map((video, index) => {
                  const isUnlocked = index === 0 || completed.includes(course.videos[index - 1].id);
                  const isCompleted = completed.includes(video.id);
                  return (
                    <div
                      key={video.id}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isUnlocked 
                          ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/50 hover:from-purple-600/30 hover:to-blue-600/30" 
                          : "bg-gray-700/30 border-gray-600 opacity-50"
                      }`}
                      onClick={() => isUnlocked && !isCompleted && setCurrentVideo(video.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${isCompleted ? "line-through text-gray-400" : "text-white"}`}>
                            {video.title}
                          </h4>
                          <p className="text-xs text-blue-300 mt-1">{video.duration}</p>
                        </div>
                        <div className="ml-2">
                          {isCompleted ? (
                            <span className="text-green-400 text-lg">✅</span>
                          ) : isUnlocked ? (
                            <span className="text-blue-400 text-lg">▶️</span>
                          ) : (
                            <span className="text-gray-500 text-lg">🔒</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-2xl max-w-md w-full border-2 border-yellow-400">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">Congratulations!</h3>
              <p className="text-blue-200">You've completed the course! Please provide your details to receive your certificate.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <button
                onClick={handleFormSubmit}
                disabled={!userInfo.name || !userInfo.email}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get My Certificate 🏆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <Certificate 
          courseName={course.name} 
          userName={userInfo.name} 
          onClose={() => setShowCertificate(false)} 
        />
      )}
    </>
  );
};

// ---------- Main Learning Page ----------
const LearningPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "free" && course.isFree) || 
                         (filter === "paid" && !course.isFree);
    return matchesSearch && matchesFilter;
  });

  // Create starfield background
  useEffect(() => {
    const createStars = () => {
      const stars = [];
      for (let i = 0; i < 100; i++) {
        stars.push(
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        );
      }
      return stars;
    };
    
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-12 px-6">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          🚀 Space Academy
        </h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Embark on an intergalactic journey of learning. Master the skills of tomorrow in our cosmic classroom.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search courses across the galaxy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 bg-gray-800/50 border border-purple-500 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:border-yellow-400 backdrop-blur-sm"
            />
            <div className="absolute right-4 top-4 text-blue-400">🔍</div>
          </div>
          
          <div className="flex gap-2">
            {(["all", "free", "paid"] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === filterType
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-gray-800/50 text-blue-300 hover:bg-gray-700/50 border border-purple-500/30"
                } backdrop-blur-sm`}
              >
                {filterType === "all" ? "All Courses" : filterType === "free" ? "🆓 Free" : "💎 Premium"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-gray-800/40 to-purple-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/30 hover:border-purple-400/70 shadow-2xl hover:shadow-purple-500/25">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    {course.isFree ? (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        FREE 🎉
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{course.price.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Course Level */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/60 backdrop-blur-sm text-blue-300 px-3 py-1 rounded-full text-sm">
                      {course.level}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-blue-200 text-sm mt-2 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-blue-300">
                    <span className="flex items-center">
                      <span className="mr-1">⏱️</span> {course.duration}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">📹</span> {course.videos.length} lectures
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105">
                    {course.isFree ? "Start Learning 🚀" : "View Course 👁️"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default LearningPage;
