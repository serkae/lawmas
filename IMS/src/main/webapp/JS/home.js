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
			templateUrl:"partials/mainStorePage.html" //html
		})
		.state("login", {
			url:"/login",
			templateUrl:"partials/login.html",
			controller: "LoginCtrl as auth"
		})
		//abstract state meaning it can’t be directly transitioned to
		//serves as a parent to it’s child states to offer shared functionality
		/*.state("modal", {
			views: {
				"modal": {
			        templateUrl: "modal.html"
			      }
			    },
			    abstract: true	
		})
		.state("modal.login", {
			views: {
				"modal": {
					templateUrl: "modal/login.html"
				}
			}
		})*/
		.state("mainStorePage.customerInfo", {
			url:"/customerInfo",
			templateUrl:"/customerInfo",
			controller: "custShowInfoController as custInfo"
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
		service.customer.username = data.email;
		service.customer.password = data.password;
		service.customer.authenticated = data.authenticated;
	};

	service.authenticateCustomer = function(){
		var promise = $http.post(
				'rest/customer/auth', service.customer)
				.then(
						function(response){
							console.log(response);
							return response;
						},
						function(error){
							console.log('login promise fail');
						}
				);
		return promise;
	};
});

storeApp.controller("LoginCtrl", function(CustomerService, $state){
	console.log("in loginctrl");

	var login = this;
	login.customer = CustomerService.getCustomer();
	console.log("got customer");
	console.log(login.customer);
	
	login.doLogin = function(){
		console.log("about to authenticate user");
		var promise = CustomerService.authenticateCustomer();
	
		promise.then(
				function(response){
					if(login.customer!= null){
						login.customer.authenticated = true;
						CustomerService.setCustomer(response.data);
						console.log("setting user in login ctrl")
						console.log(CustomerService.getCustomer());
						$state.go("mainStorePage.customerInfo");
					} else{
						alert("Invalid login!");
					}
				},function(error){
					console.log(error);
				});
	
	};
});

storeApp.controller('custInfo', function($scope) {
	$scope.custInfo = CustomerService.getCustomer()
});