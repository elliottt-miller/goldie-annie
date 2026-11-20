import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Heart, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../commerce/useCart';
import styles from "./Navigation.module.css"
import Links from "./Links"

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuOverlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const keepFocusInMenu = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = [
        menuButton.current,
        ...Array.from(menuOverlay.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []),
      ].filter((element): element is HTMLElement => Boolean(element));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('keydown', keepFocusInMenu);
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('keydown', keepFocusInMenu);
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeMenuOnHistoryNavigation = () => setMenuOpen(false);
    window.addEventListener('popstate', closeMenuOnHistoryNavigation);
    return () => window.removeEventListener('popstate', closeMenuOnHistoryNavigation);
  }, []);

  useEffect(() => {
    const desktopViewport = window.matchMedia('(min-width: 810px)');
    const closeMenuAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopViewport.addEventListener('change', closeMenuAtDesktop);
    return () => desktopViewport.removeEventListener('change', closeMenuAtDesktop);
  }, []);

  const mobileNavItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/treats' },
    { label: 'Contact', path: '/contact' },
    { label: 'Our story', path: '/about' },
  ];
  const currentPath = location.pathname.replace(/\/$/, '') || '/';

  return (
    <div className={styles["desktop"]} data-open={menuOpen}>
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
          <Link className={styles["logo-s-frame"]} to="/" aria-label="Goldie Ann’s Sweets & More home">
            <span className={styles["main-logo"]} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}logo-badge.svg)` }} />
          </Link>
        </nav>
      </div>
      <button ref={menuButton} type="button" className={styles["menu"]} onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="goldie-mobile-menu">
        <span className={styles.menuIcon} aria-hidden="true"><i /><i /><i /></span>
      </button>
      <div ref={menuOverlay} id="goldie-mobile-menu" className={styles.mobileMenu} aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileMenuTop}>
            <Link className={styles.mobileBag} to="/cart" aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}>
              <ShoppingBag size={21} aria-hidden="true" />
              {itemCount > 0 && <span className={styles.cartCount} aria-hidden="true">{itemCount}</span>}
            </Link>
            <Link className={styles.mobileLogo} to="/" aria-label="Goldie Ann’s Sweets & More home">
              <img src={`${import.meta.env.BASE_URL}logo-badge.svg`} alt="Goldie Ann’s Sweets & More" width={144} height={90} />
            </Link>
            <span className={styles.mobileTopSpacer} aria-hidden="true" />
          </div>
          <div className={styles.mobileMenuHeading}>
            <span className={styles.mobileMenuEyebrow}>A little sweetness awaits</span>
            <p>Where would you like to go?</p>
          </div>
          <nav className={styles.mobileMenuNav} aria-label="Mobile navigation">
            <ul className={styles.mobileMenuList}>
              {mobileNavItems.map((item, index) => <li className={styles.mobileMenuItem} key={item.path}>
                <Link className={styles.mobileMenuLink} to={item.path} aria-current={currentPath === item.path ? 'page' : undefined} onClick={() => {
                  setMenuOpen(false);
                  menuButton.current?.focus({ preventScroll: true });
                }}>
                  <span className={styles.mobileMenuNumber}>0{index + 1}</span>
                  <span className={styles.mobileMenuText}>{item.label}</span>
                  <ArrowUpRight className={styles.mobileMenuArrow} size={23} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </li>)}
            </ul>
          </nav>
          <div className={styles.mobileMenuFooter}>
            <span aria-hidden="true"><i /><Heart size={14} /><i /></span>
            <p>Hand-decorated for life’s sweetest moments</p>
            <small>Minneapolis · Made with care</small>
          </div>
        </div>
      </div>
    </div>
  )
}
