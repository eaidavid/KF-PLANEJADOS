export function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, 60vw",
  onLoad,
  onError,
}) {
  return (
    <img
      className={className}
      src={`/images/${name}-1280.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w, /images/${name}-1920.webp 1920w`}
      sizes={sizes}
      alt={alt}
      width={2000}
      height={1189}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      onLoad={onLoad}
      onError={onError}
    />
  );
}
