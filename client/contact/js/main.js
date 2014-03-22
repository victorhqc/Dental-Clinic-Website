(function(){
	"use strict";
	var Module = function(){
		this.a = App;

		this.fixWidth();
	};

	/**
	 * Fixes the width of the map to 100% of its parent
	 */
	Module.prototype.fixWidth = function(reload) {

		var map = document.getElementById('map');
		$(map).css('display', 'none'); // Hides the iframe to prevent misscalculations
		var width = map.parentNode.offsetWidth - 30;
		map.width = width;

		//Reloads the iframe
		if(reload === true){
			var src = map.src;
			map.src = '';
			map.src = src;
		}

		$(map).css('display', 'block');
	};

	window.onresize = function(event){
		m.fixWidth(true);
	}

	var m = new Module();
})();