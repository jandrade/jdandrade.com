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
		 * Previous button
		 * @type {HTMLAnchorElement}
		 */
			prevBtn,

		/**
		 * Next button
		 * @type {HTMLAnchorElement}
		 */
			nextBtn,
		
		/**
		 * Total of items
		 * @type {Number}
		 */
			numItems,

		/**
		 * Current Item
		 * @type {Number}
		 */
			index = 0,

		/**
		 * Transition size
		 * @type {Number}
		 */
			size,

		/**
		 * Initial drag position
		 * @type {Number}
		 */
			initialPos = 0,

		/**
		 * Previous drag position
		 * @type {Number}
		 */
			lastPos = 0,

		/**
		 * Dragging enabled
		 * @type {Boolean}
		 */
			isDragging = false,

		/**
		 * Default settings
		 * @type {Enum}
		 */
			SETTINGS = {
				wrapper: '.mask',
				items: 'img',
				prevBtn: '.prev-btn',
				nextBtn: '.next-btn',
				time: 0.5
			};

		/**
		 * @construcs jda.Carousel
		 */
		(function () {
			SETTINGS = $.extend(SETTINGS, options);
			console.log("SETTINGS: ", SETTINGS);
			element = (typeof selector === 'string') ? document.querySelector(selector) : selector;
			itemsWrapper = element.querySelector(SETTINGS.wrapper);
			items = element.querySelectorAll(SETTINGS.items);
			prevBtn = element.querySelector(SETTINGS.prevBtn);
			nextBtn = element.querySelector(SETTINGS.nextBtn);

			numItems = items.length;
			
			init();

			itemsWrapper.style.width = (numItems*100 + 1) + "%";
		}());

		function init() {
			resizeItems();
			addEventListeners();
		}

		/**
		 * Add DOM listeners
		 * @private
		 */
		function addEventListeners() {
			window.onresize = resizeItems;

			prevBtn.addEventListener(UIEvent.CLICK, prevBtn_clickHandler);
			nextBtn.addEventListener(UIEvent.CLICK, nextBtn_clickHandler);

			element.addEventListener(UIEvent.START, startHandler);
			element.addEventListener(UIEvent.MOVE, moveHandler);
			element.addEventListener(UIEvent.END, endHandler);
			
			document.body.addEventListener(UIEvent.END, releaseDragging);
		}

		/**
		 * Resize carousel items
		 */
		function resizeItems() {
			var i = 0;
			// get new carousel width
			size = element.offsetWidth;
		
			for ( ; i < numItems; i++) {
				items[i].style.width = size + 'px';
			}
			// maintain slide position
			goTo(-size*index);
		}

		/**
		 * Go to next item
		 */
		function next() {
			//index = (index + 1) % numItems;
			index = (index+1 < numItems-1) ? index+1 : numItems-1;
			
			goTo(-size*index);
		}

		/**
		 * Go to prev item
		 */
		function prev() {
			//index = (index - 1 + numItems) % numItems;
			index = (index-1 >= 0) ? index-1 : 0;
		
			goTo(-size*index);
		}

		/**
		 * Go to a selected index
		 * @param  {Number} pos - New position
		 */
		function goTo(pos) {
			itemsWrapper.style[Prefixr.transform] = 'translate3d(' + pos + 'px, 0, 0)';
		}

		function changeTransition(time) {
			itemsWrapper.style[Prefixr.transition] = 'all ' + time + 's';
		}

		/**
		 * Previous button clicked
		 * @event
		 */
		function prevBtn_clickHandler(e) {
			e.preventDefault();
			prev();
		}

		/**
		 * Next button clicked
		 * @event
		 */
		function nextBtn_clickHandler(e) {
			e.preventDefault();
			next();
		}

		/**
		 * Start dragging
		 * @event
		 */
		function startHandler(e) {
			e.preventDefault();
			isDragging = true;
			initialPos = e.touches ? e.touches[0].pageX : e.clientX;
			lastPos = initialPos;
		}

		/**
		 * Move wrapper
		 * @event
		 */
		function moveHandler(e) {
			e.preventDefault();
			if (!isDragging) {
				return;
			}

			changeTransition(0);
			var pos = Utils.getTranslateCoordinate(itemsWrapper.style[Prefixr.transform], 'x'),
				currentDragPos = e.touches ? e.touches[0].pageX : e.clientX;
			
			goTo(pos - lastPos + currentDragPos);
			lastPos = currentDragPos;
			
		}

		/**
		 * Stop dragging
		 * @event
		 */
		function endHandler(e) {
			e.preventDefault();
			var currentDragPos = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
			isDragging = false;
			
			changeTransition(SETTINGS.time);

			// move to next item
			if (initialPos - currentDragPos > 50) {
				next();
			// move to prev item
			} else if (initialPos - currentDragPos < -50) {
				prev();
			// go to current item
			} else {
				goTo(-size*index);
			}
		}

		/**
		 * Stop dragging (body)
		 * @event
		 */
		function releaseDragging(e) {
			e.preventDefault();
			isDragging = false;
			changeTransition(SETTINGS.time);
			goTo(-size*index);
		}
		
		// public methods and properties
		return element;
	};

	$.fn.jCarousel = function(options) {
		return this.each(function(index, item) {
			return new jda.Carousel(item, options);
		});
	};

}(window.jda = window.jda || {}));