import { SlideFrame } from './SlideFrame.jsx';

export function ContextSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="context-slide">
      <div className="context-layout">
        <div className="context-copy">
          <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        </div>

        <div className="context-contents">
          <ol>
            {slide.chapters.map((chapter, index) => (
              <li key={chapter.target}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <a href={`#${chapter.target}`}>{chapter.title}</a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SlideFrame>
  );
}
