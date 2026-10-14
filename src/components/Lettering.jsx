// Real text remains available to assistive technology; only the visual glyphs move.
export default function Lettering({ text, className = "" }) {
  return (
    <span className={`studio-lettering ${className}`} data-lettering>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="lettering-visual">
        {text.split(" ").map((word, i) => (
          <span className="lettering-word" key={`${word}-${i}`}>
            {[...word].map((letter, j) => (
              <span className="lettering-cell" key={j}>
                <span className="lettering-glyph">{letter}</span>
              </span>
            ))}
            {i < text.split(" ").length - 1 && (
              <span className="lettering-space"> </span>
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
