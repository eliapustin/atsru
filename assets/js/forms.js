// Модальное окно и подготовка заявки в почтовой программе.

const backdrop = document.querySelector('#form-modal'),
  modalTitle = document.querySelector('#modal-title'),
  modalIntro = document.querySelector('#modal-intro'),
  form = document.querySelector('#lead-form');
let formContext = {};
function openForm(el) {
  const type = el.dataset.form;
  const product = products.find((p) => location.hash.endsWith('/' + p.id));
  formContext = {
    type,
    cta: el.dataset.cta || el.textContent.trim(),
    page: location.hash || '#/',
    product: product?.name || '',
  };
  modalTitle.textContent = formTitles[type][0];
  modalIntro.textContent = formTitles[type][1];
  form.reset();
  const fields = document.querySelector('#context-fields');
  const options = products
    .map(
      (p) =>
        /* HTML */ `<option value="${p.name}" ${p.name === formContext.product ? 'selected' : ''}>
          ${p.name}
        </option>`,
    )
    .join('');
  fields.innerHTML =
    type === 'f2'
      ? /* HTML */ `<div class="form-grid">
            <label
              >Тип учреждения <em>*</em
              ><input name="institution" required placeholder="Школа, колледж, центр…" /></label
            ><label
              >Число учащихся<input
                name="students"
                type="number"
                min="1"
                placeholder="Например, 15"
            /></label>
          </div>
          <label
            >Срок запуска и бюджет<input name="project" placeholder="Если уже известны"
          /></label>`
      : type === 'f3'
        ? /* HTML */ `<label
            >Формат демонстрации <em>*</em
            ><select name="demo" required>
              <option value="">Выберите формат</option>
              <option>Онлайн</option>
              <option>Очно</option>
              <option>Обсудить</option>
            </select></label
          >`
        : type === 'f4'
          ? /* HTML */ `<label
              >Запрашиваемый документ <em>*</em
              ><input name="document" required value="${formContext.cta}"
            /></label>`
          : /* HTML */ `<label
                >Интересующий продукт<select name="product">
                  <option value="">Помогите выбрать</option>
                  ${options}
                </select></label
              ><label class="consent"
                ><input type="checkbox" name="pricing" /><span
                  >КП нужно для обоснования цены контракта</span
                ></label
              >`;
  const contact = form.querySelector('input[name=contact]');
  contact.type = type === 'f4' ? 'email' : 'text';
  document.querySelector('#contact-label').firstChild.textContent =
    type === 'f4' ? 'Email ' : 'Телефон или email ';
  backdrop.hidden = false;
  document.body.classList.add('modal-open');
  form.querySelector('input[name=name]').focus();
}
function closeForm() {
  backdrop.hidden = true;
  document.body.classList.remove('modal-open');
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-form]');
  if (b) openForm(b);
});
document.querySelector('.modal-close').addEventListener('click', closeForm);
backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) closeForm();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !backdrop.hidden) closeForm();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const d = new FormData(form);
  const subject = `Запрос с макета сайта: ${formTitles[formContext.type][0]}`;
  const body = [
    `Форма: ${formTitles[formContext.type][0]}`,
    `Кнопка: ${formContext.cta}`,
    `Страница: ${location.href}`,
    `Продукт: ${d.get('product') || formContext.product || '—'}`,
    `Имя: ${d.get('name')}`,
    `Контакт: ${d.get('contact')}`,
    `Организация: ${d.get('company')}`,
    `Регион: ${d.get('region') || '—'}`,
    `Тип учреждения: ${d.get('institution') || '—'}`,
    `Число учащихся: ${d.get('students') || '—'}`,
    `Срок и бюджет: ${d.get('project') || '—'}`,
    `Демонстрация: ${d.get('demo') || '—'}`,
    `Документ: ${d.get('document') || '—'}`,
    `КП для обоснования цены: ${d.get('pricing') ? 'Да' : 'Нет'}`,
    `Комментарий: ${d.get('message') || '—'}`,
    `Источник: ${document.referrer || '—'}`,
  ].join('\n');
  location.href = `mailto:aviatechnosoft@yandex.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  closeForm();
});
