(function(){
	"use strict";
	var started = false;
	var Module = function(){
		this.a = App;

		dhtmlHistory.initialize();
		dhtmlHistory.addListener(this.handleHistory);

		this.menu = document.getElementsByClassName('main-menu');
		this.buildMenu();
		this.calculateNewNumber();
		this.menuFunctionality();

		this.a.current.translate(); // <---- re translates the webpage to get the name of the menus

		this.start();
	};

	/**
	 * Selects the current selected menu
	 */
	Module.prototype.start = function(where) {
		//Selects home
		if(where === undefined){
			var where = dhtmlHistory.getCurrentLocation();
			where = (where !== '') ? where : 'home';
		}

		this.currentPage = where;
		var btn = document.querySelector('#top-menu *[data-module="'+where+'"]');
		this.adjustCategory(where, btn);

		this.loadCategory(where);
	};

	/**
	 * When the mouse enters in a category, it will move, to do this, it will change the classes of the menu
	 * A calculation is needed to acomplish that.
	 */
	Module.prototype.calculateNewNumber = function() {
		//The active category will be 1/4 of the total menu (aprox.)
		var maxActive = Math.floor(this.max / 3);
		this.maxActive = maxActive;
		var newNum = this.calculateNumbers(this.max - maxActive, this.total - 1);

		this.newNum = newNum.num;
	};

	/**
	 * The menu is dinamically created, although is not yet perfect, the numbers are calculated here.
	 * @return {[json]} Object containing the result of the calculation
	 */
	Module.prototype.calculateNumbers = function(max, total) {
		//The menu is not optimal, it works but further work will be required when more modules come by.		
		var num = Math.floor(max / total); // <----- If there are 4 items it will be 12 / 4 = 3 so it will be col-sm-3
		num = (num < 1) ? 1: num;

		//In case that num is lower than 12, then an offset will be added.
		var offset = (num < 12) ? (max - (total * num)) / 2 : 0;

		return {num: num, offset: offset};
	};

	/**
	 * Builds the menu
	 */
	Module.prototype.buildMenu = function() {
		var cat = this.a._data.modules;
		var total = Object.keys(cat).length;
		var max = 12; // <---- max number allowed by the bootstrap grid system
		var nums = this.calculateNumbers(max, total)

		var num = nums.num;
		var offset = nums.offset;

		this.max = max;
		this.total = total;
		this.num = num;
		this.offsetAux = offset;

		var offsetAux = false;
		for(var i = 0, len = this.menu.length; i < len; i++){
			var menu = this.menu[i];
			menu.innerHTML = '';
			for(var c in cat){
				if(cat.hasOwnProperty(c)){
					var ca = document.createElement('li');
					ca.setAttribute('data-module', c);
					var classn = 'col-sm-'+num;
					if(offset > 0 && offsetAux === false){
						classn += ' col-sm-offset-'+offset;
						offsetAux = true;
						ca.setAttribute('data-first', '');
					}
					ca.className = classn;
					var t = document.createElement('a');
					t.setAttribute('data-ltag', c);
					ca.appendChild(t);

					menu.appendChild(ca);
				}
			}
		}
	};

	/**
	 * Gives the functionality to the menu
	 * @requires jQuery
	 *
	 * I don't like the jQuery dependency but is easier that way. I know, I'm lazy :)
	 */
	Module.prototype.menuFunctionality = function() {
		var t = this;

		for(var i = 0, len = this.menu.length; i < len; i++){
			var menu = this.menu[i];

			var m = menu;
			var children = m.childNodes;

			$(children).mouseenter(function(){
				var category = this.getAttribute('data-module');
				t.adjustCategory(category, this);
			});

			$(children).click(function(){
				var category = this.getAttribute('data-module');
				t.start(category);
				t.loadCategory(category);
			});
		}

		$('#top-menu').mouseleave(function(){
			var category = t.currentPage;
			var btn = document.querySelector('#top-menu *[data-module="'+category+'"]');
			t.adjustCategory(category, btn);
		});
	};

	Module.prototype.loadCategory = function(category) {
		this.a.div = '#content';
		dhtmlHistory.add(category, {message: "Module " + category});
		this.a.getModule(category);
		this.a.current.start();
		started = true;
	};

	/**
	 * Animates a category from the menu
	 */
	Module.prototype.adjustCategory = function(category, el) {
		//First clean the previous selected category (when necessary)
		var calculatedNum = this.newNum;
		this.newNumbers(calculatedNum);

		el.setAttribute('data-active', '');
		el.className = 'col-sm-'+this.maxActive;
	};

	/**
	 * Change the menu classes
	 */
	Module.prototype.newNumbers = function(num) {
		var previous = document.getElementById('top-menu').childNodes;
		for(var i = 0, len = previous.length; i < len; i++){
			var p = previous[i];
			var classn = 'col-sm-'+num;
			if(p.getAttribute('data-first') !== null){
				classn += ' col-sm-offset-'+this.offset;
			}
			p.className = classn;
			if(p.getAttribute('data-active') !== null){
				p.removeAttribute('data-active');
			}
		}
	};

	Module.prototype.handleHistory = function(newLocation, historyData) {
		if(newLocation === ''){
			newLocation = 'home';
		}

		if(started === true){
			window.Constructor.loadCategory(newLocation);
		}
	};

	window.Constructor = new Module();
})();