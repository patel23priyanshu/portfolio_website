const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('main section');
const output = document.getElementById('aiBioOutput');
const generateBioBtn = document.getElementById('generateBioBtn');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const activateNavLink = () => {
  let currentId = '';

  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateNavLink);
activateNavLink();

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => observer.observe(el));

const aiBioSamples = [
  'I am Pri, a Full Stack Developer and Data Analyst focused on building reliable digital products and turning complex datasets into practical insights that support smart decisions.',
  'Pri combines full stack engineering with data analysis to deliver scalable applications, meaningful dashboards, and measurable business outcomes.',
  'As a developer-analyst, Pri designs user-friendly web experiences while creating data pipelines and visual reports that improve operational efficiency.',
];

if (generateBioBtn && output) {
  generateBioBtn.addEventListener('click', () => {
    output.textContent = 'Generating bio...';

    // Simulates an AI API delay without external dependencies.
    setTimeout(() => {
      const randomBio = aiBioSamples[Math.floor(Math.random() * aiBioSamples.length)];
      output.textContent = randomBio;
    }, 900);
  });
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
