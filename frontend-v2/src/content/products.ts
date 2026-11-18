const productCatalog = [
  { id: 'funfetti-cake-pops', name: 'Funfetti Cake Pops', kind: 'Cake pops · 1 dozen', image: 'funfetti-pops-transparent.webp', priceCents: 3200, description: 'A cheerful dozen of colorful cake pops, hand-decorated with sprinkles for parties, thoughtful gifts and little celebrations.' },
  { id: 'apple-pie-on-a-stick', name: 'Apple Pie on a Stick', kind: 'Cake pops · 1 dozen', image: 'apple-pie-on-a-stick-transparent.webp', priceCents: 3200, description: 'A hand-decorated cake pop with the warm, familiar flavor inspiration of classic apple pie—ready to bring a seasonal touch to your celebration.' },
  { id: 'butterfinger-bliss', name: 'Butterfinger Bliss', kind: 'Cake pops · 1 dozen', image: 'butterfinger-bliss-transparent.webp', priceCents: 3200, description: 'Chocolate cake pops finished with a crisp Butterfinger coating and chocolate drizzle for a rich, crunchy bite.' },
  { id: 'lemon-blueberry', name: 'Lemon Blueberry', kind: 'Cake pops · 1 dozen', image: 'lemon-blueberry-pops-transparent.webp', priceCents: 3200, description: 'Bright lemon cake paired with blueberry, dipped and decorated by hand for a fresh, colorful addition to your treat table.' },
  { id: 'cakesicles', name: 'Cakesicles', kind: 'Cakesicles · 1 dozen', image: 'cakesicles-transparent.webp', priceCents: 5600, description: 'A generous dozen of hand-decorated cakesicles, dipped in chocolate and finished with your requested colors, drizzle and sprinkles.' },
  { id: 'mean-ones-sweet-box', name: 'The Mean Ones Sweet Box', kind: 'Holiday confection box', image: 'mean-ones-sweet-box-transparent.webp', priceCents: null, description: 'A festive holiday mix of decorated cake pops, dipped Oreos and pretzels. Ask about current availability and pricing.', tag: 'Seasonal' },
  { id: 'blue-christmas-confection-box', name: 'Blue Christmas Confection Box', kind: 'Holiday confection box', image: 'blue-christmas-confection-box-transparent.webp', priceCents: null, description: 'A holiday assortment of decorated cake pops, dipped Oreos and pretzels in a cool seasonal palette. Ask about current availability and pricing.', tag: 'Seasonal' },
  { id: 'rice-krispy-treats', name: 'Dipped Rice Krispy Bars', kind: 'Rice Krispy bars · 1 dozen', image: 'rice-krispy-treats-transparent.webp', priceCents: 5600, description: 'A dozen Rice Krispy bars dipped in chocolate, finished with drizzle and sprinkles, and decorated to suit your occasion.' },
  { id: 'chocolate-dipped-oreos', name: 'Dipped & Drizzled Oreos', kind: 'Dipped Oreos · 1 dozen', image: 'dipped-oreos-transparent.webp', priceCents: 3200, description: 'A dozen Oreo cookies dipped in chocolate and hand-finished with drizzle and sprinkles for a polished party favor or shareable treat.' },
  { id: 'homemade-caramel-pretzel-rods', name: 'Homemade Caramel Pretzel Rods', kind: 'Pretzel rods · 1 dozen', image: 'homemade-caramel-pretzel-rods-transparent.webp', priceCents: 3800, description: 'A dozen pretzel rods wrapped with homemade caramel, dipped and decorated by hand. Add pecans for an additional $6 per dozen.' },
  { id: 'chocolate-dipped-pretzel-rods', name: 'Dipped & Drizzled Pretzel Rods', kind: 'Pretzel rods · 1 dozen', image: 'chocolate-dipped-pretzel-rods-transparent.webp', priceCents: 3200, description: 'A dozen sweet-and-salty pretzel rods dipped and drizzled by hand. Choose homemade caramel or pecans for an additional $6 per dozen each.' },
] as const;

export type Product = (typeof productCatalog)[number];
export type ProductId = Product['id'];

export const products: readonly Product[] = productCatalog;

export const sweetPackages = [
  { name: 'The Indulgence Package', priceCents: 7000, pieces: 24, items: ['6 cake pops or discs', '6 dipped Rice Krispy bars', '6 dipped Oreos', '6 dipped, caramel-wrapped pretzels'] },
  { name: 'The Signature Party Package', priceCents: 14100, pieces: 48, items: ['12 cake pops or discs', '12 dipped Rice Krispy bars', '12 dipped Oreos', '12 dipped, caramel-wrapped pretzels'] },
  { name: 'The Deluxe Dessert Table Display', priceCents: 24500, pieces: 80, items: ['20 cake pops or discs', '20 dipped Rice Krispy bars', '20 dipped Oreos', '20 dipped, caramel-wrapped pretzels'] },
  { name: 'The Sovereign Party Spread', priceCents: 36600, pieces: 120, items: ['24 cakesicles', '24 cake pops or discs', '24 Rice Krispy bars', '24 dipped Oreos', '24 dipped, caramel-wrapped pretzels'] },
] as const;

export const regularDippingColors = ['Blue', 'Green', 'Pink', 'Black', 'White', 'Orange', 'Yellow', 'Multi', 'Swirl', 'Red'] as const;
export const orderMinimumCents = 2000;
export const orderDepositPercent = 50;
export const orderLeadTimeDays = 7;
export const typicalPreparationDays = 3;
export const pretzelCaramelUpchargeCents = 600;
export const pretzelPecanUpchargeCents = 600;

export interface ProductCollection {
  id: string;
  title: string;
  description: string;
  productIds: readonly [ProductId, ...ProductId[]];
}

export const productCollections: readonly ProductCollection[] = [
  {
    id: 'cake-pops',
    title: 'Cake pops',
    description: 'Colorful, hand-decorated cake pops made for birthday tables, baby showers and thoughtful little gifts.',
    productIds: ['funfetti-cake-pops', 'lemon-blueberry', 'apple-pie-on-a-stick', 'butterfinger-bliss'],
  },
  {
    id: 'dipped-treats',
    title: 'Dipped treats',
    description: 'Chocolate-dipped Oreos, pretzel rods and cakesicles, finished with your choice of up to two colors, drizzle and sprinkles.',
    productIds: ['chocolate-dipped-oreos', 'chocolate-dipped-pretzel-rods', 'cakesicles'],
  },
  {
    id: 'sweet-boxes',
    title: 'Sweet boxes',
    description: 'A shareable assortment of decorated sweets, thoughtfully arranged for celebrations, gifting and everyday joy.',
    productIds: ['mean-ones-sweet-box', 'blue-christmas-confection-box', 'rice-krispy-treats'],
  },
];

export function getProduct(id: ProductId): Product {
  const product = productCatalog.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown Goldie Ann product: ${id}`);
  return product;
}
