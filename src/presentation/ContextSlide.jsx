import { SlideFrame } from './SlideFrame.jsx';

export function ContextSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="context-slide">
      <div className="context-layout">
        <div className="context-copy">
          <span className="section-label">{slide.eyebrow}</span>
          <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
          <div className="context-statements">
            {slide.statements.map(statement => <p key={statement}>{statement}</p>)}
          </div>
        </div>

        <div className="context-contents">
          <span className="section-label">{slide.contentsLabel}</span>
          <ol>
            {slide.chapters.map((chapter, index) => (
              <li key={index}>
                <span>0{index + 1}</span>
                <span>{chapter}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SlideFrame>
  );
}
