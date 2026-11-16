# Goldie Ann’s Sweets & More — storefront audit and content record

## Evidence and scope

This review covers the public Bakesy page named in the request and the eight product/gallery screenshots supplied by the owner. The live Bakesy shop could not be reliably rendered in the audit environment: its client app reported a failed fetch and its public GraphQL request was blocked by browser/CORS and Cloudflare challenge behavior. The screenshots are therefore the source of truth for seller-specific products, prices, policies, and visible brand treatment in this build. They do not establish that a seasonal offer remains available today.

The earlier draft used a search-index listing for a different bakery (cakes, cupcakes, cookies, peach/pumpkin bakes, and biscuits). That material was not attributable to Goldie Ann’s and has been removed from the storefront. No live catalog scrape or Bakesy order integration is claimed.

## Seller and catalog details visible in the supplied screenshots

### Brand and shop description

- Name: **Goldie Ann’s Sweets & More**.
- Visual identity: a round gold seal with a script “Goldie Ann” wordmark and “sweets & more”; a deep navy-purple header; gold accents; white content panels; serif display headings and gold brush underlines.
- Seller description: “Welcome to Goldie Ann’s sweets & more. I specialize in creating delicious, high quality custom decorated cake pops, cakesicles, dipped Oreos, pretzels and rice krispy treats. I offer packages and will customize upon request.”
- Visible categories: **Cake Pops** and **Treats**.

### Cake pops

The flavors shown are Lemon Blueberry Pops, Butterfinger Bliss, Apple Pie on a Stick, Red Velvet Delight, Espresso Caramel Pops, and Funfetti Pops. The screenshots explicitly show **Apple Pie on a Stick · 1 Doz — $32** and **Lemon Blueberry · 1 Doz — $32**. They do not show the package size or price for the other four flavors, so those entries direct shoppers to Bakesy instead of guessing.

### Other treats

| Screenshot listing | Displayed price | Evidence limits |
| --- | ---: | --- |
| Rice Krispy Treats, chocolate dipped, drizzled and topped with sprinkles | $56 | Package quantity is not visible |
| Chocolate Dipped & Drizzled Oreos | $32 | Package quantity is not visible |
| Homemade-caramel-wrapped pretzel rods | $38 | Add-ons/options appear in the menu |
| Chocolate-dipped and drizzled pretzel rods | $32 | Add-ons/options appear in the menu |
| Custom cakesicles | Not visible | Named in the seller description, no price shown |

Pretzel options visible in the screenshots include pecans, no sprinkles, blueberry flavor, mint flavor, and caramel. The screenshots show homemade caramel and pecans as **$0.25 extra per pretzel rod**. They do not establish whether every option applies to both pretzel listings.

### Holiday presale

The screenshots describe three themes at **$45 per box**. Each box includes four cake pops, four Oreos, and four chocolate-dipped, drizzled, decorated pretzels. Two names are visible: **The Mean Ones Sweet Box** and **Blue Christmas Confection Box**. The third theme name is not present in the supplied material. Current dates and availability must be checked on Bakesy.

### Order and pickup policies

- A **50% non-refundable deposit** is required when an order is placed.
- Orders are ready during the selected pickup slot between **6 PM and 9 PM**.
- Customers who are running late should message through the app.

These terms are presented as transcribed from the supplied screenshots. They should be rechecked with the seller before any policy updates.

## Experience review of the supplied mobile screenshots

The original shop gives useful menu and policy information, but shoppers must scroll through a long, narrow page with several accordion-like sections. Product cards are two columns on the provided phone screenshots, leaving substantial unused space when a category has only one item. Product titles and flavor labels are sometimes embedded in the source photos, which makes images inconsistent and can make the actual treat harder to see. The small circular logo is a strong and recognizable brand cue; the navy and gold contrast, serif section headings, and handmade brush accents are also worth retaining.

The replacement carries that identity into a wider, editorial bakery storefront: an image-led hero, clear discovery paths for cake pops/treats/presale, a filterable catalog, a dedicated holiday feature, visible order policies, and a direct Bakesy handoff. It retains the source brand’s navy, gold and ivory instead of the unrelated cocoa/berry palette from the mistaken first draft. The interface is mobile-first and retains responsive navigation, image cards, reduced-motion support, focus styling, and accessible product-detail dialogs. It is presentation-only: no cart, checkout, live catalog API, or payment/order workflow is implemented.

## Product photo treatment

Professional studio-style product images were generated from the supplied product photos for cake-pop flavors, Oreos, pretzels, Rice Krispy treats, and the two named holiday boxes. They retain the broad visible treat/product cues while improving lighting, framing, and visual consistency; they are AI-restyled marketing imagery and should not be treated as proof of the exact decoration on a future order. No cakesicle reference photo was supplied, so the cakesicle image is an illustrative generated rendering. All final images are locally hosted WebP files. The supplied original photos and generated source masters remain outside the production bundle.

## What the current storefront represents

- Product names, the visible prices, the two one-dozen cake-pop quantities, the holiday-box contents and prices, visible pretzel options/add-ons, and the order/pickup policies are transcribed from the supplied screenshots.
- Prices or package sizes that are not visible are identified as needing confirmation in Bakesy; availability is not promised.
- Products link to the actual Bakesy shop for live options and ordering.
- The static interface does not read or change seller data and does not make checkout or payment claims.

## Remaining owner checks

1. Confirm all listed items are still offered, the third holiday theme, seasonal dates, prices, pack quantities, and whether the two $32 pretzel options and $0.25 add-ons are transcribed correctly.
2. Confirm the exact brand logo file and any preferred typeface; this front end approximates the round badge from the screenshot.
3. Review generated photos against actual prepared items. Replace AI imagery with owner-approved photographs when available, particularly for cakesicles and limited-edition holiday designs.
4. Confirm final wording/validity of the deposit and pickup policies before treating this site as a live source of operational terms.

## Technical review boundaries

The Bakesy app itself could not be tested for checkout, accessibility, page performance, or rendering behavior in this environment. Those are not presented as findings about the source store. The rebuilt site is a standalone React/Vite front end intended for GitHub Pages; the final review checks its responsive layouts, static assets, in-page interactions and outbound Bakesy links.
