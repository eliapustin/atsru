// Шаблоны страниц. Зависят от data.js и components.js.

function home() {
  return /* HTML */ `<section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">АВИАТЕХНОСОФТ / ОБРАЗОВАТЕЛЬНЫЕ СИСТЕМЫ</div>
          <h1>Образовательные решения для обучения беспилотным авиационным системам</h1>
          <p class="lead">
            Учебные комплексы, конструкторы, лабораторное оборудование, программное обеспечение и
            комплексное оснащение классов БПЛА.
          </p>
          <div class="hero-actions">
            ${btn('Получить КП')}<a class="btn btn-outline" href="#solutions"
              >Посмотреть решения</a
            >
          </div>
        </div>
        <div class="hero-visual">
          <div class="photo-panel">
            <div class="hero-caption">
              <b>От теории до практического пилотирования</b>Линейка продуктов для образовательных
              учреждений
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="hero-facts">
      <div><span>01</span><b>Оборудование</b></div>
      <div><span>02</span><b>Программное обеспечение</b></div>
      <div><span>03</span><b>Методика обучения</b></div>
      <div><span>04</span><b>Оснащение класса</b></div>
    </div>
    <section class="section" id="solutions">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">ПРОДУКТОВАЯ ЛИНЕЙКА</div>
            <h2>Решения для практического обучения БПЛА</h2>
            <p>
              От отдельных учебных комплексов и программного обеспечения до оснащения
              образовательного пространства.
            </p>
          </div>
          <a class="text-link" href="#/equipment">Оборудование и компоненты</a>
        </div>
        <div class="product-grid">${products.map(productCard).join('')}</div>
      </div>
    </section>
    <section class="section trajectory">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow light">ОБРАЗОВАТЕЛЬНАЯ ТРАЕКТОРИЯ</div>
            <h2>От устройства беспилотника до практического пилотирования</h2>
            <p>Решения работают отдельно или складываются в последовательную программу обучения.</p>
          </div>
        </div>
        <div class="steps">
          ${[
            ['01', 'Теория', 'Курсы и тесты', 'АТС Симулятор'],
            ['02', 'Конструкция', 'Устройство аппарата', 'Дрон-конструктор'],
            ['03', 'Электроника', 'Компоненты и системы', 'Лабораторный стенд'],
            ['04', 'Сборка', 'Настройка и проверка', 'Дрон-конструктор'],
            ['05', 'Симулятор', 'Учебные задания', 'АТС Симулятор'],
            ['06', 'Пилотирование', 'Практика управления', 'Пчёлка'],
          ]
            .map(
              (x) =>
                /* HTML */ `<div class="step">
                  <div class="step-dot">${x[0]}</div>
                  <b>${x[1]}</b>
                  <p>${x[2]}</p>
                  <small>${x[3]}</small>
                </div>`,
            )
            .join('')}
        </div>
        <div class="actions">
          ${btn('Подобрать решение', 'f1')}${link('Для образования', 'education', 'btn-line')}
        </div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">ВЫБОР РЕШЕНИЯ</div>
            <h2>Какая задача стоит перед вами?</h2>
            <p>Каждый продукт закрывает свой этап обучения и может дополнять другие.</p>
          </div>
        </div>
        <div class="compare-grid">
          ${products
            .slice(0, 4)
            .map(
              (p) =>
                /* HTML */ `<div class="compare-card">
                  <span class="tag">${p.short}</span>
                  <h3>${p.name}</h3>
                  <p>${p.desc}</p>
                  <a href="#/product/${p.id}">Посмотреть решение</a>
                </div>`,
            )
            .join('')}
        </div>
        <div class="actions">${btn('Получить консультацию', 'f1')}</div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="classroom-block">
          <div class="classroom-copy">
            <div class="eyebrow light">ПРОЕКТ ОСНАЩЕНИЯ</div>
            <h2>Класс БПЛА под вашу образовательную программу</h2>
            <p>
              Подберём состав оборудования с учётом числа учащихся, рабочих мест, помещения и
              бюджета.
            </p>
            <div class="pills">
              <span>Оборудование</span><span>ПО</span><span>Методические материалы</span>
            </div>
            <div class="actions">
              ${btn('Рассчитать класс', 'f2')}${link('Подробнее', 'product/classroom', 'btn-line')}
            </div>
          </div>
          <div class="classroom-image" role="img" aria-label="Образовательный класс БПЛА"></div>
        </div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">ДЛЯ КОГО</div>
            <h2>Решения для разных образовательных форматов</h2>
          </div>
          <a href="#/education" class="text-link">Подробнее для образования</a>
        </div>
        <div class="audience-grid">
          ${[
            ['⌂', 'Школы', 'Знакомство с БАС и практические занятия в классе.'],
            ['◎', 'Дополнительное образование', 'Кружки, проектная работа и инженерные занятия.'],
            ['▤', 'Колледжи и СПО', 'Изучение компонентов, систем и практических задач.'],
            ['◇', 'Инженерные классы', 'Последовательная программа от теории до пилотирования.'],
            ['▦', 'Образовательные центры', 'Оснащение новых пространств и лабораторий.'],
            ['↗', 'Региональные проекты', 'Поставка решений для нескольких площадок.'],
          ]
            .map(
              (x) =>
                /* HTML */ `<div class="audience-card">
                  <div class="icon">${x[0]}</div>
                  <h3>${x[1]}</h3>
                  <p>${x[2]}</p>
                </div>`,
            )
            .join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">КАК РАБОТАЕМ</div>
            <h2>От задачи до занятий</h2>
          </div>
        </div>
        <div class="process-grid">
          ${[
            ['01', 'Обсуждаем задачу', 'Уточняем программу, число учащихся и формат занятий.'],
            ['02', 'Подбираем состав', 'Предлагаем подходящие продукты и комплектацию.'],
            ['03', 'Готовим предложение', 'Формируем КП и материалы для планирования закупки.'],
            ['04', 'Сопровождаем внедрение', 'Помогаем начать работу с оборудованием и ПО.'],
          ]
            .map(
              (x) =>
                /* HTML */ `<div class="process-item">
                  <span>${x[0]}</span>
                  <h3>${x[1]}</h3>
                  <p>${x[2]}</p>
                </div>`,
            )
            .join('')}
        </div>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container trust-grid">
        <div>
          <div class="eyebrow">О КОМПАНИИ</div>
          <h2>Собственная разработка для практического образования</h2>
          <p class="lead">
            «АвиаТехноСофт» создаёт оборудование, программное обеспечение и методические решения для
            обучения беспилотным авиационным системам.
          </p>
          <a class="text-link" href="#/about">Подробнее о компании</a>
        </div>
        <div class="trust-card">
          <div class="quote">
            «Обучение БАС должно быть понятным преподавателю и доступным в обычной аудитории»
          </div>
          <div class="trust-list">
            <div><span>01</span>Продукты собственной разработки</div>
            <div><span>02</span>Оборудование и ПО в одной системе</div>
            <div><span>03</span>Практический образовательный подход</div>
          </div>
        </div>
      </div>
    </section>
    <div class="document-strip">
      <div class="container">
        <div>
          <div class="eyebrow">МАТЕРИАЛЫ</div>
          <h2>Документы для изучения и закупки</h2>
          <p>Запросите актуальные технические материалы и коммерческое предложение.</p>
        </div>
        ${link('Перейти к документам', 'documents')}
      </div>
    </div>
    <section class="section section-soft">
      <div class="container section-head">
        <div>
          <div class="eyebrow">НОВОСТИ КОМПАНИИ</div>
          <h2>События и разработки</h2>
          <p>Публикации о проектах, мероприятиях и новых материалах компании.</p>
        </div>
        <a class="text-link" href="http://astru-news.local/">Все новости →</a>
      </div>
    </section>
    ${finalCta()}`;
}
function productPage(p) {
  return /* HTML */ `<section class="inner-hero">
      <div class="container">
        <div class="breadcrumbs"><a href="#/">Главная</a> / Продукты / ${p.name}</div>
        <div class="inner-hero-grid">
          <div>
            <div class="eyebrow">${p.short.toUpperCase()}</div>
            <h1>${p.name}</h1>
            <p class="lead">${p.desc}</p>
            <div class="actions">
              ${btn(p.action, p.form)}${p.id === 'simulator'
                ? link('Комплекс «Пчёлка»', 'product/pchelka')
                : link('Все решения', '')}
            </div>
          </div>
          <div class="inner-visual">${visual(p)}</div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container detail-grid">
        <div>
          <div class="eyebrow">УЧЕБНАЯ ЗАДАЧА</div>
          <h2>Что позволяет изучать решение</h2>
          <p>${p.desc}</p>
          <ul class="check-list">
            ${p.points.map((x) => /* HTML */ `<li>${x}</li>`).join('')}
          </ul>
        </div>
        <div class="info-panel">
          <div class="eyebrow">ПРИМЕНЕНИЕ</div>
          <h3>В образовательной программе</h3>
          <p>
            ${p.id === 'simulator'
              ? '«АТС Симулятор» входит в состав учебного комплекса «Пчёлка». Программное обеспечение помогает проводить теоретическую и практическую часть занятия.'
              : p.id === 'classroom'
                ? 'Состав класса подбирается индивидуально. Решения можно объединить в единую траекторию обучения.'
                : 'Решение может использоваться отдельно или вместе с другими продуктами «АвиаТехноСофт».'}
          </p>
          <p>
            Точная комплектация и технические характеристики предоставляются по запросу после
            уточнения задачи.
          </p>
        </div>
      </div>
    </section>
    ${productDetailsSection(p)}
    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">СОСТАВ СИСТЕМЫ</div>
            <h2>Другие решения линейки</h2>
          </div>
        </div>
        <div class="mini-grid">
          ${products
            .filter((x) => x.id !== p.id)
            .slice(0, 3)
            .map(
              (x) =>
                /* HTML */ `<a class="mini-card" href="#/product/${x.id}"
                  ><span>${x.icon}</span>
                  <h3>${x.name}</h3>
                  <p>${x.short} →</p></a
                >`,
            )
            .join('')}
        </div>
      </div>
    </section>
    ${finalCta(
      p.id === 'classroom'
        ? 'Рассчитаем оснащение вашего класса'
        : 'Обсудим применение решения в вашей программе',
    )}`;
}
const simpleHero = (crumb, title, lead) =>
  /* HTML */ `<section class="inner-hero">
    <div class="container">
      <div class="breadcrumbs"><a href="#/">Главная</a> / ${crumb}</div>
      <div class="eyebrow">АВИАТЕХНОСОФТ</div>
      <h1>${title}</h1>
      <p class="lead">${lead}</p>
    </div>
  </section>`;
function education() {
  return (
    simpleHero(
      'Для образования',
      'Практическое обучение БАС для образовательных учреждений',
      'Помогаем выстроить занятия от знакомства с устройством беспилотника до работы в симуляторе и практического пилотирования.',
    ) +
    /* HTML */ `<section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              <div class="eyebrow">ФОРМАТЫ</div>
              <h2>Подберём решение под вашу программу</h2>
            </div>
          </div>
          <div class="audience-grid">
            ${[
              ['Школа', 'Введение в БАС, устройство аппарата и безопасное управление.'],
              ['Дополнительное образование', 'Проектная работа, сборка и практические задания.'],
              ['Колледж и СПО', 'Компоненты, электроника, настройка и диагностика.'],
              ['Инженерный класс', 'Единая образовательная траектория.'],
              ['Образовательный центр', 'Комплексное оснащение пространства.'],
              ['Региональный проект', 'Масштабирование на несколько площадок.'],
            ]
              .map(
                (x) =>
                  /* HTML */ `<div class="audience-card">
                    <h3>${x[0]}</h3>
                    <p>${x[1]}</p>
                  </div>`,
              )
              .join('')}
          </div>
        </div>
      </section>
      <section class="section section-soft">
        <div class="container detail-grid">
          <div>
            <div class="eyebrow">ОБРАЗОВАТЕЛЬНАЯ ТРАЕКТОРИЯ</div>
            <h2>Теория → устройство → сборка → симулятор → пилотирование</h2>
            <p class="lead">
              Продукты можно вводить постепенно или использовать как единую систему.
            </p>
          </div>
          <div class="info-panel">
            <h3>Что учесть при выборе</h3>
            <ul class="check-list">
              <li>Возраст и число учащихся</li>
              <li>Цели и программа занятий</li>
              <li>Оснащение помещения</li>
              <li>Бюджет и сроки закупки</li>
            </ul>
          </div>
        </div>
      </section>
      ${courseOverview()}${finalCta('Поможем подобрать программу и оснащение')}`
  );
}
function procurement() {
  return (
    simpleHero(
      'Как закупить',
      'Закупка оборудования и решений для обучения БАС',
      'Поможем подготовить коммерческое предложение и технические материалы для планирования закупки.',
    ) +
    /* HTML */ `<section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              <div class="eyebrow">ДЛЯ СПЕЦИАЛИСТА ПО ЗАКУПКАМ</div>
              <h2>Материалы по запросу</h2>
              <p>Комплект документов зависит от продукта и процедуры закупки.</p>
            </div>
          </div>
          <div class="mini-grid">
            <div class="mini-card">
              <span>01</span>
              <h3>Коммерческое предложение</h3>
              <p>Стоимость и состав выбранного решения.</p>
            </div>
            <div class="mini-card">
              <span>02</span>
              <h3>Техническое описание</h3>
              <p>Актуальные характеристики и комплектация.</p>
            </div>
            <div class="mini-card">
              <span>03</span>
              <h3>Консультация</h3>
              <p>Ответы на вопросы по поставке и применению.</p>
            </div>
          </div>
          <div class="actions">
            ${btn('Получить КП', 'f1')}${btn('Получить документацию', 'f4', 'btn-outline')}
          </div>
        </div>
      </section>
      <section class="section section-soft">
        <div class="container detail-grid">
          <div>
            <h2>44-ФЗ, 223-ФЗ и другие способы закупки</h2>
            <p>
              Подскажем, какие сведения о продукте можно использовать при подготовке закупки.
              Конкретные коды, реестровые записи и формулировки для документации предоставляются
              после проверки по выбранной позиции.
            </p>
          </div>
          <div class="info-panel">
            <h3>Для запроса укажите</h3>
            <ul class="check-list">
              <li>Тип учреждения</li>
              <li>Нужные продукты или учебную задачу</li>
              <li>Ориентировочное количество</li>
              <li>Планируемый способ и срок закупки</li>
            </ul>
          </div>
        </div>
      </section>
      ${finalCta('Подготовим предложение для вашей закупки')}`
  );
}
function documents() {
  return (
    simpleHero(
      'Документы',
      'Документы и технические материалы',
      'Запросите актуальные описания, спецификации и методические материалы для выбранного решения.',
    ) +
    /* HTML */ `<section class="section">
        <div class="container">
          <div class="mini-grid">
            <div class="mini-card">
              <span>▤</span>
              <h3>Технические описания</h3>
              <p>Характеристики и состав продукта по запросу.</p>
              ${btn('Получить документацию', 'f4')}
            </div>
            <div class="mini-card">
              <span>⌘</span>
              <h3>Спецификации</h3>
              <p>Комплектность под конкретный проект оснащения.</p>
              ${btn('Получить спецификацию', 'f4')}
            </div>
            <div class="mini-card">
              <span>◫</span>
              <h3>Методические материалы</h3>
              <p>Материалы для организации занятий.</p>
              ${btn('Получить методические материалы', 'f4')}
            </div>
          </div>
        </div>
      </section>
      ${finalCta('Нужны материалы по конкретному продукту?')}`
  );
}
function about() {
  return (
    simpleHero(
      'О компании',
      'Разрабатываем решения для обучения беспилотным авиационным системам',
      '«АвиаТехноСофт» — команда инженеров, создающая оборудование и программное обеспечение для образовательных учреждений.',
    ) +
    /* HTML */ `<section class="section">
        <div class="container detail-grid">
          <div>
            <div class="eyebrow">НАШ ПОДХОД</div>
            <h2>Практика, доступная в классе</h2>
            <p>
              Мы объединяем оборудование, ПО и учебные сценарии, чтобы занятия по БАС можно было
              проводить последовательно: от теории и изучения компонентов до сборки и пилотирования.
            </p>
            <p>
              Компания разрабатывает учебные комплексы, дроны-конструкторы, лабораторное
              оборудование и решения для комплексного оснащения класса.
            </p>
          </div>
          <div class="info-panel">
            <h3>Направления работы</h3>
            <ul class="check-list">
              <li>Разработка и производство оборудования</li>
              <li>Собственное программное обеспечение</li>
              <li>Методические материалы</li>
              <li>Подбор и оснащение классов БПЛА</li>
            </ul>
          </div>
        </div>
      </section>
      ${finalCta('Обсудим ваш образовательный проект')}`
  );
}
function contacts() {
  return (
    simpleHero(
      'Контакты',
      'Свяжитесь с нами',
      'Расскажите, какую задачу вы решаете. Подскажем подходящие продукты и следующий шаг.',
    ) +
    /* HTML */ `<section class="section">
      <div class="container contact-grid">
        <div class="contact-card">
          <div class="eyebrow">ТЕЛЕФОН</div>
          <a href="tel:+79874997497">+7 (987) 499-74-97</a>
          <p>По вопросам продуктов и проектов оснащения.</p>
        </div>
        <div class="contact-card">
          <div class="eyebrow">ЭЛЕКТРОННАЯ ПОЧТА</div>
          <a href="mailto:aviatechnosoft@yandex.ru">aviatechnosoft@yandex.ru</a>
          <p>Пришлите описание задачи или запрос на КП.</p>
        </div>
      </div>
      <div class="container actions">
        ${btn('Получить консультацию', 'f1')}${btn('Рассчитать класс', 'f2', 'btn-outline')}
      </div>
    </section>`
  );
}
function equipment() {
  return (
    simpleHero(
      'Оборудование и компоненты',
      'Оборудование и компоненты для обучения БАС',
      'Дополнительное оснащение подбирается под учебную программу и состав класса.',
    ) +
    /* HTML */ `<section class="section">
        <div class="container">
          <div class="mini-grid">
            ${[
              ['Беспилотники и пульты', 'Учебные аппараты и управление.'],
              ['Компьютеры и симуляторы', 'Рабочие места для цифровой практики.'],
              ['Зарядка и хранение', 'Инфраструктура образовательного класса.'],
            ]
              .map(
                (x) =>
                  /* HTML */ `<div class="mini-card">
                    <h3>${x[0]}</h3>
                    <p>${x[1]}</p>
                  </div>`,
              )
              .join('')}
          </div>
          <div class="actions">${btn('Получить консультацию', 'f1')}</div>
        </div>
      </section>
      ${finalCta()}`
  );
}
