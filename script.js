/* ── Init GSAP ───────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ── Nav: scroll class + progress bar ───────────── */
const nav = document.getElementById('main-nav');
const progress = document.getElementById('nav-progress');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrolled / total * 100) + '%';
  nav.classList.toggle('scrolled', scrolled > 40);
});

/* ── Nav burger ──────────────────────────────────── */
const burger = document.getElementById('nav-burger');
const mobileNav = document.getElementById('nav-mobile');
burger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

/* ── Particle canvas ─────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        alpha: Math.random() * 0.5 + 0.15,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,180,216,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
    });

    // Draw subtle wave lines
    const t = Date.now() / 4000;
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0,180,216,${0.04 + wave * 0.015})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 4) {
        const y = H * (0.55 + wave * 0.12) +
          Math.sin(x / 160 + t + wave) * 18 +
          Math.sin(x / 80 + t * 1.4) * 8;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

/* ── Hero entrance animation ─────────────────────── */
gsap.timeline({ delay: 0.2 })
  .from('.hero-eyebrow',  { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
  .from('.hero-title',    { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  .from('.hero-sub',      { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  .from('.hero-cta-group',{ opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' }, '-=0.3');

/* ── Generic section title reveals ──────────────── */
function revealOnScroll(selector, vars) {
  gsap.utils.toArray(selector).forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      duration: 0.8,
      ease: 'power3.out',
      ...vars,
    });
  });
}

revealOnScroll('.section-eyebrow, .section-eyebrow-light', { opacity: 0, y: 16 });
revealOnScroll('.section-title, .hook-title, .shift-title, .impact-title, .cta-title', { opacity: 0, y: 32 });
revealOnScroll('.section-sub, .hook-sub, .shift-sub, .impact-sub, .cta-sub',          { opacity: 0, y: 20 });

/* ── Persona cards ───────────────────────────────── */
gsap.utils.toArray('.persona-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 50,
    duration: 0.75,
    delay: i * 0.12,
    ease: 'power3.out',
  });
});

/* ── Hook stats ──────────────────────────────────── */
gsap.utils.toArray('.hook-stat').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 30,
    duration: 0.7,
    delay: i * 0.15,
    ease: 'power3.out',
  });
});

/* ── Struggle cards ──────────────────────────────── */
gsap.utils.toArray('.struggle-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    x: i % 2 === 0 ? -30 : 30,
    duration: 0.75,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});

/* ── Progress bars (struggle & resolution) ───────── */
function animateProgressBars(section) {
  const bars = document.querySelectorAll(`${section} .progress-bar-fill`);
  bars.forEach(bar => {
    const target = bar.style.getPropertyValue('--target') || bar.style['--target'];
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter: () => {
        bar.style.width = target;
      },
    });
  });
}
animateProgressBars('#struggle');
animateProgressBars('#resolution');

/* ── Shift cards ─────────────────────────────────── */
gsap.utils.toArray('.shift-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    scale: 0.93,
    duration: 0.7,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});

/* ── Resolution cards ────────────────────────────── */
gsap.utils.toArray('.resolution-quote').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
    opacity: 0,
    x: 30,
    duration: 0.7,
    delay: i * 0.12,
    ease: 'power3.out',
  });
});

gsap.from('.resolution-card', {
  scrollTrigger: { trigger: '.resolution-card', start: 'top 88%', toggleActions: 'play none none none' },
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: 'power3.out',
});

/* ── Stat cards ──────────────────────────────────── */
gsap.utils.toArray('.stat-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 40,
    duration: 0.75,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});

/* ── Count-up animation ──────────────────────────── */
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    onEnter: () => countUp(el),
  });
});

/* ── Success story card ──────────────────────────── */
gsap.from('.story-card', {
  scrollTrigger: { trigger: '.story-card', start: 'top 85%', toggleActions: 'play none none none' },
  opacity: 0,
  y: 50,
  duration: 0.9,
  ease: 'power3.out',
});
gsap.from('.story-pull-quote', {
  scrollTrigger: { trigger: '.story-pull-quote', start: 'top 88%', toggleActions: 'play none none none' },
  opacity: 0,
  x: -24,
  duration: 0.8,
  ease: 'power3.out',
});
gsap.utils.toArray('.story-metric').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 24,
    duration: 0.7,
    delay: i * 0.12,
    ease: 'power3.out',
  });
});

/* ── Architecture section ────────────────────────── */
gsap.from('.arch-title', {
  scrollTrigger: { trigger: '#architecture', start: 'top 85%', toggleActions: 'play none none none' },
  opacity: 0, y: 32, duration: 0.8, ease: 'power3.out',
});
gsap.from('.arch-sub', {
  scrollTrigger: { trigger: '#architecture', start: 'top 85%', toggleActions: 'play none none none' },
  opacity: 0, y: 20, duration: 0.8, delay: 0.15, ease: 'power3.out',
});
gsap.utils.toArray('.arch-row').forEach((row, i) => {
  gsap.from(row, {
    scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none none' },
    opacity: 0,
    x: -32,
    duration: 0.75,
    delay: i * 0.08,
    ease: 'power3.out',
  });
});
gsap.utils.toArray('.arch-trust-model').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: '.arch-trust', start: 'top 92%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 16,
    duration: 0.5,
    delay: i * 0.07,
    ease: 'power3.out',
  });
});

/* ── CTA button ──────────────────────────────────── */
gsap.from('.btn-cta', {
  scrollTrigger: { trigger: '.btn-cta', start: 'top 90%', toggleActions: 'play none none none' },
  opacity: 0,
  scale: 0.88,
  duration: 0.8,
  ease: 'back.out(1.8)',
});

/* ── Smooth anchor offset for sticky nav ─────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 68;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
