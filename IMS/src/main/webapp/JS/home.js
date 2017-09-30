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
			controller: "MainCtrl as main",
		})
		.state("customerInfo", {
			url:"/cust-show-info",
			templateUrl:"partials/cust-show-info.html",
			controller: "custShowInfoController"
		})
		.state("cart", {
			url: "/cart",
			templateUrl: "partials/cust-cart.html"
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
			id: -1,
			firstname: "",
			lastname: "",
			email : "",
			password : "",
			address: "",
			city: "",
			state: null,
			zipcode: "",
			phone: "",
			card: null,
			authenticated : false
	};

	service.getCustomer= function(){
		return service.customer;
	};

	service.resetCustomer = function(){
		service.customer={
				id: -1,
				firstname: "",
				lastname: "",
				email : "",
				password : "",
				address: "",
				city: "",
				state: null,
				zipcode: "",
				phone: "",
				card: null,
				authenticated : false
		};
	}
	
	service.setCustomer = function(data){
		service.customer.id         = data.id;
		service.customer.firstname  = data.firstname;
		service.customer.lastname   = data.lastname;
		service.customer.email      = data.email;
		service.customer.password   = data.password;
		service.authenticated       = data.authenticated;
		service.customer.address    = data.address;
		service.customer.city       = data.city;
		service.customer.state      = data.state;
		service.customer.zipcode    = data.zipcode;
		service.customer.phone      = data.phone;
		service.customer.card       = data.card;
		service.customer.authenticated = data.authenticated;
	};

	service.authenticateUser = function(){
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

storeApp.controller("LoginCtrl", function(CustomerService, $rootScope, $state){
	console.log("in loginctrl");
	
	var login = this;
	login.customer = CustomerService.getCustomer();
	
	login.doLogin = function(){
		console.log("about to authenticate user");
		var promise = CustomerService.authenticateUser();
		
		promise.then(
				function(response){
					if(response.data.id !== -1){
						console.log(login.customer);
						CustomerService.setCustomer(response.data);
						$rootScope.authenticated = true;
						$state.go("mainStorePage");
					} else {
						alert("Invalid login!");
					}
				},function(error){
					console.log(error);
				});
	
	};
});

//merging of Will's getInvItemsCtrl and my MainCtrl
storeApp.controller("MainCtrl", function($http, $scope) {
	
	$scope.sortType = "id";
	$scope.sortReverse = false;
	$http.get('rest/inventoryitem/getAll').success(function(data) {
		$scope.allInvItems = data;
	});
});


storeApp.controller('getOrdersCtrl',function($http, $scope){
$scope.orders = [];
	
	$http.get('rest/order/getAll').then( function(response){
		console.log(response.data);
		var orders = response.data;
		for(var i = 0; i < orders.length; i ++){
			var order = orders[i];
			var date = new Date(order.order_Date);
			order.order_Date = date.toLocaleDateString();
			order.show = false;
			order.lineitems = [];
			$scope.orders.push(order);
		}
	});
	
	$scope.showOrder = function(order){
		console.log("called");
		$http.get('rest/lineitem/getAllByOrderId?id=' + order.id).then(function(response){
			console.log(response);
			order.lineitems = response.data;
			order.show = true;
		});
	}

});

storeApp.controller('cartController', function($scope) {
	$scope.items = [
		{
			name: "Blue Beanie",
			price: 9.99,
			quantity: 1
		},
		{
			name: "Candlemass T-Shirt",
			price: 19.99,
			quantity: 1
		},
		{
			name: "Black Denim Jacket",
			price: 39.99,
			quantity: 1
		},
		{
			name: "Raven Feather Necklace",
			price: 9.99,
			quantity: 1
		}
		]

	$scope.getTotal = function() {
		var total = 0;
		for(var i = 0; i < $scope.items.length; i++) {
			var product = $scope.items[i];
			total += (product.price * product.quantity);
		}
		return total;
	}
});

storeApp.controller('custShowInfoController', function($scope, $rootScope, $state,CustomerService) {
	console.log("this is custshow");
	var customer = CustomerService.getCustomer();
	$scope.custInfo = {
		firstName: customer.firstname,
		lastName: customer.lastname,
		email: customer.email,
		address: customer.address,
		city: customer.city,
		state: customer.state.name,
		zipcode: customer.zipcode,
		phone: customer.phone
	}
	
	$scope.logout = function () {
		console.log("within logout");
		$rootScope.authenticated = false;
		CustomerService.resetCustomer();
		console.log(CustomerService.getCustomer());
		$state.go("mainStorePage");
	}
	
});