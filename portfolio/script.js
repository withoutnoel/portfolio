// Init AOS
AOS.init({ duration: 700, once: true, offset: 80 });

// ── THEME TOGGLE ─────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeIcon.className = 'ph-fill ph-moon';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeIcon.className = isLight ? 'ph-fill ph-moon' : 'ph-fill ph-sun';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ── SPOTLIGHT ─────────────────────────────────────────────
const spotlight = document.getElementById('spotlight');
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mousemove', e => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    spotlight.style.opacity = '1';
  });
  heroSection.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });
}

// ── TOAST + COPY EMAIL ────────────────────────────────────
const toast = document.getElementById('toast');
function showToast(msg) {
  toast.innerHTML = `<i class="ph-fill ph-check-circle"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(btn.dataset.copy).then(() => showToast('คัดลอก Email แล้ว!'));
  });
});

// ── SCROLL TEXT REVEAL ────────────────────────────────────
document.querySelectorAll('.about-text p').forEach(p => {
  const words = p.innerHTML.split(' ');
  p.classList.add('reveal-text');
  p.innerHTML = words.map((w, i) =>
    `<span class="word" style="transition-delay:${i * 0.04}s">${w}</span>`
  ).join(' ');
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));

// ── PROGRESS BAR ──────────────────────────────────────────
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

// ── CUSTOM CURSOR ─────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    follower.style.borderColor = 'rgba(167,139,250,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.borderColor = 'rgba(167,139,250,0.4)';
  });
});

// ── NAVBAR ────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── TYPEWRITER ────────────────────────────────────────────
const words = ['ณัชพล แก้วตีนแท่น', 'นักพัฒนารุ่นใหม่', 'Digital Creator', 'E-Commerce Builder', 'นัท'];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = words[wi];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── GLITCH on hero title ──────────────────────────────────
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  setInterval(() => {
    heroTitle.classList.add('glitch');
    setTimeout(() => heroTitle.classList.remove('glitch'), 200);
  }, 4000);
}

// ── PARTICLE CANVAS ───────────────────────────────────────
const canvas = document.createElement('canvas');
canvas.id = 'particles';
document.querySelector('.hero-bg').appendChild(canvas);
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(167,139,250,${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── TILT on project cards ─────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── MAGNETIC BUTTONS ──────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── RIPPLE on buttons ─────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ── COUNTER ANIMATION on stats ────────────────────────────
function animateCounter(el, target, decimals = 0, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = (ease * target).toFixed(decimals);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const decimals = el.dataset.decimals || 0;
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, decimals, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) statsObserver.observe(aboutSection);

// ── STAGGER tech cards ────────────────────────────────────
const techObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.tech-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 60);
      });
      entry.target.querySelectorAll('.tech-fill').forEach(bar => bar.classList.add('animated'));
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) techObserver.observe(skillsSection);

// ── ACTIVE NAV ────────────────────────────────────────────
const allSections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('nav-active', a.getAttribute('href') === `#${current}`);
  });
});
