# Cognisa v2 — Full Project Review & Style Audit

> **Purpose**: A single reference document for the entire Cognisa codebase — structure, design system, component inventory, and a detailed inconsistency report between the home page and subpages. Use this to avoid re-analysing the project in future sessions.

---

## 1. Tech Stack & Dependencies

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + `tw-animate-css` + `tailwindcss-animate` + `@tailwindcss/typography` |
| Fonts | Plus Jakarta Sans (body), JetBrains Mono (code/mono) |
| Motion | Framer Motion v12 |
| UI Primitives | Radix UI (full suite), shadcn/ui (48 components) |
| State | Zustand, React Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| DB | Prisma + PostgreSQL |
| Auth | NextAuth v4 |

---

## 2. Project File Structure

```
src/
├── app/
│   ├── globals.css              # 865 lines — design tokens, glass utils, animations
│   ├── layout.tsx               # Root: fonts, metadata, html shell
│   ├── template.tsx             # Framer Motion page transition wrapper
│   ├── page.tsx                 # HOME PAGE (glass container shell)
│   ├── not-found.tsx            # Interactive terminal 404 page
│   ├── about/                   # layout.tsx + page.tsx
│   ├── capabilities/            # page.tsx only (no layout)
│   ├── contact/                 # layout.tsx + page.tsx
│   ├── insights/                # layout.tsx + page.tsx + [slug]/page.tsx
│   ├── privacy/                 # layout.tsx + page.tsx
│   ├── process/                 # layout.tsx + page.tsx
│   ├── services/                # layout.tsx + page.tsx + [slug]/page.tsx
│   ├── terms/                   # layout.tsx + page.tsx
│   ├── work/                    # layout.tsx + page.tsx + [slug]/page.tsx
│   └── api/                     # API routes
├── components/
│   ├── sections/    (18 files)  # Home page section components
│   ├── shared/      (28 files)  # Reusable shared components
│   │   └── fragments/ (10 files)# Smaller visual/animation fragments
│   └── ui/          (48 files)  # shadcn/ui primitives
├── data/                        # Static data (services.ts, work.ts, insights.ts)
├── hooks/                       # use-mobile.ts, use-toast.ts
└── lib/                         # db.ts, utils.ts
```

---

## 3. Design System Reference

### 3.1 Color Palette (CSS Custom Properties)

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#0891b2` (Cyan-600) | Primary brand, accents, links |
| `--foreground` | `#020617` (Slate-950) | Main text |
| `--text-primary` | `#000000` | Headings |
| `--text-secondary` | `#0f172a` (Slate-900) | Secondary text |
| `--text-muted` | `#334155` (Slate-700) | Muted text |
| `--background` | `#f8fbfc` | Page background |
| `--card` | `rgba(255,255,255,0.68)` | Card backgrounds (glass-based) |
| `--border` | `rgba(8,145,178,0.18)` | Borders (cyan-tinted) |
| `--accent` | `rgba(8,145,178,0.1)` | Accent surfaces |
| `--destructive` | `#ef4444` | Error states |
| Chart 1–5 | Cyan → Emerald → Blue | Data viz |
| Custom: `--border-soft` | `rgba(8,145,178,0.16)` | Soft borders |
| Custom: `--glow-soft` | `rgba(14,165,233,0.1)` | Glow effects |

### 3.2 Typography Scale

- **Font**: Plus Jakarta Sans (weights: 300–800)
- **Mono**: JetBrains Mono
- **Base font-size**: 75% (mobile) → 77.5% (md) → 80% (xl) via `html` rule
- **Common heading patterns**: `font-black`, `tracking-tight`, slate-950

### 3.3 Glass Utility Classes (defined in globals.css)

| Class | Background | Border | Border-Radius |
|---|---|---|---|
| `.glass` | White gradient (82%→72%→78% alpha) + blur(30px) | `rgba(15,23,42,0.06)` 1px | 24px |
| `.glass-card` | `#ffffff` solid | `#e2e8f0` (slate-200) | 16px |
| `.glass-panel` | `#ffffff` solid | `#e2e8f0` (slate-200) | 20px |
| `.glass-surface` | `#ffffff` solid | `#e2e8f0` (slate-200) | — |
| `.glass-surface-soft` | `#f8fafc` (slate-50) | `#f1f5f9` (slate-100) | — |
| `.enterprise-ice-card` | `#ffffff` solid | `#e2e8f0` | — |

### 3.4 Animation System

- **Page transitions**: `template.tsx` — opacity+y fade via Framer Motion
- **Section reveals**: `section-reveal` keyframes, `hero-content-rise`
- **Card enter**: `cardVariants` pattern (opacity:0 → 1, y: 24–45 → 0)
- **Marquee**: CSS `translateX(-50%)` at 30s
- **Blob**: `blob-morph` + `blob-spin` — iridescent conic gradient
- **Droplet ripples**: 5 concentric rings animating out from center
- **Progress bar**: `progress-fill` keyframe with `--duration` CSS var
- **Mouse spotlight**: Canvas-based warping grid + radial gradient following cursor
- **Shimmer border**: `shimmer-sweep` — 3s horizontal sweep
- **Gradient border spin**: `gradient-spin` — rotating conic-gradient border on hover

---

## 4. Architectural Patterns

### 4.1 Home Page Shell
```
<main> (min-h-screen, flex center, overflow-x-clip, relative)
  <GlobalAmbientBackground />   ← fixed position, z-0
  <FloatingTopNav />
  <div className="glass ...">   ← THE GLASS CONTAINER (blur, rounded-24px, inset shadow)
    <Hero /> <Marquee /> ... <Footer />
  </div>
</main>
```

> [!IMPORTANT]
> The home page wraps ALL content in a single `.glass` container with `backdrop-filter: blur(30px)`, translucent white gradient background, and `border-radius: 24px`. This creates the characteristic "frosted glass card floating on an ambient background" look.

### 4.2 SubPage Shell (`SubPageShell.tsx`)
```
<main> (same outer classes as home)
  <GlobalAmbientBackground />
  <FloatingTopNav />
  <BackToTop />
  <div className="bg-white border border-slate-200/80 shadow-[...] rounded-[2rem] ...">
    {children}
    {showFooter && <Footer />}
  </div>
</main>
```

> [!CAUTION]
> **CRITICAL MISMATCH #1**: Subpages use `bg-white` with a simple `border border-slate-200/80` and `rounded-[2rem]`. They DO NOT use the `.glass` class. This means:
> - No `backdrop-filter: blur(30px)`
> - No translucent gradient background
> - No glass inset shadow (`inset 0 1px 0 rgba(255,255,255,0.82)`)
> - The ambient background (warping grid, orbs, spotlight) is completely hidden behind the solid white panel

### 4.3 Page Layouts

Some subpages have their own `layout.tsx` that wraps content in `<SubPageShell>`:
- **services**, **about**, **work**, **insights**, **contact**, **process**, **privacy**, **terms** → have layouts

**But**: `about`, `contact`, and `process` pages **also** render `<SubPageShell>` inside their `page.tsx`, creating **double-wrapping** in some cases.

### 4.4 Capabilities page has NO layout.tsx
- Uses `<SubPageShell>` directly in `page.tsx` — inconsistent with the layout pattern.

---

## 5. Component Inventory — Shared

| Component | Purpose | Used By |
|---|---|---|
| `SubPageShell` | Outer shell for all subpages (nav, footer, container) | All subpage layouts |
| `PageHero` | Standardized hero section with gradient bg, grid overlay, orbs, tag, h1, description | All subpages |
| `PageCTA` | Dark (slate-950) bottom CTA banner with grid overlay, orbs, buttons | Most subpages |
| `GlassContentBlock` | White card with rounded corners, optional spotlight hover | Everywhere on subpages |
| `SectionTag` | Pill-shaped label with dot + mono text | All section headers |
| `EnterpriseButton` | Rounded-full link button with arrow animation and light sweep | CTAs across site |
| `DetailHero` | Variant hero for [slug] detail pages | Service/Work/Insight detail |
| `GlobalAmbientBackground` | Fixed bg: warping grid canvas, orbs, spotlight, noise | Home + SubPageShell |
| `ContactForm` | Form component | Contact page |
| `ProcessTimeline` | Vertical timeline | Process page |
| `ProcessPlaybackConsole` | Interactive playback console | Process page |
| `ApplicationPathCards` | Delivery path cards | About page |
| `WarpingGridBackground` | Section-level warping grid | Work listing |
| `SpatialServicePreview` | 3D animated preview inside service cards | Services listing |
| `SpatialWorkPreview` | Similar for work | (exists but usage unclear) |
| `HeroShowcaseCards` | Complex animated showcase cards | Home hero |
| `ValuesConstellation` | Interactive constellation animation | (About section in home) |
| `LiveMetric` | Animated counter/ticker | Service detail sidebar |
| `RadarScanner` | SVG radar animation | Service detail |

### Fragment Components (`shared/fragments/`)

| Fragment | Purpose |
|---|---|
| `MiniNeuralConstellation` | Decorative animated SVG neural net overlay |
| `IridescentBlobBackground` | Animated blob background element |
| `BackToTop` | Floating back-to-top button |
| `TableOfContents` | Sidebar TOC for legal pages |
| `RelatedContent` | Related items carousel/grid |
| `AnimatedCounter` | Number counter animation |
| `WebPreviewFrame` | Browser frame mockup |
| `TaskFlowSimulation` | Interactive task flow viz |
| `ServerTopologyMap` | Animated server topology |
| `CICDPipelineSimulator` | CI/CD pipeline visualization |

---

## 6. Detailed Inconsistency Report: Home vs Subpages

### 🔴 CRITICAL — Container Shell Mismatch

| Property | Home Page | SubPage Shell |
|---|---|---|
| **Background** | `.glass` — translucent white gradient (82%→72%→78% alpha) | `bg-white` — solid opaque white |
| **Backdrop filter** | `blur(30px) saturate(140%)` | None |
| **Border** | `1px solid rgba(15,23,42,0.06)` (near-invisible) | `1px solid slate-200/80` (visible grey) |
| **Shadow** | Complex glass shadow with inset highlights | `shadow-[0_12px_40px_rgba(15,23,42,0.04)]` |
| **Border radius** | `24px` (from `.glass` class) | `rounded-[2rem]` (32px) |
| **Result** | Frosted glass floating card showing ambient bg through it | Opaque white box that hides the ambient background |

> [!WARNING]
> This is the single biggest visual disconnect. The home page feels premium and alive with the glass effect and ambient background showing through. Subpages feel like a different, flatter site.

---

### 🟠 HIGH — Card Styling Inconsistencies

**Home page cards** (Challenges, Services, FAQ, Stats, etc.) follow a clear pattern:
- `rounded-lg` (8px default from Tailwind)
- `border border-slate-200`
- `bg-white` (solid)
- `shadow-sm`
- Hover: `hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_...]`
- Colour-coded accent orbs (`blur-3xl`) in corners
- Animated entry with Framer Motion stagger

**Subpage cards** use `GlassContentBlock`:
- `rounded-[1.2rem]` (19.2px) — different radius!
- `border border-slate-200`
- `bg-white`
- `shadow-sm`
- Hover (when `hoverEffect`): `-translate-y-1 hover:border-slate-350 hover:shadow-md`
- Optional spotlight radial gradient on hover

**Inconsistencies**:
1. **Border radius**: Home uses `rounded-lg` (8px). GlassContentBlock uses `rounded-[1.2rem]` (19.2px). Some subpage inline cards use `rounded-2xl` (16px), `rounded-xl` (12px), or `rounded-lg` (8px) directly.
2. **Hover shadow**: Home uses explicit shadow values (`shadow-[0_18px_48px_rgba(15,23,42,0.08)]`). GlassContentBlock uses `shadow-md`.
3. **Accent orbs**: Home cards have coloured blur orbs. GlassContentBlock has a spotlight effect but no coloured orbs.
4. **No gradient-border-spin on subpages**: The `.gradient-border-spin` CSS class (rotating conic border on hover) defined in globals.css is only used on the home page.

---

### 🟠 HIGH — Interactivity Level Mismatch

**Home page sections** are highly interactive:
- **Challenges**: Tab-based industry selector with auto-play progress bar, animated workflow map, agent handoff SVG animation
- **Services**: Click-to-select card grid with animated dark preview panel
- **PlatformTabs**: Full tab system with animated content panels
- **MultimodalShowcase**: Interactive showcase with multiple interaction types
- **FAQ**: Accordion with smooth open/close animations
- **Process**: Animated process steps with stagger reveals
- **Stats**: Counter animations, gradient borders
- **Testimonials**: Carousel/slider

**Subpage sections** are mostly static or lightly interactive:
- **Services listing**: 3D tilt card hover (good) but no tab/filter interactivity
- **Work listing**: Category filter pills (good) + WarpingGridBackground (good)
- **Insights listing**: Minimal — just hover card lift
- **About**: Animated counters only; rest is static prose
- **Contact**: Form interaction only; info cards have icon hover rotation
- **Process**: ProcessPlaybackConsole + ProcessTimeline (good, well-done)
- **Capabilities**: Interactive Simulator + Meetup Planner (excellent, most interactive subpage)
- **Privacy/Terms**: Completely static except scroll-aware TOC

---

### 🟡 MEDIUM — Typography & Heading Patterns

**Home page headings**:
- H2s: `text-3xl md:text-5xl font-black tracking-tight text-slate-950`
- Body: `text-base font-semibold leading-8 text-slate-600`
- Labels: `text-xs font-black uppercase tracking-[0.18em] text-slate-400`

**Subpage headings** (via PageHero):
- H1: `text-4xl md:text-6xl font-black leading-[1.04] text-slate-950` ✅ Consistent
- Body: `text-base font-semibold leading-8 text-slate-600` ✅ Consistent

**But within subpage sections**:
- Some use `text-foreground` (maps to `#020617` = slate-950) — consistent
- Some use `text-slate-900` directly — consistent tone but different token
- GlassContentBlock children use `text-foreground/70`, `text-foreground/80` — opacity variants
- Services listing cards use `text-slate-650` (non-standard Tailwind class — may not exist!)

---

### 🟡 MEDIUM — Section Background Patterns

**Home page sections** alternate between:
- `bg-white/70` — semi-transparent white
- `bg-gradient-to-b from-white/64 to-slate-50/70` — gradient wash
- Full dark sections (Services preview panel is `bg-slate-950`)

**Subpage sections** use:
- No section backgrounds at all (many are just plain relative containers)
- `bg-white/70` (PageCTA)
- `bg-slate-50/80` (Insights grid section)
- `bg-slate-50 border-y border-slate-200` (Capabilities discovery section)
- `bg-gradient-to-b from-white/60 to-slate-50/70` (About delivery paths)
- PageHero: `bg-gradient-to-br from-white/86 via-cyan-50/45 to-slate-50/80` (consistent across subpages)

> The home page sections have more intentional background variation creating visual rhythm. Subpage sections often feel flat because they lack this layering.

---

### 🟡 MEDIUM — Spacing & Layout Width

**Home page**: Content constrained within the `.glass` container (max-w `2xl:max-w-[1800px]`). Individual sections use `mx-auto max-w-[1400px]`.

**Subpages**: Container is `max-w-full 2xl:max-w-[1800px]` but content sections use a mix of:
- `max-w-[1400px]` (About, Contact, Process)
- `max-w-[1200px]` (Services listing, Work listing, Capabilities, Insights)
- `max-w-[1120px]` (PageHero)
- `max-w-[900px]` (Insights CTA, Privacy/Terms content)
- `max-w-[1000px]` (Process timeline)

> Not necessarily wrong but the variation adds visual inconsistency when navigating between pages.

---

### 🟢 LOW — Remaining Observations

1. **`pill-tag` CSS class** uses indigo/purple (`#6366f1`) for borders and hover colors. The rest of the site uses cyan/teal. This appears to be a leftover from an earlier design iteration.

2. **`.icon-rail`** CSS class uses dark gradient (`#1e1e2f → #252540`) and indigo accent (`rgba(99, 102, 241, 0.15)`). Not consistent with the cyan palette. Possibly unused.

3. **Terminal cursor** in `.terminal-cursor::after` uses `color: #6366f1` (indigo). Only used on the 404 page which has its own theme, so minor.

4. **Double SubPageShell wrapping**: `about/page.tsx` renders `<SubPageShell showFooter={false}>` inside `<SubPageShell>` from the layout. Similarly `contact/page.tsx` renders `<SubPageShell>` inside the layout's `<SubPageShell>`. And `process/page.tsx` renders `<SubPageShell showFooter={false}>` inside the layout's `<SubPageShell>`. This creates nested identical containers.

5. **Services listing vs Home Services section**: The home section uses a click-to-select pattern with an animated dark preview panel. The services listing page uses a completely different card layout (bento grid with SpatialServicePreview). While this is intentional differentiation, the visual language differs significantly.

6. **Non-existent Tailwind classes**: `text-slate-650`, `border-slate-350`, `border-slate-250`, `border-cyan-350`, `text-cyan-650`, `border-cyan-150`, `hover:bg-slate-850`, `border-slate-300` — many of these are non-standard Tailwind values that may not resolve to actual colors without custom configuration.

---

## 7. Priority Fix Recommendations

### Priority 1 — Container Shell Unification

Make `SubPageShell` use the same `.glass` class as the home page:

```diff
- <div className="bg-white border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.04)] rounded-[2rem] ...">
+ <div className="glass w-full max-w-full 2xl:max-w-[1800px] overflow-x-clip relative z-10 ...">
```

This single change will:
- Show the ambient background (warping grid, orbs, spotlight) through the subpage container
- Add the frosted glass blur and gradient background
- Match the inset shadow and border treatment
- Unify the border-radius

### Priority 2 — Card Consistency

Standardize `GlassContentBlock` border-radius to match home page cards:
```diff
- "relative overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white p-6 md:p-8 lg:p-10 shadow-sm"
+ "relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 md:p-8 lg:p-10 shadow-sm"
```

And add the same hover shadow pattern:
```diff
- hoverEffect && "transition-all duration-500 hover:-translate-y-1 hover:border-slate-350 hover:shadow-md"
+ hoverEffect && "transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
```

### Priority 3 — Add Interactivity to Flat Subpages

- **Insights listing**: Add shimmer-border or gradient-border-spin effects to article cards
- **About page**: Add subtle `.gradient-border-spin` to the GlassContentBlocks
- **Contact page**: Add animated ambient orbs around the form

### Priority 4 — Fix Double SubPageShell Wrapping

Remove the inner `<SubPageShell>` from `about/page.tsx`, `contact/page.tsx`, and `process/page.tsx` since the layout already provides it.

### Priority 5 — Clean Up Legacy Colors

Remove or convert indigo (`#6366f1`) references in:
- `.pill-tag` class
- `.icon-rail` class  
- `.terminal-cursor` class (unless 404 page intentionally diverges)

### Priority 6 — Standardize Content Max-Widths

Pick 2-3 standard max-widths and use them consistently:
- Narrow content: `max-w-[900px]`
- Standard content: `max-w-[1200px]`
- Wide content: `max-w-[1400px]`

---

## 8. Data Files Reference

| File | Records | Fields |
|---|---|---|
| `data/services.ts` | 4 services | slug, title, category, icon, color, descriptions, features, subservices, techStack |
| `data/work.ts` | Multiple projects | slug, title, category, icon, color, descriptions, link, outcomes, techStack |
| `data/insights.ts` | Multiple articles | slug, title, category, icon, color, descriptions, readTime, content |

---

## 9. Key File Quick-Reference

| What | Path |
|---|---|
| Design tokens & CSS | [globals.css](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/app/globals.css) |
| Root layout | [layout.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/app/layout.tsx) |
| Home page | [page.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/app/page.tsx) |
| SubPage shell | [SubPageShell.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/components/shared/SubPageShell.tsx) |
| Page hero | [PageHero.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/components/shared/PageHero.tsx) |
| Page CTA | [PageCTA.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/components/shared/PageCTA.tsx) |
| Glass block | [GlassContentBlock.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/components/shared/GlassContentBlock.tsx) |
| Section tag | [SectionTag.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/components/shared/SectionTag.tsx) |
| Enterprise button | [EnterpriseButton.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/components/shared/EnterpriseButton.tsx) |
| Ambient background | [GlobalAmbientBackground.tsx](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/components/shared/GlobalAmbientBackground.tsx) |
| Tailwind config | [tailwind.config.ts](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/tailwind.config.ts) |
| Services data | [services.ts](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/data/services.ts) |
| Work data | [work.ts](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/data/work.ts) |
| Insights data | [insights.ts](file:///c:/Users/PratikJagdishbhai/Downloads/New%20folder/src/data/insights.ts) |

---

> **Last updated**: 2026-05-24  
> **Analyzed by**: Antigravity IDE Agent
