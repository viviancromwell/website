// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !open);
  siteNav.classList.toggle('is-open', !open);
});

// Secondary nav — show/hide when Photography is clicked
const subNav = document.querySelector('.sub-nav');
const photographyLink = document.querySelector('[data-section="photography"]');

photographyLink.addEventListener('click', (e) => {
  e.preventDefault();
  const isVisible = !subNav.hidden;

  if (isVisible) {
    subNav.hidden = true;
    photographyLink.classList.remove('is-active');
  } else {
    subNav.hidden = false;
    photographyLink.classList.add('is-active');
  }
});

// Hide sub-nav when clicking other main nav links
document.querySelectorAll('.nav-link:not([data-section="photography"])').forEach(link => {
  link.addEventListener('click', () => {
    subNav.hidden = true;
    photographyLink.classList.remove('is-active');
  });
});

// Active state for sub-nav links
document.querySelectorAll('.sub-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.sub-nav-link').forEach(l => l.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});
