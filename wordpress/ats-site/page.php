<?php get_header(); ?>
<?php
$name = ats_site_page_name();
if ($name === 'product') $name = 'equipment';
if ($name === 'home') $name = 'front';
if ($name && is_file(get_template_directory() . '/content/' . $name . '.html')) {
    ats_site_content($name);
} else {
    while (have_posts()) : the_post(); ?>
      <section class="inner-hero"><div class="container"><h1><?php the_title(); ?></h1></div></section>
      <section class="section"><div class="container ats-news-content"><?php the_content(); ?></div></section>
    <?php endwhile;
}
?>
<?php get_footer(); ?>
