import { SlideFrame } from './SlideFrame.jsx';
import './ResourcesSlide.css';

export function ResourcesSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="resources-slide">
      <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      <div className="resources-gallery" aria-label="Recommended reading and channels">
        {slide.resources.map(resource => (
          <a className="resource-card" key={resource.name} href={resource.url} target="_blank" rel="noreferrer" aria-label={`Open ${resource.name}, ${resource.kind.toLowerCase()} resource`}>
            <div className="resource-card-image"><img src={resource.image} alt={resource.imageAlt} /></div>
            <div className="resource-card-copy">
              <span>{resource.kind}</span>
              <strong>{resource.name}</strong>
              <p>{resource.detail}</p>
            </div>
          </a>
        ))}
      </div>
    </SlideFrame>
  );
}
