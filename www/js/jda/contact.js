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
			fieldsCollection = [],
			currentField,
			numFields = fields.length;

		for ( ; i < numFields; i++ ) {
			var countScope = 0;
			currentField = {
				element: fields[i],
				isInvalid: false
			};

			if (currentField.element.value === '') {
				form.querySelector(SETTINGS.errorPrefix + currentField.element.name).classList.add(SETTINGS.invalid);
				setTimeout(function() {
					currentField = {
						element: fields[countScope],
						isInvalid: false
					};
					form.querySelector(SETTINGS.errorPrefix + currentField.element.name).classList.remove(SETTINGS.invalid);
					countScope++;
				},2000);
			}
			fieldsCollection.push(currentField);
		}
	}

	function addEventListeners() {
		form.addEventListener('submit', submit_clickHandler);
	}

	function submit_clickHandler(e) {
		e.preventDefault();
		validate();
		return false;
	}
};