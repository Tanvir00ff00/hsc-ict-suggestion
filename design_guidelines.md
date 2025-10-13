# Design Guidelines: আইসিটি সাজেশন - HSC 2026

## Design Approach
**Selected Approach:** Design System (Material Design)  
**Justification:** This educational platform requires clear information hierarchy, excellent readability for Bengali text, and consistent patterns for study materials. Material Design's emphasis on clear typography, logical layouts, and responsive components perfectly suits an educational tool where content comprehension is paramount.

## Core Design Principles
1. **Clarity First:** Every design decision prioritizes content readability and easy navigation
2. **Cultural Appropriateness:** Fully Bengali interface with proper font rendering
3. **Study-Optimized:** Color schemes and spacing reduce eye strain for extended study sessions
4. **Accessibility:** High contrast ratios and clear visual hierarchy for all students

## Color Palette

**Light Mode:**
- Primary: 217 91% 60% (Blue - matching educational theme from screenshots)
- Primary Variant: 217 91% 45% (Darker blue for depth)
- Secondary: 262 52% 47% (Purple accent for highlights)
- Background: 0 0% 98% (Soft white for comfortable reading)
- Surface: 0 0% 100% (Pure white for content cards)
- Text Primary: 217 33% 17% (Deep blue-gray for body text)
- Text Secondary: 217 20% 40% (Muted blue for secondary info)

**Dark Mode:**
- Primary: 217 91% 65% (Lighter blue for visibility)
- Background: 217 33% 10% (Dark blue-gray)
- Surface: 217 25% 15% (Elevated dark surface)
- Text Primary: 0 0% 95% (Near white)
- Text Secondary: 217 20% 70% (Muted light blue)

## Typography

**Font Families:**
- Primary (Bengali + Latin): 'Noto Sans Bengali', 'Hind Siliguri', sans-serif
- Monospace (for code/technical terms): 'Fira Code', monospace

**Type Scale:**
- Headline Large: 2.5rem / 3rem line-height, font-weight 700
- Headline Medium: 2rem / 2.5rem, weight 600  
- Headline Small: 1.5rem / 2rem, weight 600
- Title Large: 1.375rem / 1.75rem, weight 500
- Body Large: 1.125rem / 1.75rem, weight 400
- Body Medium: 1rem / 1.5rem, weight 400
- Caption: 0.875rem / 1.25rem, weight 400

**Bengali Typography Considerations:**
- Minimum body text size: 1rem (16px) for proper Bengali character rendering
- Increased line-height: 1.75 for Bengali script readability
- Letter-spacing: 0.01em for better character distinction

## Layout System

**Spacing Scale (Tailwind units):**
- Micro spacing: 2, 3 (8px, 12px) - for tight groupings
- Standard spacing: 4, 6, 8 (16px, 24px, 32px) - primary rhythm
- Section spacing: 12, 16, 20 (48px, 64px, 80px) - between major sections

**Container Widths:**
- Max content width: max-w-6xl (1152px) for comfortable reading
- Search/input containers: max-w-2xl centered
- Topic cards: full width within container with proper padding

**Grid System:**
- Chapter tabs: Horizontal scroll on mobile, grid on desktop
- Topic lists: Single column on mobile, 2-3 columns on larger screens for topic cards
- Difficulty sections: Expandable accordions, full width

## Component Library

### Navigation Header
- Fixed top position with backdrop blur
- Logo/Title: "আইসিটি সাজেশন - HSC 2026" (Headline Medium)
- Search bar: Prominent, rounded, with icon
- Dark mode toggle: Icon button top-right
- Height: 64px on mobile, 72px on desktop

### Chapter Navigation
- Tab design with active state indicators
- Horizontal scroll on mobile with snap points
- Pill-shaped tabs with rounded-full borders
- Active: filled primary color, Inactive: outline with hover state

### Search Interface
- Full-width search input with rounded-lg borders
- Icon: Magnifying glass (Heroicons)
- Placeholder: "টপিক খুঁজুন..." (Search topics...)
- Real-time filtering with debouncing
- Search results highlighted in yellow/amber

### Topic Cards/Sections
- Collapsible sections for each difficulty level
- Header: Badge with difficulty level + count
- Content: List of topics with year references in small text
- Card style: Subtle shadow, rounded-lg, hover lift effect
- Expand/collapse icon: Chevron (Heroicons)

### Content Display
- Topic title: Title Large in primary color
- Definition: Body Large with comfortable line-height
- Exam years: Caption size, secondary color, inline chips
- Code blocks (for technical topics): Monospace font, syntax highlighted background

### Buttons & CTAs
- Primary: Rounded-md, solid fill, shadow-sm
- Secondary: Rounded-md, outline variant
- Icon buttons: Circular, 40px size
- Hover: Slight scale (1.02) and shadow increase

## Animations

**Subtle, Purpose-Driven:**
- Page transitions: Fade + slide (200ms ease-out)
- Accordion expand/collapse: Height animation (250ms ease-in-out)
- Hover states: Transform scale (150ms) - very minimal
- Loading states: Skeleton screens with shimmer effect
- NO decorative animations - focus on functional feedback

## Accessibility Features
- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- Focus indicators: 2px solid ring in primary color
- Keyboard navigation: Full tab order, arrow keys for tabs
- ARIA labels in Bengali for screen readers
- Touch targets: Minimum 44px for mobile interactions

## Images

**No hero image required** - This is a utility/study application where content takes precedence. 

**Icon Usage:**
- Use Heroicons for all UI icons (search, expand, menu, theme toggle)
- Topic category icons: Simple, monochromatic, 24px size
- Chapter icons: Subtle, decorative, 32px in chapter tabs

**Illustrations (Optional decorative elements):**
- Small educational-themed illustrations in empty states
- Abstract geometric patterns in page backgrounds (very subtle, low opacity)

## Responsive Behavior
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile: Stacked layout, full-width cards, bottom nav possible
- Tablet: 2-column grids where appropriate
- Desktop: 3-column potential for topic overview, fixed sidebar navigation

## Special Considerations
- **Performance:** Lazy load chapter content, virtual scrolling for long topic lists
- **Offline Support:** Cache study materials for offline access
- **Print Styles:** Clean, printer-friendly version for note-taking
- **Bengali Input:** Support Bengali keyboard input in search with transliteration suggestions