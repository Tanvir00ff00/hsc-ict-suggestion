import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import type { TopicSection as TopicSectionType } from "@/lib/ict-data";
import { cn } from "@/lib/utils";

interface TopicSectionProps {
  section: TopicSectionType;
  defaultExpanded?: boolean;
}

const levelColors = {
  pass: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  application: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "a-plus": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  placement: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
};

export default function TopicSection({ section, defaultExpanded = false }: TopicSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className="overflow-hidden hover-elevate">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left hover-elevate active-elevate-2"
        data-testid={`button-section-${section.level}`}
      >
        <div className="flex items-center gap-3 flex-1">
          <Badge 
            variant="outline" 
            className={cn("text-sm font-medium", levelColors[section.level as keyof typeof levelColors] || levelColors.pass)}
          >
            {section.levelBangla}
          </Badge>
          <span className="text-sm text-muted-foreground">
            ({section.topics.length} টি টপিক)
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 animate-accordion-down">
          {section.topics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-md bg-muted/50 border border-border hover-elevate"
              data-testid={`topic-${topic.id}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {topic.title}
                  </h4>
                  {topic.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {topic.description}
                    </p>
                  )}
                  {topic.years && topic.years.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {topic.years.map((year, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {year}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
