/* =========================================================
   KOLER — SITE INTERACTIONS
   English and Turkish are separate HTML pages.
   /index.html     → English
   /tr/index.html  → Turkish
   There is NO automatic translation in this file.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    /* Load the shared cinematic industrial visual theme. */
    if (!document.querySelector('link[data-koler-theme]')) {
        const theme = document.createElement('link');
        theme.rel = 'stylesheet';
        theme.href = window.location.pathname.includes('/tr/')
            ? '../industrial-theme.css'
            : 'industrial-theme.css';
        theme.dataset.kolerTheme = 'true';
        document.head.appendChild(theme);
    }

    /* Fixed local image set — no external image URLs. */
    const imageStyle = document.createElement('style');
    imageStyle.dataset.kolerImages = 'true';
    imageStyle.textContent = `
        .photo.p1 { background-image: url("${window.location.pathname.includes('/tr/') ? '../' : ''}images/01-engineering-support.jpg") !important; }
        .photo.p2 { background-image: url("${window.location.pathname.includes('/tr/') ? '../' : ''}images/02-manufacturer-selection.jpg") !important; }
        .photo.p3 { background-image: url("${window.location.pathname.includes('/tr/') ? '../' : ''}images/03-production-control.jpg") !important; }
        .photo.p4 { background-image: url("${window.location.pathname.includes('/tr/') ? '../' : ''}images/04-quality-shipment.jpg") !important; }
        .network-photo, .map { background-image: url("${window.location.pathname.includes('/tr/') ? '../' : ''}images/05-global-world-map.jpg") !important; }
        .packing-image { background-image: url("${window.location.pathname.includes('/tr/') ? '../' : ''}images/06-container-ship.jpg") !important; }

        /* Industries: keep cards clean until dedicated sector photos are added. */
        .industry-grid article {
            background-image: none !important;
            background-color: #1a2225 !important;
        }

        /* Logistics destination labels: readable on the light section. */
        .logistics-list div {
            color: #101517 !important;
            background: #edf1ef !important;
            border-color: #cbd3d1 !important;
        }

        /* Packaging heading: keep the first phrase together. */
        .pack h2 .pack-line {
            white-space: nowrap;
            color: inherit;
        }

        /* Packaging image stays below the text. */
        .pack-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
        }
        .pack-copy { width: 100% !important; }
        .packing-image { order: 2; }

        @media (max-width: 640px) {
            .pack h2 .pack-line { white-space: normal; }
        }
    `;
    document.head.appendChild(imageStyle);

    /* Keep the packaging headline as two intentional lines. */
    const packHeading = document.querySelector('.pack h2');
    if (packHeading) {
        packHeading.innerHTML = '<span class="pack-line">Production doesn\'t end</span><br><span>at the factory gate.</span>';
    }

    const header = document.querySelector('.site-nav');

    /* Language switcher: always on the far right. */
    if (header && !document.querySelector('.language-switcher')) {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';

        const isTurkish = window.location.pathname.includes('/tr/');
        const englishPath = isTurkish ? '../index.html' : 'index.html';
        const turkishPath = isTurkish ? './' : 'tr/index.html';

        switcher.innerHTML = `
            <a href="${englishPath}" class="language-option ${!isTurkish ? 'active' : ''}" aria-label="English">🇬🇧 <span>EN</span></a>
            <span class="language-divider">|</span>
            <a href="${turkishPath}" class="language-option ${isTurkish ? 'active' : ''}" aria-label="Türkçe">🇹🇷 <span>TR</span></a>
        `;

        switcher.style.cssText = `
            order: 3;
            margin-left: 24px;
            margin-right: 0;
            display: flex;
            align-items: center;
            gap: 4px;
            flex-shrink: 0;
            z-index: 95;
        `;

        switcher.querySelectorAll('.language-option').forEach(option => {
            option.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 7px 9px;
                border: 1px solid transparent;
                border-radius: 999px;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: .06em;
                transition: all .2s ease;
            `;
        });

        const active = switcher.querySelector('.language-option.active');
        if (active) {
            active.style.background = '#c9ff3d';
            active.style.color = '#080b0c';
            active.style.borderColor = '#c9ff3d';
        }

        switcher.querySelector('.language-divider').style.color = '#687579';

        const nav = header.querySelector('nav');
        const menu = header.querySelector('.menu');
        if (nav) nav.style.order = '2';
        if (menu) menu.style.order = '4';
        header.appendChild(switcher);
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

    /* Scroll reveal */
    const revealItems = document.querySelectorAll(
        '.journey article, .risk-grid > div, .quality-chain > div, .quality-cards > div, .industry-grid article, .dashboard, .reports, .network-copy'
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

    /* Experience counter */
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
                        const p = Math.min((time - startTime) / 1000, 1);
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
