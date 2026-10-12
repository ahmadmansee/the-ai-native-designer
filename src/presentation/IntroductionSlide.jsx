import { SlideFrame } from './SlideFrame.jsx';

export function IntroductionSlide({ slide }) {
  return (
    <SlideFrame slide={slide} className="intro-slide">
      <div className="intro-layout">
        <div className="intro-copy">
          <h1 id={`${slide.id}-title`}>{slide.headline[0]} <em>{slide.headline[1]}</em><br />{slide.headline[2]}</h1>
          <p className="intro-deck">{slide.deck}</p>
          <div className="intro-credit">
            <strong>{slide.speaker}</strong>
            <span>{slide.role}</span>
          </div>
        </div>
        <figure className="intro-portrait">
          <img src={slide.portrait} alt="Portrait of Ahmad Mansee" />
        </figure>
      </div>
    </SlideFrame>
  );
}
