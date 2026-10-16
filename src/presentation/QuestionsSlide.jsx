import { SlideFrame } from './SlideFrame.jsx';
import './QuestionsSlide.css';

function ConversationDrawing() {
  return <svg className="questions-art" viewBox="0 0 540 450" fill="none" aria-hidden="true">
    <circle cx="270" cy="228" r="199" fill="#e4f3f1" />
    <path d="M72 76h172c18 0 32 14 32 32v69c0 18-14 32-32 32h-38l-32 31 5-31H72c-18 0-32-14-32-32v-69c0-18 14-32 32-32Z" fill="#fff" stroke="#206068" strokeWidth="4" strokeLinejoin="round" />
    <text x="159" y="165" textAnchor="middle" fill="#206068" fontSize="78" fontFamily="Arial, sans-serif" fontWeight="500">?</text>
    <path d="M347 71h101c19 0 34 15 34 34v35c0 19-15 34-34 34h-18l-23 27 1-27h-61c-19 0-34-15-34-34v-35c0-19 15-34 34-34Z" fill="#18b2a8" stroke="#206068" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="367" cy="124" r="6" fill="#fff" /><circle cx="397" cy="124" r="6" fill="#fff" /><circle cx="427" cy="124" r="6" fill="#fff" />
    <circle cx="182" cy="298" r="49" fill="#f5d6bb" stroke="#206068" strokeWidth="4" />
    <path d="M131 289c5-37 25-59 54-59 30 0 48 19 48 52-21-2-38-12-49-28-12 22-27 33-53 35Z" fill="#206068" />
    <path d="M75 421c0-56 37-88 107-88 68 0 108 32 108 88" fill="#a8d5cf" stroke="#206068" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="370" cy="294" r="48" fill="#f1d5c2" stroke="#206068" strokeWidth="4" />
    <path d="M326 270c9-35 32-52 62-45 21 5 34 21 35 45-20-9-38-19-50-32-11 17-25 27-47 32Z" fill="#436c71" />
    <path d="M272 421c0-53 34-85 98-85 61 0 98 32 98 85" fill="#fff" stroke="#206068" strokeWidth="4" strokeLinejoin="round" />
    <path d="M47 423h445" stroke="#206068" strokeWidth="4" strokeLinecap="round" />
  </svg>;
}

export function QuestionsSlide({ slide }) {
  return <SlideFrame slide={slide} className="questions-slide">
    <div className="questions-layout">
      <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      <ConversationDrawing />
    </div>
  </SlideFrame>;
}
