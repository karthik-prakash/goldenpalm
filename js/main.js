/* ===================================
   GOLDEN PALM - MAIN JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback: hide preloader after 3 seconds max
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ========== HERO COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;

        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    // Start counters when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // ========== HERO PARTICLES ==========
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 6 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    // ========== TESTIMONIALS SLIDER ==========
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('sliderDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        const totalSlides = cards.length;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        });

        // Auto-slide every 5 seconds
        let autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 5000);

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoSlide));
        track.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                goToSlide(currentSlide);
            }, 5000);
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentSlide = (currentSlide + 1) % totalSlides;
                } else {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                }
                goToSlide(currentSlide);
            }
        }, { passive: true });
    }

    // ========== CONTACT FORM → WHATSAPP ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const eventDate = document.getElementById('eventDate').value;
            const message = document.getElementById('message').value;

            const whatsappMsg = `Hi Shruthi! 🌿✋%0A%0A` +
                `I'd like to book your Mehendi services.%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Phone:* ${phone}%0A` +
                `${email ? `*Email:* ${email}%0A` : ''}` +
                `*Service:* ${service}%0A` +
                `*Event Date:* ${eventDate}%0A` +
                `${message ? `*Details:* ${message}%0A` : ''}` +
                `%0APlease let me know the availability. Thank you! 🙏`;

            const whatsappURL = `https://wa.me/919876543210?text=${whatsappMsg}`;
            window.open(whatsappURL, '_blank');

            // Show success message
            showNotification('Redirecting to WhatsApp... 📱', 'success');
        });
    }

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== NOTIFICATION SYSTEM ==========
    window.showNotification = function(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '10000',
            animation: 'fadeIn 0.4s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.9rem',
            maxWidth: '400px'
        });

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            notification.style.transition = 'all 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    };

    // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
