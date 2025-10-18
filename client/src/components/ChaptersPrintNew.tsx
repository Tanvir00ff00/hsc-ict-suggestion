import { useState, useEffect } from "react";
import { X, Printer, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chapters, type Chapter } from "@/lib/ict-data";

interface PrintProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChaptersPrintNew({ isOpen, onClose }: PrintProps) {
  const [selected, setSelected] = useState<number[]>([1, 2, 3, 4]);
  const [fontSize, setFontSize] = useState(9);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleChapter = (id: number) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].sort()
    );
  };

  const handlePrint = () => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const selectedData = chapters.filter(ch => selected.includes(ch.id));
  const totalQuestions = selectedData.reduce(
    (sum, ch) => sum + ch.sections.reduce((s, sec) => s + sec.questions.length, 0), 
    0
  );

  if (!isOpen) return null;

  return (
    <>
      <GlobalPrintStyles fontSize={fontSize} />
      
      {/* Modal Overlay - Hidden on print */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 print:hidden" 
        onClick={onClose} 
      />
      
      {/* Modal Content - Hidden on print */}
      <div className="fixed inset-4 md:inset-8 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-2xl flex flex-col print:hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Printer className="h-6 w-6" />
                অধ্যায় প্রিন্ট সিস্টেম
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {selected.length} অধ্যায় নির্বাচিত | {totalQuestions} টি প্রশ্ন
              </p>
            </div>
            <Button
              onClick={onClose}
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-b bg-gray-50 dark:bg-slate-800">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">ফন্ট সাইজ:</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="px-3 py-1.5 border rounded-lg text-sm dark:bg-slate-700"
              >
                <option value="7">খুব ছোট (7px)</option>
                <option value="8">ছোট (8px)</option>
                <option value="9">মাঝারি (9px)</option>
                <option value="10">বড় (10px)</option>
                <option value="11">অতি বড় (11px)</option>
              </select>
            </div>
            
            <Button 
              onClick={handlePrint} 
              className="ml-auto bg-blue-600 hover:bg-blue-700"
              disabled={selected.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              PDF তৈরি করুন
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => toggleChapter(ch.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selected.includes(ch.id)
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border"
                }`}
              >
                {ch.icon} অধ্যায় {ch.id}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-600">প্রিভিউ:</h3>
            
            {selected.length === 0 ? (
              <p className="text-center text-gray-500 py-12">
                কোনো অধ্যায় সিলেক্ট করা হয়নি
              </p>
            ) : (
              <div className="space-y-4">
                {selectedData.map((ch) => (
                  <div key={ch.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-bold text-lg text-blue-700">
                      {ch.icon} {ch.titleBangla}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {ch.sections.length} সেকশন • {" "}
                      {ch.sections.reduce((s, sec) => s + sec.questions.length, 0)} প্রশ্ন
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print Content - Only visible during print */}
      <div className="hidden print:block">
        <PrintContent chapters={selectedData} fontSize={fontSize} />
      </div>
    </>
  );
}

// Separate Print Content Component
function PrintContent({ chapters: printChapters, fontSize }: { chapters: Chapter[], fontSize: number }) {
  if (printChapters.length === 0) {
    return null;
  }

  return (
    <div style={{ fontSize: `${fontSize}px`, lineHeight: '1.6', padding: '0', margin: '0' }}>
      {/* Header - Prints on every page */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '16px', 
        borderBottom: '2px solid #333', 
        paddingBottom: '12px',
        pageBreakAfter: 'avoid'
      }}>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
          আইসিটি সাজেশন - HSC 2026
        </h1>
        <p style={{ fontSize: '10px', margin: '0', color: '#666' }}>
          সম্পূর্ণ প্রশ্নাবলী ও উত্তর | তানভীর হোছাইন
        </p>
        <p style={{ fontSize: '9px', margin: '4px 0 0 0', color: '#888' }}>
          নির্বাচিত অধ্যায়: {printChapters.map(ch => ch.id).join(', ')} | 
          মোট প্রশ্ন: {printChapters.reduce((s, ch) => s + ch.sections.reduce((sec, s) => sec + s.questions.length, 0), 0)}
        </p>
      </div>

      {/* Chapters */}
      {printChapters.map((chapter, chapterIdx) => (
        <div 
          key={chapter.id} 
          style={{ 
            pageBreakBefore: chapterIdx > 0 ? 'always' : 'auto',
            pageBreakInside: 'auto'
          }}
        >
          {/* Chapter Header */}
          <div style={{
            background: '#e5e7eb',
            padding: '10px',
            marginBottom: '12px',
            borderLeft: '4px solid #2563eb',
            pageBreakAfter: 'avoid',
            pageBreakInside: 'avoid'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: `${fontSize + 3}px`, 
              fontWeight: 'bold',
              color: '#1e40af'
            }}>
              {chapter.icon} অধ্যায় {chapter.id}: {chapter.titleBangla}
            </h2>
            <p style={{ 
              margin: '4px 0 0 0', 
              fontSize: `${fontSize - 1}px`,
              color: '#4b5563'
            }}>
              {chapter.titleEnglish}
            </p>
          </div>

          {/* Sections */}
          {chapter.sections.map((section, sectionIdx) => (
            <div 
              key={`${chapter.id}-${sectionIdx}`} 
              style={{ 
                marginBottom: '16px',
                pageBreakInside: 'auto'
              }}
            >
              {/* Section Header */}
              <div style={{
                background: '#dbeafe',
                borderLeft: '3px solid #3b82f6',
                padding: '6px 10px',
                marginBottom: '8px',
                pageBreakAfter: 'avoid',
                fontSize: `${fontSize + 1}px`,
                fontWeight: '600'
              }}>
                {section.titleBangla}
              </div>

              {/* Questions */}
              {section.questions.map((q, qIdx) => (
                <div 
                  key={`${chapter.id}-${sectionIdx}-${qIdx}`}
                  style={{
                    marginBottom: '12px',
                    paddingLeft: '12px',
                    borderLeft: '2px solid #d1d5db',
                    pageBreakInside: 'avoid'
                  }}
                >
                  {/* Question */}
                  <p style={{ margin: '0 0 6px 0', fontWeight: '600' }}>
                    <span style={{ color: '#2563eb' }}>প্রঃ {q.number}.</span> {q.question}
                    {q.keyword && (
                      <span style={{
                        marginLeft: '6px',
                        padding: '2px 8px',
                        background: '#dbeafe',
                        border: '1px solid #3b82f6',
                        borderRadius: '10px',
                        fontSize: `${fontSize - 2}px`
                      }}>
                        🏷️ {q.keyword}
                      </span>
                    )}
                  </p>

                  {/* Answer */}
                  <div style={{ 
                    margin: '4px 0', 
                    fontSize: `${fontSize}px`,
                    lineHeight: '1.5'
                  }}>
                    <strong>উত্তর:</strong> {q.answer}
                  </div>

                  {/* Examples */}
                  {q.examples && (
                    <div style={{
                      margin: '8px 0',
                      padding: '8px 10px',
                      background: '#f0f9ff',
                      borderLeft: '3px solid #0ea5e9',
                      fontSize: `${fontSize - 1}px`,
                      pageBreakInside: 'avoid'
                    }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600', fontSize: `${fontSize}px` }}>
                        📋 {q.examples.title}
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {q.examples.content.map((ex, i) => (
                          <li key={i} style={{ marginBottom: '2px' }}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tips */}
                  {q.tips && (
                    <div style={{
                      margin: '8px 0',
                      padding: '8px 10px',
                      background: '#fffbeb',
                      borderLeft: '3px solid #f59e0b',
                      fontSize: `${fontSize - 1}px`,
                      pageBreakInside: 'avoid'
                    }}>
                      <p style={{ margin: 0, fontWeight: '600' }}>
                        💡 {q.tips.title}
                      </p>
                      <p style={{ margin: '4px 0 0 0' }}>{q.tips.content}</p>
                    </div>
                  )}

                  {/* Work List */}
                  {q.workList && q.workList.length > 0 && (
                    <div style={{
                      margin: '8px 0',
                      padding: '8px 10px',
                      background: '#eff6ff',
                      borderLeft: '3px solid #3b82f6',
                      fontSize: `${fontSize - 1}px`,
                      pageBreakInside: 'avoid'
                    }}>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>📋 কাজের তালিকা:</p>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {q.workList.map((work, i) => (
                          <li key={i} style={{ marginBottom: '2px' }}>{work}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Years */}
                  {q.years && q.years.length > 0 && (
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: `${fontSize - 2}px`,
                      color: '#6b7280',
                      fontStyle: 'italic'
                    }}>
                      📅 বোর্ড পরীক্ষা: {q.years.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Footer */}
      <div style={{
        marginTop: '24px',
        paddingTop: '12px',
        borderTop: '1px solid #d1d5db',
        textAlign: 'center',
        fontSize: '8px',
        color: '#6b7280',
        pageBreakInside: 'avoid'
      }}>
        <p style={{ margin: 0 }}>
          © 2025 আইসিটি সাজেশন - HSC 2026 | তানভীর হোছাইন
        </p>
        <p style={{ margin: '2px 0 0 0' }}>
          চাপরাশিরহাট ইসমাইল ডিগ্রী কলেজ | রোল: 704
        </p>
      </div>
    </div>
  );
}

// Global Print Styles Component
function GlobalPrintStyles({ fontSize }: { fontSize: number }) {
  return (
    <style>{`
      @media print {
        @page {
          margin: 12mm 10mm;
          size: A4 portrait;
        }
        
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: visible;
        }
        
        * {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
        
        /* Hide everything except print content */
        body > *:not(.print\\:block) {
          display: none !important;
        }
        
        /* Show only print content */
        .print\\:block {
          display: block !important;
        }
        
        .print\\:hidden {
          display: none !important;
        }
        
        /* Prevent breaks inside important elements */
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
          page-break-inside: avoid;
        }
        
        /* Ensure proper page breaks */
        .page-break-before {
          page-break-before: always;
        }
        
        .page-break-after {
          page-break-after: always;
        }
        
        /* Prevent orphans and widows */
        p {
          orphans: 3;
          widows: 3;
        }
      }
    `}</style>
  );
}
