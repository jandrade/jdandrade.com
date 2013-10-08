window.onload = function() {

	var homeNav = new MainNav('.home-nav');
	var mainNav = new MainNav('.main-nav');

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


var MainNav = (function MainNav(el, options) {
	var element,
		container,
		header,
		currentSection,
		links,
		projects,
		contact,
		SETTINGS = {
			default: '.home',
			container: 'wrapper',
			header: 'header',
			links: 'a'
		};

	(function () {
		console.log("Main nav!!!! ");
		element = document.querySelector(el);
		container = document.getElementById(SETTINGS.container);
		header = document.getElementById(SETTINGS.header);
		links = element.querySelectorAll(SETTINGS.links);
		currentSection = document.querySelector(SETTINGS.default);
		addEventListeners();
	})();

	function addEventListeners() {
		var i = 0,
			numLinks = links.length;

		for ( ; i < numLinks; i++ ) {
			links[i].addEventListener(UIEvent.CLICK, links_clickHandler);
		}

		CustomEvent.addEventListener('link-click', updateSection);

		if (window.location.hash) {
			var target = window.location.hash.replace('#','');
			updateSection(target);
			console.log("------ load with hash!!!");
			loadSection(target);
		}
	}

	function updateSection(target) {
		currentSection = document.querySelector('.' + target);
		if (header.querySelector('a.' + target + '-button')) {
			header.querySelector('a.' + target + '-button').classList.add('current');
		}
	}

	function links_clickHandler(e) {
		e.preventDefault();
		var target = '';
		target = this.getAttribute('href');
		
		if (currentSection === null) {
			currentSection = document.querySelector('.error404');
		}

		currentSection.classList.remove('is-visible', 'is-open');

		
		var currentLink = header.querySelector('a.current');

		if (currentLink) {
			currentLink.classList.remove('current');
		}

		this.classList.add('current');
		
		loadSection(target);
	}

	function loadSection(target) {
		console.log("loadSection ", target);
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


		currentSection = document.querySelector('.' + target);

		if (currentSection === null) {
			currentSection = document.querySelector('.error404');
		}

		currentSection.classList.add('is-visible', 'is-open');
		
		CustomEvent.dispatchEvent('link-click', [target]);
	}
});
