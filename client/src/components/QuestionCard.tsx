import { Card } from "@/components/ui/card";
import type { Question } from "@/lib/ict-data";
import { Lightbulb, BookOpen, CheckCircle2 } from "lucide-react";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <div className="p-6">
        {/* Question Title */}
        <h3 className="text-xl font-bold text-primary mb-4 flex items-start gap-2">
          <span className="text-2xl">{question.number}.</span>
          <span>{question.question}</span>
        </h3>

        {/* Answer Section */}
        <div className="space-y-4">
          {/* Main Answer with Keyword Highlight */}
          <p className="text-base leading-relaxed text-foreground">
            {question.keyword && (
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded font-semibold">
                {question.keyword}
              </span>
            )}{" "}
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
      </div>
    </Card>
  );
}
