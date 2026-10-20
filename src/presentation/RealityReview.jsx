import { useEffect } from 'react';
import { slides } from '../data/presentation.js';
import { HistoryTeaserSlide } from './HistoryTeaserSlide.jsx';
import { CompanyRealitySlide, CompanyRealityConversationSlide } from './CompanyRealitySlide.jsx';
import './RealityReview.css';

const intro = slides.find(slide => slide.id === 'reality-check');
const constraints = slides.find(slide => slide.id === 'company-conditions');

export function RealityReview() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' }));
  }, []);
  return <main className="presentation reality-review" lang="en">
    <header className="reality-review-header">
      <div><strong>Reality check</strong><span>Section draft · compare two ways to tell the same story</span></div>
      <nav aria-label="Compare versions"><a href="#section-intro">Intro</a><a href="#version-a">Version A</a><a href="#version-b">Version B</a><a href="./#reality-check">Back to the presentation ↗</a></nav>
    </header>
    <div className="slide-list">
      <div className="slide-unit" id="section-intro"><div className="reality-review-label"><span>Section intro</span></div><HistoryTeaserSlide slide={intro} /></div>
      <div className="slide-unit" id="version-a"><div className="reality-review-label"><span>Version A</span><span>Four visual checkpoints</span></div><CompanyRealitySlide slide={constraints} /></div>
      <div className="slide-unit" id="version-b"><div className="reality-review-label"><span>Version B</span><span>A conversation at work</span></div><CompanyRealityConversationSlide slide={{ ...constraints, id: 'company-conditions-b' }} /></div>
    </div>
  </main>;
}
