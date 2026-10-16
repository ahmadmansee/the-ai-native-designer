import { useEffect, useRef, useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import './MarketSignalsSlide.css';

const sources = [
  {
    id: 'hellofresh',
    type: 'LinkedIn screenshot',
    name: 'HelloFresh',
    title: 'AI-native is on the must-have list.',
    source: 'Screenshot supplied by Ahmad · captured 10 Oct 2026',
  },
  {
    id: 'jobs',
    type: 'LinkedIn screenshot',
    name: 'Design roles',
    title: 'New titles are appearing.',
    source: 'Screenshot supplied by Ahmad · captured 10 Oct 2026',
  },
  {
    id: 'vercel',
    type: 'Current job ad',
    name: 'Vercel',
    title: 'Design and code in one role.',
    source: 'Vercel Careers · checked 11 Oct 2026',
    url: 'https://vercel.com/careers/design-engineer-us-6129441004',
  },
  {
    id: 'practice',
    type: 'Practitioner post',
    name: 'Janine Perkuhn',
    title: 'A team building ideas in code.',
    source: 'LinkedIn · public workflow account',
    url: 'https://www.linkedin.com/posts/janine-perkuhn_this-is-how-our-ai-native-design-workflow-activity-7478357429588615169-4hRO',
  },
];

function EvidenceVisual({ source, onZoom }) {
  if (source.id === 'hellofresh' || source.id === 'jobs') {
    const jobs = source.id === 'jobs';
    return <button className={`ms-screenshot ${jobs ? 'ms-screenshot--jobs' : ''}`} type="button" onClick={onZoom} aria-label={`Enlarge the original ${jobs ? 'LinkedIn design jobs' : 'HelloFresh LinkedIn'} screenshot`}>
      <img src={jobs ? 'assets/evidence/linkedin-design-jobs-2026-10-10.png' : 'assets/evidence/hellofresh-linkedin-2026-10-10.png'} alt={jobs ? 'LinkedIn jobs list showing Lead/Senior Designer AI Native, Senior AI Experience Designer, Senior Conversational AI Designer, and AI Designer roles' : 'LinkedIn post by Marlene Rosner with a HelloFresh Senior Product Designer image listing Craft, Systems thinking, and AI-native as must-haves, beside a comment asking what AI-native means'} />
      <span>View full screenshot ↗</span>
    </button>;
  }
  if (source.id === 'vercel') {
    return <div className="ms-source-excerpt ms-vercel-excerpt" aria-label="Text excerpt from Vercel's Design Engineer job ad">
      <div className="ms-browser-chrome"><span>vercel.com / careers</span><span>↗</span></div>
      <div className="ms-excerpt-inner"><div className="ms-wordmark ms-vercel-mark"><span aria-hidden="true">▲</span> Vercel</div><span className="ms-excerpt-kicker">DESIGN · UNITED STATES</span><strong>Design Engineer</strong><div className="ms-excerpt-rule" /><p>Own product design and frontend implementation for the AI Gateway experience.</p><div className="ms-excerpt-tags"><span>Product design</span><span>Frontend</span><span>Customers</span></div><small>Selected details from the live posting · source linked</small></div>
    </div>;
  }
  return <div className="ms-source-excerpt ms-linkedin-excerpt" aria-label="Summary of Janine Perkuhn's public LinkedIn workflow post">
    <div className="ms-browser-chrome"><span>linkedin.com / posts</span><span>↗</span></div>
    <div className="ms-excerpt-inner"><div className="ms-post-author"><span className="ms-post-avatar">JP</span><div><strong>Janine Perkuhn</strong><small>Public workflow post</small></div><b>in</b></div><p className="ms-post-lead">A team’s first four weeks with an AI-native design workflow</p><div className="ms-post-row"><span>01</span><p>Designers onboard to the repo, fork, and localhost.</p></div><div className="ms-post-row"><span>02</span><p>They build concept screens directly in code.</p></div><div className="ms-post-row"><span>03</span><p>Design-system tokens move into the running prototype.</p></div><small className="ms-paraphrase">Paraphrased from the public post · source linked</small></div>
  </div>;
}

export function MarketSignalsSlide({ slide }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const startX = useRef(null);
  const current = sources[active];
  function move(delta) { setActive(value => (value + delta + sources.length) % sources.length); }
  useEffect(() => {
    if (!zoomed) return undefined;
    const onKey = event => { if (event.key === 'Escape') setZoomed(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [zoomed]);
  return <SlideFrame slide={slide} className="market-signals-slide">
    <div className="ms-heading"><h2 id={`${slide.id}-title`}>{slide.headline}</h2></div>
    <div className="ms-carousel" tabIndex={0} aria-label="Market evidence carousel. Use left and right arrows to change examples." onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }} onTouchStart={event => { startX.current = event.touches[0].clientX; }} onTouchEnd={event => { if (startX.current === null) return; const delta = event.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1); startX.current = null; }}>
      <div className="ms-stage" key={current.id}>
        <div className="ms-visual"><EvidenceVisual source={current} onZoom={() => setZoomed(true)} /></div>
        <div className="ms-reading" aria-live="polite"><div><span className="ms-type">0{active + 1} / 0{sources.length} · {current.type}</span><span className="ms-name">{current.name}</span><h3>{current.title}</h3></div><div className="ms-source">{current.url ? <a href={current.url} target="_blank" rel="noreferrer">View original source ↗</a> : <span>Original screenshot</span>}<small>{current.source}</small></div></div>
      </div>
    </div>
    <div className="ms-controls"><div className="ms-pips" aria-label="Choose an example">{sources.map((source, index) => <button key={source.id} type="button" className={active === index ? 'is-active' : ''} aria-label={`Show example ${index + 1}: ${source.name}`} aria-current={active === index ? 'true' : undefined} onClick={() => setActive(index)} />)}</div><div className="ms-arrows"><button type="button" aria-label="Previous example" onClick={() => move(-1)}>←</button><button type="button" aria-label="Next example" onClick={() => move(1)}>→</button></div></div>
    {zoomed && <div className="ms-lightbox" role="dialog" aria-modal="true" aria-label="Original LinkedIn screenshot" onClick={() => setZoomed(false)}><button type="button" aria-label="Close screenshot" onClick={() => setZoomed(false)}>Close ×</button><img src={current.id === 'jobs' ? 'assets/evidence/linkedin-design-jobs-2026-10-10.png' : 'assets/evidence/hellofresh-linkedin-2026-10-10.png'} alt={`Original ${current.name} LinkedIn screenshot`} onClick={event => event.stopPropagation()} /></div>}
  </SlideFrame>;
}
