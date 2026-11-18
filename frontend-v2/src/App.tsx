import { Component, lazy, Suspense, useEffect, useLayoutEffect, type ErrorInfo, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { products } from './content/products';
import Navigation from './template/Navigation';
import Footer from './template/Footer';
import styles from './App.module.css';
import { initReveal } from './template/reveal';
import { CartProvider } from './commerce/CartContext';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderRequestPage } from './pages/OrderRequestPage';
import './template/reveal.css';

const HomePage = lazy(() => import('./pages/HomePage').then((page) => ({ default: page.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((page) => ({ default: page.AboutPage })));
const TreatsPage = lazy(() => import('./pages/TreatsPage').then((page) => ({ default: page.TreatsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((page) => ({ default: page.ContactPage })));

const routeMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Goldie Ann’s Sweets & More',
    description: 'Hand-decorated cake pops, cakesicles, dipped Oreos, pretzels, and Rice Krispy treats for celebrations and gifting.',
  },
  '/about': {
    title: 'About Goldie Ann | Goldie Ann’s Sweets & More',
    description: 'Meet Goldie Ann’s collection of hand-decorated sweets, made for celebrations, thoughtful gifts, and everyday joy.',
  },
  '/treats': {
    title: 'Shop the Treats | Goldie Ann’s Sweets & More',
    description: 'Explore Goldie Ann cake pops, cakesicles, dipped Oreos, pretzel rods, Rice Krispy treats, and sweet boxes.',
  },
  '/contact': {
    title: 'Contact Goldie Ann | Goldie Ann’s Sweets & More',
    description: 'Ask Goldie Ann about custom treats, celebration packages, and order details in Minneapolis and surrounding areas.',
  },
  '/cart': { title: 'Your Sweet Bag | Goldie Ann’s Sweets & More', description: 'Review your selected treats and celebration packages.' },
  '/checkout': { title: 'Plan Your Order | Goldie Ann’s Sweets & More', description: 'Share your occasion details and preferences for an order request.' },
  '/order-request': { title: 'Order Request Summary | Goldie Ann’s Sweets & More', description: 'Review and save your order request details.' },
};

function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    const page = routeMetadata[normalizedPath];
    const product = normalizedPath.startsWith('/treats/')
      ? products.find((item) => item.id === normalizedPath.slice('/treats/'.length))
      : undefined;
    document.title = product ? `${product.name} | Goldie Ann’s Sweets & More` : page?.title ?? 'Page Not Found | Goldie Ann’s Sweets & More';

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = product ? `${product.description} Browse and order Goldie Ann’s hand-decorated treats.` : page?.description ?? 'The page you requested could not be found. Explore Goldie Ann’s hand-decorated treats.';
    }
  }, [pathname]);

  return null;
}

class RouteErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Goldie Ann page failed to load:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <div className={styles.statusPage} role="alert">
        <div className={styles.statusCard}>
          <img className={styles.brandMark} src={`${import.meta.env.BASE_URL}logo-badge.svg`} alt="" />
          <h1 className={styles.errorTitle}>This page didn’t load</h1>
          <p className={styles.errorCopy}>Please refresh to try again.</p>
          <button className={styles.retryButton} type="button" onClick={() => window.location.reload()}>Refresh page</button>
        </div>
      </div>;
    }
    return this.props.children;
  }
}

function PageLoading() {
  return <div className={styles.statusPage} role="status" aria-live="polite">
    <div className={styles.statusCard}>
      <img className={styles.brandMark} src={`${import.meta.env.BASE_URL}logo-badge.svg`} alt="" />
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.message}>A little sweetness is on its way…</span>
    </div>
  </div>;
}

function ScrollToLocation() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      target.scrollIntoView({ behavior, block: 'start' });
      return true;
    };

    if (scrollToTarget()) return;

    const observer = new MutationObserver(() => {
      if (scrollToTarget()) {
        observer.disconnect();
        window.clearTimeout(timeout);
      }
    });
    observer.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
}

function RouteTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return <div className={styles.routeTransition} key={pathname} data-route-transition>
    {children}
  </div>;
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  useLayoutEffect(() => initReveal(), []);

  return <BrowserRouter basename={basename}><CartProvider>
    <RouteMetadata />
    <ScrollToLocation />
    <RouteErrorBoundary>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-navigation"><Navigation /></header>
      <main id="main" tabIndex={-1}>
        <RouteTransition>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="treats" element={<TreatsPage />} />
              <Route path="treats/:productId" element={<ProductDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-request" element={<OrderRequestPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </RouteTransition>
      </main>
      <Footer />
    </RouteErrorBoundary>
  </CartProvider></BrowserRouter>;
}
