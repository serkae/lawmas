
var app = angular.module('indexApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/storefront/mainStorePage");
	
	$stateProvider.state("storefront", {
		url: "/storefront",
		templateUrl: "partials/storefront.html"
	})
	.state("storefront.mainStorePage", {
		url: "/mainStorePage",
		templateUrl: "partials/mainStorePage.html"
	});
});