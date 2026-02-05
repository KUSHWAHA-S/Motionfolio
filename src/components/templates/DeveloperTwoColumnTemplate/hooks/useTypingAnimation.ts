import { useEffect, useState, useRef } from "react";

interface UseTypingAnimationOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypingAnimation({
  texts,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 40,
}: UseTypingAnimationOptions) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let textIndex = 0;
    let pauseCount = 0;
    setDisplayText("");

    const type = () => {
      const currentText = texts[textIndex];

      if (pauseCount > 0) {
        pauseCount--;
        return;
      }

      if (!isDeleting) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentText.length) {
          pauseCount = pauseDuration;
          isDeleting = true;
        }
      } else {
        setDisplayText(currentText.slice(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
    };

    typingIntervalRef.current = setInterval(type, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [texts, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, []);

  return { displayText, showCursor };
}
