import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ChapterTabs from "@/components/ChapterTabs";
import ChapterContent from "@/components/ChapterContent";
import Footer from "@/components/Footer";
import { chapters } from "@/lib/ict-data";

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Debounced search for live results
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay for live search

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Show global search when there's a search query
  useEffect(() => {
    setShowGlobalSearch(debouncedSearchQuery.trim().length > 0);
  }, [debouncedSearchQuery]);

  // Handle search change with immediate feedback
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Advanced search function (same as in ChapterContent)
  const advancedSearch = useCallback((text: string, query: string): boolean => {
    if (!query.trim()) return true;
    
    const normalizedText = text.toLowerCase().trim();
    const normalizedQuery = query.toLowerCase().trim();
    
    // Exact match
    if (normalizedText.includes(normalizedQuery)) return true;
    
    // Partial word matching
    const queryWords = normalizedQuery.split(/\s+/);
    const textWords = normalizedText.split(/\s+/);
    
    // Check if all query words are found in text (partial matching)
    const allWordsFound = queryWords.every(queryWord => 
      textWords.some(textWord => textWord.includes(queryWord))
    );
    
    if (allWordsFound) return true;
    
    // Character-based fuzzy matching for Bengali
    const queryChars = normalizedQuery.split('');
    const textChars = normalizedText.split('');
    
    // Check if query characters appear in sequence in text
    let queryIndex = 0;
    for (let i = 0; i < textChars.length && queryIndex < queryChars.length; i++) {
      if (textChars[i] === queryChars[queryIndex]) {
        queryIndex++;
      }
    }
    
    // If 70% of query characters are found in sequence, consider it a match
    return queryIndex >= Math.ceil(queryChars.length * 0.7);
  }, []);

  // Get global search results from all chapters
  const getGlobalSearchResults = useCallback(() => {
    if (!debouncedSearchQuery.trim()) return [];

    return chapters.map(chapter => ({
      ...chapter,
      sections: chapter.sections
        .map(section => ({
          ...section,
          questions: section.questions.filter(
            (q) =>
              advancedSearch(q.question, debouncedSearchQuery) ||
              advancedSearch(q.answer, debouncedSearchQuery) ||
              (q.keyword && advancedSearch(q.keyword, debouncedSearchQuery))
          ),
        }))
        .filter(section => section.questions.length > 0)
    })).filter(chapter => chapter.sections.length > 0);
  }, [debouncedSearchQuery, advancedSearch]);

  const globalSearchResults = getGlobalSearchResults();
  const totalResults = globalSearchResults.reduce((acc, chapter) => 
    acc + chapter.sections.reduce((sectionAcc, section) => 
      sectionAcc + section.questions.length, 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <ChapterTabs activeChapter={activeChapter} onChapterChange={setActiveChapter} />
      <main className="flex-1">
        {showGlobalSearch ? (
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Global Search Results Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  সার্চ ফলাফল
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  "{debouncedSearchQuery}" এর জন্য {totalResults} টি ফলাফল সব অধ্যায় থেকে
                </p>
                {totalResults > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✅ Global search - সব অধ্যায় থেকে ফলাফল দেখানো হচ্ছে
                  </p>
                )}
              </div>
            </div>

            {/* Global Search Results */}
            {totalResults > 0 ? (
              <div className="space-y-12">
                {globalSearchResults.map((chapter) => (
                  <div key={chapter.id} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{chapter.icon}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {chapter.titleBangla}
                      </h3>
                    </div>
                    <div className="space-y-8">
                      {chapter.sections.map((section) => (
                        <div key={section.title} className="space-y-4">
                          <h4 className="text-lg font-semibold text-primary border-l-4 border-primary pl-4">
                            {section.titleBangla}
                          </h4>
                          <div className="space-y-4">
                            {section.questions.map((question) => (
                              <div key={question.id} className="bg-card border border-border rounded-lg p-6 shadow-sm">
                                <h5 className="text-lg font-semibold text-foreground mb-3">
                                  {question.number}. {question.question}
                                </h5>
                                <p className="text-muted-foreground leading-relaxed">
                                  {question.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  কোনো ফলাফল পাওয়া যায়নি
                </h3>
                <p className="text-muted-foreground">
                  অন্য কিছু খুঁজে দেখুন
                </p>
              </div>
            )}
          </div>
        ) : (
          <ChapterContent chapterId={activeChapter} searchQuery={debouncedSearchQuery} />
        )}
      </main>
      <Footer />
    </div>
  );
}
