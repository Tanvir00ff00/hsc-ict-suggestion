import { Search, Moon, Sun, GraduationCap, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import AboutWindow from "./AboutWindow";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
    <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 shadow-lg">
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
              <p className="text-sm md:text-base text-blue-50 mt-1">তোমার পরীক্ষার সেরা সাথী | সহজে শিখো, ভালো করো</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
