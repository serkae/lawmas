/**
 * 
 */

var adminLoginApp = angular.module("adminLoginApp", ["ui.router"]);

adminLoginApp.config(function($stateProvider, $urlRouterProvider) {
	console.log("init admin login app...");
	
	$stateProvider
		.state("auth", {
			url:"/managerLogin",
			templateUrl: "managerLogin.html"
		})
		.state("login", {
			url:"/adminHome",
			templateUrl: "adminHomepage.html"
		});
});

adminLoginApp.service("AdminService", function($http, $q) {
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
					console.log(response);
					return response;
				},
				function(error) {
					console.log('login user promise failed');
					return $q.reject(error);
				});
		return promise;
	};
});

adminLoginApp.controller("AdminCtrl", function(AdminService, $state) {
	console.log("in AdminCtrl");
	
	var login = this;
	console.log(login);
	login.admin = AdminService.getAdmin();
	login.doLogin = function() { 
		console.log("within the doLogin");
		var promise = AdminService.loginAdmin();
		promise.then(
			function(response) {
				console.log(response);
				AdminService.authenticateUser(response.data);
				$state.go('login');
			},
			function(error) {
				console.log(error);
			}
		)
	}
});