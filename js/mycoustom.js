
  // ── Cursor ──
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform += ' scale(1.5)');
    el.addEventListener('mouseleave', () => {});
  });

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ── Progress Bars ──
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bars = e.target.querySelectorAll('.progress-bar');
        bars.forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

  // ── Mobile menu ──
  function toggleMenu(btn) {
    const nav = document.querySelector('nav ul');
    const open = nav.style.display === 'flex';
    nav.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:rgba(5,8,16,0.97);padding:1.5rem 5%;gap:1.2rem;border-bottom:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(20px)';
    btn.querySelectorAll('span')[0].style.transform = open ? '' : 'rotate(45deg) translate(5px, 5px)';
    btn.querySelectorAll('span')[1].style.opacity  = open ? '' : '0';
    btn.querySelectorAll('span')[2].style.transform = open ? '' : 'rotate(-45deg) translate(5px, -5px)';
  }

  // ── Active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
    });
  });

  // ── Form submit ──
  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#34d399';
    setTimeout(() => { btn.innerHTML = '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Send Message'; btn.style.background = ''; e.target.reset(); }, 2500);
  }
