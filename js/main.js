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

const caseTrack = document.querySelector('.case-track');
const casePrev = document.querySelector('.case-arrow-prev');
const caseNext = document.querySelector('.case-arrow-next');

if (caseTrack && casePrev && caseNext) {
  const getScrollAmount = () => {
    const firstCard = caseTrack.querySelector('.case-card');
    if (!firstCard) return 420;

    const trackStyles = window.getComputedStyle(caseTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 22);

    return firstCard.offsetWidth + gap;
  };

  const scrollToStart = () => {
    caseTrack.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  };

  const scrollToEnd = () => {
    caseTrack.scrollTo({
      left: caseTrack.scrollWidth,
      behavior: 'smooth'
    });
  };

  caseNext.addEventListener('click', () => {
    const maxScrollLeft = caseTrack.scrollWidth - caseTrack.clientWidth;
    const nearEnd = caseTrack.scrollLeft >= maxScrollLeft - 10;

    if (nearEnd) {
      scrollToStart();
    } else {
      caseTrack.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth'
      });
    }
  });

  casePrev.addEventListener('click', () => {
    const nearStart = caseTrack.scrollLeft <= 10;

    if (nearStart) {
      scrollToEnd();
    } else {
      caseTrack.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth'
      });
    }
  });
}