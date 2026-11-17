import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  durationMs?: number;
}

/** Counts to a real catalog value when the metric enters view; honors reduced motion. */
export default function AnimatedCounter({ value, durationMs = 1100 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const finish = () => setCount(value);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (typeof IntersectionObserver === "undefined") {
      finish();
      return;
    }

    let frame = 0;
    let startedAt: number | undefined;
    let hasStarted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasStarted || preference.matches) return;
      hasStarted = true;
      observer.disconnect();
      const animate = (now: number) => {
        startedAt ??= now;
        const progress = Math.min((now - startedAt) / durationMs, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.round(value * eased));
        if (progress < 1) frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    }, { threshold: 0.35 });

    const updateMotionPreference = () => {
      if (!preference.matches) return;
      hasStarted = true;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      finish();
    };

    observer.observe(element);
    preference.addEventListener("change", updateMotionPreference);
    updateMotionPreference();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      preference.removeEventListener("change", updateMotionPreference);
    };
  }, [durationMs, value]);

  return <span ref={counterRef} aria-hidden="true">{new Intl.NumberFormat().format(count)}</span>;
}
