import { SlideFrame } from './SlideFrame.jsx';

export function HistoryTeaserSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="history-teaser-slide">
      {slide.eyebrow && <span className="section-label">{slide.eyebrow}</span>}
      <div className="history-teaser-copy">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.deck}</p>
      </div>
    </SlideFrame>
  );
}
