import { useState, useEffect } from "react";
import { preTestSections } from "@/lib/pretest-data";
import { BookOpen, Clock, Award, TrendingUp, Zap, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreTestPrint from "@/components/PreTestPrint";

// Helper function to detect and format code blocks
const formatTextWithCode = (text: string) => {
  const codePatterns = [
    // C/C++ patterns
    /#include/i,
    /int\s+\w+/i,
    /float\s+\w+/i,
    /char\s+\w+/i,
    /main\s*\(/i,
    /printf\s*\(/i,
    /scanf\s*\(/i,
    /for\s*\(/i,
    /while\s*\(/i,
    /if\s*\(/i,
    /else/i,
    /return\s+/i,
    /{[\s\S]*}/,
    /;\s*$/m,
    /\w+\s*=\s*\w+/,
    // HTML/XML patterns
    /<[a-z][a-z0-9]*\s*[^>]*>/i,
    /<\/[a-z][a-z0-9]*>/i,
    /<!DOCTYPE/i,
    /<html>/i,
    /<body>/i,
    /<head>/i,
    /src\s*=\s*["']/i,
    /href\s*=\s*["']/i,
    /class\s*=\s*["']/i
  ];
  
  const hasCodePattern = codePatterns.some(pattern => pattern.test(text));
  
  if (hasCodePattern) {
    const parts = text.split(/(প্রোগ্রাম:|বিশ্লেষণ:|ব্যাখ্যা:|উদাহরণ:)/);
    const formatted: Array<{type: string; content: string}> = [];
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      if (!part) continue;
      
      if (/^(প্রোগ্রাম|বিশ্লেষণ|ব্যাখ্যা|উদাহরণ):$/.test(part)) {
        if (formatted.length > 0 && formatted[formatted.length - 1].type === 'text') {
          formatted[formatted.length - 1].content += '\n\n' + part;
        } else {
          formatted.push({ type: 'text', content: part });
        }
        continue;
      }
      
      const strongCodeIndicators = [
        // C/C++ indicators
        part.includes('#include'),
        part.includes('main()'),
        part.includes('printf'),
        part.includes('scanf'),
        /int\s+\w+\s*[;,]/.test(part),
        part.split('\n').filter(line => line.trim().endsWith(';')).length >= 2,
        // HTML indicators
        /<[a-z]+[^>]*>/i.test(part) && part.includes('<'),
        part.includes('<!DOCTYPE'),
        part.includes('<html>'),
        part.includes('<body>'),
        part.includes('src="') || part.includes('href="'),
        (part.match(/<[a-z]+/gi) || []).length >= 2
      ];
      
      const isCode = strongCodeIndicators.some(indicator => indicator);
      
      if (isCode) {
        formatted.push({ type: 'code', content: part });
      } else {
        formatted.push({ type: 'text', content: part });
      }
    }
    
    return formatted.length > 0 ? formatted : [{ type: 'text', content: text }];
  }
  
  return [{ type: 'text', content: text }];
};

export default function PreTest() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [studyTime, setStudyTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(new Set());
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showPrint, setShowPrint] = useState(false);
  const [showAllForPrint, setShowAllForPrint] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Study timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStudyTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("pretest-bookmarks");
    const savedCompleted = localStorage.getItem("pretest-completed");
    const savedTime = localStorage.getItem("pretest-study-time");

    if (savedBookmarks) setBookmarkedQuestions(new Set(JSON.parse(savedBookmarks)));
    if (savedCompleted) setCompletedQuestions(new Set(JSON.parse(savedCompleted)));
    if (savedTime) setStudyTime(parseInt(savedTime));
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("pretest-bookmarks", JSON.stringify(Array.from(bookmarkedQuestions)));
  }, [bookmarkedQuestions]);

  useEffect(() => {
    localStorage.setItem("pretest-completed", JSON.stringify(Array.from(completedQuestions)));
  }, [completedQuestions]);

  useEffect(() => {
    localStorage.setItem("pretest-study-time", studyTime.toString());
  }, [studyTime]);

  const toggleBookmark = (questionId: string) => {
    const newBookmarks = new Set(bookmarkedQuestions);
    if (newBookmarks.has(questionId)) {
      newBookmarks.delete(questionId);
    } else {
      newBookmarks.add(questionId);
    }
    setBookmarkedQuestions(newBookmarks);
  };

  const toggleComplete = (questionId: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(questionId)) {
      newCompleted.delete(questionId);
    } else {
      newCompleted.add(questionId);
    }
    setCompletedQuestions(newCompleted);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Advanced search filter
  const filteredSections = debouncedSearchQuery
    ? preTestSections
        .map((section) => ({
          ...section,
          questions: section.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
              q.shortAnswer.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
              q.detailedExplanation.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.questions.length > 0)
    : preTestSections;

  const totalQuestions = preTestSections.reduce((acc, section) => acc + section.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progress = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  const handlePrint = () => {
    setShowPrint(true);
  };

  return (
    <>
      <style>
        {`
          @media print {
            @page {
              margin: 20mm 15mm;
              size: A4;
            }
            @page :first {
              margin-top: 15mm;
            }
            body * {
              visibility: hidden;
            }
            .print-section, .print-section * {
              visibility: visible;
            }
            .print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .print\:hidden {
              display: none !important;
            }
            .accordion-content {
              display: block !important;
              height: auto !important;
            }
            [data-state] {
              display: block !important;
            }
            .question-print-item {
              page-break-inside: avoid;
              break-inside: avoid;
              margin-bottom: 10px;
            }
            .section-print-header {
              page-break-after: avoid;
              break-after: avoid;
            }
            h1, h2, h3 {
              page-break-after: avoid;
              break-after: avoid;
            }
            .code-box-print {
              background: #f8f9fa !important;
              border: 2px solid #2c3e50 !important;
              border-radius: 6px !important;
              padding: 12px !important;
              margin: 10px 0 !important;
              font-family: 'Courier New', 'Consolas', 'Monaco', monospace !important;
              font-size: 9.5px !important;
              line-height: 1.6 !important;
              white-space: pre-wrap !important;
              word-wrap: break-word !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              color: #1a1a1a !important;
              box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05) !important;
              position: relative !important;
            }
            .code-box-print::before {
              content: '💻 Code:' !important;
              display: block !important;
              font-size: 8px !important;
              color: #666 !important;
              margin-bottom: 6px !important;
              font-family: 'Segoe UI', Arial, sans-serif !important;
              letter-spacing: 0.5px !important;
            }
            h1, h2, h3 {
              font-family: 'Segoe UI', 'Noto Sans Bengali', Arial, sans-serif !important;
            }
          }
        `}
      </style>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-sky-500 to-cyan-600 text-white">
              🎯 প্রি টেস্ট প্রিপারেশন
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            লেটেস্ট পরীক্ষা প্রস্তুতি
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            প্রোগ্রামিং ধারণা: প্রশ্নাবলী ও উত্তর - তোমার প্রি টেস্ট পরীক্ষার জন্য বিশেষ প্রস্তুতি
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center print:hidden">
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              কুইজ মোড শুরু করুন
            </Button>
            <Button
              onClick={handlePrint}
              size="lg"
              variant="outline"
              className="shadow-lg"
            >
              <Printer className="mr-2 h-5 w-5" />
              প্রিন্ট করুন
            </Button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5" />
                মোট প্রশ্ন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalQuestions}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5" />
                সম্পন্ন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{completedCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5" />
                অগ্রগতি
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{progress}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5" />
                পড়ার সময়
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatTime(studyTime)}</p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="mt-2"
              >
                {isTimerRunning ? "বিরতি" : "শুরু করুন"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                সামগ্রিক অগ্রগতি
              </span>
              <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                {completedCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-sky-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Print Header - Only visible when printing */}
        <div className="hidden print:block print-section">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold mb-1">প্রি টেস্ট পরীক্ষা প্রস্তুতি - HSC 2026</h1>
            <p className="text-xs text-gray-700">প্রোগ্রামিং ধারণা | তানভীর হোছাইন</p>
            <hr className="my-2 border-gray-300" />
          </div>
          
          {preTestSections.map((section) => (
            <div key={section.title} className="mb-4">
              <div className="bg-gray-50 p-2 mb-2 section-print-header">
                <h2 className="text-base font-bold">{section.titleBangla}</h2>
              </div>
              {section.questions.map((question) => (
                <div key={question.id} className="border-l-2 border-gray-300 pl-2 mb-3 question-print-item">
                  <p className="font-semibold text-[11px] mb-0.5">
                    প্রঃ {question.number}. {question.question}
                  </p>
                  <div className="text-[10px] mb-1">
                    <p className="mb-0.5"><strong>সংক্ষিপ্ত:</strong> {question.shortAnswer}</p>
                    <div className="text-[9px] leading-snug">
                      <strong>বিস্তারিত:</strong>{' '}
                      {formatTextWithCode(question.detailedExplanation).map((part, idx) => (
                        part.type === 'code' ? (
                          <pre key={idx} className="code-box-print">{part.content}</pre>
                        ) : (
                          <span key={idx}>{part.content}</span>
                        )
                      ))}
                    </div>
                  </div>
                  {question.source && (
                    <p className="text-[8px] text-gray-600 italic">{question.source}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
          
          <div className="mt-3 pt-2 border-t border-gray-300 text-center">
            <p className="text-[9px] text-gray-700">© 2025 HSC ICT 2026 | তানভীর হোছাইন | চাপরাশিরহাট ইসমাইল ডিগ্রী কলেজ</p>
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-8 print:hidden">
          {filteredSections.map((section) => (
            <Card key={section.title} className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-sky-500 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">{section.titleBangla}</CardTitle>
                <CardDescription className="text-sky-100">
                  {section.questions.length} টি প্রশ্ন
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="space-y-4" value={showAllForPrint ? section.questions.map(q => q.id) : undefined}>
                  {section.questions.map((question) => (
                    <AccordionItem
                      key={question.id}
                      value={question.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800 [&[data-state=open]]:bg-sky-50 dark:[&[data-state=open]]:bg-slate-800">
                        <div className="flex items-start gap-4 w-full text-left">
                          <div className="flex-shrink-0">
                            <Badge
                              variant={completedQuestions.has(question.id) ? "default" : "outline"}
                              className="min-w-[60px] justify-center"
                            >
                              {question.number}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                              {question.question}
                            </h3>
                            <div className="flex gap-2 mt-2">
                              {bookmarkedQuestions.has(question.id) && (
                                <Badge variant="secondary" className="text-xs">
                                  📌 বুকমার্ক
                                </Badge>
                              )}
                              {completedQuestions.has(question.id) && (
                                <Badge variant="default" className="text-xs bg-green-600">
                                  ✅ সম্পন্ন
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-6 bg-white dark:bg-slate-900">
                        <div className="space-y-4">
                          {/* Short Answer */}
                          <div className="bg-sky-50 dark:bg-slate-800 p-4 rounded-lg">
                            <h4 className="font-semibold text-sky-900 dark:text-sky-300 mb-2">
                              📝 সংক্ষিপ্ত উত্তর:
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">{question.shortAnswer}</p>
                          </div>

                          {/* Detailed Explanation */}
                          <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
                            <h4 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-2">
                              📚 বিস্তারিত ব্যাখ্যা:
                            </h4>
                            <div className="text-gray-700 dark:text-gray-300">
                              {formatTextWithCode(question.detailedExplanation).map((part, idx) => (
                                part.type === 'code' ? (
                                  <pre key={idx} className="bg-slate-800 dark:bg-slate-900 text-slate-100 p-3 rounded-lg my-2 overflow-x-auto font-mono text-sm border-2 border-slate-600">
                                    <div className="text-xs text-slate-400 mb-2">👉 Code:</div>
                                    {part.content}
                                  </pre>
                                ) : (
                                  <p key={idx} className="whitespace-pre-line">{part.content}</p>
                                )
                              ))}
                            </div>
                          </div>

                          {/* Source */}
                          {question.source && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                              {question.source}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-4 border-t">
                            <Button
                              variant={bookmarkedQuestions.has(question.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleBookmark(question.id)}
                            >
                              {bookmarkedQuestions.has(question.id) ? "📌 বুকমার্ক করা" : "🔖 বুকমার্ক"}
                            </Button>
                            <Button
                              variant={completedQuestions.has(question.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleComplete(question.id)}
                              className={completedQuestions.has(question.id) ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {completedQuestions.has(question.id) ? "✅ সম্পন্ন" : "✔️ সম্পন্ন হিসেবে চিহ্নিত করুন"}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              কোনো ফলাফল পাওয়া যায়নি
            </h3>
            <p className="text-gray-600 dark:text-gray-400">অন্য কিছু খুঁজে দেখুন</p>
          </div>
        )}
      </main>

      <Footer />
      
      {/* Print Component */}
      {showPrint && (
        <PreTestPrint onPrintComplete={() => setShowPrint(false)} />
      )}
    </div>
    </>
  );
}
