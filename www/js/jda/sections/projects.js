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
			};

		(function() {
			gridTest = new jda.GridSwitcher(images);
			element = document.querySelector(SETTINGS.selector);
			detail = element.querySelector(SETTINGS.detail);
			closeButton = element.querySelector(SETTINGS.closeButton);
			infoButton = element.querySelector(SETTINGS.infoButton);
			console.log("NEW Projects///////");
			//window.c = new jda.Carousel('.project-images');

			addEventListeners();
		}());

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

	var images = [
		'img/projects/big/yimino_01.jpg',
		'img/projects/big/halloween_01.jpg',
		'img/projects/big/tirefinder_01.jpg',
		'img/projects/big/guerreros_01.jpg',
		'img/projects/big/nissancv_01.jpg',
		'img/projects/big/burnthis_01.jpg',
		'img/projects/big/superautos_01.jpg',
		'img/projects/big/calendar_01.jpg',
		'img/projects/big/pildoras_01.jpg',
		'img/projects/big/centro_01.jpg',
		'img/projects/big/toyota_01.jpg',
		'img/projects/big/01.png'
	];
}(window.jda = window.jda || {}, jQuery || $));