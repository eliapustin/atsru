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
<div class="topline"><div class="container topline-inner">
  <span>Разработка и производство решений для образования</span>
  <a href="mailto:aviatechnosoft@yandex.ru">aviatechnosoft@yandex.ru</a>
</div></div>
<header class="site-header"><div class="container header-inner">
  <a href="<?php echo esc_url(home_url('/')); ?>" class="brand" aria-label="АвиаТехноСофт — главная">
    <span class="brand-mark"><img src="<?php echo esc_url(get_template_directory_uri() . '/assets/site/img/Логотип PNG основной.png'); ?>" alt="АвиаТехноСофт" width="1605" height="749"></span>
  </a>
  <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span><span></span></button>
  <nav class="main-nav" aria-label="Основное меню">
    <div class="nav-group">
      <button class="nav-dropdown" type="button" aria-expanded="false">Продукты</button>
      <div class="mega-menu" id="products-menu">
        <?php foreach (array(
          'pchelka' => array('Учебный комплекс «Пчёлка»', 'Практическое пилотирование'),
          'constructor' => array('Дрон-конструктор', 'Устройство и сборка'),
          'lab' => array('Лабораторный стенд', 'Электроника и системы БПЛА'),
          'simulator' => array('АТС Симулятор', 'Теория и цифровая практика'),
          'classroom' => array('Класс БПЛА', 'Комплексное оснащение'),
        ) as $slug => $product) : ?>
          <a href="<?php echo esc_url(home_url('/product/' . $slug . '/')); ?>"><strong><?php echo esc_html($product[0]); ?></strong><small><?php echo esc_html($product[1]); ?></small></a>
        <?php endforeach; ?>
        <a href="<?php echo esc_url(home_url('/equipment/')); ?>"><strong>Оборудование и компоненты</strong><small>Дополнительное оснащение</small></a>
      </div>
    </div>
    <div class="nav-group"><button class="nav-dropdown" type="button" aria-expanded="false">Для образования</button>
      <div class="small-menu"><a href="<?php echo esc_url(home_url('/education/')); ?>">Решения для учреждений</a><a href="<?php echo esc_url(home_url('/procurement/')); ?>">Как закупить</a></div>
    </div>
    <a href="<?php echo esc_url(home_url('/documents/')); ?>">Документы</a>
    <a href="<?php echo esc_url(home_url('/news/')); ?>">Новости</a>
    <a href="<?php echo esc_url(home_url('/about/')); ?>">О компании</a>
    <a href="<?php echo esc_url(home_url('/contacts/')); ?>">Контакты</a>
  </nav>
  <button class="btn btn-primary header-cta" type="button" data-form="f1" data-cta="Получить КП">Получить КП</button>
</div></header>
<main id="main">
