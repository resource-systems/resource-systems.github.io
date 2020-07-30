// Strict mode
'use strict';

// Global variables
var touch_device = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch) || (navigator.maxTouchPoints > 0),
	$_document = $(document),
	$_window = $(window);

// Touch swipe detection
$.fn.swipe = function(options)
{
	options = $.extend({ left: null, right: null}, options);

	return this.each(function()
	{
		if (options.left || options.right)
		{
			var touchstart_x = 0,
				touchstart_y = 0,
				touchmove_x = 0,
				touchmove_y = 0,
				swipe = false;

			$(this).on('touchstart', function(touchstart_e)
			{
				touchstart_x = touchstart_e.pageX || touchstart_e.touches[0].pageX;
				touchstart_y = touchstart_e.pageY || touchstart_e.touches[0].pageY;
			});

			$(this).on('touchmove', function(touchmove_e)
			{
				if (swipe === false)
				{
					touchmove_x = touchstart_x - (touchmove_e.pageX || touchmove_e.touches[0].pageX);
					touchmove_y = touchstart_y - (touchmove_e.pageY || touchmove_e.touches[0].pageY);

					if (Math.abs(touchmove_x) > 10 && Math.abs(touchmove_y) < 10)
					{
						swipe = touchmove_x > 0 ? 'left' : 'right';
						return false;
					}
				}

				return true;
			});

			$_window.on('touchend', function(touchend_e)
			{
				if (swipe && options[swipe])
				{
					options[swipe]();
				}

				touchmove_x = 0;
				touchmove_y = 0;
				swipe = false;
			});
		}
	});
};
