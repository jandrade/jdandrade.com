window.onload = function() {
	var mainApp = new MainApp();
	var homeNav = new MainNav('.home-nav');
	var mainNav = new MainNav('.main-nav');
	mainApp.load('projects');
	return;

	if (window.location.hash) {
		var target = window.location.hash.replace('#','');
		loadSection(target);
	}

	CustomEvent.addEventListener('link-click', function(target) {
		console.log("///// llink changed!!!!!!!!");
		
	});

	document.getElementById('header').classList.add('is-visible');
	document.querySelector('.home').classList.add('is-visible');
	document.getElementById('footer').classList.add('is-visible');
		
	setTimeout(function() {
		var elements = document.querySelectorAll('.rotate');

		var count = 0;

		for (var i = 0; i < elements.length; i++ ) {

			setTimeout(function() {
				elements[count].classList.add('reverse');
				count++;
			}, 300*i);
			
		}
	}, 500);



};

var MainApp = function(el, options) {

	var currentSection,
		container,
		SETTINGS = {
			container: 'wrapper',
			default: '.home'
		};
		

	(function() {
		console.log("new MainApp.....");
		container = document.getElementById(SETTINGS.container);
		currentSection = document.querySelector(SETTINGS.default);
	}());

	function load(target) {
		console.log("////// load section: ", target);
		if (currentSection === null) {
			currentSection = document.querySelector('.error404');
		}

		currentSection.classList.remove('is-visible', 'is-open');

		currentSection = document.querySelector('.' + target);

		//	go to home
		if ( (currentSection && currentSection.classList.contains('home'))) {
			container.classList.remove('is-home');
		}

		if (target === '/' || target === './') {
			target = 'home';
			container.classList.add('is-home');
		}

		if (target === 'projects' && typeof projects === 'undefined') {
			projects = new Projects();
		}

		if (target === 'contact' && typeof contact === 'undefined') {
			contact = new Contact();
		}

		currentSection.classList.add('is-visible', 'is-open');
	}

	return {
		load: load
	};
};


var MainNav = (function MainNav(el, options) {
	var element,
		header,
		links,
		projects,
		contact,
		SETTINGS = {
			header: 'header',
			links: 'a'
		};

	(function () {
		console.log("Main nav!!!! ");
		element = document.querySelector(el);
		header = document.getElementById(SETTINGS.header);
		links = element.querySelectorAll(SETTINGS.links);
		addEventListeners();
	})();

	function addEventListeners() {
		var i = 0,
			numLinks = links.length;

		for ( ; i < numLinks; i++ ) {
			links[i].addEventListener(UIEvent.CLICK, links_clickHandler);
		}

		CustomEvent.addEventListener('link-click', updateSection);

	}

	function updateSection(target) {
		console.log("------ UPDATE SECTION -----------");
		
		if (header.querySelector('a.' + target + '-button')) {
			header.querySelector('a.' + target + '-button').classList.add('current');
		}
	}

	function links_clickHandler(e) {
		e.preventDefault();
		var target = '';
		target = this.getAttribute('href');
		

		
		var currentLink = header.querySelector('a.current');

		if (currentLink) {
			currentLink.classList.remove('current');
		}

		this.classList.add('current');

		CustomEvent.dispatchEvent('link-click', [target]);
	}

});
