# Goldie Ann’s Sweets & More — storefront audit

## Scope and evidence

Reviewed on November 15–16, 2026. The target is the Bakesy storefront at [shop.bakesy.app/b/goldie-anns-sweets-more](https://shop.bakesy.app/b/goldie-anns-sweets-more). This audit separates directly observed evidence from design recommendations. A fresh direct request on November 16 returned HTTP 200 from Netlify with a 2,348-byte app shell; the static HTML contains only the `#app` mount, a generic “Bakesy” title, and application scripts/styles, not rendered bakery profile or brand metadata. The current client bundle contains the `GetBakeryDetails($slug)` public query, including `storefrontAppearance` colors/image, `premiumTheme` type/color fields, categories, offerings, prices, profile, location, lead time, minimum order, and deposit. A read-only request to `https://api.bakesy.app/graphql` returned HTTP 403 with a Cloudflare challenge, so the seller-specific values could not be retrieved. The rendered browser path did not return a usable storefront snapshot. Search indexing exposed a partial catalog and prices.

This means the audit can reliably assess public product data and the constraints of the storefront platform, but cannot make evidence-backed claims about the original page’s exact colors, typography, page speed, accessibility, responsive rendering, image quality, checkout steps, reviews, or analytics. Those items are marked for owner confirmation rather than guessed.

## Verified business and catalog evidence

- Store name in the requested URL: **Goldie Ann’s Sweets & More**.
- The shop is hosted on Bakesy; the current page is a single-page React app. Bakesy’s public shop profile model supports bio, capabilities and pricing, featured products, categories, location, minimum order, deposit, and lead-time details.
- Indexed product listing includes cakes, cupcakes, cookies, dinner rolls, peach desserts, pumpkin spice roll, sweet potato biscuits, and a Swiss roll.
- Examples of indexed prices: 6-inch cake $25; 9-inch cake $40; 1 dozen cupcakes $22; 1 dozen giant chocolate chip cookies $12; cookie party pack $30; dinner rolls (12) $8; mini upside-down peach cakes (1 dozen) $23; pumpkin spice roll $20; sweet potato biscuits (6 pack) $8; S’mores cake from $35 (6-inch) and $50 (9-inch); tier cake listing displays $0 with a request for more information.
- Indexed product names include a few spelling and wording inconsistencies (for example, “Toped” and “Ganach” in a gluten-free chocolate cake title). Product details and current availability should be checked in the seller’s Bakesy editor before launch.

## Experience evaluation

### Positioning and first impression

The product range communicates a useful mix of celebration baking and familiar comfort sweets. A new visitor needs to understand that range immediately, see a few appetizing examples, and know what the next step is. A focused headline, short description, and a clear browse action create that path in the replacement design. The exact existing logo, palette, and photography could not be retrieved, so the new treatment uses the shop name as the brand anchor and a warm bakery palette as a proposed direction—not as a verified copy of its existing visual identity.

### Information architecture and product discovery

The indexed listing contains many products with different use cases, quantities, and sizing rules. A flat alphabetic or mixed list makes it harder to scan. Grouping into cakes, cupcakes, cookies, seasonal items, and comfort sweets is a clearer discovery model. Showing package quantity, serving-size details where known, and price beside each item reduces ambiguity. The replacement shows a curated static sample and adds category filtering; it does not claim to mirror the seller’s full live catalog.

### Product clarity and merchandising

Some indexed offerings are configurable (cake flavor, icing flavor, assorted cookie combinations), while others specify pack sizes or special designs. These distinctions should be visible before the buyer starts a request. Products with a $0 display or “message for more information” need an explicit custom-quote treatment in the eventual catalog. Prices in the new front end are examples transcribed from indexed public listings; they may change and need owner confirmation.

### Conversion and order handoff

The current storefront is already the seller’s ordering endpoint. A replacement landing page should help the buyer choose before leaving for that endpoint. The front end therefore uses a clear, simple Bakesy handoff; it does not reproduce checkout, collect order data, add a cart, or connect to a live API. The local menu filters and navigation work without a backend.

### Trust, operations, and content

Lead time, order minimum, deposit, pickup/delivery rules, allergens, customization limits, cancellation terms, and contact details can materially affect purchase decisions. They were not available in the evidence retrieved for this audit, so none are invented in the new site. Before a public launch, verify these details with the seller and publish only confirmed information. An actual baker portrait and first-person story should replace the neutral kitchen imagery and general story copy if the owner wants to provide them.

### Accessibility and responsive behavior

The source storefront could not be inspected in a rendered browser, so no claims about its current accessibility or mobile layout are made. The replacement includes semantic landmarks, heading hierarchy, descriptive image alternatives, visible focus states, keyboard-operable filters and navigation, a product dialog with Escape/Tab handling and focus restoration, reduced-motion handling for its ticker and reveal effects, and responsive desktop/mobile layouts. The new front end was reviewed in rendered desktop and mobile browser views.

### Search and technical foundations

The replacement includes a descriptive page title, meta description, mobile viewport, and real HTML text for important content. Structured product data, local business schema, a custom domain, analytics, and search console setup are outside this static front-end pass. They require verified business/contact/location facts and deployment context.

## Strengths to preserve

- A distinctive, memorable shop name.
- A wide assortment beyond cakes, including low-commitment treats and savory-adjacent comfort bakes.
- Public prices and useful quantities are available for many products.
- Existing Bakesy ordering destination can remain the handoff while the presentation improves.

## Highest-priority improvements represented in the new front end

1. Lead with the bakery and what it makes, without unsupported claims about awards, ratings, service area, or availability.
2. Create a cohesive visual direction and make the product photography the main visual signal.
3. Give shoppers a category filter and clearer product/quantity/price summaries.
4. Feature seasonal goods separately from the year-round menu.
5. Explain the order handoff in three simple steps.
6. Keep the interface responsive, keyboard-accessible, and legible.

## New front-end review

Updated November 16, 2026. The replacement is built as a standalone React/Vite site in `D:\AMD\projects\goldie-annie`. It adapts the local Sweet Morels bakery template’s oversized wordmark hero, full-bleed food photo, large editorial typography, image-led collection cards, moving confectionery ticker, entrance reveals, hover motion, and oversized footer signature to Goldie Ann’s proposed cocoa/cream/berry visual direction. It has a responsive landing page, static category filters, collection-to-menu navigation, product detail dialogs, a seasonal feature, menu/about section, ordering guide, and footer. Product detail dialogs are keyboard-dismissible, contain focus, restore the trigger focus, and link out to Bakesy for current product information. The site does not have a cart, checkout, API connection, or seller operations integration.

Responsive review used installed Chrome through the DevTools protocol because the Playwright CLI wrapper did not return a usable session. At viewport widths of **320, 360, 375, 390, 430, 600, 650, 651, 700, 768, 820, 821, 900, 980, 981, 1024, 1280, 1440, and 1920 px**, the document had no horizontal overflow and the hero title stayed within the viewport. The compact navigation was visible through 820 px; the desktop navigation displayed at 821 px and above. Collection cards correctly selected the Seasonal filter (two indexed products); the Cakes filter returned two products; the detail dialog received focus, Tab moved to the Bakesy link, Escape closed it, and focus returned to the card. The mobile menu opened and closed after following an anchor. All nine rendered image elements loaded in the final browser pass. The motion preference check disabled the hero entrance animation and marquee when reduced motion was requested.

### Visual comparison notes

- The final hero follows the Sweet Morels composition with Goldie Ann’s wordmark typography over a full-bleed cake image, high-contrast cocoa overlay, floral mark, and one prominent menu CTA. The small ticker, three featured collection cards, product grid, seasonal editorial pairing, order steps, and display-scale footer personalize other useful reference patterns.
- Motion is implemented in the native storefront rather than importing the template’s generated Framer/GSAP runtime. The marquee pauses on hover; section content and the hero reveal with restrained transitions; image cards have small hover movement; reduced-motion preference removes these effects.
- The mobile layout keeps the full-bleed hero, reduces display type and padding, moves navigation into a menu button, presents collection cards in two columns (one narrow-phone column), and keeps menu filters horizontally scrollable. The page has no horizontal document overflow across the checked widths.
- The visual direction remains a proposal, because the live rendered logo and theme could not be retrieved. The generated floral mark, cocoa/cream/berry palette, and type choices should be replaced with the seller’s real logo and specifications if those differ. `design-concept.png` is an earlier split-hero exploration; it is not a representation of the current template-inspired implementation.
- Brand identity remains an unverified design proposal. The name is preserved, but the generated floral mark, cream/butter/cocoa/berry palette, and type choices should be updated to the seller’s real logo and brand specifications if those differ.
- The Sweet Morels reference itself is an exported template and contains unrelated branding, assets, claims, and commerce code. Only adaptable layout and interaction ideas were carried into the Goldie Ann’s front end.

The local Framer reference collection is surveyed in [DESIGN_REFERENCES.md](./DESIGN_REFERENCES.md). The closest visual/IA reference was the Sweet Morels bakery export; its template styling and commerce integration were not copied. Draft food images in the current build are placeholders and need replacement with Goldie Ann’s approved product imagery before launch.

The Vite production build completed successfully. This check does not replace final verification against the seller’s approved brand assets, corrected catalog/policies, or deployed hosting environment.

## Launch verification still needed

- Confirm the seller’s actual logo, existing brand colors and fonts, and permission to use the supplied product images.
- Verify the current product list, product spellings, prices, pack sizes, flavor options, and whether items are active or seasonal.
- Obtain approved biography/story, baker photo, and correct business location/contact links.
- Confirm lead times, minimum order, deposit, pickup/delivery, cancellation, allergy, and custom-order policies.
- Inspect the live Bakesy shop at desktop and mobile sizes and verify the final Bakesy handoff URL/category paths.
- Select hosting/domain and complete deployment, metadata, analytics, and search-engine configuration.

## Limits

This is a professional design and content audit based on the page endpoint, app bundle schema, and a partial search-index snapshot. It is not a pixel-level audit of the live rendered site. The replacement front end remains a standalone local project; no live store data, checkout, or seller operations were changed.
