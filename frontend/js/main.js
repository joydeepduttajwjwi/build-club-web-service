// ============ CONFIG ============
const API_BASE = window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : 'https://build-club-web-service.onrender.com/api';
const ASSET_BASE = API_BASE.replace(/\/api$/, '');
let SITE_CONTENT = {};
let GALLERY_GROUPS = {};

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function assetURL(value = '') {
  if (!value) return '';
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  return `${ASSET_BASE}${value.startsWith('/') ? value : `/${value}`}`;
}

// ============ LOADER ============
window.addEventListener('load', () => {
  const progress = document.getElementById('loaderProgress');
  const loader = document.getElementById('loader');
  setTimeout(() => { progress.style.transform = 'scaleX(1)'; }, 100);
  setTimeout(() => {
    gsap.to(loader, { opacity: 0, duration: 0.6, ease: 'power2.inOut', onComplete: () => {
      loader.style.display = 'none';
      initAnimations();
    }});
  }, 1400);
});

// ============ CURSOR ============
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX - 6, y: mouseY - 6, duration: 0.1 });
});

function animateRing() {
  ringX += (mouseX - ringX - 20) * 0.12;
  ringY += (mouseY - ringY - 20) * 0.12;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .domain-card, .event-card, .project-card, .team-card, .pillar').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ============ NAV ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

function openMobileNav() { document.getElementById('mobileNav').classList.add('open'); }
function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); }
document.getElementById('mobileClose').addEventListener('click', closeMobileNav);
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  closeMobileNav();
}

const savedTheme = localStorage.getItem('buildclubTheme') || 'light';
document.documentElement.dataset.theme = savedTheme;
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.textContent = savedTheme === 'dark' ? '☀' : '☾';
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('buildclubTheme', next);
    themeToggle.textContent = next === 'dark' ? '☀' : '☾';
  });
}

// ============ ENHANCED GSAP ANIMATIONS (APPLE-STYLE) ============
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Set initial states for all animated elements
  gsap.set('.stat-item', { y: 40, opacity: 0 });
  gsap.set('.section-tag', { y: 30, opacity: 0 });
  gsap.set('.section-title', { y: 40, opacity: 0 });
  gsap.set('.section-subtitle', { y: 30, opacity: 0 });
  gsap.set('.domain-card', { y: 50, opacity: 0 });
  gsap.set('.event-card', { y: 60, opacity: 0 });
  gsap.set('.project-card', { y: 40, opacity: 0 });
  gsap.set('.team-card', { y: 50, opacity: 0 });
  gsap.set('.roadmap-step', { x: -40, opacity: 0 });
  gsap.set('.gallery-item', { scale: 0.8, opacity: 0 });
  gsap.set('#aboutVisual', { x: -80, opacity: 0 });
  gsap.set('#aboutText', { x: 40, opacity: 0 });
  gsap.set('#contactInfo', { x: -30, opacity: 0 });
  gsap.set('#contactForm', { x: 30, opacity: 0 });

  // Hero Animation Timeline (Apple-style smooth reveal)
  const tl = gsap.timeline({ delay: 0.1 });
  tl.to('#heroBadge', { 
    opacity: 1, 
    y: 0, 
    duration: 0.8, 
    ease: 'power3.out' 
  })
  .to('#heroTitle', { 
    opacity: 1, 
    y: 0, 
    duration: 1, 
    ease: 'power3.out' 
  }, '-=0.5')
  .to('#heroSub', { 
    opacity: 1, 
    y: 0, 
    duration: 0.8, 
    ease: 'power3.out' 
  }, '-=0.6')
  .to('#heroCtas', { 
    opacity: 1, 
    y: 0, 
    duration: 0.7, 
    ease: 'power3.out' 
  }, '-=0.4');

  // Stats counter animation
  gsap.utils.toArray('.stat-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: i * 0.1, 
          ease: 'power3.out' 
        });
        // Animate counter
        const valueEl = el.querySelector('.stat-value');
        if (valueEl && valueEl.textContent.includes('+')) {
          const target = parseInt(valueEl.textContent) || 0;
          animateValue(valueEl, 0, target, 1500);
        }
      }
    });
  });

  // About section with enhanced reveal
  ScrollTrigger.create({
    trigger: '#aboutVisual',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('#aboutVisual', { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out' 
      });
    }
  });
  ScrollTrigger.create({
    trigger: '#aboutText',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('#aboutText', { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out' 
      });
    }
  });

  // Section headers with stagger
  gsap.utils.toArray('.section-tag, .section-title, .section-subtitle').forEach(el => {
    if (!el.style.opacity || el.style.opacity === '0') {
      ScrollTrigger.create({
        trigger: el, 
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, { 
            opacity: 1, 
            y: 0, 
            duration: 0.7, 
            ease: 'power3.out' 
          });
        }
      });
    }
  });

  // Domain cards with enhanced hover
  gsap.utils.toArray('.domain-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, 
      start: 'top 90%',
      onEnter: () => {
        gsap.to(card, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: i * 0.05, 
          ease: 'power3.out' 
        });
      }
    });
  });

  // Event cards with staggered reveal
  gsap.utils.toArray('.event-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, 
      start: 'top 90%',
      onEnter: () => {
        gsap.to(card, { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          delay: i * 0.12, 
          ease: 'power3.out' 
        });
      }
    });
  });

  // Project cards
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, 
      start: 'top 90%',
      onEnter: () => {
        gsap.to(card, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: i * 0.08, 
          ease: 'power3.out' 
        });
      }
    });
  });

  // Team cards
  gsap.utils.toArray('.team-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, 
      start: 'top 90%',
      onEnter: () => {
        gsap.to(card, { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          delay: i * 0.1, 
          ease: 'power3.out' 
        });
      }
    });
  });

  // Roadmap steps
  gsap.utils.toArray('.roadmap-step').forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step, 
      start: 'top 85%',
      onEnter: () => {
        gsap.to(step, { 
          opacity: 1, 
          x: 0, 
          duration: 0.7, 
          delay: i * 0.15, 
          ease: 'power3.out' 
        });
      }
    });
  });

  // Gallery items
  gsap.utils.toArray('.gallery-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el, 
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.7, 
          delay: i * 0.08, 
          ease: 'back.out(1.4)' 
        });
      }
    });
  });

  // Contact section
  ScrollTrigger.create({
    trigger: '#contactInfo', 
    start: 'top 85%',
    onEnter: () => {
      gsap.to('#contactInfo', { 
        opacity: 1, 
        x: 0, 
        duration: 0.9, 
        ease: 'power3.out' 
      });
    }
  });
  ScrollTrigger.create({
    trigger: '#contactForm', 
    start: 'top 85%',
    onEnter: () => {
      gsap.to('#contactForm', { 
        opacity: 1, 
        x: 0, 
        duration: 0.9, 
        delay: 0.15, 
        ease: 'power3.out' 
      });
    }
  });

  // ============ ENHANCED PARALLAX EFFECTS ============
  
  // Hero glow parallax
  gsap.to('.hero-glow', {
    y: 150,
    ease: 'none',
    scrollTrigger: { 
      trigger: '#hero', 
      start: 'top top', 
      end: 'bottom top', 
      scrub: 1 
    }
  });

  // Hero grid parallax (opposite direction)
  gsap.to('.hero-grid-bg', {
    y: -80,
    ease: 'none',
    scrollTrigger: { 
      trigger: '#hero', 
      start: 'top top', 
      end: 'bottom top', 
      scrub: 1.5 
    }
  });

  // About visual parallax
  gsap.to('#about .about-visual', {
    y: -60,
    ease: 'none',
    scrollTrigger: { 
      trigger: '#about', 
      start: 'top bottom', 
      end: 'bottom top', 
      scrub: 1.2 
    }
  });

  // Floating cards subtle animation
  gsap.to('.floating-card', {
    y: -15,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.3
  });

  // Section background parallax
  gsap.utils.toArray('#domains, #projects, #roadmap, #contact').forEach(section => {
    gsap.to(section, {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  // ============ MICRO-INTERACTIONS ============
  
  // Button ripple effect
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size/2 + 'px';
      ripple.style.top = e.clientY - rect.top - size/2 + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframes
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Card tilt effect on hover
  document.querySelectorAll('.event-card, .project-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Counter animation helper
function animateValue(el, start, end, duration) {
  const startTime = performance.now();
  const isPlus = el.textContent.includes('+');
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.round(start + (end - start) * easeProgress);
    el.textContent = current + (isPlus ? '+' : '');
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// ============ DATA FETCHING ============
async function fetchData() {
  try {
    const res = await fetch(`${API_BASE}/data`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    renderAll(data);
  } catch (e) {
    // Fallback to embedded data
    renderAll(FALLBACK_DATA);
  }
}

function renderAll(data) {
  const content = { ...FALLBACK_DATA.siteContent, ...(data.siteContent || {}) };
  SITE_CONTENT = content;
  renderSiteContent(content);
  renderStats(content.stats || FALLBACK_DATA.siteContent.stats);
  renderEvents(data.events || []);
  renderProjects(data.projects || []);
  renderTeam(data.team || []);
  renderDomains(data.domains || FALLBACK_DATA.domains);
  renderRoadmap(content.roadmap || FALLBACK_DATA.siteContent.roadmap);
  renderGallery(data.gallery || FALLBACK_DATA.gallery);
  animateCounter();
}

function renderSiteContent(content) {
  const heroLines = String(content.heroTagline || 'Walk in. Build. Learn.').split('.').map(part => part.trim()).filter(Boolean);
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    heroTitle.innerHTML = heroLines.map((line, index) => {
      const text = index === 1 ? `<span class="accent-word">${escapeHTML(line)}.</span>` : `${escapeHTML(line)}.`;
      return `<span class="line">${text}</span>`;
    }).join('');
  }

  const heroBadge = document.getElementById('heroBadge');
  if (heroBadge) heroBadge.innerHTML = `<div class="hero-badge-dot"></div>${escapeHTML(content.heroSubtitle)}`;

  const logoIcon = document.querySelector('.nav-logo-icon');
  if (logoIcon) logoIcon.innerHTML = content.logoImage ? `<img src="${escapeHTML(assetURL(content.logoImage))}" alt="${escapeHTML(content.logoText || 'Build Club')}">` : escapeHTML(content.logoIcon || '⚡');
  const navLogoText = document.getElementById('navLogoText');
  if (navLogoText) navLogoText.textContent = content.logoText || 'Build Club';

  const heroSub = document.getElementById('heroSub');
  if (heroSub) heroSub.textContent = content.heroDescription || FALLBACK_DATA.siteContent.heroDescription;

  const aboutBody = document.getElementById('aboutBody');
  if (aboutBody) aboutBody.textContent = content.aboutText || '';

  const contactTitle = document.querySelector('.contact-info-title');
  if (contactTitle) contactTitle.innerHTML = escapeHTML(content.contactTitle || 'Ready to Build?').replace(/\s+/g, '<br>');

  const contactBody = document.querySelector('.contact-info-body');
  if (contactBody) contactBody.textContent = content.contactText || FALLBACK_DATA.siteContent.contactText;

  const contactValues = document.querySelectorAll('.contact-link-val');
  if (contactValues[0]) contactValues[0].textContent = content.location || 'St. Anthony\'s College, Shillong';
  if (contactValues[1]) contactValues[1].textContent = content.community || 'Discord Build Club Server';
  if (contactValues[2]) contactValues[2].textContent = content.openHours || '24x7 - Walk in anytime';

  const discordLink = document.getElementById('discordLink');
  if (discordLink) discordLink.href = content.discordUrl || 'https://discord.gg/SjnfXMTS';
}

// ============ STATS ============
function renderStats(stats) {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = stats.map((s, i) => `
    <div class="stat-item" style="transform:translateY(20px)">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

// ============ DOMAINS ============
const DOMAINS = [
  { name: 'General Electronics', icon: '⚡', num: '01' },
  { name: 'Internet of Things', icon: '🌐', num: '02' },
  { name: 'Communications', icon: '📡', num: '03' },
  { name: 'Power Electronics', icon: '🔋', num: '04' },
  { name: 'Robotics', icon: '🤖', num: '05' },
  { name: 'Control Systems', icon: '🎛️', num: '06' },
  { name: 'PCB Design', icon: '🖥️', num: '07' },
  { name: 'Computer Aided Design', icon: '📐', num: '08' },
  { name: 'Mechanics', icon: '⚙️', num: '09' },
  { name: 'Software Builds', icon: '💻', num: '10' },
];

function renderDomains(domains = DOMAINS) {
  const grid = document.getElementById('domainsGrid');
  grid.innerHTML = domains.map((d, i) => `
    <div class="domain-card" style="transform:translateY(30px)" data-index="${i}">
      <div class="domain-num">${escapeHTML(d.num || String(i + 1).padStart(2, '0'))}</div>
      <div class="domain-icon">${escapeHTML(d.icon || '*')}</div>
      <div class="domain-name">${escapeHTML(d.name)}</div>
    </div>
  `).join('');

  // Animate domains in
  gsap.utils.toArray('.domain-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, start: 'top 85%',
      onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.04, ease: 'power3.out' })
    });
  });
}

// ============ EVENTS ============
function renderEvents(events) {
  const grid = document.getElementById('eventsGrid');
  if (!events.length) {
    grid.innerHTML = `<div class="events-empty"><div style="font-size:40px;margin-bottom:16px">📅</div><p>No events yet. Check back soon!</p></div>`;
    return;
  }

  grid.innerHTML = events.map((evt, i) => {
    const date = new Date(evt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const tags = (evt.tags || []).map(t => `<span class="event-tag">${escapeHTML(t)}</span>`).join('');
    const img = evt.image ? `<img src="${escapeHTML(assetURL(evt.image))}" alt="${escapeHTML(evt.title)}" loading="lazy">` : `<div class="event-img-placeholder">Build</div>`;
    return `
      <div class="event-card" style="transform:translateY(40px)" data-id="${escapeHTML(evt.id)}">
        <div class="event-img">
          ${img}
          <span class="event-category">${escapeHTML(evt.category || 'Event')}</span>
        </div>
        <div class="event-body">
          <div class="event-date">${date}</div>
          <div class="event-title">${escapeHTML(evt.title)}</div>
          <div class="event-desc">${escapeHTML(evt.description)}</div>
          <div class="event-tags">${tags}</div>
        </div>
      </div>
    `;
  }).join('');

  gsap.utils.toArray('.event-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, start: 'top 85%',
      onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out' })
    });
  });
}

function renderEvents(events) {
  const grid = document.getElementById('eventsGrid');
  if (!events.length) {
    grid.innerHTML = `<div class="events-empty"><p>No events yet. Check back soon!</p></div>`;
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = [];
  const completed = [];
  events.forEach(evt => {
    const status = evt.status || (new Date(evt.date) >= today ? 'upcoming' : 'completed');
    if (status === 'completed') completed.push(evt);
    else upcoming.push(evt);
  });

  function eventCard(evt) {
    const date = new Date(evt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const tags = (evt.tags || []).map(t => `<span class="event-tag">${escapeHTML(t)}</span>`).join('');
    const img = evt.image ? `<img src="${escapeHTML(assetURL(evt.image))}" alt="${escapeHTML(evt.title)}" loading="lazy">` : `<div class="event-img-placeholder">Build</div>`;
    return `
      <div class="event-card" style="transform:translateY(40px)" data-id="${escapeHTML(evt.id)}">
        <div class="event-img">
          ${img}
          <span class="event-category">${escapeHTML(evt.category || 'Event')}</span>
        </div>
        <div class="event-body">
          <div class="event-date">${date}</div>
          <div class="event-title">${escapeHTML(evt.title)}</div>
          <div class="event-desc">${escapeHTML(evt.description)}</div>
          <div class="event-tags">${tags}</div>
        </div>
      </div>
    `;
  }

  function eventSection(title, label, list) {
    return `
      <div class="event-section">
        <div class="event-section-title">${title}<span>${label}</span></div>
        <div class="events-grid">${list.length ? list.map(eventCard).join('') : `<div class="events-empty"><p>No ${title.toLowerCase()} yet.</p></div>`}</div>
      </div>
    `;
  }

  grid.className = 'events-sections';
  grid.innerHTML = eventSection('Coming Up', 'Events & Workshops', upcoming) + eventSection('Completed', 'Done & Archived', completed);

  gsap.utils.toArray('.event-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, start: 'top 85%',
      onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out' })
    });
  });
}

// ============ PROJECTS ============
function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!projects.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">No projects yet.</div>`;
    return;
  }

  grid.innerHTML = projects.map((p, i) => {
    const tech = (p.tech || []).map(t => `<span class="tech-chip">${escapeHTML(t)}</span>`).join('');
    const isComplete = p.status === 'completed';
    return `
      <div class="project-card" style="transform:translateY(30px)" data-id="${escapeHTML(p.id)}">
        <div class="project-domain-badge">${escapeHTML(p.domain)}</div>
        <div class="project-title">${escapeHTML(p.title)}</div>
        <div class="project-desc">${escapeHTML(p.description)}</div>
        <div class="project-tech">${tech}</div>
        <div class="project-status">
          <div class="status-dot ${p.status}"></div>
          <span class="status-text ${p.status}">${isComplete ? 'Completed' : 'In Progress'}</span>
        </div>
      </div>
    `;
  }).join('');

  gsap.utils.toArray('.project-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, start: 'top 85%',
      onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.07, ease: 'power3.out' })
    });
  });
}

// ============ TEAM ============
function renderTeam(team) {
  const grid = document.getElementById('teamGrid');
  if (!team.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">Team info coming soon.</div>`;
    return;
  }

  grid.innerHTML = team.map((m, i) => {
    const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const avatarContent = m.avatar
      ? `<img src="${escapeHTML(assetURL(m.avatar))}" alt="${escapeHTML(m.name)}">`
      : escapeHTML(initials);
    return `
      <div class="team-card" style="transform:translateY(30px)" data-id="${escapeHTML(m.id)}">
        <div class="team-avatar">${avatarContent}</div>
        <div class="team-role">${escapeHTML(m.role)}</div>
        <div class="team-name">${escapeHTML(m.name)}</div>
        <div class="team-meta">${escapeHTML(m.year)} · ${escapeHTML(m.dept)}</div>
        <div class="team-bio">${escapeHTML(m.bio)}</div>
      </div>
    `;
  }).join('');

  gsap.utils.toArray('.team-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card, start: 'top 85%',
      onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out' })
    });
  });
}

// ============ ROADMAP ============
const ROADMAP = [
  { stage: 'Stage 1', title: 'Pre-Launch', desc: 'Core team assembled, infrastructure ready, membership drive, workshop prep.', active: false },
  { stage: 'Stage 2', title: 'Build Club Launch', desc: 'Two-day hands-on kickoff workshop across all domains. Simple projects to ignite momentum.', active: true },
  { stage: 'Stage 3', title: 'Takes Off', desc: 'Core team takes ownership. Open hours set. Calendar of events. Projects released to community.', active: false },
  { stage: 'Future', title: 'Domain Specific Programs', desc: 'Robotics, IC Design, VR Learning, Finishing Schools & Competitions at national level.', active: false },
];

function renderRoadmap(roadmap = ROADMAP) {
  const container = document.getElementById('roadmapSteps');
  container.innerHTML = '<div class="roadmap-line"></div>';
  roadmap.forEach((step, i) => {
    const el = document.createElement('div');
    el.className = `roadmap-step${step.active ? ' active' : ''}`;
    el.style.transform = 'translateX(-30px)';
    el.innerHTML = `
      <div class="step-num">${i + 1}</div>
      <div class="step-content">
        <div class="step-label">${escapeHTML(step.stage)}</div>
        <div class="step-title">${escapeHTML(step.title)}</div>
        <div class="step-desc">${escapeHTML(step.desc)}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

// ============ GALLERY ============
function renderGallery(gallery = []) {
  const grid = document.getElementById('galleryGrid');
  const items = gallery.length ? gallery : FALLBACK_DATA.gallery;
  GALLERY_GROUPS = items.reduce((groups, item) => {
    const category = item.category || item.title || 'Club Highlights';
    groups[category] = groups[category] || [];
    groups[category].push(item);
    return groups;
  }, {});
  const tiles = Object.entries(GALLERY_GROUPS).map(([category, photos], index) => {
    const featured = photos.find(photo => photo.featured && photo.image) || photos.find(photo => photo.image) || photos[0];
    return { category, photos, featured, large: Boolean(featured?.featured) || index === 0 };
  });

  grid.innerHTML = tiles.map((tile, i) => {
    const categoryParam = encodeURIComponent(tile.category);
    return `
    <div class="gallery-item${tile.large ? ' large' : ''}" style="transform:scale(0.9)" role="button" tabindex="0" onclick="openPhotoGroup(decodeURIComponent('${categoryParam}'))" onkeydown="if(event.key==='Enter'){openPhotoGroup(decodeURIComponent('${categoryParam}'))}">
      ${tile.featured?.image ? `<img src="${escapeHTML(assetURL(tile.featured.image))}" alt="${escapeHTML(tile.category)}" loading="lazy">` : `<span>${escapeHTML(tile.category)}</span>`}
      <div class="gallery-label"><strong>${escapeHTML(tile.category)}</strong><span class="gallery-count">${tile.photos.length} photo${tile.photos.length === 1 ? '' : 's'}</span></div>
    </div>
  `;
  }).join('');

  gsap.utils.toArray('.gallery-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      onEnter: () => gsap.to(el, { opacity: 1, scale: 1, duration: 0.6, delay: i * 0.06, ease: 'back.out(1.5)' })
    });
  });
}

function openPhotoGroup(category) {
  const photos = GALLERY_GROUPS[category] || [];
  const modal = document.getElementById('photoModal');
  const title = document.getElementById('photoModalTitle');
  const grid = document.getElementById('photoModalGrid');
  if (!modal || !title || !grid) return;
  title.textContent = `${category} Photos`;
  grid.innerHTML = photos.map(photo => `
    <div class="photo-modal-card">
      ${photo.image ? `<img src="${escapeHTML(assetURL(photo.image))}" alt="${escapeHTML(photo.title || category)}">` : ''}
      <div>${escapeHTML(photo.title || category)}</div>
    </div>
  `).join('');
  modal.classList.add('open');
}

function closePhotoModal() {
  const modal = document.getElementById('photoModal');
  if (modal) modal.classList.remove('open');
}
window.openPhotoGroup = openPhotoGroup;
window.closePhotoModal = closePhotoModal;

// ============ COUNTER ANIMATION ============
function animateCounter() {
  const el = document.getElementById('projectCounter');
  if (!el) return;
  ScrollTrigger.create({
    trigger: el, start: 'top 80%',
    onEnter: () => {
      let count = 0;
      const stat = (FALLBACK_DATA.siteContent.stats || []).find(s => /project/i.test(s.label));
      const target = parseInt(stat?.value, 10) || 20;
      const interval = setInterval(() => {
        count++;
        el.textContent = count + '+';
        if (count >= target) clearInterval(interval);
      }, 50);
    }
  });
}

// ============ FORM ============
async function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {}

  const emailForm = document.createElement('form');
  emailForm.action = `https://formsubmit.co/${SITE_CONTENT.contactEmail || 'sacbuild2@gmail.com'}`;
  emailForm.method = 'POST';
  emailForm.target = 'contactEmailFrame';
  const fields = {
    _subject: 'New Build Club website message',
    _captcha: 'false',
    name: payload.name || '',
    email: payload.email || '',
    department: payload.department || '',
    message: payload.message || ''
  };
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    emailForm.appendChild(input);
  });
  document.body.appendChild(emailForm);
  emailForm.submit();
  emailForm.remove();

  showToast('Message sent. We will get back to you soon.', 'success');
  form.reset();
}

// ============ TOAST ============
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ============ FALLBACK DATA ============
const FALLBACK_DATA = {
  events: [
    { id: 'e1', title: 'Build Club Launch Workshop', date: '2025-02-15', category: 'Workshop', description: 'Two-day hands-on kickoff across robotics, IoT, power electronics and software. Simple projects to ignite momentum.', image: '', tags: ['Robotics', 'IoT', 'Electronics'] },
    { id: 'e2', title: 'Line-Bot Robotics Challenge', date: '2025-03-08', category: 'Competition', description: 'Teams competed to build the fastest line-following robot using ESP32 C-6 dev boards and custom PCB designs.', image: '', tags: ['Robotics', 'Competition'] },
    { id: 'e3', title: 'PCB Design Bootcamp', date: '2025-04-01', category: 'Workshop', description: 'Hands-on PCB design session using open-source EDA tools. Schematic, layout, design for manufacture.', image: '', tags: ['PCB', 'Design'] },
  ],
  projects: [
    { id: 'p1', title: 'Smart Flow', domain: 'IoT', description: 'IoT-based water flow monitoring using ESP32 and ThingSpeak. Real-time visualization on mobile.', tech: ['ESP32', 'ThingSpeak'], status: 'completed' },
    { id: 'p2', title: 'Line-Bot', domain: 'Robotics', description: 'Autonomous line-following robot with PID control for inter-college circuits.', tech: ['ESP32', 'PID Control'], status: 'completed' },
    { id: 'p3', title: 'Inverse Teleprompter', domain: 'Communications', description: 'Wireless speech-to-text teleprompter using ESPNOW for low-latency comms.', tech: ['ESP-NOW', 'Display'], status: 'completed' },
    { id: 'p4', title: 'Step It Up', domain: 'Power Electronics', description: 'Boost converter with variable duty cycle control built on breadboard.', tech: ['PWM', 'Analog'], status: 'completed' },
    { id: 'p5', title: 'Filmfare Robot', domain: 'Robotics', description: 'Face-tracking robot arm using inverse kinematics. Camera always on target.', tech: ['IK', 'Servo', 'CV'], status: 'in-progress' },
    { id: 'p6', title: 'Build Club Web Portal', domain: 'Software', description: 'Full-stack portal with admin dashboard, event management, and member tracking.', tech: ['Node.js', 'Express', 'JS'], status: 'in-progress' },
  ],
  team: [
    { id: 't1', name: 'President', role: 'President', year: 'Final Year', dept: 'ECE', bio: 'Leads the club, sets vision and drives the club forward.', avatar: '' },
    { id: 't2', name: 'Vice President', role: 'Vice President', year: '3rd Year', dept: 'EEE', bio: 'Supports President, manages workshop curriculum and troubleshoots complex project bottlenecks.', avatar: '' },
    { id: 't3', name: 'Treasurer', role: 'Treasurer', year: '3rd Year', dept: 'CSE', bio: 'Manages club finances, budget allocation and resource procurement.', avatar: '' },
    { id: 't4', name: 'General Secretary', role: 'General Secretary', year: '2nd Year', dept: 'ECE', bio: 'Handles documentation, correspondence and day-to-day club operations.', avatar: '' },
    { id: 't5', name: 'Assistant Secretary', role: 'Assistant Secretary', year: '2nd Year', dept: 'ME', bio: 'Assists General Secretary, coordinates events and member communications.', avatar: '' },
    { id: 't6', name: 'Social Media Manager', role: 'Social Media Manager', year: '2nd Year', dept: 'CSE', bio: 'Manages social media presence, creates content and drives community engagement.', avatar: '' },
  ],
  siteContent: {
    stats: [
      { value: '50+', label: 'Active Members' },
      { value: '20+', label: 'Projects Built' },
      { value: '10', label: 'Domains' },
      { value: '24×7', label: 'Open Hours' }
    ],
    heroTagline: 'Walk in. Build. Learn.',
    heroSubtitle: 'St. Anthony\'s College, Shillong',
    heroDescription: 'A student-driven maker community where learning feels like play. 24x7 open lab, cross-disciplinary teams, real hardware, real projects.',
    aboutText: 'Build Club is a vibrant, student-driven community where learning feels like play. Like a child with Lego, we believe the best engineers are built through hands-on creation, not textbooks. We are open 24x7. Come walk in, form a team, and build something that matters.',
    contactTitle: 'Ready to Build?',
    contactText: 'Walk into Build Club, introduce yourself, and start making things. No experience required, only curiosity. Reach out to learn more or join our next workshop.',
    location: 'St. Anthony\'s College, Shillong',
    community: 'Discord Build Club Server',
    openHours: '24x7 - Walk in anytime',
    logoText: 'Build Club',
    logoIcon: '⚡',
    logoImage: '',
    discordUrl: 'https://discord.gg/SjnfXMTS',
    contactEmail: 'sacbuild2@gmail.com',
    roadmap: ROADMAP
  },
  domains: DOMAINS,
  gallery: [
    { id: 'g1', title: 'Open Lab', category: 'Open Lab', image: '', featured: true },
    { id: 'g2', title: 'Workshop', category: 'Workshop', image: '', featured: false },
    { id: 'g3', title: 'Build Session', category: 'Build Session', image: '', featured: false },
    { id: 'g4', title: 'Ideation', category: 'Ideation', image: '', featured: false },
    { id: 'g5', title: 'Prototyping', category: 'Prototyping', image: '', featured: false },
    { id: 'g6', title: 'Research', category: 'Research', image: '', featured: false }
  ]
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', fetchData);
