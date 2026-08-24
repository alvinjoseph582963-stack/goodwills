// ─── home.js – Homepage initialization & event binding ─

document.addEventListener('DOMContentLoaded', () => {

    // ── Footer year ──────────────────────────────────────────────────────────
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── Helper to setup smooth carousel scrolling with drag-to-scroll ────────
    function setupCarousel(trackId, prevBtnId, nextBtnId, scrollStep = 380) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (!track) return;

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollStep, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollStep, behavior: 'smooth' });
            });
        }

        // Desktop drag-to-scroll
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            track.scrollLeft = scrollLeft - walk;
        });
    }

    // ── Stories / Testimonials Carousel ───────────────────────────────────────
    setupCarousel('testimonials-container', 'stories-scroll-left', 'stories-scroll-right', 400);

    // ── Bind WhatsApp clicks on all dynamic & static cards ──────────────────
    document.querySelectorAll('[data-whatsapp]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const msg = el.dataset.whatsapp;
            const phone = (typeof GOODWILL_CONFIG !== 'undefined' && GOODWILL_CONFIG.phone) 
                ? GOODWILL_CONFIG.phone 
                : '919747790799';
            const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });

    // ── FAQs ─────────────────────────────────────────────────────────────────
    const faqList = document.getElementById('faq-list');
    if (faqList && faqList.children.length === 0 && typeof faqs !== 'undefined') {
        faqs.forEach((faq, i) => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            item.innerHTML = `
                <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${i}">
                    ${faq.question}
                    <span class="faq-icon" aria-hidden="true">+</span>
                </button>
                <div class="faq-answer" id="faq-ans-${i}" role="region">
                    <p>${faq.answer}</p>
                </div>
            `;
            faqList.appendChild(item);
        });

        // Bind accordion click events
        faqList.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !expanded);
                const answer = btn.nextElementSibling;
                if (answer) {
                    answer.style.maxHeight = expanded ? null : answer.scrollHeight + 'px';
                }
            });
        });
    }

    // ── Responsive Layout (family & airport sections) ─────────────────────────
    const familyLayout = document.querySelector('.family-layout');
    const airportLayout = document.querySelector('.airport-layout');

    function updateLayouts() {
        const isMobile = window.innerWidth < 768;
        [familyLayout, airportLayout].forEach(el => {
            if (!el) return;
            el.style.gridTemplateColumns = isMobile ? '1fr' : '1fr 1fr';
        });
    }
    updateLayouts();
    window.addEventListener('resize', updateLayouts, { passive: true });

});
