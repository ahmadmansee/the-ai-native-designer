/** Local media can be swapped into a slide without changing its layout. */
export function MediaFrame({ media, className = '' }) {
  if (!media?.src) {
    return (
      <div className={`media-placeholder ${className}`} role="note">
        <span className="media-placeholder-icon" aria-hidden="true">▧</span>
        <span>{media?.label ?? 'Media to add'}</span>
      </div>
    );
  }

  if (media.type === 'video') {
    return <video className={className} src={media.src} poster={media.poster} controls playsInline preload="metadata" aria-label={media.alt} />;
  }

  return <img className={className} src={media.src} alt={media.alt ?? ''} loading="lazy" />;
}
