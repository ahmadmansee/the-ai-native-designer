import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import { DiamondDiagram } from './DiamondDiagram.jsx';

export function AiNativeDiamondSlide({ slide }) {
  const [activeId, setActiveId] = useState('develop');
  const activeIndex = slide.stages.findIndex(stage => stage.id === activeId);
  const selected = slide.stages[activeIndex] ?? slide.stages[2];

  return (
    <SlideFrame slide={slide} className="ai-diamond-slide">
      <div className="ai-diamond-heading">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      </div>
      <div className="ai-diamond-content">
        <div className="ai-diamond-visual">
          <DiamondDiagram
            stages={slide.stages}
            activeId={activeId}
            onSelect={setActiveId}
            themes={['Understand the problem', 'Make something to test']}
            label="AI-native interpretation of the Double Diamond: Discover, Define, Develop, Deliver"
          />
        </div>

        <aside className="ai-diamond-story" aria-live="polite">
          <span className="ai-diamond-counter">0{activeIndex + 1} / 04</span>
          <h3>{selected.name}</h3>
          <p>{selected.lead}</p>
          <div className="ai-diamond-artifact"><span>What moves forward</span><strong>{selected.artifact}</strong></div>
          <div className="ai-diamond-toolset">
            <span>Example tools</span>
            <div>{selected.tools.map(tool => <div className="ai-diamond-tool" key={tool.name}><img src={tool.image} alt="" /><strong>{tool.name}</strong></div>)}</div>
          </div>
        </aside>
      </div>
    </SlideFrame>
  );
}
