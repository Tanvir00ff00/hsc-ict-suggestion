import { Card } from "@/components/ui/card";
import type { Question } from "@/lib/ict-data";
import { Lightbulb, BookOpen, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded || !cardRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const isCardVisible = cardRect.top < 100 && cardRect.bottom > 100;
      
      setIsFloating(isCardVisible);
      setIsScrolled(window.scrollY > 100);
    };

    if (isExpanded) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded]);

  return (
    <>
      {/* Floating Question Header - iPhone Dynamic Island Style */}
      {isFloating && isExpanded && (
        <div 
          ref={floatingRef}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-primary/95 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-primary/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3 text-white">
            <span className="text-sm font-bold">{question.number}.</span>
            <span className="text-sm font-medium truncate max-w-[250px]">
              {question.question.length > 40 
                ? question.question.substring(0, 40) + "..." 
                : question.question
              }
            </span>
            <ChevronUp className="h-4 w-4" />
          </div>
        </div>
      )}

      {/* Main Card */}
      <Card 
        ref={cardRef}
        className={`overflow-hidden border-l-4 border-l-primary transition-all duration-300 ${
          isExpanded ? 'shadow-lg' : ''
        }`}
      >
        <div className="p-6">
          {/* Question Title - Clickable */}
          <div 
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className={`font-bold text-primary mb-4 flex items-start gap-2 hover:text-primary/80 transition-all duration-300 ${
              isExpanded ? 'text-lg' : 'text-xl'
            }`}>
              <span className={`${isExpanded ? 'text-lg' : 'text-2xl'}`}>{question.number}.</span>
              <span className={`flex-1 transition-all duration-300 ${
                isExpanded ? 'text-sm' : 'text-base'
              }`}>
                {isExpanded && question.question.length > 60 
                  ? question.question.substring(0, 60) + "..." 
                  : question.question
                }
              </span>
              <div className="flex items-center gap-2">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary" />
                )}
              </div>
            </h3>
          </div>

          {/* Answer Section - Collapsible */}
          {isExpanded && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              {/* Main Answer */}
              <p className="text-base leading-relaxed text-foreground">
                {question.answer}
              </p>

              {/* Examples Section - Light Blue Background */}
              {question.examples && (
                <div className="bg-sky-50 dark:bg-sky-950/20 border-l-4 border-sky-400 p-4 rounded-r-md">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    <h4 className="font-semibold text-sky-900 dark:text-sky-300">
                      {question.examples.title}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {question.examples.content.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sky-800 dark:text-sky-200">
                        {example.includes("<") ? (
                          <div className="flex items-center gap-2">
                            <code className="bg-slate-800 text-green-400 px-2 py-0.5 rounded text-sm font-mono">
                              {example.match(/<[^>]+>/)?.[0]}
                            </code>
                            <span>{example.replace(/<[^>]+>/, "").trim()}</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-sky-500 mt-1">•</span>
                            <span>{example}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips Section - Light Green Background */}
              {question.tips && (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-4 rounded-r-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-300">
                      {question.tips.title}
                    </h4>
                  </div>
                  <p className="text-emerald-800 dark:text-emerald-200">
                    {question.tips.content}
                  </p>
                </div>
              )}

              {/* Work List Section - Light Background */}
              {question.workList && (
                <div className="bg-slate-50 dark:bg-slate-900/30 border-l-4 border-slate-400 p-4 rounded-r-md">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <h4 className="font-semibold text-slate-900 dark:text-slate-300">কাজ:</h4>
                  </div>
                  <ol className="space-y-2">
                    {question.workList.map((work, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-800 dark:text-slate-200">
                        <span className="font-medium">{idx + 1}.</span>
                        <span>{work}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
