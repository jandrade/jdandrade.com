/**
 * @fileOverview Main Application
 * @author Juan David Andrade <juandavidandrade@gmail.com>
 * @version 0.1
 */

/*global jda:true*/
(function(jda) {
	'use strict';

	jda.App = function() {
		
		/**
		 * Application router
		 * @type {jda.Router}
		 */
		var	router,
			/**
			 * Homepage navigation
			 * @type {jda.Navigation}
			 */
			homeNav,
			/**
			 * Main navigation
			 * @type {jda.Navigation}
			 */
			mainNav,
			/**
			 * Default options
			 * @type {Object}
			 */
			SETTINGS = {
				mainNav: '.main-nav',
				homeNav: '.home-nav',
				home: '.home',
				visible: 'is-visible'
			};

		/**
		 * @constructs jda.App
		 */
		(function() {
			router = new jda.Router();
			homeNav = new jda.Navigation(SETTINGS.homeNav);
			mainNav = new jda.Navigation(SETTINGS.mainNav);

			init();
		}());

		/**
		 * initialize page
		 */
		function init() {
			new jda.Home();

			// show header
			document.getElementById('header').classList.add(SETTINGS.visible);
			document.getElementById('footer').classList.add(SETTINGS.visible);
	
			// load internal section
			if (window.location.hash) {
				var target = window.location.hash.replace('#','');
				loadSection(target);
			// load default page
			} else {
				document.querySelector(SETTINGS.home).classList.add(SETTINGS.visible);
			}

			addEventListeners();
		}

		/**
		 * Add application listeners
		 */
		function addEventListeners() {
			window.addEventListener("hashchange", hashchangeHandler, false);
			AppEvent.addEventListener('link-click', function(target) {
				router.load(target);
			});
		}

		/**
		 * Loads a new section
		 * @param  {String} target - Section name
		 */
		function loadSection(target) {
			router.load(target);
			mainNav.updateSection(target);
		}

		/**
		 * Hash changed
		 * @event
		 */
		function hashchangeHandler(e) {
			var target = e.newURL.split('#')[1];
			loadSection(target);
		}
		
		
	};
}(window.jda = window.jda || {}));