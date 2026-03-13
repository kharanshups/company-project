// PEW Vizag – main.js

/* ---- Navbar: transparent → solid on scroll ---- */
const header = document.getElementById('main-header');

function handleScroll() {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
    header.classList.remove('transparent');
  } else {
    header.classList.remove('scrolled');
    header.classList.add('transparent');
  }
}

header.classList.add('transparent');
window.addEventListener('scroll', handleScroll, { passive: true });

/* ---- Mobile hamburger menu ---- */
const hamburger = document.getElementById('hamburger-btn');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close menu on nav link click (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

/* ---- Smooth scroll for on-page anchor ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Intersection Observer: fade-in sections ---- */
const fadeEls = document.querySelectorAll('.about-section, .stat-card, .vm-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

/* 'visible' class triggers animation */
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible { opacity: 1 !important; transform: translateY(0) !important; }
  </style>
`);

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `${current}.html`) {
      link.classList.add('active');
    }
  });
}, { passive: true });
