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
		controller: "addremoveCtrl"
	})
	.state("manageInventoryHome.viewCurrentInventory",{
		url: "/viewCurrentInventory",
		templateUrl: "partials/viewCurrentInventory.html",
		controller: "invCtrl"
	})
	.state("managerLogout", {
		url: "/managerLogin",
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
			firstname : "",
			lastname : "",
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
		service.admin.firstname = data.firstname;
		service.admin.lastname = data.lastname;
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

adminApp.controller("addremoveCtrl", function($scope,$http){
	console.log("in add-remove controller");
	$scope.sortType = "id";
	$scope.sortReverse = false;
	$scope.searchItem = "";

	$http.get("rest/inventoryitem/getAll").success(function(data){
		$scope.itemlist = data;
	})


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

adminApp.controller('manShowInfoController', function($scope,$http,AdminService) {
	admin = AdminService.getAdmin();
	$scope.updateShow = false;
	$scope.message = "";
	$scope.messageClass = "";
	$scope.manInfo = {
			firstName: admin.firstname,
			lastName: admin.lastname,
			email: admin.email
	}
	$scope.updateInfo = function(){
		admin.firstname = $scope.manInfo.firstName;
		admin.lastname = $scope.manInfo.lastName;
		admin.email = $scope.manInfo.email;
		
		AdminService.setAdmin(admin);
		
		$http.post('rest/admin/update', admin).then(function(response){
			$scope.message = "Info Updated."
			$scope.messageClass = "alert-success";
			$scope.updateShow = false;
		});
	};
	
	$scope.updatePass = function(){
		if($scope.pass1 != $scope.pass2){
			$scope.message = "New Passwords must match!";
			$scope.messageClass = "alert-danger";
		}
		else if($scope.currPass != admin.password){
			$scope.message = "Incorrect current password!"
			$scope.messageClass = "alert-danger";
		}
		else{
			admin.password = $scope.pass1;
			$http.post('rest/admin/update', admin).then(function(response){
				AdminService.setAdmin(admin);
				$scope.passShow = false;
				$scope.message = "Password Updated."
				$scope.messageClass = "alert-success";
			});
		}
	};
	
});
