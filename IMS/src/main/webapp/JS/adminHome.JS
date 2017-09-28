/**
 * BASIC LOGIN STUFF
 */

var adminApp = angular.module("adminApp", ['ui.router']);

adminApp.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise("/managerLogin");

	$stateProvider
		.state("managerLogin",{
			url: "/managerLogin",
			templateUrl: "partials/managerLogin.html",
			controller: "AdminCtrl as auth"
		})
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
			controller: "manageCtrl as manage"
		})
		.state("manageInventoryHome.viewCurrentInventory",{
			url: "/viewCurrentInventory",
			templateUrl: "partials/viewCurrentInventory.html",
			controller: "invCtrl"
		})
		.state("customers",{
			url: "/man-show-all-custs",
			templateUrl: "partials/man-show-all-custs.html",
			controller: "showAllCustsController"
		})
		.state("adminInfo",{
			url: "/man-show-info",
			templateUrl: "partials/man-show-info.html",
			controller: "manShowInfoController"
		});
	console.log("IN HERE");
	
});

adminApp.service("AdminService", function($http, $q) {
	console.log("in admin service");
	
	var service = this;
	console.log(service);
	
	service.admin = {
		id: -1,
		email: "",
		password: "",
		authenticated: false
	};
	
	service.getAdmin= function() {
		return service.admin;
	};
	
	console.log("before set admin = " + service.admin);
	
	service.setAdmin= function(data) {
		service.admin.id = data.id;
		service.admin.email = data.email;
		service.admin.password = data.password;
		service.admin.authenticated = data.authenticated;
	};
	
	console.log("after set admin = " + service.admin);
	
	service.loginAdmin = function() {
		console.log("in loginAdmin");
		var promise;
		promise = $http.post('rest/admin/auth', service.admin).then(
				function(response) {
					
					console.log(response.data);
					return response;
				},
				function(error) {
					console.log('login user promise failed');
					return $q.reject(error);
				});
		
		return promise;
	};
});

adminApp.controller("AdminCtrl", function(AdminService,$state) {
	console.log("in AdminCtrl");

	var login = this;
	console.log(login);
	login.admin = AdminService.getAdmin();
	
	login.doLogin = function() { 
		console.log("within the doLogin");
		
		var promise = AdminService.loginAdmin();
		promise.then(
			function(response) {
				console.log("Response: "+ response);
				if(login.admin!= null){
					login.admin.authenticated = true;
					AdminService.setAdmin(response.data);
					console.log("setting user in login ctrl")
					console.log(AdminService.getAdmin());
					$state.go("adminMainPage");
				}
				else{
					alert("Invalid login!");
				}
				
			},
			function(error) {
				console.log("Error: " + error);
			}
		)
	}
});

/*
 * Main Page
 */


adminApp.controller("MainPageCtrl", function($state){
	console.log("in adminMainPage");
})

/*
 * INVENTORY STUFF
 */
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

});



adminApp.controller("invCtrl", function($scope,$http){
	$scope.sortType = "id";
	$scope.sortReverse = false;
	$scope.searchItem = "";
	
	$http.get('rest/inventoryitem/getAll').success(function(data){
		$scope.itemlist = data;
	});
	
})


/**
 * CUSTOMER DATA
 */


adminApp.controller('showAllCustsController', function($scope,$http) {
	
	$http.get('rest/customer/getAll').success(function(data){
		$scope.allCusts = data;
	});
	
//	$scope.allCusts = [
//		{
//			firstName: "Max",
//			lastName: "Caulfield",
//			email: "mcaulfi1@blackwell.com",
//			address: "123 Deer St",
//			city: "Arcadia Bay",
//			state: "Oregon",
//			zipcode: "123456",
//			phone: "123-456-7890"
//		},
//		{
//			firstName: "Chloe",
//			lastName: "Price",
//			email: "cprice1@blackwell.com",
//			address: "123 Butterfly St",
//			city: "Arcadia Bay",
//			state: "Oregon",
//			zipcode: "123456",
//			phone: "234-567-8901"
//		},
//		{
//			firstName: "Rachel",
//			lastName: "Amber",
//			email: "ramber1@blackwell.com",
//			address: "123 Junk St",
//			city: "Arcadia Bay",
//			state: "Oregon",
//			zipcode: "123456",
//			phone: "345-678-9012"
//		}
//	]
});

/*
 * ADMIN INFO
 */

adminApp.controller('manShowInfoController', function($scope) {
	$scope.manInfo = {
		firstName: "Michael",
		lastName: "Scott",
		email: "mscott@mailinator.com"
	}
});


