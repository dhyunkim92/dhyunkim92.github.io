// dark mode toggle
const themeToggle = document.getElementById('theme-toggle');

function isDarkNow() {
  const forced = document.documentElement.getAttribute('data-theme');
  if (forced) return forced === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  icon.className = isDarkNow() ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const next = isDarkNow() ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
  themeToggle.blur();  // 모바일에서 탭 후 포커스 하이라이트가 남지 않도록
});

// sidebar nav scrollspy
const navLinks = document.querySelectorAll('#sidebar-nav a');
const navSections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));

function updateActiveNav() {
  let idx = 0;
  navSections.forEach((sec, i) => {
    if (sec && sec.getBoundingClientRect().top <= 120) idx = i;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
    idx = navSections.length - 1;
  }
  navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// abstract box (animated: max-height is set to the measured content height
// so opening and closing both animate over the real distance)
function toggleAbstract(id, btn) {
  const target = document.getElementById(id);
  const isOpen = target && target.classList.contains('show');

  document.querySelectorAll('.abstract-box.show').forEach(box => {
    box.style.maxHeight = box.scrollHeight + 'px';
    void box.offsetHeight; // flush layout so the collapse animates from the real height
    box.style.maxHeight = '0px';
    box.classList.remove('show');
  });
  document.querySelectorAll('.abs-btn').forEach(button => button.classList.remove('is-active'));

  if (target && !isOpen) {
    target.classList.add('show');
    target.style.maxHeight = (target.scrollHeight + 40) + 'px';
    if (btn) btn.classList.add('is-active');
  }
}
