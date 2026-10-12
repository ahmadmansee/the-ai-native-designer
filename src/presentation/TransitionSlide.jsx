import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';

export function TransitionSlide({ slide }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <SlideFrame slide={slide} className={`transition-slide ${revealed ? 'is-revealed' : ''}`}>
      <div className="transition-main">
        <span className="section-label">{slide.eyebrow}</span>
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p className="transition-answer" aria-live="polite">{revealed ? slide.reveal : '\u00a0'}</p>
      </div>

      <div className="transition-bottom">
        <div className="transition-track" aria-hidden="true">
          <div className="transition-track-line" />
          <span>Idea</span><span>Design</span><span>Build</span><span>Learn</span>
          <strong className="working-point">Working version</strong>
        </div>
        <button type="button" className="transition-reveal" onClick={() => setRevealed(value => !value)} aria-pressed={revealed}>
          {revealed ? 'Show earlier path' : 'Move it earlier'} <span aria-hidden="true">{revealed ? '↺' : '→'}</span>
        </button>
      </div>
    </SlideFrame>
  );
}
