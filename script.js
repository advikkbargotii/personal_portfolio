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

// Active dock item highlight on scroll
window.addEventListener('scroll', () => {
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
        
        // Simulate form submission (replace with actual form handling)
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        
        // In a real implementation, you would send this data to a server
        // fetch('/submit-form', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => {
        //     // Handle response
        // });
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
    const isInternships = element.parentElement.querySelector('p').textContent === 'Internships';
    
    const timer = setInterval(() => {
        start += increment;
        if (isInternships) {
            element.textContent = Math.floor(start);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
        
        if (start >= target) {
            if (isInternships) {
                element.textContent = target;
            } else {
                element.textContent = target + '+';
            }
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


// Theme toggle (optional dark mode)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
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

// Solar System Animation Controller
class SolarSystem {
    constructor() {
        this.canvas = document.getElementById('solarSystem');
        this.ctx = this.canvas.getContext('2d');
        this.scaleFactor = 1;
        this.planets = [];
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createPlanets();
        this.animate();
    }

    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
    }

    createPlanets() {
        this.planets.push({ name: 'Mercury', radius: 4, distance: 70 });
        this.planets.push({ name: 'Venus', radius: 7, distance: 100 });
        this.planets.push({ name: 'Earth', radius: 8, distance: 140 });
        this.planets.push({ name: 'Mars', radius: 6, distance: 180 });
        this.planets.push({ name: 'Jupiter', radius: 14, distance: 240 });
        this.planets.push({ name: 'Saturn', radius: 12, distance: 280 });
        this.planets.push({ name: 'Uranus', radius: 10, distance: 320 });
        this.planets.push({ name: 'Neptune', radius: 10, distance: 360 });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

        const time = new Date();

        this.planets.forEach((planet, index) => {
            const angle = (time.getSeconds() + time.getMilliseconds() / 1000) * (index + 1) * 0.1;

            const x = Math.cos(angle) * planet.distance * this.scaleFactor;
            const y = Math.sin(angle) * planet.distance * this.scaleFactor;

            this.ctx.beginPath();
            this.ctx.arc(x, y, planet.radius * this.scaleFactor, 0, Math.PI * 2);
            this.ctx.fillStyle = this.getPlanetColor(planet.name);
            this.ctx.fill();
        });

        this.ctx.restore();
        requestAnimationFrame(() => this.animate());
    }

    getPlanetColor(name) {
        switch (name) {
            case 'Mercury': return '#b0b0b0';
            case 'Venus': return '#e5e5a0';
            case 'Earth': return '#3d89d9';
            case 'Mars': return '#a23f3f';
            case 'Jupiter': return '#d2a679';
            case 'Saturn': return '#e3b85b';
            case 'Uranus': return '#76d7d7';
            case 'Neptune': return '#3d59d9';
        }
        return '#ffffff';
    }
}

// Initialize the solar system
window.addEventListener('DOMContentLoaded', () => {
    new SolarSystem();
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
