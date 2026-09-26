/* =========================================================
   KOLER SITE INTERACTIONS + LANGUAGE SWITCHER
   ========================================================= */

const bar = document.querySelector('.progress');

window.addEventListener('scroll', () => {
    if (!bar) return;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (scrollY / h * 100) + '%';
});

/* Scroll reveal animations */
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll(
    '.journey article,.risk-grid>div,.quality-chain>div,.quality-cards>div,.industry-grid article,.dashboard,.reports,.network-copy'
).forEach(element => io.observe(element));

/* Experience counter */
const counters = document.querySelectorAll('.big-number strong');
const co = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.textContent);
        let start = 0;
        let t0 = null;

        function go(t) {
            if (!t0) t0 = t;
            const p = Math.min((t - t0) / 1000, 1);
            el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))) + '+';

            if (p < 1) {
                requestAnimationFrame(go);
            }
        }

        requestAnimationFrame(go);
        co.unobserve(el);
    });
}, { threshold: 0.7 });

counters.forEach(element => co.observe(element));

/* Mobile menu */
document.querySelector('.menu')?.addEventListener('click', () => {
    document.querySelector('.site-nav nav')?.classList.toggle('open');
});

/* =========================================================
   ENGLISH / TURKISH
   ========================================================= */

const translations = {
    'INDUSTRIAL PROJECT MANAGEMENT · TÜRKİYE → WORLD': 'ENDÜSTRİYEL PROJE YÖNETİMİ · TÜRKİYE → DÜNYA',
    'From engineering': 'Mühendislikten',
    'to shipment.': 'sevkiyata.',
    'We coordinate industrial projects across Türkiye — connecting technical review, manufacturing, quality, reporting and international logistics into one controlled process.': 'Türkiye genelindeki endüstriyel projeleri; teknik inceleme, imalat, kalite, raporlama ve uluslararası lojistiği tek bir kontrollü süreçte birleştirerek yönetiyoruz.',
    'Discuss a Project': 'Projenizi Görüşelim',
    'How we work ↓': 'Nasıl çalışıyoruz ↓',
    'International shipments': 'Uluslararası sevkiyat',
    'Companies served': 'Hizmet verilen firma',
    'Turkish manufacturers': 'Türk imalatçı',
    'Continents': 'Kıta',
    'THE ROLE': 'ROLÜMÜZ',
    'One point of control.': 'Tek bir kontrol noktası.',
    'Multiple industrial capabilities.': 'Birden fazla endüstriyel yetkinlik.',
    "We are the link between the customer's requirement and the manufacturing floor. We identify the right production route, manage execution, surface risks early and coordinate delivery to the required destination.": 'Müşterinin ihtiyacı ile üretim sahası arasındaki bağlantıyız. Doğru üretim rotasını belirler, uygulamayı yönetir, riskleri erken görünür hale getirir ve teslimatı istenen noktaya kadar koordine ederiz.',
    'OUR MODEL': 'İŞ MODELİMİZ',
    "We don't just place": 'Sadece sipariş vermiyoruz',
    'an order.': 'vermiyoruz.',
    'We manage the industrial journey around the agreed technical, quality, schedule and delivery requirements.': 'Endüstriyel süreci; üzerinde anlaşılan teknik, kalite, termin ve teslimat gereklilikleri doğrultusunda yönetiyoruz.',
    'Engineering review': 'Mühendislik incelemesi',
    'Drawings, specifications and manufacturing feasibility are reviewed before production.': 'Çizimler, teknik şartnameler ve üretilebilirlik, imalat başlamadan önce incelenir.',
    'Manufacturer selection': 'İmalatçı seçimi',
    'Capacity, equipment, capability, quality infrastructure and location are assessed for each project.': 'Her proje için kapasite, ekipman, yetkinlik, kalite altyapısı ve lokasyon değerlendirilir.',
    'Production control': 'Üretim kontrolü',
    'Progress, schedule, actions, risks and capacity are monitored through structured reporting.': 'İlerleme, termin, aksiyonlar, riskler ve kapasite yapılandırılmış raporlamayla takip edilir.',
    'Quality & shipment': 'Kalite ve sevkiyat',
    'Inspection, painting, marking, packing, documentation and international delivery are coordinated.': 'Muayene, boya, etiketleme, paketleme, dokümantasyon ve uluslararası teslimat koordine edilir.',
    'OUR EXPERIENCE': 'DENEYİMİMİZ',
    'Real operations.': 'Gerçek operasyonlar.',
    'Real industrial flow.': 'Gerçek endüstriyel akış.',
    'shipments managed across': 'yönetilen sevkiyat',
    'Europe, Africa & the Americas': 'Avrupa, Afrika ve Amerika kıtaları',
    'Manufacturing partners': 'İmalat ortağı',
    'RISK MANAGEMENT': 'RİSK YÖNETİMİ',
    'What happens': 'Bir şey değiştiğinde',
    'when something changes?': 'ne oluyor?',
    'The value is not only in tracking a project. It is in acting early when the plan starts moving away from reality.': 'Değer yalnızca projeyi takip etmekte değildir. Plan gerçeklikten sapmaya başladığında erken harekete geçebilmekte yatar.',
    'A technical issue appears.': 'Teknik bir sorun ortaya çıkar.',
    'We raise it, explain the impact and work with the relevant parties on a practical solution.': 'Konuyu gündeme getirir, etkisini açıklar ve ilgili taraflarla uygulanabilir bir çözüm üzerinde çalışırız.',
    'Workshop capacity changes.': 'Atölye kapasitesi değişir.',
    'Production is reassessed and, where appropriate, work can be redistributed across qualified manufacturers.': 'Üretim yeniden değerlendirilir ve gerektiğinde iş kalifiye imalatçılar arasında yeniden dağıtılabilir.',
    'An extra workload arrives.': 'Ek bir iş yükü gelir.',
    'Scope and capacity are reviewed before the constraint becomes a project delay.': 'Kısıt proje gecikmesine dönüşmeden önce kapsam ve kapasite yeniden değerlendirilir.',
    'A delivery risk emerges.': 'Bir teslimat riski oluşur.',
    'Actions are escalated through reporting so decisions can be made before the deadline is affected.': 'Termin etkilenmeden karar alınabilmesi için aksiyonlar raporlama üzerinden hızla eskale edilir.',
    'PROJECT CONTROL': 'PROJE KONTROLÜ',
    'Visibility that leads': 'Aksiyona dönüşen',
    'to action.': 'görünürlük.',
    'Daily, weekly and monthly reports make progress, risks, actions and milestones visible to management.': 'Günlük, haftalık ve aylık raporlar; ilerlemeyi, riskleri, aksiyonları ve kilometre taşlarını yönetimin görünür hale getirir.',
    'MASTER PROJECT CONTROL': 'ANA PROJE KONTROLÜ',
    'PROJECT 024': 'PROJE 024',
    '● ON TRACK': '● PLANDA',
    'OVERALL PROGRESS': 'GENEL İLERLEME',
    'Engineering': 'Mühendislik',
    'Procurement': 'Tedarik',
    'Manufacturing': 'İmalat',
    'Quality': 'Kalite',
    'Logistics': 'Lojistik',
    'MASTER SCHEDULE': 'ANA PROJE PROGRAMI',
    'STATUS': 'DURUM',
    'Done': 'Tamamlandı',
    'On track': 'Planda',
    'In progress': 'Devam ediyor',
    'Inspection': 'Muayene',
    'Planned': 'Planlandı',
    'Delivery': 'Teslimat',
    'Open actions': 'Açık aksiyon',
    'Risks': 'Risk',
    'Documents': 'Doküman',
    'Milestones': 'Kilometre taşı',
    'WEEKLY PROJECT REPORT': 'HAFTALIK PROJE RAPORU',
    'REPORTING': 'RAPORLAMA',
    'Management information,': 'Yönetim bilgisi,',
    'not spreadsheet noise.': 'gereksiz tablo kalabalığı değil.',
    'Structured reporting for progress, risks, production status, actions and delivery information.': 'İlerleme, riskler, üretim durumu, aksiyonlar ve teslimat bilgileri için yapılandırılmış raporlama.',
    'DAILY': 'GÜNLÜK',
    'WEEKLY': 'HAFTALIK',
    'MONTHLY': 'AYLIK',
    'QUALITY CONTROL': 'KALİTE KONTROLÜ',
    'Controlled through': 'Baştan sona',
    'the complete chain.': 'kontrollü süreç.',
    'Quality is not a final inspection. It is a controlled sequence from technical requirements through production, finishing, packing and shipment.': 'Kalite yalnızca son kontrolden ibaret değildir. Teknik gerekliliklerden üretime, yüzey işlemlerinden paketleme ve sevkiyata kadar kontrollü bir süreçtir.',
    'Raw Material': 'Hammadde',
    'Welding': 'Kaynak',
    'Dimensional Inspection': 'Boyutsal Kontrol',
    'Painting': 'Boya',
    'Final Inspection': 'Final Kontrol',
    'Packing': 'Paketleme',
    'Shipment': 'Sevkiyat',
    'Welding engineering': 'Kaynak mühendisliği',
    'Technical welding oversight and coordination.': 'Teknik kaynak kontrolü ve koordinasyonu.',
    'Third-party inspection': 'Üçüncü taraf denetimi',
    'Independent inspectors can be coordinated when required.': 'Gerektiğinde bağımsız denetçiler koordine edilebilir.',
    'Manufacturing quality': 'İmalat kalitesi',
    'Established factory quality controls and certification checks.': 'Yerleşik fabrika kalite kontrolleri ve sertifikasyon kontrolleri.',
    'Customer documentation': 'Müşteri dokümantasyonu',
    'Inspection records, material documents, paint records, marking and packing lists.': 'Kontrol kayıtları, malzeme belgeleri, boya kayıtları, etiketleme ve paket listeleri.',
    'MANUFACTURING NETWORK': 'İMALATÇI AĞI',
    'The right factory.': 'Doğru fabrika.',
    'The right route.': 'Doğru rota.',
    'For every project, we research the Turkish manufacturing market and identify suitable partners based on monthly capacity, equipment, technical capability, quality infrastructure, location and delivery requirements.': 'Her proje için Türkiye imalat pazarını araştırıyor; aylık kapasite, ekipman, teknik yetkinlik, kalite altyapısı, lokasyon ve teslimat gerekliliklerine göre uygun iş ortaklarını belirliyoruz.',
    'Capacity & equipment': 'Kapasite ve ekipman',
    'Can the factory realistically absorb the scope?': 'Fabrika bu kapsamı gerçekçi şekilde karşılayabilir mi?',
    'Technical fit': 'Teknik uygunluk',
    'Does its capability match the project?': 'Yetkinliği projeyle örtüşüyor mu?',
    'Quality infrastructure': 'Kalite altyapısı',
    'Certifications, QC and inspection readiness.': 'Sertifikalar, kalite kontrol ve denetime hazırlık.',
    'Schedule & logistics': 'Termin ve lojistik',
    'Can it meet the route and delivery plan?': 'Rota ve teslimat planına uyabilir mi?',
    'CONFIDENTIALITY': 'GİZLİLİK',
    'PROJECT PROTECTION': 'PROJE KORUMASI',
    'Confidential': 'İlk günden',
    'from day one.': 'gizlilik.',
    'Projects can be structured under an NDA before execution to protect technical information, commercial data and the interests of both clients and manufacturing partners.': 'Projeler, uygulama öncesinde NDA kapsamında yapılandırılabilir; böylece teknik bilgiler, ticari veriler ve hem müşterilerin hem de imalatçıların menfaatleri korunur.',
    'GLOBAL LOGISTICS': 'GLOBAL LOJİSTİK',
    'From Türkiye': "Türkiye'den",
    'to your site.': 'sahanıza.',
    'Packaging, marking, packing lists, shipment coordination and destination-specific delivery arrangements are managed as part of the project.': 'Paketleme, etiketleme, paket listeleri, sevkiyat koordinasyonu ve varış noktasına özel teslimat düzenlemeleri projenin bir parçası olarak yönetilir.',
    'PACKAGING & DOCUMENTATION': 'PAKETLEME VE DOKÜMANTASYON',
    "Production doesn't end": 'Üretim',
    'at the factory gate.': 'fabrika kapısında bitmez.',
    'High-standard packaging and customer-specific documentation are part of the delivery process.': 'Yüksek standartta paketleme ve müşteriye özel dokümantasyon teslimat sürecinin parçasıdır.',
    'Protective packing': 'Koruyucu paketleme',
    'Identification & marking': 'Tanımlama ve etiketleme',
    'Customer packing list': 'Müşteri paket listesi',
    'Shipment records on request': 'Talep halinde sevkiyat kayıtları',
    'INDUSTRIES': 'SEKTÖRLER',
    'Built for demanding': 'Zorlu',
    'industrial environments.': 'endüstriyel ortamlar için.',
    'Process equipment, mechanical components and steelwork.': 'Proses ekipmanları, mekanik komponentler ve çelik konstrüksiyon.',
    'Heavy-duty components, fabrication and replacement parts.': 'Ağır hizmet komponentleri, imalat ve yedek parçalar.',
    'Industrial equipment, structures and project supply.': 'Endüstriyel ekipman, konstrüksiyon ve proje tedariki.',
    'Conveying, structures and mechanical equipment.': 'Konveyörler, konstrüksiyonlar ve mekanik ekipman.',
    'Custom components, assemblies and equipment.': 'Özel komponentler, montajlar ve ekipmanlar.',
    'Project-based industrial supply and coordination.': 'Proje bazlı endüstriyel tedarik ve koordinasyon.',
    'OUR PROMISE': 'TAAHHÜDÜMÜZ',
    'European expectations.': 'Avrupa beklentileri.',
    'Turkish manufacturing capability.': 'Türk imalat kabiliyeti.',
    'One coordinated team across engineering, manufacturing, quality, project control and international delivery.': 'Mühendislik, imalat, kalite, proje kontrolü ve uluslararası teslimat boyunca tek koordineli ekip.',
    'START A PROJECT': 'PROJE BAŞLATALIM',
    'Have an industrial requirement?': 'Bir endüstriyel ihtiyacınız mı var?',
    'Send us your drawings, scope or project requirement. We will review the opportunity and discuss the right manufacturing and project-control route.': 'Çizimlerinizi, kapsamınızı veya proje gereksiniminizi bize gönderin. Fırsatı inceleyip doğru imalat ve proje kontrolü rotasını birlikte değerlendirelim.',
    'Engineering · Manufacturing · Quality · Logistics': 'Mühendislik · İmalat · Kalite · Lojistik'
};

function normalizeText(value) {
    return value.replace(/\s+/g, ' ').trim();
}

function translatePage(language) {
    const isTurkish = language === 'tr';

    document.documentElement.lang = isTurkish ? 'tr' : 'en';

    document.querySelectorAll('body *').forEach(element => {
        if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return;
        if (element.children.length > 0) return;

        const original = normalizeText(element.textContent);
        if (!original) return;

        if (isTurkish) {
            if (translations[original]) element.textContent = translations[original];
        } else {
            const english = Object.keys(translations).find(key => translations[key] === original);
            if (english) element.textContent = english;
        }
    });

    /* Restore phrases inside elements that contain <span> or <br>. */
    const richTranslations = [
        ['.hero h1', ['From engineering', 'to shipment.'], ['Mühendislikten', 'sevkiyata.']],
        ['.statement h2', ['One point of control.', 'Multiple industrial capabilities.'], ['Tek bir kontrol noktası.', 'Birden fazla endüstriyel yetkinlik.']],
        ['#model h2', ["We don't just place", 'an order.'], ['Sadece sipariş', 'vermiyoruz.']],
        ['.experience h2', ['Real operations.', 'Real industrial flow.'], ['Gerçek operasyonlar.', 'Gerçek endüstriyel akış.']],
        ['.risk h2', ['What happens', 'when something changes?'], ['Bir şey değiştiğinde', 'ne oluyor?']],
        ['#control h2', ['Visibility that leads', 'to action.'], ['Aksiyona dönüşen', 'görünürlük.']],
        ['#quality h2', ['Controlled through', 'the complete chain.'], ['Baştan sona', 'kontrollü süreç.']],
        ['.network h2', ['The right factory.', 'The right route.'], ['Doğru fabrika.', 'Doğru rota.']],
        ['.confidential h2', ['Confidential', 'from day one.'], ['İlk günden', 'gizlilik.']],
        ['#logistics h2', ['From Türkiye', 'to your site.'], ["Türkiye'den", 'sahanıza.']],
        ['.pack h2', ["Production doesn't end", 'at the factory gate.'], ['Üretim', 'fabrika kapısında bitmez.']],
        ['.industries h2', ['Built for demanding', 'industrial environments.'], ['Zorlu', 'endüstriyel ortamlar için.']],
        ['.closing h2', ['European expectations.', 'Turkish manufacturing capability.'], ['Avrupa beklentileri.', 'Türk imalat kabiliyeti.']]
    ];

    richTranslations.forEach(([selector, enParts, trParts]) => {
        const element = document.querySelector(selector);
        if (!element) return;
        const parts = isTurkish ? trParts : enParts;
        const span = element.querySelector('span');
        if (span && parts.length === 2) {
            const firstText = Array.from(element.childNodes).find(node => node.nodeType === 3 && normalizeText(node.nodeValue));
            if (firstText) firstText.nodeValue = parts[0];
            span.textContent = parts[1];
        }
    });

    /* Labels with percentages */
    const labels = [
        ['Engineering', 'Mühendislik', '100%'],
        ['Procurement', 'Tedarik', '94%'],
        ['Manufacturing', 'İmalat', '72%'],
        ['Quality', 'Kalite', '58%'],
        ['Logistics', 'Lojistik', '20%']
    ];

    document.querySelectorAll('.dashbody label').forEach(label => {
        const item = labels.find(x => x[0] === normalizeText(label.firstChild?.nodeValue || '').replace(/\s+/g, '')) || labels.find(x => label.textContent.includes(x[0]));
        if (item) label.firstChild.nodeValue = isTurkish ? item[1] : item[0];
    });

    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.lang === language);
        button.setAttribute('aria-pressed', button.dataset.lang === language ? 'true' : 'false');
    });

    localStorage.setItem('koler-language', language);
}

function createLanguageSwitcher() {
    const header = document.querySelector('.site-nav');
    const nav = document.querySelector('.site-nav nav');
    if (!header || !nav || document.querySelector('.language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('aria-label', 'Language selection');
    switcher.innerHTML = `
        <button class="lang-btn" data-lang="en" type="button" aria-label="English">🇬🇧 <span>EN</span></button>
        <button class="lang-btn" data-lang="tr" type="button" aria-label="Türkçe">🇹🇷 <span>TR</span></button>
    `;

    header.insertBefore(switcher, nav);

    switcher.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => translatePage(button.dataset.lang));
    });
}

createLanguageSwitcher();
translatePage(localStorage.getItem('koler-language') || 'en');
