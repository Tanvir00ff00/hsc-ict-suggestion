import { chapters } from "@/lib/ict-data";
import { cn } from "@/lib/utils";

interface ChapterTabsProps {
  activeChapter: number;
  onChapterChange: (chapterId: number) => void;
}

export default function ChapterTabs({ activeChapter, onChapterChange }: ChapterTabsProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onChapterChange(chapter.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all hover-elevate active-elevate-2",
                activeChapter === chapter.id
                  ? "bg-primary text-primary-foreground border border-primary-border"
                  : "bg-muted text-muted-foreground border border-transparent hover:border-border"
              )}
              data-testid={`tab-chapter-${chapter.id}`}
            >
              <span className="text-lg">{chapter.icon}</span>
              <span className="hidden sm:inline">অধ্যায় {chapter.id}</span>
              <span className="sm:hidden">{chapter.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
