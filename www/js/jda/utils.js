/**
 * Mouse events mapper
 * @enum {Object.<String>}
 */
var UIEvent = ('ontouchstart' in document.documentElement) ?
//	touch events
{
	START: 'touchstart',
	MOVE: 'touchmove',
	CLICK: 'touchend',
	END: 'touchend'
} :
//	desktop events
{
	START: 'mousedown',
	MOVE: 'mousemove',
	CLICK: 'click',
	END: 'mouseup'
};

//	handle events invoking directly a method inside the DOM Element
if (!Element.prototype.addEventListener) {
	Element.prototype.addEventListener = function(type, handler, useCapture) {
		if (this.attachEvent) {
			this.attachEvent('on' + type, function(event) {
				event.preventDefault = function() {
					event.returnValue = false;
					return false;
				};

				event.stopPropagation = function() {
					window.event.cancelBubble = true;
					return false;
				};

				event.target = event.srcElement;
				event.currentTarget = event.srcElement;


				handler(event);
			});
		}
		return this;
	};
}

if (!Element.prototype.removeEventListener) {
	Element.prototype.removeEventListener = function(type, handler, useCapture) {
		if (this.detachEvent) {
			this.detachEvent('on' + type, handler);
		}
		return this;
	};
}

if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
		for (var i = this.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = this[i];
			this[i] = this[j];
			this[j] = temp;
		}
		return this;
	};
}

/**
 * Events Bus module
 * @class
 *
 * @example
 * CustomEvent.addEventListener('custom_type', fnCallback);
 * CustomEvent.removeEventListener('custom_type', fnCallback);
 * CustomEvent.dispatchEvent('custom_type', [{'message': 'value'}]);
 */
window.CustomEvent = (function ExportsEvent() {

	var _eventCallbacks = {};

	/**
	 * @constructor
	 */
	(function() {
		if (typeof SingletonEnforcer.__instance === 'undefined') {
			SingletonEnforcer.__instance = getInstance();
		}
	}());


	/**
	 * Adds a new event listener
	 * @param {String}   type     The event type
	 * @param {Function} callback The event callback
	 * @function
	 */

	function addEventListener(type, callback) {
		if (!_eventCallbacks[type]) {
			_eventCallbacks[type] = [];
		}
		_eventCallbacks[type].push(callback);
	}

	/**
	 * Removes a selected event listener
	 * @param  {String}   type     The event type
	 * @param  {Function} callback The event callback
	 * @function
	 */

	function removeEventListener(type, callback) {
		var i;
		if (_eventCallbacks[type]) {
			for (i in _eventCallbacks[type]) {
				if ( !! _eventCallbacks[type][i] && !! callback && _eventCallbacks[type][i].toString() === callback.toString()) {
					_eventCallbacks[type].slice(i, 1);
				}
			}
		}
	}

	/**
	 * Removes a selected event listener
	 * @param  {String}   type     The event type
	 * @param  {Array.<Object>} data The data passed to the listener
	 * @function
	 */

	function dispatchEvent(type, data) {
		var i,
			callbacks = _eventCallbacks[type];

		for (i in callbacks) {
			callbacks[i].apply(this, data);
		}
	}

	/**
	 * Gets the singleton instance
	 * @return {Object} Public methods
	 */

	function getInstance() {
		return {
			addEventListener: addEventListener,
			removeEventListener: removeEventListener,
			dispatchEvent: dispatchEvent
		};
	}

	return SingletonEnforcer.__instance;
}());

function SingletonEnforcer() {}


var Prefixr = (function() {
	var _cssProperties = {
		textShadow: "textShadow",
		borderRadius: "borderRadius",
		transform: "transform",
		transitionDuration: "transitionDuration",
		boxShadow: "boxShadow",
		transition: "transition"
	};

	var _vendorsArray = ['', 'webkit', 'Webkit', 'moz', 'Moz', 'o', 'ms', 'Ms'];

	(function() {
		var i,
			tempProp,
			vendorsLength = _vendorsArray.length;

		//	looping into css properties object	
		for (var prop in _cssProperties) {
			//	looping into vendor types
			for (i = 0; i <= vendorsLength; ++i) {
				_cssProperties[prop] = null;
				tempProp = prop;
				//	capitalize CSS property
				if (_vendorsArray[i] !== '') {
					tempProp = prop.replace(/(^[a-z]{0,1})([\w])/g, replaceKey);
				}
				//	property found
				if (typeof document.documentElement.style[_vendorsArray[i] + tempProp] != 'undefined') {
					_cssProperties[prop] = _vendorsArray[i] + tempProp;
					break;
				}
			}
		}

	}());

	function replaceKey(m, key, value) {
		return key.toString().toUpperCase() + value;
	}

	return _cssProperties;
}());


var Utils = {
	/**
	 * matches a translate3D coordinate (from translate3D CSS3 property)
	 * @param value {String} The translate3D property string: 'translate3D(10px,0,-50px)'
	 * @param coordinate {String} The coordinate needed: 'x' || 'y' || 'z'
	 * @returns {Number}	Gets the selected coordinate value
	 */
	getTranslateCoordinate: function(value, coordinate) {
		var coordinateValue = 0,
			arrMatches = value.toString().match(/([0-9\-]+)+(?![3d]\()/gi);

		//	matches all the 3D coordinates (from translate3D CSS3 property)
		if (arrMatches && arrMatches.length) {
			//	Gets the array position: [x, y, z]
			var coordinatePosition = coordinate == 'x' ? 0 : coordinate == 'y' ? 1 : 2;
			coordinateValue = parseFloat(arrMatches[coordinatePosition]);
		}

		return coordinateValue;
	},
};