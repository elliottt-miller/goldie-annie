import { useEffect, useRef, useState } from 'react';
import { Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../commerce/CartContext';
import styles from "./Navigation.module.css"
import Links from "./Links"

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigationRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || navigationRoot.current?.contains(event.target)) return;
      setMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopViewport = window.matchMedia('(min-width: 810px)');
    const closeMenuAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopViewport.addEventListener('change', closeMenuAtDesktop);
    return () => desktopViewport.removeEventListener('change', closeMenuAtDesktop);
  }, []);

  return (
    <div ref={navigationRoot} className={styles["desktop"]} data-open={menuOpen}>
      <div className={styles["container"]}>
        <div className={styles["shining-border"]} />
        <nav aria-label="Main navigation" className={styles["links-logo"]} onClick={(event) => {
          if (!(event.target instanceof Element) || !event.target.closest('a')) return;
          setMenuOpen(false);
          // A keyboard-selected route link disappears when the phone menu
          // closes, so move focus to its persistent toggle before it is hidden.
          if (event.detail === 0 && window.matchMedia('(max-width: 809px)').matches) {
            menuButton.current?.focus();
          }
        }}>
          <Link className={styles.cartLink} to="/cart" aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}>
            <ShoppingBag size={19} aria-hidden="true" />
            <span>Bag</span>
            {itemCount > 0 && <span className={styles.cartCount} aria-hidden="true">{itemCount}</span>}
          </Link>
          <div id="goldie-primary-navigation-links" className={styles["link-groups"]}>
            <div className={styles["link-set-1"]}>
              <div className={styles["link-1"]}>
                <Links variant="Active" text={"Home"} link={"/"} hidePattern />
              </div>
              <span className={styles["nav-divider"]} aria-hidden="true"><i /><Heart /><i /></span>
              <div className={styles["link-2"]}>
                <Links variant="Active" text={"Shop"} link={"/treats"} hidePattern />
              </div>
              <span className={styles["nav-divider"]} aria-hidden="true"><i /><Heart /><i /></span>
            </div>
            <div className={styles["link-set-2"]}>
              <span className={styles["nav-divider"]} aria-hidden="true"><i /><Heart /><i /></span>
              <div className={styles["link-3"]}>
                <Links variant="Active" text={"Contact"} link={"/contact"} hidePattern />
              </div>
              <span className={styles["nav-divider"]} aria-hidden="true"><i /><Heart /><i /></span>
              <div className={styles["link-4"]}>
                <Links variant="Active" text={"About"} link={"/about"} hidePattern />
              </div>
            </div>
          </div>
          <button ref={menuButton} type="button" className={styles["menu"]} onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="goldie-primary-navigation-links">
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <Link className={styles["logo-s-frame"]} to="/" aria-label="Goldie Ann’s Sweets & More home">
            <span className={styles["main-logo"]} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}logo-badge.svg)` }} />
          </Link>
        </nav>
      </div>
    </div>
  )
}
