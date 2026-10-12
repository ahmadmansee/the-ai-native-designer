import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import './CareerPathsSlides.css';

function SourceLink({ source }) {
  return <a className="career-source" href={source.url} target="_blank" rel="noreferrer">
    {source.label}<span aria-hidden="true">↗</span>
  </a>;
}

function PathDrawing({ id }) {
  return <svg className={`career-path-art career-path-art--${id}`} viewBox="0 0 240 210" fill="none" aria-hidden="true">
    <ellipse className="career-art-halo" cx="120" cy="108" rx="91" ry="79" />
    {id === 'company' && <>
      <rect className="career-art-paper" x="65" y="46" width="110" height="82" rx="8" />
      <path className="career-art-line" d="M65 69h110M80 58h2m10 0h2" />
      <rect className="career-art-accent" x="80" y="82" width="37" height="31" rx="3" />
      <path className="career-art-line" d="M128 86h32m-32 12h27m-32 12h23" />
      <path className="career-art-line" d="M120 128v13m-26 0h52" />
      <circle className="career-art-paper" cx="56" cy="120" r="17" />
      <path className="career-art-accent" d="M24 180c0-23 12-40 32-40s32 17 32 40v5H24v-5Z" />
      <circle className="career-art-paper" cx="183" cy="119" r="17" />
      <path className="career-art-paper" d="M151 180c0-23 12-40 32-40s32 17 32 40v5h-64v-5Z" />
      <path className="career-art-line" d="M43 108c4-8 21-12 28 2m96 2c6-10 22-12 32-3" />
    </>}
    {id === 'founding' && <>
      <rect className="career-art-paper" x="34" y="49" width="99" height="124" rx="7" />
      <path className="career-art-line" d="M50 69h67" />
      <rect className="career-art-accent" x="50" y="81" width="67" height="42" rx="4" />
      <path className="career-art-line" d="M50 136h63m-63 13h43" />
      <circle className="career-art-paper" cx="172" cy="74" r="20" />
      <path className="career-art-accent" d="M137 178v-35c0-20 14-34 35-34s35 14 35 34v35h-70Z" />
      <path className="career-art-paper" d="m139 124-17 23-22 7 4 12 30-7 19-19" />
      <path className="career-art-line" d="M155 58c7-10 24-13 34 2m-44 118h55" />
    </>}
    {id === 'solo' && <>
      <circle className="career-art-paper" cx="117" cy="72" r="22" />
      <path className="career-art-line" d="M97 68c5-18 30-24 42-7m-22 47v12" />
      <path className="career-art-accent" d="M75 169v-31c0-23 17-40 42-40s42 17 42 40v31H75Z" />
      <path className="career-art-paper" d="m62 127 56 11-5 20-58-8Zm111 0-56 11 5 20 58-8Z" />
      <path className="career-art-paper" d="M62 133h111l-11 47H73l-11-47Z" />
      <path className="career-art-line" d="M50 180h134" />
      <path className="career-art-accent" d="m182 48 3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" />
    </>}
  </svg>;
}

export function PathsIntroSlide({ slide }) {
  return <SlideFrame slide={slide} className="career-intro-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
    <p className="career-intro-deck">{slide.deck}</p>
    <div className="career-paths" aria-label="Three directions for designers">
      {slide.paths.map(path => <a className={`career-path career-path--${path.id}`} href={`#${path.target}`} key={path.id}>
        <div className="career-path-top"><span>{path.number}</span><PathDrawing id={path.id} /></div>
        <strong>{path.label}</strong>
        <p>{path.detail}</p>
        <span className="career-path-arrow" aria-hidden="true">↗</span>
      </a>)}
    </div>
  </SlideFrame>;
}

export function CompanyPathSlide({ slide }) {
  const [view, setView] = useState('draft');
  return <SlideFrame slide={slide} className="career-practice-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
    <div className="career-work-layout">
      <div className="career-work-copy">
        <span className="career-kicker">An in-house workflow</span>
        <p>Open the repo.<br />Try an idea with AI.<br />Review a working branch.</p>
        <SourceLink source={slide.source} />
      </div>
      <div className="career-repo" aria-label="Illustrative Codex repository workflow">
        <div className="career-repo-top"><span className="career-repo-brand"><img src="assets/logos/codex.png" alt="" /> Codex</span><span className="career-repo-name">product-app</span><span className="career-repo-branch">design/exploration</span></div>
        <div className="career-repo-body">
          <aside className="career-repo-files" aria-label="Illustrative repository files">
            <strong>PRODUCT-APP</strong>
            <span>⌄ &nbsp; src</span>
            <span className="career-repo-indent">⌄ &nbsp; components</span>
            <span className="career-repo-indent">&nbsp;&nbsp; styles</span>
            <span>&nbsp;&nbsp;&nbsp; README.md</span>
          </aside>
          <div className="career-repo-panel">
            <div className="career-repo-tabs" role="group" aria-label="Explore the repository workflow">
              <button type="button" className={view === 'draft' ? 'is-active' : ''} aria-pressed={view === 'draft'} onClick={() => setView('draft')}>Ask Codex</button>
              <button type="button" className={view === 'review' ? 'is-active' : ''} aria-pressed={view === 'review'} onClick={() => setView('review')}>Working branch</button>
            </div>
            {view === 'draft' ? <div className="career-repo-scene" key="draft">
              <div className="career-repo-message is-user"><span>DESIGNER</span><p>Use the existing components to make a working draft of this idea.</p></div>
              <div className="career-repo-message is-codex"><span><img src="assets/logos/codex.png" alt="" /> CODEX</span><p>I’ll look at the project patterns first, then make a draft in a branch.</p></div>
              <div className="career-repo-activity"><span>✓ &nbsp; Read repository</span><span>✓ &nbsp; Reuse components</span><span>✓ &nbsp; Preview ready</span></div>
            </div> : <div className="career-repo-scene" key="review">
              <span className="career-repo-overline">WORKING BRANCH</span>
              <h3>Design exploration</h3>
              <p className="career-repo-summary">A working draft to discuss with the team.</p>
              <div className="career-repo-branch-flow"><span>design/exploration</span><span aria-hidden="true">→</span><span>team review</span></div>
              <div className="career-repo-review"><strong>Preview ready</strong><span>Check the behavior with PM and engineering before anything ships.</span></div>
            </div>}
          </div>
        </div>
        <div className="career-repo-footer">Illustrative workspace · no real company repository</div>
      </div>
    </div>
  </SlideFrame>;
}

export function FoundingPathSlide({ slide }) {
  return <SlideFrame slide={slide} className="career-founding-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
    <div className="career-founding-layout">
      <div className="career-founding-summary">
        <p>At the start, there is no finished product to polish.</p>
        <strong>Find the problem.<br />Choose a direction.<br />Design the first version.</strong>
      </div>
      <div className="career-job-card">
        <div className="career-job-bar"><span><i /><i /><i /></span><small>careers.factorial.com</small></div>
        <div className="career-job-body"><span className="career-job-company">FACTORIAL · PUBLIC JOB POST</span><h3>Founding Product Designer</h3><p>New product team · Barcelona</p><div className="career-job-list"><span>Customer discovery</span><span>Product direction</span><span>Design through implementation</span></div><small>Adapted from the public role description</small></div>
        <div className="career-job-source"><SourceLink source={slide.source} /></div>
      </div>
    </div>
  </SlideFrame>;
}

export function SoloCaseSlide({ slide }) {
  const [imageIndex, setImageIndex] = useState(0);
  const active = slide.images[imageIndex];
  return <SlideFrame slide={slide} className="career-case-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
    <div className="career-case-layout">
      <div className="career-case-copy">
        <span className="career-case-person">{slide.person}</span>
        <div className="career-case-step"><span>{slide.problemLabel ?? 'The problem'}</span><strong>{slide.problem}</strong></div>
        <div className="career-case-step"><span>{slide.builtLabel ?? 'What they built'}</span><strong>{slide.built}</strong></div>
        <SourceLink source={slide.source} />
      </div>
      <div className="career-case-media">
        <div className="career-case-browser"><div className="career-case-browser-bar"><span><i /><i /><i /></span><small>Image published with the founder story</small></div><img key={active.src} src={active.src} alt={active.alt} /></div>
        {slide.images.length > 1 && <div className="career-case-controls" role="group" aria-label="Product views">{slide.images.map((image, index) => <button type="button" key={image.src} className={index === imageIndex ? 'is-active' : ''} aria-pressed={index === imageIndex} onClick={() => setImageIndex(index)}>{image.label}</button>)}</div>}
      </div>
    </div>
  </SlideFrame>;
}
