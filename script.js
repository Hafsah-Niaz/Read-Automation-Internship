// ========== MENU ICON NAVBAR ==========
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuicon.onclick = () => {
  menuicon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// ========== SCROLL SECTION ACTIVE LINK HIGHLIGHT ==========
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });

  // Sticky navbar on scroll
  let header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 100);

  // Remove menu toggle when clicking nav link
  menuicon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// ========== BACKGROUND IMAGE SLIDESHOW ==========
let currentIndex = 0;
let isBg1Visible = true;
let isTransitioning = false;
let slideshowTimeout;

const bgImages = [
  'images/bg1.webp',
  'images/bg2.webp',
  'images/bg3.webp',
  'images/bg4.webp',
  'images/bg5.webp',
  'images/bg6.webp'
];

const bg1 = document.querySelector('.bg1');
const bg2 = document.querySelector('.bg2');

// Preload background images
bgImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Set initial background
bg1.style.backgroundImage = `url('${bgImages[0]}')`;
bg1.classList.add('visible');

function changeBackground() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex = (currentIndex + 1) % bgImages.length;
  const nextImage = bgImages[currentIndex];

  const fadeIn = isBg1Visible ? bg2 : bg1;
  const fadeOut = isBg1Visible ? bg1 : bg2;

  const img = new Image();
  img.onload = () => {
    fadeIn.style.backgroundImage = `url('${nextImage}')`;

    requestAnimationFrame(() => {
      fadeIn.classList.add('visible');
      fadeOut.classList.remove('visible');
      isBg1Visible = !isBg1Visible;

      setTimeout(() => {
        isTransitioning = false;
      }, 4200); // Buffer
    });
  };

  img.src = nextImage;
}

function startBackgroundSlideshow() {
  function loop() {
    changeBackground();
    slideshowTimeout = setTimeout(loop, 9500); // Loop every 9.5s
  }
  loop();
}

function stopBackgroundSlideshow() {
  clearTimeout(slideshowTimeout);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopBackgroundSlideshow();
  else startBackgroundSlideshow();
});

startBackgroundSlideshow();

// ========== IMAGE SLIDESHOW (.slide) ==========
document.addEventListener("DOMContentLoaded", function () {
  const slideImages = document.querySelectorAll(".slide");
  let slideIndex = 0;

  if (slideImages.length === 0) return;

  slideImages[slideIndex].classList.add("active");

  setInterval(() => {
    slideImages[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slideImages.length;
    slideImages[slideIndex].classList.add("active");
  }, 3000);
});

// ========== SCROLL REVEAL ANIMATIONS ==========
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
  reset: true
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.about-img img, .home-content h3', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });




// ========== CLIENT CAROUSEL IMAGE LOOP ==========
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const images = document.querySelectorAll(".carousel-track img");

  if (!track || images.length === 0) return;

  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });
});
