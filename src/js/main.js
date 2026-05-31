import '../css/style.css';

// Portfolio Data
const portfolioData = [
  // AutoCAD
  { id: 1, title: 'CNC Bubut', category: 'autocad', image: '/assets/portfolio/autocad/cnc-bubut.autocad.png' },
  { id: 2, title: 'CNC Milling', category: 'autocad', image: '/assets/portfolio/autocad/cnc-milling.autocad.png' },
  { id: 3, title: 'CNC Router', category: 'autocad', image: '/assets/portfolio/autocad/cnc-router.autocad.png' },
  { id: 4, title: 'Geometry 1', category: 'autocad', image: '/assets/portfolio/autocad/geometry1.autocad.png' },
  { id: 5, title: 'Geometry 2', category: 'autocad', image: '/assets/portfolio/autocad/geometry2.autocad.png' },
  { id: 6, title: 'Geometry 3', category: 'autocad', image: '/assets/portfolio/autocad/geometry3.autocad.png' },
  { id: 7, title: 'Geometry 4', category: 'autocad', image: '/assets/portfolio/autocad/geometry4.autocad.png' },
  { id: 8, title: 'Geometry 5', category: 'autocad', image: '/assets/portfolio/autocad/geometry5.autocad.png' },
  { id: 9, title: 'Geometry 6', category: 'autocad', image: '/assets/portfolio/autocad/geometry6.autocad.png' },
  { id: 10, title: 'Geometry 7', category: 'autocad', image: '/assets/portfolio/autocad/geometry7.autocad.png' },
  { id: 11, title: 'Geometry 8', category: 'autocad', image: '/assets/portfolio/autocad/geometry8.autocad.png' },
  // SolidWorks
  { id: 12, title: '3D Tool Design', category: 'solidworks', image: '/assets/portfolio/solidworks/3d-tool.solidworks.png' },
  // Visio
  { id: 13, title: 'Factory Layout Optimization', category: 'visio', image: '/assets/portfolio/visio/pabrik-layout.visio.png' },
  // Blender
  { id: 14, title: '3D Character Model', category: 'blender', image: '/assets/portfolio/blender/3dmodel-character.blender.png' },
];

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPortfolio();
  initLightbox();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg');
      navbar.classList.replace('bg-engineering-dark/70', 'bg-engineering-dark/95');
    } else {
      navbar.classList.remove('shadow-lg');
      navbar.classList.replace('bg-engineering-dark/95', 'bg-engineering-dark/70');
    }
  });

  // Mobile menu toggle
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const filters = document.querySelectorAll('.filter-btn');

  // Render initial items
  renderPortfolioGrid('all');

  // Filter click events
  filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state styling
      filters.forEach(f => {
        f.classList.remove('bg-engineering-accent', 'text-engineering-dark', 'active');
        f.classList.add('text-white', 'border-white/20');
      });
      e.target.classList.remove('text-white', 'border-white/20');
      e.target.classList.add('bg-engineering-accent', 'text-engineering-dark', 'active');

      // Filter and render
      const category = e.target.getAttribute('data-filter');
      renderPortfolioGrid(category);
    });
  });
}

function renderPortfolioGrid(category) {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = '';

  const filtered = category === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === category);

  filtered.forEach((item, index) => {
    const delay = index * 0.1;
    const card = document.createElement('div');
    card.className = `card-glass group relative overflow-hidden cursor-pointer fade-in`;
    card.style.animationDelay = `${delay}s`;
    card.innerHTML = `
      <div class="aspect-video w-full overflow-hidden">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-engineering-dark via-engineering-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span class="text-engineering-accent text-sm font-medium uppercase tracking-wider mb-1">${item.category}</span>
        <h3 class="text-xl font-bold text-white">${item.title}</h3>
      </div>
    `;

    // Lightbox trigger
    card.addEventListener('click', () => openLightbox(item.image, item.title));
    grid.appendChild(card);
  });
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxWrapper = document.getElementById('lightbox-img-wrapper');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function initLightbox() {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === document.getElementById('lightbox-container')) closeLightbox();
  });
  
  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // Interactive Zoom/Pan Effect
  lightboxWrapper.addEventListener('mousemove', (e) => {
    if (!lightboxImg.src) return;
    const { left, top, width, height } = lightboxWrapper.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    lightboxImg.style.transformOrigin = `${x}% ${y}%`;
    lightboxImg.style.transform = 'scale(2.5)';
  });

  lightboxWrapper.addEventListener('mouseleave', () => {
    lightboxImg.style.transform = 'scale(1)';
    setTimeout(() => {
      lightboxImg.style.transformOrigin = 'center center';
    }, 200);
  });
}

function openLightbox(src, title) {
  lightboxImg.src = src;
  lightboxCaption.textContent = title;
  lightbox.classList.remove('hidden');
  // Small delay to allow display:block to apply before animating opacity
  setTimeout(() => {
    lightbox.classList.remove('opacity-0');
    lightbox.classList.add('opacity-100');
  }, 10);
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
  lightbox.classList.remove('opacity-100');
  lightbox.classList.add('opacity-0');
  
  // Reset zoom on close
  lightboxImg.style.transform = 'scale(1)';
  lightboxImg.style.transformOrigin = 'center center';

  setTimeout(() => {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  }, 300);
  document.body.style.overflow = '';
}
