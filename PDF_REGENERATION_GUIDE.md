# 📄 PDF পুনরায় তৈরি করার গাইড

## ⚠️ গুরুত্বপূর্ণ তথ্য

আপনার বর্তমান PDF ফাইলগুলো (**ict pretest.pdf** এবং **all chapter.pdf**) পুরানো version। এগুলোতে **Code Block এর বক্স ফরম্যাটিং নেই**। 

নতুন Code Box ফরম্যাটিং পেতে আপনাকে PDF পুনরায় তৈরি করতে হবে।

---

## 🔧 সমাধান: নতুন PDF তৈরি করুন

### **১. Main Chapters PDF (all chapter.pdf)**

#### **ধাপসমূহ:**

1. **ওয়েবসাইট চালু করুন:**
   ```bash
   npm run dev
   ```

2. **হোম পেজে যান** এবং Header-এ **"প্রিন্ট ফ্রেন্ডলি ভিউ"** বাটনে ক্লিক করুন
   - 🖨️ প্রিন্টার আইকনটি খুঁজুন

3. **অধ্যায় সিলেক্ট করুন:**
   - সব অধ্যায় (১-৪) চেক করুন
   - অথবা যেগুলো দরকার সেগুলো সিলেক্ট করুন

4. **"প্রিন্ট করুন" বাটনে ক্লিক করুন**
   - Print dialog খুলবে
   - Destination: "Save as PDF" সিলেক্ট করুন
   - File name: `all chapter.pdf`
   - **Save** করুন

✅ **Code blocks এখন বক্স আকারে দেখাবে!**

---

### **২. Pre-test PDF (ict pretest.pdf)**

#### **ধাপসমূহ:**

1. **ওয়েবসাইট চালু করুন:**
   ```bash
   npm run dev
   ```

2. **Pre-test পেজে যান**
   - হোম থেকে "প্রি-টেস্ট" বাটনে ক্লিক করুন

3. **"Print All Questions" বাটনে ক্লিক করুন**
   - 🖨️ প্রিন্টার আইকনটি খুঁজুন (উপরে)
   - Print dialog খুলবে

4. **PDF হিসেবে সেভ করুন:**
   - Destination: "Save as PDF"
   - File name: `ict pretest.pdf`
   - **Save** করুন

✅ **সব code blocks বক্স আকারে ফরম্যাট হবে!**

---

## 🎨 নতুন Code Box Features

### **স্ক্রিনে (Web View):**
```
┌─────────────────────────────────┐
│ Dark theme background           │
│ Monospace font                  │
│ Syntax-friendly spacing         │
│ Scrollable if needed            │
└─────────────────────────────────┘
```

### **প্রিন্টে (PDF):**
```
┌─────────────────────────────────┐
│ Light gray background           │
│ Dark border (2px)               │
│ Courier New font                │
│ Compact but readable            │
│ No page break in middle         │
└─────────────────────────────────┘
```

---

## 📋 Code Detection করে এমন Patterns:

✅ `#include`
✅ `int`, `float`, `char` variables
✅ `main()` function
✅ `printf()`, `scanf()`
✅ `for`, `while`, `if`, `else` loops
✅ Semicolons (`;`)
✅ Curly braces (`{}`)
✅ Assignment statements (`a = b`)

---

## 🔍 উদাহরণ

### **আগের PDF (পুরানো):**
```
প্রোগ্রাম: #include <stdio.h> main(){ int a,b; b = 125; a = b%25; printf ("%d",a); } বিশ্লেষণ: ...
```
❌ Plain text, কোনো structure নেই

### **নতুন PDF (এখন):**
```
প্রোগ্রাম:

┌─────────────────────────────────┐
│ #include <stdio.h>              │
│ main(){                         │
│   int a,b;                      │
│   b = 125;                      │
│   a = b%25;                     │
│   printf ("%d",a);              │
│ }                               │
└─────────────────────────────────┘

বিশ্লেষণ: ...
```
✅ সুন্দর বক্স, পড়তে সহজ, structured!

---

## 🚀 Quick Steps

### **একবারে সব PDF তৈরি করুন:**

1. Terminal খুলুন:
   ```bash
   cd "h:\dev\HSC ICT"
   npm run dev
   ```

2. Browser-এ খুলুন: `http://localhost:5000`

3. **Main Chapters:**
   - প্রিন্ট বাটন → সব অধ্যায় সিলেক্ট → Print → Save as PDF

4. **Pre-test:**
   - Pre-test পেজ → Print All → Save as PDF

✅ **দুটো নতুন PDF তৈরি হয়ে গেল!**

---

## 💡 টিপস

1. **Print Preview দেখুন** print করার আগে - code boxes দেখা যাচ্ছে কিনা check করুন

2. **Browser Settings:**
   - Margins: Default
   - Scale: 100%
   - Background graphics: **On** (দরকার হলে)

3. **File Size:**
   - নতুন PDF একটু বড় হতে পারে (styling এর জন্য)
   - কিন্তু এটা actual text, image নয়
   - Copy-paste করা যাবে

4. **Print Quality:**
   - Chrome/Edge recommend করি
   - Better print rendering

---

## 📞 সমস্যা হলে

যদি code boxes এখনও দেখা না যায়:

1. **Browser cache clear করুন:**
   ```
   Ctrl + Shift + Delete → Clear cache
   ```

2. **Dev server restart করুন:**
   ```bash
   Ctrl + C (stop)
   npm run dev (start again)
   ```

3. **Hard refresh:**
   ```
   Ctrl + Shift + R
   ```

---

## ✨ সম্পূর্ণ!

এখন আপনার PDF-এ সব code blocks সুন্দর বক্স আকারে দেখাবে! 🎉

**তৈরি:** তানভীর হোছাইন  
**তারিখ:** ১৭ অক্টোবর ২০২৫
