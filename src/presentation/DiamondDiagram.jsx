export function DiamondDiagram({ stages, activeId, onSelect, themes = ['Understand the problem', 'Find a solution'], label = 'Interactive Double Diamond' }) {
  return (
    <div className="diamond-v2-visual">
      <div className="diamond-v2-themes" aria-hidden="true">
        <span>{themes[0]}</span>
        <span>{themes[1]}</span>
      </div>
      <div className="diamond-v2-shape" aria-label={label}>
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            type="button"
            className={`diamond-v2-stage diamond-v2-stage--${index + 1} ${activeId === stage.id ? 'is-active' : ''}`}
            aria-pressed={activeId === stage.id}
            onMouseEnter={() => onSelect(stage.id)}
            onFocus={() => onSelect(stage.id)}
            onClick={() => onSelect(stage.id)}
          >
            <strong>{stage.name}</strong>
          </button>
        ))}
        <svg className="diamond-v2-outline" viewBox="0 0 800 380" preserveAspectRatio="none" aria-hidden="true">
          <path className="diamond-v2-outline--blue" d="M3 190 L200 4 L397 190 L200 376 Z" />
          <path className="diamond-v2-outline--orange" d="M403 190 L600 4 L797 190 L600 376 Z" />
          <path className="diamond-v2-divider" d="M200 4 V376 M600 4 V376" />
        </svg>
      </div>
    </div>
  );
}
