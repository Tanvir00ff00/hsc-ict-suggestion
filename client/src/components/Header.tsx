import { Search, Moon, Sun, GraduationCap, Info, BookOpen, Home as HomeIcon, Printer, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AboutWindow from "./AboutWindow";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [location, navigate] = useLocation();
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <header className="bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-500 shadow-lg animate-gradient-x">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                আইসিটি সাজেশন - HSC 2026
              </h1>
              <p className="text-sm md:text-base text-sky-50 mt-1 animate-pulse">তোমার পরীক্ষার সেরা সাথী | সহজে শিখো, ভালো করো ✨</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className={`text-white hover:bg-white/20 ${location === "/" ? "bg-white/20" : ""}`}
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">মূল পাতা</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/pretest")}
              className={`text-white hover:bg-white/20 ${location === "/pretest" ? "bg-white/20" : ""}`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">প্রি টেস্ট</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.dispatchEvent(new Event('show-ai'))}
              className="text-white hover:bg-white/20 animate-pulse"
              title="AI সহায়তা"
            >
              <Sparkles className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.dispatchEvent(new Event('print-friendly'))}
              className="text-white hover:bg-white/20"
              title="প্রিন্ট ফ্রেন্ডলি ভিউ"
            >
              <Printer className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAboutOpen(true)}
              className="text-white hover:bg-white/20"
              data-testid="button-about"
            >
              <Info className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:bg-white/20"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="যেকোনো টপিক খুঁজুন..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 bg-white dark:bg-slate-800 border-0 h-14 text-base rounded-xl shadow-md"
            data-testid="input-search"
          />
        </div>
      </div>
      
      {/* About Window */}
      <AboutWindow 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
    </header>
  );
}
