import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';

export function ToolHistorySlide({ slide }) {
  const [activeId, setActiveId] = useState(null);
  const selected = slide.eras.find(era => era.id === activeId);

  return (
    <SlideFrame slide={slide} className="tools-v2-slide">
      <div className="tools-v2-heading">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.overview}</p>
      </div>

      <div className="tools-v2-reveal" aria-live="polite">
        {selected ? (
          <div className="tools-v2-selected" key={selected.id}>
            <div className={`tools-v2-images ${selected.logos.length > 3 ? 'tools-v2-images--ai' : ''} ${selected.logos.length > 1 && selected.logos.length <= 3 ? 'tools-v2-images--suite' : ''}`}>
              {selected.logos.map(logo => (
                <figure key={logo.name}>
                  <img src={logo.image} alt={logo.name} />
                  {selected.logos.length > 1 && <figcaption>{logo.name}</figcaption>}
                </figure>
              ))}
            </div>
            <div className="tools-v2-caption">
              <span>{selected.date} · {selected.name}</span>
              <p>{selected.detail}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="tools-v2-timeline" aria-label="Interactive timeline of design tools">
        {slide.eras.map((era, index) => (
          <button
            type="button"
            key={era.id}
            className={`tools-v2-stop ${activeId === era.id ? 'is-active' : ''}`}
            aria-pressed={activeId === era.id}
            onMouseEnter={() => setActiveId(era.id)}
            onFocus={() => setActiveId(era.id)}
            onClick={() => setActiveId(era.id)}
          >
            <span className="tools-v2-stop-index">0{index + 1}</span>
            <strong>{era.date}</strong>
            <span className="tools-v2-stop-name">{era.name}</span>
          </button>
        ))}
      </div>
    </SlideFrame>
  );
}
