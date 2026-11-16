const SHOP = "https://shop.bakesy.app/b/goldie-anns-sweets-more";
const offerings = [
  { name: "Apple Pie on a Stick", format: "Cake pops · 1 dozen", price: "$32.00", group: "Cake pops", image: "products/apple-pie-on-a-stick-transparent.png", detail: "Apple Pie on a Stick cake pops, listed as one dozen." },
  { name: "Lemon Blueberry", format: "Cake pops · 1 dozen", price: "$32.00", group: "Cake pops", image: "products/lemon-blueberry-pops-transparent.png", detail: "Lemon Blueberry cake pops, listed as one dozen." },
  { name: "The Mean Ones Sweet Box", format: "Holiday presale", price: "$45.00", group: "Presale", image: "products/mean-ones-sweet-box-transparent.png", detail: "Four cake pops, four Oreos, and four chocolate dipped, drizzled & decorated pretzels." },
  { name: "Blue Christmas Confection Box", format: "Holiday presale", price: "$45.00", group: "Presale", image: "products/blue-christmas-confection-box-transparent.png", detail: "Four cake pops, four Oreos, and four chocolate dipped, drizzled & decorated pretzels." },
  { name: "Rice Krispy Treats", format: "Dipped, drizzled & topped with sprinkles", price: "$56.00", group: "Treats", image: "products/rice-krispy-treats-transparent.png", detail: "Rice Krispy treats dipped in chocolate, drizzled and topped with sprinkles." },
  { name: "Chocolate Dipped & Drizzled Oreos", format: "Chocolate dipped, drizzled & decorated", price: "$32.00", group: "Treats", image: "products/dipped-oreos-transparent.png", detail: "Chocolate dipped, drizzled and decorated Oreos." },
  { name: "Homemade Caramel Pretzel Rods", format: "Caramel wrapped, dipped & decorated", price: "$38.00", group: "Treats", image: "products/homemade-caramel-pretzel-rods-transparent.png", detail: "Pretzel rods wrapped with homemade caramel, dipped in chocolate, drizzled and topped with sprinkles and/or pecans." },
  { name: "Chocolate Dipped Pretzel Rods", format: "Dipped, drizzled & decorated", price: "$32.00", group: "Treats", image: "products/chocolate-dipped-pretzel-rods-transparent.png", detail: "Pretzel rods dipped in chocolate, drizzled and decorated, with or without homemade caramel." },
];
const cakeFlavors = ["Lemon Blueberry Pops", "Butterfinger Bliss", "Apple Pie on a Stick", "Red Velvet Delight", "Espresso Caramel Pops", "Funfetti Pops"];

const textReplacements = [
  ["Sweet Morels", "Goldie Ann’s"],
  ["SWEET MORELS", "GOLDIE ANN’S SWEETS & MORE"],
  ["Soft bites and comforting sweetness made for slow mornings and sweeter moments.", "Custom decorated cake pops, cakesicles, dipped Oreos, pretzels and Rice Krispy treats. Packages and customizations are available upon request."],
  ["Explore Sweetness", "Explore the offerings"],
  ["We have extensive experience across a range of commercial sectors. We offer a complete end-to-end service from brand strategy to interior design and production.", "Goldie Ann’s specializes in creating delicious, high quality custom decorated sweets. Choose a favorite or ask about a package customized for your celebration."],
  ["FRESHLY GLAZED DONUTS MADE DAILY FOR EVERY SWEET CRAVING, SOFT BITES TO BRIGHTEN DAYS", "CUSTOM DECORATED CAKE POPS, CAKESICLES, DIPPED OREOS, PRETZELS & RICE KRISPY TREATS · PACKAGES CUSTOMIZED UPON REQUEST"],
  ["Follow the Sweet Perks", "A little more sweetness"],
  ["Follow us for sweet updates, exclusive treats, cozy surprises, seasonal flavors, and special little rewards made for you.", "Explore the menu and message through Bakesy for current availability and order details."],
  ["Hello@sweetmorels.com", "Visit the Bakesy shop"],
  ["© Sweet Morels™ All rights reserved 2026", `© ${new Date().getFullYear()} Goldie Ann’s Sweets & More`],
  ["DESIGN & CREATED BY MINO", "GOLDIE ANN’S SWEETS & MORE"],
  ["GET TEMPLATE", "ORDER ON BAKESY"],
  ["TERM OF SERVICES", "ORDERING DETAILS"],
  ["Ocala, FL 34471, USA", "Custom decorated treats & more"],
  ["+1 234 567 890", "Order through Bakesy"],
];

function replaceVisibleText() {
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walk.nextNode())) {
    if (!node.nodeValue.trim() || node.parentElement.closest("script,style,noscript")) continue;
    let value = node.nodeValue;
    for (const [from, to] of textReplacements) value = value.replaceAll(from, to);
    if (value !== node.nodeValue) node.nodeValue = value;
  }
  document.title = document.body.classList.contains("goldie-shop-page") ? "Shop the Menu | Goldie Ann’s Sweets & More" : "Goldie Ann’s Sweets & More | Custom Decorated Treats";
}

function normalizeGoldieImagePaths() {
  const prefix = location.pathname.includes("/subpages/") ? "../products/" : "products/";
  document.querySelectorAll("img").forEach((image) => {
    const raw = image.getAttribute("src") || "";
    const match = raw.match(/(?:^|\/)products\/([^/?#]+)/);
    if (!match) return;
    const corrected = `${prefix}${match[1]}`;
    if (raw !== corrected) image.setAttribute("src", corrected);
    if (image.hasAttribute("srcset")) image.removeAttribute("srcset");
  });
}

function rewireNav() {
  const onShopPage = document.body.classList.contains("goldie-shop-page");
  document.querySelectorAll('a[data-framer-name="Logo"]').forEach((logo) => {
    logo.href = onShopPage ? "index.html#goldie-home" : "#goldie-home";
    logo.setAttribute("aria-label", "Goldie Ann’s Sweets & More home");
    if (!logo.querySelector(".goldie-logo-image")) logo.innerHTML = '<img class="goldie-logo-image" src="goldie-ann-logo.svg" alt="Goldie Ann’s Sweets & More">';
  });
  document.querySelectorAll("nav a, footer a").forEach((link) => {
    const label = link.textContent.trim().toLowerCase().replace(/[\s,]+$/, "");
    if (label === "shop") {
      link.href = onShopPage ? "#goldie-offerings" : "shop.html";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      if (link.closest("nav")) link.setAttribute("aria-label", "Shop the Goldie Ann’s menu");
    } else if (/^(order|order on bakesy)$/.test(label) || label.includes("visit the bakesy shop")) {
      link.href = SHOP;
      link.target = "_blank";
      link.rel = "noreferrer";
      if (link.closest("nav")) link.setAttribute("aria-label", "Order through the Goldie Ann’s Bakesy shop");
    } else if (label.includes("about")) link.href = onShopPage ? "index.html#goldie-story" : "#goldie-story";
    else if (label.includes("contact") || label.includes("ordering details")) link.href = onShopPage ? "index.html#goldie-ordering" : "#goldie-ordering";
    else if (label.includes("goldie ann’s sweets")) link.href = "#goldie-home";
  });
  document.querySelectorAll('a[href*="sweet-morels"],a[href*="framer-commerce"],a[href*="/contact"],a[href*="/about.html"]').forEach((link) => {
    if (link.textContent.toLowerCase().trim().startsWith("shop")) {
      link.href = onShopPage ? "#goldie-offerings" : "shop.html"; link.removeAttribute("target");
    } else if (link.href.includes("commerce")) {
      link.href = onShopPage ? "#goldie-offerings" : "shop.html"; link.removeAttribute("target");
    } else if (link.href.includes("contact")) link.href = onShopPage ? "index.html#goldie-ordering" : "#goldie-ordering";
    else if (link.href.includes("about.html")) link.href = onShopPage ? "index.html#goldie-story" : "#goldie-story";
  });
  document.querySelectorAll("nav button").forEach((button) => {
    if (button.textContent.toLowerCase().includes("cart")) button.remove();
  });
  document.querySelectorAll('a[href*="instagram.com"],a[href*="x.com"],a[href*="google.com/maps"],a[href^="tel:"]').forEach((link) => {
    const label = link.textContent.toLowerCase();
    if (label.includes("instagram") || label.includes("twitter") || label.includes("x/twitter")) link.remove();
    else { link.href = SHOP; link.target = "_blank"; link.rel = "noreferrer"; }
  });
  document.querySelectorAll('a[href*="framer.com/@"],a[href*="framer.commerce"]').forEach((link) => { link.href = "#goldie-home"; });
  document.querySelectorAll('a[href*="framercommerce.com"]').forEach((badge) => badge.remove());
}

function interceptTemplateNavigation() {
  if (document.documentElement.dataset.goldieLinks) return;
  document.documentElement.dataset.goldieLinks = "ready";
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const label = link.textContent.trim().toLowerCase().replace(/[\s,]+$/, "");
    const externalShop = href.includes("shop.bakesy.app") || /^(order|order on bakesy)$/.test(label) || label.includes("visit the bakesy shop");
    const localShopRoute = href.endsWith("shop.html") || label === "shop" && !document.body.classList.contains("goldie-shop-page") && !href.startsWith("#");
    const internalTarget = href.startsWith("#goldie-") ? href.slice(1) : label === "shop" && document.body.classList.contains("goldie-shop-page") ? "goldie-offerings" : null;
    if (!externalShop && !localShopRoute && !internalTarget && !href.includes("subpages/") && !href.includes("framer-commerce")) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (externalShop) {
      window.open(SHOP, "_blank", "noopener,noreferrer");
      return;
    }
    if (localShopRoute) {
      window.location.assign("shop.html");
      return;
    }
    let targetId = internalTarget;
    if (!targetId) targetId = /about/.test(href) || label.includes("about") ? "goldie-story" : /contact/.test(href) || label.includes("contact") ? "goldie-ordering" : "goldie-offerings";
    const target = document.getElementById(targetId);
    if (target) {
      history.replaceState(null, "", `#${targetId}`);
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
    if (matchMedia("(max-width: 809px)").matches && link.closest("nav")) {
      const navToggle = document.querySelector("nav button");
      if (navToggle) navToggle.click();
    }
  }, true);
}

function enhanceTemplateCopy() {
  const intro = document.querySelector('[data-framer-name="Section: Introduction"]');
  const introHeading = intro?.querySelector("h1,h2");
  if (introHeading) introHeading.innerHTML = "Made for<br class=\"framer-text\">sweet moments.";

  const about = document.querySelector('[data-framer-name="Section: About"]');
  if (about) {
    about.id = "goldie-story";
    const p = [...about.querySelectorAll("p")].find((el) => el.textContent.includes("commercial sectors"));
    if (p) p.textContent = "Goldie Ann’s specializes in delicious, high quality custom decorated cake pops, cakesicles, dipped Oreos, pretzels and Rice Krispy treats. Packages are available and can be customized upon request.";
    about.querySelectorAll("a").forEach((a) => { a.href = "shop.html"; a.textContent = "EXPLORE THE OFFERINGS"; });
  }

  const hero = document.querySelector('[data-framer-name="Section: Hero"]');
  if (hero) hero.id = "goldie-home";
  hero?.querySelectorAll("a").forEach((a) => { a.href = "shop.html"; a.removeAttribute("target"); });
  const heroCopy = hero?.querySelectorAll("p");
  heroCopy?.forEach((p) => {
    if (p.textContent.toLowerCase().includes("soft bites")) p.textContent = "Custom decorated sweets for the moments worth sharing.";
  });

  const featured = document.querySelector('[data-framer-name="Section: Key Featured"]');
  if (featured) {
    const heading = featured.querySelector("h2");
    if (heading) heading.textContent = "Handcrafted for sweet moments";
    const phrases = ["Custom packages", "Cake pops & cakesicles", "Dipped treats", "Made personal"];
    const descriptions = [
      "Packages are available and can be customized upon request.",
      "Custom decorated cake pops and cakesicles are among Goldie Ann’s offerings.",
      "Choose dipped Oreos, chocolate-dipped pretzels or Rice Krispy treats.",
      "Ask through Bakesy about current offerings, options and pickup details.",
    ];
    const headings = [...featured.querySelectorAll("h3")];
    const paragraphs = [...featured.querySelectorAll("p")].filter((p) => p.textContent.trim().length > 65);
    headings.forEach((h, i) => { h.textContent = phrases[i % phrases.length]; });
    paragraphs.forEach((p, i) => { p.textContent = descriptions[i % descriptions.length]; });
  }

  const quote = document.querySelector('[data-framer-name="Section: Quote"]');
  if (quote) quote.setAttribute("aria-label", "Goldie Ann’s menu: custom cake pops, cakesicles, dipped Oreos, pretzels and Rice Krispy treats.");
  const ticker = document.querySelector('[data-framer-name="Section: Ticker"]');
  if (ticker) ticker.setAttribute("aria-label", "Goldie Ann’s Sweets & More");

  const popular = document.querySelector('[data-framer-name="Section: Popular Products"]');
  if (popular) {
    popular.id = "original-template-popular-products";
    popular.setAttribute("aria-hidden", "true");
  }
  const cta = document.querySelector('[data-framer-name="Section: CTA"]');
  if (cta) {
    const title = cta.querySelector("h2");
    if (title) title.textContent = "Let’s make it sweet";
    cta.querySelectorAll("a").forEach((a) => { a.href = SHOP; a.target = "_blank"; a.rel = "noreferrer"; });
  }
}

function createMenu() {
  if (document.getElementById("goldie-offerings")) return;
  const cta = document.body.classList.contains("goldie-shop-page") ? document.getElementById("goldie-shop-mount") : document.querySelector('[data-framer-name="Section: CTA"]');
  if (!cta?.parentElement) return;

  const menu = document.createElement("section");
  menu.className = "goldie-section goldie-menu";
  menu.id = "goldie-offerings";
  menu.innerHTML = `
    <div class="goldie-menu-head"><span class="goldie-eyebrow">The Goldie Ann’s menu</span><h2>Little treats.<br><em>Big celebrations.</em></h2><p>Real offerings and prices from the Goldie Ann’s shop. Choose a category or open a sweet for its details.</p></div>
    <div class="goldie-flavors"><div><span class="goldie-eyebrow">Cake pop flavors</span><h3>Six flavors to love.</h3></div><div class="goldie-flavor-chips">${cakeFlavors.map((flavor) => `<span>${flavor}</span>`).join("")}</div><p class="goldie-proof-note">These are the named cake pop flavors shown on the original shop. Separate package pricing is visible for Apple Pie on a Stick and Lemon Blueberry only.</p></div>
    <div class="goldie-menu-controls"><div class="goldie-filters" role="group" aria-label="Filter menu offerings">${["All offerings", "Cake pops", "Treats", "Presale"].map((label, i) => `<button type="button" data-filter="${label}" aria-pressed="${i === 0}">${label}</button>`).join("")}</div><span class="goldie-menu-count" aria-live="polite"></span></div>
    <div class="goldie-product-grid" aria-live="polite"></div>
    <div class="goldie-presale-note"><span>Holiday presale · as shown in the shop reference</span><p>Each box is $45.00 and contains four cake pops, four Oreos, and four chocolate dipped, drizzled & decorated pretzels. The announcement names three themes; only two names are visible here. Check Bakesy for current availability.</p></div>
    <div class="goldie-options"><button type="button" aria-expanded="false"><span><b>Pretzel choices & add-ons</b><small>Options displayed on the original shop</small></span><span class="goldie-chevron">⌄</span></button><div class="goldie-options-body" hidden><p>Options shown: with pecans, no sprinkles, blueberry flavor, mint flavor, and with caramel.</p><p>Homemade caramel: add $0.25 per pretzel rod. Pecans: add $0.25 per pretzel rod.</p></div></div>
    <div class="goldie-policy-grid" id="goldie-ordering"><article><span>01 / PAYMENT</span><h3>50% deposit</h3><p>A 50% non-refundable deposit is required when an order is placed.</p></article><article><span>02 / PICKUP</span><h3>6 PM–9 PM</h3><p>Your order will be ready at your selected time slot between 6 PM and 9 PM.</p></article><article><span>03 / RUNNING LATE?</span><h3>Send a message</h3><p>If you are running late, please send a message through the app to let Goldie Ann know.</p></article></div>
    <div class="goldie-menu-foot"><span>Packages and customizations are available upon request.</span><a href="${SHOP}" target="_blank" rel="noreferrer">Visit the Bakesy shop <b>↗</b></a></div>`;
  cta.parentElement.insertBefore(menu, cta);

  const grid = menu.querySelector(".goldie-product-grid");
  const count = menu.querySelector(".goldie-menu-count");
  let currentFilter = "All offerings";
  const render = () => {
    const selected = offerings.filter((item) => currentFilter === "All offerings" || item.group === currentFilter);
    count.textContent = `${selected.length} ${selected.length === 1 ? "offering" : "offerings"}`;
    grid.innerHTML = selected.map((item, i) => `<article class="goldie-product" style="--card-order:${i}"><button class="goldie-product-image" type="button" data-product="${offerings.indexOf(item)}" aria-label="View details for ${item.name}"><img src="${item.image}" alt="" loading="lazy"><span class="goldie-product-count">0${offerings.indexOf(item) + 1}</span><span class="goldie-product-arrow">↗</span></button><div class="goldie-product-copy"><span>${item.group}</span><h3>${item.name}</h3><p>${item.format}</p><div><strong>${item.price}</strong><button type="button" data-product="${offerings.indexOf(item)}">View details <b>↗</b></button></div></div></article>`).join("");
  };
  render();
  menu.querySelectorAll(".goldie-filters button").forEach((button) => button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    menu.querySelectorAll(".goldie-filters button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    render();
  }));
  menu.querySelector(".goldie-options > button").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    menu.querySelector(".goldie-options-body").hidden = expanded;
  });
  grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-product]");
    if (trigger) showDetail(offerings[Number(trigger.dataset.product)]);
  });
}

function showDetail(item) {
  document.querySelector(".goldie-detail-backdrop")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "goldie-detail-backdrop";
  overlay.innerHTML = `<section class="goldie-detail" role="dialog" aria-modal="true" aria-labelledby="goldie-detail-title"><button class="goldie-detail-close" aria-label="Close product details">×</button><img src="${item.image}" alt=""><div><span class="goldie-eyebrow">${item.group} · Goldie Ann’s Sweets & More</span><h2 id="goldie-detail-title">${item.name}</h2><strong>${item.price}</strong><p>${item.detail}</p><p class="goldie-detail-note">For current availability, customizations and order details, visit the original Bakesy shop.</p><a class="goldie-detail-order" href="${SHOP}" target="_blank" rel="noreferrer">View the Bakesy shop ↗</a></div></section>`;
  document.body.append(overlay);
  const close = () => overlay.remove();
  overlay.querySelector(".goldie-detail-close").focus();
  overlay.addEventListener("click", (event) => { if (event.target === overlay || event.target.closest(".goldie-detail-close")) close(); });
  overlay.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  overlay.querySelector(".goldie-detail").addEventListener("keydown", (event) => { if (event.key === "Tab") { event.preventDefault(); overlay.querySelector(".goldie-detail-close").focus(); } });
}

function init() {
  replaceVisibleText();
  normalizeGoldieImagePaths();
  enhanceTemplateCopy();
  rewireNav();
  interceptTemplateNavigation();
  createMenu();
  if (!document.documentElement.dataset.goldieNavObserver) {
    document.documentElement.dataset.goldieNavObserver = "ready";
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      setTimeout(() => { queued = false; rewireNav(); normalizeGoldieImagePaths(); }, 120);
    });
    observer.observe(document.querySelector("#main") || document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["src", "srcset"] });
  }
  if (!document.getElementById("goldie-scroll-progress")) {
    const progress = document.createElement("div"); progress.id = "goldie-scroll-progress"; document.body.append(progress);
    addEventListener("scroll", () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; }, { passive: true });
  }
}

if (document.readyState === "complete") setTimeout(init, 1500);
else addEventListener("load", () => setTimeout(init, 1500));
setTimeout(init, 3500);
