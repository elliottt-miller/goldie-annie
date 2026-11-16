# Local Framer reference review

Reviewed the 18 projects under `D:\AMD\projects\lagom-naturals\framer` by surveying each project’s export metadata, page titles/descriptions, heading content, page/image/CSS counts, and then visually inspecting the bakery-focused **Sweet Morels** homepage. This directory contains exported Framer sites and component examples rather than a shared component library; copying their generated Framer runtime would add unrelated commerce code and dependencies. The useful output is a set of UI patterns to adapt in this native React storefront.

## Patterns applied to Goldie Ann’s

- **Sweet Morels** (`framer-sweet-morels-clean-page-zkxt`): the closest bakery reference, with a compact brand header, oversized bakery wordmark over a full-bleed food image, a prominent discovery action, oversized editorial introduction, image-led featured cards, a scrolling confectionery ticker, popular products, and a large footer signature. Those layout and motion patterns now directly inform Goldie Ann’s page: the hero carries its own brand wordmark over an image; featured cards browse the menu; a reduced-motion-aware sweets ticker bridges the sections; scroll reveals and small image/arrow hover effects add movement; and the footer closes with a large wordmark. Sweet Morels’ pink palette, donut imagery, claims and text, template mark, cart control, and unrelated Shopify flow were not reused. Goldie Ann’s uses the navy, gold, ivory palette and circular seal visible in the supplied Bakesy screenshots, plus the Bakesy handoff.
- **Product Overview** (`framer-productoverview-export-oplc`): metadata describes a responsive image-led product detail surface with title, price, description, and product options. The local storefront borrows the useful detail hierarchy as a lightweight product dialog: image, item, indexed price, short detail, and a clear Bakesy handoff. It deliberately omits unverified options, ratings, stock, cart, and payment UI.
- **ECOM Prime** (`framer-ecom-template-prime-mirror-d8p3`): a multi-page fashion catalog reference with 39 HTML pages and 205 image files. Its category-based merchandise navigation and clear product/listing separation reinforce the filterable menu and distinct seasonal merchandising. Fashion styling, checkout behavior, and unrelated campaign sections were excluded.
- **Bubbli** (`framer-bubbli-fresh-export-ab57`) and **Happipola** (`framer-beverage-template-build-n4cb`): product-led commerce references with product collections and multiple detail routes. Their useful idea is to make variants/collections easy to scan. Beverage branding, glass effects, and saturated color systems do not fit this bakery direction.
- **Swatch Accordion** (`framer-swatch-accordion-solid-export-0aeg`): a small interaction reference for clearly showing optional selections. No flavor or policy accordion was added yet because the source options and policies need seller confirmation.

## Survey of every local reference project

| Project | What its local export describes | Decision for this storefront |
|---|---|---|
| `framer-autodemo` | Interactive product-tour component for software demos | Not relevant to bakery browsing. |
| `framer-beverage-template-build-n4cb` | Happipola beverage brand, flavor collection, product pages | Use collection clarity only; skip product claims, drink visuals, and effects. |
| `framer-botanica-pixionweb-clean-build-33yi` | Indoor-plant catalog and calm product discovery | General whitespace and editorial pacing are compatible; plants, green palette, and asset set are not. |
| `framer-bubbli-fresh-export-ab57` | Bubbli ecommerce template, product sections and page routes | Product grouping only; not its candy color system or storefront behavior. |
| `framer-cloud-themed-mirror-1tco` | Courso education/course marketing site | Its clear CTA sequencing is a general reference; course outcomes and educator proof do not apply. |
| `framer-defiant-mango-016789-swift-export-epxf` | Sneaks footwear collection and product pages | Its category navigation is a general ecommerce reference; footwear product treatment does not apply. |
| `framer-ecom-template-prime-mirror-d8p3` | Fashion ecommerce template with extensive category/detail pages | Category-led discovery and product-detail structure are relevant; fashion UI and checkout are excluded. |
| `framer-gifted-cake-179308-tidy-copy-n7q6` | Export title/description remain generic (“My Framer Site” / “Made with Framer”); files include mostly Framer editor assets | No production bakery content or reusable storefront components were evident. |
| `framer-helpful-instance-487483-clean-stack-6w0x` | Shelfline AI agency site with 38 HTML pages | Not relevant beyond general page organization; no software marketing sections copied. |
| `framer-hubstore-solid-copy-bwgg` | Membership marketplace for digital assets | Not relevant to a local bakery storefront. |
| `framer-next-page-on-scroll-clean-build-dbl9` | Page-transition/scroll component example | Avoid transitions that delay basic content discovery or complicate reduced-motion behavior. |
| `framer-oma-logo-fill-preloader-swift-copy-a2p2` | Animated logo page loader | Not used; the bakery site should show its content immediately. |
| `framer-powder-clean-copy-cves` | Dark AI/SaaS template with FAQ, testimonials, and content pages | Not relevant; no unverified reviews or SaaS proof sections copied. |
| `framer-productoverview-export-oplc` | Product detail overview with image gallery, price, description, options | Adapted the content order for a local product detail dialog; no cart or live options. |
| `framer-social-icons-solid-export-dyzz` | Social icon set | No social profiles were verified, so no social destinations were added. |
| `framer-swatch-accordion-solid-export-0aeg` | Accordion/swatch interaction example | Useful later for confirmed flavors or FAQs; not needed for current verified content. |
| `framer-sweet-morels-clean-page-zkxt` | Bakery ecommerce template with hero, product collections, motion, and Shopify-oriented flow | Closest visual/IA reference; section rhythm and discovery patterns informed the build, while palette and commerce were intentionally not copied. |
| `shelfline-copy-react` | React/TypeScript version of an AI agency storefront | Not relevant to the bakery’s visual identity or content. |

## Asset and licensing boundary

The Framer directories include template imagery and brand-specific creative from unrelated projects. Those images and marks are not used in Goldie Ann’s site. The adaptation uses the template’s structural, interaction, and animation ideas; it does not import its generated Framer runtime. The storefront’s product photos are AI-restyled studio images based on the owner-supplied examples, except for the cakesicle rendering, which is illustrative because no cakesicle reference was supplied. The small circular wordmark approximates the logo shown in the Bakesy screenshot. Catalog facts shown in the front end come from the supplied screenshots; see [AUDIT.md](./AUDIT.md) for the evidence, unknowns, and review boundary.
