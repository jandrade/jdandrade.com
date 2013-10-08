/**
 * @fileOverview Carousel plugin
 * @author Juan Andrade <juandavidandrade@gmail.com>
 */

(function (jda) {
	'use strict';
	
	/**
	 * Represents the Carousel instance
	 * @constructor
	 * @return {Object} Exposed methods
	 */
	jda.Carousel = function(selector, options) {

		/**
		 * Carousel container
		 * @type {HTMLElement}
		 */
		var element,
		
		/**
		 * Items container (strip)
		 * @type {HTMLElement}
		 */
			itemsWrapper,
		
		/**
		 * Items collection
		 * @type {NodeList}
		 */
			items,
		
		/**
		 * Total of items
		 * @type {Number}
		 */
			numItems,

		/**
		 * Current Item
		 * @type {Number}
		 */
			currentItem,

		/**
		 * Transition size
		 * @type {Number}
		 */
			size,

		/**
		 * Default settings
		 * @type {Enum}
		 */
		SETTINGS = {
			wrapper: '.mask',
			items: 'img'
		};

		
		/**
		 * @construcs ui.Join
		 */
		(function () {
			element = document.querySelector(selector);
			itemsWrapper = element.querySelector(SETTINGS.wrapper);
			items = element.querySelectorAll(SETTINGS.items);
			numItems = items.length;
			size = element.offsetWidth;
		
			init();
		}());

		function init() {

			var i = 0;

			for ( ; i < numItems; i++) {
				items[i].style.width = size + 'px';
			}
			addEventListeners();
		}

		/**
		 * Add DOM listeners
		 * @private
		 */
		function addEventListeners() {
			
		}

		function next() {
			var pos = Utils.getTranslateCoordinate(itemsWrapper.style[Prefixr.transform], 'x');
			console.log("NEXT: ", pos);
			goTo(pos-size);
		}

		function prev() {
			var pos = Utils.getTranslateCoordinate(itemsWrapper.style[Prefixr.transform], 'x');
			
			goTo(pos+size);
		}

		function goTo(pos) {
			itemsWrapper.style[Prefixr.transform] = 'translate3d(' + pos + 'px, 0, 0)';
		}
		
		//	public methods and properties
		return {
			next: next,
			prev: prev
		};
	};

}(window.jda = window.jda || {}));