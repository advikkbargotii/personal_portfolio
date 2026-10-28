const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header: border + compact once scrolled, hide on scroll down, show on scroll up
const header = document.querySelector('.site-header');
let lastY = window.scrollY;

const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    if (Math.abs(y - lastY) > 6) {
        header.classList.toggle('hidden', y > lastY && y > 160);
        lastY = y;
    }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Sliding underline under the nav link for the section in view
const nav = document.querySelector('.site-nav');
const navLinks = nav.querySelectorAll('a');
const indicator = document.createElement('span');
indicator.className = 'nav-indicator';
nav.appendChild(indicator);

function moveIndicator(link) {
    if (!link) {
        indicator.style.opacity = '0';
        return;
    }
    indicator.style.width = link.offsetWidth + 'px';
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    indicator.style.opacity = '1';
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        let activeLink = null;
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + entry.target.id;
            link.classList.toggle('active', isActive);
            if (isActive) activeLink = link;
        });
        moveIndicator(activeLink);
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
window.addEventListener('resize', () => moveIndicator(nav.querySelector('a.active')));

// Let the photo's hover transition take over once its entrance animation ends
const photo = document.querySelector('.intro-photo');
photo?.addEventListener('animationend', () => photo.classList.add('settled'), { once: true });

// Staggered fade-up for rows and blocks as they scroll into view
const revealTargets = document.querySelectorAll(
    '.section-head, .timeline-row, .project, .toolbox > div, .contact > *'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    const entering = entries.filter(entry => entry.isIntersecting);
    entering.forEach((entry, i) => {
        entry.target.style.setProperty('--i', Math.min(i, 6));
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// Count up the real numbers in the intro once, after the entrance
function countUp(el) {
    const to = parseFloat(el.dataset.to);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const format = n => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const duration = 1400;

    // Lock the width so the sentence doesn't reflow while digits change
    el.style.display = 'inline-block';
    el.style.minWidth = el.offsetWidth + 'px';

    const start = performance.now();
    const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(to * eased);
        if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = format(0);
    requestAnimationFrame(tick);
}

if (!reduceMotion) {
    setTimeout(() => document.querySelectorAll('.count').forEach(countUp), 500);
}

// Copy email to clipboard
document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.copy);
            button.textContent = 'Copied';
            button.classList.add('copied');
        } catch {
            button.textContent = 'Press ⌘C';
        }
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 1800);
    });
});

document.getElementById('year').textContent = new Date().getFullYear();
