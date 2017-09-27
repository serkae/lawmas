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
			templateUrl: "partials/addNewInventory.html",
			//controller: "manageCtrl"
		})
		.state("manageInventoryHome.viewCurrentInventory",{
			url: "/viewCurrentInventory",
			templateUrl: "partials/viewCurrentInventory.html",
			controller: "invCtrl"
		})
		.state("customers",{
			url: "/man-show-all-custs",
			templateUrl: "partials/man-show-all-custs.html"
		})
		.state("adminInfo",{
			url: "/man-show-info",
			templateUrl: "partials/man-show-info.html"
		});
	console.log("IN HERE");
	
});

adminApp.controller("MainPageCtrl", function($state){
	console.log("in adminMainPage");
})

adminApp.service("InventoryService", function($http, $q){
	
	var inventory = this;
	
	inventory.item = {
			id: -1,
			department: "",
			unitPrice: -1,
			quantity: -1,
			name: "",
			description: "",
			discount: ""
		};
	
	inventory.setItem = function(data){
		inventory.item.name = data.name;
		inventory.item.description = data.description;
		inventory.item.unitPrice = data.unitPrice;
		inventory.item.quantity = data.quantity;
	}
	
	inventory.createItem = function(){
		var promise;
		
		promise = $http.post("/rest/inventoryitem/create", inventory.item).then(
				function(response){
					console.log(response);
					return response;
				},
				function(error){
					console.log("ERROR")
					return error;
				}
		
		);
		return promise;
	}
	
		
		
		
	
	
});

adminApp.controller("manageCtrl", function(InventoryService){
	console.log("in manageCtrl");
	var inventory = this;
	
	inventory.addItem = function(){
		console.log("in addItem");
		var promise = InventoryService.createItem();
		
		promise.then(
				function(response){
					console.log(response);
					InventoryService.setItem(response.data);
				},
				function(error){
					console.log(error);
				})
	}
	
	
})



adminApp.controller("invCtrl", function($scope,$http){
	
	$http.get('rest/inventoryitem/getAll').success(function(data){
		$scope.itemlist = data;
	});
	
	
	

	
})