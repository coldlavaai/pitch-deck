# Visual Audit Instructions for Claude Desktop

**Task:** Compare the Cold Lava sales deck with the reference site (coldlava.ai) and identify all design, animation, and layout discrepancies.

**You have screenshot capabilities - use them!**

---

## 🎯 Objective

The sales deck at https://sales-rep-onboarding-final.vercel.app **MUST** feel like a natural extension of https://coldlava.ai. Right now, it's close but not close enough. Your job is to find every difference and document exactly what needs to change.

---

## 📸 Step 1: Take Screenshots

### Reference Site (coldlava.ai)
Take full-page screenshots of:
1. **Hero section** (full viewport)
2. **Ticker** (tech stack ticker below hero)
3. **Service cards/sections** (any glassmorphism cards)
4. **Overall layout** (spacing, grid, alignment)

### Sales Deck (sales-rep-onboarding-final.vercel.app)
Take matching screenshots of:
1. **Hero section** (full viewport)
2. **Ticker** (tech stack ticker below hero)
3. **Section 4: Products** (accordion, open Tier 3 to see website previews)
4. **Section 6: Sales Points** (the 6-card grid with icons)

---

## 🔍 Step 2: Detailed Comparison - Hero Section

Compare the hero sections side-by-side. For EACH element, document:

### **A. Heading Typography**
- [ ] Font family (should be Inter, weight 800)
- [ ] Font size (check if clamp values match)
- [ ] Line height
- [ ] Letter spacing
- [ ] **Color:** Is there a gradient? If yes, what colors? If no, plain white?
- [ ] Does "Sales Deck" or "Cold Lava" have different styling than other text?

### **B. HUD Elements (Coordinates & Time)**
On coldlava.ai, look at the top-left and top-right corners:
- [ ] **Coordinates (X/Y):** Is there a box/frame around them? Describe exact styling:
  - Border: thickness, color (rgba values if visible)
  - Background: solid, transparent, blur effect?
  - Padding: spacing inside box
  - Font size and color
- [ ] **Time/Date:** Same questions as coordinates
  - Is time format 24-hour? Include milliseconds?
  - Date format?
  - Any separators (/, ·, —)?

### **C. Corner Brackets/Viewfinder Marks**
- [ ] Are there corner markers in all 4 corners?
- [ ] Size (width × height in px)
- [ ] Border thickness
- [ ] Border color (rgba value)
- [ ] Position (how far from edges?)
- [ ] L-shaped (2 sides) or full corners?

### **D. Background Effects**
- [ ] **Gradient orb:** Is there a large glowing orb? If yes:
  - Size (width/height)
  - Color (cyan, gold, or other?)
  - Does it follow mouse movement?
  - Opacity and blur amount
- [ ] **Grain overlay:** Is there a noise/grain texture?
  - Opacity level
  - SVG or image?
- [ ] **Grid lines:** Any subtle grid pattern?
- [ ] **Crosshair lines:** Thin lines forming a cross in the center? (Currently REMOVED in sales deck - confirm if coldlava.ai has them)

### **E. Ticker Section**
Below the hero, there's a scrolling ticker. Compare:
- [ ] **Border:** Top and bottom border color and thickness
- [ ] **Padding:** Vertical padding (top/bottom)
- [ ] **Text:**
  - Font family (JetBrains Mono?)
  - Font size
  - Text transform (uppercase?)
  - Letter spacing
  - Color (rgba value)
- [ ] **Icons/Logos:** Are there icon images or SVGs before each tech name?
  - If yes, describe them (TypeScript logo, React logo, etc.)
  - If no, are there symbols/separators?
- [ ] **Separators:** Between items (/, ·, —, or none?)
  - Color of separators
- [ ] **Animation speed:** How fast does it scroll?
- [ ] **Gap:** Space between items

---

## 🔍 Step 3: Detailed Comparison - Card Styling

On coldlava.ai, find any card/box elements (service cards, feature boxes, etc.). Compare with sales deck Section 6 (Sales Points cards):

### **Card Structure**
- [ ] **Border:**
  - Thickness (1px, 2px?)
  - Color (rgba value)
  - Radius (rounded corners? how much?)
- [ ] **Background:**
  - Solid color or semi-transparent?
  - Rgba value
  - Blur effect (backdrop-filter)?
- [ ] **Padding:**
  - Top, right, bottom, left spacing
- [ ] **Corner Decorations:**
  - Are there L-shaped corner marks?
  - Size and position
  - Color
- [ ] **Hover Effects:**
  - Does card lift (translateY)?
  - Shadow on hover?
  - Border color change?
  - Background color shift?

### **Icon Styling (if applicable)**
- [ ] **Icon container:**
  - Size (width × height)
  - Border or background?
  - Shape (square, rounded square, circle?)
  - Padding around icon
- [ ] **Icon itself:**
  - Stroke width
  - Color
  - Size

---

## 🔍 Step 4: Layout & Spacing Comparison

### **Container Width**
- [ ] Max-width of main container (1280px, 1440px, or other?)
- [ ] Horizontal padding on mobile/desktop

### **Section Padding**
- [ ] Vertical padding between sections
  - Desktop value
  - Mobile value

### **Grid Layout (if applicable)**
- [ ] Columns: How many columns in card grids?
- [ ] Gap: Space between grid items
- [ ] Alignment: start, center, or stretch?

---

## 🔍 Step 5: Animation Comparison

### **Scroll Animations**
On both sites, scroll down and observe:
- [ ] **Fade-in on scroll:** Do elements fade in as they enter viewport?
  - From what opacity? (0 to 1?)
  - From what Y position? (translateY amount)
  - Duration (in ms)
  - Easing function (linear, ease-out, cubic-bezier?)
  - Stagger delay between elements?

### **Hover Animations**
Hover over cards, buttons, and links:
- [ ] **Duration:** How long is the transition?
- [ ] **Transform:** Does it lift (translateY)? Scale? Rotate?
- [ ] **Shadow:** Does shadow appear or intensify?
- [ ] **Border/Background:** Color or opacity shifts?

### **Ticker Animation**
- [ ] **Speed:** How many seconds for one full loop?
- [ ] **Easing:** Linear or other?
- [ ] **Seamless:** Does it loop smoothly?

---

## 🔍 Step 6: Specific Issues to Investigate

Oliver mentioned these problems - verify if they're fixed:

### **1. "Pointer events non-z-index error at the top"**
- [ ] Check z-index layering in hero section
- [ ] Are interactive elements clickable?
- [ ] Any overlapping layers causing issues?

### **2. "Weird box to the right of Greenstar website"**
Open Tier 3 (Premium Websites) accordion:
- [ ] Are all 4 websites (LCB, Icellare, Greenstar, Cold Lava) displaying?
- [ ] Is there extra space or a weird box/frame?
- [ ] Do laptop frames look clean and aligned?
- [ ] Are iframes scaled correctly (not too zoomed in)?

### **3. "Ticker doesn't have any icons"**
- [ ] Does coldlava.ai ticker have icons/logos?
- [ ] If yes, what kind? (PNG images, SVG, or unicode symbols?)
- [ ] Should sales deck ticker have them too?

### **4. "Architectural viewfinder feature not neat enough"**
- [ ] Compare HUD boxes on both sites
- [ ] Is coldlava.ai's version cleaner/simpler?
- [ ] Any extra lines or decorations on coldlava.ai that are missing in sales deck?

---

## 📝 Step 7: Write Your Report

Structure your findings like this:

```markdown
# Visual Audit Report - Sales Deck vs Cold Lava

## Summary
[Brief overview of overall match quality and major discrepancies]

## Hero Section Discrepancies

### Heading
- **coldlava.ai:** [exact description]
- **sales-deck:** [exact description]
- **Fix needed:** [specific change]

### HUD Boxes
- **coldlava.ai:** [exact description]
- **sales-deck:** [exact description]
- **Fix needed:** [specific change]

[Continue for each element...]

## Ticker Discrepancies

### Icons
- **coldlava.ai:** [exact description]
- **sales-deck:** [exact description]
- **Fix needed:** [specific change]

[Continue...]

## Card Styling Discrepancies

[Same format...]

## Layout & Spacing Discrepancies

[Same format...]

## Animation Discrepancies

[Same format...]

## Specific Issues Verification

### Weird box on Greenstar
- **Status:** [Fixed / Still present / Not found]
- **Screenshot:** [describe what you see]
- **Fix needed:** [if still an issue]

[Continue for other issues...]

## CSS Code Snippets

For each fix needed, provide exact CSS:

```css
/* Fix: HUD boxes match coldlava.ai */
.hero-hud {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  padding: 0.75rem 1rem;
}
```

[Continue with all needed CSS...]

## Priority Ranking

1. [Most critical fix]
2. [Second priority]
3. [...]
```

---

## 🎯 Success Criteria

Your report should enable a developer to:
1. Know EXACTLY what to change
2. Have the exact CSS values to use
3. Understand which changes are cosmetic vs structural
4. Prioritize fixes by impact

---

## 📌 Key Notes

- **Be extremely specific** - "the border is slightly thicker" is useless. "Border is 1px on coldlava.ai but 2px on sales deck" is perfect.
- **Use rgba values** - Not "light gray" but "rgba(255, 255, 255, 0.1)"
- **Measure in pixels** - Use browser DevTools to inspect if needed
- **Take annotated screenshots** - Mark up screenshots with arrows/circles to show differences
- **Don't assume** - If you can't see a detail clearly, say "Unable to verify [X] - needs closer inspection"

---

**Good luck! Oliver needs this sales deck to be pixel-perfect.**
