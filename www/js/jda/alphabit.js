var Alphabit = (function() {
	var canvas,
		context,
		source,
		imageData,
		result = [],
		letters = {},
		//	default options
		SETTINGS = {
			selector: '.contact',
			padding: 1,
			width: 9,
			height: 7,
			color: '0,0,0,255'
		},
		LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

	(function() {
		canvas = document.createElement('canvas');

		console.log("Alphabeth: ", canvas);
		context = canvas.getContext('2d');

		addEventListeners();
	}());

	function addEventListeners() {
		source = document.createElement('img');
		source.addEventListener('load', source_loadHandler);
		source.addEventListener('error', source_errorHandler);
		source.src = 'img/misc/alphabet.png';
	}

	function source_loadHandler(e) {
		var i = 0,
			row = 0,
			col = 0,
			numLetter = 0,
			rowCollection = [],			
			dataLength,
			flag = 0;

		canvas.width = source.width;
		canvas.height = source.height;
		// Draw image into canvas
		context.drawImage(source, 0, 0, source.width, source.height);

		
		imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
		dataLength = imageData.length;

		for ( ; i < dataLength; i+=4 ) {
			//	rgba
			flag = ([imageData[i], imageData[i+1], imageData[i+2], imageData[i+3]].toString() === SETTINGS.color) ? 1 : 0;

			//	next col
			rowCollection.push(flag);
			col++;

			//	next row
			if (col % SETTINGS.width === 0) {
				result.push(rowCollection);
				rowCollection = [];
				row++;

				//	next letter
				if (row % (SETTINGS.height+SETTINGS.padding) === 0) {
					letters[LETTERS[numLetter]] = result;
					result = [];
					numLetter++;
				}

				
			}
		}

		console.log("result: ", letters);
	}

	function source_errorHandler(e) {

	}

	return letters;
}());