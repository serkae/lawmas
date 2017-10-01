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
	});
});

storeApp.service('ItemsService', function() {
	this.itemsToShow;

	this.getItemsToShow = function() {
		return this.itemsToShow;
	}

	this.setItemsToShow = function(items) {
		this.itemsToShow = items;
	}

	this.lineItem = {
			id: -1,
			orderid: -1,
			quantity: 0,
			inventoryitemid: -1
	};

	this.getLineItem = function() {
		return this.lineItem;
	};

	this.setLineItem = function(data) {
		this.lineItem.id = -1,
		this.lineItem.orderid = data.orderid,
		this.lineItem.quantity += 1,
		this.lineItem.inventoryitemid = data.id
	};

	this.cart = [];

	this.getCart = function() {
		return this.cart;
	};

	this.addToCart = function(lineItem) {
		this.cart.push(lineItem);
	}

	this.createLineItems = function() {
		this.cart.forEach(function(lineItem) {
			let promise = $http.post('rest/lineitem/create', lineItem).then(
				function(response) {
					return response;
				},
				function(error) {
					return error;
				}
			);
			return promise;
		});
	};
});

storeApp.controller('MainCtrl', function(ItemsService, $http, $scope) {
	$scope.sortType = "department";
	$scope.sortReverse = false;
	let itemsToShow = [];
	let allInvItems;
	let allDepts;
	$http.get('rest/inventoryitem/getAll').success(function(data) {
		allInvItems = data;
		$http.get('rest/department/getAll').success(function(data) {
			allDepts = data;
			allInvItems.forEach(function(item) {
				allDepts.forEach(function(dept) {
					if (item.departmentid === dept.id) {
						itemsToShow.push({
							id: item.id,
							name: item.name,
							unitPrice: item.unitPrice,
							quantity: item.quantity,
							department: dept.name,
							description: item.description,
							image: item.image
						});
					}
				});
			});
			$scope.itemsToShow = itemsToShow;
			ItemsService.setItemsToShow(itemsToShow);
			console.log($scope.itemsToShow);
		});
	});
});

storeApp.controller('CartController', function(ItemsService, $http, $scope) {

	$scope.addItemToCart = function($index) {
		ItemsService.addToCart(ItemsService.itemsToShow[$index]);
	};
	
	$scope.cart = ItemsService.getCart();

//		$scope.items = [
//		{
//		name: "Blue Beanie",
//		price: 9.99,
//		quantity: 1
//		},
//		{
//		name: "Candlemass T-Shirt",
//		price: 19.99,
//		quantity: 1
//		},
//		{
//		name: "Black Denim Jacket",
//		price: 39.99,
//		quantity: 1
//		},
//		{
//		name: "Raven Feather Necklace",
//		price: 9.99,
//		quantity: 1
//		}
//		]

		$scope.getTotal = function() {
		var total = 0;
		for(var i = 0; i < $scope.items.length; i++) {
		var product = $scope.items[i];
		total += (product.price * product.quantity);
		}
		return total;
		}
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

storeApp.service("OrderService", function($http) {
	this.order = {
			id: -1,
			customer: null,
			order_Date: 0
	}

	this.getOrder = function() {
		return this.order;
	}

	this.setOrder = function(customer) {
		this.order.id = -1;
		this.order.customer = customer;
		this.order.order_Date = new Date().getTime();
	}

	this.createOrder = function(order) {
		let promise = $http.post('rest/order/create', order).then(
				function(response) {
					return response;
				},
				function(error) {
					return error;
				}
		);
		return promise;
	}
});

storeApp.controller("LoginCtrl", function(CustomerService, OrderService, $rootScope, $state){
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
