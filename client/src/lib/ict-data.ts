// ICT Study Materials Data for HSC 2026
export interface Topic {
  id: string;
  title: string;
  description?: string;
  years?: string[];
  examples?: string[];
}

export interface TopicSection {
  level: string;
  levelBangla: string;
  topics: Topic[];
}

export interface Chapter {
  id: number;
  title: string;
  titleBangla: string;
  icon: string;
  sections: TopicSection[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1",
    titleBangla: "অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি",
    icon: "🎓",
    sections: [
      {
        level: "pass",
        levelBangla: "পাস করার জন্য যা জানা দরকার",
        topics: [
          { id: "1-1", title: "টেলিমেডিসিন কী?", description: "দূরবর্তী স্থানে থেকে ডিজিটাল মাধ্যমে চিকিৎসা সেবা প্রদান।" },
          { id: "1-2", title: "রোবটিক্স কী?", description: "রোবট তৈরি ও পরিচালনার বিজ্ঞান।" },
          { id: "1-3", title: "আর্টিফিশিয়াল ইন্টেলিজেন্স", description: "কৃত্রিম বুদ্ধিমত্তা - মেশিনের চিন্তা করার ক্ষমতা।" },
          { id: "1-4", title: "বায়োমেট্রিক্স", description: "শারীরিক বৈশিষ্ট্য দিয়ে সনাক্তকরণ।" },
          { id: "1-5", title: "ন্যানোটেকনোলজি", description: "অতি ক্ষুদ্র পর্যায়ে প্রযুক্তির ব্যবহার।" },
          { id: "1-6", title: "বিশ্বগ্রাম", description: "ইন্টারনেটের মাধ্যমে বিশ্বকে একটি গ্রাম হিসেবে কল্পনা।" },
          { id: "1-7", title: "কম্পিউটার এথিক্স", description: "কম্পিউটার ব্যবহারে নৈতিকতা।" },
          { id: "1-8", title: "ই-কমার্স", description: "অনলাইনে পণ্য ও সেবা কেনা-বেচা।" },
          { id: "1-9", title: "ক্রায়োসার্জারি", description: "অতিশীতল তাপমাত্রায় চিকিৎসা।" },
          { id: "1-10", title: "ভিডিও কনফারেন্সিং", description: "ভিডিও মাধ্যমে দূরবর্তী মিটিং।" },
          { id: "1-11", title: "বায়োইনফরমেটিক্স", description: "জীববিজ্ঞানে তথ্যপ্রযুক্তির ব্যবহার।" },
          { id: "1-12", title: "হ্যাকিং কী?", description: "অনুমতি ছাড়া সিস্টেমে প্রবেশ।" },
          { id: "1-13", title: "ভার্চুয়াল রিয়েলিটি", description: "কম্পিউটার সৃষ্ট কাল্পনিক পরিবেশ।" },
          { id: "1-14", title: "আউটসোর্সিং কী?", description: "বাইরে থেকে কাজ নেওয়া বা দেওয়া।" },
        ]
      },
      {
        level: "application",
        levelBangla: "পাস করার জন্য টপিক",
        topics: [
          { id: "1-15", title: "ভার্চুয়াল রিয়েলিটি", years: ["ঢাকা ২৩, ১৮", "যশোর ২৩, ১৭", "চট্টগ্রাম ২৩"], description: "VR হেডসেট ব্যবহার করে ত্রিমাত্রিক অভিজ্ঞতা।" },
          { id: "1-16", title: "ক্রায়োসার্জারি", years: ["ঢাকা ২৩", "রাজশাহী ২৩, ১৮", "কুমিল্লা ২৩"], description: "লিকুইড নাইট্রোজেন দিয়ে টিস্যু অপসারণ।" },
          { id: "1-17", title: "বায়োইনফরমেটিক্স ও জেনেটিক ইঞ্জিনিয়ারিং", years: ["ঢাকা ২৩, ১৯", "রাজশাহী ২৩, ১৭"], description: "ডিএনএ সিকোয়েন্সিং ও জিন সম্পাদনা।" },
          { id: "1-18", title: "রেটিনা স্ক্যান, ভয়েস রিকগনিশন", years: ["দিনাজপুর ২৩", "ঢাকা ১৯, ১৭"], description: "চোখের রেটিনা ও কণ্ঠস্বর দিয়ে সনাক্তকরণ।" },
          { id: "1-19", title: "ফিঙ্গারপ্রিন্ট, ফেস রিকগনিশন", years: ["কুমিল্লা ২৩, ১৯, ১৭", "বরিশাল ২৩"], description: "আঙুলের ছাপ ও মুখমণ্ডল দিয়ে সনাক্তকরণ।" },
          { id: "1-20", title: "ন্যানোটেকনোলজি", years: ["যশোর ২৩, ১৭", "দিনাজপুর ২৩"], description: "ন্যানো পর্যায়ে উপাদান নিয়ন্ত্রণ।" },
        ]
      },
      {
        level: "a-plus",
        levelBangla: "A+ পাওয়ার জন্য টপিক",
        topics: [
          { id: "1-21", title: "বায়োমেট্রিক্স", years: ["সিলেট ২৩", "দিনাজপুর ২৩"], description: "বায়োমেট্রিক প্রমাণীকরণের বিভিন্ন পদ্ধতি।" },
          { id: "1-22", title: "আর্টিফিশিয়াল ইন্টেলিজেন্স", years: ["সিলেট ২৩", "বরিশাল ২৩"], description: "মেশিন লার্নিং ও ডিপ লার্নিং।" },
          { id: "1-23", title: "রোবটিক্স", years: ["ঢাকা ২৩, ১৭", "রাজশাহী ১৯"], description: "রোবট প্রোগ্রামিং ও অটোমেশন।" },
          { id: "1-24", title: "সাইবার ক্রাইম", years: ["বরিশাল ১৯", "চট্টগ্রাম ১৭"], description: "ইন্টারনেটে অপরাধ ও প্রতিরোধ।" },
        ]
      },
      {
        level: "placement",
        levelBangla: "প্লেস করার জন্য টপিক",
        topics: [
          { id: "1-25", title: "ভিডিও ও টেলি কনফারেন্সিং", years: ["কুমিল্লা ১৭"], description: "Zoom, Teams এর মত প্ল্যাটফর্ম।" },
          { id: "1-26", title: "স্মার্টহোম", years: ["বরিশাল ২৩"], description: "IoT ডিভাইস দিয়ে ঘর নিয়ন্ত্রণ।" },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 2",
    titleBangla: "অধ্যায় ২: কমিউনিকেশন সিস্টেম ও নেটওয়ার্কিং",
    icon: "🌐",
    sections: [
      {
        level: "pass",
        levelBangla: "পাস করার জন্য যা জানা দরকার",
        topics: [
          { id: "2-1", title: "রাউটার", description: "নেটওয়ার্কের মধ্যে ডেটা পাঠায়।" },
          { id: "2-2", title: "ভয়েস ব্যান্ড", description: "কণ্ঠস্বর প্রেরণের ফ্রিকোয়েন্সি রেঞ্জ।" },
          { id: "2-3", title: "সিনক্রোনাস ট্রান্সমিশন", description: "একসাথে ডেটা পাঠানো।" },
          { id: "2-4", title: "ব্যান্ডউইথ", description: "ডেটা পাঠানোর সর্বোচ্চ গতি।" },
          { id: "2-5", title: "ক্লাউড কম্পিউটিং", description: "ইন্টারনেটে ডেটা সংরক্ষণ।" },
          { id: "2-6", title: "মডুলেশন", description: "সিগন্যালে তথ্য যুক্ত করা।" },
          { id: "2-7", title: "ডেটা ট্রান্সমিশন মোড", description: "সিমপ্লেক্স, হাফ-ডুপ্লেক্স, ফুল-ডুপ্লেক্স।" },
          { id: "2-8", title: "NIC", description: "নেটওয়ার্ক ইন্টারফেস কার্ড।" },
          { id: "2-9", title: "টপোলজি", description: "নেটওয়ার্কের গঠন।" },
          { id: "2-10", title: "অপটিক্যাল ফাইবার", description: "আলোর মাধ্যমে ডেটা পাঠানো।" },
          { id: "2-11", title: "ব্লুটুথ", description: "স্বল্প দূরত্বে বিনা খরচে সংযোগ।" },
          { id: "2-12", title: "LAN", description: "স্থানীয় নেটওয়ার্ক।" },
        ]
      },
      {
        level: "application",
        levelBangla: "পাস করার জন্য টপিক",
        topics: [
          { id: "2-13", title: "WiFi, WiMax নেটওয়ার্ক", years: ["কুমিল্লা ২৩", "দিনাজপুর ২৩, ১৯"], description: "ওয়্যারলেস ইন্টারনেট প্রযুক্তি।" },
          { id: "2-14", title: "স্টার টপোলজি", years: ["ঢাকা ২৩, ১৭", "যশোর ২৩"], description: "কেন্দ্রীয় হাব থেকে সবাই সংযুক্ত।" },
          { id: "2-15", title: "বাস টপোলজি", years: ["বরিশাল ২৩, ১৮"], description: "একটি তারে সবাই সংযুক্ত।" },
          { id: "2-16", title: "রিং টপোলজি", years: ["দিনাজপুর ২৩, ১৯"], description: "বৃত্তাকারে সংযোগ।" },
          { id: "2-17", title: "টপোলজির সুবিধা-অসুবিধা", years: ["ঢাকা ২৩, ১৮", "যশোর ২৩"], description: "বিভিন্ন টপোলজির তুলনা।" },
          { id: "2-18", title: "অপটিক ফাইবার ক্যাবল", years: ["ঢাকা ২৩", "রাজশাহী ২৩"], description: "আলোক তরঙ্গে ডেটা স্থানান্তর।" },
          { id: "2-19", title: "মোবাইল প্রজন্ম (2G-5G)", years: ["সিলেট ২৩, ১৯"], description: "মোবাইল নেটওয়ার্কের বিবর্তন।" },
        ]
      },
      {
        level: "a-plus",
        levelBangla: "A+ পাওয়ার জন্য টপিক",
        topics: [
          { id: "2-20", title: "MAN", years: ["দিনাজপুর ২৩", "চট্টগ্রাম ১৯"], description: "মেট্রোপলিটন এরিয়া নেটওয়ার্ক।" },
          { id: "2-21", title: "ডাটা ট্রান্সমিশন মোড", years: ["বরিশাল ২৩"], description: "সিমপ্লেক্স, হাফডুপ্লেক্স, ফুলডুপ্লেক্স বিস্তারিত।" },
          { id: "2-22", title: "সিনক্রোনাস, অ্যাসিনক্রোনাস", years: ["কুমিল্লা ২৩"], description: "ডেটা পাঠানোর পদ্ধতি।" },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Chapter 3",
    titleBangla: "অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস",
    icon: "🔢",
    sections: [
      {
        level: "pass",
        levelBangla: "পাস করার জন্য যা জানা দরকার",
        topics: [
          { id: "3-1", title: "সংখ্যা পদ্ধতি", description: "বাইনারি, অক্টাল, ডেসিমাল, হেক্সাডেসিমাল।" },
          { id: "3-2", title: "২ এর পরিপূরক", description: "নেগেটিভ সংখ্যা প্রকাশ।" },
          { id: "3-3", title: "বুলিয়ান অ্যালজেবরা", description: "লজিক গণনা।" },
          { id: "3-4", title: "ডি-মরগান ল", description: "NOT(A AND B) = NOT A OR NOT B" },
          { id: "3-5", title: "লজিক গেট", description: "AND, OR, NOT, NAND, NOR, XOR" },
          { id: "3-6", title: "BCD, ASCII", description: "ডেটা এনকোডিং পদ্ধতি।" },
          { id: "3-7", title: "ইউনিকোড", description: "সব ভাষার জন্য কোড।" },
          { id: "3-8", title: "সত্যক সারণী", description: "লজিক গেটের ইনপুট-আউটপুট।" },
        ]
      },
      {
        level: "application",
        levelBangla: "পাস করার জন্য টপিক",
        topics: [
          { id: "3-9", title: "সংখ্যা পদ্ধতির রূপান্তর", years: ["ঢাকা ২৩, ১৯, ১৮, ১৭", "রাজশাহী ২৩"], description: "বাইনারি ↔ ডেসিমাল ↔ হেক্সা" },
          { id: "3-10", title: "বাইনারি যোগ-বিয়োগ", years: ["সিলেট ২৩, ১৯"], description: "বাইনারিতে গাণিতিক কাজ।" },
          { id: "3-11", title: "২ এর পূরক পদ্ধতি", years: ["ঢাকা ২৩, ১৯, ১৮, ১৭"], description: "নেগেটিভ সংখ্যায় রূপান্তর।" },
          { id: "3-12", title: "NAND দিয়ে বাস্তবায়ন", years: ["ঢাকা ২৩, ১৭", "রাজশাহী ২৩"], description: "NAND গেট দিয়ে সব গেট তৈরি।" },
          { id: "3-13", title: "NOR দিয়ে বাস্তবায়ন", years: ["যশোর ২৩", "ময়মনসিংহ ২৩"], description: "NOR গেট দিয়ে সব গেট তৈরি।" },
          { id: "3-14", title: "সত্যক সারণী লিখ", years: ["ঢাকা ২৩, ১৮"], description: "গেটের ট্রুথ টেবিল তৈরি।" },
          { id: "3-15", title: "গেট বাস্তবায়ন", years: ["কুমিল্লা ২৩, ১৯"], description: "সমীকরণ থেকে গেট আঁকা।" },
          { id: "3-16", title: "সরলীকরণ", years: ["রাজশাহী ১৯", "সিলেট ১৯, ১৭"], description: "বুলিয়ান রাশি সহজ করা।" },
        ]
      },
      {
        level: "a-plus",
        levelBangla: "A+ পাওয়ার জন্য টপিক",
        topics: [
          { id: "3-17", title: "সার্কিট থেকে সমীকরণ", years: ["রাজশাহী ২৩", "ময়মনসিংহ ২৩"], description: "লজিক সার্কিট থেকে বুলিয়ান রাশি।" },
          { id: "3-18", title: "ফুল অ্যাডার", years: ["যশোর ২৩", "দিনাজপুর ২৩"], description: "সম্পূর্ণ যোগকারী সার্কিট।" },
          { id: "3-19", title: "ডিকোডার", years: ["যশোর ২৩", "কুমিল্লা ২৩"], description: "কোড ডিকোড করার সার্কিট।" },
          { id: "3-20", title: "X-NOR গেট", years: ["ঢাকা ১৯"], description: "Exclusive-NOR গেট বাস্তবায়ন।" },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Chapter 4",
    titleBangla: "অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি ও HTML",
    icon: "💻",
    sections: [
      {
        level: "pass",
        levelBangla: "পাস করার জন্য যা জানা দরকার",
        topics: [
          { id: "4-1", title: "HTML কী?", description: "HyperText Markup Language" },
          { id: "4-2", title: "ওয়েব পেজ ও ওয়েব সাইট", description: "পেজ ও সাইটের পার্থক্য।" },
          { id: "4-3", title: "URL", description: "Uniform Resource Locator" },
          { id: "4-4", title: "HTTP vs HTTPS", description: "নিরাপদ ওয়েব প্রোটোকল।" },
          { id: "4-5", title: "HTML ট্যাগ", description: "<html>, <head>, <body>" },
          { id: "4-6", title: "HTML অ্যাট্রিবিউট", description: "src, href, class, id" },
          { id: "4-7", title: "হেডিং ট্যাগ", description: "<h1> থেকে <h6>" },
          { id: "4-8", title: "প্যারাগ্রাফ ট্যাগ", description: "<p>" },
          { id: "4-9", title: "ইমেজ ট্যাগ", description: "<img>" },
          { id: "4-10", title: "লিংক ট্যাগ", description: "<a>" },
          { id: "4-11", title: "লিস্ট", description: "<ul>, <ol>, <li>" },
          { id: "4-12", title: "টেবিল", description: "<table>, <tr>, <td>" },
        ]
      },
      {
        level: "application",
        levelBangla: "পাস করার জন্য টপিক",
        topics: [
          { id: "4-13", title: "HTML পেজ তৈরি", years: ["সব বোর্ড"], description: "সম্পূর্ণ HTML স্ট্রাকচার লেখা।" },
          { id: "4-14", title: "ফর্ম তৈরি", years: ["ঢাকা ২৩", "রাজশাহী ২৩"], description: "<form>, <input>" },
          { id: "4-15", title: "টেবিল ডিজাইন", years: ["চট্টগ্রাম ২৩"], description: "colspan, rowspan" },
        ]
      }
    ]
  }
];
