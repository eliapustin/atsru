<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main">Перейти к содержимому</a>
<div class="topline">
  <div class="container topline-inner">
    <span>Разработка и производство решений для образования</span>
    <a href="mailto:aviatechnosoft@yandex.ru">aviatechnosoft@yandex.ru</a>
  </div>
</div>
<header class="site-header">
  <div class="container header-inner">
    <a href="<?php echo esc_url(ats_news_main_url('#/')); ?>" class="brand" aria-label="АвиаТехноСофт — главная">
      <span class="brand-mark">
        <img src="<?php echo esc_url(ats_news_main_url('assets/img/Логотип PNG основной.png')); ?>" alt="АвиаТехноСофт" width="1605" height="749">
      </span>
    </a>
    <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="ats-news-nav">
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" id="ats-news-nav" aria-label="Основное меню">
      <a href="<?php echo esc_url(ats_news_main_url('#/')); ?>">Главная</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/education')); ?>">Для образования</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/documents')); ?>">Документы</a>
      <a href="<?php echo esc_url(home_url('/')); ?>" aria-current="<?php echo is_home() ? 'page' : 'false'; ?>">Новости</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/about')); ?>">О компании</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/contacts')); ?>">Контакты</a>
    </nav>
    <a class="btn btn-primary header-cta" href="<?php echo esc_url(ats_news_main_url('#/contacts')); ?>">Связаться с нами</a>
  </div>
</header>
<main id="main">
