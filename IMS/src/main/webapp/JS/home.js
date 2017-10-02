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
	.state("viewItem", {
		url: "/item",
		templateUrl: "partials/view-item.html",
		controller: "viewItemController"
	})
	.state("login", {
		url:"/login",
		templateUrl:"partials/login.html",
		controller: "LoginCtrl as login"
	})
	.state("confirmCheckout", {
		url: "/confirmCheckout",
		templateUrl: "partials/confirm-checkout.html"
	})
	.state("getPastOrders",{
		url: "/getOrders",
		templateUrl:"partials/cust-getOrders.html",
		controller: "getOrdersCtrl"
	});
});

storeApp.controller('MainCtrl', function($http, $scope,$rootScope,CustomerService,ItemService,ItemsService,$state) {
	$scope.sortType = "department";
	$scope.sortReverse = false;
	$rootScope.departments = [];
	let allInvItems;
	$http.get('rest/inventoryitem/getAll').then(function(data) {
		allInvItems = data.data;
		$http.get('rest/department/getAll').then(function(response) {
			$rootScope.departments = response.data;
			$rootScope.departments.forEach(function(dept) {
				dept.items = [];
				dept.show = [];
				dept.index = -1;
				dept.count = 0;
				dept.increaseIndex = function(){if(dept.index + 1 != dept.items.length){dept.index++;console.log(dept.index);}};
				dept.reduceIndex = function(){if(dept.index - 1 != -1){dept.index--;console.log(dept.index);}};
			});
			console.log($rootScope.departments);
			allInvItems.forEach(function(item) {
				$rootScope.departments.forEach(function(dept) {
					if (item.departmentid === dept.id) {

						//manage image sizes to 250 x 250
						var i = new Image();
						var w = 0;
						var h = 0;
						if(item.image != null){
							i.src = item.image;
							while(i.width > 250 || i.height > 250){
								i.width *= .75;
								i.height *= .75;
							}
							w = i.width;
							h = i.height;
						}

						//push item
						dept.count++;
						if(dept.count % 3 == 1){
							//add new item row
							dept.items.push([]);
							dept.show.push([]);
							dept.index++;
						}
						dept.show[dept.index].push(true);
						dept.items[dept.index].push({
							id: item.id,
							name: item.name,
							unitPrice: item.unitPrice,
							quantity: item.quantity,
							department: dept,
							description: item.description,
							discountid: item.discountid,
							image: item.image,
							imageWidth: w,
							imageHeight: h
						});
					}
				});
			});
			console.log($rootScope.departments);
			$rootScope.departments.forEach(function(dept) {
				dept.index = 0;
			});
		});
	});

	$scope.viewPage = function(item){
		ItemService.setItem(item);
		$state.go("viewItem");
	};
	//logout functionality
	$rootScope.logout = function () {
		console.log("within logout");
		$rootScope.authenticated = false;
		CustomerService.resetCustomer();
		console.log(CustomerService.getCustomer());
		$state.go("mainStorePage");
	};
	
	//------------------------------------------Cart
	$scope.addItemToCart = function(id) {
		let item = ItemsService.getItemByID(id);
		itemToAdd = {
				id: item.id,
				name: item.name,
				unitPrice: item.unitPrice,
				quantity: 1
		};
		let cart = ItemsService.getCart();
		if (cart.length === 0) {
			ItemsService.addToCart(itemToAdd);
		} else {
			let itemInCart = false;
			for (i = 0; i < cart.length; i++) {
				if (cart[i].id === itemToAdd.id) {
					itemInCart = true;
					cart[i].quantity++;
				}
			}
			if (!itemInCart) {
				ItemsService.addToCart(itemToAdd);
			}
		}
	};

	$scope.cart = ItemsService.getCart();

	$scope.getTotal = function() {
		var total = 0;
		for(var i = 0; i < $scope.cart.length; i++) {
			var lineItem = $scope.cart[i];
			total += (lineItem.unitPrice * lineItem.quantity);
		}
		return total;
	};

	$scope.getNumberOfItemsInCart = function() {
		let numberOfItems = 0;
		for (i = 0; i < $scope.cart.length; i++) {
			numberOfItems += $scope.cart[i].quantity;
		}
		return numberOfItems;
	}

	$scope.removeFromCart = function(item) {
		for (i = 0; i < $scope.cart.length; i++) {
			if ($scope.cart[i].id === item.id) {
				$scope.cart[i].quantity--;
				if ($scope.cart[i].quantity < 1) {
					$scope.cart.splice(i, 1);
					$state.go("cart");
					//$state.go($state.$current, null, {reload: true});
				}
			}
		}
	}

	$scope.checkout = function() {
		let customer = CustomerService.getCustomer();
		if (customer.id < 0) {
			$state.go("login");
		} else {
			let newOrder = {
					id: -1,
					customer: customer,
					order_Date: new Date().getTime()
			}
			let createOrderPromise = ItemsService.createOrder(newOrder).then(function(response) {
				ItemsService.createLineItems(response.data);
			});
			ItemsService.emptyCart();
			$scope.cart = ItemsService.getCart();
			$state.go("confirmCheckout");
		}
	}
});


storeApp.service('ItemsService', function($http) {
	this.itemsToShow;

	this.getItemsToShow = function() {
		return this.itemsToShow;
	}

	this.getItemByID = function(id) {
		for (i = 0; i < this.itemsToShow.length; i++) {
			if (this.itemsToShow[i].id === id) {
				return this.itemsToShow[i];
			}
		}
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

	this.setLineItem = function(orderid, itemid) {
		this.lineItem.id = -1,
		this.lineItem.orderid = orderid,
		this.lineItem.inventoryitemid = itemid
	};

	this.incrementQuantity = function() {
		this.lineItem.quantity += 1;
	}

	this.cart = [];

	this.emptyCart = function() {
		this.cart = [];
	}

	this.getCart = function() {
		return this.cart;
	};

	this.addToCart = function(lineItem) {
		this.cart.push(lineItem);
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

	this.createLineItems = function(order) {
		let promise;
		this.cart.forEach(function(item) {
			let lineItem = {
					id: -1,
					orderid: order.id,
					quantity: item.quantity,
					inventoryitemid: item.id
			}
			promise = $http.post('rest/lineitem/create', lineItem).then(
					function(response) {
						return response;
					},
					function(error) {
						return error;
					}
			);
		});
		return promise;
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



storeApp.controller('getOrdersCtrl',function($http, $scope, CustomerService){
	$scope.orders = [];

	var customer = CustomerService.getCustomer();
	$http.get('rest/order/getAllByCustomerId?id=' + customer.id).then( function(response){
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


storeApp.controller('custShowInfoController', function($scope, $state, CustomerService) {
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
});


storeApp.service("ItemService", function($http, $q){
	var service = this;
	var current_item;
	service.setItem = function(item){
		current_item = item;
	};
	service.getItem = function(){
		return current_item;
	};
});

storeApp.controller('viewItemController', function($scope,$state,$http,CustomerService,ItemService){

	$scope.item = ItemService.getItem();

	$scope.discountShow = false;
	$scope.showQuantityWarning = false;
	$scope.showReviewWarning = false;
	$scope.finishedReview = false;
	$scope.quantities = [];
	//set discount info
	if($scope.item.discountid != -1){
		$http.get('rest/discount/get?id='+$scope.item.discountid).then(function(response){
			console.log(response.data);
			if(response.data.discount_Type == 0){
				$scope.discountOffer = "$" + response.data.amount + " off!";
				$scope.discountMessage = response.data.description;
			} else{
				$scope.discountOffer = response.data.amount + "% off!";
				$scope.discountMessage = response.data.description;
			}
		}) 
		$scope.discountShow = true;
	}

	//set quantity list
	for(var i = 1; i <= $scope.item.quantity; i++){
		$scope.quantities.push(i);
	}


	//set product reviews info 
	$scope.productreviews = [];
	$scope.productreviewAvg = 0;

	$http.get('rest/productreview/getByItem?id='+$scope.item.id).then(function(response){
		$scope.productreviews = response.data;
		var sum = 0;
		for(var i = 0; i < $scope.productreviews.length; i++){
			sum = sum + $scope.productreviews[i].rating;
		}
		$scope.productreviewAvg = (sum / $scope.productreviews.length).toFixed(1);
		if($scope.productreviewAvg >= 0){
			$scope.roundedreviewAvg = Math.floor($scope.productreviewAvg);
		}
		else{
			$scope.productreviewAvg = 0;
		}
	});


	//submit product review
	$scope.submitReview = function(){
		if($scope.chosenRating == null){
			$scope.showReviewWarning = true;
			return;
		}

		var productreview = {
				id: -1,
				inventoryItem: $scope.item,
				rating: $scope.chosenRating,
				description: $scope.userReviewDescription
		};
		console.log(productreview);
		$http.post('rest/productreview/create',productreview).then(function(response){
			$scope.productreviews.push(productreview);
			$scope.finishedReview = true;
		});
	};

	//create and add line item to cart
	$scope.addToCart = function(){
		if($scope.chosenQuantity == null){
			$scope.showQuantityWarning = true;
			return;
		}

		var lineitem = {
				id: -1,
				orderid: -1,
				quantity: $scope.chosenQuantity,
				inventoryitemid: $scope.item.id
		}
		console.log(lineitem);
		//CartService.addLineItem(lineitem);
	}

	console.log($scope.item);

});
