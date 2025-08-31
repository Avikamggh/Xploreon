import React, { useEffect, useState } from "react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  difficulty: string;
  videoUrl: string;
  objectives: string[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to Space Exploration",
    description: "Overview of space exploration history and future",
    icon: "🚀",
    duration: "6 min",
    difficulty: "Beginner",
    videoUrl: "https://www.youtube.com/embed/EiTpNvksK3k",
    objectives: [
      "Overview of space exploration history",
      "Major milestones in human space exploration",
      "The role of space exploration in advancing technology and science",
      "Future of space exploration (Mars missions, commercial spaceflight)",
    ],
  },
  {
    id: 2,
    title: "Basic Principles of Rocket Science",
    description: "Introduction to rocketry and propulsion fundamentals",
    icon: "🛰️",
    duration: "13 min",
    difficulty: "Beginner",
    videoUrl: "https://www.youtube.com/embed/PryV-565RtI",
    objectives: [
      "Introduction to rocketry and propulsion",
      "Newton's Laws of Motion",
      "Basic concepts of thrust, gravity, and drag",
      "Types of rockets and their components",
    ],
  },
  // ... include all 14 lessons here (same as before)
];

export default function LearningPage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [certificateModal, setCertificateModal] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("xploreon_completed") || "[]");
    setCompleted(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("xploreon_completed", JSON.stringify(completed));
    setProgress(Math.round((completed.length / lessons.length) * 100));
    if (completed.length === lessons.length) {
      setCertificateModal(true);
    }
  }, [completed]);

  const handleLessonClick = (lesson: Lesson) => {
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex > 0 && !completed.includes(lessons[currentIndex - 1].id)) {
      alert("Complete the previous lesson first!");
      return;
    }
    setActiveLesson(lesson);
  };

  const toggleComplete = (id: number) => {
    if (!completed.includes(id)) {
      setCompleted((prev) => [...prev, id]);
    }
    setActiveLesson(null);
  };

  const handleCertificateDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Certificate of Completion\n\nThis certifies that ${userName} has successfully completed the Xploreon Learning Program.`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "certificate.txt"; // could be PDF with jsPDF, keeping simple here
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2a] to-[#0a1a3a] text-white px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-lg">
          🚀 Space Explorer Learning
        </h1>
        <p className="text-lg opacity-80">
          Unlock the universe step by step — finish all lessons to earn your certificate
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Progress</span>
          <span className="text-sm">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Lessons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const index = lessons.findIndex((l) => l.id === lesson.id);
          const locked =
            index > 0 && !completed.includes(lessons[index - 1].id);

          return (
            <div
              key={lesson.id}
              className={`p-5 rounded-2xl border transition-all ${
                completed.includes(lesson.id)
                  ? "border-green-400 bg-green-900/30"
                  : locked
                  ? "border-gray-600 bg-black/20 opacity-50 cursor-not-allowed"
                  : "border-cyan-400/30 bg-black/30 hover:border-cyan-400 cursor-pointer"
              }`}
              onClick={() => !locked && handleLessonClick(lesson)}
            >
              <div className="text-4xl mb-3">{lesson.icon}</div>
              <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
              <p className="text-sm opacity-80 mb-2">{lesson.description}</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{lesson.duration}</span>
                <span>{lesson.difficulty}</span>
              </div>
              <div className="mt-3 text-sm">
                {completed.includes(lesson.id)
                  ? "✅ Completed"
                  : locked
                  ? "🔒 Locked"
                  : "▶ Watch"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Player Modal */}
      {activeLesson && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a1a] p-6 rounded-2xl max-w-3xl w-full relative">
            <button
              onClick={() => setActiveLesson(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">{activeLesson.title}</h2>
            <iframe
              className="w-full h-64 md:h-96 rounded-lg mb-4"
              src={activeLesson.videoUrl}
              title={activeLesson.title}
              allowFullScreen
            />
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4">
              {activeLesson.objectives.map((o, idx) => (
                <li key={idx}>{o}</li>
              ))}
            </ul>
            <button
              onClick={() => toggleComplete(activeLesson.id)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
            >
              {completed.includes(activeLesson.id)
                ? "Mark Completed"
                : "Complete Lesson"}
            </button>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {certificateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a1a] p-6 rounded-2xl max-w-lg w-full relative text-center">
            <h2 className="text-2xl font-bold mb-4">🎓 Congratulations!</h2>
            <p className="mb-4 text-gray-300">
              You have completed all 14 lessons. Enter your name to generate your certificate.
            </p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mb-4 px-3 py-2 rounded-lg bg-black/40 border border-cyan-400/30 text-white"
            />
            <button
              onClick={handleCertificateDownload}
              disabled={!userName}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:opacity-50"
            >
              Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
