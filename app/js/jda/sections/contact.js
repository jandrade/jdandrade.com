/**
 * @fileOverview Contact section
 * @author Juan David Andrade <juandavidandrade@gmail.com>
 * @version 0.2
 */

/*global jda:true, jQuery:true, $:true */
(function(jda, $) {
	'use strict';

	jda.Contact = function() {

		/**
		 * Main Element
		 * @type {HTMLElement}
		 */
		var element,
			/**
			 * Contact form
			 * @type {HTMLFormElement}
			 */
			form,
			/**
			 * Array of fields
			 * @type {NodeList}
			 */
			fields,
			/**
			 * Default options
			 * @type {Object}
			 */
			SETTINGS = {
				selector: '.contact',
				form: 'form',
				fields: 'input, textarea',
				errorPrefix: '.error-',
				invalid: 'is-invalid'
			};

		/**
		 * @constructs jda.Contact
		 */
		(function() {
			element = document.querySelector(SETTINGS.selector);
			form = element.querySelector(SETTINGS.form);
			fields = form.querySelectorAll(SETTINGS.fields);

			addEventListeners();
		}());

		/**
		 * Add form listeners
		 */
		function addEventListeners() {
			form.addEventListener('submit', submit_clickHandler);
		}

		/**
		 * Validate form
		 */
		function validate() {
			var i = 0,
				j = 0,
				numErrors = 0,
				currentField,
				fieldsCollection = {},
				isValid,
				numFields = fields.length,
				fnValidation,
				numValidations;

			// loop into fields
			for (; i < numFields; i++) {
				isValid = true;

				var countScope = 0;
				currentField = fields[i];
				

				numValidations = fields[i].classList.length;

				for ( j = 0; j < numValidations; j++) {
					fnValidation = currentField.classList[j].replace('js-', '');
					
					if (!ValidatorRules[fnValidation](currentField.value)) {
						isValid = false;
					}
				}

				if (!isValid) {
					fieldsCollection[currentField.name] = currentField;
					form.querySelector(SETTINGS.errorPrefix + currentField.name).classList.add(SETTINGS.invalid);
					numErrors++;
				}

				
			}

			setTimeout(hideErrors, 2000);

			function hideErrors() {
				for (var name in fieldsCollection) {
					form.querySelector(SETTINGS.errorPrefix + name).classList.remove(SETTINGS.invalid);
				}
			}

			return numErrors === 0;
			
		}

		/**
		 * Form submitted
		 * @event
		 */
		function submit_clickHandler(e) {
			e.preventDefault();
			if (validate()) {
				form.submit();
			}
			return false;
		}
	};

	/**
	 * Rules List
	 * @type {Object}
	 */
	var ValidatorRules = {
		required: function(value) {
			var re = new RegExp(/\S+$/);
			return re.test(value);
		},
		email: function(value) {
			var re = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
			return re.test(value);
		}
	};
}(window.jda = window.jda || {}, jQuery || $));