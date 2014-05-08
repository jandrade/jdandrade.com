/**
 * @fileOverview Projects controller
 * @author Juan David Andrade <juandavidandrade@gmail.com>
 * @version 0.2
 */

/*global jda:true, jQuery:true, $:true */
(function(jda, $) {
	'use strict';

	jda.Projects = function() {
		var element,
			gridTest,
			detail,
			closeButton,
			infoButton,
			//	default options
			SETTINGS = {
				selector: '.projects',
				detail: '.project-info',
				closeButton: '.close-button',
				infoButton: '.info-button',
				collapsed: 'is-collapsed',
				openned: 'is-openned'
			},
			PROJECTS_URL = './data/projects.json';

		(function() {
			$.get(PROJECTS_URL, init);
		}());

		function init(data) {
			gridTest = new jda.GridSwitcher(data);
			element = document.querySelector(SETTINGS.selector);
			detail = element.querySelector(SETTINGS.detail);
			closeButton = element.querySelector(SETTINGS.closeButton);
			infoButton = element.querySelector(SETTINGS.infoButton);
			//window.c = new jda.Carousel('.project-images');

			addEventListeners();
		}

		function addEventListeners() {
			closeButton.addEventListener(UIEvent.CLICK, closeButton_clickHandler);
			infoButton.addEventListener(UIEvent.CLICK, infoButton_clickHandler);
		}

		function closeButton_clickHandler(e) {
			e.preventDefault();
			detail.classList.add(SETTINGS.collapsed);
			detail.classList.remove(SETTINGS.openned);
		}

		function infoButton_clickHandler(e) {
			e.preventDefault();
			detail.classList.remove(SETTINGS.collapsed);
			detail.classList.add(SETTINGS.openned);
		}
	};

}(window.jda = window.jda || {}, jQuery || $));