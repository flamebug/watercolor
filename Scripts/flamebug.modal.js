//
// Flamebug.Modal
//

(function ($) {

	//
	// flamebug Namespace
	// 

	if (!$.flamebug) {

		$.flamebug = new Object();

	};

	//
	// flamebug.Modal Plugin
	// 

	$.flamebug.Modal = function (el, options) {

		var base = this;					// use base to avoid scope issues (instead of 'this')
		base.$el = $(el);					// jQuery version of the element
		base.el = el;						// DOM version of the element
		base.$el.data("flamebug.Modal", base);		// reverse reference to the DOM object

		//
		// init: Initialize
		//

		base.init = function () {

			base.setupOptions();
			base.cacheElements();

			base.createOverlay();
			base.createPanel();

			base.attachEvents();

		};

		//
		// setupOptions: Set up options for the plugin
		//

		base.setupOptions = function () {

			base.options = $.extend({}, $.flamebug.Modal.defaults, options);

		};

		//
		// cacheElements: Cache basic elements for performance
		//

		base.cacheElements = function () {

			base.$body = $("body");
			base.$panel = base.$el;
			base.$link = $('a[href="#' + base.$el.attr("id") + '"]');
			base.$closeButtons = base.$el.find(".close");

		};

		//
		// createOverlay: Create the overlay under the body element
		//

		base.createOverlay = function () {

			base.$overlay = $(".fb-modal-overlay");

			if (base.$overlay.length == 0) {
				base.$overlay = $('<div class="fb-modal-overlay"></div>');
				base.$overlay.appendTo(base.$body);
			}

		};

		//
		// createPanel: Create the panel under the body element
		//

		base.createPanel = function () {

			base.$container = $('<div class="fb-modal-container"/>');
			base.$close = $('<a class="fb-modal-close close" title="close">&times;</a>');

			base.$container.appendTo(base.$body);
			base.$panel.appendTo(base.$container);
			base.$close.prependTo(base.$panel);

		};

		//
		// attachEvents: Attach the click event to the disclosure
		//

		base.attachEvents = function () {

			base.$link.click(base.linkClick);
			base.$panel.click(base.stopPropagation);
			base.$close.click(base.toggle);
			base.$closeButtons.click(base.toggle);
			
		};

		//
		// toggle: Toggle visibility of the target panel and overlay
		//

		base.toggle = function () {

			if (base.$container.hasClass("visible"))
				base.hide();
			else
				base.show();

		};

		//
		// show: show the overlay and panel
		//

		base.show = function () {

			//remove body scrollbars so there aren't body and modal scrollbars when modal content is too large for the screen
			base.$body.css({
				"overflow": "hidden"
			});

			base.$container.addClass("visible");
			base.$overlay.addClass("visible");

			base.$container.click(base.toggle);

		};

		//
		// hide: hide the overlay and panel
		//

		base.hide = function () {

			base.$container.removeClass("visible");
			base.$overlay.removeClass("visible");

			//return scrollbar control to the body
			base.$body.css({
				"overflow": "auto"
			});

			base.$container.unbind("click");

		};

		//
		// linkClick: Toggle the overlay/panel and prevent the link default action
		//

		base.linkClick = function (event) {

			base.toggle()
			event.preventDefault();

		};

		//
		// stopPropagation: Utility function to stop event propagation
		//

		base.stopPropagation = function (event) {

			event.stopPropagation();

		};

		base.init(); // trigger the initialization

	};

	//
	// defaults: Setup the default options for the plugin
	// 

	$.flamebug.Modal.defaults = {

	};

	//
	// Create the control, or return the instance if already instantiated
	// 

	$.fn.flamebugModal = function (options) {

		var instance = this.data("flamebug.Modal");

		if (instance != null) {
			return instance;
		}

		return this.each(function () {

			(new $.flamebug.Modal(this, options));

		});
	};

})(jQuery);

//
// Auto Plugin elements with .fb-Modal class
//

$(function () {

	$(".fb-modal").flamebugModal();

});