# The Trachtenberg System of Speed Mathematics
### Interactive Digital Learning Platform

An interactive, responsive digital learning platform based on the 1960 treatise *The Trachtenberg Speed System of Basic Mathematics* by Ann Cutler and Rudolph McShane.

Conceived in the isolation of a Nazi concentration camp by Professor Jakow Trachtenberg, the system replaces mechanical rote drilling with structural pattern perception. This platform transforms the complete mathematical content of the book into a structured visual learning experience—featuring deterministic step-by-step calculation visualizers, guided interactive practice, reflex speed training, and rigorous assessments.

---

## Key Capabilities

1. **Complete Historical Curriculum (Chapters 1–8)**
   - **Chapter 1: Tables or No Tables?** — Basic multiplication without memorized tables (rules for 11, 12, 6, 7, 5, 9, 8, 4, 3, 2, 1, 0).
   - **Chapter 2: Rapid Multiplication by the Direct Method** — Single-line general multiplication with outer, middle, and inner cross-pairs.
   - **Chapter 3: Speed Multiplication — Two-Finger Method** — Units-and-Tens (UT) pair-products for factors with large digits.
   - **Chapter 4: Addition and the Right Answer** — "Never count higher than 11", running sub-totals, tick marks, L-shaped addition, and double verification.
   - **Chapter 5: Division — Speed and Accuracy** — Simple method with addition tables and Fast method with NT/UT partial products, 8/9 trouble-saving devices, and correction rules.
   - **Chapter 6: Squares and Square Roots** — Squaring shortcuts (ending in 5, tens digit 5), general 2-digit & 3-digit squaring with collapsing, and square root extraction with digit-pairing and split differences.
   - **Chapter 7: Algebraic Description of the Method** — Rigorous algebraic proofs and polynomial expansions for every technique.
   - **Chapter 8: Postscript** — Mathematical psychology, elimination of arithmetic anxiety, and subconscious reflex formation.

2. **Interactive Mathematical Visualizer**
   - **Demonstration Mode**: Step-by-step playback with active digit highlighting, neighbor arches, carry indicators, working formulas, and adjustable playback speeds.
   - **Guided Mode**: Interactive step-by-step entry where learners calculate the next produced digit with immediate correction and progressive hints.
   - **Independent Mode**: Solve calculations without assistance and verify against deterministic engine results.
   - **Speed Mode**: Timed calculations with live stopwatch and performance ratings.
   - **Custom Number Simulator**: Test and visualize any user-entered numbers using pure Trachtenberg rules.

3. **Practice & Assessment Engine**
   - 4 difficulty tiers: *Beginner*, *Intermediate*, *Advanced*, *Expert*.
   - Configurable practice problem sets (5, 10, 20, 50, or custom).
   - 3-tier progressive hints (Rule reminder &rarr; Next operation &rarr; Partial calculation guidance) + full worked solutions.
   - Chapter-end tests and Grand Mastery Certification exam.

4. **Speed Trainer & Analytics**
   - Reflex drills with 60s, 120s, and 20-problem sprint modes.
   - Tracks Questions Per Minute (QPM), accuracy percentages, and consecutive streaks.
   - Recharts visual analytics: mastery distributions, chapter completion bars, and accuracy trajectories.

5. **100% Client-Side & Private**
   - Pure deterministic TypeScript math engines; zero AI arithmetic or external APIs.
   - All progress persisted in browser `localStorage`.
   - Export and import learning records via JSON backup.
   - Hash-based routing (`HashRouter`) and relative asset paths for effortless deployment on GitHub Pages.

---

## Project Structure

```
d:/Projects/Trachtenberg/
├── .github/workflows/
│   └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── src/
│   ├── components/
│   │   ├── common/             # Badges, Buttons, Cards, ProgressBars
│   │   ├── layout/             # Responsive Shell, Sidebar, Header, MobileNav, SearchModal
│   │   ├── math/               # KaTeXView, MathDigitGrid
│   │   └── visualizer/         # TrachtenbergVisualizer (Demo, Guided, Independent, Speed)
│   ├── content/
│   │   └── curriculum.ts       # Complete curriculum data across 8 chapters and 46 units
│   ├── engines/
│   │   ├── singleDigitEngine.ts        # Rules for 11, 12, 6, 7, 5, 9, 8, 4, 3, 2, 1, 0
│   │   ├── directMultiplicationEngine.ts # Outside/inside pairs for 2x2, 3xN, MxN
│   │   ├── twoFingerEngine.ts          # Units-and-Tens (UT) pair-product engine
│   │   ├── additionEngine.ts           # Trachtenberg 11-rule addition & running checks
│   │   ├── divisionEngine.ts           # Simple & Fast division with NT/UT and 8/9 device
│   │   ├── squareAndRootEngine.ts      # Squaring and square root extraction
│   │   ├── checkingEngine.ts           # Digit-sums (casting out 9s) & Elevens-remainder
│   │   ├── problemGenerator.ts         # Deterministic practice problem generator
│   │   └── solutionValidator.ts        # Answer validator and 3-tier progressive hints
│   ├── pages/
│   │   ├── DashboardPage.tsx           # Primary dashboard with continue learning & stats
│   │   ├── ChaptersPage.tsx            # 8-chapter overview and curriculum roadmap
│   │   ├── LearnPage.tsx               # Digital textbook reader
│   │   ├── TechniqueDetailPage.tsx     # 14-section pedagogical lesson layout
│   │   ├── TechniqueLibraryPage.tsx    # Filterable inventory by chapter, difficulty, mastery
│   │   ├── PracticePage.tsx            # Dedicated practice workspace with virtual keypad
│   │   ├── SpeedTrainerPage.tsx        # High-speed reflex sprints
│   │   ├── RevisionPage.tsx            # Spaced repetition & weak area review
│   │   ├── AssessmentsPage.tsx         # Formal chapter tests & Grand Mastery Exam
│   │   ├── ProgressPage.tsx            # Recharts analytics & personal records
│   │   └── SettingsPage.tsx            # Theme, font preferences, JSON import/export, reset
│   ├── storage/
│   │   └── progressStorage.ts          # LocalStorage persistence, export/import, scoring
│   ├── tests/
│   │   ├── singleDigitEngine.test.ts   # Vitest unit tests for single-digit keys
│   │   └── allEngines.test.ts          # Comprehensive unit tests for all engines
│   ├── types/
│   │   └── index.ts                    # Core TypeScript definitions
│   ├── App.tsx                         # HashRouter and primary page routing
│   └── main.tsx                        # Application entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Local Development & Testing

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Run Locally
```bash
# Install dependencies
npm install

# Run Vitest test suite
npx vitest run

# Start local development server
npm run dev
```

### Build for Production
```bash
npm run build
```
The compiled static assets will be located in `dist/`.

---

## GitHub Pages Deployment

The repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

To deploy:
1. Push this repository to GitHub (branch `main` or `master`).
2. In your GitHub repository settings, navigate to **Settings &rarr; Pages**.
3. Under **Build and deployment &rarr; Source**, select **GitHub Actions**.
4. The deployment workflow will trigger automatically upon push, run tests, compile the bundle, and publish to `https://<username>.github.io/<repository-name>/`.

---

## Author & Developer Credits

- **Curated & Engineered by**: **Meghan** ([@meghan-reddy6](https://github.com/meghan-reddy6))
- **Portfolio & Systems Roadmap**: [CodeToCompute](https://meghan-reddy6.github.io/codetocompute/)
- **Support the Developer**: [Buy Me a Chai](https://buymeachai.in/meghansai6) ☕

