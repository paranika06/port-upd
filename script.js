document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.civ-menu a');
  const sections = document.querySelectorAll('section[id]');
  const header = document.querySelector('.civ-header');

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const offset = header ? header.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.scrollY - offset + 1;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // Active link highlight on scroll
  const setActiveLink = () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - 140) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = '#58a6ff';
      }
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // Reveal animation on scroll
  const revealItems = document.querySelectorAll('.civ-card, .civ-item, .civ-col, .civ-skills span, .civ-badge, .civ-hero-actions a');

  revealItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => revealObserver.observe(item));

  // Optional back-to-top button support
  const backToTop = document.querySelector('#back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Optional typing effect for the role line
  const roleElement = document.querySelector('.civ-role');
  if (roleElement) {
    const text = roleElement.textContent.trim();
    roleElement.textContent = '';
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        roleElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 45);
      }
    };

    typeWriter();
  }
});