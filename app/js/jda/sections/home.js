/**
 * @fileOverview Homepage
 * @author Juan David Andrade <juandavidandrade@gmail.com>
 * @version 0.1
 */

/*global jda:true, jQuery:true, $:true */
(function(jda, $) {
	'use strict';

	jda.Home = function() {

		/**
		 * Main Element
		 * @type {HTMLElement}
		 */
		var element,
			/**
			 * Contact form
			 * @type {HTMLFormElement}
			 */
			boxes,
			/**
			 * Current box
			 * @type {Number}
			 */
			count = 0,
			/**
			 * Default options
			 * @type {Object}
			 */
			SETTINGS = {
				selector: '.home',
				boxes: '.rotate'
			};

		/**
		 * @constructs jda.Contact
		 */
		(function() {
			element = document.querySelector(SETTINGS.selector);
			boxes = element.querySelectorAll(SETTINGS.boxes);

			setTimeout(init, 500);
		}());

		/**
		 * initialize page
		 */
		function init() {
			var i = 0,
				numBoxes = boxes.length;
			for ( ; i < numBoxes; i++ ) {
				setTimeout(animateBox, 300*i);
			}
		}

		/**
		 * Animate current box
		 */
		function animateBox() {
			boxes[count].classList.add('reverse');
			count++;
		}
		
	};
}(window.jda = window.jda || {}, jQuery || $));