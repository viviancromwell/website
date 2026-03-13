// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !open);
  siteNav.classList.toggle('is-open', !open);
});

// Active state for sub-nav links
document.querySelectorAll('.sub-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.sub-nav-link').forEach(l => l.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});
