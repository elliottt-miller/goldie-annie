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
    name: "6 Inch Celebration Cake",
    category: "Cakes",
    price: "$25",
    detail: "One cake flavor, one icing flavor.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Cupcakes",
    category: "Cupcakes",
    price: "$22",
    detail: "A dozen, with your choice of cake and icing flavor.",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Giant Chocolate Chip Cookies",
    category: "Cookies",
    price: "$12",
    detail: "A dozen giant chocolate chip cookies.",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pumpkin Spice Roll",
    category: "Seasonal",
    price: "$20",
    detail: "A cozy spiced roll for the season.",
    image: asset("pumpkin-roll.png"),
  },
  {
    name: "Mini Upside Down Peach Cakes",
    category: "Seasonal",
    price: "$23",
    detail: "One dozen little peach-topped cakes.",
    image: asset("peach-cakes.png"),
  },
  {
    name: "Sweet Potato Biscuits",
    category: "Comfort Sweets",
    price: "$8",
    detail: "Six tender, homestyle biscuits.",
    image: asset("sweet-potato-biscuits.png"),
  },
  {
    name: "S’mores Cake · 6 Inch",
    category: "Cakes",
    price: "$35",
    detail: "A campfire-inspired cake made for sharing.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Cookie Party Pack",
    category: "Cookies",
    price: "$30",
    detail: "See Bakesy for current pack details and flavor options.",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85",
  },
];
const categories = [
  "All sweets",
  "Cakes",
  "Cupcakes",
  "Cookies",
  "Seasonal",
  "Comfort Sweets",
];

function FlowerMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 74 74"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M11 61C24 52 28 39 34 19M17 53l-9-2m16-8-10-5m17-5-9-7m14-1-3-11m-2 37 10 1m-6-11 10-5m-17 6 1 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M34 19c-7-4-7-11-1-15 6 4 7 10 1 15Zm-7 10c-7 1-12-3-11-9 7-2 12 2 11 9Zm-8 13c-6 4-12 2-14-4 5-5 11-4 14 4Zm26-14c1-7 7-10 13-7-1 7-6 10-13 7Zm-2 12c4-6 11-6 15-1-4 6-10 7-15 1Z"
        fill="#d9b768"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
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
        <FlowerMark />
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
          The sweets
        </a>
        <a onClick={() => setOpen(false)} href="#seasonal">
          Seasonal
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
    "Cakes",
    "Cupcakes",
    "Cookies",
    "Seasonal sweets",
    "Comfort bakes",
    "Sweets & more",
  ];
  return (
    <div
      className="sweet-ticker"
      role="img"
      aria-label="Explore cakes, cupcakes, cookies, seasonal sweets, and comfort bakes"
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
      title: "Cakes for gathering",
      category: "Cakes",
      image: products[0].image,
      alt: "Chocolate cake ready to serve",
    },
    {
      number: "02",
      title: "Cookies to share",
      category: "Cookies",
      image: products[2].image,
      alt: "Chocolate chip cookies",
    },
    {
      number: "03",
      title: "Seasonal favorites",
      category: "Seasonal",
      image: products[3].image,
      alt: "Pumpkin spice roll",
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
          <span className="overline">A little something for everyone</span>
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
        <img src={item.image} alt={item.name} loading="lazy" />
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
            See the Bakesy shop for current details, options, and availability.
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
  const [filter, setFilter] = useState("All sweets");
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
      products.filter((p) => filter === "All sweets" || p.category === filter),
    [filter],
  );
  return (
    <>
      <Header />
      <main id="home">
        <section className="hero">
          <div className="hero-image">
            <img
              src={asset("chocolate-cake-hero.png")}
              alt="Chocolate layer cake with a slice ready to serve"
            />
            <div className="image-caption">
              <CakeSlice size={17} />
              <span>A little something sweet</span>
            </div>
          </div>
          <div className="hero-copy">
            <div className="hero-flower">
              <FlowerMark />
            </div>
            <span className="hero-eyebrow">Sweets & More</span>
            <h1>Goldie Ann’s</h1>
            <p>
              Cakes, cupcakes, cookies, seasonal bakes, and comfort sweets. Find
              a little something for your next celebration or everyday craving.
            </p>
            <a className="button button-red" href="#sweets">
              Explore the menu <ArrowRight size={17} />
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
              <span className="overline">A little something for everyone</span>
              <h2>The sweets</h2>
            </div>
            <p>
              Made to celebrate the big days, brighten the ordinary ones, and
              bring everybody back for seconds.
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
              {showAll ? "Show a little less" : "See all sweets"}{" "}
              <ChevronDown className={showAll ? "flip" : ""} size={16} />
            </button>
          )}
          <p className="menu-footnote">
            Menu details and order options are kept up to date in our{" "}
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
              <span className="overline">A seasonal favorite</span>
              <h2>
                A little taste
                <br />
                <em>of the season.</em>
              </h2>
              <p>
                Peachy and pumpkin-spiced treats from the menu. Check the Bakesy
                shop for current availability.
              </p>
              <a
                className="button button-outline"
                href={SHOP}
                target="_blank"
                rel="noreferrer"
              >
                Explore seasonal sweets <ArrowRight size={17} />
              </a>
            </div>
            <div className="seasonal-collage">
              <figure className="seasonal-large">
                <img src={products[4].image} alt="Peach dessert" />
                <figcaption>
                  Peach cakes <span>{products[4].price}</span>
                </figcaption>
              </figure>
              <figure className="seasonal-small">
                <img src={products[3].image} alt="Pumpkin spice roll" />
                <figcaption>
                  Pumpkin spice roll <span>{products[3].price}</span>
                </figcaption>
              </figure>
              <div className="seasonal-stamp">
                <FlowerMark />
                <span>
                  Seasonal
                  <br />
                  menu
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
              src={asset("baker-hands.png")}
              alt="Hands piping frosting onto a cupcake"
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
              Cakes for celebrations, cookies for just because, and comfort
              sweets in between. Find a familiar favorite or something new for
              your table.
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
            <span className="overline">A few easy steps</span>
            <h2>
              Let’s make it <em>sweet.</em>
            </h2>
            <p>Your next favorite treat is only a few clicks away.</p>
          </div>
          <div className="order-steps">
            <article>
              <span className="step-num">01</span>
              <div className="step-icon">
                <CakeSlice />
              </div>
              <h3>Browse the menu</h3>
              <p>Find the cake, cookie, or comfort sweet you’re craving.</p>
            </article>
            <article>
              <span className="step-num">02</span>
              <div className="step-icon">
                <CalendarDays />
              </div>
              <h3>Share the details</h3>
              <p>Choose your treats and send your request through Bakesy.</p>
            </article>
            <article>
              <span className="step-num">03</span>
              <div className="step-icon">
                <Heart />
              </div>
              <h3>Confirm with the baker</h3>
              <p>
                Review availability, options, and order details in the Bakesy
                shop.
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
            <FlowerMark />
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
