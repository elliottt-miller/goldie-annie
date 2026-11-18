const productCatalog = [
  { id: 'funfetti-cake-pops', name: 'Funfetti Cake Pops', kind: 'Cake pops · 1 dozen', image: 'funfetti-pops-transparent.webp', description: 'Colorful cake pops decorated with sprinkles for parties, gifting and little celebrations.' },
  { id: 'apple-pie-on-a-stick', name: 'Apple Pie on a Stick', kind: 'Cake pops · 1 dozen', image: 'apple-pie-on-a-stick-transparent.webp', description: 'A warmly spiced, hand-decorated cake pop inspired by classic apple pie.' },
  { id: 'butterfinger-bliss', name: 'Butterfinger Bliss', kind: 'Cake pops · 1 dozen', image: 'butterfinger-bliss-transparent.webp', description: 'A chocolate cake pop finished with a crisp Butterfinger coating and chocolate drizzle.' },
  { id: 'lemon-blueberry', name: 'Lemon Blueberry', kind: 'Cake pops · 1 dozen', image: 'lemon-blueberry-pops-transparent.webp', description: 'Bright lemon cake with blueberry, dipped and decorated by hand.' },
  { id: 'cakesicles', name: 'Cakesicles', kind: 'Cakesicles', image: 'cakesicles.webp', description: 'Hand-decorated cakesicles dipped in chocolate and finished with a delicate drizzle.' },
  { id: 'mean-ones-sweet-box', name: 'The Mean Ones Sweet Box', kind: 'Holiday confection box', image: 'mean-ones-sweet-box-transparent.webp', description: 'A festive assortment of cake pops, dipped Oreos and decorated pretzels.', tag: 'Seasonal' },
  { id: 'blue-christmas-confection-box', name: 'Blue Christmas Confection Box', kind: 'Holiday confection box', image: 'blue-christmas-confection-box-transparent.webp', description: 'A holiday assortment of cake pops, dipped Oreos and decorated pretzels.', tag: 'Seasonal' },
  { id: 'rice-krispy-treats', name: 'Rice Krispy Treats', kind: 'Hand-decorated treats', image: 'rice-krispy-treats-transparent.webp', description: 'Crispy treats dipped, drizzled and finished with sprinkles.' },
  { id: 'chocolate-dipped-oreos', name: 'Chocolate Dipped Oreos', kind: 'Dipped cookies', image: 'dipped-oreos-transparent.webp', description: 'Oreo cookies dipped in chocolate and decorated for your occasion.' },
  { id: 'homemade-caramel-pretzel-rods', name: 'Homemade Caramel Pretzel Rods', kind: 'Pretzel rods', image: 'homemade-caramel-pretzel-rods-transparent.webp', description: 'Pretzel rods with homemade caramel and a hand-finished chocolate coating.' },
  { id: 'chocolate-dipped-pretzel-rods', name: 'Chocolate Dipped Pretzel Rods', kind: 'Pretzel rods', image: 'chocolate-dipped-pretzel-rods-transparent.webp', description: 'Sweet and salty pretzel rods dipped and decorated by hand.' },
] as const;

export type Product = (typeof productCatalog)[number];
export type ProductId = Product['id'];

export const products: readonly Product[] = productCatalog;

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
    description: 'Colorful, hand-decorated cake pops made for gifting, parties and life’s little celebrations.',
    productIds: ['funfetti-cake-pops', 'lemon-blueberry', 'apple-pie-on-a-stick', 'butterfinger-bliss'],
  },
  {
    id: 'dipped-treats',
    title: 'Dipped treats',
    description: 'Chocolate-dipped Oreos, cakesicles and pretzels, finished with a little extra sweetness.',
    productIds: ['chocolate-dipped-oreos', 'chocolate-dipped-pretzel-rods', 'homemade-caramel-pretzel-rods'],
  },
  {
    id: 'sweet-boxes',
    title: 'Sweet boxes',
    description: 'A colorful mix of decorated sweets, ready to share or give as a gift.',
    productIds: ['rice-krispy-treats', 'mean-ones-sweet-box', 'blue-christmas-confection-box'],
  },
];

export function getProduct(id: ProductId): Product {
  const product = productCatalog.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown Goldie Ann product: ${id}`);
  return product;
}
