/**
 * 
 */

var adminApp = angular.module("adminApp", ['ui.router']);

adminApp.config(function($stateProvider, $urlRouterProvider) {
	
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
		})
		.state("managerLogout", {
			url: "/managerLogin",
			templateUrl: "managerLogin.html",
			controller: "ManagerLogout"
		});
	console.log("IN HERE");
	
});

adminApp.controller("MainPageCtrl", function($state){
	console.log("in adminMainPage");
});

adminApp.controller("ManagerLogout", function(state) {
	console.log("Logging out...");
	//$window.location.href = "http://localhost:8081/IMS/managerLogin.html";
});