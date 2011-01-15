/*
 * jQuery UI Accordion 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */

/**
 * Created 'add' method, which allows you to append more accordion nodes
 * (for lack of a better term) to the widget, after it has been created.
 *
 * @url http://www.e-d20.com/jquery/ui/jquery.ui.accordion.custom.js
 * @author mcamden
 */

(function($) {

    // Create a new custom widget that uses the ui.accordion as it's base
    $.widget("ui.accordion.custom",
	$.ui.accordion,
	{
	    /**
	     * Appends an accordion node to the widget.
	     *
	     * @param {mixed} el
	     */
	    updateSize: function (el) {
		var o = this.options, self = this;
		el = $(el);

		// Header is hopefully just the first passed element
		var head = el.first();
		var content = head.next();
		

		// Attach header classes
		/*head.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all")
			.bind("mouseenter.accordion", function(){$(this).addClass('ui-state-hover');})
			.bind("mouseleave.accordion", function(){$(this).removeClass('ui-state-hover');})
			.bind("focus.accordion", function(){$(this).addClass('ui-state-focus');})
			.bind("blur.accordion", function(){$(this).removeClass('ui-state-focus');});
		*/
		// Attach content classes
		/*content
		.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");*/

		// Attach header el to widget.headers
		//this.headers.push(head[0]);

		// Create icons
		//this._createIcons();

		// Resize
		this.resize();

		// Attach roles
		/*head
		    .attr('role','tab')
		    .bind('keydown', function(event) {return self._keydown(event);})
		    .attr('aria-expanded', 'false')
		    .attr("tabIndex", "-1");
		    
		content
		    .attr('role','tabpanel')
		    .hide();*/

		// only need links in taborder for Safari
		if (!$.browser.safari)
			head.find('a').attr('tabIndex','-1');

		/*if (o.event) {
			head.bind((o.event) + ".accordion", function(event) {
				self._clickHandler.call(self, event, this);
				event.preventDefault();
			});
		}*/
		//this.element.append(head);
		//this.element.append(content);

		if(o.autoActivate) {
		    this.activate(this.headers.length - 1);
		}
	    }
	}
    );

    // Extend ui.accordion with the custom widget
    $.extend($.ui.accordion, {
	version: "1.8.2",
	customVersion: ".1",
	animations: {
	    slide: function(options, additions) {
		options = $.extend({
		    easing: "swing",
		    duration: 300
		}, options, additions);
		if ( !options.toHide.size() ) {
		    options.toShow.animate({
			height: "show"
		    }, options);
		    return;
		}
		if ( !options.toShow.size() ) {
		    options.toHide.animate({
			height: "hide"
		    }, options);
		    return;
		}
		var overflow = options.toShow.css('overflow'),
		percentDone = 0,
		showProps = {},
		hideProps = {},
		fxAttrs = [ "height", "paddingTop", "paddingBottom" ],
		originalWidth;
		// fix width before calculating height of hidden element
		var s = options.toShow;
		originalWidth = s[0].style.width;
		s.width( parseInt(s.parent().width(),10) - parseInt(s.css("paddingLeft"),10) - parseInt(s.css("paddingRight"),10) - (parseInt(s.css("borderLeftWidth"),10) || 0) - (parseInt(s.css("borderRightWidth"),10) || 0) );

		$.each(fxAttrs, function(i, prop) {
		    hideProps[prop] = 'hide';

		    var parts = ('' + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
		    showProps[prop] = {
			value: parts[1],
			unit: parts[2] || 'px'
		    };
		});
		options.toShow.css({
		    height: 0,
		    overflow: 'hidden'
		}).show();
		options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps,{
		    step: function(now, settings) {
			// only calculate the percent when animating height
			// IE gets very inconsistent results when animating elements
			// with small values, which is common for padding
			if (settings.prop == 'height') {
			    percentDone = ( settings.end - settings.start === 0 ) ? 0 :
			    (settings.now - settings.start) / (settings.end - settings.start);
			}

			options.toShow[0].style[settings.prop] =
			(percentDone * showProps[settings.prop].value) + showProps[settings.prop].unit;
		    },
		    duration: options.duration,
		    easing: options.easing,
		    complete: function() {
			if ( !options.autoHeight ) {
			    options.toShow.css("height", "");
			}
			options.toShow.css("width", originalWidth);
			options.toShow.css({
			    overflow: overflow
			});
			options.complete();
		    }
		});
	    },
	    bounceslide: function(options) {
		this.slide(options, {
		    easing: options.down ? "easeOutBounce" : "swing",
		    duration: options.down ? 1000 : 200
		});
	    }
	}
    },
    $.ui.accordion.custom
);

})(jQuery);
