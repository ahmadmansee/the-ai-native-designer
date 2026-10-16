import { useEffect, useRef, useState } from 'react';
import { presentation, slides } from '../data/presentation.js';
import { IntroductionSlide } from './IntroductionSlide.jsx';
import { ContextSlide } from './ContextSlide.jsx';
import { HistoryTeaserSlide } from './HistoryTeaserSlide.jsx';
import { DoubleDiamondSlide } from './DoubleDiamondSlide.jsx';
import { ToolHistorySlide } from './ToolHistorySlide.jsx';
import { TimelineSlide } from './TimelineSlide.jsx';
import { ProcessSlide } from './ProcessSlide.jsx';
import { TransitionSlide } from './TransitionSlide.jsx';
import { WorkflowSlide } from './WorkflowSlide.jsx';
import { RoleShiftSlide } from './RoleShiftSlide.jsx';
import { AiNativeDiamondSlide } from './AiNativeDiamondSlide.jsx';
import { ExperimentStorySlide } from './ExperimentStorySlide.jsx';
import { PracticalUseCasesSlide } from './PracticalUseCasesSlide.jsx';
import { MarketSignalsSlide } from './MarketSignalsSlide.jsx';
import { FomoSlide } from './FomoSlide.jsx';
import { CompanyRealitySlide } from './CompanyRealitySlide.jsx';
import { PathsIntroSlide, CompanyPathSlide, FoundingPathSlide, SoloCaseSlide } from './CareerPathsSlides.jsx';
import { FutureIntroSlide, FutureConversationSlide, FutureAssistantSlide, FuturePersonalAppSlide, FutureShapedAppSlide } from './FutureInterfaceSlides.jsx';
import { ResourcesSlide } from './ResourcesSlide.jsx';

const components = {
  introduction: IntroductionSlide,
  context: ContextSlide,
  'history-teaser': HistoryTeaserSlide,
  'double-diamond': DoubleDiamondSlide,
  'tool-history': ToolHistorySlide,
  timeline: TimelineSlide,
  process: ProcessSlide,
  transition: TransitionSlide,
  workflow: WorkflowSlide,
  'role-shift': RoleShiftSlide,
  'ai-native-diamond': AiNativeDiamondSlide,
  'experiment-story': ExperimentStorySlide,
  'practical-use-cases': PracticalUseCasesSlide,
  'market-signals': MarketSignalsSlide,
  fomo: FomoSlide,
  'company-reality': CompanyRealitySlide,
  'paths-intro': PathsIntroSlide,
  'company-path': CompanyPathSlide,
  'founding-path': FoundingPathSlide,
  'solo-case': SoloCaseSlide,
  'future-intro': FutureIntroSlide,
  'future-conversation': FutureConversationSlide,
  'future-assistant': FutureAssistantSlide,
  'future-personal-app': FuturePersonalAppSlide,
  'future-shaped-app': FutureShapedAppSlide,
  resources: ResourcesSlide,
};

function indexFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return Math.max(0, slides.findIndex(slide => slide.id === id));
}

export function App() {
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(indexFromHash);
  const hasPresented = useRef(false);

  useEffect(() => {
    if (presentationMode) return undefined;

    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      setActiveSlideIndex(indexFromHash());
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [presentationMode]);

  function goToSlide(index) {
    const next = Math.min(slides.length - 1, Math.max(0, index));
    setActiveSlideIndex(next);
    window.history.replaceState(null, '', `#${slides[next].id}`);
  }

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen);
    };
  }, []);

  useEffect(() => {
    if (!presentationMode) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setPresentationMode(false);
        return;
      }
      if (event.key === ' ' && event.target.closest?.('button, a, input, textarea, select')) return;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeSlideIndex + 1);
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeSlideIndex - 1);
      }
    };
    const onHashChange = () => setActiveSlideIndex(indexFromHash());
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [presentationMode, activeSlideIndex]);

  useEffect(() => {
    if (presentationMode) {
      hasPresented.current = true;
    } else if (hasPresented.current) {
      const id = slides[activeSlideIndex]?.id;
      if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' }));
      hasPresented.current = false;
    }
  }, [presentationMode]);

  async function toggleFullscreen() {
    if (presentationMode) {
      setPresentationMode(false);
      if (document.fullscreenElement) await document.exitFullscreen();
      return;
    }

    const visible = [...document.querySelectorAll('.slide')]
      .map((element, index) => {
        const rect = element.getBoundingClientRect();
        return { index, overlap: Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0)) };
      })
      .sort((a, b) => b.overlap - a.overlap)[0];
    const hashIndex = slides.findIndex(slide => slide.id === window.location.hash.slice(1));
    goToSlide(visible?.overlap ? visible.index : hashIndex >= 0 ? hashIndex : 0);
    setPresentationMode(true);
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Some embedded browsers disallow the Fullscreen API. The page-filling
      // presentation layout remains available as a local fallback.
    }
  }

  return (
    <main className={`presentation ${presentationMode ? 'presentation--expanded' : ''}`} lang={presentation.language} dir={presentation.direction}>
      <header className="site-header">
        <a className="site-wordmark" href="#introduction">{presentation.title}</a>
        <div className="header-actions">
          <button className="header-button" type="button" aria-pressed={showNotes} onClick={() => setShowNotes(value => !value)}>
            {showNotes ? 'Hide notes' : 'Speaker notes'}
          </button>
          <button className="header-button" type="button" aria-pressed={presentationMode || isFullscreen} onClick={toggleFullscreen}>
            {presentationMode || isFullscreen ? 'Exit full screen' : 'Full screen'}
          </button>
        </div>
      </header>

      <div className="slide-list">
        {(presentationMode ? [slides[activeSlideIndex]] : slides).map(slide => {
          const Component = components[slide.type];
          return (
            <div className="slide-unit" key={slide.id} onClick={presentationMode ? event => {
              if (!event.target.closest('button, a, input, textarea, select, [role="button"]')) goToSlide(activeSlideIndex + 1);
            } : undefined}>
              <Component slide={slide} />
              {showNotes && (
                <aside className="speaker-notes" aria-label={`Speaker notes for slide ${slide.number}`}>
                  <strong>Speaker notes · {slide.number}</strong>
                  <ol>{slide.notes.map(note => <li key={note}>{note}</li>)}</ol>
                </aside>
              )}
            </div>
          );
        })}
      </div>
      {presentationMode && <nav className="presentation-controls" aria-label="Slide navigation">
        <button type="button" onClick={() => goToSlide(activeSlideIndex - 1)} disabled={activeSlideIndex === 0} aria-label="Previous slide">←</button>
        <span>{slides[activeSlideIndex].number} / {String(slides.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => goToSlide(activeSlideIndex + 1)} disabled={activeSlideIndex === slides.length - 1} aria-label="Next slide">→</button>
      </nav>}
    </main>
  );
}
