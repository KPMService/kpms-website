/* =========================================================
   KOLER — SITE INTERACTIONS
   English and Turkish are separate HTML pages.
   /index.html     → English
   /tr/index.html  → Turkish
   There is NO automatic translation in this file.

   Not: Bu dosya artık industrial-theme.css'i enjekte etmiyor —
   o dosya styles.css ile çakışıp renkleri bozuyordu. Paket ve
   lojistik bölümlerinin stili de artık doğrudan styles.css'te,
   burada DOM'u zorlayan ekstra kod yok.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const isTurkish = window.location.pathname.includes('/tr/');

    /* Language switcher — tek yerden üretiliyor, iki dilde de
       aynı class isimlerini (styles.css ile eşleşen) kullanıyor. */
    const header = document.querySelector('.site-nav');
    if (header && !header.querySelector('.language-switcher')) {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';

        const englishPath = isTurkish ? '../index.html' : 'index.html';
        const turkishPath = isTurkish ? './' : 'tr/index.html';

        switcher.innerHTML = `
            <a href="${englishPath}" class="lang-btn ${!isTurkish ? 'active' : ''}">EN</a>
            <a href="${turkishPath}" class="lang-btn ${isTurkish ? 'active' : ''}">TR</a>
        `;

        const menu = header.querySelector('.menu');
        if (menu) {
            header.insertBefore(switcher, menu);
        } else {
            header.appendChild(switcher);
        }
    }

    /* Scroll progress */
    const progress = document.querySelector('.progress');
    const updateProgress = () => {
        if (!progress) return;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
        progress.style.width = `${percentage}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* Tek, sakin giriş hareketi — kart bazlı gecikmeli "cascade" yok. */
    const revealItems = document.querySelectorAll(
        '.journey, .risk-grid, .quality-cards, .industry-grid, .dashboard, .reports, .network-copy'
    );
    if ('IntersectionObserver' in window && revealItems.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('visible'));
    }

    /* Experience counter — gerçek rakam olduğu için tek, anlamlı hareket */
    const counter = document.querySelector('.big-number strong');
    if (counter && 'IntersectionObserver' in window) {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''), 10);
        if (!Number.isNaN(target)) {
            const counterObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    let startTime = null;
                    const animate = time => {
                        if (!startTime) startTime = time;
                        const p = Math.min((time - startTime) / 900, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        counter.textContent = `${Math.floor(target * eased)}+`;
                        if (p < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    counterObserver.unobserve(entry.target);
                });
            }, { threshold: 0.7 });
            counterObserver.observe(counter);
        }
    }

    /* Mobile menu */
    const menuButton = document.querySelector('.menu');
    const nav = document.querySelector('.site-nav nav');
    if (menuButton && nav) {
        menuButton.addEventListener('click', () => nav.classList.toggle('open'));
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('open'));
        });
    }

    /* Smooth anchors */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
