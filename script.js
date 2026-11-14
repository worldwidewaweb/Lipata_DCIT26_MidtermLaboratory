// Split headings marked .split into words and letters so each letter can animate
document.querySelectorAll('.split').forEach((el) => {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  let i = 0;
  text.split(' ').forEach((word, w, all) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'w';
    wordEl.setAttribute('aria-hidden', 'true');
    [...word].forEach((ch) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.style.setProperty('--i', i++);
      s.textContent = ch;
      wordEl.appendChild(s);
    });
    el.appendChild(wordEl);
    if (w < all.length - 1) { el.appendChild(document.createTextNode(' ')); i++; }
  });
});

// Reveal sections as they scroll into view.
// When you scroll back up and they leave the bottom of the screen, they retract.
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('show');
      } else if (en.boundingClientRect.top > 0) {
        // element is below the screen, so the visitor scrolled up
        en.target.classList.remove('show');
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('show'));
}
