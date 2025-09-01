import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Competitions() {
  const [open, setOpen] = useState(false);

  const stripeLink = "https://buy.stripe.com/test_1234567890"; // 👉 replace with your real Stripe link

  const competitions = [
    {
      title: "Interplanetary Story Contest",
      desc: "Craft imaginative tales about life beyond Earth and interplanetary civilizations.",
    },
    {
      title: "AI Physics Challenge",
      desc: "Solve complex physics problems with the help of AI-driven insights.",
    },
    {
      title: "Saket On Innovation Contest",
      desc: "Push the boundaries of creativity with futuristic concepts and prototypes.",
    },
    {
      title: "Space Quiz",
      desc: "Test your knowledge about space, astronomy, and exploration missions.",
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Competitions at Xploreon
        </motion.h1>

        {/* Competitions List */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {competitions.map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg hover:shadow-cyan-500/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <h2 className="text-2xl font-semibold text-cyan-300">{c.title}</h2>
              <p className="mt-3 text-gray-300">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Golden Premium Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 px-5 py-3 rounded-xl font-bold
                   bg-gradient-to-r from-yellow-400 to-yellow-600 text-black
                   shadow-lg shadow-yellow-400/40 hover:scale-105 transition-transform"
      >
        Premium
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-900 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-yellow-500/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-yellow-400">
                Premium Plan
              </h2>
              <p className="mt-3 text-gray-300">
                Get exclusive access to advanced competitions and perks.
              </p>

              {/* Stripe Button */}
              <a
                href={stripeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-6 py-3 rounded-xl font-semibold
                           bg-gradient-to-r from-yellow-400 to-yellow-600 text-black
                           hover:scale-105 transition-transform shadow-lg shadow-yellow-500/30"
              >
                $18 / month – Subscribe
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
