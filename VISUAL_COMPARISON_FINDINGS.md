# Visual Comparison: Cold Lava vs Sales Deck

**Analysis Date:** 2026-02-16
**Analyst:** Claude Code (awaiting Playwright installation)
**Method:** Code analysis + browser inspection

---

## Current Status of Playwright Installation

Playwright is currently installing to enable automated screenshot comparison. In the meantime, here's a manual analysis based on:
1. Reading the sales deck source code
2. Understanding Cold Lava's design patterns
3. Oliver's specific feedback about issues

---

## Issues Identified by Oliver

### ✅ FIXED:
1. **Gradient on "Sales Deck" text** - Removed, now plain white
2. **Crosshair lines** - Removed (weren't on coldlava.ai)
3. **HUD boxes** - Added architectural viewfinder frames with borders and blur
4. **Ticker separators** - Changed from `/` to `·` (dots)

### ⚠️ NEEDS INVESTIGATION:
1. **"Pointer events non-z-index error at the top"**
2. **"Ticker doesn't have any icons"** - Are there actual icon images on coldlava.ai?
3. **"Weird box to the right of Greenstar website"**
4. **HUD boxes "not neat enough"** - Need exact reference from coldlava.ai

---

## Hero Section Analysis

### Current Implementation (Sales Deck):

**HUD Coordinates (Top Left):**
```css
position: absolute;
top: 2rem; left: 2rem;
z-index: 3;
border: 1px solid rgba(255,255,255,0.08);
padding: 0.5rem 0.75rem;
background: rgba(0,0,0,0.3);
backdrop-filter: blur(4px);
```

**HUD Time/Date (Top Right):**
```css
position: absolute;
top: 2rem; right: 2rem;
z-index: 3;
border: 1px solid rgba(255,255,255,0.08);
padding: 0.5rem 0.75rem;
background: rgba(0,0,0,0.3);
backdrop-filter: blur(4px);
```

**Corner Brackets:**
```css
position: absolute;
width: 24px; height: 24px;
border: 1px solid rgba(255, 255, 255, 0.1);
/* L-shaped (2 sides only) */
```

### Questions for coldlava.ai Comparison:

1. **HUD Box Styling:**
   - Is the border thicker/thinner?
   - Is the background darker/lighter?
   - Is the blur amount different?
   - Is there any inner shadow or glow?
   - Are the corners rounded?

2. **Corner Brackets:**
   - Should they be inside or outside the HUD boxes?
   - Are they the same size (24px)?
   - Same color opacity?
   - Should they have any glow effect?

3. **Text in HUD:**
   - Font size: Currently 0.5rem - too small?
   - Color: Currently rgba(255,255,255,0.4) - too dim?
   - Letter spacing: 0.15em correct?

---

## Ticker Section Analysis

### Current Implementation:
```html
<span style="...">Next.js</span>
<span style="color: rgba(255, 255, 255, 0.1);">·</span>
<span style="...">React</span>
```

**No icons/logos currently** - just text with dot separators.

### Question:
Does coldlava.ai have:
- A) Actual logo images (TypeScript logo, React logo, etc.)?
- B) SVG icons inline?
- C) Just text with better separators?
- D) Emojis (unlikely given Oliver's preferences)?

If A or B, we need to add those icons/logos.

---

## Website Preview Section (Tier 3)

### Current Implementation:
- 2x2 grid showing 4 websites (LCB, Icellare, Greenstar, Cold Lava)
- Each in a laptop frame mockup
- iframes rendered at 1440px then scaled to 0.24

**Oliver mentioned: "Weird box to the right of Greenstar"**

### Potential Issues:

1. **Iframe overflow:**
```css
.laptop-frame {
  overflow: hidden;
  height: 240px;
}
```
Is 240px the right height? Maybe needs adjustment.

2. **Grid alignment:**
```css
.device-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
```
Could the gap be causing visual issues?

3. **Laptop frame styling:**
```css
.laptop-frame {
  background: #111;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px 8px 0 0;
  padding: 6px;
}
```
Is there extra padding/border creating the "weird box"?

---

## Z-Index Layering (Potential Issue)

Oliver mentioned "pointer events non-z-index error at the top"

### Current Z-Index Values in Hero:
- Grain overlay: `z-index: 1`
- Gradient orb: `z-index: 0`
- HUD boxes: `z-index: 3`
- Corner brackets: `z-index: 1`
- Content: `z-index: 2`

### Potential Problem:
Corner brackets (z-index: 1) might be overlapping with HUD boxes (z-index: 3)?

**Fix needed:** Corner brackets should be z-index: 0 or 2, not 1.

---

## Recommendations (Pre-Screenshot)

### HIGH PRIORITY:

1. **Fix Z-Index layering:**
```css
/* Change corner brackets from z-index: 1 to z-index: 0 */
```

2. **Increase HUD text visibility:**
```css
/* Change from rgba(255,255,255,0.4) to rgba(255,255,255,0.6) */
```

3. **Investigate laptop frame overflow:**
   - Check if iframe is overflowing container
   - Verify scale calculation is correct
   - Test with different viewport sizes

4. **Ticker icons research:**
   - Need to see coldlava.ai to know if icons exist
   - If yes, add logo images or SVG icons

### MEDIUM PRIORITY:

5. **HUD box refinement:**
   - May need to match exact border color/thickness
   - May need corner radius
   - May need different blur amount

6. **Corner bracket positioning:**
   - May need to be positioned differently relative to HUD
   - May need different size

---

## Next Steps

1. **Wait for Playwright installation** to complete
2. **Take screenshots** of both sites (hero, ticker, cards)
3. **Pixel-perfect comparison** using browser DevTools
4. **Extract exact CSS values** from coldlava.ai
5. **Implement precise fixes** based on screenshots
6. **Cross-reference with Claude Desktop analysis**

---

## Questions for Oliver (If Screenshots Delayed)

While waiting for automated analysis, can you quickly check:

1. **Ticker:** Does coldlava.ai have actual logo images/icons in the tech stack ticker?
2. **HUD boxes:** Should they have rounded corners or stay square?
3. **"Weird box":** Is it to the right of Greenstar specifically, or all website previews?
4. **Overall:** What's the BIGGEST visual difference that jumps out when you compare them side-by-side?

