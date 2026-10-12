import { useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';

export function RoleShiftSlide({ slide }) {
  const [roleId, setRoleId] = useState('ai-native');
  const role = slide.roles.find(item => item.id === roleId) ?? slide.roles[0];

  return (
    <SlideFrame slide={slide} className="role-slide">
      <span className="section-label">{slide.eyebrow}</span>
      <h2 id={`${slide.id}-title`}>{slide.headline}</h2>
      <div className="role-tabs" role="group" aria-label="Explore the roles">
        {slide.roles.map(item => <button key={item.id} type="button" aria-pressed={item.id === roleId} onClick={() => setRoleId(item.id)}>{item.label}</button>)}
      </div>
      <div className="role-stage" key={role.id} aria-live="polite">
        <div className="role-main">
          <p>{role.lead}</p>
        </div>
        <div className="role-range" aria-label={`${role.label} working range`}>
          <span>In the work</span>
          {role.range.map(item => <strong key={item}>{item}</strong>)}
        </div>
      </div>
    </SlideFrame>
  );
}
