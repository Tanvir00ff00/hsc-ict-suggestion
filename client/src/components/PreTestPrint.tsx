import { useEffect } from "react";
import { preTestSections } from "@/lib/pretest-data";

// Helper function to detect and format code blocks
const formatTextWithCode = (text: string) => {
  const codePatterns = [
    /#include/i, /int\s+\w+/i, /float\s+\w+/i, /char\s+\w+/i,
    /main\s*\(/i, /printf\s*\(/i, /scanf\s*\(/i,
    /for\s*\(/i, /while\s*\(/i, /if\s*\(/i,
    /<[a-z][a-z0-9]*\s*[^>]*>/i, /<\/[a-z][a-z0-9]*>/i,
    /<!DOCTYPE/i, /<html>/i, /<body>/i,
    /src\s*=\s*["']/i, /href\s*=\s*["']/i
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
        part.includes('#include'), part.includes('main()'),
        part.includes('printf'), part.includes('scanf'),
        /int\s+\w+\s*[;,]/.test(part),
        part.split('\n').filter(line => line.trim().endsWith(';')).length >= 2,
        /<[a-z]+[^>]*>/i.test(part) && part.includes('<'),
        part.includes('<!DOCTYPE'), part.includes('<html>'),
        (part.match(/<[a-z]+/gi) || []).length >= 2
      ];
      
      const isCode = strongCodeIndicators.some(indicator => indicator);
      formatted.push({ type: isCode ? 'code' : 'text', content: part });
    }
    
    return formatted.length > 0 ? formatted : [{ type: 'text', content: text }];
  }
  
  return [{ type: 'text', content: text }];
};

interface PreTestPrintProps {
  onPrintComplete?: () => void;
}

export default function PreTestPrint({ onPrintComplete }: PreTestPrintProps) {
  useEffect(() => {
    // Auto print when component mounts
    const timer = setTimeout(() => {
      window.print();
      if (onPrintComplete) {
        setTimeout(onPrintComplete, 500);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [onPrintComplete]);

  return (
    <>
      <style>
        {`
          @media print {
            @page {
              margin: 18mm 14mm;
              size: A4;
            }
            body * {
              visibility: hidden;
            }
            .pretest-print-section, .pretest-print-section * {
              visibility: visible;
            }
            .pretest-print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .pretest-question-item {
              page-break-inside: avoid;
              break-inside: avoid;
              margin-bottom: 8px;
            }
            .pretest-section-header {
              page-break-after: avoid;
              break-after: avoid;
              background: #f3f4f6 !important;
              padding: 6px 8px !important;
              margin-bottom: 6px !important;
            }
            h1, h2, h3 {
              page-break-after: avoid;
              break-after: avoid;
              font-family: 'Noto Sans Bengali', 'Segoe UI', Arial, sans-serif !important;
            }
            .pretest-code-box {
              background: #f8f9fa !important;
              border: 2px solid #2c3e50 !important;
              border-radius: 4px !important;
              padding: 10px !important;
              margin: 6px 0 !important;
              font-family: 'Courier New', 'Consolas', 'Monaco', monospace !important;
              font-size: 8.5px !important;
              line-height: 1.5 !important;
              white-space: pre-wrap !important;
              word-wrap: break-word !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              color: #1a1a1a !important;
              box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05) !important;
            }
            .pretest-code-box::before {
              content: '💻 Code:' !important;
              display: block !important;
              font-size: 7px !important;
              color: #666 !important;
              margin-bottom: 4px !important;
              font-family: 'Segoe UI', Arial, sans-serif !important;
              letter-spacing: 0.5px !important;
            }
          }
        `}
      </style>
      
      <div className="hidden print:block pretest-print-section">
        <div className="text-center mb-3">
          <h1 className="text-base font-bold mb-0.5">প্রি টেস্ট পরীক্ষা প্রস্তুতি - HSC 2026</h1>
          <p className="text-[9px] text-gray-700">প্রোগ্রামিং ধারণা | তানভীর হোছাইন | চাপরাশিরহাট ইসমাইল ডিগ্রী কলেজ</p>
          <hr className="my-1.5 border-gray-300" />
        </div>
        
        {preTestSections.map((section) => (
          <div key={section.title} className="mb-3">
            <div className="bg-gray-100 p-1.5 mb-1.5 pretest-section-header">
              <h2 className="text-sm font-bold text-gray-900">{section.titleBangla}</h2>
            </div>
            
            {section.questions.map((question) => (
              <div key={question.id} className="border-l-2 border-gray-400 pl-2 mb-2 pretest-question-item">
                <p className="font-semibold text-[10px] mb-0.5 leading-tight">
                  প্রঃ {question.number}. {question.question}
                </p>
                <div className="text-[9px] mb-0.5">
                  <p className="mb-0.5"><strong>সংক্ষিপ্ত:</strong> {question.shortAnswer}</p>
                  <div className="text-[8.5px] leading-snug">
                    <strong>বিস্তারিত:</strong>{' '}
                    {formatTextWithCode(question.detailedExplanation).map((part, idx) => (
                      part.type === 'code' ? (
                        <pre key={idx} className="pretest-code-box">{part.content}</pre>
                      ) : (
                        <span key={idx}>{part.content}</span>
                      )
                    ))}
                  </div>
                </div>
                {question.source && (
                  <p className="text-[7px] text-gray-600 italic">{question.source}</p>
                )}
              </div>
            ))}
          </div>
        ))}
        
        <div className="mt-2 pt-1.5 border-t border-gray-300 text-center">
          <p className="text-[8px] text-gray-700">© 2025 HSC ICT 2026 | তানভীর হোছাইন | চাপরাশিরহাট ইসমাইল ডিগ্রী কলেজ</p>
        </div>
      </div>
    </>
  );
}
