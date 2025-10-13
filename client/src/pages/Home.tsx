import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ChapterTabs from "@/components/ChapterTabs";
import ChapterContent from "@/components/ChapterContent";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ChapterTabs activeChapter={activeChapter} onChapterChange={setActiveChapter} />
      <main className="flex-1">
        <ChapterContent chapterId={activeChapter} searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}
