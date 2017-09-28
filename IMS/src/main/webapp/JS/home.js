/**
 * 
 */

var storeApp = angular.module("storeApp", ["ui.router"]);

storeApp.config(function($stateProvider, $urlRouterProvider) {
	console.log("init store app...");
	
	//The default route when nothing is selected
	$urlRouterProvider.otherwise('/mainStorePage');
	
	$stateProvider
		.state("mainStorePage", {
			url:"/mainStorePage",
			templateUrl: "partials/mainStorePage.html", //html
		});
});