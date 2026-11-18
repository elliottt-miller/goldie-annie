/** Reveal template sections and route content as they enter the viewport. */
export function initReveal(): () => void {
  const targets = new Set<Element>();

  if (typeof IntersectionObserver === "undefined") {
    document.querySelectorAll("[data-reveal]").forEach((element) => element.setAttribute("data-revealed", ""));
    return () => undefined;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) reveal(entry.target);
    }
  }, { threshold: 0, rootMargin: "0px 0px 10% 0px" });

  const reveal = (element: Element) => {
    element.setAttribute("data-revealed", "");
    element.removeAttribute("data-reveal-pending");
    observer.unobserve(element);
    targets.delete(element);
  };

  // Check the initial viewport and newly mounted route content once. The
  // IntersectionObserver handles ongoing scroll entry without layout reads.
  const revealVisibleTargets = () => {
    const revealBoundary = window.innerHeight * 0.92;
    for (const target of targets) {
      const bounds = target.getBoundingClientRect();
      if (bounds.top <= revealBoundary && bounds.bottom >= 0) reveal(target);
    }
  };

  document.documentElement.classList.add("has-scroll-reveal");

  const observeTarget = (element: Element) => {
    if (targets.has(element) || element.hasAttribute("data-revealed")) return;
    targets.add(element);
    element.setAttribute("data-reveal-pending", "");
    observer.observe(element);
  };

  const observeTree = (node: Node) => {
    if (!(node instanceof Element)) return;
    if (node.matches("[data-reveal]")) observeTarget(node);
    node.querySelectorAll("[data-reveal]").forEach(observeTarget);
  };

  document.querySelectorAll("[data-reveal]").forEach(observeTarget);
  window.addEventListener("pageshow", revealVisibleTargets);
  revealVisibleTargets();

  const mutations = new MutationObserver((records) => {
    for (const record of records) record.addedNodes.forEach(observeTree);
    revealVisibleTargets();
  });
  mutations.observe(document.body, { childList: true, subtree: true });

  return () => {
    mutations.disconnect();
    observer.disconnect();
    window.removeEventListener("pageshow", revealVisibleTargets);
    targets.forEach((element) => element.removeAttribute("data-reveal-pending"));
    targets.clear();
    document.documentElement.classList.remove("has-scroll-reveal");
  };
}
