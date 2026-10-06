<?php
/**
 * News-only theme for the AviatechnoSoft static site.
 */

if (!defined('ABSPATH')) {
    exit;
}

function ats_news_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'ats_news_setup');

function ats_news_main_site_url() {
    $configured = get_theme_mod('ats_main_site_url', '');
    if ($configured) {
        return trailingslashit(esc_url_raw($configured));
    }

    $parts = wp_parse_url(home_url('/'));
    $origin = $parts['scheme'] . '://' . $parts['host'];
    if (!empty($parts['port'])) {
        $origin .= ':' . $parts['port'];
    }
    return trailingslashit($origin);
}

function ats_news_main_url($path = '') {
    return ats_news_main_site_url() . ltrim($path, '/');
}

function ats_news_assets() {
    wp_enqueue_style('ats-main-site', ats_news_main_url('assets/css/styles.css'), array(), null);
    wp_enqueue_style('ats-news', get_stylesheet_uri(), array('ats-main-site'), wp_get_theme()->get('Version'));
    wp_enqueue_script('ats-news-menu', get_template_directory_uri() . '/assets/menu.js', array(), wp_get_theme()->get('Version'), true);
}
add_action('wp_enqueue_scripts', 'ats_news_assets');

function ats_news_customizer($customizer) {
    $customizer->add_section('ats_news_integration', array(
        'title' => 'Связь с основным сайтом',
        'priority' => 30,
    ));
    $customizer->add_setting('ats_main_site_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $customizer->add_control('ats_main_site_url', array(
        'label' => 'Адрес основного сайта',
        'description' => 'Например: https://example.ru/ — здесь должны находиться index.html и assets/.',
        'section' => 'ats_news_integration',
        'type' => 'url',
    ));
}
add_action('customize_register', 'ats_news_customizer');
