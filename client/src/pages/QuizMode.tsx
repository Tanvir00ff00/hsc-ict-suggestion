import { useState, useEffect } from "react";
import { preTestSections, PreTestQuestion } from "@/lib/pretest-data";
import { Trophy, ChevronRight, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function QuizMode() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [allQuestions, setAllQuestions] = useState<PreTestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Map<number, boolean>>(new Map());

  useEffect(() => {
    // Flatten all questions from all sections
    const questions = preTestSections.flatMap((section) => section.questions);
    // Shuffle questions for random order
    const shuffled = questions.sort(() => Math.random() - 0.5);
    setAllQuestions(shuffled);
  }, []);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = allQuestions.length > 0 ? ((currentQuestionIndex + 1) / allQuestions.length) * 100 : 0;

  const handleKnowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCorrect = () => {
    setScore(score + 1);
    const newAnswers = new Map(userAnswers);
    newAnswers.set(currentQuestionIndex, true);
    setUserAnswers(newAnswers);
    nextQuestion();
  };

  const handleIncorrect = () => {
    const newAnswers = new Map(userAnswers);
    newAnswers.set(currentQuestionIndex, false);
    setUserAnswers(newAnswers);
    nextQuestion();
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setAllQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers(new Map());
  };

  if (!currentQuestion && !quizCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">প্রশ্ন লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {!quizCompleted ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  প্রশ্ন {currentQuestionIndex + 1} / {allQuestions.length}
                </span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  স্কোর: {score}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Question Card */}
            <Card className="shadow-2xl border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    প্রশ্ন {currentQuestion.number}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {currentQuestion.category}
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-4">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {!showAnswer ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                      উত্তর জানার চেষ্টা করুন, তারপর নিচের বাটনে ক্লিক করুন
                    </p>
                    <Button
                      onClick={handleKnowAnswer}
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                    >
                      উত্তর দেখুন
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Short Answer */}
                    <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 text-lg">
                        📝 সংক্ষিপ্ত উত্তর:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">{currentQuestion.shortAnswer}</p>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="bg-purple-50 dark:bg-slate-800 p-6 rounded-lg">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-3 text-lg">
                        📚 বিস্তারিত ব্যাখ্যা:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                        {currentQuestion.detailedExplanation}
                      </p>
                    </div>

                    {/* Source */}
                    {currentQuestion.source && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {currentQuestion.source}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t">
                      <Button
                        onClick={handleCorrect}
                        size="lg"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        ✅ সঠিক উত্তর দিয়েছি
                      </Button>
                      <Button
                        onClick={handleIncorrect}
                        size="lg"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        ❌ ভুল হয়েছে
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skip Button */}
            {!showAnswer && (
              <div className="text-center mt-4">
                <Button
                  variant="ghost"
                  onClick={nextQuestion}
                  className="text-gray-600 dark:text-gray-400"
                >
                  এই প্রশ্ন এড়িয়ে যান
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          // Quiz Completed
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg text-center py-12">
              <Trophy className="h-20 w-20 mx-auto mb-4" />
              <CardTitle className="text-4xl">কুইজ সম্পন্ন!</CardTitle>
              <CardDescription className="text-white/90 text-xl mt-2">
                অভিনন্দন! আপনি সব প্রশ্ন শেষ করেছেন
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-lg">
                  <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {score} / {allQuestions.length}
                  </p>
                  <p className="text-xl text-gray-700 dark:text-gray-300">
                    আপনার স্কোর: {Math.round((score / allQuestions.length) * 100)}%
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">সঠিক উত্তর</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {allQuestions.length - score}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ভুল উত্তর</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={restartQuiz}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    আবার চেষ্টা করুন
                  </Button>
                  <Button
                    onClick={() => navigate("/pretest")}
                    size="lg"
                    variant="outline"
                    className="flex-1"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    প্রি টেস্ট পেজে যান
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
