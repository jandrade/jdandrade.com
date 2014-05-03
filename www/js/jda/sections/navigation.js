/**
 * @fileOverview Main navigation
 * @author Juan David Andrade <juandavidandrade@gmail.com>
 * @version 0.2
 */

/*global jda:true, jQuery:true, $:true */
(function(jda, $) {
	'use strict';

	jda.Navigation = function (el, options) {
		/**
		 * Main Element
		 * @type {HTMLElement}
		 */
		var element,
			header,
			links,
			projects,
			contact,
			/**
			 * Default Settings
			 * @type {Object}
			 */
			SETTINGS = {
				header: 'header',
				links: '.section-link'
			};

		(function () {
			element = document.querySelector(el);
			header = document.getElementById(SETTINGS.header);
			links = element.querySelectorAll(SETTINGS.links);
			addEventListeners();
		})();

		/**
		 * Add section listeners
		 */
		function addEventListeners() {
			var i = 0,
				numLinks = links.length;

			for ( ; i < numLinks; i++ ) {
				links[i].addEventListener(UIEvent.CLICK, links_clickHandler);
			}

			CustomEvent.addEventListener('link-click', updateSection);
		}

		/**
		 * Update selected link
		 * @param  {String} target - The new section
		 */
		function updateSection(target) {
			if (header.querySelector('a.' + target + '-button')) {
				header.querySelector('a.' + target + '-button').classList.add('current');
			}
		}

		/**
		 * Item clicked
		 * @event
		 */
		function links_clickHandler(e) {
			e.preventDefault();
			var target = e.target.getAttribute('href');
			window.location.hash = target;
			
			var currentLink = header.querySelector('a.current');

			if (currentLink) {
				currentLink.classList.remove('current');
			}

			e.target.classList.add('current');

			CustomEvent.dispatchEvent('link-click', [target]);
		}

	};
}(window.jda = window.jda || {}, jQuery || $));