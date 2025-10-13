import QuestionCard from '../QuestionCard';

const mockQuestion = {
  id: "1-1",
  number: "১",
  question: "টেলিকমিউনিকেশন কী?",
  keyword: "টেলিকমিউনিকেশন",
  answer: "হলো দূর থেকে যোগাযোগ করার ব্যবস্থা। টেলিফোন, মোবাইল, ইন্টারনেট নিয়ে দূরে থাকা মানুষের সাথে কথা বলা তথ্য আদান-প্রদান করাকেই টেলিকমিউনিকেশন বলে।",
  examples: {
    title: "উদাহরণ:",
    content: [
      "মোবাইল ফোনে কথা বলা",
      "ভিডিও কল করা",
      "ই-মেইল পাঠানো"
    ]
  }
};

export default function QuestionCardExample() {
  return (
    <div className="p-4">
      <QuestionCard question={mockQuestion} />
    </div>
  );
}
