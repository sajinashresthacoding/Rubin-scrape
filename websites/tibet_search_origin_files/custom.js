define([
    "jquery"
], function($) {

	
	 //Menu
	 $('.mobile-menu-button').click(function() {
		 $('body').toggleClass('sidr-open');
	 });
	 
	 //Add 2 Any
	 /*
     a2a_config.templates.email = {
 	    subject: "${title}, from the Rubin Museum of Art",
 	    body: "${title}, from the Rubin Museum of Art:\n\${link}"
     };
     
     a2a_config.templates.twitter = {
	    text: "${title} @RubinMuseum Online Collection ${link}"
     };
     */
     //Active menu state for static links
     
     $(document).ready(function() {
	    if (window.location.href.indexOf("groups/on-view") > -1) {
	      $('.emuseum-nav a[title="On View"]').addClass('active');
	      $('.emuseum-nav a[title="Featured Collections"]').removeClass('active');
	    }
	    if (window.location.href.indexOf("objects/images") > -1) {
	      $('.emuseum-nav a[title="All Works"]').addClass('active');
	    }
	  });
     
     //News Slider
     $('#closeSlider').click(function() {
		 $('#news_slider').slideToggle();
	 });
    
});
