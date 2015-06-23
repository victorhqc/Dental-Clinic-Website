angular.module('home').controller('HomeCtrl',function($scope){

    $scope.images = {
        "1":{
            "src":"img/home/1.jpg",
            "title":"Haz una cita con nosotros.",
            "subtitle":"Lorem ipsum dolor sit amet, consectetur adipiscing.",
            "href":""
        },
        "2":{
            "src":"img/home/2.jpg",
            "title":"Nuestra experiencia nos respalda",
            "subtitle":"et pro impetus persius assueverit",
            "href":""
        },
        "3":{
            "src":"img/home/3.jpg",
            "title":"Ortodoncia correctiva",
            "subtitle":"eum posse labore postulant id.",
            "href":""
        },
        "4":{
            "src":"img/home/4.jpg",
            "title":"Ortodoncia pediátrica",
            "subtitle":"et pro impetus persius assueverit",
            "href":""
        }
    };

    function adjustGalleryHeight()
    {
        var g = document.querySelector('#gallery');
        var h = $(window).height();
        h = (h > 400) ? 400 : h;

        $(g).css('height', h+'px');
    }

    function buildGallery()
    {
        var id = 'gallery';
        var imgs = $scope.images;
        var element = document.getElementById(id);
        element.innerHTML = '';

        var gj = {images:imgs, container: '#' + id};
        this.gallery = new YGallery(gj);
    }

    adjustGalleryHeight();
    buildGallery();

});
