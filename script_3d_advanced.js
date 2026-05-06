/* Advanced 3D Effects Script - The Castle Park */

// ============================================================================
// MOUSE FOLLOW EFFECT - Elements follow cursor position
// ============================================================================

class MouseFollowEffect {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card, .menu-item, .service-box, .testimonial-card');
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;

        this.cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const distance = this.getDistance(e.clientX, e.clientY, cardCenterX, cardCenterY);
            
            if (distance < 300) {
                const angle = Math.atan2(e.clientY - cardCenterY, e.clientX - cardCenterX);
                const rotX = Math.sin(angle) * 5;
                const rotY = Math.cos(angle) * 5;

                card.style.transform = `
                    translateZ(15px)
                    rotateX(${rotX}deg)
                    rotateY(${rotY}deg)
                `;
            } else {
                card.style.transform = 'translateZ(15px) rotateX(0deg) rotateY(0deg)';
            }
        });
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}

// ============================================================================
// SCROLL REVEAL 3D - Elements animate in when scrolling into view
// ============================================================================

class ScrollReveal3D {
    constructor() {
        this.elements = document.querySelectorAll('.section, .gallery-item, .feature-card');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => observer.observe(el));
    }

    revealElement(element) {
        element.style.animation = 'scrollReveal 0.8s ease-out forwards';
    }
}

// ============================================================================
// PARALLAX 3D - Depth effect based on scroll position
// ============================================================================

class Parallax3D {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.about = document.querySelector('.about');
        this.services = document.querySelector('.services');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrolled = window.pageYOffset;

        if (this.hero) {
            this.hero.style.transform = `perspective(1200px) rotateX(${scrolled * 0.05}deg)`;
        }

        if (this.about) {
            const offset = this.about.offsetTop;
            const elementScroll = scrolled - offset;
            if (elementScroll > -500) {
                this.about.style.transform = `translateZ(${elementScroll * 0.2}px)`;
            }
        }
    }
}

// ============================================================================
// FLOATING ANIMATION - Elements float up and down smoothly
// ============================================================================

class FloatingEffect {
    constructor() {
        this.floatElements = document.querySelectorAll('.hero-content, .feature-card');
        this.init();
    }

    init() {
        this.floatElements.forEach((element, index) => {
            const duration = 3 + (index * 0.5);
            element.style.animation = `float ${duration}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// ============================================================================
// CLICK RIPPLE EFFECT - Ripple effect on click
// ============================================================================

class ClickRipple {
    constructor() {
        this.buttons = document.querySelectorAll('.btn, .menu-item, .service-box');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================================================
// TILT ON SCROLL - Cards tilt based on scroll speed
// ============================================================================

class TiltOnScroll {
    constructor() {
        this.cards = document.querySelectorAll('.menu-item, .service-box');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const scrollVelocity = scrollTop - this.lastScrollTop;

        this.cards.forEach((card, index) => {
            const tilt = (scrollVelocity * 0.1) % 30;
            card.style.transform = `
                translateZ(15px)
                rotateZ(${tilt}deg)
                rotateX(${Math.sin(scrollVelocity * 0.01) * 5}deg)
            `;
        });

        this.lastScrollTop = scrollTop;
    }
}

// ============================================================================
// LIGHT EFFECT - Simulates light source following cursor
// ============================================================================

class LightEffect {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card, .service-box, .testimonial-card');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.updateLight(e));
    }

    updateLight(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        this.cards.forEach(card => {
            card.style.backgroundImage = `
                radial-gradient(
                    circle at ${x}% ${y}%,
                    rgba(212, 175, 55, 0.1) 0%,
                    transparent 50%
                )
            `;
        });
    }
}

// ============================================================================
// STAGGER ANIMATION - Elements animate in sequence
// ============================================================================

class StaggerAnimation {
    constructor() {
        this.menuItems = document.querySelectorAll('.menu-item');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.animateItems(this.menuItems, 'slideInUp');
        this.animateItems(this.galleryItems, 'scaleUp');
    }

    animateItems(items, animation) {
        items.forEach((item, index) => {
            item.style.animation = `${animation} 0.6s ease-out forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.opacity = '0';
        });
    }
}

// ============================================================================
// INITIALIZE ALL EFFECTS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all 3D effects
    new MouseFollowEffect();      // Cursor-tracking 3D
    new ScrollReveal3D();          // Reveal on scroll
    new Parallax3D();              // Depth on scroll
    new FloatingEffect();          // Continuous float
    new ClickRipple();             // Click animations
    new TiltOnScroll();            // Tilt on scroll speed
    new LightEffect();             // Dynamic lighting
    new StaggerAnimation();        // Sequential reveal

    console.log('🎭 Advanced 3D Effects Loaded!');
});

// ============================================================================
// UTILITY: Add ripple CSS if not in stylesheet
// ============================================================================

(function addRippleStyles() {
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(212,175,55,0.8), transparent);
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            }

            @keyframes rippleAnimation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            @keyframes scrollReveal {
                from {
                    opacity: 0;
                    transform: translateY(30px) rotateX(45deg);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                }
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(40px) translateZ(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) translateZ(0);
                }
            }

            @keyframes scaleUp {
                from {
                    opacity: 0;
                    transform: scale(0.8) rotateX(90deg);
                }
                to {
                    opacity: 1;
                    transform: scale(1) rotateX(0deg);
                }
            }

            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-15px);
                }
            }
        `;
        document.head.appendChild(style);
    }
})();
