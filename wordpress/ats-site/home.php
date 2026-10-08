<?php get_header(); ?>
<section class="inner-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="<?php echo esc_url(home_url('/')); ?>">Главная</a> / Новости</div>
    <div class="eyebrow">ЖИЗНЬ КОМПАНИИ</div>
    <h1>Новости</h1>
    <p class="lead">События, разработки и материалы компании «АвиаТехноСофт».</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <?php if (have_posts()) : ?>
      <div class="ats-news-grid">
        <?php while (have_posts()) : the_post(); ?>
          <article <?php post_class('ats-news-card'); ?>>
            <a class="ats-news-card-image" href="<?php echo esc_url(get_permalink()); ?>" aria-label="<?php echo esc_attr(get_the_title()); ?>">
              <?php if (has_post_thumbnail()) : the_post_thumbnail('large', array('loading' => 'lazy')); ?><?php endif; ?>
            </a>
            <div class="ats-news-card-body">
              <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>
              <h2><a href="<?php echo esc_url(get_permalink()); ?>"><?php echo esc_html(get_the_title()); ?></a></h2>
              <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 28)); ?></p>
              <a class="text-link" href="<?php echo esc_url(get_permalink()); ?>">Читать новость →</a>
            </div>
          </article>
        <?php endwhile; ?>
      </div>
      <nav class="ats-news-pagination" aria-label="Страницы новостей">
        <?php the_posts_pagination(array('mid_size' => 1, 'prev_text' => '← Назад', 'next_text' => 'Далее →')); ?>
      </nav>
    <?php else : ?>
      <p class="lead">Пока новостей нет. Загляните сюда позже.</p>
    <?php endif; ?>
  </div>
</section>
<?php get_footer(); ?>
