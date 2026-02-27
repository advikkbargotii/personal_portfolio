// Smooth scrolling for dock navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll: active dock + progress bar + scroll indicator
window.addEventListener('scroll', () => {
    // Active dock item
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });

    // Scroll progress bar
    const bar = document.querySelector('.scroll-progress');
    if (bar) {
        const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = pct + '%';
    }

    // Hide scroll indicator once user scrolls
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        if (window.scrollY > 60) {
            indicator.style.opacity = '0';
            indicator.style.pointerEvents = 'none';
        } else {
            indicator.style.opacity = '';
            indicator.style.pointerEvents = '';
        }
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:advikbargoti@arizona.edu?subject=${subject}&body=${body}`;
        this.reset();
    });
}


// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Bento grid mouse-tracking glow effect
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.bento-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            item.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
});

// Background paths for Languages & Infrastructure card
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.bento-paths-bg');
    if (!container) return;

    function generatePaths(position) {
        return Array.from({ length: 36 }, (_, i) => {
            const p = position;
            const d = `M-${380 - i * 5 * p} -${189 + i * 6}C-${380 - i * 5 * p} -${189 + i * 6} -${312 - i * 5 * p} ${216 - i * 6} ${152 - i * 5 * p} ${343 - i * 6}C${616 - i * 5 * p} ${470 - i * 6} ${684 - i * 5 * p} ${875 - i * 6} ${684 - i * 5 * p} ${875 - i * 6}`;
            return { d, opacity: 0.1 + i * 0.03, width: 0.5 + i * 0.03, duration: 20 + Math.random() * 10 };
        });
    }

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 696 316');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    [1, -1].forEach(pos => {
        generatePaths(pos).forEach(p => {
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', p.d);
            path.setAttribute('stroke', 'currentColor');
            path.setAttribute('stroke-width', String(p.width));
            path.setAttribute('stroke-opacity', String(p.opacity));
            path.setAttribute('pathLength', '1');
            path.style.animationDuration = `${p.duration}s`;
            svg.appendChild(path);
        });
    });

    container.appendChild(svg);
});

// About section mockup animations
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');

            const decorative = entry.target.querySelector('.mockup-decorative');
            const main = entry.target.querySelector('.mockup-main');
            if (decorative) decorative.style.transform = 'translateY(-30px)';
            if (main) main.style.transform = 'translateY(30px)';
        }
    });
}, { threshold: 0.2, rootMargin: '0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animate="fade-up"]').forEach(el => {
        aboutObserver.observe(el);
    });
});

// Skills animation counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + '+';

        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        }
    }, 16);
}

// Animate counters when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h3');
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});


// Add scroll to top button
function createScrollToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top gradient-btn gradient-btn-round';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        z-index: 1000;
        --color-1: #000022;
        --color-2: #1f3f6d;
        --color-3: #469396;
        --color-4: #f1ffa5;
        --border-angle: 200deg;
        --border-color-1: hsla(320, 75%, 90%, 0.6);
        --border-color-2: hsla(320, 50%, 90%, 0.15);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Scroll indicator click — scroll to about section
document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.addEventListener('click', () => {
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Hero mouse parallax on shapes (starts after entrance animations)
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.elegant-shape');
    if (!hero || !shapes.length) return;

    function applyParallax(e) {
        const rect = hero.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        shapes.forEach((shape, i) => {
            const depth = (i + 1) * 7;
            shape.style.setProperty('--shape-tx', `${dx * depth}px`);
            shape.style.setProperty('--shape-ty', `${dy * depth}px`);
        });
    }

    function resetParallax() {
        shapes.forEach(shape => {
            shape.style.setProperty('--shape-tx', '0px');
            shape.style.setProperty('--shape-ty', '0px');
        });
    }

    // Delay so entrance animations complete first
    setTimeout(() => {
        hero.addEventListener('mousemove', applyParallax);
        hero.addEventListener('mouseleave', resetParallax);
    }, 3000);
});

// Rotating typed text in hero badge
document.addEventListener('DOMContentLoaded', () => {
    const roles = ['AI Engineer', 'Full-Stack Developer', 'ML Engineer', 'Automation Engineer'];
    const el = document.querySelector('.badge-text');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = roles[roleIndex];
        charIndex += isDeleting ? -1 : 1;
        el.textContent = current.substring(0, charIndex);

        let delay = isDeleting ? 50 : 90;

        if (!isDeleting && charIndex === current.length) {
            delay = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    // Start after badge animation completes
    setTimeout(type, 2800);
});

// Evervault Card Effects
document.addEventListener('DOMContentLoaded', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function randomStr(len) {
        let s = '';
        for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
        return s;
    }

    document.querySelectorAll('.ev-card').forEach(card => {
        const charsLayer = card.querySelector('.ev-chars-layer');
        const charsOverlay = card.querySelector('.ev-chars-overlay');
        const area = card.querySelector('.ev-card-area');

        if (charsLayer) {
            const p = document.createElement('p');
            p.textContent = randomStr(1500);
            charsLayer.appendChild(p);
        }
        if (charsOverlay) {
            const p = document.createElement('p');
            p.textContent = randomStr(1500);
            charsOverlay.appendChild(p);
        }

        if (area) {
            area.addEventListener('mousemove', (e) => {
                const rect = area.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                card.style.setProperty('--ev-mx', mx + 'px');
                card.style.setProperty('--ev-my', my + 'px');

                if (charsLayer && charsLayer.firstChild) charsLayer.firstChild.textContent = randomStr(1500);
                if (charsOverlay && charsOverlay.firstChild) charsOverlay.firstChild.textContent = randomStr(1500);
            });
        }
    });
});

// Project Carousel
document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('projectCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    if (!viewport) return;

    const slides = viewport.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    const slideWidth = 340; // card width + gap

    // Generate dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => {
            slides[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    // Update active dot and arrow states on scroll
    function updateState() {
        const scrollLeft = viewport.scrollLeft;
        const activeIndex = Math.round(scrollLeft / slideWidth);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
        prevBtn.disabled = scrollLeft <= 10;
        nextBtn.disabled = scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 10;
    }

    viewport.addEventListener('scroll', updateState, { passive: true });
    updateState();

    prevBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });
});
