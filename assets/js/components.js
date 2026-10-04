// Общие HTML-компоненты страниц. Зависят от data.js.

const btn = (label, form = 'f1', cls = 'btn-primary') =>
  /* HTML */ `<button class="btn ${cls}" data-form="${form}" data-cta="${label}">${label}</button>`;
const link = (label, path, cls = 'btn-outline') =>
  /* HTML */ `<a class="btn ${cls}" href="#/${path}">${label} <span>→</span></a>`;
const visual = (p) =>
  /* HTML */ `<span class="placeholder-icon" aria-hidden="true" ${p.image ? 'hidden' : ''}
      >${p.icon}</span
    >${p.image
      ? /* HTML */ `<img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.previousElementSibling.hidden=false"
        />`
      : ''}`;
function productCard(p, i) {
  return /* HTML */ `<article class="product-card ${p.id === 'classroom' ? 'featured' : ''}">
    <a class="product-visual" href="#/product/${p.id}" aria-label="Подробнее: ${p.name}"
      >${visual(p)}</a
    >
    <div class="product-body">
      <span class="product-num">РЕШЕНИЕ 0${i + 1} / ${p.short.toUpperCase()}</span>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a class="text-link" href="#/product/${p.id}">Подробнее о решении</a>
    </div>
  </article>`;
}
const finalCta = (title = 'Подберём решение под вашу задачу') =>
  /* HTML */ `<section class="final-cta">
    <div class="container">
      <div class="eyebrow light">СЛЕДУЮЩИЙ ШАГ</div>
      <h2>${title}</h2>
      <p>Расскажите об образовательной программе и формате оснащения.</p>
      <div class="actions">
        ${btn('Получить КП', 'f1')}${link('Контакты', 'contacts', 'btn-line')}
      </div>
    </div>
  </section>`;

function productDetailsSection(product) {
  const details = productDetails[product.id];
  if (!details) return '';
  return /* HTML */ `<section class="section section-soft">
    <div class="container detail-grid">
      <div>
        <div class="eyebrow">ПРАКТИКА НА ЗАНЯТИИ</div>
        <h2>${details.title}</h2>
        <p>${details.description}</p>
        <ul class="check-list">
          ${details.points.map((point) => /* HTML */ `<li>${point}</li>`).join('')}
        </ul>
      </div>
      ${details.video
        ? /* HTML */ `<figure class="demo-video">
            <video
              controls
              preload="none"
              playsinline
              poster="assets/img/trainer-poster.jpg"
              aria-label="Демонстрация учебного тренажёра"
            >
              <source src="assets/video/trainer.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
              <a href="assets/video/trainer.mp4">Скачать демонстрацию</a>
            </video>
            <figcaption>Демонстрация тренажёра из материалов компании.</figcaption>
          </figure>`
        : /* HTML */ `<div class="info-panel">
            <h3>Подготовка к занятиям</h3>
            <p>
              Обсудите с нами состав оборудования, учебные задачи и условия помещения — подберём
              решение для вашей программы.
            </p>
            ${btn('Обсудить применение', 'f1')}
          </div>`}
    </div>
  </section>`;
}
function courseOverview() {
  return /* HTML */ `<section class="section">
    <div class="container detail-grid">
      <div>
        <div class="eyebrow">МЕТОДИЧЕСКАЯ ЧАСТЬ</div>
        <h2>Основы строения БПЛА: девять тем</h2>
        <p class="lead">
          Курс знакомит учащихся с устройством мультироторного беспилотника и основными
          компонентами.
        </p>
        <p>Запросите актуальную программу и материалы для преподавателя.</p>
        ${btn('Получить программу курса', 'f4')}
      </div>
      <div class="info-panel">
        <h3>Темы занятий</h3>
        <ol class="course-topics">
          ${courseTopics.map((topic) => /* HTML */ `<li>${topic}</li>`).join('')}
        </ol>
      </div>
    </div>
  </section>`;
}
