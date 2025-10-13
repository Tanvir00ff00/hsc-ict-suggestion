import TopicSection from '../TopicSection';

const mockSection = {
  level: "pass",
  levelBangla: "পাস করার জন্য যা জানা দরকার",
  topics: [
    { 
      id: "1-1", 
      title: "টেলিমেডিসিন কী?", 
      description: "দূরবর্তী স্থানে থেকে ডিজিটাল মাধ্যমে চিকিৎসা সেবা প্রদান।" 
    },
    { 
      id: "1-2", 
      title: "রোবটিক্স কী?", 
      description: "রোবট তৈরি ও পরিচালনার বিজ্ঞান।",
      years: ["ঢাকা ২৩", "রাজশাহী ১৯"]
    },
  ]
};

export default function TopicSectionExample() {
  return (
    <div className="p-4 space-y-4">
      <TopicSection section={mockSection} defaultExpanded={true} />
    </div>
  );
}
