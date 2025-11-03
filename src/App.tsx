import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

type MoodType = "happy" | "sad" | "motivated" | "romantic" | "grateful";

interface MoodConfig {
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
  gradient: string;
  bgGradient: string;
  cardBorder: string;
  primary: string;
  secondary: string;
}

const moods: Record<MoodType, MoodConfig> = {
  happy: {
    emoji: "😊",
    label: "Happy",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    gradient: "from-yellow-400 to-orange-400",
    bgGradient: "from-yellow-50 via-amber-100 to-yellow-200",
    cardBorder: "border-yellow-300",
    primary: "text-yellow-700",
    secondary: "from-yellow-600 via-amber-500 to-yellow-600",
  },
  sad: {
    emoji: "🥺",
    label: "Sad",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    gradient: "from-blue-400 to-indigo-400",
    bgGradient: "from-blue-50 via-sky-100 to-blue-200",
    cardBorder: "border-blue-300",
    primary: "text-blue-700",
    secondary: "from-blue-600 via-cyan-500 to-blue-600",
  },
  motivated: {
    emoji: "💪",
    label: "Need Motivation",
    color: "text-green-600",
    bgColor: "bg-green-100",
    gradient: "from-green-400 to-emerald-400",
    bgGradient: "from-green-50 via-emerald-100 to-green-200",
    cardBorder: "border-green-300",
    primary: "text-green-700",
    secondary: "from-green-600 via-teal-500 to-green-600",
  },
  romantic: {
    emoji: "💕",
    label: "Romantic",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 via-rose-100 to-pink-200",
    cardBorder: "border-pink-300",
    primary: "text-pink-700",
    secondary: "from-pink-600 via-rose-500 to-pink-600",
  },
  grateful: {
    emoji: "🙏",
    label: "Grateful",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    gradient: "from-purple-400 to-pink-400",
    bgGradient: "from-purple-50 via-violet-100 to-purple-200",
    cardBorder: "border-purple-300",
    primary: "text-purple-700",
    secondary: "from-purple-600 via-fuchsia-500 to-purple-600",
  },
};

const messagesByMood: Record<
  MoodType,
  Array<{ title: string; message: string }>
> = {
  happy: [
    {
      title: "😊 Your Smile is Everything!",
      message:
        "Seeing you happy makes my whole world brighter! Keep that beautiful smile, sayang! 🌟✨",
    },
    {
      title: "� Happiness Looks Good On You!",
      message:
        "Senang melihatmu bahagia! Kamu layak mendapatkan semua kebahagiaan di dunia ini! 💖",
    },
    {
      title: "☀️ Sunshine and Smiles",
      message:
        "Your happiness is contagious! Thank you for bringing so much joy into my life! 🌈",
    },
    {
      title: "🌸 Happy Vibes Only!",
      message:
        "Aku suka banget lihat kamu tersenyum! Mari kita buat lebih banyak kenangan indah bersama! �",
    },
  ],
  sad: [
    {
      title: "🥺 I'm Here For You",
      message:
        "It's okay to feel sad, sayang. I'm always here to hold you and listen. You're not alone. 💙",
    },
    {
      title: "🤗 Peluk dari Jauh",
      message:
        "Aku tahu kamu sedang sedih. Ingat, setelah hujan pasti ada pelangi. Aku selalu di sisimu! 🌈",
    },
    {
      title: "� You're Stronger Than You Think",
      message:
        "Tidak apa-apa untuk tidak baik-baik saja. Take your time, sayang. Aku akan menunggumu. 🫂",
    },
    {
      title: "🌙 This Too Shall Pass",
      message:
        "Hari ini mungkin berat, tapi besok akan lebih baik. I promise to always be your comfort. 💕",
    },
  ],
  motivated: [
    {
      title: "💪 You're Absolutely Capable!",
      message:
        "Kamu bisa melakukan ini, sayang! Aku percaya pada kemampuanmu. Let's conquer the world together! �",
    },
    {
      title: "🔥 Semangat Terus Ya!",
      message:
        "Jangan menyerah! Setiap langkah kecil adalah progress. Aku bangga sama kamu! Keep going! 💫",
    },
    {
      title: "⭐ Believe in Yourself",
      message:
        "You have everything you need to succeed! Kamu amazing, smart, dan capable. Go get it! 🎯",
    },
    {
      title: "🌟 Kamu Champion!",
      message:
        "Tidak ada yang tidak mungkin untukmu! Push through, sayang. Your dreams are waiting! 💖✨",
    },
  ],
  romantic: [
    {
      title: "💕 You Are My Everything",
      message:
        "Every moment with you feels like a beautiful dream come true. You make my world brighter! ✨",
    },
    {
      title: "💗 My Love For You Grows",
      message:
        "Aku jatuh cinta padamu setiap hari, berulang kali. Kamu adalah rumahku, sayang. �💖",
    },
    {
      title: "� Forever and Always",
      message:
        "Distance means nothing when someone means everything. I love you more than words can say! 🥰",
    },
    {
      title: "💞 Kamu Cinta Sejatiku",
      message:
        "Dalam setiap detak jantungku, ada namamu. Thank you for being my person, my love. 💕✨",
    },
  ],
  grateful: [
    {
      title: "🙏 Thank You For Being You",
      message:
        "Aku sangat bersyukur memilikimu dalam hidupku. You're the best thing that ever happened to me! 💖",
    },
    {
      title: "✨ Grateful Every Day",
      message:
        "Setiap hari bersamamu adalah berkah. Thank you for all the love, patience, and joy you bring! 🌸",
    },
    {
      title: "🌺 Terima Kasih Sayang",
      message:
        "Thank you for accepting me as I am. You make me want to be a better person every day! 💕",
    },
    {
      title: "💝 Blessed to Have You",
      message:
        "Aku tidak tahu apa yang aku lakukan untuk pantas mendapatkanmu, but I'm so grateful you're mine! 🥰",
    },
  ],
};

function App() {
  const [currentMood, setCurrentMood] = useState<MoodType>("romantic");
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [showMoodMenu, setShowMoodMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const nextMessage = () => {
    const messages = messagesByMood[currentMood];
    setCurrentMessage((prev) => (prev + 1) % messages.length);
    setShowHearts(true);
    setClickCount((prev) => prev + 1);
    setTimeout(() => setShowHearts(false), 1000);
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    setCurrentMessage(0);
    setShowMoodMenu(false);
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 800);
  };

  const currentMessages = messagesByMood[currentMood];

  // Splash Screen
  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-300 flex items-center justify-center overflow-hidden relative">
        {/* Animated Background Hearts */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl sm:text-3xl md:text-4xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 0.6, 0],
                rotate: 360,
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 1.5,
                ease: "easeOut",
              }}
            >
              {
                ["💕", "💖", "💗", "💝", "🌸", "🦋"][
                  Math.floor(Math.random() * 6)
                ]
              }
            </motion.div>
          ))}
        </div>

        {/* Main Splash Content */}
        <div className="text-center z-10 px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
          >
            <motion.div
              className="text-6xl sm:text-7xl md:text-8xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                repeat: 1,
              }}
            >
              💖
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-3 px-4"
          >
            Welcome, My Love
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-pink-700 font-medium px-4"
          >
            My one and only ✨
          </motion.p>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-6"
          >
            <div className="flex justify-center gap-2 sm:gap-3">
              {["💕", "🌸", "💝", "🌸", "💕"].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl sm:text-3xl"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 2.2 + i * 0.1,
                    repeat: 2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="mt-8 text-pink-600 font-semibold text-sm sm:text-base"
          >
            Loading love... 💗
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${moods[currentMood].bgGradient} flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 overflow-hidden relative transition-colors duration-700`}>
      {/* Floating Hearts Background - Reduced for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl md:text-4xl"
            initial={{
              y: "100vh",
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              opacity: 0.15,
            }}
            animate={{
              y: "-100vh",
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: Math.random() * 8 + 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {
              ["💕", "💖", "💗", "💝", "💘", "🌸", "🌺", "🦋"][
                Math.floor(Math.random() * 8)
              ]
            }
          </motion.div>
        ))}
      </div>

      {/* Floating Mood Selector Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="fixed top-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setShowMoodMenu(!showMoodMenu)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            ${moods[currentMood].bgColor} ${moods[currentMood].color}
            w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18
            rounded-full shadow-2xl
            flex items-center justify-center
            border-4 border-white
            transition-all duration-300
            ${showMoodMenu ? "rotate-180" : "rotate-0"}
          `}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl">
            {moods[currentMood].emoji}
          </span>
        </motion.button>

        {/* Mood Menu Dropdown */}
        <span className="block my-6 py-4 sm:inline sm:my-8 sm:py-5"></span>
        <AnimatePresence>
          {showMoodMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMoodMenu(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              />

              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 sm:top-20 right-0 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 border-4 border-pink-200 min-w-[200px] sm:min-w-[240px]"
              >
                <p className="text-center text-sm sm:text-base font-bold text-pink-700 mb-4">
                  How are you feeling? 💭
                </p>

                <div className="space-y-2">
                  {(Object.keys(moods) as MoodType[]).map((mood) => (
                    <motion.button
                      key={mood}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoodChange(mood)}
                      className={`
                        w-full flex items-center gap-3 sm:gap-4
                        px-4 py-3 rounded-xl
                        transition-all duration-200
                        ${
                          currentMood === mood
                            ? `${moods[mood].bgColor} ${moods[mood].color} shadow-lg border-2 border-current`
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      <span className="text-2xl sm:text-3xl">
                        {moods[mood].emoji}
                      </span>
                      <span className="text-sm sm:text-base font-semibold flex-1 text-left">
                        {moods[mood].label}
                      </span>
                      {currentMood === mood && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-lg"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4"
        >
          <motion.h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${moods[currentMood].secondary} bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-lg leading-tight`}>
            For My Beautiful Love 💖
          </motion.h1>
          <motion.p
            className={`text-lg sm:text-xl md:text-2xl ${moods[currentMood].primary} font-medium px-2 opacity-90 h-10`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4 }}
          >
            A special place just for you ✨
          </motion.p>
        </motion.div>

        {/* Message Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentMood}-${currentMessage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-[2rem] shadow-2xl p-8 sm:p-12 md:p-16 lg:p-20 mb-8 sm:mb-12 pb-10 border-4 mx-2 sm:mx-3 ${moods[currentMood].cardBorder} relative overflow-hidden`}
          >
            <motion.h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${moods[currentMood].color} mb-14 sm:mb-16 md:mb-20 text-center px-2 leading-tight`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentMessages[currentMessage].title}
            </motion.h2>
            <div className="h-10 sm:h-14 md:h-20"></div>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 text-center leading-relaxed px-2 max-w-3xl mx-auto mb-14"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ lineHeight: "1.8" }}
            >
              {currentMessages[currentMessage].message}
            </motion.p>
            <div className="h-10 sm:h-14 md:h-20"></div>
            {/* Decorative elements */}
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-16 mb-6">
              {["💕", "🌸", "✨", "🌸", "💕"].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-3xl sm:text-4xl md:text-5xl"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Button */}
        <div className="text-center px-4 sm:px-6">
          <div className="h-5"></div>
          <motion.button
            onClick={nextMessage}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-r ${moods[currentMood].gradient} text-white font-bold text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white/50 w-full sm:w-auto max-w-xl backdrop-blur-sm`}
            style={{
              backgroundSize: "200% 100%",
              animation: "gradient 3s ease infinite",
            }}
          >
            <span className="block sm:inline">
              {moods[currentMood].emoji} Get More {moods[currentMood].label}{" "}
              Words {moods[currentMood].emoji}
            </span>
          </motion.button>
          <div className="h-5"></div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-pink-700 font-semibold"
          >
            You've received {clickCount} love message
            {clickCount !== 1 ? "s" : ""} 🥰
          </motion.p>
        </div>

        {/* Burst Hearts on Click - Reduced */}
        <AnimatePresence>
          {showHearts && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-3xl sm:text-4xl pointer-events-none"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `calc(50% + ${
                      Math.cos((i * 45 * Math.PI) / 180) * 150
                    }px)`,
                    y: `calc(50% + ${
                      Math.sin((i * 45 * Math.PI) / 180) * 150
                    }px)`,
                    scale: [0, 1.2, 0],
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    left: 0,
                    top: 0,
                  }}
                >
                  💖
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 px-4"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <p className="text-pink-600 font-bold text-base sm:text-lg md:text-xl drop-shadow-lg text-center">
          Made with 💕 just for you
        </p>
      </motion.div>
    </div>
  );
}

export default App;
