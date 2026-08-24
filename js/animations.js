/**
 * GOODWILL HOLIDAYS – Animations JS
 * Scroll-reveal and micro-interaction animations using IntersectionObserver
 * Respects prefers-reduced-motion
 */

(function() {
    'use strict';

    // ─── Reduced Motion Check ─────────────────────────────────────────────────
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── Scroll Reveal ────────────────────────────────────────────────────────

    function initScrollReveal() {
        if (prefersReducedMotion) {
            // Still show elements, just without animation
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        const revealOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || 0;

                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, parseInt(delay));

                    revealObserver.unobserve(el);
                }
            });
        }, revealOptions);

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ─── Counter Animation ────────────────────────────────────────────────────

    function animateCounter(el, target, duration = 2000) {
        if (prefersReducedMotion) {
            el.textContent = el.dataset.target;
            return;
        }

        const startTime = performance.now();
        const isDecimal = target.includes('.');
        const hasPlus = target.includes('+');
        const hasStar = target.includes('★');
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = numericValue * eased;

            let display = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
            if (hasPlus) display += '+';
            if (hasStar) display += '★';

            el.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function initCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (!el.dataset.counted) {
                        el.dataset.counted = 'true';
                        animateCounter(el, el.dataset.target || el.textContent, 2000);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter-value').forEach(el => {
            el.dataset.target = el.textContent;
            counterObserver.observe(el);
        });
    }

    // ─── Parallax Effect ─────────────────────────────────────────────────────

    function initParallax() {
        if (prefersReducedMotion) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (!parallaxElements.length) return;

        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.3;
                const offset = scrollY * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // ─── Hero Text Animation ─────────────────────────────────────────────────

    function initHeroAnimation() {
        if (prefersReducedMotion) return;

        const hero = document.querySelector('.hero');
        if (!hero) return;

        const words = hero.querySelectorAll('.hero-word');
        words.forEach((word, i) => {
            word.style.animationDelay = `${i * 0.15}s`;
        });
    }

    // ─── Tilt Effect on Cards ─────────────────────────────────────────────────

    function initTiltEffect() {
        if (prefersReducedMotion) return;
        if (window.matchMedia('(hover: none)').matches) return; // Skip on touch devices

        const tiltCards = document.querySelectorAll('[data-tilt]');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                const rotateX = (-mouseY / rect.height) * 8;
                const rotateY = (mouseX / rect.width) * 8;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease';
                setTimeout(() => { card.style.transition = ''; }, 500);
            });
        });
    }

    // ─── Floating Elements ───────────────────────────────────────────────────

    function initFloatingElements() {
        if (prefersReducedMotion) return;

        const floaters = document.querySelectorAll('.float-element');
        floaters.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.7}s`;
        });
    }

    // ─── Typed Text Effect ───────────────────────────────────────────────────

    function initTypedText() {
        const typedEl = document.querySelector('[data-typed]');
        if (!typedEl) return;

        const words = typedEl.dataset.typed.split(',').map(w => w.trim());
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let pauseTimeout = null;

        function type() {
            const currentWord = words[wordIndex];

            if (!isDeleting) {
                typedEl.textContent = currentWord.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    pauseTimeout = setTimeout(type, 1800);
                    return;
                }
            } else {
                typedEl.textContent = currentWord.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            const speed = isDeleting ? 60 : 100;
            pauseTimeout = setTimeout(type, speed);
        }

        if (!prefersReducedMotion) {
            type();
        } else {
            typedEl.textContent = words[0];
        }
    }

    // ─── Smooth Image Loading ─────────────────────────────────────────────────

    function initLazyImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('img-loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '200px' });

            images.forEach(img => {
                img.addEventListener('load', () => img.classList.add('img-loaded'));
                img.addEventListener('error', () => img.classList.add('img-error'));
                imageObserver.observe(img);
            });
        }
    }

    // ─── Navbar Scroll Behavior ─────────────────────────────────────────────

    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = 0;
        let ticking = false;

        function updateNavbar() {
            const scrollY = window.scrollY;

            if (scrollY > 80) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }

            if (scrollY > lastScrollY && scrollY > 200) {
                navbar.classList.add('navbar--hidden');
            } else {
                navbar.classList.remove('navbar--hidden');
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }

    // ─── Stagger Animation ────────────────────────────────────────────────────

    function initStaggerGroups() {
        if (prefersReducedMotion) return;

        const groups = document.querySelectorAll('[data-stagger-group]');
        groups.forEach(group => {
            const items = group.querySelectorAll('.stagger-item');
            items.forEach((item, i) => {
                item.dataset.delay = i * 100;
            });
        });
    }

    // ─── Page Transition ──────────────────────────────────────────────────────

    function initPageTransition() {
        if (prefersReducedMotion) return;

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('https:')) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }

    // ─── Active Nav Link ──────────────────────────────────────────────────────

    function initActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Expose for re-invocation after other scripts render new DOM content
    window.initScrollReveal = initScrollReveal;
    window.initTiltEffect = initTiltEffect;

    // ─── Initialize All ───────────────────────────────────────────────────────

    function init() {
        initScrollReveal();
        initCounters();
        initHeroAnimation();
        initFloatingElements();
        initTypedText();
        initLazyImages();
        initNavbarScroll();
        initStaggerGroups();
        initActiveNavLink();

        // Defer heavy effects
        requestIdleCallback ? requestIdleCallback(() => {
            initTiltEffect();
            initParallax();
            initPageTransition();
        }) : setTimeout(() => {
            initTiltEffect();
            initParallax();
            initPageTransition();
        }, 200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Page entry animation
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('page-enter');
        requestAnimationFrame(() => {
            document.body.classList.add('page-enter-active');
        });
    });

})();
