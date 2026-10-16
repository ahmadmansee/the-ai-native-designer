import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import { DiamondDiagram } from './DiamondDiagram.jsx';

export function DoubleDiamondSlide({ slide }) {
  const [activeId, setActiveId] = useState('discover');
  const activeIndex = slide.stages.findIndex(stage => stage.id === activeId);
  const selected = slide.stages[activeIndex] ?? slide.stages[0];

  return (
    <SlideFrame slide={slide} className="diamond-v2-slide">
      <div className="diamond-v2-heading">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      </div>

      <div className="diamond-v2-content">
        <DiamondDiagram stages={slide.stages} activeId={activeId} onSelect={setActiveId} label="Interactive Double Diamond: Discover, Define, Develop, Deliver" />

        <aside className="diamond-v2-story" aria-live="polite">
          <span className="diamond-v2-counter">0{activeIndex + 1} / 04</span>
          <h3>{selected.name}</h3>
          <p className="diamond-v2-lead">{selected.lead}</p>
          <div className="diamond-v2-facts">
            <div><span>In the work</span><strong>{selected.work}</strong></div>
          </div>
        </aside>
      </div>
    </SlideFrame>
  );
}
