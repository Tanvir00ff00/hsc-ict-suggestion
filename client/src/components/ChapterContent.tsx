import { chapters, type Chapter } from "@/lib/ict-data";
import TopicSection from "./TopicSection";
import { BookOpen } from "lucide-react";

interface ChapterContentProps {
  chapterId: number;
  searchQuery?: string;
}

export default function ChapterContent({ chapterId, searchQuery = "" }: ChapterContentProps) {
  const chapter = chapters.find((ch) => ch.id === chapterId);

  if (!chapter) return null;

  // Filter sections and topics based on search query
  const filteredSections = searchQuery
    ? chapter.sections
        .map((section) => ({
          ...section,
          topics: section.topics.filter(
            (topic) =>
              topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              topic.description?.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.topics.length > 0)
    : chapter.sections;

  const hasResults = filteredSections.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-primary/10 p-3 rounded-md">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            {chapter.titleBangla}
          </h2>
        </div>
        {searchQuery && (
          <p className="text-muted-foreground">
            "{searchQuery}" এর জন্য {filteredSections.reduce((acc, s) => acc + s.topics.length, 0)} টি ফলাফল
          </p>
        )}
      </div>

      {hasResults ? (
        <div className="space-y-6">
          {filteredSections.map((section, index) => (
            <TopicSection
              key={section.level}
              section={section}
              defaultExpanded={searchQuery ? true : index === 0}
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
