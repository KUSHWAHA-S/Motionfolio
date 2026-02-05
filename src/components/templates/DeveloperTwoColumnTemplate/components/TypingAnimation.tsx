"use client";

import { TypingAnimationProps } from "../types";
import { useTypingAnimation } from "../hooks/useTypingAnimation";

export function TypingAnimation({
  texts,
  typingSpeed,
  deletingSpeed,
  pauseDuration,
}: TypingAnimationProps) {
  const { displayText, showCursor } = useTypingAnimation({
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  });

  return (
    <>
      {displayText}
      <span
        className={`inline-block w-0.5 h-6 md:h-10 ml-1 ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        style={{ marginLeft: "4px", verticalAlign: "baseline", marginBottom: "0" }}
      >
        |
      </span>
    </>
  );
}
