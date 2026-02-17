# Cold Lava Sales Deck - Build Instructions for Claude Code

**Project:** Interactive sales presentation for Cold Lava  
**GitHub:** https://github.com/coldlavaai/sales-deck  
**Production:** https://sales-rep-onboarding-final.vercel.app  
**Working Directory:** `/home/moltbot/sales-deck/`

---

## 🎯 OBJECTIVE

Build a stunning, interactive sales deck that **exactly matches** the Cold Lava website (https://coldlava.ai) in design, animation, and feel. This is for pitching Cold Lava's services.

**THIS IS THE ONLY PRIORITY** - Focus solely on completing this sales deck. No other work (Solar BOS, Aztec, etc.) until this is done.

**Critical requirement:** Use the **front-end design tool** throughout the build. Match coldlava.ai animations, backgrounds, and UI design precisely.

---

## ✅ CURRENT STATE (What's Already Built)

### **Phase 1: Foundation** ✅ COMPLETE
- Global design system (colors, fonts, spacing)
- Background effects (light streams, grid patterns)
- Reusable components (cards with corners)
- Loading screen with Cold Lava logo (pulsing animation)
- Fade-in animation system (Intersection Observer)

### **Phase 2: Core Sections** ✅ COMPLETE
- **Section 1: Hero** - Large heading, atmospheric background
- **Section 2: Company** - Two-column layout with staggered capability cards + sticky mission box
- **Section 3: Our Process** - Philosophy box, development priorities, workflow cycle (working correctly)
- **Section 6: Sales Points** - 6-card grid showing key selling points

### **Phase 3 & 4** ⚠️ **TO BE BUILT**
- Section 4: Products (7 tiers with live demos) - **MOST IMPORTANT**
- Section 5: Commissions (Sales Rep + BDR tables)
- Section 7: Portfolio (conditional)
- Section 8: Sign-off

---

## 📋 REQUIREMENTS FROM JJ

### **GLOBAL REQUIREMENTS**
1. **Match Cold Lava website exactly** - branding, background, styling, layout language
2. **Improve UI/aesthetics** wherever possible while maintaining brand consistency
3. **Interactive and impressive** - this needs to wow clients and empower sales reps

### **CRITICAL SECTIONS TO BUILD**

#### **SECTION 4: PRODUCTS / WHAT YOU'RE SELLING** ⭐ MOST IMPORTANT

**Structure:** Accordion/expandable sections for 7 product tiers

**Order (from coldlava.ai):**
1. Quick Win Automations
2. AI Chat & Voice Agents
3. Premium Websites
4. Lead Systems
5. Real-time Dashboards
6. AI Employees (voice note agent)
7. Business Operating Systems (BOS - flagship)

**For EVERY tier, include:**
- Tier explanation with examples
- "Best for" section (use cases)
- Sales approach (how to pitch)
- **⭐ CRITICAL: Live demo/iframe** (interactive, testable where possible)

**Specific demo requirements:**

**Tier 2: AI Chat & Voice Agents** (CRITICAL)
- MUST have: Live chat widget (testable)
- MUST have: Voice agent demo (callable or audio demo)
- Show real working examples

**Tier 3: Premium Websites** (CRITICAL)
- MUST have: Dual iframes (desktop + mobile view)
- Show real client websites (Greenstar Solar, LCB, Detail Dynamics)
- Device mockups with responsive iframes inside

**Tier 7: Business Operating Systems** (CRITICAL - Flagship)
- Most detailed tier
- Demo: Solar BOS iframe (sanitized demo view)
- Could show: Multiple BOS modules in tabs
- Video walkthrough optional

**Other tiers:**
- Tier 1: Example workflow diagram or form automation
- Tier 4: Lead capture form + database view demo
- Tier 5: Analytics dashboard iframe (real-time data visible)
- Tier 6: Voice note agent demo (audio clip or workflow)

**Accordion behavior:**
- Click to expand/collapse
- Smooth animation
- Only one tier open at a time (optional)
- Deep linking: #tier-1, #tier-2 etc.

#### **SECTION 5: COMMISSIONS**

**5A: Sales Rep Commissions**
```
Product          Price   Upfront   Recurring
Quick Wins       £XXX    £XX       £XX
AI Agents        £XXX    £XX       £XX
Websites         £XXX    £XX       £XX
Lead Systems     £XXX    £XX       £XX
Dashboards       £XXX    £XX       £XX
AI Employees     £XXX    £XX       £XX
BOS              £XXX    £XX       £XX
```
- Use placeholder amounts (£TBD)
- Grid layout, 4 columns
- Hover effects, gold highlights on commission amounts

**5B: BDR/Appointment Setter Commissions**
```
Product          Per Appointment
Quick Wins       £XX
AI Agents        £XX
Websites         £XX
Lead Systems     £XX
Dashboards       £XX
AI Employees     £XX
BOS              £XX
```
- Separate section under "Commissions / BDRs"
- For people who find leads & book appointments (don't close deals)
- Same styling as Sales Rep table

#### **SECTION 7: PORTFOLIO** (conditional)
- **Only include if** iframes/demos NOT implemented in Section 4
- **If demos are good:** DELETE this section
- Otherwise: Grid of project cards (Greenstar Solar, Detail Dynamics, LCB, Solar BOS)

#### **SECTION 8: SIGN-OFF**
- Heading: "Welcome to the Team"
- Body: Support message for sales reps
- CTA button: "Book Your Onboarding Call"
- Simple, centered, minimal decoration

---

## 🎨 DESIGN SYSTEM (Match coldlava.ai Exactly)

### **Colors**
```css
--color-bg: #030305;
--color-text-primary: #FFFFFF;
--color-text-secondary: #E5E7EB;
--color-text-muted: rgba(255, 255, 255, 0.5);
--color-accent: #00d4ff;  /* Cyan */
--color-gold: #D4AF37;
--color-border: rgba(6, 182, 212, 0.2);
```

### **Typography**
```css
--font-primary: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

h1: clamp(3.5rem, 8vw, 5.5rem), weight 800, line-height 1
h2: clamp(2.5rem, 6vw, 4rem), weight 700, line-height 1.2
h3: clamp(1.5rem, 3vw, 2rem), weight 600, line-height 1.3
body: 1rem, weight 400, line-height 1.6
.lead: 1.25rem, weight 400
.label: 0.65rem, uppercase, mono, tracking-wider
```

### **Background Effects**
- **Light streams:** Vertical animated gradients (7 streams at different positions)
- **Grid patterns:** Subtle cyan grid overlay (opacity 0.08)
- **Vignette:** Dark edges fading to center
- **Corner decorations:** 12px L-shaped borders on cards

### **Animations**
```css
/* Smooth fade-in on scroll */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Card hover */
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(6, 182, 212, 0.15);
```

### **Component Patterns**

**Card with corners:**
```html
<div class="card with-corners with-grid">
  <div class="grid-pattern"></div>
  <!-- content -->
</div>
```

**Section label:**
```html
<div class="label">Section Name / 001</div>
```

**Mission/Philosophy box:**
- Gold accents (border, text)
- Semi-transparent background
- Corner decorations
- Sticky positioning on desktop

---

## 🔧 TECHNICAL DETAILS

### **Stack**
- Vanilla HTML/CSS/JS (no frameworks)
- Deployed via Vercel
- GitHub: https://github.com/coldlavaai/sales-deck

### **Workflow**
1. Edit files in `/home/moltbot/sales-deck/`
2. Commit and push to GitHub
3. Deploy to Vercel with: `vercel --prod`
4. Test on production URL: https://sales-rep-onboarding-final.vercel.app

**No local dev servers** - work directly with GitHub + Vercel + production URL

### **File Structure**
```
/home/moltbot/sales-deck/
├── index.html (main file)
├── cold-lava-logo.png
├── cold-lava-logo-gold.png (favicon active state)
├── cold-lava-logo-blue.png (favicon inactive state)
├── README.md
├── .gitignore
└── .vercel/ (deployment config)
```

### **Responsive Breakpoints**
```css
@media (max-width: 768px) {
  /* Mobile: single column, reduced spacing, hide workflow cycle */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet: maintain most desktop layout */
}

@media (min-width: 1025px) {
  /* Desktop: full layout, all animations */
  .workflow-container { display: block !important; }
}
```

---

## 📝 BUILD ORDER (Priority)

### **PHASE 3: PRODUCTS** ⚠️ START HERE (6-8 hours estimated)

1. **Create accordion structure**
   - 7 collapsible sections
   - Smooth expand/collapse animation
   - Active state styling (cyan glow)

2. **Tier 1: Quick Win Automations**
   - Description, best for, sales approach
   - Demo: Workflow diagram or automation example

3. **Tier 2: AI Chat & Voice Agents** ⭐ PRIORITY
   - Description, best for, sales approach
   - **MUST:** Live chat widget (iframe or embed)
   - **MUST:** Voice agent demo (phone number or audio player)

4. **Tier 3: Premium Websites** ⭐ PRIORITY
   - Description, best for, sales approach
   - **MUST:** Dual device mockups (laptop + phone)
   - **MUST:** Live website iframes inside mockups
   - Example sites: Greenstar Solar, LCB, Detail Dynamics

5. **Tier 4: Lead Systems**
   - Description, best for, sales approach
   - Demo: Lead capture form + dashboard preview

6. **Tier 5: Real-time Dashboards**
   - Description, best for, sales approach
   - Demo: Analytics dashboard iframe

7. **Tier 6: AI Employees**
   - Description, best for, sales approach
   - Demo: Voice note agent example (audio or workflow)

8. **Tier 7: Business Operating Systems** ⭐ FLAGSHIP
   - Most detailed section
   - Description, best for, sales approach
   - **MUST:** Solar BOS demo iframe
   - Optional: Video walkthrough
   - Emphasize this is the premium offering

### **PHASE 4: FINISHING** (2-3 hours estimated)

9. **Section 5: Commissions**
   - Sales Rep commission table
   - BDR commission table
   - Grid layout, gold highlights

10. **Section 7: Portfolio** (conditional)
    - Only if demos in Section 4 aren't sufficient
    - Project cards grid
    - Screenshots + descriptions

11. **Section 8: Sign-off**
    - Welcome message
    - Support copy
    - CTA button

12. **Final polish**
    - Animation timing tweaks
    - Responsive testing (mobile, tablet, desktop)
    - Performance optimization
    - Cross-browser testing (Chrome, Safari, Firefox)

---

## 🎬 ANIMATION & INTERACTION DETAILS

### **Scroll-triggered animations**
```javascript
// Already implemented - Intersection Observer
// Fades in sections as they enter viewport
// 0.1 threshold, -100px bottom margin
```

### **Accordion behavior**
```javascript
// Smooth height transition (300ms)
// Rotate chevron icon (180deg)
// Close others when opening new (optional)
// Update URL hash for deep linking
```

### **Hover effects**
- Cards: lift 4px, add shadow
- Buttons: background shift, scale 1.02
- Links: underline animation from left
- Accordion headers: border glow to cyan

---

## ⚠️ CRITICAL SUCCESS CRITERIA

Before marking complete, verify:

1. ✅ Matches Cold Lava website design exactly
2. ✅ All 7 product tiers have working demos/iframes
3. ✅ Chat widget is testable (Tier 2)
4. ✅ Voice agent is demonstrable (Tier 2)
5. ✅ Website previews in device mockups (Tier 3)
6. ✅ BOS demo is impressive (Tier 7)
7. ✅ Both commission tables present (Sales Rep + BDR)
8. ✅ Smooth animations throughout
9. ✅ Fully responsive (mobile → desktop)
10. ✅ Fast page load (<3s)
11. ✅ No console errors
12. ✅ Works on Safari, Chrome, Firefox

---

## 📚 REFERENCE MATERIALS

**Primary reference:** https://coldlava.ai  
- Study the animations
- Copy the vibe
- Match the spacing
- Replicate the interactions

**Current build:** https://sales-rep-onboarding-final.vercel.app  
- Shows what's done so far
- Use as starting point

**Original instructions:** `/home/moltbot/clawd/sales-materials/SALES-REP-DECK-PLAN.md`  
- Full detailed spec
- All design tokens
- Complete section breakdowns

---

## 🚀 GETTING STARTED

1. **Review current build:** https://sales-rep-onboarding-final.vercel.app
2. **Study coldlava.ai** - open it side-by-side, inspect elements
3. **Start with Section 4 (Products)** - this is the most important
4. **Use the front-end design tool** to build components
5. **Test frequently** - commit, push, deploy, check production
6. **Match the vibe** - animations, spacing, colors must feel identical to coldlava.ai

---

## 💡 TIPS FOR SUCCESS

**What worked:**
- Side-by-side screenshots (Cold Lava vs our build) to catch differences
- Using existing working code (workflow cycle) as reference
- Building section-by-section, testing each before moving on

**What to avoid:**
- Guessing at design values - inspect coldlava.ai to get exact numbers
- Building everything then testing - test frequently
- Using Tailwind classes without loading Tailwind
- Making it "different" - stick to matching the reference exactly

**When stuck:**
- Screenshot both sites side-by-side
- Use browser inspect on coldlava.ai
- Copy CSS values directly
- Ask for visual comparison feedback

---

## 🎯 THE GOAL

Create a sales deck that:
1. **Looks indistinguishable** from the Cold Lava website in style/vibe
2. **Empowers sales reps** with live demos they can show clients
3. **Impresses clients** with smooth animations and professional design
4. **Works flawlessly** on all devices and browsers

**Remember:** This is what sales reps will use to win deals. Make it stunning.

---

**Ready? Start with Section 4 (Products accordion). Use the front-end design tool. Make it match coldlava.ai. Ship it.**
