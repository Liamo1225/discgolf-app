import { style } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";

export function Header({ title, subtitle, leftAction, rightAction }) {
  const titleText = useFitText(title, {
    maxWidth: 240,
    maxFontSize: subtitle ? 32 : 40,
    minFontSize: 16,
  });

  const subTitleText = useFitText(subtitle, {
    maxWidth: 250,
    maxFontSize: 16,
    minFontSize: 10,
  });

  return (
    <header className="header">
      <div className="header-left">{leftAction}</div>

      <div className="header-content">
        <h1 ref={titleText.ref} style={titleText.style} title={title}>
          {title}
        </h1>
        {subtitle && (
          <p ref={subTitleText.ref} style={subTitleText.style} title={subtitle}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="header-right">{rightAction}</div>
    </header>
  );
}

function useFitText(
  text,
  { maxWith = 240, maxFontSize = 32, minFontSize = 14 } = {},
) {
  const ref = useRef(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const element = ref.current;
    if (!element || !text) return;

    let size = maxFontSize;

    element.style.fontSize = maxFontSize;

    while (element.scrollWidth > maxWith && size > minFontSize) {
      size -= 1;
      element.style.fontSize = `${size}px`;
    }

    setFontSize(size);
  }, [text]);

  return {
    ref,
    style: {
      fontSize: `${fontSize}px`,
      with: `${maxWith}px`,
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  };
}
