import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import './FomoSlide.css';

const headlines = [
  {
    id: 'figma',
    image: 'assets/evidence/figma-is-dead-youtube.jpg',
    title: 'Claude Design - Figma Is Dead',
    credit: 'Tyler Moore · YouTube',
    url: 'https://www.youtube.com/watch?v=iaASVi-cFGk',
  },
  {
    id: 'vibe',
    image: 'assets/evidence/vibe-coding-future-youtube.jpg',
    title: 'Vibe Coding Is The Future',
    credit: 'Y Combinator · YouTube',
    url: 'https://www.youtube.com/watch?v=IACHfKmZMr8',
  },
  {
    id: 'replace',
    image: 'assets/evidence/ai-replace-designers-youtube.jpg',
    title: 'AI Will Replace These Designers – Will You Be One of Them?',
    credit: 'Bring Your Own Laptop · YouTube',
    url: 'https://www.youtube.com/watch?v=5x-JzSkrdrI',
  },
];

export function FomoSlide({ slide }) {
  const [focused, setFocused] = useState(false);
  return <SlideFrame slide={slide} className={`fomo-slide ${focused ? 'is-focused' : ''}`}>
    <div className="fomo-layout">
      <div className="fomo-copy"><h2 id={`${slide.id}-title`}>{slide.headline}</h2><p aria-live="polite">{focused ? 'Pick one problem. Try one tool that helps. Learn from the result.' : 'New tools are real. So is the noise around them.'}</p><button type="button" className="fomo-toggle" aria-pressed={focused} onClick={() => setFocused(value => !value)}>{focused ? 'Show the headlines' : 'Focus on the work'}</button></div>
      <div className="fomo-visual"><div className="fomo-collage" aria-hidden={focused} aria-label="Three real YouTube thumbnails about AI and design">{headlines.map(headline => <a key={headline.id} className={`fomo-headline fomo-headline--${headline.id}`} href={headline.url} target="_blank" rel="noreferrer" tabIndex={focused ? -1 : 0} aria-label={`${headline.title}, ${headline.credit}, opens original video`}><img src={headline.image} alt={headline.title} /></a>)}</div><div className="fomo-focus" aria-hidden={!focused}><span>Ask instead</span><strong>What can I test with my team this week?</strong></div></div>
    </div>
  </SlideFrame>;
}
