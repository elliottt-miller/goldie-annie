import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { products } from "../content/products";
import styles from "./ProductShowcase.module.css";

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => typeof document === "undefined" || document.visibilityState === "visible");
  const showcaseRef = useRef<HTMLElement>(null);
  const touchOrigin = useRef<{ x: number; y: number } | null>(null);
  const product = products[active];

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "120px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Load the next treat before the carousel advances so the transition never
  // lands on an empty image while its product asset is still downloading.
  useEffect(() => {
    if (!inView || !pageVisible || products.length < 2) return;
    const nextProduct = products[(active + 1) % products.length];
    const image = new Image();
    image.decoding = "async";
    image.src = `${import.meta.env.BASE_URL}products/${nextProduct.image}`;
  }, [active, inView, pageVisible]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const move = (direction: -1 | 1) => {
    setDirection(direction);
    setActive((current) => (current + direction + products.length) % products.length);
  };

  return (
    <section
      ref={showcaseRef}
      className={styles.showcase}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Goldie Ann treats"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
      }}
    >
      <div className={styles.stage}>
        <button className={`${styles.arrow} ${styles.previous}`} type="button" onClick={() => move(-1)} aria-label="Show previous treat">
          <ArrowLeft size={19} aria-hidden="true" />
        </button>
        <article
          className={styles.card}
          key={product.id}
          data-direction={direction}
          aria-roledescription="slide"
          aria-label={`${product.name}, ${active + 1} of ${products.length}`}
          onPointerDown={(event) => {
            if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
            touchOrigin.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={(event) => {
            const origin = touchOrigin.current;
            touchOrigin.current = null;
            if (!origin) return;
            const deltaX = event.clientX - origin.x;
            const deltaY = event.clientY - origin.y;
            if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) move(deltaX > 0 ? -1 : 1);
          }}
          onPointerCancel={() => { touchOrigin.current = null; }}
        >
          <div className={styles.portrait}>
            <img src={`${import.meta.env.BASE_URL}products/${product.image}`} alt={product.name} decoding="async" />
          </div>
          <div className={styles.content}>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.category}>{product.kind}</p>
            <div className={styles.divider} aria-hidden="true">
              <span />
              <Heart size={16} />
              <span />
            </div>
            <p className={styles.description}>{product.description}</p>
          </div>
        </article>
        <button className={`${styles.arrow} ${styles.next}`} type="button" onClick={() => move(1)} aria-label="Show next treat">
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">Featured treat: {product.name}</span>
    </section>
  );
}
