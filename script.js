// script.js
// Powers: index.html | about.html | contact.html

// ===== 0. Wait until DOM is ready =====
document.addEventListener('DOMContentLoaded', () => {
  
  // ===== 1. Mobile Menu =====
  const menuBtn = document.getElementById('menu-button');
  const sideMenu = document.getElementById('side-menu');
  const closeBtn = document.getElementById('close-menu-button');
  
  menuBtn?.addEventListener('click', () => sideMenu.classList.add('open'));
  closeBtn?.addEventListener('click', () => sideMenu.classList.remove('open'));
  
  // close on nav-link click (only if not a submenu parent)
  sideMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (!link.closest('li').querySelector('button[data-target]')) {
        sideMenu.classList.remove('open');
      }
    });
  });
  
  // ===== 2. Sub-menu Toggle (inside side-menu) =====
  document.querySelectorAll('.submenu-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const arrow = btn.querySelector('svg');
      target?.classList.toggle('hidden');
      arrow?.classList.toggle('rotate-180');
    });
  });
  
  // ===== 3. Active Nav Link Highlight =====
  const currentLoc = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentLoc) link.classList.add('active');
  });
  
  // ===== 4. Auto-Year in Footer =====
  const yearSpan = document.querySelector('#year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  
  // ===== 5. Manual Slideshow (prev/next buttons) =====
  function initGallery(selector) {
    const gallery = document.querySelector(selector);
    if (!gallery) return;
    const imgs = gallery.querySelectorAll('.gallery-image');
    const prev = gallery.querySelector('.prev');
    const next = gallery.querySelector('.next');
    let idx = 0;
    
    const show = i => imgs.forEach((img, j) => img.classList.toggle('active', j === i));
    
    prev?.addEventListener('click', () => {
      idx = (idx - 1 + imgs.length) % imgs.length;
      show(idx);
    });
    next?.addEventListener('click', () => {
      idx = (idx + 1) % imgs.length;
      show(idx);
    });
  }
  
  // initialise every gallery on the page
  document.querySelectorAll('.slideshow-container').forEach(initGallery);
  
}); // end DOMContentLoaded
/* ===== 6. Contact Form – ajax send + clear ===== */
const contactForm = document.getElementById('contactForm');
const statusMsg   = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault(); // stop normal submit
  const formData = new FormData(contactForm);

  try {
    await fetch(contactForm.action, {
      method : 'POST',
      body   : formData,
      headers: { 'Accept': 'application/json' }
    });
    statusMsg.style.display = 'block';        // show success
    contactForm.reset();                     // clear fields
    setTimeout(() => statusMsg.style.display = 'none', 4000);
  } catch (err) {
    alert('Sorry, something went wrong. Please try again.');
  }
});