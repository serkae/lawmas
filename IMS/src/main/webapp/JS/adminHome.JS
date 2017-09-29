/**
 * BASIC LOGIN STUFF
 */

var adminApp = angular.module("adminApp", ['ui.router']);

adminApp.config(function($stateProvider, $urlRouterProvider) {
	
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
		.state("manageInventoryHome.add-remove",{
			url: "/add-remove",
			templateUrl: "partials/add-remove.html",
			controller: "addremoveCtrl"
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
});

adminApp.controller("ManagerLogout", function(state) {
	console.log("Logging out...");
	//$window.location.href = "http://localhost:8081/IMS/managerLogin.html";
});

/*
 * INVENTORY STUFF
 */
adminApp.service("InventoryService", function($http, $q){
	
	var service = this;
	
	service.item = {
			id: -1,
			name: " ",
			description: " ",
			unitPrice: -1,
			quantity: -1,
			department: null,
			discount: null
		};
	
	service.getItem = function(){
		return service.item;
	}
	
	service.setItem = function(data){
		service.item.name = data.name;
		service.item.description = data.description;
		service.item.unitPrice = data.unitPrice;
		service.item.quantity = data.quantity;
		console.log("setting data");
		console.log(service.item);
	}
	
	service.createItem = function(){
		var promise;
		service.item = InventoryService.setItem();
		console.log("in create item");
		console.log(service.item);
		promise = $http.post("rest/inventoryitem/create", service.item).then(
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

adminApp.controller("manageCtrl", function(InventoryService, $scope, $http){
	console.log("in manageCtrl");

	
	$scope.newDep = 0;
	$scope.oldDep = 0
	
	$scope.newFunction = function(){
		$scope.newDep = 1;
		$scope.oldDep = 0;
	}
	$scope.existFunction = function(){
		$scope.newDep = 0;
		$scope.oldDep = 1;
	}
	
	
	
	$scope.sortType = "name";
	$scope.sortReverse = false;

	$http.get("rest/department/getAll").success(function(data){
		$scope.departments = data;
	})
	
	var inventory = this;
	
	inventory.checkValue = function(){
		console.log($scope.department);
	}
	
	
	inventory.addItem = function(){
		console.log($scope.oldDep);
		console.log($scope.newDep);
		inventory.department = {
				id: -1,
				name: $scope.department
		}
		if($scope.newDep == 1){
			$http.post('rest/department/create', inventory.department).success(function(data){
				console.log("Department Created successfully");
				inventory.department.id = data.id;
				console.log(data);
				console.log("ID: " + inventory.department.id);
				inventory.item = {
						id: -1,
						name: $scope.name,
						description: $scope.description,
						unitPrice: $scope.unitPrice,
						quantity: $scope.quantity,
						department: {id: inventory.department.id, name: inventory.department.name},
						discount: null
					};
					console.log(inventory.item);
					$http.post("rest/inventoryitem/create", inventory.item).success(function(){
						console.log("SUCCESS?")
					})
				
				
			});
		}
//		if($scope.oldDep == 1){
//			console.log("We in the old dep");
//			
//			$http.get('rest/department/getAll').success(function(data){
//				console.log(inventory.department.name);
//				for(var i = 1; i < data.length; i++){
//					console.log(data.department[i]["name"]);
//				}
//				if(inventory.department.name === data.name){
//					inventory.department.id = data.id;
//					console.log(data);
//					console.log("ID: " + inventory.department.id + " Name: " + inventory.department.name);
//					inventory.item = {
//							id: -1,
//							name: $scope.name,
//							description: $scope.description,
//							unitPrice: $scope.unitPrice,
//							quantity: $scope.quantity,
//							department: {id: inventory.department.id, name: inventory.department.name},
//							discount: null
//					};
//					console.log(inventory.item);
//					$http.post("rest/inventoryitem/create", inventory.item).success(function(){
//						console.log("SUCCESS?")
//					})
//				}
//			})
//		}
		

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

adminApp.controller("addremoveCtrl", function($scope,$http){
	$scope.sortType = "id";
	$scope.sortReverse = false;
	$scope.searchItem = "";
	
	$http.get("rest/inventoryitem/getAll").success(function(data){
		$scope.itemlist = data;
	})
	
	
})



/**
 * CUSTOMER DATA
 */


adminApp.controller('showAllCustsController', function($scope,$http) {
	$scope.sortType = "lastname";
	$scope.sortReverse = false;
	$scope.searchCustomer = "";
	
	$http.get('rest/customer/getAll').success(function(data){
		$scope.allCusts = data;
	});
	

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
