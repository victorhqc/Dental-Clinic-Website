angular.module('home', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('home').config(function($routeProvider) {

    $routeProvider.when('/home',{templateUrl: 'home/partial/home/home.html'});
    /* Add New Routes Above */

});

