import { chapters } from "@/lib/ict-data";
import { cn } from "@/lib/utils";

interface ChapterTabsProps {
  activeChapter: number;
  onChapterChange: (chapterId: number) => void;
}

export default function ChapterTabs({ activeChapter, onChapterChange }: ChapterTabsProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-start md:justify-center">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onChapterChange(chapter.id)}
              className={cn(
                "flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all hover-elevate active-elevate-2 min-w-[120px] md:min-w-[140px]",
                activeChapter === chapter.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-slate-700"
              )}
              data-testid={`tab-chapter-${chapter.id}`}
            >
              <span>অধ্যায় {chapter.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
