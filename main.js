const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const roles = [
  'Full-stack Python Developer',
  'Front-end Developer',
  'Explorando UI & UX'
];

const roleEl = document.getElementById('role-text');

function typeLoop() {
  if (!roleEl) return;

  if (prefersReducedMotion) {
    roleEl.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];
    roleEl.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(tick, 55);
    } else if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(tick, 1800);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(tick, 30);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, 300);
    }
  }

  setTimeout(tick, 900);
}

typeLoop();

const cards = document.querySelectorAll('.card');

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  cards.forEach((card) => card.classList.add('pre-reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));
}

cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

const filterButtons = document.querySelectorAll('.filter-pill');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');

    cards.forEach((card) => {
      const categories = card.dataset.category || '';
      const matches = filter === 'all' || categories.split(' ').includes(filter);
      card.hidden = !matches;

      if (matches) {
        card.classList.add('is-visible');
      }
    });
  });
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}