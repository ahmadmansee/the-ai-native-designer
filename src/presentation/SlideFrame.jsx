import { slides } from '../data/presentation.js';

export function SlideFrame({ slide, children, className = '' }) {
  const total = String(slides.length).padStart(2, '0');
  return (
    <section className={`slide ${className}`} id={slide.id} aria-labelledby={`${slide.id}-title`}>
      <img className="brand-lockup" src="assets/brand/logo.svg" alt="Cradis" />
      {children}
      <footer className="slide-chrome" aria-label={`Slide ${Number(slide.number)} of ${slides.length}`}>
        <span>{slide.chapter}</span>
        <span className="slide-index"><strong>{slide.number}</strong><i aria-hidden="true" /><small>{total}</small></span>
      </footer>
    </section>
  );
}
