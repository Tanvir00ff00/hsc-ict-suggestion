import ChapterSection from '../ChapterSection';

const mockSection = {
  title: "knowledge",
  titleBangla: "জ্ঞানমূলক ও অনুধাবন",
  questions: [
    {
      id: "1-1",
      number: "১",
      question: "টেলিকমিউনিকেশন কী?",
      keyword: "টেলিকমিউনিকেশন",
      answer: "হলো দূর থেকে যোগাযোগ করার ব্যবস্থা।",
      examples: {
        title: "উদাহরণ:",
        content: ["মোবাইল ফোনে কথা বলা", "ভিডিও কল করা"]
      }
    }
  ]
};

export default function ChapterSectionExample() {
  return (
    <div className="p-4">
      <ChapterSection section={mockSection} />
    </div>
  );
}
