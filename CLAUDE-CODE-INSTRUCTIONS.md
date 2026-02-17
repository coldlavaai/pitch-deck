# Cold Lava Master Client Deck — Build Instructions for Claude Code

**Project:** Cold Lava Master Client Deck (customer-facing presentation)
**GitHub:** https://github.com/coldlavaai/pitch-deck
**Production:** https://pitch-deck-olivers-projects-a3cbd2e0.vercel.app
**Short alias:** https://pitch-deck-orpin-one.vercel.app
**Working directory:** `/home/moltbot/pitch-deck/`

---

## 🎯 OBJECTIVE

Build a premium, customer-facing interactive web presentation for Cold Lava that:

1. **Looks identical** to the internal sales rep deck in design/style/animations
2. **Is shown to prospects** on demo calls — this is what the CLIENT sees
3. **Is configurable by the rep** via a hidden sidebar (rep sets it up after discovery call, before demo)
4. **Follows JJ's psychology-based structure** — each tier uses an emotional flow that moves the prospect from pain to desire to action
5. **Has NO internal content** — no commissions, no BDR rates, no rep guidance text

**Reference deck (copy design from this):** https://sales-rep-onboarding-final.vercel.app
**Reference source:** `/home/moltbot/sales-deck/index.html` — COPY THE ENTIRE CSS VERBATIM

---

## 📁 FILE STRUCTURE

```
/home/moltbot/pitch-deck/
├── index.html          (single file — the entire deck)
├── cold-lava-logo.png  (copy from /home/moltbot/sales-deck/)
├── cold-lava-logo-gold.png
├── cold-lava-logo-blue.png
├── README.md
└── .vercel/
```

Stack: Vanilla HTML/CSS/JS — no frameworks. Same approach as the reference deck.

---

## 🎨 DESIGN SYSTEM — COPY FROM REFERENCE DECK

**DO NOT redesign or improvise.** Copy the entire `<style>` block from `/home/moltbot/sales-deck/index.html` as the foundation. Every CSS variable, animation, component, and pattern should be identical.

Key design tokens (already in the reference CSS):
```css
--color-bg: #030305;
--color-accent: #00d4ff;
--color-gold: #D4AF37;
--color-border: rgba(6, 182, 212, 0.2);
--font-primary: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
```

Copy exactly:
- All `.card`, `.card.with-corners`, `.card.with-grid` styles
- All `.fade-in`, `.label`, `.lead` styles
- All `.light-stream`, `.grid-pattern`, `.section-atmosphere` styles
- Loading screen, ticker, workflow box styles
- Products accordion styles (`.tier-item`, `.tier-header`, `.tier-body`, etc.)
- Device mockup styles (`.laptop-frame`, `.phone-frame`, `.device-showcase`)
- Demo area styles (`.demo-area`, `.demo-frame-wrapper`, `.demo-card`)
- All keyframe animations (streamFlow, fadeInUp, pulse, ticker, etc.)
- All responsive breakpoints

**ADD these new styles:**

```css
/* ===== REP SIDEBAR (CONFIGURATOR) ===== */
#rep-sidebar {
  position: fixed;
  right: -320px;
  top: 0;
  height: 100vh;
  width: 300px;
  background: rgba(3, 3, 5, 0.97);
  border-left: 1px solid rgba(6, 182, 212, 0.2);
  backdrop-filter: blur(20px);
  z-index: 9999;
  transition: right 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 2rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

#rep-sidebar.open {
  right: 0;
}

#sidebar-toggle {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-right: none;
  color: rgba(6, 182, 212, 0.5);
  cursor: pointer;
  padding: 1rem 0.5rem;
  z-index: 10000;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  writing-mode: vertical-rl;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.3s;
}

#sidebar-toggle:hover {
  background: rgba(6, 182, 212, 0.15);
  color: var(--color-accent);
}

/* Sidebar content styles */
.sidebar-section {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.5rem;
}

.sidebar-label {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(6, 182, 212, 0.4);
  margin-bottom: 0.75rem;
}

.sidebar-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-primary);
  padding: 0.5rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  outline: none;
}

.sidebar-input:focus {
  border-color: rgba(6, 182, 212, 0.3);
}

.tier-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  cursor: pointer;
}

.tier-toggle input[type="checkbox"] {
  accent-color: var(--color-accent);
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.tier-toggle label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.tier-toggle:has(input:checked) label {
  color: var(--color-accent);
}

.mode-btn {
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.3);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.mode-btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(6, 182, 212, 0.05);
}

/* Prospect name HUD (shows in hero when name is set) */
#prospect-hud {
  display: none;
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 100;
  border: 1px solid rgba(6, 182, 212, 0.15);
  padding: 0.4rem 0.75rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

#prospect-hud.visible {
  display: block;
}

/* Scroll progress bar */
#scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 1px;
  background: linear-gradient(to right, rgba(6, 182, 212, 0.3), var(--color-accent));
  z-index: 9998;
  width: 0%;
  transition: width 0.1s linear;
}

/* Psychology flow within tiers */
.psych-block {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.psych-block:last-child {
  border-bottom: none;
}

.psych-label {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(6, 182, 212, 0.3);
  margin-bottom: 0.75rem;
}
```

---

## 📋 SECTION-BY-SECTION REQUIREMENTS

### LOADING SCREEN
Identical to reference deck. Cold Lava logo pulses, fades after 800ms.

---

### SECTION 1: HERO

**Label:** `COLD LAVA / 2026`

**Headline:**
```
Built for
Your Business
Not adapted from
Someone else's.
```
(Same staggered animation as reference deck)

**Subtext:**
"Custom software, AI employees, and automation built around how you actually work — not how Silicon Valley thinks you should."

**HUD elements:** Keep exactly (London time, coordinates, corner brackets)

**Ticker:** Change items to prospect-relevant:
`Custom Software · AI Employees · Built In The UK · You Own The Code · No Vendor Lock-in · Bespoke Systems · GDPR Compliant · Security First · Full Transparency ·`

**CTA:** "Explore What We Build →" (scrolls to The Problem section)

**Prospect name display:** When rep has entered a prospect name in the sidebar, show a subtle HUD tag at bottom-left: `PREPARED FOR: [NAME]`

---

### SECTION 2: THE PROBLEM

**Label:** `The Problem / 001`

**Headline:** "Most Businesses Are Running on Systems Built for Someone Else"

**Two boxes (same grid layout as reference):**
- Box 1: "Generic Software Trap" — "Off-the-shelf tools make you adapt YOUR process to THEIR logic. You end up with workarounds, manual steps, and frustrated staff."
- Box 2: "The AI Hype Trap" — "Adopting tools just because they're new, without a clear fit, wastes budget and creates chaos — not efficiency."

**Problem list** (same left-border list style):
- "Leads arrive after hours. Nobody answers. Revenue walks away."
- "Three systems that don't talk to each other. Data lives in spreadsheets."  
- "Your best people buried in admin, not the work that actually grows the business."
- "Software that does 80% of what you need — and the 20% gap costs you every day."

**Conclusion bar (same style as reference):**
"The fix isn't more software. It's software built specifically for YOU."

---

### SECTION 3: WHO IS COLD LAVA

**Label:** `Company / 002`

**Headline:** "Who Is Cold Lava"

**Lead text:**
"We're a UK-based software and AI company. We don't sell templates. We don't outsource. Every system we build is written from scratch, by our in-house team, around YOUR business — not the other way round."

**Three capability cards** (same staggered transform as reference deck):
1. **Bespoke Systems, Not Templates** — "Built around how you work, not how a generic platform thinks you should work."
2. **Real Business Experience** — "We've built and run real businesses. We know the pain points because we've lived them."
3. **Enterprise Quality, Startup Speed** — "You get the quality of a major agency at a fraction of the price and timeline."

**Mission box (gold, sticky):**
```
Mission / Philosophy

"We exist to help UK businesses ditch off-the-shelf software and adopt 
bespoke AI-powered systems that actually fit how they work."

Jacob Johnson
Director, Cold Lava
```

---

### SECTION 4: OUR PROCESS

**Copy exactly from the reference deck** — this section is universal and applies perfectly to prospects. Same layout, same content, same animated workflow cycle.

Only change: Label `Process / 003`

---

### SECTION 5: HOW WE HELP (PRODUCT TIERS)

**Label:** `How We Help / 004`

**Headline:** "Ways We Help Businesses Scale"

**Subheadline:** "We build systems across six areas. Every solution is bespoke — built around your business, not adapted from a template. Below are examples of what we've built for clients like you."

**Layout:** Same accordion structure as reference deck (copy `.tier-item`, `.tier-header`, `.tier-body` structure verbatim)

**Visibility:** Each tier can be hidden/shown via the rep sidebar. If a tier is hidden, its `display: none` — it simply doesn't appear in the prospect's view.

**For EVERY tier, the content follows this psychology flow:**

```
[WOW BLOCK]
— Bold impact statement / striking headline
— 1-2 sentence pattern interrupt

[THE REALITY BLOCK]
— "Here's what most businesses face..."
— The specific pain this tier solves

[THE VISION BLOCK]
— "Here's what it looks like when it's solved"
— Before/after or outcome statement

[HOW IT WORKS BLOCK]
— 3-bullet max explanation

[LIVE DEMO BLOCK]
— The iframe / interactive demo / device mockup
— "See it working right now"

[SOCIAL PROOF BLOCK]
— Client example card (name, industry, brief outcome)

[NEXT STEP BLOCK]
— "Is this relevant to your business? We can show you exactly how this would work for [prospect name]."
```

---

#### TIER 1: Quick-Win Automations

**Badge:** `Entry Level`
**Description:** Low-friction, high-impact automations that pay for themselves in weeks.

**WOW:** "Most businesses are leaking 3-5 hours a week on tasks that take an AI system 3 seconds."

**The Reality:** "Reviews go unanswered. Calls go missed. Reminders get forgotten. Not because your team is bad — because they're human, and humans have limits."

**The Vision:** "Automated Google review responses posted in seconds. Missed calls followed up by text in under 2 minutes. Appointment reminders sent without a staff member lifting a finger."

**How It Works:**
- Trigger: event happens (missed call, new review, booked appointment)
- System fires instantly with personalised message
- You review results in a simple dashboard

**Demo:** Workflow diagram (same as reference deck — trigger → action → result nodes)

**Examples:**
- Google Review Auto-Responder + Review Request (two-tier system)
- Missed Call Text-Back
- Appointment Reminder System

**Social Proof Card:**
```
"We set up the missed call text-back and review system in a week. 
Our response rate went from basically nothing to over 40%."
— Solar installer, South East England
```

---

#### TIER 2: Premium Websites & Presentations

**Badge:** `Foundation`
**Description:** Websites and presentations that actually convert — not templates, not Squarespace, not "good enough."

**WOW:** "Your website is your best salesperson. Most businesses are sending prospects to a CV from 2019."

**The Reality:** "Generic website builders give you a site that looks like 10,000 other companies. It loads slow, doesn't reflect your brand, and doesn't convert."

**The Vision:** "A website that loads in under 2 seconds, looks like it cost 10x what it did, and is built to convert visitors into enquiries."

**How It Works:**
- Custom-coded (no page builders, no templates)
- AI chat widgets, animations, interactive features built in
- You own every line of code

**Demo:** Laptop + phone device mockups side by side (same component from reference deck)

**Website examples (fully scrollable iframes in device mockups):**
- Websites section FIRST:
  - Greenstar Solar (laptop + phone): `gs-website-oct25-ppq7bdf1i-olivers-projects-a3cbd2e0.vercel.app`
  - Liverpool Cotton Brokers (laptop + phone): `lcb-website-jan2026-8cx4ow749-olivers-projects-a3cbd2e0.vercel.app`
  - Cold Lava (laptop + phone): `cl-website-jul25-hyl51g61g-olivers-projects-a3cbd2e0.vercel.app`
- Presentations section BELOW (same laptop + phone format):
  - Trading Intelligence Deck: `https://trading-intelligence-deck.coldlava.ai`
  - Aztec Arc: `https://aztecarc.coldlava.ai`
  - Cold Lava Portfolio: `https://cold-lava-portfolio.vercel.app`

**Social Proof Card:**
```
"The new website completely changed how prospects perceive us. 
We went from 'who are these guys?' to winning contracts on the first call."
— Liverpool Cotton Brokers
```

---

#### TIER 3: Custom Dashboards & Business Intelligence

**Badge:** `Intelligence`
**Description:** Real-time visibility into your business — not spreadsheets, not generic reports.

**WOW:** "If you can't see your business in real-time, you're always reacting — never leading."

**The Reality:** "Most business owners are making decisions based on data that's 3 days old, formatted in a spreadsheet, manually updated by someone who's already behind on other things."

**The Vision:** "One dashboard. Live data. Every KPI you care about — updated in real-time. On your phone or any screen, anywhere."

**How It Works:**
- We connect to your existing data sources (CRM, spreadsheets, databases)
- Build a real-time dashboard tailored to your business
- You get visibility without changing how you work

**Demo:** Laptop-ONLY iframe (no phone mockups for dashboards):
- Liverpool Cotton Brokers Dashboard
- Cold Lava Solar Database Reactivation Dashboard

**Social Proof Card:**
```
"I used to spend Friday afternoons pulling reports. Now I open 
the dashboard on my phone. Job done."
— Business owner
```

---

#### TIER 4: Automated Lead Management Systems

**Badge:** `Growth`
**Description:** Stop losing leads to slow follow-up. Every lead gets instant, intelligent, personalised contact — automatically.

**WOW:** "You've got leads sitting in your CRM right now that could become clients. They're just waiting for someone to follow up."

**The Reality:** "Speed to lead is everything. The business that responds first wins. But manual follow-up is slow, inconsistent, and expensive."

**The Vision:** "Every new lead gets a personalised email within 60 seconds. Qualified automatically. Appointment booked without a sales rep involved. You only speak to serious prospects."

**How It Works:**
- Lead arrives (web form, ad, referral)
- Automated qualification sequence fires (email, SMS, WhatsApp)
- Qualified leads get booked straight into your calendar
- Everything tracked in your CRM

**Deployment options:**
- Build custom software you own outright
- Embed into your existing CRM (HubSpot, Salesforce, GoHighLevel, etc.)

**Demo:** Workflow diagram showing lead → qualify → book → CRM

**Social Proof Card:**
```
"We had 5,000 old leads sitting untouched. The reactivation system 
booked 47 appointments in the first month."
— Solar company, UK
```

---

#### TIER 5: AI Employees

**Badge:** `🔥 Flagship`
**Description:** An AI employee you control via voice notes — exactly like instructing a human team member.

**WOW:** "What if you could hire a team member that never sleeps, never gets overwhelmed, and costs less per month than a gym membership?"

**The Reality:** "Hiring is expensive. Training takes months. And even great employees have limits — they can't be in multiple places, handle 500 tasks simultaneously, or work at 3am."

**The Vision:** "An AI employee that executes your instructions via voice note. 'Chase up any customers who got quotes in the last 5 days.' Done. 'Update the website header.' Done. 'Pull all leads from last week and send them a follow-up.' Done."

**How It Works:**
- You send a voice note (exactly like WhatsApp)
- AI employee interprets, executes, reports back
- Works across ANY system — CRM, website, database, email, calendar
- Doesn't require Cold Lava systems — works with what you already have

**CRITICAL INTERACTIVE DEMO:**
- Left side: Embedded WhatsApp-style interface (or iframe of a WhatsApp-like UI)
- Right side: Demo website
- User sends a voice note requesting a change to the website
- AI Employee makes the change in real-time
- Goal: Prospect experiences it themselves

If a fully live demo isn't feasible yet, show:
- WhatsApp mockup conversation showing a voice note instruction and the AI's response
- Video walkthrough or animated demo showing the flow

**Social Proof Card:**
```
"I told it to 'follow up with everyone who hasn't responded to last month's quote' 
via voice note on my commute. By the time I got to the office, it was done."
— Business owner
```

---

#### TIER 6: Business Operating Systems

**Badge:** `🏆 Premium`
**Description:** A fully bespoke operating system for your business — built around how YOU work, not how generic software thinks you should.

**WOW:** "The most successful businesses in 10 years won't be running HubSpot or Salesforce. They'll be running their own bespoke systems that competitors can't copy."

**The Reality:** "Off-the-shelf software forces you to change how YOUR business works to fit THEIR logic. You end up with workarounds, manual steps, and paying for features you don't need while missing the ones you do."

**The Vision:** "A complete business operating system built from the ground up for your exact workflow. One place for everything — customers, jobs, finance, compliance, team — all connected, all real-time, all yours."

**How It Works:**
- Full discovery (we learn your processes in depth)
- Custom-designed around your workflow
- Built and deployed in phases (you see working software every 2 weeks)
- You own every line of code, every database, every feature

**Demo (BOS tabs — same component as reference deck):**
Show 4 examples, each in its own tab:
1. **Solar BOS** — Interactive iframe: `cl-solarbos-jan-26-f903hpt6x-olivers-projects-a3cbd2e0.vercel.app`
2. **Detail Dynamics BOS** — Interactive iframe (if available, otherwise placeholder)
3. **Trading Intelligence Bot** — Show the WhatsApp mockup iPhone conversations from `https://trading-intelligence-deck.coldlava.ai`
4. **Aztec Blueprint** — Display the blueprint from `https://aztecarc.coldlava.ai`

**Social Proof Card:**
```
"We replaced four separate systems with one. The time saved per week 
is equivalent to hiring two more people."
— Solar BOS client
```

**Flagship glow treatment** (same `.flagship-glow` class as reference deck)

---

### SECTION 6: WHY COLD LAVA

**Label:** `Why Us / 005`

**Headline:** "What Makes Us Different"

**6-card grid** (same layout as reference deck's "Sales Points" section, reframed for prospects):

1. **100% UK-Based Team** — "Every line of code written in-house, in the UK. No outsourcing. No offshoring. You always know who's working on your business."

2. **Built From Scratch** — "We don't use templates. Everything is custom-built around your exact requirements. No compromises."

3. **Real Business Experience** — "We've built and run real businesses. We understand what actually matters — not just what sounds good in a pitch."

4. **Full Code Ownership** — "When we're done, you own everything. Code, database, documentation. No licensing fees. No vendor lock-in."

5. **No Vendor Lock-In** — "You can take our work anywhere, maintain it yourself, or have any developer continue it. Complete freedom."

6. **Anything Is Possible** — "Custom development has no ceiling. If your business needs it, we'll build it. We've never had to say 'we can't do that.'"

---

### SECTION 7: SIGN-OFF / CTA

**Label:** `Next Steps / 006`

**Headline:** "Let's Build Something Brilliant"

**Body:**
"If anything in here resonated — if you saw a solution to a problem your business is dealing with — let's talk.

No pressure. No hard sell. Just a conversation about what's possible for YOUR business.

We'll show you exactly how this would work for you — your industry, your processes, your goals."

**CTA Button (gold, same style as reference deck):**
"Book a Discovery Call →" (link: `https://cal.com/coldlava/discovery-call`)

**Secondary CTA (subtle, text link):**
"Or send us a message" (link to contact or email)

**Sign-off names:**
```
Jacob Johnson
Director, Cold Lava

Oliver Tatler
Technical Lead
```

**Cold Lava logo + "Cold Lava / 2026"** (same as reference deck)

---

## 🔧 REP SIDEBAR CONFIGURATOR (BUILD FROM DAY 1)

### Toggle
- Fixed right edge tab: label "CONFIG" written vertically
- Click or press `S` key to open/close
- Smooth 250ms slide animation

### Sidebar Contents

```
[PROSPECT]
Name: _________________ (input field)
→ When filled: shows "PREPARED FOR: [NAME]" in bottom-left HUD on all sections

[MODE]
[Demo]  [Commercial]  [Executive]

(Note: In Phase 1, all modes show the same content. 
The buttons are present for future use. Demo is default/active.)

[ACTIVE TIERS]
☑ Tier 1: Quick-Win Automations
☑ Tier 2: Websites & Presentations
☑ Tier 3: Dashboards & Intelligence
☑ Tier 4: Lead Management
☑ Tier 5: AI Employees
☑ Tier 6: Business Operating Systems

[APPLY]
[Apply Changes] button → hides/shows tiers, updates prospect HUD

[RESET]
[Reset All] button → all tiers visible, name cleared
```

### Behaviour
- State persists in `localStorage` (survives page refresh)
- When a tier is unchecked and Apply is clicked, that `.tier-item` gets `display: none`
- Checked tiers are fully visible
- Sidebar is HIDDEN from prospect view (the toggle tab is subtle; rep uses keyboard shortcut `S`)

---

## ⚡ JAVASCRIPT REQUIREMENTS

Copy from reference deck:
- Loading screen handler
- Intersection Observer (fade-in on scroll)
- Products accordion toggle (`toggleTier`)
- Deep linking via URL hash
- Hero mouse tracking + London time clock
- BOS tabs switcher

Add new:
```javascript
// ===== REP SIDEBAR =====
const sidebar = document.getElementById('rep-sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

function toggleSidebar() {
  sidebar.classList.toggle('open');
}

sidebarToggle.addEventListener('click', toggleSidebar);

document.addEventListener('keydown', function(e) {
  if (e.key === 's' || e.key === 'S') {
    // Only if not focused on an input
    if (document.activeElement.tagName !== 'INPUT') {
      toggleSidebar();
    }
  }
});

// Apply configuration
document.getElementById('apply-config').addEventListener('click', function() {
  // Prospect name
  const name = document.getElementById('prospect-name').value.trim();
  const hud = document.getElementById('prospect-hud');
  const hudName = document.getElementById('prospect-hud-name');
  if (name) {
    hudName.textContent = name.toUpperCase();
    hud.classList.add('visible');
  } else {
    hud.classList.remove('visible');
  }
  
  // Tier visibility
  const checkboxes = document.querySelectorAll('.tier-checkbox');
  checkboxes.forEach(function(cb) {
    const tierId = cb.dataset.tier;
    const tierEl = document.getElementById(tierId);
    if (tierEl) {
      tierEl.style.display = cb.checked ? '' : 'none';
    }
  });
  
  // Save to localStorage
  const config = {
    name: name,
    tiers: {}
  };
  checkboxes.forEach(function(cb) {
    config.tiers[cb.dataset.tier] = cb.checked;
  });
  localStorage.setItem('cl-deck-config', JSON.stringify(config));
  
  // Close sidebar
  sidebar.classList.remove('open');
});

// Load saved config
const savedConfig = localStorage.getItem('cl-deck-config');
if (savedConfig) {
  try {
    const config = JSON.parse(savedConfig);
    if (config.name) {
      document.getElementById('prospect-name').value = config.name;
      document.getElementById('prospect-hud-name').textContent = config.name.toUpperCase();
      document.getElementById('prospect-hud').classList.add('visible');
    }
    if (config.tiers) {
      Object.entries(config.tiers).forEach(([tierId, visible]) => {
        const cb = document.querySelector(`.tier-checkbox[data-tier="${tierId}"]`);
        const tierEl = document.getElementById(tierId);
        if (cb) cb.checked = visible;
        if (tierEl) tierEl.style.display = visible ? '' : 'none';
      });
    }
  } catch(e) {}
}

// Reset
document.getElementById('reset-config').addEventListener('click', function() {
  document.getElementById('prospect-name').value = '';
  document.getElementById('prospect-hud').classList.remove('visible');
  document.querySelectorAll('.tier-checkbox').forEach(cb => {
    cb.checked = true;
    const tierEl = document.getElementById(cb.dataset.tier);
    if (tierEl) tierEl.style.display = '';
  });
  localStorage.removeItem('cl-deck-config');
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});
```

---

## 🔄 WORKFLOW

1. Edit files in `/home/moltbot/pitch-deck/`
2. Commit and push to GitHub: `https://github.com/coldlavaai/pitch-deck`
3. Deploy: `vercel --prod` (from `/home/moltbot/pitch-deck/`)
4. Check: `https://pitch-deck-orpin-one.vercel.app`

---

## 📋 BUILD ORDER

### Phase 1: Foundation (Start here)
1. Clone/init the GitHub repo locally at `/home/moltbot/pitch-deck/`
2. Copy logos from `/home/moltbot/sales-deck/`
3. Create `index.html` with:
   - Complete CSS from reference deck (verbatim copy of `<style>` block)
   - New CSS additions (sidebar, scroll progress, psych blocks)
   - Loading screen (identical to reference)
   - Background atmosphere (light streams, fixed)
   - Scroll progress bar
   - Sidebar HTML + toggle tab
4. Commit + push + deploy
5. Confirm design matches reference at the production URL

### Phase 2: Hero + Static Sections
6. Hero section (prospect-facing headline, same HUD + orb animations)
7. Tech stack ticker (updated labels)
8. The Problem section
9. Company section
10. Our Process section (copy from reference)
11. Commit + deploy + check

### Phase 3: Products (biggest section)
12. Products section with accordion
13. Tier 1: Quick-Win Automations (full psychology flow + workflow demo)
14. Tier 2: Websites & Presentations (full flow + device mockups + iframes)
15. Tier 3: Dashboards (full flow + laptop-only iframes)
16. Tier 4: Lead Management (full flow + workflow diagram)
17. Tier 5: AI Employees (full flow + WhatsApp demo)
18. Tier 6: Business Operating Systems (full flow + BOS tabs + iframes)
19. Commit + deploy + check each tier

### Phase 4: Remaining Sections + Sidebar
20. Why Cold Lava (6-card grid)
21. Sign-off / CTA
22. Rep sidebar full functionality (JS + localStorage)
23. Prospect name HUD
24. Tier visibility toggles
25. Commit + deploy + full test

### Phase 5: Polish
26. Responsive testing (mobile, tablet, desktop)
27. Cross-browser testing (Chrome, Safari, Firefox)
28. Performance (<3s load)
29. Console errors
30. Final visual comparison vs `https://sales-rep-onboarding-final.vercel.app`

---

## ✅ SUCCESS CRITERIA

Before marking complete:

- [ ] Design visually indistinguishable from reference deck
- [ ] Loading screen works
- [ ] All animations fire correctly (fade-in, ticker, workflow cycle)
- [ ] All 6 tiers present with psychology flow content
- [ ] All iframes load and are scrollable/interactive
- [ ] Device mockups (laptop + phone) display correctly
- [ ] BOS tabs switch correctly
- [ ] Rep sidebar opens/closes (click + S key)
- [ ] Tier visibility toggles work (tiers hide/show)
- [ ] Prospect name shows in HUD
- [ ] Config persists in localStorage
- [ ] NO commissions, NO BDR rates, NO sales rep guidance visible
- [ ] All language is prospect-facing
- [ ] "Book a Discovery Call" CTA links correctly
- [ ] Scroll progress bar works
- [ ] Responsive on mobile
- [ ] <3s load time
- [ ] No console errors
- [ ] Works on Chrome, Safari, Firefox

---

## 🚫 WHAT TO AVOID

1. **Don't invent design** — copy values from the reference deck exactly
2. **Don't include commissions** — no £ amounts, no BDR rates, not even as placeholders
3. **Don't include sales tips** — remove all gold callout boxes that say "Sales Tip"
4. **Don't use rep-facing language** — everything speaks to the PROSPECT
5. **Don't build "different"** — this must feel like the same design system as the reference
6. **Don't skip the demos** — live examples are the most important part of each tier
7. **Test frequently** — commit, deploy, check after each phase

---

## 📚 REFERENCE MATERIALS

**Design reference (live):** https://sales-rep-onboarding-final.vercel.app
**Design source (copy CSS from this):** `/home/moltbot/sales-deck/index.html`
**JJ's master brief:** `/home/moltbot/clawd/sales-materials/SALES-REP-DECK-MASTER-BRIEF.md`
**JJ's Q&A log:** `/home/moltbot/clawd/sales-materials/SALES-DECK-QA-LOG.md`
**Build plan:** `/home/moltbot/clawd/MASTER-CLIENT-DECK-PLAN.md`

**Client website URLs for iframes:**
- Greenstar Solar: `https://gs-website-oct25-ppq7bdf1i-olivers-projects-a3cbd2e0.vercel.app`
- LCB: `https://lcb-website-jan2026-8cx4ow749-olivers-projects-a3cbd2e0.vercel.app`
- Cold Lava: `https://cl-website-jul25-hyl51g61g-olivers-projects-a3cbd2e0.vercel.app`
- Solar BOS: `https://cl-solarbos-jan-26-f903hpt6x-olivers-projects-a3cbd2e0.vercel.app`
- Trading Intelligence: `https://trading-intelligence-deck.coldlava.ai`
- Aztec Arc: `https://aztecarc.coldlava.ai`
- Cold Lava Portfolio: `https://cold-lava-portfolio.vercel.app`

---

**The goal:** A pitch deck so good that a prospect watches it and thinks "these people get it." Premium, personal, proof-backed. Make it stunning.
