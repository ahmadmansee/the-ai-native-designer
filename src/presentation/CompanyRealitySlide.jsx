import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import './CompanyRealitySlide.css';

function ConstraintDrawing({ kind }) {
  return <svg className={`cr-art cr-art--${kind}`} viewBox="0 0 240 210" fill="none" aria-hidden="true">
    <ellipse className="cr-art-halo" cx="120" cy="112" rx="91" ry="79" />
    {kind === 'budget' && <>
      <rect className="cr-art-paper" x="60" y="36" width="111" height="134" rx="11" />
      <path className="cr-art-stroke" d="M82 62h65M82 80h43M82 98h58" />
      <rect className="cr-art-accent" x="82" y="121" width="36" height="27" rx="4" />
      <circle className="cr-art-paper" cx="163" cy="145" r="31" />
      <path className="cr-art-stroke" d="M149 145h28m-23-9h18m-18 18h18" />
    </>}
    {kind === 'security' && <>
      <path className="cr-art-paper" d="M120 35 177 57v48c0 38-23 61-57 78-34-17-57-40-57-78V57l57-22Z" />
      <path className="cr-art-stroke" d="M104 101V87c0-9 7-16 16-16s16 7 16 16v14" />
      <rect className="cr-art-accent" x="95" y="101" width="50" height="43" rx="7" />
      <circle className="cr-art-keyhole" cx="120" cy="119" r="4" />
      <path className="cr-art-stroke" d="M120 123v7" />
    </>}
    {kind === 'systems' && <>
      <rect className="cr-art-paper" x="43" y="62" width="86" height="45" rx="7" />
      <rect className="cr-art-paper" x="43" y="117" width="86" height="45" rx="7" />
      <circle className="cr-art-accent" cx="59" cy="84" r="5" />
      <circle className="cr-art-accent" cx="59" cy="139" r="5" />
      <path className="cr-art-stroke" d="M76 84h34m-34 55h34m19-32h26" />
      <path className="cr-art-dashed" d="M155 107h23" />
      <path className="cr-art-stroke" d="M178 87v40m0-30h18v20h-18m18-15h9m-9 10h9" />
    </>}
    {kind === 'support' && <>
      <circle className="cr-art-paper" cx="82" cy="86" r="20" />
      <circle className="cr-art-paper" cx="156" cy="86" r="20" />
      <path className="cr-art-paper" d="M51 157c0-23 13-37 31-37s31 14 31 37v11H51v-11Zm74 0c0-23 13-37 31-37s31 14 31 37v11h-62v-11Z" />
      <path className="cr-art-accent" d="M98 37h44a13 13 0 0 1 13 13v8a13 13 0 0 1-13 13h-14l-10 10v-10H98a13 13 0 0 1-13-13v-8a13 13 0 0 1 13-13Z" />
      <path className="cr-art-stroke" d="M103 54h33" />
    </>}
  </svg>;
}

export function CompanyRealitySlide({ slide }) {
  const [activeId, setActiveId] = useState(slide.constraints[0].id);
  const active = slide.constraints.find(item => item.id === activeId) ?? slide.constraints[0];

  return <SlideFrame slide={slide} className="company-reality-slide">
    <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
    <div className="cr-visual-grid" role="group" aria-label="Four possible constraints at work">
      {slide.constraints.map(item => <button
        key={item.id}
        className={`cr-option ${activeId === item.id ? 'is-active' : ''}`}
        type="button"
        aria-pressed={activeId === item.id}
        onMouseEnter={() => setActiveId(item.id)}
        onClick={() => setActiveId(item.id)}
      >
        <ConstraintDrawing kind={item.id} />
        <strong>{item.name}</strong>
        <span className="cr-option-marker" aria-hidden="true" />
      </button>)}
    </div>
    <div className="cr-message" aria-live="polite">
      <p key={active.id}>{active.statement}</p>
    </div>
  </SlideFrame>;
}
