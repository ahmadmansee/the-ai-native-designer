import { SlideFrame } from './SlideFrame.jsx';
import './ResourcesSlide.css';

export function ResourcesSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="resources-slide">
      <span className="section-label">{slide.eyebrow}</span>
      <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      <ol className="resources-list">
        {slide.resources.map((resource, index) => (
          <li key={resource.name}>
            <span className="resource-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="resource-kind">{resource.kind}</span>
            <a href={resource.url} target="_blank" rel="noreferrer">
              <strong>{resource.name}</strong>
              <span>{resource.detail}</span>
              <span className="resource-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}
