/* ===================================
   SCROLL REVEAL ANIMATIONS
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== INTERSECTION OBSERVER FOR REVEALS ==========
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ========== PARALLAX EFFECT ON HERO ==========
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrollY < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
            }
        });
    }

    // ========== TILT EFFECT ON SERVICE CARDS ==========
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========== MAGNETIC EFFECT ON BUTTONS ==========
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ========== CURSOR GLOW EFFECT ==========
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursorGlow';
    Object.assign(cursorGlow.style, {
        position: 'fixed',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9',
        transition: 'transform 0.15s ease, opacity 0.3s ease',
        opacity: '0'
    });
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = (e.clientX - 150) + 'px';
        cursorGlow.style.top = (e.clientY - 150) + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // ========== TEXT TYPING EFFECT FOR HERO (optional enhancement) ==========
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        const taglines = [
            'Adorning Hands with Timeless Art',
            'Where Tradition Meets Elegance',
            'Every Hand Tells a Story',
            'Crafting Beauty, One Stroke at a Time'
        ];
        let taglineIndex = 0;

        function typeWriter(text, element, callback) {
            let i = 0;
            element.textContent = '';
            const interval = setInterval(() => {
                element.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    if (callback) setTimeout(callback, 3000);
                }
            }, 50);
        }

        function eraseText(element, callback) {
            let text = element.textContent;
            const interval = setInterval(() => {
                text = text.slice(0, -1);
                element.textContent = text;
                if (text.length === 0) {
                    clearInterval(interval);
                    if (callback) setTimeout(callback, 300);
                }
            }, 30);
        }

        function cycleTaglines() {
            eraseText(heroTagline, () => {
                taglineIndex = (taglineIndex + 1) % taglines.length;
                typeWriter(taglines[taglineIndex], heroTagline, cycleTaglines);
            });
        }

        // Start cycling after 4 seconds
        setTimeout(cycleTaglines, 4000);
    }

});
