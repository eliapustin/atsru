# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Корпоративный сайт ООО «АвиаТехноСофт» (aviatechnosoft.ru): один WordPress в корне домена с собственной темой `wordpress/ats-site`. Документация и общение — на русском.

## Перед работой

Прочитай план и журнал — там текущие решения, блокеры хостинга и открытые вопросы:

@for_agent/site_plan.md
@for_agent/site_worklog.md

После значимого изменения (код, решение, результат проверки, открытый вопрос) дописывай итог в `for_agent/site_worklog.md` и при необходимости обновляй `site_plan.md`.

## Команды

```sh
node wordpress/build-site-pages.js     # исходники assets/js + index.html → wordpress/ats-site/content/*.html
python wordpress/package-theme.py      # собрать wordpress/ats-site-theme.zip (с проверками состава архива)
npx prettier --check index.html "assets/js/*.js" assets/css/styles.css
```

Тестов и линтера нет. Проверка — вручную в LocalWP (сайт `atsru.local`, письма через Mailpit): главная, продуктовая страница, новости, мобильное меню и четыре типа заявок на ширине ~390 и ~1440 px. Подробности — `docs/wordpress-full-site.md`, `docs/forms-local-testing.md`.

## Архитектура

Содержимое страниц не хранится в БД WordPress, а генерируется из исходников прежней статической SPA:

- **Исходники** (в корне репозитория): `assets/js/data.js` (каталог продуктов, настройки форм), `components.js`, `pages.js` (функции `home()`, `education()`, `productPage(p)` …), `index.html` (блок `#form-modal` — окно формы).
- **`wordpress/build-site-pages.js`** выполняет эти скрипты в `vm`, вызывает функции страниц и пишет фрагменты в `wordpress/ats-site/content/`. При этом SPA-ссылки `#/route` превращаются в `{{ATS_HOME}}route/`, пути `assets/` — в `{{ATS_ASSET}}`. Файлы в `content/` — сгенерированные, руками не правь.
- **Тема**: `functions.php` → `ats_site_content($name)` подставляет плейсхолдеры и выводит фрагмент; `page.php` выбирает фрагмент по slug страницы (дочерние страницы `product/*` → `product-<slug>`, `home` → `front`, `product` → `equipment`). При активации темы `ats_site_install_pages()` создаёт страницы и назначает главную/страницу записей. Старые адреса `#/…` перенаправляются JS-скриптом в `wp_head`.
- **Новости** — обычные записи WordPress (`home.php`, `single.php`), сборка не нужна.
- **Формы**: `footer.php` вставляет `content/form-modal.html`, подменяя `action="api/lead.php"` на URL темы. `api/lead.php` отправляет письмо через PHP `mail()`, заявки не сохраняются. Адреса берутся из `ATS_LEAD_TO`/`ATS_LEAD_FROM` или приватного `atsru-lead-config.php`, который лежит на 5 уровней выше `api/` (уровнем выше корня сайта, образец — `docs/lead-config.example.php`).

### Копии файлов в теме — синхронизировать вручную

- `wordpress/ats-site/assets/site/css/styles.css` — копия `assets/css/styles.css` (должны совпадать).
- `wordpress/ats-site/assets/site/js/data.js` — копия `assets/js/data.js` (отличается только CRLF).
- `wordpress/ats-site/assets/site/js/forms.js` — **адаптированная** версия `assets/js/forms.js`: маршрут берётся из `location.pathname`, а не `location.hash`, и `fetch(form.action)` вместо `api/lead.php`. При правке исходника переноси изменения вручную, не копируй файл целиком.

Изображения и видео темы — `wordpress/ats-site/assets/site/img`, `video` (видео ~61 МБ, `preload="none"`).

## Что публикуется

На хостинг идёт только тема (`wp-content/themes/ats-site/`, через `ats-site-theme.zip`) и приватный `atsru-lead-config.php`. Корневые `index.html`, `assets/` на хостинг не копируются.

Устаревшее (схема «статический сайт + WordPress в `/news/`»), для текущей работы не использовать: `wordpress/ats-news/`, `ats-news-theme.zip`, `ats-static-site.zip`, `news-htaccess.example`, `docs/production-deployment.md`, `docs/wordpress-news-setup.md`.

## Содержание

- Не выдумывай цены, составы комплектов, реестровые сведения, реквизиты и юридические тексты — их нет, пока заказчик не предоставит.
- «АТС Симулятор» — часть учебного комплекса «Пчёлка». Раздел кейсов скрыт до появления хотя бы двух согласованных кейсов.
- ТЗ и ответы заказчика — `docs/reference/`. JSON-файлы в `docs/` (`student-course-*.json` ~32 МБ) целиком не читай.
