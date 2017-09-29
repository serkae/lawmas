
var app = angular.module('indexApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/storefront/mainStorePage");
	
	$stateProvider.state("homePage", {
		url: "/homePage",
		templateUrl: "partials/homePage.html"
	})
	.state("storefront.mainStorePage", {
		url: "/mainStorePage",
		templateUrl: "partials/mainStorePage.html"
	});
});