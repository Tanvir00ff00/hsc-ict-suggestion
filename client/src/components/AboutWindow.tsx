import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Facebook, GraduationCap, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutWindow({ isOpen, onClose }: AboutWindowProps) {
  const [showAuto, setShowAuto] = useState(false);

  // Auto show for 4 seconds when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuto(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setShowAuto(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl blur-sm opacity-75"></div>
            
            {/* Main Card */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-4 text-white relative">
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
                    <h3 className="font-bold text-lg">About Developer</h3>
                    <p className="text-blue-100 text-sm">Website Creator</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Developer Info */}
                <div className="text-center space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full mx-auto flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                      তানভীর হোছাইন
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      HSC 2026 পরীক্ষার্থী
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      চাপরাশিরহাট ইসমাইল ডিগ্রী কলেজ
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div 
                    onClick={handleFacebookClick}
                    className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Facebook</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">tanvir.00ff00</p>
                    </div>
                  </div>

                  <div 
                    onClick={handleEmailClick}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Email</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">tanvir.00ff00@gmail.com</p>
                    </div>
                  </div>

                  <div 
                    onClick={handlePhoneClick}
                    className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Mobile</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">09638945761</p>
                    </div>
                  </div>
                </div>

                {/* Footer Message */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    <span>Made with love for HSC 2026 students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
