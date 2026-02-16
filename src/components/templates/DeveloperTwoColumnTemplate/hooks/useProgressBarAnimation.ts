import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useProgressBarAnimation(
  aboutSectionRef: React.RefObject<HTMLElement | null>,
  skillsCount: number
) {
  const progressBarsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useEffect(() => {
    if (!aboutSectionRef.current || progressBarsRef.current.length === 0) {
      return;
    }

    progressBarsRef.current.forEach((bar) => {
      if (!bar) return;
      const percentage = parseInt(bar.getAttribute("data-percentage") || "0");

      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${percentage}%`,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (aboutSectionRef.current && trigger.trigger === aboutSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [aboutSectionRef, skillsCount]);

  return progressBarsRef;
}
