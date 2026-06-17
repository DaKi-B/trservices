const statNumbers = document.querySelectorAll('[data-count]');

if (statNumbers.length) {
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1400;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);

        el.textContent = value.toLocaleString('sr-RS');

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toLocaleString('sr-RS');
        }
      };

      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, {
    threshold: 0.45
  });

  statNumbers.forEach((number) => countObserver.observe(number));
}