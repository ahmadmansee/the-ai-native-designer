import { useState } from 'react';
import { milestones } from '../data/presentation.js';
import { SlideFrame } from './SlideFrame.jsx';

export function TimelineSlide({ slide }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = milestones[activeIndex];

  function move(step) {
    setActiveIndex((current) => Math.max(0, Math.min(milestones.length - 1, current + step)));
  }

  function handleTimelineKeyDown(event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  }

  return (
    <SlideFrame slide={slide} className="timeline-slide">
      <div className="slide-heading">
        <span className="section-label">{slide.eyebrow}</span>
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      </div>

      <div className="timeline-focus" key={active.id} aria-live="polite">
        <div className="timeline-copy">
          <span className="focus-year">{active.year} <span>/ {active.field}</span></span>
          <h3>{active.name}</h3>
          <p className="focus-idea">{active.idea}</p>
          {active.source && <a className="source-link" href={active.source.url} target="_blank" rel="noreferrer">Source <span aria-hidden="true">↗</span></a>}
        </div>
        <div className={`timeline-visual timeline-visual--${active.id}`}>
          {active.tools ? (
            <div className="tool-group" aria-label="Examples of AI tools">
              {active.tools.map((tool) => (
                <a href={tool.url} target="_blank" rel="noreferrer" key={tool.name}>
                  <span>{tool.kind}</span>
                  <strong>{tool.name}</strong>
                </a>
              ))}
            </div>
          ) : active.companions ? (
            <div className="suite-group">
              <img src={active.logo} alt="Photoshop logo" />
              <div className="suite-names">
                <span>Creative Suite · 2003</span>
                {active.companions.map((name) => <strong key={name}>{name}</strong>)}
              </div>
            </div>
          ) : (
            <img src={active.logo} alt={`${active.name} logo`} />
          )}
        </div>
      </div>

      <div className="timeline-bottom">
        <div className="timeline-nav" role="group" aria-label="Explore design tools" onKeyDown={handleTimelineKeyDown} style={{ '--timeline-progress': `${(activeIndex / (milestones.length - 1)) * 100}%` }}>
          {milestones.map((milestone, index) => (
            <button
              className={`timeline-nav-item ${activeIndex === index ? 'is-active' : ''}`}
              type="button"
              aria-label={`${milestone.year}: ${milestone.name}`}
              aria-pressed={activeIndex === index}
              key={milestone.id}
              onClick={() => setActiveIndex(index)}
            >
              <span className="nav-year">{milestone.year}</span>
              <span className="nav-name">{milestone.navLabel}</span>
            </button>
          ))}
        </div>
        <div className="timeline-arrows" aria-label="Timeline controls">
          <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Previous tool">←</button>
          <button type="button" onClick={() => move(1)} disabled={activeIndex === milestones.length - 1} aria-label="Next tool">→</button>
        </div>
      </div>
    </SlideFrame>
  );
}
