/* ─── DOT CANVAS HERO BACKGROUND ────────────────────────── */
(function () {
  const canvas = document.getElementById('dotCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const GOLD = 'rgba(201,168,76,';
  let W, H, dots = [], mouse = { x: -999, y: -999 };
  const DOT_SPACING = 38;
  const MAX_DIST = 120;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(W / DOT_SPACING) + 1;
    const rows = Math.ceil(H / DOT_SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * DOT_SPACING,
          y: r * DOT_SPACING,
          baseAlpha: 0.07 + Math.random() * 0.06,
        });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      const dx = d.x - mouse.x, dy = d.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const glow = dist < MAX_DIST ? (1 - dist / MAX_DIST) * 0.65 : 0;
      const alpha = d.baseAlpha + glow;
      const radius = 1.2 + glow * 2.5;
      ctx.beginPath();
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + alpha + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  resize();
  draw();
})();

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
        let delay = 0;
        siblings.forEach(s => {
          if (s === entry.target || entry.target.contains(s) || s.contains(entry.target)) {
            setTimeout(() => s.classList.add('visible'), delay);
            delay += 80;
          }
        });
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* ─── NAVBAR SCROLL SHADOW ───────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();

/* ─── MOBILE MENU ────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
}

function closeMobile() {
  if (navMobile) navMobile.classList.remove('open');
}

/* ─── ACTIVE NAV LINK ────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--gold)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();
