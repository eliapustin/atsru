// Модальное окно и отправка заявки на сервер.

const backdrop = document.querySelector('#form-modal'),
  modalTitle = document.querySelector('#modal-title'),
  modalIntro = document.querySelector('#modal-intro'),
  form = document.querySelector('#lead-form');
let formContext = {};
let formRequestId = 0;
const formFieldNames = {
  name: 'Имя',
  contact: 'Телефон или email',
  company: 'Организация',
  region: 'Регион',
  institution: 'Тип учреждения',
  students: 'Число учащихся',
  project: 'Срок запуска и бюджет',
  demo: 'Формат демонстрации',
  document: 'Запрашиваемый документ',
  pricing: 'КП для обоснования цены',
  consent: 'Согласие на обработку данных',
  message: 'Комментарий',
};

function clearFormErrors() {
  form.querySelectorAll('.form-field-invalid').forEach((field) => {
    field.classList.remove('form-field-invalid');
    field.removeAttribute('aria-invalid');
  });
}

function showFormError(message, fieldName, retry = true) {
  const status = document.querySelector('#form-status');
  status.hidden = false;
  status.classList.add('is-error');
  status.textContent = message;
  const field = fieldName && form.elements.namedItem(fieldName);
  if (field instanceof HTMLElement) {
    field.classList.add('form-field-invalid');
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  }
  const submit = form.querySelector('.submit-btn');
  submit.textContent = retry ? 'Повторить отправку' : 'Отправить заявку';
  submit.disabled = false;
}

function openForm(el) {
  formRequestId += 1;
  const type = el.dataset.form;
  const product = products.find((p) => location.pathname.replace(/\/$/, '').endsWith('/product/' + p.id));
  formContext = {
    type,
    cta: el.dataset.cta || el.textContent.trim(),
    page: location.pathname,
    product: product?.name || '',
  };
  modalTitle.textContent = formTitles[type][0];
  modalIntro.textContent = formTitles[type][1];
  form.reset();
  clearFormErrors();
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
                ><input type="checkbox" name="pricing" value="1" /><span
                  >КП нужно для обоснования цены контракта</span
                ></label
              >`;
  const contact = form.querySelector('input[name=contact]');
  contact.type = type === 'f4' ? 'email' : 'text';
  document.querySelector('#contact-label').firstChild.textContent =
    type === 'f4' ? 'Email ' : 'Телефон или email ';
  backdrop.hidden = false;
  document.body.classList.add('modal-open');
  const status = document.querySelector('#form-status');
  status.hidden = true;
  status.textContent = '';
  const submit = form.querySelector('.submit-btn');
  submit.disabled = false;
  submit.textContent = 'Отправить заявку';
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

form.addEventListener('invalid', (e) => {
  const field = e.target;
  if (!(field instanceof HTMLElement)) return;
  field.classList.add('form-field-invalid');
  field.setAttribute('aria-invalid', 'true');
  const status = document.querySelector('#form-status');
  if (status.hidden) {
    const label = formFieldNames[field.getAttribute('name')] || 'в форме';
    const message = field.validity?.valueMissing
      ? `Заполните поле «${label}».`
      : `Проверьте значение поля «${label}».`;
    showFormError(message, field.getAttribute('name'), false);
  }
}, true);

function clearEditedField(e) {
  const field = e.target;
  if (!(field instanceof HTMLElement)) return;
  field.classList.remove('form-field-invalid');
  field.removeAttribute('aria-invalid');
  const status = document.querySelector('#form-status');
  if (status.classList.contains('is-error')) {
    status.hidden = true;
    status.textContent = '';
    status.classList.remove('is-error');
  }
}
form.addEventListener('input', clearEditedField);
form.addEventListener('change', clearEditedField);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  clearFormErrors();
  const data = new FormData(form);
  data.set('type', formContext.type);
  data.set('cta', formContext.cta);
  data.set('page', location.href);
  if (!data.get('product')) data.set('product', formContext.product);
  const submit = form.querySelector('.submit-btn');
  const status = document.querySelector('#form-status');
  const requestId = ++formRequestId;
  submit.disabled = true;
  submit.textContent = 'Отправляем…';
  status.hidden = false;
  status.classList.remove('is-error');
  status.textContent = 'Отправляем заявку…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    const result = await response.json().catch(() => ({}));
    if (requestId !== formRequestId) return;
    if (!response.ok) {
      showFormError(result.message || 'Не удалось отправить заявку.', result.field);
      return;
    }
    form.reset();
    status.textContent = result.message || 'Спасибо! Заявка отправлена.';
    submit.textContent = 'Отправлено';
  } catch {
    if (requestId !== formRequestId) return;
    showFormError('Ошибка связи. Попробуйте ещё раз.');
  }
});
