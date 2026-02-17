# Sales Deck - Implementation Plan

**Project:** Cold Lava Sales Deck
**Status:** Sections 1-6, 8 Complete | Polish & Optimization Phase
**Date:** 2026-02-16

---

## 📊 Current State Assessment

### ✅ What's Working
- Hero section with mouse tracking, HUD, live time/date, gradient orb
- Company section (Section 2)
- Process section (Section 3) with workflow cycle
- **Products accordion (Section 4)** with 7 tiers:
  - Tier 2: Chat widget + voice phone number
  - Tier 3: 4 websites in laptop mockups (LCB, Icellare, Greenstar, Cold Lava)
  - Tier 7: BOS demos in tabs (Solar BOS, Detailers BOS, Harry CV)
- Sales Points (Section 6) with SVG icons and glassmorphism
- Commissions (Section 5) with Sales Rep + BDR tables
- Sign-off (Section 8) with CTA
- Tech stack ticker below hero
- Design system matching coldlava.ai
- Git config correct (otatler@gmail.com for Vercel auto-deploy)

### ⚠️ Outstanding Issues

**1. Commission Amounts (27 instances of £TBD)**
- All commission values are placeholders
- Need real numbers from Oliver
- Locations: Lines 2041-2126 in index.html

**2. Cookie Banners on Iframes**
- Cross-origin limitation prevents removal
- May need CSS overlay hack to hide them
- Affects: Greenstar, LCB, Icellare, Cold Lava websites

**3. Website Iframe Scrollability**
- Currently set to `pointer-events: none`
- Oliver mentioned they should be "scrollable"
- Conflict with current implementation
- Need to decide: static preview vs interactive iframe

**4. Responsive Design**
- Not fully tested on mobile/tablet
- Accordion may need mobile optimization
- Device mockups may not scale correctly on small screens
- Hero animations may be too heavy on mobile

**5. Performance Optimization**
- All iframes load immediately (heavy)
- Should lazy-load iframes when accordion opens
- BOS iframes particularly heavy (3 tabs × 3 panels = 9 iframes)
- Tech stack ticker animation could be optimized

**6. Cross-browser Testing**
- Not tested on Safari, Firefox
- Backdrop-filter (glassmorphism) has Safari quirks
- CSS Grid support verification needed

**7. BOS Authentication Screens**
- BOS iframes may show login screens
- Need to verify URLs are public demo views
- May need to create sanitized demo versions

**8. Section 7: Portfolio**
- Instructions say conditional (skip if demos good)
- Current demos are comprehensive
- **Decision needed:** Keep or remove from plan?

---

## 🎯 Recommended Implementation Order

### **Priority 1: Commission Amounts** (BLOCKER - requires Oliver input)
**Why first:** Can't finalize sales deck without real commission numbers
**Effort:** 10 minutes (once numbers provided)
**Blockers:** Need commission structure from Oliver

**Questions for Oliver:**
1. What are the actual commission amounts for Sales Reps?
   - Quick Wins (Tier 1): Price, Upfront Commission, Recurring Commission
   - AI Agents (Tier 2): Price, Upfront Commission, Recurring Commission
   - Websites (Tier 3): Price, Upfront Commission, Recurring Commission
   - Lead Systems (Tier 4): Price, Upfront Commission, Recurring Commission
   - Dashboards (Tier 5): Price, Upfront Commission, Recurring Commission
   - AI Employees (Tier 6): Price, Upfront Commission, Recurring Commission
   - BOS (Tier 7): Price, Upfront Commission, Recurring Commission

2. What are the BDR/Appointment Setter commissions per appointment?
   - Same 7 products, per-appointment rate

3. Format preference: £150 or £150.00 or £150/mo for recurring?

**Implementation:**
- Find/replace £TBD with actual values
- Ensure gold highlighting on commission columns
- Verify grid alignment after number changes

---

### **Priority 2: Responsive Design & Mobile Testing** (HIGH - affects usability)
**Why second:** Sales reps may present on tablets/phones
**Effort:** 2-3 hours
**Blockers:** None

**Approach:**

**2.1 Mobile Breakpoints Audit**
- Test at: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide)
- Check each section for layout breaks
- Verify text readability at all sizes

**2.2 Hero Section Mobile**
- Reduce gradient orb size on mobile
- Simplify HUD (may hide coordinates on small screens)
- Test mouse tracking on touch devices
- Ensure grain overlay doesn't tank performance

**2.3 Accordion Mobile**
- Single column layout (already likely working)
- Adjust padding/spacing for narrow screens
- Test tap targets (min 44px×44px)
- Ensure smooth expand/collapse on touch

**2.4 Device Mockups Mobile**
- Tier 3 laptop frames may be too wide
- Consider single-column stack of websites
- Or horizontal scroll container
- Phone mockups should stack below laptop

**2.5 BOS Tabs Mobile**
- Tab navigation may need scrollable container
- Test iframe scaling on small screens
- Consider hiding BOS demos on mobile (too complex)

**2.6 Commission Tables Mobile**
- 4-column grid may overflow
- Consider horizontal scroll wrapper
- Or stack into vertical cards
- Test readability of amounts

**2.7 Tech Stack Ticker Mobile**
- Verify animation speed on mobile
- Ensure no horizontal overflow
- Test performance (may need to disable on low-end devices)

**Implementation Strategy:**
```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Reduce hero animations */
  #hero-orb { display: none; } /* or reduce size */
  .hero-crosshair { display: none; }

  /* Stack device mockups */
  .demo-devices { flex-direction: column; }

  /* Simplify BOS tabs */
  .bos-demo { display: none; } /* or simplified version */

  /* Commission table scroll */
  .commission-table {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
```

---

### **Priority 3: Performance Optimization** (MEDIUM - affects load time)
**Why third:** Fast load time is in success criteria (<3s)
**Effort:** 1-2 hours
**Blockers:** None

**3.1 Iframe Lazy Loading**
- Don't load iframes until accordion tier is opened
- Use Intersection Observer or click event
- Placeholder image/skeleton while loading

**Implementation:**
```javascript
// Replace static iframe src with data-src
// Load on accordion expand

function toggleTier(header) {
  const item = header.parentElement;
  const body = item.querySelector('.tier-body');
  const isActive = item.classList.contains('active');

  // ... existing toggle logic ...

  if (!isActive) {
    // NEW: Lazy load iframes when tier opens
    const iframes = body.querySelectorAll('iframe[data-src]');
    iframes.forEach(iframe => {
      if (!iframe.src) {
        iframe.src = iframe.getAttribute('data-src');
      }
    });

    item.classList.add('active');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}
```

**3.2 Image Optimization**
- Verify logo PNGs are optimized
- Consider WebP with PNG fallback
- Lazy load images below fold

**3.3 Animation Performance**
- Use `will-change` sparingly (only on active animations)
- Ensure grain overlay is static SVG (not animated)
- Test ticker animation on low-end devices

**3.4 Loading Screen Optimization**
- Already using DOMContentLoaded (good!)
- Consider removing safety timeout if not needed
- Preload critical fonts

---

### **Priority 4: Cookie Banner Removal** (LOW - cosmetic)
**Why fourth:** Cross-origin limitation, low impact
**Effort:** 30 minutes
**Blockers:** May not be solvable

**Approaches to Try:**

**4.1 CSS Overlay (Hack)**
```css
/* Hide common cookie banner selectors */
.laptop-frame iframe {
  /* Already has pointer-events: none */
}

/* Add overlay to hide bottom portion where banners appear */
.laptop-frame::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px; /* Adjust based on banner height */
  background: linear-gradient(transparent, var(--color-bg));
  pointer-events: none;
}
```

**4.2 URL Parameters**
- Some sites support `?cookie_consent=true`
- Test with Greenstar, LCB, Icellare
- Unlikely to work but worth trying

**4.3 Screenshot Fallback**
- If iframes too problematic, use static screenshots
- Loses "live website" benefit
- Last resort only

**Decision:** Try CSS overlay first, if ineffective, leave as-is or ask Oliver.

---

### **Priority 5: BOS Demo URL Verification** (MEDIUM - affects demo quality)
**Why fifth:** Login screens would break demo
**Effort:** 15 minutes
**Blockers:** May need Oliver to provide public demo URLs

**Current URLs:**
- Solar BOS: https://cl-solarbos-jan-26.vercel.app/
- Detailers BOS: https://bos2026.vercel.app/
- Harry CV: https://harry-bennett-cv.vercel.app/

**Actions:**
1. Test each URL in incognito window
2. Verify no auth screens appear
3. Check if demo data is visible
4. If auth required, ask Oliver for:
   - Public demo URLs
   - Guest login credentials
   - Or sanitized screenshots

---

### **Priority 6: Cross-browser Testing** (MEDIUM - success criteria)
**Why sixth:** Required in success criteria
**Effort:** 1 hour
**Blockers:** Need access to browsers

**Test Matrix:**
| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome | ✅ | ✅ | Primary dev browser |
| Safari | ⚠️ | ⚠️ | Backdrop-filter quirks |
| Firefox | ⚠️ | ⚠️ | CSS Grid support |
| Edge | ⚠️ | N/A | Chromium-based, likely fine |

**Safari-specific Issues to Check:**
- `backdrop-filter: blur()` requires `-webkit-` prefix
- CSS Grid gap property support
- Intersection Observer API support
- Transform performance

**Fixes if Needed:**
```css
/* Add vendor prefixes */
.card {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
```

---

### **Priority 7: Website Iframe Scrollability Decision** (LOW - design decision)
**Why seventh:** Requires design decision from Oliver
**Effort:** 5 minutes (once decided)
**Blockers:** Need Oliver's preference

**Current State:**
```css
.laptop-frame iframe {
  pointer-events: none; /* Not scrollable */
}
```

**Options:**

**A. Keep Static (Current)**
- Pros: Clean, no accidental clicks, predictable
- Cons: Can't demonstrate site functionality
- Use case: Quick visual showcase

**B. Make Interactive**
- Pros: Can scroll, click, explore site
- Cons: May break presentation flow, cookie banners visible
- Use case: In-depth demo

**C. Hybrid (Recommended)**
- Default: Static preview (pointer-events: none)
- Add "Explore Live" button that opens site in new tab
- Best of both worlds

**Decision needed from Oliver:**
> "Should the website previews in Tier 3 be scrollable/clickable, or static previews with a 'View Live' button?"

---

### **Priority 8: Section 7 Portfolio Decision** (LOW - optional section)
**Why eighth:** May not be needed
**Effort:** 0-2 hours (if building from scratch)
**Blockers:** Design decision

**Current State:** Section 7 does not exist

**Instructions Say:**
> "Only include if demos NOT implemented in Section 4"
> "If demos are good, DELETE this section"

**Assessment:**
- Tier 3 has 4 live website demos ✅
- Tier 7 has 3 BOS demos ✅
- Demos are comprehensive and impressive ✅

**Recommendation:** **Skip Section 7 Portfolio**

Section 4 already showcases the work effectively. Adding a separate portfolio section would be redundant and dilute the impact of the live demos.

**Decision needed from Oliver:**
> "Section 4 has extensive demos. Do you still want a separate Section 7 Portfolio, or skip it?"

---

## 🔧 Technical Implementation Details

### Commission Amount Replacement Strategy
**File:** index.html, lines 2041-2126

**Find Pattern:** `£TBD`
**Replace With:** Actual amounts (once provided)

**Locations:**
- Sales Rep table: 21 instances (7 products × 3 columns)
- BDR table: 7 instances (7 products × 1 column)

**Code Structure:**
```html
<!-- Sales Rep -->
<div style="...">£TBD</div> <!-- Price -->
<div style="...">£TBD</div> <!-- Upfront -->
<div style="...">£TBD</div> <!-- Recurring -->

<!-- BDR -->
<div style="...">£TBD</div> <!-- Per Appointment -->
```

**Implementation:**
1. Get commission structure from Oliver
2. Create CSV or structured data:
   ```
   Product, Price, Upfront, Recurring, BDR
   Quick Wins, £500, £100, £50, £25
   AI Agents, £2000, £400, £200, £50
   ...
   ```
3. Find each £TBD in context (check surrounding HTML to identify which product/column)
4. Replace with correct value
5. Verify grid alignment (longer numbers may affect layout)

---

### Responsive Breakpoint Strategy

**Current Breakpoints:**
```css
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

**Mobile Optimizations Needed:**

**Hero:**
```css
@media (max-width: 768px) {
  #hero h1 { font-size: 3rem; }
  #hero-orb { width: 400px; height: 400px; } /* Smaller */
  .hero-hud { font-size: 0.7rem; }
  .hero-crosshair { display: none; } /* Remove on mobile */
}
```

**Accordion:**
```css
@media (max-width: 768px) {
  .tier-header { padding: 1.25rem 1rem; }
  .tier-body { padding: 1.5rem 1rem; }
  .demo-devices { flex-direction: column; gap: 1.5rem; }
}
```

**Device Mockups:**
```css
@media (max-width: 768px) {
  .laptop-frame {
    width: 100%;
    height: auto;
    aspect-ratio: 16/10;
  }
  .laptop-frame iframe {
    transform: scale(0.15); /* Smaller scale for mobile */
  }
  .phone-frame {
    width: 200px; /* Reduce size */
  }
}
```

**Commission Tables:**
```css
@media (max-width: 768px) {
  .commission-grid {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .commission-grid > div {
    min-width: 100px; /* Prevent collapse */
  }
}
```

---

### Lazy Loading Implementation

**Current Problem:** All iframes load immediately, causing:
- Slow initial page load
- Wasted bandwidth (user may not open all tiers)
- Performance issues on mobile

**Solution:** Lazy load iframes when accordion opens

**Step 1: Modify HTML**
Change all iframe `src` to `data-src`:
```html
<!-- Before -->
<iframe src="https://greenstarwebsiteupgrade.vercel.app/"></iframe>

<!-- After -->
<iframe data-src="https://greenstarwebsiteupgrade.vercel.app/"
        style="background: rgba(0,0,0,0.2);"></iframe>
```

**Step 2: Update JavaScript**
Add lazy loading to `toggleTier()` function:
```javascript
function toggleTier(header) {
  const item = header.parentElement;
  const body = item.querySelector('.tier-body');
  const isActive = item.classList.contains('active');

  // Close all other tiers
  document.querySelectorAll('.tier-item.active').forEach(function(activeItem) {
    if (activeItem !== item) {
      activeItem.classList.remove('active');
      activeItem.querySelector('.tier-body').style.maxHeight = null;
    }
  });

  if (!isActive) {
    // NEW: Lazy load iframes
    const iframes = body.querySelectorAll('iframe[data-src]');
    iframes.forEach(function(iframe) {
      if (!iframe.src) {
        iframe.src = iframe.getAttribute('data-src');
        // Remove data-src to prevent re-loading
        iframe.removeAttribute('data-src');
      }
    });

    item.classList.add('active');
    body.style.maxHeight = body.scrollHeight + 'px';

    // Scroll to header
    setTimeout(function() {
      header.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}
```

**Benefits:**
- Initial page load: ~70% faster (only hero + visible content)
- Mobile data savings: ~5-10MB
- Better performance on low-end devices

---

### Cookie Banner CSS Overlay

**Target Elements:**
- Greenstar: Cookie consent at bottom
- LCB: May have GDPR banner
- Icellare: Likely has cookie notice
- Cold Lava: Unknown

**CSS Solution:**
```css
/* Add to laptop-frame styles */
.laptop-frame {
  position: relative;
  /* ... existing styles ... */
}

.laptop-frame::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px; /* Adjust to cover banner */
  background: linear-gradient(
    to top,
    var(--color-bg) 0%,
    var(--color-bg) 20%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 10;
}
```

**Pros:**
- Simple, no JavaScript
- Works across all sites
- Maintains live iframe feel

**Cons:**
- Hides bottom of website too
- Not a perfect solution
- May look odd if banner is mid-page

**Alternative:** Adjust iframe `transform-origin` to crop bottom:
```css
.laptop-frame iframe {
  transform: scale(0.24) translateY(-50px); /* Shift up to hide banner */
  transform-origin: top left;
}
```

---

## 📝 Questions for Oliver (Before Implementation)

### **1. Commission Structure (BLOCKER)**
Please provide the actual commission amounts to replace the £TBD placeholders:

**Sales Rep Commissions:**
| Product | Price | Upfront Commission | Recurring Commission |
|---------|-------|-------------------|---------------------|
| Quick Wins | £___ | £___ | £___ |
| AI Agents | £___ | £___ | £___ |
| Websites | £___ | £___ | £___ |
| Lead Systems | £___ | £___ | £___ |
| Dashboards | £___ | £___ | £___ |
| AI Employees | £___ | £___ | £___ |
| BOS | £___ | £___ | £___ |

**BDR/Appointment Setter Commissions:**
| Product | Per Appointment |
|---------|----------------|
| Quick Wins | £___ |
| AI Agents | £___ |
| Websites | £___ |
| Lead Systems | £___ |
| Dashboards | £___ |
| AI Employees | £___ |
| BOS | £___ |

**Format preference:** £150, £150.00, or £150/mo for recurring?

---

### **2. Website Iframe Behavior**
Currently, website previews in Tier 3 are static (non-scrollable). Which do you prefer?

- **A) Keep static** (current - clean, no accidental clicks)
- **B) Make scrollable/interactive** (can explore sites, but cookie banners visible)
- **C) Static + "View Live" button** (opens in new tab)

---

### **3. Section 7 Portfolio**
The instructions say to only include Section 7 (Portfolio) if Section 4 demos aren't sufficient. Currently:
- Tier 3 has 4 live website demos
- Tier 7 has 3 BOS demos

**Do you want Section 7 Portfolio, or is Section 4 sufficient?**

---

### **4. Mobile Experience**
Sales reps may present on tablets/phones. Priorities:

**Which devices are most important?**
- Desktop (1440px+) - Primary?
- Tablet (768px-1024px) - Secondary?
- Mobile (375px-768px) - Tertiary or not needed?

**Simplifications for mobile:**
- Hide BOS demos on mobile (too complex)? Y/N
- Reduce hero animations on mobile (performance)? Y/N
- Stack website mockups vertically on mobile? Y/N

---

### **5. BOS Demo URLs**
Please verify these URLs are publicly accessible (no login required):
- Solar BOS: https://cl-solarbos-jan-26.vercel.app/
- Detailers BOS: https://bos2026.vercel.app/
- Harry CV: https://harry-bennett-cv.vercel.app/

If they require auth, please provide public demo URLs or guest credentials.

---

## ✅ Success Criteria Checklist

Before marking complete, verify:

- [ ] 1. Matches Cold Lava website design exactly ✅ (already achieved)
- [ ] 2. All 7 product tiers have working demos ✅ (already achieved)
- [ ] 3. Chat widget is testable (Tier 2) ✅ (already achieved)
- [ ] 4. Voice agent is demonstrable (Tier 2) ✅ (phone number: +44 151 541 6933)
- [ ] 5. Website previews in device mockups (Tier 3) ✅ (already achieved)
- [ ] 6. BOS demo is impressive (Tier 7) ✅ (already achieved)
- [ ] 7. Both commission tables present ✅ (need real amounts ⚠️)
- [ ] 8. Smooth animations throughout ✅ (already achieved)
- [ ] 9. Fully responsive (mobile → desktop) ⚠️ (needs testing)
- [ ] 10. Fast page load (<3s) ⚠️ (needs lazy loading)
- [ ] 11. No console errors ⚠️ (needs verification)
- [ ] 12. Works on Safari, Chrome, Firefox ⚠️ (needs testing)

**Status:** 7/12 complete, 5/12 need work

---

## 🚀 Recommended Next Steps

### **Immediate (This Session):**
1. **ASK Oliver for commission amounts** (blocker)
2. **Test live deployment** in incognito to verify current state
3. **Check console for errors** on production URL
4. **Verify BOS URLs** are publicly accessible

### **Once Commission Data Received:**
5. **Replace £TBD placeholders** (10 min)
6. **Implement responsive fixes** (2-3 hours)
7. **Add lazy loading** to iframes (1 hour)
8. **Cross-browser testing** (1 hour)
9. **Final polish & deploy** (30 min)

### **Total Remaining Effort:** 4-6 hours (after commission data)

---

## 📦 Deliverables

**Final Output:**
- ✅ Fully functional sales deck at https://sales-rep-onboarding-final.vercel.app
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Optimized performance (<3s load)
- ✅ Cross-browser compatible (Chrome, Safari, Firefox)
- ✅ Real commission amounts (no placeholders)
- ✅ Polished animations and interactions
- ✅ Production-ready for sales team

**Documentation:**
- ✅ This implementation plan
- ✅ Progress notes in memory/sales-deck-progress.md
- ✅ Original instructions in CLAUDE-CODE-INSTRUCTIONS.md

---

**Plan Status:** Ready for review and approval
**Next Action:** Await Oliver's answers to the 5 questions above, then proceed with implementation.
