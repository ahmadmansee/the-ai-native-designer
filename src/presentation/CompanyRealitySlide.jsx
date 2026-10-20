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
    <div className="cr-route" aria-hidden="true"><span>IDEA</span><i /><span>TRIAL</span></div>
    <div className="cr-visual-grid" role="group" aria-label="Four things that can stop a trial at work">
      {slide.constraints.map((item, index) => <button
        key={item.id}
        className={`cr-option ${activeId === item.id ? 'is-active' : ''}`}
        type="button"
        aria-pressed={activeId === item.id}
        onMouseEnter={() => setActiveId(item.id)}
        onClick={() => setActiveId(item.id)}
      >
        <span className="cr-option-number">0{index + 1}</span>
        <ConstraintDrawing kind={item.id} />
        <strong>{item.name}</strong>
      </button>)}
    </div>
    <div className="cr-message" aria-live="polite">
      <span>{active.name}</span>
      <p key={active.id}>{active.statement}</p>
    </div>
  </SlideFrame>;
}

function PersonDrawing({ kind }) {
  const colors = { budget: '#e7b785', security: '#a8c9d3', systems: '#b9cbb8', support: '#d7bac5' };
  return <svg viewBox="0 0 170 170" fill="none" aria-hidden="true">
    <circle cx="85" cy="85" r="79" fill={colors[kind]} opacity=".3" />
    <path d="M35 153c2-36 20-53 50-53s48 17 50 53" fill={colors[kind]} stroke="#294a4d" strokeWidth="3" />
    <ellipse cx="85" cy="75" rx="30" ry="34" fill="#f4ddc9" stroke="#294a4d" strokeWidth="3" />
    <path d={kind === 'support' ? 'M54 65c3-26 20-35 32-35 20 0 31 12 31 35-8-7-14-15-18-23-11 16-28 18-45 23Z' : 'M54 66c-1-28 14-39 31-39 22 0 33 14 32 39-9-13-18-19-32-19-13 0-22 6-31 19Z'} fill="#294a4d" />
  </svg>;
}

export function CompanyRealityConversationSlide({ slide }) {
  const [activeId, setActiveId] = useState(slide.constraints[0].id);
  const active = slide.constraints.find(item => item.id === activeId) ?? slide.constraints[0];

  return <SlideFrame slide={slide} className="company-reality-slide cr-conversation-slide">
    <h2 id={`${slide.id}-title`}>Can we try an AI tool at work?</h2>
    <div className="cr-conversation">
      <div className="cr-designer">
        <svg viewBox="0 0 210 260" fill="none" aria-hidden="true">
          <circle cx="105" cy="83" r="43" fill="#f3ddc5" stroke="#245d62" strokeWidth="3" />
          <path d="M62 73c0-34 16-50 43-50 32 0 45 19 43 51-11-7-19-18-22-29-19 20-38 27-64 28Z" fill="#245d62" />
          <path d="M26 247c2-78 30-111 79-111s77 33 79 111" fill="#18b2a8" stroke="#245d62" strokeWidth="3" />
        </svg>
        <span>DESIGNER</span>
        <p>“Could we try this on our next project?”</p>
      </div>
      <div className="cr-reply-panel" aria-live="polite">
        <div className="cr-reply-top"><span>THE REPLY</span><span>0{slide.constraints.findIndex(item => item.id === active.id) + 1} / 04</span></div>
        <div className="cr-reply-person"><PersonDrawing kind={active.id} /><strong>{active.name}</strong></div>
        <blockquote key={active.id}>“{active.statement}”</blockquote>
        <div className="cr-reply-choices" role="group" aria-label="Choose a reason">
          {slide.constraints.map(item => <button key={item.id} type="button" aria-pressed={item.id === activeId} onClick={() => setActiveId(item.id)}>{item.name}</button>)}
        </div>
      </div>
    </div>
  </SlideFrame>;
}
