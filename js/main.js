var App;

(function(){
	"use strict";

	window.dhtmlHistory.create({
		toJSON: function(o) {
			return JSON.stringify(o);
		}
		, fromJSON: function(s) {
			return JSON.parse(s);
		}
	});

	var Init = function(){
		this.getConfig();
	}

	/**
	 * Gets the modules to use and other configurations of the site.
	 */
	Init.prototype.getConfig = function() {
		var I = this;
		var lang = this.browserLanguage();
		var P = this;
		new Vi({url:'config.json', response:'json'}).server(function(r){
			var modules = {};
			for(var k in r.modules){
				if(r.modules.hasOwnProperty(k)){
					modules[k] = {nombre: k, url:r.url};
				}
			}

			//Adds the constructor method
			var k = 'constructor';
			modules[k] = {nombre: k, url:'client/'};

			var j = {name: 'Dental clinic', modules:modules, div:'#main', currentLang: lang};
			P.a = new AppSystem(j);
			App = P.a;

			P.a._data = r;
			P.a.init(function(){
				App.getModule(k);
				App.current.start();
			});
		});
	};

	Init.prototype.browserLanguage = function() {
		var lang = navigator.language || navigator.userLanguage;
		lang = lang.match(/([a-z]+)/gi);
		if(lang !== null){
			lang = lang[0];
		}

		var l = '';
		switch(lang){
			case 'es':
				l = lang;
			break;
			default:
			case 'en':
				l = lang;
			break;
		}

		return l;
	};


	var i = new Init();
})();