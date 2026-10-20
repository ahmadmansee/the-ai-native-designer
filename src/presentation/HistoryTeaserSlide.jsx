import { SlideFrame } from './SlideFrame.jsx';

export function HistoryTeaserSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="history-teaser-slide">
      <div className="history-teaser-copy">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.deck}</p>
      </div>
    </SlideFrame>
  );
}
