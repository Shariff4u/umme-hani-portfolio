const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
$('#year').textContent = new Date().getFullYear();

// Update both contact actions in one place. Replace this placeholder with the real
// number in international format, digits only, e.g. 919876543210.
const CONTACT_NUMBER = '918904363770';
const displayNumber = '+91 89043 63770';
$('#phoneText').textContent = displayNumber;
$('#callLink').href = 'tel:+' + CONTACT_NUMBER;
$('#whatsappLink').href = 'https://wa.me/' + CONTACT_NUMBER;

// Mobile navigation
const menuToggle = $('#menuToggle');
const nav = $('#nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
$$('#nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Scroll progress
const progressBar = $('#progressBar');
function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// Scroll reveal, with a graceful fallback for browsers without IntersectionObserver.
const revealItems = $$('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('visible'));

// Subtle 3D hero tilt, disabled for touch and reduced-motion users.
const heroVisual = $('#heroVisual');
if (heroVisual && window.matchMedia('(hover:hover) and (pointer:fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVisual.addEventListener('pointermove', event => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    heroVisual.style.transform = `rotateY(${x*5}deg) rotateX(${-y*4}deg)`;
  });
  heroVisual.addEventListener('pointerleave', () => heroVisual.style.transform = '');
}

// Portfolio filters
$$('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    $$('.filter-btn').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    $$('.project-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});
