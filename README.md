# The AI-Native Designer

Interactive HTML presentation, currently showing twenty-five slides. The talk is being rebuilt in small batches. Slides appear on one vertical page and use a 16:9 canvas on desktop.

**Shareable presentation:** [ahmadmansee.github.io/the-ai-native-designer](https://ahmadmansee.github.io/the-ai-native-designer/)

## Preview locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, normally `http://127.0.0.1:5173/`. **Speaker notes** shows the talk prompts. **Full screen** shows one slide at a time, using the browser Fullscreen API when available and a page-filling fallback in embedded browsers. Use the visible controls, left/right arrow keys, Page Up/Down, Space, or a click on empty slide space to advance. Click **Exit full screen** or press Escape to return to the scroll view.

The public review version is hosted with GitHub Pages. Every push to `main` builds and publishes the current deck through `.github/workflows/deploy.yml`.

To check a production build:

```bash
npm run build
npm run preview
```

## Edit the presentation

- `src/data/presentation.js`: active slide order, copy, five provisional chapter labels, and speaker notes. Earlier slide explorations are retained in `draftSlides` for reference.
- `src/presentation/`: slide components and reusable media frame.
- `src/styles.css`: design tokens, 16:9 layout, responsive rules, and motion.
- `public/assets/logos/`: local brand icons from the earlier timeline draft.
- `public/assets/portraits/`: Ahmad's cover portrait.
- `public/assets/evidence/`: preserved user-provided market screenshots and sourced YouTube thumbnails.
- `public/assets/evidence/future-interface/`: Ahmad's concept reference and locally stored original media for slides 21–25.
- `public/assets/screenshots/`: future authentic interface captures.
- `public/assets/video/`: future MP4/WebM demonstrations.

The `MediaFrame` component renders local images, GIFs, or videos. With no `src`, it shows a visible placeholder. Presentation language and direction are defined in `src/data/presentation.js` to prepare for a later Arabic/RTL version.

## Attached GPT draft

`index (1).html` is kept locally as an unpublished reference. It contains nine sections. Its later chapters provide a useful content outline, but several sections repeat the same hypothetical settings-flow example, and the file has no real screenshots or videos. Its personal-software case study names “Julia Zahavi”; the original article is by [Julie Zhuo](https://lg.substack.com/p/i-never-want-to-use-third-party-software).

## Source and asset notes

The active context slide states Ahmad's perspective and keeps five chapter titles as placeholders. Slide 6 opens the new section; slide 7 introduces two related design practices. Slide 8 reuses the Double Diamond from slide 4 to show an illustrative AI-native working model, with a working code prototype entering during Develop. Slide 9 is a four-frame animated example: sample meeting context from Granola, illustrative Mobbin pattern studies, a Codex working preview with a clickable delay state, and the same UI represented in Figma. Slide 10 has three independent, four-frame animated use cases: an illustrative Mobbin reference search with five inspectable checkout patterns; a research-synthesis draft linked back to sample notes; and a simulated payment-flow walkthrough that changes the billing-address helper text. Each sequence runs for about 15 seconds and can be paused, advanced, or replayed. Examples contain no real customer findings or invented metrics. The stage logos show one possible setup, not a required stack. Slide 11 opens the market section. Slide 12 is a manual, keyboard-accessible carousel with Ahmad’s two original LinkedIn screenshots, a linked excerpt from a current Vercel role, and a linked paraphrase of a practitioner workflow post. The latter two are clearly labelled source excerpts, not screenshots. Slide 13 uses three local copies of real public YouTube thumbnails to discuss FOMO; their claims are shown as rhetoric, not endorsed as facts. Slides 14–15 form the reality-check chapter: a pause and an illustrated, interactive view of possible company constraints. Slides 16–20 present three career directions: an overview with explicit role names, an illustrative in-house repository workflow, one sourced founding designer job, and two one-slide independent builder stories. The earlier timeline and workflow slides remain in code as drafts and are not part of the current presentation.

The career chapter distinguishes illustrative art from evidence. Slide 17's Codex repository is an illustrative, two-state workflow, with [Ramp's Design Engineer posting](https://jobs.ashbyhq.com/ramp/3d81a24f-cca4-4b2b-9478-cf422adc8237) linked as one real example of designers working closer to code. Slide 18 adapts [Factorial's Founding Product Designer posting](https://careers.factorial.com/job_posting/founding-product-designer-319459); the job card is a labelled summary, not a screenshot. Slide 19 uses real PrintPigeon product captures from [Yannis's interview](https://lovable.dev/blog/2025-01-17-from-idea-to-impact-yannis-journey-with-lovable). Slide 20 shows the cooking app published with [Katherine's Lovable interview](https://lovable.dev/blog/smash-capital-lovable-ai). These images are stored locally under `public/assets/evidence/career-paths/`. No revenue, hiring trend, or market-wide staffing claim is made.

Slides 21–25 introduce possible future interface directions through concrete visuals. Slide 21 uses Ahmad's `22.jpeg` as a **concept reference**, explicitly marked as unofficial artwork. Slide 22 plays the original [Gemini visual-layout demo](https://blog.google/products-and-platforms/products/gemini/gemini-3-gemini-app/) from Google. Slide 23 switches between a [published photograph of OpenAI's dots launch](https://www.journaldugeek.com/2026/09/23/gpt-6-sol-vient-de-sortir-la-nouvelle-ia-de-chatgpt-fait-deux-fois-moins-derreurs-tout-en-etant-deux-fois-moins-chere/) and [Meta's official Muse launch artwork](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/); the product descriptions link to [OpenAI](https://openai.com/index/introducing-dots/) and Meta. Slides 24–25 use Julie Zhuo's original animated interface captures of [Mog Squad and a reading app for her children](https://lg.substack.com/p/i-never-want-to-use-third-party-software). Her Mog Squad image shows a real interface with sample data. Future app layouts described in the speaker notes are hypotheses, not announced products.

CorelDRAW, Sketch, and Figma icons are exported from the `simple-icons` package. The Photoshop product icon is downloaded from [Adobe's product icon asset](https://www.adobe.com/cc-shared/assets/img/product-icons/svg/photoshop-40.svg). Brand icons identify the products discussed; they are not endorsements. The AI-tool examples use linked product names. Historical interface screenshots have not been added yet.

## Next media pass

1. Add an authentic interface screenshot for each timeline milestone, with the year and source recorded beside the asset.
2. Add a short screen recording of an idea becoming a working prototype in the later workflow chapter.
3. Add real product screenshots to the use-case and personal-software chapters after their claims and permissions are checked.
