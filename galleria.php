<?php
/*
Plugin Name: Galleria
Plugin URI: http://amwhalen.com
Description: Displays a beautiful Galleria slideshow in place of the built-in WordPress image grid. Overrides the default functionality of the [gallery] shortcode.
Version: 1.0.1
Author: Andy Whalen
Author URI: http://amwhalen.com/
License: The MIT License
*/

require_once dirname(__FILE__) . '/amw-galleria/AMWGalleria.php';
$amw_galleria = new AMWGalleria(plugins_url(basename(dirname(__FILE__))));
