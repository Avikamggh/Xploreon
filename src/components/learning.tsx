import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

// ---------- Types ----------
type Course = {
  id: number;
  name: string;
  image: string;
  price: number;
  videos: { id: number; title: string; url: string }[];
};

// ---------- Sample Data ----------
const courses: Course[] = [
  {
    id: 1,
    name: "React Basics",
    image: "https://via.placeholder.com/150",
    price: 499,
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
    videos: [
      { id: 1, title: "Intro to Tailwind", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
      { id: 2, title: "Utility Classes", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
    ],
  },
];

// ---------- Course Listing Page ----------
const LearningPage: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#F4F6FA] min-h-screen">
      {courses.map((course) => (
        <Link
          key={course.id}
          to={`/learning/${course.id}`}
          className="border rounded-2xl shadow hover:shadow-lg p-4 flex flex-col items-center cursor-pointer bg-white"
        >
          <img src={course.image} alt={course.name} className="w-full h-40 object-cover rounded-xl mb-4" />
          <h2 className="text-lg font-bold text-[#0B0F1A]">{course.name}</h2>
          <p className="text-[#2A4D9B] font-semibold">₹{course.price}</p>
        </Link>
      ))}
    </div>
  );
};

// ---------- Course Details Page ----------
const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Explicitly typing the id as string
  const course = courses.find((c) => c.id === Number(id)); // Handle conversion to number
  
  const [completed, setCompleted] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);

  if (!course) return <p className="p-6">Course not found</p>;

  const handleComplete = (videoId: number) => {
    if (!completed.includes(videoId)) {
      setCompleted([...completed, videoId]);
    }
    setCurrentVideo(null);
  };

  const totalVideos = course.videos.length;
  const progress = (completed.length / totalVideos) * 100;

  return (
    <div className="p-6 bg-[#F4F6FA] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#0B0F1A]">{course.name}</h1>
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
              <p className="text-center text-[#0B0F1A]">Video {currentVideo} completed when finished.</p>
            </div>
          ) : (
            <p className="text-gray-500">Select a video to start learning.</p>
          )}
        </div>
        <div>
          <h2 className="font-semibold mb-2 text-[#0B0F1A]">Course Schedule</h2>
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
    </div>
  );
};

export default LearningPage;  // Ensure this is a default export
