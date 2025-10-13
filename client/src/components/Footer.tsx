import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>সব প্রশ্নের উত্তর সহজে | মুখস্থ কম, বুঝে শেখো</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>তৈরি করা হয়েছে</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>দিয়ে HSC 2026 ব্যাচের জন্য</span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2024 আইসিটি সাজেশন | সকল অধিকার সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
}
