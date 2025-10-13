import ChapterTabs from '../ChapterTabs';
import { useState } from 'react';

export default function ChapterTabsExample() {
  const [active, setActive] = useState(1);
  
  return <ChapterTabs activeChapter={active} onChapterChange={setActive} />;
}
