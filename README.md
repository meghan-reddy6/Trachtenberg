# The Trachtenberg Speed Mathematics System

[![GitHub Pages Deployment](https://github.com/meghan-reddy6/Trachtenberg/actions/workflows/deploy.yml/badge.svg)](https://github.com/meghan-reddy6/Trachtenberg/actions/workflows/deploy.yml)
[![Tests Passing](https://img.shields.io/badge/Vitest-22%20Passing-emerald)](https://github.com/meghan-reddy6/Trachtenberg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg?logo=react&logoColor=black)](https://react.dev)
[![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 3.4](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

An interactive, responsive digital learning platform based on the 1960 historical treatise *The Trachtenberg Speed System of Basic Mathematics* by Ann Cutler and Rudolph McShane.

Conceived in the isolation of a Nazi concentration camp by Professor Jakow Trachtenberg, the system replaces mechanical rote drilling with structural pattern perception. This platform transforms the complete mathematical content of the book into an interactive, visual digital curriculum—featuring deterministic step-by-step visualizers, guided interactive practice, reflex speed training, spaced repetition, and rigorous assessments.

**Live Application**: [https://meghan-reddy6.github.io/Trachtenberg/](https://meghan-reddy6.github.io/Trachtenberg/)

---

## Key Capabilities

### 1. Complete Historical Curriculum (8 Chapters & 46 Learning Units)
Every technique from the Cutler & McShane treatise is faithfully preserved and modeled:
- **Chapter 1: Tables or No Tables?** — Basic single-digit multiplication without memorized tables (Rules for 11, 12, 6, 7, 5, 9, 8, 4, 3, 2, 1, and 0).
- **Chapter 2: Rapid Multiplication by the Direct Method** — Single-line general multiplication with outer, middle, and inner cross-pairs ($2 \times 2$, $3 \times 3$, and $M \times N$).
- **Chapter 3: Speed Multiplication — Two-Finger Method** — Units-and-Tens (UT) pair-products for factors with large digits.
- **Chapter 4: Addition and the Right Answer** — The "Never count higher than 11" rule, running sub-totals, tick marks, L-shaped column addition, and double verification.
- **Chapter 5: Division — Speed and Accuracy** — Simple method with addition tables and Fast method with NT/UT partial products, 8/9 trouble-saving devices, and correction rules.
- **Chapter 6: Squares and Square Roots** — Squaring shortcuts (ending in 5, tens digit 5), general 2-digit & 3-digit squaring with collapsing, and square root extraction with digit-pairing and split differences.
- **Chapter 7: Algebraic Description of the Method** — Rigorous algebraic proofs and polynomial expansions for every rule and procedure.
- **Chapter 8: Postscript** — Mathematical psychology, arithmetic anxiety reduction, and subconscious reflex formation.

### 2. Interactive Mathematical Visualizer
- **Demonstration Mode**: Step-by-step playback with active digit highlighting, neighbor arches, carry indicators, working formulas, and adjustable playback speeds ($0.5\times$, $1.0\times$, $2.0\times$).
- **Guided Mode**: Interactive step-by-step entry where learners calculate the next produced digit with immediate correction, error tracking, and 2-level progressive hints.
- **Independent Mode**: Solve calculations without assistance and verify against deterministic engine results.
- **Speed Mode**: Timed calculations with live stopwatch, elapsed millisecond recording, and performance ratings.
- **Custom Number Simulator**: Test and visualize custom numbers using pure Trachtenberg rules.

### 3. Practice, Speed Trainer & Analytics
- **4 Difficulty Tiers**: Beginner (small numbers, direct rules), Intermediate (larger numbers, carries), Advanced (complex calculations, edge cases), and Expert (mixed techniques, zero prefixes).
- **Configurable Problem Sets**: 5, 10, 20, 50, or custom question count.
- **Reflex Speed Trainer**: High-speed arithmetic sprints (60s, 120s, 20-problem sprint) tracking Questions Per Minute (QPM) and personal records.
- **Spaced Repetition & Revision**: Identifies weak areas (accuracy $< 70\%$) and prioritizes them for targeted review.
- **Formal Assessments**: Chapter-end tests and Grand Mastery Certification exam.
- **Visual Analytics**: Interactive Recharts visualizations tracking curriculum completion, accuracy trends, and mastery distributions.

### 4. 100% Client-Side, Zero AI Hallucination & Private
- **Deterministic Math Engines**: Pure mathematical TypeScript algorithms; no external APIs, machine learning models, or server dependencies.
- **Zero Backend**: Runs entirely in the browser and deploys as static assets on GitHub Pages.
- **Full Privacy**: All learning progress, bookmarks, and test scores persist in `localStorage`.
- **Backup & Portability**: Export and import learning records as JSON files.

---

## Technical Architecture

```
Trachtenberg/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions CI/CD for automated Pages deployment
├── public/
│   ├── .nojekyll               # Disables Jekyll processing on GitHub Pages
│   └── favicon.svg             # Mathematics monogram favicon
├── src/
│   ├── components/
│   │   ├── common/             # Badges, Buttons, Cards, ProgressBars
│   │   ├── layout/             # Shell, Sidebar, Header, MobileNav, SearchModal
│   │   ├── math/               # KaTeXView, MathDigitGrid
│   │   └── visualizer/         # TrachtenbergVisualizer (Demo, Guided, Independent, Speed)
│   ├── content/
│   │   └── curriculum.ts       # 8 chapters, 46 learning units, worked examples, proofs
│   ├── engines/
│   │   ├── singleDigitEngine.ts        # Rules for 11, 12, 6, 7, 5, 9, 8, 4, 3, 2, 1, 0
│   │   ├── directMultiplicationEngine.ts # Outside/inside pairs for 2x2, 3x3, MxN
│   │   ├── twoFingerEngine.ts          # Units-and-Tens (UT) pair-product engine
│   │   ├── additionEngine.ts           # Trachtenberg 11-rule addition & running checks
│   │   ├── divisionEngine.ts           # Simple & Fast division with NT/UT & 8/9 device
│   │   ├── squareAndRootEngine.ts      # Squaring shortcuts & square root extraction
│   │   ├── checkingEngine.ts           # Digit-sums (casting out 9s) & Elevens-check
│   │   ├── problemGenerator.ts         # Deterministic practice problem generator
│   │   └── solutionValidator.ts        # Answer validator and 3-tier progressive hints
│   ├── pages/
│   │   ├── DashboardPage.tsx           # Primary dashboard with continue learning & stats
│   │   ├── ChaptersPage.tsx            # 8-chapter curriculum roadmap
│   │   ├── LearnPage.tsx               # Digital textbook chapter view
│   │   ├── TechniqueDetailPage.tsx     # 14-section pedagogical lesson layout
│   │   ├── TechniqueLibraryPage.tsx    # Filterable inventory by chapter, difficulty, mastery
│   │   ├── PracticePage.tsx            # Interactive practice workspace with virtual keypad
│   │   ├── SpeedTrainerPage.tsx        # High-speed reflex sprints
│   │   ├── RevisionPage.tsx            # Spaced repetition & weak area review
│   │   ├── AssessmentsPage.tsx         # Formal chapter tests & Grand Mastery Exam
│   │   ├── ProgressPage.tsx            # Recharts analytics & personal records
│   │   └── SettingsPage.tsx            # Theme, typography preferences, JSON import/export
│   ├── storage/
│   │   └── progressStorage.ts          # LocalStorage persistence, export/import, scoring
│   ├── tests/
│   │   ├── singleDigitEngine.test.ts   # Vitest unit tests for single-digit keys
│   │   └── allEngines.test.ts          # Vitest unit tests for all engines
│   ├── types/
│   │   └── index.ts                    # Core TypeScript interfaces
│   ├── App.tsx                         # HashRouter and primary page routing
│   ├── main.tsx                        # React application entry point
│   └── index.css                       # Academic light and deep midnight dark theme engine
├── LICENSE                             # MIT License
├── package.json
├── tailwind.config.js
└── vite.config.ts                      # Relative base asset configuration
```

---

## Local Development & Testing

### Prerequisites
- Node.js (v18.x, v20.x, or v22.x)
- npm (v9.x or higher)

### Setup & Run
```bash
# 1. Clone the repository
git clone https://github.com/meghan-reddy6/Trachtenberg.git
cd Trachtenberg

# 2. Install dependencies
npm install

# 3. Run the Vitest test suite
npm test

# 4. Start local development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Build for Production
```bash
npm run build
```
Compiled static assets will be output to the `dist/` directory.

---

## GitHub Pages Deployment

The repository includes a pre-configured GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Automated Deployment Setup
1. Push this repository to GitHub on branch `main` or `master`.
2. In your GitHub repository, open **Settings &rarr; Pages**.
3. Under **Build and deployment &rarr; Source**, select **GitHub Actions**.
4. The deployment pipeline will run automatically on push:
   - Installs dependencies via `npm ci`.
   - Runs the Vitest test suite (`22/22` passing tests).
   - Builds the production bundle (`npm run build`).
   - Copies `dist/index.html` to `dist/404.html` for client-side routing resilience.
   - Deploys static assets to `https://<username>.github.io/<repository-name>/`.

---

## Developer Credits & Support

- **Developed by**: **Meghan** ([@meghan-reddy6](https://github.com/meghan-reddy6))
- **Portfolio**: [CodeToCompute](https://meghan-reddy6.github.io/codetocompute/)
- **Support on Buy Me a Chai**: [buymeachai.in/meghansai6](https://www.buymeachai.in/meghansai6) ☕

---

## License

This project is open-source software licensed under the [MIT License](LICENSE).
Copyright &copy; 2026 Meghan (@meghan-reddy6).
