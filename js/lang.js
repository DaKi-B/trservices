// Remember the language a visitor picks in the SR/EN switch, so the root
// page (index.html) sends them to the same language on their next visit.
document.querySelectorAll('.lang-switch a').forEach((link) => {
  link.addEventListener('click', () => {
    try {
      localStorage.setItem('trs-lang', link.textContent.trim().toLowerCase());
    } catch (e) {
      // Storage can be blocked (private mode); the switch still works.
    }
  });
});
