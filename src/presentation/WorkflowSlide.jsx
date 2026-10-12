import { useState } from 'react';
import { workflowPaths } from '../data/presentation.js';
import { SlideFrame } from './SlideFrame.jsx';

export function WorkflowSlide({ slide }) {
  const [mode, setMode] = useState('before');
  const path = workflowPaths[mode];

  return (
    <SlideFrame slide={slide} className={`workflow-slide workflow-slide--${mode}`}>
      <div className="slide-heading">
        <span className="section-label">{slide.eyebrow}</span>
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.subline}</p>
      </div>

      <div className="workflow-content">
        <div className="workflow-topline">
          <div className="workflow-switch" role="group" aria-label="Compare workflows">
            <button type="button" aria-pressed={mode === 'before'} className={mode === 'before' ? 'is-active' : ''} onClick={() => setMode('before')}>Earlier path</button>
            <button type="button" aria-pressed={mode === 'now'} className={mode === 'now' ? 'is-active' : ''} onClick={() => setMode('now')}>Emerging path</button>
          </div>
          <span className="workflow-caption">Illustrative, not a rule for every team</span>
        </div>

        <div className="workflow-stage" key={mode} aria-live="polite">
          <p className="workflow-lead">{path.lead}</p>
          <ol className="workflow-path">
            {path.stages.map((stage, index) => (
              <li key={stage.title} className={mode === 'now' && index > 0 && index < 4 ? 'is-shifted' : ''}>
                <span className="workflow-step-number">0{index + 1}</span>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
                <span className="workflow-artifact">{stage.artifact}</span>
              </li>
            ))}
          </ol>
          <div className="workflow-takeaway"><span>What moves</span><strong>{path.closing}</strong></div>
        </div>
      </div>

      <div className="workflow-footer">
        <span>We still need to understand the problem and test what we make.</span>
        <a href={slide.source.url} target="_blank" rel="noreferrer">Example workflow ↗</a>
      </div>
    </SlideFrame>
  );
}
