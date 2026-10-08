<?php
/** Full-site theme: company pages are bundled, news are WordPress Posts. */
if (!defined('ABSPATH')) {
    exit;
}

function ats_site_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'ats_site_setup');

function ats_site_assets() {
    $uri = get_template_directory_uri();
    $version = wp_get_theme()->get('Version');
    wp_enqueue_style('ats-site-main', $uri . '/assets/site/css/styles.css', array(), $version);
    wp_enqueue_style('ats-site-theme', get_stylesheet_uri(), array('ats-site-main'), $version);
    wp_enqueue_script('ats-site-data', $uri . '/assets/site/js/data.js', array(), $version, true);
    wp_enqueue_script('ats-site-forms', $uri . '/assets/site/js/forms.js', array('ats-site-data'), $version, true);
    wp_enqueue_script('ats-site-menu', $uri . '/assets/menu.js', array(), $version, true);
}
add_action('wp_enqueue_scripts', 'ats_site_assets');

function ats_site_content($name) {
    if (!preg_match('/^[a-z-]+$/', $name)) return;
    $file = get_template_directory() . '/content/' . $name . '.html';
    if (!is_file($file)) return;
    $content = file_get_contents($file);
    if ($content === false) return;
    echo str_replace(
        array('{{ATS_HOME}}', '{{ATS_ASSET}}'),
        array(esc_url(home_url('/')), esc_url(get_template_directory_uri() . '/assets/site/')),
        $content
    ); // Generated bundled HTML, not user input.
}

function ats_site_page_name() {
    if (!is_page()) return '';
    $page = get_queried_object();
    if (!$page instanceof WP_Post) return '';
    if ($page->post_parent && get_post_field('post_name', $page->post_parent) === 'product') {
        return 'product-' . $page->post_name;
    }
    return $page->post_name;
}

function ats_site_install_pages() {
    $pages = array(
        'home' => 'Главная', 'news' => 'Новости', 'product' => 'Продукты',
        'education' => 'Для образования', 'procurement' => 'Как закупить',
        'documents' => 'Документы', 'about' => 'О компании',
        'contacts' => 'Контакты', 'equipment' => 'Оборудование и компоненты',
    );
    $ids = array();
    foreach ($pages as $slug => $title) {
        $existing = get_page_by_path($slug);
        $ids[$slug] = $existing ? $existing->ID : wp_insert_post(array(
            'post_type' => 'page', 'post_status' => 'publish',
            'post_title' => $title, 'post_name' => $slug,
        ));
    }
    $products = array(
        'pchelka' => 'Учебный комплекс «Пчёлка»',
        'constructor' => 'Дрон-конструктор', 'lab' => 'Лабораторный стенд',
        'simulator' => 'АТС Симулятор', 'classroom' => 'Класс БПЛА',
    );
    if (is_numeric($ids['product'])) {
        foreach ($products as $slug => $title) {
            if (!get_page_by_path('product/' . $slug)) {
                wp_insert_post(array(
                    'post_type' => 'page', 'post_status' => 'publish',
                    'post_parent' => $ids['product'], 'post_title' => $title,
                    'post_name' => $slug,
                ));
            }
        }
    }
    if (is_numeric($ids['home']) && is_numeric($ids['news']) && !get_option('page_on_front') && !get_option('page_for_posts')) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $ids['home']);
        update_option('page_for_posts', $ids['news']);
    }
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'ats_site_install_pages');

function ats_site_old_hash_redirect() {
    if (!is_front_page()) return;
    ?>
    <script>
    (function () {
      var route = location.hash.match(/^#\/(product\/[a-z-]+|education|procurement|documents|about|contacts|equipment)\/?$/);
      if (route) location.replace(<?php echo wp_json_encode(home_url('/')); ?> + route[1] + '/');
    }());
    </script>
    <?php
}
add_action('wp_head', 'ats_site_old_hash_redirect', 1);
