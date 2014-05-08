/**
 * @fileOverview Application router
 * @author Juan David Andrade <juandavidandrade@gmail.com>
 * @version 0.2
 */

/*global jda:true*/
(function(jda) {
	'use strict';

	jda.Router = function(el, options) {

		var currentSection,
			container,
			contact,
			projects,
			/**
			 * Default Settings
			 * @type {Object}
			 */
			SETTINGS = {
				container: 'wrapper',
				default: 'home'
			};
			

		(function() {
			container = document.getElementById(SETTINGS.container);
			currentSection = document.querySelector('.' + SETTINGS.default);
		}());

		function load(target) {
			currentSection.classList.remove('is-visible', 'is-open');
			
			//	go to home
			if ( (currentSection && currentSection.classList.contains(SETTINGS.default))) {
				container.classList.remove('is-home');
			}
			
			currentSection = document.querySelector('.' + target);

			if (currentSection === null) {
				currentSection = document.querySelector('.error404');
			}

			if (target === '/' || target === SETTINGS.default) {
				target = SETTINGS.default;
				container.classList.add('is-home');
			}

			if (target === 'projects' && typeof projects === 'undefined') {
				projects = new jda.Projects();
			}

			if (target === 'contact' && typeof contact === 'undefined') {
				contact = new jda.Contact();
			}

			currentSection.classList.add('is-visible', 'is-open');
		}

		return {
			load: load
		};
	};
}(window.jda = window.jda || {}));