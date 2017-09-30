/**
 * BASIC LOGIN STUFF
 */

var adminApp = angular.module("adminApp", ['ui.router']);

//image upload directive 
adminApp.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

//file upload service
adminApp.service('fileUpload', ['$http', function ($http) {
	this.uploadFileToUrl = function(file, uploadUrl){
		var fd = new FormData();
		fd.append('file', file);
		console.log();

		return $http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined},
			transformResponse: function(data, headers){
				return data;}
		});

	}
}]);

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
			controller: "addremoveCtrl as AR"
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
			discount: null,
			image: " "
	};

	service.getItem = function(){
		return service.item;
	}


	service.setItem = function(data){
		service.item.name = data.name;
		service.item.description = data.description;
		service.item.unitPrice = data.unitPrice;
		service.item.quantity = data.quantity;
		service.item.image = data.image
		console.log("setting data");
		console.log(service.item);
	}


	service.uploadPic = function(){
		var promise; 
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

adminApp.controller("manageCtrl", function(InventoryService, $scope, $http, fileUpload){
	console.log("in manageCtrl");


	$scope.name = "";
	$scope.description = "";
	$scope.unitPrice;
	$scope.quantity;
	$scope.image;

	$scope.displayItem = function(){
		console.log($scope.name + " " + $scope.unitPrice)
	}

	$scope.item = {
			id: -1,
			name: $scope.name,
			description: $scope.description,
			unitPrice: $scope.unitPrice,
			quantity: $scope.quantity,
			departmentid: $scope.chosenDepartment,
			discountid: -1,
			image: $scope.image
	};
	
	var setDepartments = function(){
		$http.get("rest/department/getAll").then(function(response){
			$scope.departments = response.data;
		})

	}
	setDepartments();
	

	var inventory = this;
	
	inventory.addDepartment = function(){
		var department = {
				"id" : -1,
				"name" : $scope.depname
		}
		$http.post("rest/department/create", department).then(function(response){
			$scope.departments.push(response.data);
			$scope.depname = "";
			console.log("department "+response.data.name+" added");
		})
	}
	
	inventory.addItem = function(){

		//if file wants to be included
		if($scope.image != null){
			var file = $scope.image;
			console.log('file is ' );
			console.dir(file);
			var uploadUrl = "rest/inventoryitem/upload";
			var promise = fileUpload.uploadFileToUrl(file, uploadUrl);
			var s3UrlString = "";
			promise.then(function(response){
				s3UrlString = response.data;
				inventory.item = {
						id: -1,
						name: $scope.name,
						description: $scope.description,
						unitPrice: $scope.unitPrice,
						quantity: $scope.quantity,
						departmentid: $scope.chosenDepartment,
						discountid: -1,
						image: s3UrlString
				};


				$http.post("rest/inventoryitem/create", inventory.item).then(function(response){
					console.log("successfully uploaded with image");
					console.log(response.data);
				})
			})
			.catch(function(response){
				return response.data;
			});
		} //do this if no file included
		else{
			inventory.item = {
					id: -1,
					name: $scope.name,
					description: $scope.description,
					unitPrice: $scope.unitPrice,
					quantity: $scope.quantity,
					departmentid: $scope.chosenDepartment,
					discountid: -1,
					image: null
			};
			console.log("adding");
			console.log(inventory.item);
			console.log($scope.chosenDepartment);

			$http.post("rest/inventoryitem/create", inventory.item).then(function(response){
				console.log("successfully added");
				console.log(response.data);
			})
		}
	}


});



adminApp.controller("invCtrl", function($scope,$http){
	console.log("in inv controller");
	$scope.sortType = "id";
	$scope.sortReverse = false;
	$scope.searchItem = "";

	$http.get('rest/inventoryitem/getAll').success(function(data){
		$scope.itemlist = data;
	})

});

adminApp.filter("isDiscount",function(){
	
	return function(x){
		var list;
		var discount = "no";
		$http.get('rest/inventoryitem/getAll').success(function(data){
			list = data;
			for(var i = 0; i < data.length; i++){
			if(data.discountid != -1){
				return discount = "Yes";
			}
			else
				return discount = "No";
			}
		})
	}
	
});
adminApp.controller("addremoveCtrl", function($scope,$http,$state){

	console.log("in add-remove controller");

	
	var inventory = this;
	
	$scope.sortType = "id";
	$scope.sortReverse = false;
	$scope.searchItem = "";

	$scope.edit = 0;
	$scope.disco = "No";
	
	
	inventory.id = -1;
	inventory.name = "";
	inventory.description = "";
	inventory.unitPrice = -1;
	inventory.quantity = -1;
	inventory.departmentid = -1;
	inventory.discountid = -1;
	inventory.image = null;
	

	
	
	
	$scope.change = function(data){
		console.log($scope.edit);
		inventory.id = data.id;
		console.log(inventory.id);
		console.log($scope.edit);
		inventory.name = data.name;
		inventory.departmentid = data.departmentid;
		inventory.discountid = data.discountid
		inventory.image = data.image;
		inventory.unitPrice = data.unitPrice;
		inventory.quantity = data.quantity;
		inventory.description = data.description;	
		$scope.edit = 1;
		
	}
	$scope.reset = function(){
		$scope.edit = 0;
	}
	
	var resetData = function(){
		$http.get("rest/inventoryitem/getAll").success(function(data){
			$scope.itemlist = data;			
		});
	}
	
	resetData();
	
	$http.get("rest/inventoryitem/getAll").success(function(data){
		$scope.itemlist = data;
		console.log(data);
	})
	
	
	

	$scope.editItem = function(){
		
		if($scope.percentDiscount != null || $scope.flatDiscount != null){
			if($scope.percentDiscount != null){
				inventory.discountType = 1;
				inventory.discountAmount = ($scope.percentDiscount/100);
			}
			if($scope.flatDiscount != null){
				inventory.discountType = 0;
				inventory.discountAmount = $scope.flatDiscount;
				if($scope.flatDiscount > inventory.unitPrice){
					alert("Cannot have the discount be greater than the unit price");
					return;
				}
			}
			
			$scope.date = new Date();
			inventory.startDate = $scope.date
			inventory.disDescription = $scope.pDiscountReason;
			var discount = this;
			discount.item = {
				discountID: -1,
				discount_Type: inventory.discountType,
				amount: inventory.discountAmount,
				description: inventory.disDescription,
				startDate: inventory.startDate
			}
			$http.post("rest/discount/create", discount.item).success(function(data){
				console.log("New discount created?");
			})
			
		}
		
		
		if($scope.newName != null){
			inventory.name = $scope.newName;
		}
		if($scope.newUnitPrice != null){
			if($scope.newUnitPrice < 0){
				$scope.newUnitPrice = 0;
			}
			inventory.unitPrice = $scope.newUnitPrice;
		}
		if(inventory.discountType == 0){
			inventory.unitPrice = inventory.unitPrice - $scope.flatDiscount;
		}
		if(inventory.discountType == 1){
			inventory.unitPrice = inventory.unitPrice - (inventory.unitPrice * inventory.discountAmount);
		}
		if($scope.newQuantity != null){
			if($scope.newQuantity < 0){
				$scope.newQuantity = 0;
			}
			console.log($scope.newQuantity);
			inventory.quantity = $scope.newQuantity;
		}
		if($scope.newDescription != null){
			inventory.description = $scope.newDescription;
		}
		inventory.item = {
				id: inventory.id,
				name: inventory.name,
				description: inventory.description,
				unitPrice: inventory.unitPrice,
				quantity: inventory.quantity,
				departmentid: inventory.departmentid,
				discountid: inventory.discountType,
				image: inventory.image	
		}
		console.log(inventory.item);
		$http.post("rest/inventoryitem/update", inventory.item).success(function(data){
			console.log(data);
			console.log("Item updated successfully?")
			$scope.reset();
			resetData();
		})
		
	}

});



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
