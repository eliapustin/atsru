<?php get_header(); ?>
<?php while (have_posts()) : the_post(); ?>
  <article <?php post_class('ats-news-article'); ?>>
    <section class="inner-hero">
      <div class="container">
        <div class="breadcrumbs">
          <a href="<?php echo esc_url(ats_news_main_url('#/')); ?>">Главная</a> /
          <a href="<?php echo esc_url(home_url('/')); ?>">Новости</a> /
          <?php echo esc_html(get_the_title()); ?>
        </div>
        <div class="eyebrow">НОВОСТИ КОМПАНИИ</div>
        <h1><?php echo esc_html(get_the_title()); ?></h1>
        <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>
      </div>
    </section>
    <div class="container ats-news-article-layout">
      <?php if (has_post_thumbnail()) : ?>
        <figure class="ats-news-cover"><?php the_post_thumbnail('full'); ?></figure>
      <?php endif; ?>
      <div class="ats-news-content"><?php the_content(); ?></div>
      <a class="text-link" href="<?php echo esc_url(home_url('/')); ?>">← Все новости</a>
    </div>
  </article>
<?php endwhile; ?>
<?php get_footer(); ?>
