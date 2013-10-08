(function(jda) {
	'use strict';

	jda.GridSwitcher = (function(images) {
		//	constants
		var SETTINGS = {
			container: '.grid',
			elements: '.tile',
			info: '.project-info',
			backButton: '.back-button',
			frontFace: '.front',
			backFace: '.back',
			selected: 'detail',
			elementView: '<li class="tile"><a href="#"><div class="front"></div><div class="back"></div></a></li>'
		};

		//	attributes
		var grid = document.querySelector(SETTINGS.container),
			tiles,
			tileHeight = 200,
			tileWidth = 200,
			tilesPerRow = 4,
			gridWidth,
			gridHeight,
			numRows = 3,
			info = document.querySelector(SETTINGS.info),
			backButton = document.querySelector(SETTINGS.backButton),
			i = 0,
			xPos = 0,
			yPos = 0,
			numTiles = images.length,
			isHovered = false;

		
		/**
		 * @constructor
		 */
		(function() {
			var currentTile,
				gridStr = '';
			grid.innerHTML = '';
			grid.classList.remove(SETTINGS.selected);
			info.classList.remove(SETTINGS.selected);

			

			for ( ; i < numTiles; i++) {
				gridStr += SETTINGS.elementView;
			}

			$(gridStr).appendTo(grid);

			tiles = document.querySelectorAll(SETTINGS.elements);

			for ( i = 0 ; i < numTiles; i++) {
				tiles[i].querySelector('a').addEventListener(MouseEvent.CLICK, tile_clickHandler);
				tiles[i].querySelector(SETTINGS.frontFace).style.backgroundImage = "url('" + images[i] + "')";
			}

			resizeGrid();

			window.onresize = resizeGrid;
		}());

		function resizeGrid() {
			xPos = 0;
			yPos = 0;

			gridWidth = grid.offsetWidth;
			gridHeight = gridWidth*0.625;

			grid.style.height = gridHeight + 'px';

			tileWidth = tiles[0].offsetWidth + 1;
			tileHeight = tiles[0].offsetHeight + 1;
			console.log("tileWidth: ")

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
		

		function tile_clickHandler(e) {
			e.preventDefault();
			var currentPos = $(tiles).index($(e.currentTarget).parent()),
				randTiles = [0,1,2,3,4,5,6,7,8,9,10,11].shuffle();
			
			isHovered = !isHovered;

			for ( i=0 ; i < numTiles; i++) {
				var countScope = 0;
				if (isHovered) {
					tiles[i].querySelector(SETTINGS.backFace).style.backgroundImage = "url('" + images[currentPos] + "')";
				}
				setTimeout(function() {
					//if (currentPos !== randTiles[countScope] && isHovered) {
					if (isHovered) {
						tiles[randTiles[countScope]].classList.add(SETTINGS.selected);
					} else {
						tiles[randTiles[countScope]].classList.remove(SETTINGS.selected);
					}
					

					countScope++;
				}, 30*randTiles[i]);
			}

			
			grid.classList.toggle(SETTINGS.selected);
			info.classList.toggle(SETTINGS.selected);
		}
	});
}(window.jda = window.jda || {}));