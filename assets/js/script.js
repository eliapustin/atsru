// Запуск приложения, hash-маршруты и управление меню.

const main = document.querySelector('#main');
const menu = document.querySelector('#products-menu');
menu.innerHTML =
  products
    .map(
      (p) =>
        /* HTML */ `<a href="#/product/${p.id}"
          ><strong>${p.name}</strong><small>${p.short}</small></a
        >`,
    )
    .join('') +
  '<a href="#/equipment"><strong>Оборудование и компоненты</strong><small>Дополнительное оснащение</small></a>';
const routes = {
  '/': home,
  '/education': education,
  '/procurement': procurement,
  '/documents': documents,
  '/about': about,
  '/contacts': contacts,
  '/equipment': equipment,
};
function render() {
  const path = decodeURIComponent(location.hash.slice(1) || '/');
  const p = path.startsWith('/product/') ? products.find((x) => x.id === path.split('/')[2]) : null;
  main.innerHTML = p ? productPage(p) : (routes[path] || home)();
  document.title =
    (p
      ? p.name
      : path === '/'
        ? 'Решения для обучения БАС'
        : main.querySelector('h1')?.textContent) + ' — АвиаТехноСофт';
  document.querySelector('.main-nav').classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-group').forEach((group) => {
    group.classList.remove('open');
    group.querySelector('.nav-dropdown').setAttribute('aria-expanded', 'false');
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (path === '/#solutions') document.querySelector('#solutions')?.scrollIntoView();
}
window.addEventListener('hashchange', render);
render();
document.querySelector('.menu-toggle').addEventListener('click', (e) => {
  const n = document.querySelector('.main-nav');
  n.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(n.classList.contains('open')));
});
document.querySelectorAll('.nav-dropdown').forEach((b) =>
  b.addEventListener('click', () => {
    const g = b.parentElement;
    g.classList.toggle('open');
    b.setAttribute('aria-expanded', String(g.classList.contains('open')));
  }),
);

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href="#solutions"]');
  if (anchor) {
    e.preventDefault();
    document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' });
  }
});
