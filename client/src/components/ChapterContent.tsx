import { chapters } from "@/lib/ict-data";
import ChapterSection from "./ChapterSection";
import { GraduationCap } from "lucide-react";

interface ChapterContentProps {
  chapterId: number;
  searchQuery?: string;
}

// Advanced search function with fuzzy matching
function advancedSearch(text: string, query: string): boolean {
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
}

export default function ChapterContent({ chapterId, searchQuery = "" }: ChapterContentProps) {
  const chapter = chapters.find((ch) => ch.id === chapterId);

  if (!chapter) return null;

  // Advanced filtering with fuzzy search
  const filteredSections = searchQuery
    ? chapter.sections
        .map((section) => ({
          ...section,
          questions: section.questions.filter(
            (q) =>
              advancedSearch(q.question, searchQuery) ||
              advancedSearch(q.answer, searchQuery) ||
              (q.keyword && advancedSearch(q.keyword, searchQuery))
          ),
        }))
        .filter((section) => section.questions.length > 0)
    : chapter.sections;

  const hasResults = filteredSections.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {chapter.titleBangla}
          </h2>
        </div>
        {searchQuery && (
          <div className="space-y-2">
            <p className="text-muted-foreground">
              "{searchQuery}" এর জন্য {filteredSections.reduce((acc, s) => acc + s.questions.length, 0)} টি ফলাফল
            </p>
            {filteredSections.reduce((acc, s) => acc + s.questions.length, 0) > 0 && (
              <p className="text-sm text-green-600 dark:text-green-400">
                ✅ Live search - ফলাফলগুলো real-time আপডেট হচ্ছে
              </p>
            )}
          </div>
        )}
      </div>

      {hasResults ? (
        <div className="space-y-8">
          {filteredSections.map((section) => (
            <ChapterSection
              key={section.title}
              section={section}
              defaultExpanded={searchQuery ? true : true}
            />
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
  );
}
