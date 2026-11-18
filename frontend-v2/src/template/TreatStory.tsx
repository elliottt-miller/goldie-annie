import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./TreatStory.module.css";
import ResponsiveProductImage from "./ResponsiveProductImage";
import { responsiveProductSrcSet } from "./productImage";

const storyDuration = 5000;

interface StorySlide {
  image: string;
  title: string;
  alt: string;
}

interface Props {
  className: string;
  title: string;
  slides: StorySlide[];
}

export default function TreatStory({ className, title, slides }: Props) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const pointerOrigin = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const paused = hovering || focusWithin;
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === "visible");
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");
  const remaining = useRef(storyDuration);
  const startedAt = useRef<number | null>(null);
  const skipElapsedOnCleanup = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    preference.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: "80px" });
    observer.observe(viewer);
    return () => observer.disconnect();
  }, []);

  // Warm the next frame while this story is visible so the timed transition
  // never switches to an image that has not started downloading yet.
  useEffect(() => {
    if (!inView || !pageVisible || slides.length < 2) return;
    const next = slides[(active + 1) % slides.length];
    const image = new Image();
    image.decoding = "async";
    const source = `${import.meta.env.BASE_URL}products/${next.image}`;
    image.sizes = "(max-width: 809px) 45vw, 240px";
    image.srcset = responsiveProductSrcSet(source) ?? "";
    image.src = source;
  }, [active, inView, pageVisible, slides]);

  useEffect(() => {
    if (paused || reducedMotion || !pageVisible || !inView || slides.length < 2) return;

    startedAt.current = performance.now();
    const timer = window.setTimeout(() => {
      remaining.current = storyDuration;
      startedAt.current = null;
      skipElapsedOnCleanup.current = true;
      setActive((current) => (current + 1) % slides.length);
    }, remaining.current);

    return () => {
      window.clearTimeout(timer);
      if (!skipElapsedOnCleanup.current && startedAt.current !== null) {
        remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt.current));
      }
      startedAt.current = null;
      skipElapsedOnCleanup.current = false;
    };
  }, [active, inView, pageVisible, paused, reducedMotion, slides.length]);

  const goTo = (index: number) => {
    remaining.current = storyDuration;
    startedAt.current = null;
    skipElapsedOnCleanup.current = true;
    setActive((index + slides.length) % slides.length);
  };

  const slide = slides[active];
  const startSwipe = (event: PointerEvent<HTMLElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if (event.target instanceof Element && event.target.closest("a, button, input, select, textarea, [role='button']")) return;
    // On phone layouts, horizontal touch gestures belong to the parent
    // scroll-snap rail; keep the per-story swipe for tablets and desktop.
    if (event.pointerType === "touch" && window.matchMedia("(max-width: 809px)").matches) return;
    pointerOrigin.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const finishSwipe = (event: PointerEvent<HTMLElement>) => {
    const origin = pointerOrigin.current;
    pointerOrigin.current = null;
    if (!origin) return;
    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    goTo(active + (deltaX > 0 ? -1 : 1));
  };
  const progressStyle = {
    "--story-duration": `${storyDuration}ms`,
    "--story-play-state": paused || reducedMotion || !pageVisible || !inView ? "paused" : "running",
  } as CSSProperties;

  return (
    <section
      ref={viewerRef}
      className={`${styles.viewer} ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} product stories`}
      tabIndex={0}
      onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovering(true); }}
      onPointerLeave={(event) => { if (event.pointerType !== "touch") setHovering(false); }}
      onPointerDown={startSwipe}
      onPointerUp={finishSwipe}
      onPointerCancel={() => { pointerOrigin.current = null; }}
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(active - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(active + 1);
        }
      }}
      style={progressStyle}
    >
      <ResponsiveProductImage key={active} className={styles.image} src={`${import.meta.env.BASE_URL}products/${slide.image}`} sizes="(max-width: 809px) 45vw, 240px" alt={slide.alt} loading="lazy" decoding="async" />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.progress} role="group" aria-label={`Story ${active + 1} of ${slides.length}`}>
        {slides.map((item, index) => (
          <span className={styles.progressTrack} key={item.image}>
            <span
              className={`${styles.progressFill} ${index === active && !reducedMotion ? styles.progressFillCurrent : index < active ? styles.progressFillComplete : ""}`}
              key={`${active}-${index}`}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
      <div className={styles.topline}>
        <span>{title}</span>
        <span className={styles.count}>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
      <div className={styles.caption} aria-live="off">
        <span>{slide.title}</span>
        <Link to="/treats">Explore treats <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
      <div className={styles.controls}>
        <button type="button" aria-label={`Previous ${title.toLowerCase()} story`} onClick={() => goTo(active - 1)}><ArrowLeft size={16} aria-hidden="true" /></button>
        <button type="button" aria-label={`Next ${title.toLowerCase()} story`} onClick={() => goTo(active + 1)}><ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </section>
  );
}
