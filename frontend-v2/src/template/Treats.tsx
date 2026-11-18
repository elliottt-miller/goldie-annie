import { useMemo, useState } from 'react';
import cx from './cx';
import tokens from './tokens.module.css';
import styles from './Treats.module.css';
import PageHeader from './PageHeader';
import ProductCard from './ProductCard';
import { products } from '../content/products';
import MenuPricing from './MenuPricing';

const productKinds = ['All treats', ...new Set(products.map((product) => product.kind.split(' · ')[0]))];

export default function Page() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState(productKinds[0]);
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesKind = kind === 'All treats' || product.kind.startsWith(kind);
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || `${product.name} ${product.kind} ${product.description}`.toLowerCase().includes(term);
    return matchesKind && matchesQuery;
  }), [kind, query]);
  const cakePopTreats = visibleProducts.filter((product) => product.kind.startsWith('Cake pops') || product.kind.startsWith('Cakesicles'));
  const otherTreats = visibleProducts.filter((product) => !product.kind.startsWith('Cake pops') && !product.kind.startsWith('Cakesicles'));

  const renderProductCard = (product: typeof products[number]) => (
    <div className={styles['cakes-pastry']} key={product.id}>
      <ProductCard
        id={product.id}
        text={product.name}
        category={product.kind}
        description={product.description}
        priceCents={product.priceCents}
        image={`${import.meta.env.BASE_URL}products/${product.image}`}
      />
    </div>
  );

  return <div className={styles['desktop']}>
    <PageHeader title="Goldie Ann’s treats" subtitle="Hand-decorated sweets for celebrations, thoughtful gifts and everyday joy." />
    <section className={styles['cakes-container']} data-reveal aria-labelledby="treats-heading" data-empty={cakePopTreats.length === 0}>
      <div className={styles['content']}>
        <div className={styles['title-filters-cake-cards']}>
          <div className={styles['title-filters']}>
            <h2 id="treats-heading" className={cx(tokens['text-n-36-r'], styles['cakes-atelier'])}>Shop the treats</h2>
            <div className={styles['search-field-dropdown']}>
              <label className={styles['search-field']}>
                <span className="sr-only">Search treats</span>
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search treats" />
              </label>
              <label className={styles['dropdown']}>
                <span className="sr-only">Filter by treat type</span>
                <select value={kind} onChange={(event) => setKind(event.target.value)}>
                  {productKinds.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </div>
          {cakePopTreats.length > 0 && <>
            <h3 className={styles['product-group-title']}>Cake pops &amp; cakesicles</h3>
            <div className={styles['cakes-pastries']} aria-live="polite">{cakePopTreats.map(renderProductCard)}</div>
          </>}
          {visibleProducts.length === 0 && <p className={styles['empty-state']} role="status">No treats match your search. Try another name or category.</p>}
        </div>
      </div>
    </section>
    {otherTreats.length > 0 && <section className={styles['pastry-container']} data-reveal aria-labelledby="other-treats-heading">
      <div className={styles['content2']}>
        <div className={styles['title-filters-cake-cards2']}>
          <h2 id="other-treats-heading" className={cx(tokens['text-n-36-r'], styles['pastry-delights'])}>Decorated treats &amp; sweet boxes</h2>
          <div className={styles['cakes-pastries2']} aria-live="polite">{otherTreats.map(renderProductCard)}</div>
        </div>
      </div>
    </section>}
    <MenuPricing />
  </div>;
}
