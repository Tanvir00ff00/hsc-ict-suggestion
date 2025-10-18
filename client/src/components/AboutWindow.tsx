import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Facebook, GraduationCap, Heart, BookOpen, Code, Award, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutWindow({ isOpen, onClose }: AboutWindowProps) {
  const [showAuto, setShowAuto] = useState(false);

  // Auto show for 5 seconds on first visit only
  useEffect(() => {
    const hasShown = localStorage.getItem('about-window-shown');
    
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShowAuto(true);
        localStorage.setItem('about-window-shown', 'true');
      }, 2000); // Show after 2 seconds

      const hideTimer = setTimeout(() => {
        setShowAuto(false);
      }, 8000); // Hide after 8 seconds total

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const handleFacebookClick = () => {
    window.open("https://facebook.com/tanvir.00ff00", "_blank");
  };

  const handleEmailClick = () => {
    window.open("mailto:tanvir.00ff00@gmail.com", "_blank");
  };

  const handlePhoneClick = () => {
    window.open("tel:09638945761", "_blank");
  };

  return (
    <AnimatePresence>
      {(isOpen || showAuto) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.6 
          }}
          className="fixed top-20 right-4 z-50 max-w-sm w-full mx-4"
        >
          <div className="relative">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 rounded-2xl blur-sm opacity-75 animate-gradient-x"></div>
            
            {/* Main Card */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-500 p-4 text-white relative animate-gradient-x">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg animate-fade-in">ডেভেলপার সম্পর্কে</h3>
                    <p className="text-sky-50 text-sm animate-fade-in">ওয়েবসাইট নির্মাতা</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Developer Info */}
                <div className="text-center space-y-3 animate-bounce-in">
                  <div className="bg-gradient-to-r from-sky-400 to-cyan-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg animate-pulse">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                      তানভীর হোছাইন
                    </h4>
                    <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold">
                      HSC 2026 পরীক্ষার্থী
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      চাপরাশিরহাট ইসমাইল ডিগ্রী কলেজ
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-200 dark:border-gray-700">
                  <div className="text-center p-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                    <Code className="h-5 w-5 text-sky-600 dark:text-sky-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Full Stack</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Developer</p>
                  </div>
                  <div className="text-center p-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                    <BookOpen className="h-5 w-5 text-sky-600 dark:text-sky-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">4 Chapters</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Complete</p>
                  </div>
                  <div className="text-center p-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                    <Award className="h-5 w-5 text-sky-600 dark:text-sky-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">AI Power</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Gemini 2.0</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div 
                    onClick={handleFacebookClick}
                    className="flex items-center gap-3 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-all hover:scale-105 hover:shadow-md"
                  >
                    <div className="bg-sky-500 p-2 rounded-full">
                      <Facebook className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Facebook</p>
                      <p className="text-xs text-sky-600 dark:text-sky-400">tanvir.00ff00</p>
                    </div>
                    <Star className="h-4 w-4 text-sky-500" />
                  </div>

                  <div 
                    onClick={handleEmailClick}
                    className="flex items-center gap-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg cursor-pointer hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all hover:scale-105 hover:shadow-md"
                  >
                    <div className="bg-cyan-500 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Email</p>
                      <p className="text-xs text-cyan-600 dark:text-cyan-400">tanvir.00ff00@gmail.com</p>
                    </div>
                    <Star className="h-4 w-4 text-cyan-500" />
                  </div>

                  <div 
                    onClick={handlePhoneClick}
                    className="flex items-center gap-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all hover:scale-105 hover:shadow-md"
                  >
                    <div className="bg-teal-500 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Mobile</p>
                      <p className="text-xs text-teal-600 dark:text-teal-400">09638945761</p>
                    </div>
                    <Star className="h-4 w-4 text-teal-500" />
                  </div>
                </div>

                {/* Footer Message */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                    <span className="font-medium">Made with love for HSC 2026 students</span>
                  </div>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
                    ⚡ Powered by React, TypeScript & Google Gemini AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
