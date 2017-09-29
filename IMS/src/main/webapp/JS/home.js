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
			templateUrl:"partials/mainStorePage.html", //html
			controller: "MainCtrl as main"
		})
		.state("login", {
			url:"/login",
			templateUrl:"partials/login.html",
			controller: "LoginCtrl as login"
		})
});

storeApp.service("CustomerService", function($http, $q){
	console.log("in customerService");

	var service = this;

	service.customer={
			email : "",
			password : "",
			authenticated : false
	};

	service.getCustomer= function(){
		return service.customer;
	};

	service.setCustomer = function(data){
		service.customer.email = data.email;
		service.customer.password = data.password;
		service.customer.authenticated = data.authenticated;
	};

	service.authenticateCustomer = function(){
		var promise = $http.post(
				'rest/customer/auth', service.customer)
				.then(
						function(response){
							console.log(response.data);
							return response;
						},
						function(error){
							console.log('login promise fail');
						}
				);
		return promise;
	};
});

storeApp.controller("LoginCtrl", function(CustomerService, $rootScope, $scope, $state){
	console.log("in loginctrl");
	
	var login = this;
	
	login.doLogin = function(){
		console.log("about to authenticate user");
		var promise = CustomerService.authenticateCustomer();
		console.log($scope.email);
		promise.then(
				function(response){
					console.log(response);
					if(login.customer!= null){
						console.log(login.customer);
						login.customer.authenticated = true;
						$rootScope.authenticated = true;
						CustomerService.setCustomer(response.data);
						console.log("setting user in login ctrl")
						console.log(CustomerService.getCustomer());
						$state.go("mainStorePage");
					} else{
						alert("Invalid login!");
					}
				},function(error){
					console.log(error);
				});
	
	};
});

storeApp.controller("MainCtrl", function() {
	$scope.authenticate = false;
});