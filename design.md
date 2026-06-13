# Portfolio Design & Architecture Document

This document provides an overview of the design, architecture, and implementation details of the portfolio website to help other AI models and tools quickly understand the codebase.

## 1. Project Structure

The project is a static, single-page application (SPA) portfolio website built with vanilla HTML, CSS, and JavaScript.

```
/Users/tiofani/IdeaProjects/tiofani03.github.io
├── index.html                  # Main entry point and semantic structure
├── assets/
│   ├── css/
│   │   └── portfolio.css       # Core styling, responsive design, animations
│   ├── js/
│   │   └── portfolio.js        # Dynamic rendering and interactivity
│   ├── data/
│   │   └── portfolio.json      # (Optional) External data source for content
│   ├── img/                    # Image assets (logos, icons)
│   └── pdf/                    # Downloadable assets (e.g., Resume/CV)
```

## 2. Architecture Overview

The architecture follows a strict separation of concerns paradigm:
- **Structure (HTML):** Defines the skeleton and component placeholders using `data-*` attributes.
- **Presentation (CSS):** Handles layout, theming, visual hierarchy, and micro-interactions.
- **Behavior (JS):** Fetches content, renders it into placeholders, and manages UI states (e.g., filtering, scroll effects).

### Data-Driven UI
The site’s content is completely separated from the UI structure. The JavaScript fetches data from a JSON source (`assets/data/portfolio.json`) and gracefully falls back to an embedded JSON string within `index.html` (`<script id="portfolio-data-fallback" type="application/json">`) if the fetch fails. 

This makes updating the portfolio content trivial—content can be updated entirely by modifying the JSON data object without touching the HTML layout or CSS styling.

## 3. Implementation Details

### HTML (`index.html`)
- **Semantic Tags:** Uses semantic HTML5 tags like `<header>`, `<main>`, `<section>`, `<article>`, and `<nav>` for accessibility and structure.
- **Data Binding Attributes:** Elements that expect dynamic content are tagged with custom data attributes, e.g., `data-profile-name`, `data-projects`, `data-experience`.
- **Fallback Mechanism:** Contains `<script id="portfolio-data-fallback" type="application/json">` storing the default state.

### UI Design System (`assets/css/portfolio.css`)
The UI follows a consistent, modern design language mapped to CSS variables in the `:root` scope.

**Color Palette:**
- **Backgrounds:** Paper (`#f2efe8`), Paper Deep (`#e5e0d5`)
- **Text & Elements:** Ink (`#171713`), Ink Soft (`#55554d`), Line (`rgba(23, 23, 19, 0.18)`)
- **Accents:** Acid (`#dfff45`), Blue (`#536de8`), Orange (`#f3794e`), Red (`#dc594d`)

**Typography:**
- **Display/Headings:** `Syne`, sans-serif
- **Body Text:** `Manrope`, sans-serif
- **Monospace/Eyebrows:** `DM Mono`, monospace

**Aesthetics & Layout:**
- **Responsive Layouts:** Extensively utilizes CSS Grid and Flexbox, along with dynamic units and fluid typography (`clamp()`, `vw`, `vh`) to ensure proper scaling on all devices.
- **Modern Aesthetics:** Implements glassmorphism (`backdrop-filter`) for the header, background noise texture (`background-image: url(...)` via SVG data URI) for depth, and an interactive glowing cursor (`.cursor-glow`) for dynamic feedback.
- **Accessibility:** Respects reduced motion preferences (`prefers-reduced-motion`).

### JavaScript (`assets/js/portfolio.js`)
- **IIFE Encapsulation:** All logic is contained within an Immediately Invoked Function Expression to prevent global namespace pollution.
- **Security (XSS Prevention):** Implements a custom `escapeHtml` function to sanitize all text rendered from the JSON data.
- **Dynamic Rendering Functions:** Dedicated mapping functions like `renderProjects()`, `renderExperience()`, and `renderMetrics()` take data and inject DOM strings via `innerHTML` into the designated container elements.
- **Interactions & Effects:**
  - **Scroll Reveal:** Uses `IntersectionObserver` to trigger fade-in animations as elements enter the viewport (`.reveal` class).
  - **Magnetic Hover:** Adds a magnetic pull effect to specific buttons (`.magnetic`) by dynamically transforming components based on pointer location.
  - **Custom Cursor:** Tracks pointer position (`pointermove`) to update the translation of a glowing radial gradient element.
  - **Stateful Filtering:** Implements logic to filter project cards by categories ("all", "android", "backend") by toggling visibility classes.

## 4. How to Modify Content

To update the portfolio's content (e.g., adding a new project or updating your experience history):
1. Locate the `<script id="portfolio-data-fallback" type="application/json">` tag at the bottom of `index.html`.
2. Edit the corresponding JSON arrays (`projects`, `experience`, `principles`, etc.).
3. If an external `assets/data/portfolio.json` is used locally or on deployment, ensure it is updated simultaneously to keep data synchronized.
