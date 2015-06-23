angular.module('home', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('home').config(function($routeProvider) {

    $routeProvider.when('/home',{templateUrl: 'home/partial/home/home.html'});
    $routeProvider.when('/services',{templateUrl: 'home/partial/services/services.html'});
    $routeProvider.when('/about',{templateUrl: 'home/partial/about/about.html'});
    $routeProvider.when('/success_cases',{templateUrl: 'home/partial/success_cases/success_cases.html'});
    $routeProvider.when('/contact',{templateUrl: 'home/partial/contact/contact.html'});
    /* Add New Routes Above */

});

