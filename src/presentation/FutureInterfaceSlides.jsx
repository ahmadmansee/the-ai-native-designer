import { useRef, useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import './FutureInterfaceSlides.css';

function SourceLink({ source, children }) {
  return <a className="fi-source" href={source.url} target="_blank" rel="noreferrer">{children || source.label} ↗</a>;
}

export function FutureIntroSlide({ slide }) {
  return <SlideFrame slide={slide} className="fi-intro-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <div className="fi-intro-layout">
      <div className="fi-intro-copy">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.deck}</p>
      </div>
      <figure className="fi-intro-image">
        <img src={slide.image} alt="Illustrative collage of Dot, Muse, and Grok inspired assistant characters supplied by Ahmad" />
        <figcaption>Concept reference supplied by Ahmad · unofficial artwork</figcaption>
      </figure>
    </div>
  </SlideFrame>;
}

export function FutureConversationSlide({ slide }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  function togglePlayback() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  return <SlideFrame slide={slide} className="fi-conversation-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <div className="fi-conversation-heading">
      <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      <p>{slide.deck}</p>
    </div>
    <div className="fi-conversation-content">
      <div className="fi-conversation-prompt">
        <span>One request</span>
        <p>“{slide.prompt}”</p>
        <div className="fi-conversation-response"><span aria-hidden="true">↳</span><strong>Then explore the result.</strong></div>
        <SourceLink source={slide.source} />
      </div>
      <div className="fi-video-wrap" onClick={event => event.stopPropagation()}>
        <video ref={videoRef} src={slide.video} autoPlay muted loop playsInline preload="metadata" aria-label="Google Gemini visual layout demonstration showing a Rome itinerary created from a prompt" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
        <div className="fi-video-caption"><span>Actual Gemini visual-layout demo · Google</span><button type="button" onClick={togglePlayback}>{playing ? 'Pause' : 'Play'} <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span></button></div>
      </div>
    </div>
  </SlideFrame>;
}

export function FutureAssistantSlide({ slide }) {
  const [active, setActive] = useState(0);
  const example = slide.examples[active];
  return <SlideFrame slide={slide} className="fi-assistant-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <div className="fi-assistant-heading"><h2 id={`${slide.id}-title`}>{slide.headline}</h2><p>{slide.deck}</p></div>
    <div className="fi-assistant-content">
      <figure className="fi-assistant-image" key={example.id}>
        <img src={example.image} alt={example.imageAlt} />
        <figcaption>{example.imageCredit}</figcaption>
      </figure>
      <div className="fi-assistant-reading">
        <div className="fi-assistant-tabs" aria-label="Choose a real assistant example">
          {slide.examples.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{item.name}</button>)}
        </div>
        <p key={example.id}>{example.statement}</p>
        <div className="fi-assistant-sources"><a href={example.source} target="_blank" rel="noreferrer">Product announcement ↗</a>{example.imageSource && <a href={example.imageSource} target="_blank" rel="noreferrer">Photo source ↗</a>}</div>
      </div>
    </div>
  </SlideFrame>;
}

export function FuturePersonalAppSlide({ slide }) {
  return <SlideFrame slide={slide} className="fi-personal-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <div className="fi-personal-layout">
      <div className="fi-personal-copy">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.deck}</p>
        <SourceLink source={slide.source} />
      </div>
      <figure className="fi-personal-image">
        <img src={slide.image} alt={slide.imageAlt} />
        <figcaption>{slide.imageCredit} · Julie Zhuo</figcaption>
      </figure>
    </div>
  </SlideFrame>;
}

export function FutureShapedAppSlide({ slide }) {
  const [active, setActive] = useState(0);
  const example = slide.examples[active];
  return <SlideFrame slide={slide} className="fi-shaped-slide">
    <span className="section-label">{slide.eyebrow}</span>
    <div className="fi-shaped-layout">
      <div className="fi-shaped-copy">
        <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
        <p>{slide.deck}</p>
        <div className="fi-shaped-tabs" aria-label="Explore Julie Zhuo’s reading app">
          {slide.examples.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{item.label}</button>)}
        </div>
        <SourceLink source={slide.source} />
      </div>
      <figure className="fi-shaped-image" key={example.id}>
        <img src={example.image} alt={example.alt} />
        <figcaption>Original app capture · Julie Zhuo</figcaption>
      </figure>
    </div>
  </SlideFrame>;
}
