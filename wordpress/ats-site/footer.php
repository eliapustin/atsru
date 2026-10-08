</main>
<footer class="site-footer"><div class="container footer-grid">
  <div>
    <a href="<?php echo esc_url(home_url('/')); ?>" class="brand brand-footer" aria-label="АвиаТехноСофт — главная"><span class="brand-mark"><img src="<?php echo esc_url(get_template_directory_uri() . '/assets/site/img/Логотип PNG основной.png'); ?>" alt="АвиаТехноСофт" width="1605" height="749"></span></a>
    <p>Оборудование, программное обеспечение и методические решения для практического обучения БАС.</p>
  </div>
  <div><b>Продукты</b>
    <a href="<?php echo esc_url(home_url('/product/pchelka/')); ?>">Учебный комплекс «Пчёлка»</a>
    <a href="<?php echo esc_url(home_url('/product/constructor/')); ?>">Дрон-конструктор</a>
    <a href="<?php echo esc_url(home_url('/product/lab/')); ?>">Лабораторный стенд</a>
    <a href="<?php echo esc_url(home_url('/product/simulator/')); ?>">АТС Симулятор</a>
    <a href="<?php echo esc_url(home_url('/product/classroom/')); ?>">Класс БПЛА</a>
  </div>
  <div><b>Информация</b>
    <a href="<?php echo esc_url(home_url('/education/')); ?>">Для образования</a>
    <a href="<?php echo esc_url(home_url('/procurement/')); ?>">Как закупить</a>
    <a href="<?php echo esc_url(home_url('/documents/')); ?>">Документы</a>
    <a href="<?php echo esc_url(home_url('/news/')); ?>">Новости</a>
    <a href="<?php echo esc_url(home_url('/about/')); ?>">О компании</a>
    <a href="<?php echo esc_url(home_url('/contacts/')); ?>">Контакты</a>
  </div>
  <div><b>Связаться</b>
    <a href="tel:+79874997497">+7 (987) 499-74-97</a>
    <a href="mailto:aviatechnosoft@yandex.ru">aviatechnosoft@yandex.ru</a>
    <button class="text-button" type="button" data-form="f1" data-cta="Получить консультацию">Обсудить проект</button>
  </div>
</div><div class="container footer-bottom"><span>© <?php echo esc_html(wp_date('Y')); ?> ООО «АвиаТехноСофт»</span><span>Макет сайта · реквизиты и юридические документы уточняются</span></div></footer>
<?php
$modal = file_get_contents(get_template_directory() . '/content/form-modal.html');
if ($modal !== false) {
    echo str_replace('action="api/lead.php"', 'action="' . esc_url(get_template_directory_uri() . '/api/lead.php') . '"', $modal); // Bundled form HTML.
}
wp_footer();
?>
</body></html>
