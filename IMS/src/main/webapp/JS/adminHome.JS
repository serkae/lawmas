/**
 * 
 */

var adminApp = angular.module("adminApp", ['ui.router']);

adminApp.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise("/adminMainPage");
	
	$stateProvider
		.state("adminMainPage", {
		url: "/adminMainPage",
		templateUrl: "partials/adminMainPage.html",
		controller: "MainPageCtrl as adminMainPage"
		})
		.state("manageInventoryHome",{
			url: "/manageInventoryHome",
			templateUrl: "partials/manageInventoryHome.html"
		})
		.state("manageInventoryHome.addNewInventory",{
			url: "/addNewInventory",
			templateUrl: "partials/addNewInventory.html"
		})
		.state("manageInventoryHome.viewCurrentInventory",{
			url: "/viewCurrentInventory",
			templateUrl: "partials/viewCurrentInventory.html"
		});
	console.log("IN HERE");
	
});

adminApp.controller("MainPageCtrl", function($state){
	console.log("in adminMainPage");
})