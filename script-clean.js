// KOLER — site interactions only.
// Language switching is handled by separate HTML pages.
// /index.html = English
// /tr/index.html = Turkish
// No automatic translation is used here.

document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress");
  const updateProgress = () => {
    if (!progress) return;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
    progress.style.width = `${percentage}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector(".site-nav nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));
  }

  const revealItems = document.querySelectorAll(".journey article, .risk-grid > div, .quality-chain > div, .quality-cards > div, .industry-grid article, .dashboard, .reports, .network-copy");
  if (revealItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
