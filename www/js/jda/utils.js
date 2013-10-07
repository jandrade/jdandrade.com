/**
 * Mouse events mapper
 * @enum {Object.<String>}
 */
var MouseEvent = ('ontouchstart' in document.documentElement) ?
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
	Element.prototype.addEventListener = function (type, handler, useCapture) {
		if (this.attachEvent) {
			window.console && console.log("is ie");
			this.attachEvent('on'+type, handler);
		}
		return this;
	};
}

if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function () {
	    for (var i = this.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = this[i];
	        this[i] = this[j];
	        this[j] = temp;
	    }
	    return this;
	}
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
window.CustomEvent = (function ExportsEvent () {
	
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
		if (!_eventCallbacks[type]){
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
		if (_eventCallbacks[type]){
			for (i in _eventCallbacks[type]){
				if (!!_eventCallbacks[type][i] && !!callback && _eventCallbacks[type][i].toString() === callback.toString()){
					_eventCallbacks[type].slice(i,1);
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
		
		for (i in callbacks){
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

function SingletonEnforcer () {}