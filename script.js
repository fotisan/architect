// script.js

// Mobile menu toggle
const btn = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');

function setExpanded(isOpen){
  if(!btn || !menu) return;

  btn.setAttribute('aria-expanded', String(isOpen));
  menu.hidden = !isOpen;

  const lines = btn.querySelectorAll('span');
  if(isOpen){
    lines[0].style.top = '21px';
    lines[0].style.transform = 'rotate(45deg)';
    lines[1].style.opacity = '0';
    lines[2].style.top = '21px';
    lines[2].style.transform = 'rotate(-45deg)';
  } else {
    lines[0].style.top = '16px';
    lines[0].style.transform = 'rotate(0deg)';
    lines[1].style.opacity = '.9';
    lines[2].style.top = '26px';
    lines[2].style.transform = 'rotate(0deg)';
  }
}

/* FIX #2: force closed on load (prevents “auto open” on mobile) */
setExpanded(false);

if(btn){
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    setExpanded(!open);
  });
}

if(menu){
  // Close menu on link click
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(!a) return;
    setExpanded(false);
  });
}

/* Optional hard reset when leaving mobile breakpoint */
let lastIsMobile = window.matchMedia('(max-width: 820px)').matches;
window.addEventListener('resize', () => {
  const isMobile = window.matchMedia('(max-width: 820px)').matches;
  if(lastIsMobile && !isMobile){
    setExpanded(false);
  }
  lastIsMobile = isMobile;
}, { passive: true });

// Smooth scroll for in page anchors
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href');
  if(!id || id === '#') return;
  const el = document.querySelector(id);
  if(!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Reveal on scroll
const reveals = Array.from(document.querySelectorAll('.reveal'));
const io = new IntersectionObserver((entries) => {
  for(const entry of entries){
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// Demo form toast
const form = document.getElementById('contactForm');

function toast(message){
  const t = document.createElement('div');
  t.textContent = message;
  t.style.position = 'fixed';
  t.style.left = '50%';
  t.style.bottom = '22px';
  t.style.transform = 'translateX(-50%)';
  t.style.padding = '12px 14px';
  t.style.borderRadius = '16px';
  t.style.border = '1px solid rgba(255,255,255,.16)';
  t.style.background = 'rgba(0,0,0,.55)';
  t.style.backdropFilter = 'blur(14px)';
  t.style.color = 'rgba(255,255,255,.90)';
  t.style.fontSize = '13px';
  t.style.boxShadow = '0 18px 60px rgba(0,0,0,.45)';
  t.style.zIndex = '999';
  t.style.maxWidth = 'min(560px, calc(100% - 30px))';
  t.style.textAlign = 'center';
  t.style.opacity = '0';
  t.style.transition = 'opacity .25s ease, transform .25s ease';
  document.body.appendChild(t);

  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(-2px)';
  });

  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(6px)';
    setTimeout(() => t.remove(), 260);
  }, 2400);
}

if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toast('Thanks. This is a demo form, but the intent is real.');
    form.reset();
  });
}

/* FIX #3: Back to top arrow (appears after a little scroll) */
const toTop = document.getElementById('toTop');

if(toTop){
  let ticking = false;

  const updateToTop = () => {
    const show = window.scrollY > 420;
    toTop.classList.toggle('show', show);
  };

  updateToTop();

  window.addEventListener('scroll', () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateToTop();
      ticking = false;
    });
  }, { passive: true });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
