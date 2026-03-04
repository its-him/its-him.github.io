/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Remove preload state as soon as DOM is ready (don't wait for all assets).
		document.addEventListener('DOMContentLoaded', function() {
			$body.removeClass('is-preload');
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
							$body.addClass('nav-alt');
						},
						leave: function() {
							$nav.removeClass('alt');
							$body.removeClass('nav-alt');
						},
					});

				// Ensure nav-alt state is synced on load/scroll as a fallback for Scrollex
				(function() {
					function syncNavAlt() {
						var scrolled = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
						// If scrolled past 20px or nav has 'alt' class, mark body with nav-alt
						if (scrolled > 20 || $nav.hasClass('alt')) {
							$body.addClass('nav-alt');
						} else {
							$body.removeClass('nav-alt');
						}
					}

					// Run on load and on scroll/resize
					syncNavAlt();
					$window.on('scroll resize', function() { syncNavAlt(); });
				})();

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 600,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});




			// Mobile: insert a hamburger toggle that toggles `body.nav-open`.
				// This keeps markup changes out of other pages and ensures consistent behavior.
				(function() {
					var $body = $('body');
					var $toggle = $('<button id="navToggle" aria-label="Toggle navigation" aria-expanded="false"><span class="fas fa-bars" aria-hidden="true"></span></button>');
					// Insert toggle before nav so it's visible in top-right.
					$nav.before($toggle);

					$toggle.on('click', function(e) {
						e.preventDefault();
						var open = $body.hasClass('nav-open');
						$body.toggleClass('nav-open', !open);
						$toggle.attr('aria-expanded', String(!open));
					});

					// Close nav when a nav link is clicked (on small screens)
					$nav.find('a').on('click', function() {
						if (window.matchMedia('(max-width: 768px)').matches) {
							$body.removeClass('nav-open');
							$toggle.attr('aria-expanded', 'false');
						}
					});

					// Close nav if window expanded beyond mobile
					$window.on('resize', function() {
						if (!window.matchMedia('(max-width: 768px)').matches) {
							$body.removeClass('nav-open');
							$toggle.attr('aria-expanded', 'false');
						}
					});
				})();

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 600
		});

})(jQuery);