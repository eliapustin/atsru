const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
document.querySelectorAll('.nav-dropdown').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.closest('.nav-group');
    const open = group.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});
