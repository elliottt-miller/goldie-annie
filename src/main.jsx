import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ArrowRight,
  CakeSlice,
  CalendarDays,
  ChevronDown,
  Heart,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import "./style.css";

const SHOP = "https://shop.bakesy.app/b/goldie-anns-sweets-more";
const asset = (filename) => `${import.meta.env.BASE_URL}${filename}`;
const products = [
  {
    name: "Apple Pie on a Stick · 1 Dozen",
    category: "Cake Pops",
    price: "$32 / dozen",
    detail: "Apple pie cake pops, listed as a one-dozen package.",
    image: asset("products/apple-pie-cake-pop.webp"),
  },
  {
    name: "Lemon Blueberry Pops · 1 Dozen",
    category: "Cake Pops",
    price: "$32 / dozen",
    detail: "Lemon blueberry cake pops, listed as a one-dozen package.",
    image: asset("products/lemon-blueberry-cake-pop.webp"),
  },
  {
    name: "Butterfinger Bliss",
    category: "Cake Pops",
    price: "See Bakesy",
    detail: "A named cake-pop flavor. Package and price are not shown in the supplied screenshots.",
    image: asset("products/butterfinger-bliss.webp"),
  },
  {
    name: "Red Velvet Delight",
    category: "Cake Pops",
    price: "See Bakesy",
    detail: "A named cake-pop flavor. Package and price are not shown in the supplied screenshots.",
    image: asset("products/red-velvet-cake-pop.webp"),
  },
  {
    name: "Espresso Caramel Pops",
    category: "Cake Pops",
    price: "See Bakesy",
    detail: "A named cake-pop flavor. Package and price are not shown in the supplied screenshots.",
    image: asset("products/espresso-caramel-cake-pop.webp"),
  },
  {
    name: "Funfetti Pops",
    category: "Cake Pops",
    price: "See Bakesy",
    detail: "A named cake-pop flavor. Package and price are not shown in the supplied screenshots.",
    image: asset("products/funfetti-cake-pop.webp"),
  },
  {
    name: "Custom Cakesicles",
    category: "Treats",
    price: "See Bakesy",
    detail: "Custom decorated cakesicles. Packages and customizations are available on request.",
    image: asset("products/cakesicles.webp"),
  },
  {
    name: "Rice Krispy Treats",
    category: "Treats",
    price: "$56",
    detail: "Dipped in chocolate, drizzled, and topped with sprinkles. Price is shown; package quantity is not visible in the supplied screenshots.",
    image: asset("products/rice-krispy-treats.webp"),
  },
  {
    name: "Chocolate Dipped & Drizzled Oreos",
    category: "Treats",
    price: "$32",
    detail: "Chocolate dipped, drizzled, and decorated Oreos. Price is shown; package quantity is not visible in the supplied screenshots.",
    image: asset("products/decorated-oreos.webp"),
  },
  {
    name: "Pretzel Rods · Homemade Caramel Wrap",
    category: "Treats",
    price: "$38",
    detail: "Pretzel rods wrapped in homemade caramel, dipped in chocolate, drizzled, and decorated. Homemade caramel and pecans are shown as $0.25 extra per rod.",
    image: asset("products/caramel-pretzel-rods.webp"),
  },
  {
    name: "Pretzel Rods · Chocolate Dipped & Drizzled",
    category: "Treats",
    price: "$32",
    detail: "Chocolate dipped, drizzled, and decorated. Options shown include pecans, no sprinkles, blueberry, mint, and caramel; pecans and caramel are $0.25 extra per rod.",
    image: asset("products/chocolate-pretzel-rods.webp"),
  },
  {
    name: "The Mean Ones Sweet Box",
    category: "Presale",
    price: "$45 / box",
    detail: "The supplied Bakesy screenshot describes a holiday box with four cake pops, four Oreos, and four chocolate dipped, drizzled, decorated pretzels. Check Bakesy for current availability.",
    image: asset("products/mean-ones-sweet-box.webp"),
  },
  {
    name: "Blue Christmas Confection Box",
    category: "Presale",
    price: "$45 / box",
    detail: "The supplied Bakesy screenshot describes a holiday box with four cake pops, four Oreos, and four chocolate dipped, drizzled, decorated pretzels. Check Bakesy for current availability.",
    image: asset("products/blue-christmas-box.webp"),
  },
];
const categories = ["All offerings", "Cake Pops", "Treats", "Presale"];

function GoldieLogo() {
  return (
    <svg className="goldie-logo" viewBox="0 0 74 74" aria-hidden="true">
      <circle cx="37" cy="37" r="35" fill="#c9a321" stroke="#f3dc83" />
      <circle cx="37" cy="37" r="31.5" fill="none" stroke="#332850" strokeWidth="1" />
      <text x="37" y="34" textAnchor="middle" className="logo-script">Goldie Ann</text>
      <text x="37" y="45" textAnchor="middle" className="logo-small">SWEETS &amp; MORE</text>
      <path d="M37 55c-4-3-6-7-3-8 2-1 3 1 3 2 1-2 3-3 5-1 2 2-1 5-5 7Z" fill="#17102f" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a
        className="brand"
        href="#home"
        aria-label="Goldie Ann’s Sweets & More home"
      >
        <GoldieLogo />
        <span>
          Goldie Ann’s
          <br />
          <i>Sweets & More</i>
        </span>
      </a>
      <button
        className="mobile-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-navigation"
      >
        {open ? <X /> : <MenuIcon />}
      </button>
      <nav id="site-navigation" className={open ? "nav nav-open" : "nav"}>
        <a onClick={() => setOpen(false)} href="#sweets">
          Offerings
        </a>
        <a onClick={() => setOpen(false)} href="#seasonal">
          Holiday presale
        </a>
        <a onClick={() => setOpen(false)} href="#story">
          About the sweets
        </a>
        <a onClick={() => setOpen(false)} href="#ordering">
          How to order
        </a>
        <a className="nav-cta" href={SHOP} target="_blank" rel="noreferrer">
          Order with Bakesy <ArrowRight size={15} />
        </a>
      </nav>
    </header>
  );
}

function SweetTicker() {
  const treats = [
    "Cake Pops",
    "Cakesicles",
    "Dipped Oreos",
    "Pretzel Rods",
    "Rice Krispy Treats",
    "Custom Packages",
  ];
  return (
    <div
      className="sweet-ticker"
      role="img"
      aria-label="Cake pops, cakesicles, dipped Oreos, pretzels, Rice Krispy treats, and custom packages"
    >
      <div className="sweet-ticker-track" aria-hidden="true">
        {[...treats, ...treats].map((t, i) => (
          <span className="ticker-item" key={`${t}-${i}`}>
            {t}
            <i>✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedCollections({ onBrowse }) {
  const reveal = useScrollReveal();
  const collections = [
    {
      number: "01",
      title: "Cake Pops",
      category: "Cake Pops",
      image: products[0].image,
      alt: "Studio photo of Goldie Ann's apple pie cake pop",
    },
    {
      number: "02",
      title: "Dipped Treats",
      category: "Treats",
      image: products[8].image,
      alt: "Studio photo of decorated chocolate dipped Oreos",
    },
    {
      number: "03",
      title: "Holiday Boxes",
      category: "Presale",
      image: products[11].image,
      alt: "Studio photo of a holiday confection assortment",
    },
  ];
  return (
    <section
      ref={reveal}
      className="collections-section reveal"
      aria-labelledby="collections-title"
    >
      <div className="collections-inner">
        <div className="collections-heading">
          <span className="overline">Cake pops, dipped treats & more</span>
          <h2 id="collections-title">
            Find your kind
            <br />
            of <em>sweet.</em>
          </h2>
          <p>Choose a favorite to explore the current menu.</p>
        </div>
        <div className="collections-grid">
          {collections.map((item) => (
            <button
              className="collection-card"
              type="button"
              key={item.category}
              onClick={() => onBrowse(item.category)}
              aria-label={`Browse ${item.title}`}
            >
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="collection-number">{item.number}</span>
              <span className="collection-title">
                {item.title}
                <ArrowRight size={19} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ProductCard({ item, index, onSelect }) {
  return (
    <button
      type="button"
      className={`product-card product-${index}`}
      onClick={(event) => onSelect(item, event.currentTarget)}
      aria-haspopup="dialog"
      aria-label={`View details for ${item.name}`}
    >
      <div className="product-image">
        <img
          src={item.image}
          alt={`${item.name}, professionally styled product photograph`}
          loading="lazy"
        />
        <span className="product-arrow">
          <ArrowDownRight size={19} />
        </span>
      </div>
      <div className="product-info">
        <div>
          <span className="product-category">{item.category}</span>
          <h3>{item.name}</h3>
          <p>{item.detail}</p>
        </div>
        <strong>{item.price}</strong>
      </div>
    </button>
  );
}

function ProductDetail({ item, onClose, openerRef }) {
  const closeButton = useRef(null);
  useEffect(() => {
    closeButton.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const controls = [
          ...document.querySelectorAll(
            ".product-dialog button, .product-dialog a[href]",
          ),
        ];
        const first = controls[0],
          last = controls.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      openerRef.current?.focus();
    };
  }, [onClose, openerRef]);
  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="product-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
        aria-describedby="product-dialog-description"
      >
        <button
          ref={closeButton}
          className="dialog-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={20} />
        </button>
        <div className="dialog-image">
          <img src={item.image} alt="" />
        </div>
        <div className="dialog-copy">
          <span className="product-category">{item.category}</span>
          <h2 id="product-dialog-title">{item.name}</h2>
          <p id="product-dialog-description">{item.detail}</p>
          <div className="dialog-price">{item.price}</div>
          <p className="dialog-note">
            Photos are professionally restyled from the supplied product
            references. Check Bakesy for current availability and order details.
          </p>
          <a
            className="button button-red"
            href={SHOP}
            target="_blank"
            rel="noreferrer"
          >
            View in the Bakesy shop <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("All offerings");
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dialogOpener = useRef(null);
  const menuReveal = useScrollReveal();
  const seasonalReveal = useScrollReveal();
  const storyReveal = useScrollReveal();
  const orderingReveal = useScrollReveal();
  const footerReveal = useScrollReveal();
  const browseCollection = (category) => {
    setFilter(category);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    document
      .getElementById("sweets")
      ?.scrollIntoView({ behavior, block: "start" });
  };
  const filtered = useMemo(
    () =>
      products.filter((p) => filter === "All offerings" || p.category === filter),
    [filter],
  );
  return (
    <>
      <Header />
      <main id="home">
        <section className="hero">
          <div className="hero-image">
            <img
              src={products[5].image}
              alt="Funfetti cake pop dipped in green confectionery coating, shown cut open"
            />
            <div className="image-caption">
              <CakeSlice size={17} />
              <span>A little something sweet</span>
            </div>
          </div>
          <div className="hero-copy">
            <div className="hero-flower">
        <GoldieLogo />
            </div>
            <span className="hero-eyebrow">Sweets & More</span>
            <h1>Goldie Ann’s</h1>
            <p>
              Custom decorated cake pops, cakesicles, dipped Oreos, pretzels,
              and Rice Krispy treats. Packages and customizations are available
              by request.
            </p>
            <a className="button button-red" href="#sweets">
              Explore the offerings <ArrowRight size={17} />
            </a>
            <div className="hero-note">
              <span className="note-line" />A little something for every kind of
              day.
            </div>
          </div>
        </section>
        <SweetTicker />
        <FeaturedCollections onBrowse={browseCollection} />

        <section
          ref={menuReveal}
          className="menu-section section-pad reveal"
          id="sweets"
        >
          <div className="section-heading">
            <div>
              <span className="overline">Custom decorated sweets</span>
              <h2>The offerings</h2>
            </div>
            <p>
              Choose from the named cake-pop flavors and dipped treats shown
              here. Packages and custom details are arranged through Bakesy.
            </p>
          </div>
          <div className="filter-row" role="group" aria-label="Filter sweets">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={filter === c ? "filter active" : "filter"}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filtered.slice(0, showAll ? filtered.length : 6).map((item, i) => (
              <ProductCard
                key={item.name}
                item={item}
                index={i}
                onSelect={(item, trigger) => {
                  dialogOpener.current = trigger;
                  setSelectedItem(item);
                }}
              />
            ))}
          </div>
          {filtered.length > 6 && (
            <button
              className="text-link show-more"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show fewer offerings" : "See all offerings"}{" "}
              <ChevronDown className={showAll ? "flip" : ""} size={16} />
            </button>
          )}
          <p className="menu-footnote">
            Product photography is AI-restyled from the supplied examples; the cakesicle image is illustrative. Check current menu details and options in the{" "}
            <a href={SHOP} target="_blank" rel="noreferrer">
              Bakesy shop
            </a>
            .
          </p>
        </section>

        <section
          ref={seasonalReveal}
          className="seasonal-section reveal"
          id="seasonal"
        >
          <div className="seasonal-inner">
            <div className="seasonal-copy">
              <span className="overline">Holiday presale</span>
              <h2>
                A little box
                <br />
                <em>of holiday joy.</em>
              </h2>
              <p>
                Three holiday themes were offered in the supplied menu. Each
                box includes four cake pops, four Oreos and four decorated
                pretzels. Check Bakesy for current availability.
              </p>
              <a
                className="button button-outline"
                href={SHOP}
                target="_blank"
                rel="noreferrer"
              >
                Check current availability <ArrowRight size={17} />
              </a>
            </div>
            <div className="seasonal-collage">
              <figure className="seasonal-large">
                <img src={products[11].image} alt="The Mean Ones holiday sweet box assortment" />
                <figcaption>
                  The Mean Ones Sweet Box <span>{products[11].price}</span>
                </figcaption>
              </figure>
              <figure className="seasonal-small">
                <img src={products[12].image} alt="Blue Christmas confection box assortment" />
                <figcaption>
                  Blue Christmas Box <span>{products[12].price}</span>
                </figcaption>
              </figure>
              <div className="seasonal-stamp">
                <GoldieLogo />
                <span>
                  Holiday
                  <br />
                  presale
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={storyReveal}
          className="story-section section-pad reveal"
          id="story"
        >
          <div className="story-image">
            <img
              src={products[9].image}
              alt="Homemade caramel wrapped, chocolate dipped and decorated pretzel rods"
              loading="lazy"
            />
            <div className="story-seal">
              <Heart size={18} />
              <span>
                Sweet
                <br />
                moments
              </span>
            </div>
          </div>
          <div className="story-copy">
            <span className="overline">A little more about the menu</span>
            <h2>
              A little sweetness
              <br />
              to <em>share.</em>
            </h2>
            <p>
              Goldie Ann’s specializes in delicious, high quality custom
              decorated cake pops, cakesicles, dipped Oreos, pretzels and Rice
              Krispy treats. Packages are available and can be customized upon
              request.
            </p>
            <p>Browse the current menu to see what’s available.</p>
            <a
              className="text-link"
              href={SHOP}
              target="_blank"
              rel="noreferrer"
            >
              Visit the Bakesy shop <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section
          ref={orderingReveal}
          className="ordering-section reveal"
          id="ordering"
        >
          <div className="order-title">
            <span className="overline">Order and pickup details</span>
            <h2>
              Let’s make it <em>sweet.</em>
            </h2>
            <p>Details shown in the supplied Bakesy shop screenshots.</p>
          </div>
          <div className="order-steps">
            <article>
              <span className="step-num">01</span>
              <div className="step-icon">
                <CakeSlice />
              </div>
              <h3>Browse the menu</h3>
              <p>Browse cake pops, cakesicles, Oreos, pretzels, Rice Krispy treats and holiday boxes.</p>
            </article>
            <article>
              <span className="step-num">02</span>
              <div className="step-icon">
                <CalendarDays />
              </div>
              <h3>Place your order</h3>
              <p>A 50% non-refundable deposit is required when an order is placed.</p>
            </article>
            <article>
              <span className="step-num">03</span>
              <div className="step-icon">
                <Heart />
              </div>
              <h3>Plan your pickup</h3>
              <p>
                Pickup is during the selected slot between 6 PM and 9 PM. If
                running late, message through the app.
              </p>
            </article>
          </div>
          <a
            className="button button-red order-button"
            href={SHOP}
            target="_blank"
            rel="noreferrer"
          >
            Start an order <ArrowRight size={17} />
          </a>
        </section>
      </main>
      <footer ref={footerReveal} className="footer reveal">
        <div className="footer-display" aria-hidden="true">
          Goldie Ann’s
        </div>
        <div className="footer-top">
          <a className="brand brand-footer" href="#home">
            <GoldieLogo />
            <span>
              Goldie Ann’s
              <br />
              <i>Sweets & More</i>
            </span>
          </a>
          <p>
            A little sweetness makes
            <br />
            every moment more memorable.
          </p>
          <a
            className="footer-order"
            href={SHOP}
            target="_blank"
            rel="noreferrer"
          >
            Visit the Bakesy shop <ArrowRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Goldie Ann’s Sweets & More</span>
          <div>
            <a href="#sweets">The sweets</a>
            <a href="#story">About the sweets</a>
            <a href="#ordering">How to order</a>
          </div>
          <span>
            Made with <Heart size={12} fill="currentColor" /> & something sweet
          </span>
        </div>
      </footer>
      {selectedItem && (
        <ProductDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          openerRef={dialogOpener}
        />
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
