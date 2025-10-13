import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import type { TopicSection } from "@/lib/ict-data";
import QuestionCard from "./QuestionCard";

interface ChapterSectionProps {
  section: TopicSection;
  defaultExpanded?: boolean;
}

export default function ChapterSection({ section, defaultExpanded = true }: ChapterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="space-y-4">
      <Card 
        className="overflow-hidden bg-emerald-600 hover-elevate cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid={`section-${section.title}`}
      >
        <div className="p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-xl">📚</span>
            {section.titleBangla}
          </h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-white flex-shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-white flex-shrink-0" />
          )}
        </div>
      </Card>

      {isExpanded && (
        <div className="space-y-4 animate-accordion-down">
          {section.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
