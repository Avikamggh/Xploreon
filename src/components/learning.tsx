import React, { useState } from "react";
import { useParams } from "react-router-dom";

// ---------- Types ----------
type Course = {
  id: number;
  name: string;
  image: string;
  price: number;
  videos: { id: number; title: string; url: string }[];
  isFree: boolean;
};

// ---------- Sample Data ----------
const courses: Course[] = [
  {
    id: 1,
    name: "React Basics",
    image: "https://via.placeholder.com/150",
    price: 499,
    isFree: false,
    videos: [
      { id: 1, title: "Intro to React", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 2, title: "Components & Props", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 3, title: "State & Hooks", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
    ],
  },
  {
    id: 2,
    name: "Tailwind Mastery",
    image: "https://via.placeholder.com/150",
    price: 799,
    isFree: false,
    videos: [
      { id: 1, title: "Intro to Tailwind", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 2, title: "Utility Classes", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
    ],
  },
  {
    id: 3,
    name: "JavaScript Fundamentals",
    image: "https://via.placeholder.com/150",
    price: 0,
    isFree: true,
    videos: [
      { id: 1, title: "Intro to JavaScript", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 2, title: "Variables and Data Types", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 3, title: "Functions and Loops", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 4, title: "Objects and Arrays", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 5, title: "ES6 Features", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 6, title: "Async Programming", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 7, title: "Error Handling", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 8, title: "DOM Manipulation", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 9, title: "Event Listeners", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 10, title: "Local Storage", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 11, title: "Fetching Data", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 12, title: "DOM Traversal", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 13, title: "JSON Manipulation", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 14, title: "Final Project", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
    ],
  },
];

// ---------- Course Listing Page ----------
export const LearningPage: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0a0a0a] min-h-screen">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`border rounded-2xl shadow-lg p-4 flex flex-col items-center cursor-pointer bg-[#1e1e1e] transform hover:scale-105 transition-all duration-500 ${course.isFree ? 'bg-gradient-to-r from-indigo-500 to-blue-600' : 'bg-gradient-to-r from-red-500 to-orange-600'}`}
        >
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h2 className="text-lg font-bold text-white">{course.name}</h2>
          <p className="text-[#2A4D9B] font-semibold">
            {course.isFree ? "Free" : `₹${course.price}`}
          </p>
          <Link
            to={`/learning/${course.id}`}
            className="mt-4 text-white px-4 py-2 bg-[#2A4D9B] rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Course
          </Link>
        </div>
      ))}
    </div>
  );
};

// ---------- Course Details Page ----------
export const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Explicitly typing the id as string
  const course = courses.find((c) => c.id === Number(id)); // Handle conversion to number
  
  const [completed, setCompleted] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const [showCertificateForm, setShowCertificateForm] = useState(false);

  if (!course) return <p className="p-6 text-white">Course not found</p>;

  const handleComplete = (videoId: number) => {
    if (!completed.includes(videoId)) {
      setCompleted([...completed, videoId]);
    }
    setCurrentVideo(null);
    if (completed.length + 1 === course.videos.length) {
      setShowCertificateForm(true);
    }
  };

  const totalVideos = course.videos.length;
  const progress = (completed.length / totalVideos) * 100;

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
      <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
        <div
          className="h-3 rounded-full bg-[#2A4D9B]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {currentVideo ? (
            <div className="space-y-4">
              <video
                key={currentVideo}
                controls
                autoPlay
                onEnded={() => handleComplete(currentVideo)}
                className="w-full rounded-xl shadow"
              >
                <source src={course.videos.find((v) => v.id === currentVideo)?.url} type="video/mp4" />
              </video>
              <p className="text-center">Video {currentVideo} completed.</p>
            </div>
          ) : (
            <p className="text-gray-500">Select a video to start learning.</p>
          )}
        </div>
        <div>
          <h2 className="font-semibold mb-2">Course Schedule</h2>
          <ul className="space-y-2">
            {course.videos.map((video, index) => {
              const isUnlocked = index === 0 || completed.includes(video.id - 1);
              const isCompleted = completed.includes(video.id);
              return (
                <li
                  key={video.id}
                  className={`p-3 rounded-xl border flex justify-between items-center ${
                    isUnlocked ? "bg-white cursor-pointer hover:bg-[#3FA9F5] hover:text-white" : "bg-gray-200 opacity-50"
                  }`}
                  onClick={() => isUnlocked && !isCompleted && setCurrentVideo(video.id)}
                >
                  <span className={`${isCompleted ? "line-through text-gray-500" : "text-[#0B0F1A]"}`}>{video.title}</span>
                  {isCompleted ? <span className="text-green-600 font-semibold">Done</span> : isUnlocked ? "▶️" : "🔒"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {showCertificateForm && (
        <div className="mt-6 p-4 bg-[#2A4D9B] rounded-lg text-white">
          <h3 className="font-semibold text-lg mb-4">Course Completed!</h3>
          <p className="mb-4">Please enter your email to receive your certificate.</p>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
