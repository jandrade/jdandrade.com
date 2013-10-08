var Contact = function() {
	var element,
		form,
		fields,
		//	default options
		SETTINGS = {
			selector: '.contact',
			form: 'form',
			fields: 'input, textarea',
			errorPrefix: '.error-',
			invalid: 'is-invalid'
		};

	(function() {
		element = document.querySelector(SETTINGS.selector);
		form = element.querySelector(SETTINGS.form);
		fields = form.querySelectorAll(SETTINGS.fields);

		addEventListeners();
	}());

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

	function addEventListeners() {
		form.addEventListener('submit', submit_clickHandler);
	}

	function submit_clickHandler(e) {
		e.preventDefault();
		if (validate()) {
			alert("send");
		}
		return false;
	}
};

var FormValidator = {};


var ValidatorRules = {
	required: function(value) {
		return /\S+$/.test(value);
	},
	email: function(value) {
		return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
	}
};