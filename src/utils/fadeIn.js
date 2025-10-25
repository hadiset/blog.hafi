export function initFadeIn() {
  const fadeInElements = document.querySelectorAll('.fade-in, .fade-in-fast, .fade-in-slow')

  const fadeInCallback = (entries,observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.toggle('show');
        observer.unobserve(entry.target);
      }
    });
  }

  const fadeInOptions = {
    threshold: 0.2,
  };

  const fadeInObserver = new IntersectionObserver(fadeInCallback, fadeInOptions);

  fadeInElements.forEach(el => fadeInObserver.observe(el));
}