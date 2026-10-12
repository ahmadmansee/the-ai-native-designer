import { traditionalFlow } from '../data/presentation.js';
import { SlideFrame } from './SlideFrame.jsx';

export function ProcessSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="process-slide">
      <div className="slide-heading">
        <span className="section-label">{slide.eyebrow}</span>
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.subline}</p>
      </div>

      <div className="process-story">
        <ol className="process-path" aria-label="A simplified product design process">
          {traditionalFlow.map((stage, index) => (
            <li className="process-step" key={stage.title}>
              <span className="process-step-number">0{index + 1}</span>
              <h3>{stage.title}</h3>
              <p>{stage.detail}</p>
              <span className="process-artifact">{stage.artifact}</span>
            </li>
          ))}
        </ol>
        <div className="handoff-line" aria-hidden="true">
          <span>Design</span><span>Handoff</span><span>Engineering</span>
        </div>
      </div>

      <div className="process-footer">
        <p>{slide.footnote}</p>
        <a href={slide.source.url} target="_blank" rel="noreferrer">Related framework ↗</a>
      </div>
    </SlideFrame>
  );
}
