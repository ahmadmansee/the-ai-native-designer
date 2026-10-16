import { useEffect, useRef, useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import './ExperimentStorySlide.css';

const LOGOS = {
  codex: 'assets/logos/codex.png',
  granola: 'assets/logos/granola.png',
  mobbin: 'assets/logos/mobbin.ico',
  figma: 'assets/logos/figma.svg',
};

function Brand({ name, image, className = '' }) {
  return <span className={`cinema-brand ${className}`}><img src={image} alt="" /><strong>{name}</strong></span>;
}

function TrackingView({ delayed = false, onToggle, figma = false }) {
  return (
    <div className={`cinema-tracking ${delayed ? 'is-delayed' : ''} ${figma ? 'cinema-tracking--figma' : ''}`}>
      <div className="cinema-tracking-header"><span className="cinema-order-mark" aria-hidden="true">◌</span><strong>Order tracking</strong><span>•••</span></div>
      <div className="cinema-tracking-body">
        <div className="cinema-route" aria-hidden="true"><span className="cinema-route-start" /><i /><span className="cinema-route-end">⌂</span></div>
        <span className="cinema-tracking-label">CURRENT STATUS</span>
        <h4>{delayed ? 'Your order is delayed.' : 'Your order is on its way.'}</h4>
        <p>{delayed ? 'We’re checking with the courier.' : 'We’ll update you when it gets closer.'}</p>
        <div className="cinema-next-update"><span>{delayed ? 'We’ll share the next update here.' : 'Your next update will appear here.'}</span><span aria-hidden="true">↗</span></div>
      </div>
      {onToggle && <button className="cinema-preview-button" type="button" onClick={onToggle}>{delayed ? 'Reset preview' : 'Preview delay'} <span aria-hidden="true">↗</span></button>}
    </div>
  );
}

function GranolaScene({ onNext }) {
  return <div className="cinema-scene cinema-scene--granola">
    <div className="cinema-agent-shell">
      <div className="cinema-agent-header"><Brand name="Codex" image={LOGOS.codex} /><span>Order experience</span></div>
      <div className="cinema-agent-prompt">What did we hear about delayed orders?</div>
      <div className="cinema-tool-call"><Brand name="Granola" image={LOGOS.granola} /><span>MCP connected</span><span className="cinema-call-check">✓</span></div>
      <div className="cinema-agent-answer"><span>From a meeting note</span><strong>“Is my order still coming?”</strong></div>
    </div>
    <div className="cinema-source-card cinema-source-card--granola">
      <Brand name="Granola" image={LOGOS.granola} />
      <span className="cinema-source-rule" />
      <small>Meeting context</small>
      <strong>Delivery feedback</strong>
      <p>Uncertainty after a delay.</p>
      <span className="cinema-source-lines" aria-hidden="true"><i /><i /><i /></span>
    </div>
    <button className="cinema-scene-action" type="button" onClick={onNext}>Find references <span aria-hidden="true">↗</span></button>
  </div>;
}

function ReferenceCard({ variant, title }) {
  return <div className={`cinema-reference cinema-reference--${variant}`}>
    <div className="cinema-phone" aria-label={`${title} illustrative app screen`}>
      <div className="cinema-phone-screen">
        <div className="cinema-phone-status"><span>9:41</span><i aria-hidden="true" /><span aria-hidden="true">▰</span></div>
        <div className="cinema-phone-island" aria-hidden="true" />
        {variant === 'food' && <div className="cinema-phone-app cinema-phone-app--food">
          <div className="cinema-phone-appbar"><span>‹</span><strong>Order details</strong><span>⋯</span></div>
          <div className="cinema-food-map" aria-hidden="true"><i className="cinema-map-road cinema-map-road--one" /><i className="cinema-map-road cinema-map-road--two" /><i className="cinema-map-road cinema-map-road--three" /><span className="cinema-map-pin cinema-map-pin--start">●</span><span className="cinema-map-pin cinema-map-pin--end">⌂</span></div>
          <div className="cinema-food-copy"><small>YOUR ORDER</small><strong>On the way</strong><p>Your food is heading to you.</p></div>
          <div className="cinema-food-progress" aria-hidden="true"><i /><i /><i /></div>
        </div>}
        {variant === 'parcel' && <div className="cinema-phone-app cinema-phone-app--parcel">
          <div className="cinema-phone-appbar"><span>‹</span><strong>Tracking</strong><span>⋯</span></div>
          <div className="cinema-parcel-icon" aria-hidden="true"><i /></div>
          <small>DELIVERY UPDATE</small><h5>Running late</h5><p>We’re checking on your parcel.</p>
          <div className="cinema-parcel-steps"><span><i />Dispatched</span><span><i />In transit</span><span><i />Delivered</span></div>
        </div>}
        {variant === 'grocery' && <div className="cinema-phone-app cinema-phone-app--grocery">
          <div className="cinema-phone-appbar"><span>‹</span><strong>My order</strong><span>⋯</span></div>
          <div className="cinema-grocery-illustration" aria-hidden="true"><span /><i /><b /></div>
          <small>STAY INFORMED</small><h5>We’ll keep you posted</h5><p>Your next update will appear here.</p>
          <div className="cinema-grocery-notice"><span aria-hidden="true">♧</span><span>Updates are on</span></div>
        </div>}
        <div className="cinema-phone-home" aria-hidden="true" />
      </div>
    </div>
    <strong>{title}</strong>
  </div>;
}

function MobbinScene({ onNext }) {
  return <div className="cinema-scene cinema-scene--mobbin">
    <div className="cinema-search-ribbon"><Brand name="Codex" image={LOGOS.codex} /><span>Show me useful order-tracking patterns.</span><Brand name="Mobbin MCP" image={LOGOS.mobbin} /></div>
    <div className="cinema-reference-set"><ReferenceCard variant="food" title="Food delivery" /><ReferenceCard variant="parcel" title="Parcel tracking" /><ReferenceCard variant="grocery" title="Grocery order" /></div>
    <div className="cinema-reference-source"><Brand name="Mobbin" image={LOGOS.mobbin} /><span>Illustrative pattern studies</span></div>
    <button className="cinema-scene-action" type="button" onClick={onNext}>Build in Codex <span aria-hidden="true">↗</span></button>
  </div>;
}

function CodexScene({ delayed, onToggle }) {
  return <div className="cinema-scene cinema-scene--codex">
    <div className="cinema-code-panel">
      <div className="cinema-code-top"><Brand name="Codex" image={LOGOS.codex} /><span>order-status</span></div>
      <div className="cinema-code-instruction">Make the delay state clearer.</div>
      <div className="cinema-code-lines" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <div className="cinema-code-status"><i />Running preview</div>
    </div>
    <div className="cinema-live-preview"><div className="cinema-live-label"><span>LIVE PREVIEW</span><span>↗</span></div><TrackingView delayed={delayed} onToggle={onToggle} /></div>
  </div>;
}

function FigmaScene() {
  return <div className="cinema-scene cinema-scene--figma">
    <div className="cinema-figma-top"><Brand name="Figma" image={LOGOS.figma} /><span>Order experience / Exploration</span><span className="cinema-figma-share">Share</span></div>
    <div className="cinema-figma-body"><div className="cinema-figma-tools" aria-hidden="true"><span>↖</span><span>□</span><span>◇</span><span>T</span></div><div className="cinema-figma-canvas"><div className="cinema-figma-frame-label">Imported from running UI</div><div className="cinema-figma-selection"><TrackingView delayed figma /><i className="cinema-handle cinema-handle--tl" /><i className="cinema-handle cinema-handle--tr" /><i className="cinema-handle cinema-handle--bl" /><i className="cinema-handle cinema-handle--br" /></div></div><div className="cinema-figma-properties"><span>Design</span><i /><i /><i /><small>Editable layers</small></div></div>
    <div className="cinema-handoff"><Brand name="Codex" image={LOGOS.codex} /><span aria-hidden="true">→</span><Brand name="Figma" image={LOGOS.figma} /></div>
  </div>;
}

export function ExperimentStorySlide({ slide }) {
  const stageRef = useRef(null);
  const startedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const [reducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const beat = slide.beats[active];

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && !startedRef.current && !reducedMotion) {
        startedRef.current = true;
        setPlaying(true);
      }
    }, { threshold: 0.55 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible || !playing) return undefined;
    const timer = window.setInterval(() => { setActive(current => (current + 1) % slide.beats.length); setDelayed(false); }, 4600);
    return () => window.clearInterval(timer);
  }, [visible, playing, slide.beats.length]);

  function next() { setPlaying(false); setActive(current => (current + 1) % slide.beats.length); setDelayed(false); }
  function previous() { setPlaying(false); setActive(current => (current - 1 + slide.beats.length) % slide.beats.length); setDelayed(false); }
  function togglePreview() { setPlaying(false); setDelayed(value => !value); }

  return <SlideFrame slide={slide} className="cinema-slide">
    <div className="cinema-heading"><h2 id={`${slide.id}-title`}>{slide.headline}</h2></div>
    <div className="cinema-stage" ref={stageRef} tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowRight') next(); if (event.key === 'ArrowLeft') previous(); }} aria-label="Animated AI-native design workflow. Use left and right arrow keys to change frames.">
      <div className="cinema-stage-content" key={beat.id}>
        {beat.id === 'granola' && <GranolaScene onNext={next} />}
        {beat.id === 'mobbin' && <MobbinScene onNext={next} />}
        {beat.id === 'codex' && <CodexScene delayed={delayed} onToggle={togglePreview} />}
        {beat.id === 'figma' && <FigmaScene />}
      </div>
      <button className="cinema-play" type="button" aria-label={playing ? 'Pause animation' : 'Play animation'} onClick={() => setPlaying(value => !value)}>{playing ? 'Ⅱ' : '▶'}</button>
    </div>
    <div className="cinema-footer" aria-live="polite"><div className="cinema-caption"><span>0{active + 1} / 0{slide.beats.length}</span><img src={beat.logo} alt="" /><strong>{beat.title}</strong><p>{beat.caption}</p></div><div className="cinema-navigation"><button type="button" onClick={previous} aria-label="Previous frame">←</button><button type="button" onClick={next} aria-label="Next frame">→</button></div></div>
  </SlideFrame>;
}
