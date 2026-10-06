</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a href="<?php echo esc_url(ats_news_main_url('#/')); ?>" class="brand brand-footer" aria-label="АвиаТехноСофт — главная">
        <span class="brand-mark">
          <img src="<?php echo esc_url(ats_news_main_url('assets/img/Логотип PNG основной.png')); ?>" alt="АвиаТехноСофт" width="1605" height="749">
        </span>
      </a>
      <p>Оборудование, программное обеспечение и методические решения для практического обучения БАС.</p>
    </div>
    <div>
      <b>Продукты</b>
      <a href="<?php echo esc_url(ats_news_main_url('#/product/pchelka')); ?>">Учебный комплекс «Пчёлка»</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/product/constructor')); ?>">Дрон-конструктор</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/product/lab')); ?>">Лабораторный стенд</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/product/simulator')); ?>">АТС Симулятор</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/product/classroom')); ?>">Класс БПЛА</a>
    </div>
    <div>
      <b>Информация</b>
      <a href="<?php echo esc_url(ats_news_main_url('#/education')); ?>">Для образования</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/procurement')); ?>">Как закупить</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/documents')); ?>">Документы</a>
      <a href="<?php echo esc_url(home_url('/')); ?>">Новости</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/about')); ?>">О компании</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/contacts')); ?>">Контакты</a>
    </div>
    <div>
      <b>Связаться</b>
      <a href="tel:+79874997497">+7 (987) 499-74-97</a>
      <a href="mailto:aviatechnosoft@yandex.ru">aviatechnosoft@yandex.ru</a>
      <a href="<?php echo esc_url(ats_news_main_url('#/contacts')); ?>">Обсудить проект</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© <?php echo esc_html(wp_date('Y')); ?> ООО «АвиаТехноСофт»</span>
    <span>Макет сайта · реквизиты и юридические документы уточняются</span>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
