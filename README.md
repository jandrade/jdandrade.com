jdandrade.com
=============

Source code of my personal website


##Instalation Instructions

1. Open terminal and run this command: `npm install`
2. To generate a production code, run: `grunt build`

##Project Structure

- app/ (development)
	- css/
		- jda/
			+ base/ (Base styles, app fonts, layout styles, utils)
			+ components/ (component specific styles including media queries inside each file, i.e. buttons.css, dropdowns.css)
			+ sections/ (pages)
	- js/
		- jda/
			+ components/ (component specific functionalities, i.e. carousel.js, grid.js)
			+ sections/ (functionality for each page)
- public/ (production)