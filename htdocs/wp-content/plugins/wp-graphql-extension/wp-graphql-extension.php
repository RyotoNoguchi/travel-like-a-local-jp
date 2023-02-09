<?php
/**
 * Plugin Name: WP GraphQL Extension
 * Plugin URI: https://www.wpgraphql.com
 * Version: 0.0.1-beta
 * Author: WPGraphQL
 * Author URI: https://www.wpgraphql.com
 * Description: This is a plugin for querying post view count
 */

// この辺見て試してできた
// https://www.ensuredomains.com/wordpress-post-views-counter-without-plugin
// https://blog.hubspot.com/website/wordpress-post-views
// https://github.com/wp-graphql/wp-graphql/discussions/1860

/*
*
* Post View's Counter
*
*/
add_action('wp_head','ensure_views_counter');
function ensure_views_counter(){
	// Only Count On Posts
	if(!is_singular('post')){
		return false;
	}
	// Get Post ID
	$currentID = get_the_ID();
	// Check For Current Views
	$totalViews = get_post_meta($currentID, '_post_views_count', true);
	// Check If Is Int
	if(is_null($totalViews)) {
		$totalViews = 0;
	}
	if(!is_numeric($totalViews)){
	  $totalViews = 0;
	}
	// Increase by 1
	$totalViews++;
	// Update the total views
	update_post_meta($currentID,'_post_views_count', $totalViews);
}

add_action('graphql_register_types', 'graphql_extension_register_types');

function graphql_extension_register_types() {
	register_graphql_field('Post', 'viewCount', [
		'description' => __('This is just an example field', 'your-textdomain'),
		'type' => 'Int',
		'resolve' => function( ) {
			return get_post_meta( get_the_ID(), '_post_views_count', true );
		}
	]);

}