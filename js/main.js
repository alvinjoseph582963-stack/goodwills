/**
 * GOODWILL HOLIDAYS – Main JS
 * Shared UI components: navigation, mobile menu, search widget, modals
 */

(function() {
    'use strict';

    // ─── Mobile Navigation ────────────────────────────────────────────────────

    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileClose = document.querySelector('.mobile-menu-close');
        const body = document.body;

        if (!hamburger || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('is-open');
            if (mobileOverlay) mobileOverlay.classList.add('is-visible');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.classList.add('is-active');
            body.style.overflow = 'hidden';
            mobileMenu.querySelector('a')?.focus();
        }

        function closeMenu() {
            mobileMenu.classList.remove('is-open');
            if (mobileOverlay) mobileOverlay.classList.remove('is-visible');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('is-active');
            body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('is-open');
            isOpen ? closeMenu() : openMenu();
        });

        if (mobileClose) mobileClose.addEventListener('click', closeMenu);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMenu();
                hamburger.focus();
            }
        });

        // Close on nav link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ─── Search Widget ────────────────────────────────────────────────────────

    function initSearchWidget() {
        const widget = document.querySelector('.search-widget');
        if (!widget) return;

        const tabs = widget.querySelectorAll('.search-tab');
        const forms = widget.querySelectorAll('.search-form');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                forms.forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const form = widget.querySelector(`[data-form="${target}"]`);
                if (form) form.classList.add('active');
            });
        });

        // Date min = today
        const dateInputs = widget.querySelectorAll('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            input.min = today;
            if (!input.value) input.value = today;
        });
    }

    // ─── WhatsApp CTA Binding ─────────────────────────────────────────────────

    function initWhatsAppCTAs() {
        if (typeof GOODWILL_CONFIG === 'undefined') return;

        document.querySelectorAll('[data-whatsapp]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const message = el.dataset.whatsapp || 'Hello Goodwill Holidays! I would like more information about your services.';
                window.open(generateWhatsAppURL(message), '_blank', 'noopener,noreferrer');
            });
        });
    }

    // ─── Back to Top Button ───────────────────────────────────────────────────

    function initBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;

        const scrollObserver = () => {
            if (window.scrollY > 500) {
                btn.classList.add('is-visible');
            } else {
                btn.classList.remove('is-visible');
            }
        };

        window.addEventListener('scroll', scrollObserver, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Testimonial Carousel ─────────────────────────────────────────────────

    function initTestimonialCarousel() {
        const track = document.querySelector('.testimonial-track');
        if (!track) return;

        const slides = track.querySelectorAll('.testimonial-card');
        const dotsContainer = document.querySelector('.testimonial-dots');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let current = 0;
        let autoplayInterval = null;

        if (!slides.length) return;

        // Create dots
        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = `testimonial-dot${i === 0 ? ' active' : ''}`;
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            });
        }

        function goTo(index) {
            slides[current].classList.remove('active');
            dotsContainer?.querySelectorAll('.testimonial-dot')[current]?.classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dotsContainer?.querySelectorAll('.testimonial-dot')[current]?.classList.add('active');
        }

        slides[0].classList.add('active');

        if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

        // Touch/swipe support
        let touchStartX = 0;
        track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? goTo(current + 1) : goTo(current - 1);
                resetAutoplay();
            }
        }, { passive: true });

        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => goTo(current + 1), 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        startAutoplay();

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        track.addEventListener('mouseleave', startAutoplay);
    }

    // ─── FAQ Accordion ────────────────────────────────────────────────────────

    function initFAQAccordion() {
        const faqs = document.querySelectorAll('.faq-item');

        faqs.forEach(item => {
            const trigger = item.querySelector('.faq-question');
            const content = item.querySelector('.faq-answer');
            if (!trigger || !content) return;

            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                // Close all others
                faqs.forEach(f => {
                    f.classList.remove('is-open');
                    f.querySelector('.faq-answer')?.style.setProperty('max-height', '0');
                    f.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    item.classList.add('is-open');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });

            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trigger.click();
                }
            });
        });
    }

    // ─── Image Gallery Lightbox ───────────────────────────────────────────────

    function initGallery() {
        const galleryItems = document.querySelectorAll('[data-gallery]');
        if (!galleryItems.length) return;

        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image gallery');
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close gallery">&times;</button>
                <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
                <button class="lightbox-next" aria-label="Next image">&#8250;</button>
                <img class="lightbox-img" src="" alt="" />
                <div class="lightbox-counter"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        const images = [...galleryItems];
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            updateLightbox();
            lightbox.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            lightbox.querySelector('.lightbox-close').focus();
        }

        function closeLightbox() {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
            images[currentIndex].focus();
        }

        function updateLightbox() {
            const img = images[currentIndex];
            lightbox.querySelector('.lightbox-img').src = img.dataset.gallery;
            lightbox.querySelector('.lightbox-img').alt = img.alt || '';
            lightbox.querySelector('.lightbox-counter').textContent = `${currentIndex + 1} / ${images.length}`;
        }

        images.forEach((img, i) => {
            img.style.cursor = 'pointer';
            img.setAttribute('tabindex', '0');
            img.addEventListener('click', () => openLightbox(i));
            img.addEventListener('keydown', e => {
                if (e.key === 'Enter') openLightbox(i);
            });
        });

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        });
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + images.length) % images.length; updateLightbox(); }
            if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; updateLightbox(); }
        });
    }

    // ─── Sticky CTA (mobile) ─────────────────────────────────────────────────

    function initStickyCTA() {
        const stickyCTA = document.querySelector('.sticky-cta-mobile');
        if (!stickyCTA) return;

        const hero = document.querySelector('.hero');
        if (!hero) return;

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCTA.classList.remove('is-visible');
                } else {
                    stickyCTA.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        heroObserver.observe(hero);
    }

    // ─── Search on Page ───────────────────────────────────────────────────────

    function initPageSearch() {
        const searchInput = document.querySelector('.page-search-input');
        const searchableItems = document.querySelectorAll('[data-searchable]');
        if (!searchInput || !searchableItems.length) return;

        searchInput.addEventListener('input', debounce(() => {
            const query = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const tags = (item.dataset.tags || '').toLowerCase();
                const matches = !query || text.includes(query) || tags.includes(query);
                item.style.display = matches ? '' : 'none';
                if (matches) visibleCount++;
            });

            // Show/hide empty state
            const emptyState = document.querySelector('.search-empty-state');
            if (emptyState) {
                emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }, 200));
    }

    // ─── Utility: Debounce ────────────────────────────────────────────────────

    function debounce(fn, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ─── Smooth Anchor Scrolling ──────────────────────────────────────────────

    function initSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            });
        });
    }

    // ─── Copy Phone Number ────────────────────────────────────────────────────

    function initCopyPhone() {
        document.querySelectorAll('[data-copy-phone]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (typeof GOODWILL_CONFIG === 'undefined') return;
                navigator.clipboard?.writeText(GOODWILL_CONFIG.phone).then(() => {
                    const orig = btn.textContent;
                    btn.textContent = '✓ Copied!';
                    setTimeout(() => { btn.textContent = orig; }, 2000);
                });
            });
        });
    }

    // Expose for re-invocation after other scripts render new DOM content
    window.initGallery = initGallery;

    // ─── Initialize ───────────────────────────────────────────────────────────

    function init() {
        initMobileNav();
        initSearchWidget();
        initWhatsAppCTAs();
        initBackToTop();
        initTestimonialCarousel();
        initFAQAccordion();
        initGallery();
        initStickyCTA();
        initPageSearch();
        initSmoothAnchors();
        initCopyPhone();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
