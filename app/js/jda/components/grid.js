(function(jda) {
	'use strict';

	jda.GridSwitcher = (function(data) {
		//	constants
		var SETTINGS = {
			element: '.section-content',
			container: '.grid',
			elements: '.tile',
			info: '.project-info',
			backButton: '.back-button',
			frontFace: '.front',
			backFace: '.back',
			selected: 'detail',
			elementView: '<div class="tile"><a href="#"><div class="info"></div><div class="front"></div><div class="back"></div></a></div>'
		};

		//	attributes
		var element = document.querySelector(SETTINGS.element),
			grid = element.querySelector(SETTINGS.container),
			tiles,
			tileHeight = 200,
			tileWidth = 200,
			tilesPerRow = 4,
			gridWidth,
			gridHeight,
			numRows = 3,
			project = {},
			info = element.querySelector(SETTINGS.info),
			backButton = element.querySelector(SETTINGS.backButton),
			i = 0,
			xPos = 0,
			yPos = 0,
			numTiles = data.length,
			isHovered = false;

		
		/**
		 * @constructor
		 */
		(function() {
			var currentTile,
				gridStr = '';
			grid.innerHTML = '';
			
			element.classList.remove(SETTINGS.selected);
			
			

			for ( ; i < numTiles; i++) {
				gridStr += SETTINGS.elementView;
			}

			$(gridStr).appendTo(grid);

			tiles = document.querySelectorAll(SETTINGS.elements);

			// build tiles
			for ( i = 0 ; i < numTiles; i++) {
				tiles[i].querySelector('a').addEventListener(UIEvent.CLICK, tile_clickHandler);
				tiles[i].querySelector('.info').innerHTML = data[i].name;
				tiles[i].querySelector(SETTINGS.frontFace).style.backgroundImage = "url('" + data[i].image + "')";
			}

			resizeGrid();

			backButton.addEventListener(UIEvent.CLICK, backButton_clickHandler);
			window.onresize = resizeGrid;
		}());

		function resizeGrid() {
			xPos = 0;
			yPos = 0;

			gridWidth = grid.offsetWidth;
			gridHeight = gridWidth*0.625;

			grid.style.height = gridHeight + 'px';

			tileWidth = tiles[0].offsetWidth;
			tileHeight = tiles[0].offsetHeight;
			
			tilesPerRow = Math.floor(grid.offsetWidth / tileWidth);
			
			for ( i = 0 ; i < numTiles; i++) {
				if (i > 0 && i % tilesPerRow === 0) {
					xPos = 0;
					yPos -= tileHeight;
				}
				tiles[i].querySelector(SETTINGS.frontFace).style.backgroundSize = (tileWidth*tilesPerRow) + 'px ' + (tileHeight*numRows) + 'px';
				tiles[i].querySelector(SETTINGS.backFace).style.backgroundSize = (tileWidth*tilesPerRow) + 'px ' + (tileHeight*numRows) + 'px';
				
				tiles[i].querySelector(SETTINGS.frontFace).style.backgroundPosition = xPos + 'px ' + yPos + 'px';
				tiles[i].querySelector(SETTINGS.backFace).style.backgroundPosition = xPos + 'px ' + yPos + 'px';
				xPos -= tileWidth;
				
			}
		}

		function toggleGrid(currentPos) {
			var i = 0,
				skillsContainer,
				visitButton = info.querySelector('.visit-button'),
				randTiles = [0,1,2,3,4,5,6,7,8,9,10,11].shuffle();
			
			isHovered = !isHovered;

			project = data[currentPos];
			
			info.querySelector('h2').innerHTML = project.name;
			info.querySelector('p').innerHTML = project.description;
			skillsContainer = info.querySelector('.skills');

			if (project.url === '#') {
				visitButton.style.display = 'none';
			} else {
				visitButton.style.display = 'block';
				visitButton.href = project.url;	
			}
			
			skillsContainer.innerHTML = '';

			// loop into skills
			for (i = 0; i < project.skills.length; i++) {
				skillsContainer.innerHTML += '<li class="skill">' + project.skills[i] + '</li>';
			}
			
			// loop into tiles
			for (i = 0; i < numTiles; i++) {
				var countScope = 0;
				if (isHovered) {
					tiles[i].querySelector(SETTINGS.backFace).style.backgroundImage = "url('" + project.image + "')";
				}
				setTimeout(function() {
					if (isHovered) {
						tiles[randTiles[countScope]].classList.add(SETTINGS.selected);
						info.classList.add('is-openned');
					} else {
						tiles[randTiles[countScope]].classList.remove(SETTINGS.selected);
						info.classList.remove('is-openned');
						info.querySelector('h2').innerHTML = '';
						info.querySelector('p').innerHTML = '';
						skillsContainer.innerHTML = '';
					}
					

					countScope++;
				}, 30*randTiles[i]);
			}

			
			element.classList.toggle(SETTINGS.selected);
		}

		function backButton_clickHandler(e) {
			e.preventDefault();
			toggleGrid(0);
		}
		

		function tile_clickHandler(e) {
			e.preventDefault();

			var currentPos = $(tiles).index($(e.currentTarget).parent());

			toggleGrid(currentPos);
		}
	});
}(window.jda = window.jda || {}));