document.addEventListener('DOMContentLoaded', function() {
	var mainApp = new jda.App();
	var homeNav = new jda.Navigation('.home-nav');
	var mainNav = new jda.Navigation('.main-nav');
	//mainApp.load('projects');
	//return;

	// load internal section
	if (window.location.hash) {
		var target = window.location.hash.replace('#','');
		mainApp.load(target);
		mainNav.updateSection(target);
	// load default page
	} else {
		document.querySelector('.home').classList.add('is-visible');
	}

	CustomEvent.addEventListener('link-click', function(target) {
		mainApp.load(target);
	});

	document.getElementById('header').classList.add('is-visible');
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
}, false);