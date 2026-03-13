// Gallery loader — reads JSON and renders thumbnail grid with links
async function loadGallery(jsonPath, gridId, detailPage) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  try {
    const res = await fetch(jsonPath);
    const items = await res.json();
    const basePath = jsonPath.replace(/[^/]+$/, '');

    items.forEach(item => {
      const id = item.file.replace(/\.[^.]+$/, '');
      const link = document.createElement('a');
      link.className = 'gallery-card';
      link.href = `${detailPage}?id=${id}`;

      link.innerHTML = `
        <div class="gallery-card-img">
          <img src="${basePath}${item.file}"
               alt="${item.title}"
               loading="lazy" />
        </div>
        <p class="gallery-card-caption">${item.title}</p>
      `;

      grid.appendChild(link);
    });
  } catch (err) {
    console.error('Failed to load gallery:', err);
  }
}

// Section navigation
const homeSection = document.getElementById('home');
const allSections = document.querySelectorAll('.gallery-section');
const subNav = document.querySelector('.sub-nav');
const photographyLink = document.querySelector('[data-section="photography"]');

function showHome() {
  allSections.forEach(s => s.hidden = true);
  if (homeSection) homeSection.hidden = false;
  if (subNav) subNav.hidden = true;
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('is-active'));
  if (photographyLink) photographyLink.classList.remove('is-active');
}

function showSection(id) {
  if (homeSection) homeSection.hidden = true;
  allSections.forEach(s => s.hidden = true);
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('is-active'));

  const target = document.getElementById(id);
  if (target) target.hidden = false;

  const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
  if (activeLink) activeLink.classList.add('is-active');

  // Handle photography sub-nav
  if (id === 'photography') {
    if (subNav) subNav.hidden = false;
  } else {
    if (subNav) subNav.hidden = true;
    if (photographyLink) photographyLink.classList.remove('is-active');
  }
}

// Nav link clicks
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    showSection(targetId);
  });
});

// Home "currently" link clicks
document.querySelectorAll('.home-currently-link[data-section]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

// Site name click returns to home
document.querySelector('.site-name').addEventListener('click', (e) => {
  e.preventDefault();
  showHome();
});

// Init
loadGallery('paintings/paintings.json', 'paintings-grid', 'paintings/painting.html');
