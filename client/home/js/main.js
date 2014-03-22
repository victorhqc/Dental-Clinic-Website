(function(){
	"use strict";
	var Module = function(){
		this.a = App;

		this.adjustGalleryHeight();
		this.buildGallery();
	};

	Module.prototype.adjustGalleryHeight = function() {
		var g = document.querySelector('#gallery');
		var h = $(window).height();
		h = (h > 400) ? 400 : h;

		$(g).css('height', h+'px');
	};

	Module.prototype.buildGallery = function() {
		var imgs = this.a._data.gallery.images;
		
		var gj = {images:imgs, container: '#gallery'};
		this.gallery = new YGallery(gj);
	};

	var m = new Module();
})();