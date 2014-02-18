//
// Flamebug.Disclosure
//

(function($){

	//
	// flamebug Namespace
	// 

	if(!$.flamebug){

		$.flamebug = new Object();

	};

	//
	// flamebug.Disclosure Plugin
	// 

	$.flamebug.Disclosure = function(el, options){

		var base = this;							// use base to avoid scope issues (instead of 'this')
		base.$el = $(el);							// jQuery version of the element
		base.el = el;								// DOM version of the element
		base.$el.data("flamebug.Disclosure", base);				// reverse reference to the DOM object

		//
		// init: Initialize
		//

		base.init = function(){

			base.setupOptions();
			base.cacheElements();
			
			base.attachEvents();
			  
		};

		//
		// setupOptions: Set up options for the plugin
		//

		base.setupOptions = function(){

			base.options = $.extend({}, $.flamebug.Disclosure.defaults, options);
		
		};

		//
		// cacheElements: Cache basic elements for performance
		//

		base.cacheElements = function() {

			base.$target = $(base.$el.attr("href"));

		};
	 
		//
		// attachEvents: Attach the click event to the disclosure
		//

		base.attachEvents = function() {

			// clicking the disclosure link will toggle the target
			base.$el.click(function() {       
  
				if(base.$target.is(":visible"))
					base.hideTarget();
				else
					base.showTarget();

				return false;
				
			});
      
		};
 
		//
		// showTarget: Show the target panel
		//

		base.showTarget = function(){

			base.$el.addClass("open");
			base.$el.removeClass("closed");

			base.$target.fadeIn();
			  
		};

		//
		// hideTarget: Hide the target panel
		//

		base.hideTarget = function(){

			base.$el.removeClass("open");
			base.$el.addClass("closed");

			base.$target.fadeOut();
			  
		};

		base.init(); // trigger the initialization
	};

	//
	// defaults: Setup the default options for the plugin
	// 

	$.flamebug.Disclosure.defaults = {


	};

	//
	// setup the options provided by the instance
	// 

	$.fn.flamebug_Disclosure = function(options){

		return this.each(function(){

			(new $.flamebug.Disclosure(this, options));

		});

	};

	//
	// getter function
	// 

	$.fn.getflamebug_Disclosure = function(){

		this.data("flamebug.Disclosure");

	};

})(jQuery);

//
// Auto Plugin elements with .fb-disclosure class
//

$(function () {

	$(".fb-disclosure").flamebug_Disclosure();

});