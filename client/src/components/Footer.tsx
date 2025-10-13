import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 mt-16 py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700">
          <div className="p-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-blue-900 dark:text-blue-100">
              <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
              <span className="font-semibold">তোমার সফলতা আমার লক্ষ্য | HSC 2026 ব্যাচের জন্য</span>
            </div>
            
            <p className="text-sm text-blue-700 dark:text-blue-300">
              সব প্রশ্নের উত্তর সহজ ভাষায় | মুখস্থ করা সহজ
            </p>
            
            <p className="text-xs text-muted-foreground">
              © 2024 আইসিটি সাজেশন | সকল অধিকার সংরক্ষিত
            </p>
          </div>
        </Card>
      </div>
    </footer>
  );
}
