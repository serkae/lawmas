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
	.state("viewItem", {
		url: "/item",
		templateUrl: "partials/view-item.html",
		controller: "viewItemController"
	})
	.state("login", {
		url:"/login",
		templateUrl:"partials/login.html",
		controller: "LoginCtrl as login"
	});
});

storeApp.controller('MainCtrl', function($http, $scope,$rootScope,CustomerService,ItemService,$state) {
	$scope.sortType = "department";
	$scope.sortReverse = false;
	let itemsToShow = [];
	let allInvItems;
	let allDepts;
	$http.get('rest/inventoryitem/getAll').then(function(data) {
		allInvItems = data.data;
		$http.get('rest/department/getAll').then(function(response) {
			allDepts = response.data;
			allInvItems.forEach(function(item) {
				allDepts.forEach(function(dept) {
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
						itemsToShow.push({
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
		});
	});
	$scope.itemsToShow = itemsToShow;

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

	/*service.createCustomer = function () {
		var promise;
		service.customer = CustomerService.setCustomer();
		console.log("in create item");
		console.log(service.customer);

		promise = $http.post("rest/customer/create", service.item).then(
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
	}*/

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
	/*
		id: item.id,
		name: item.name,
		unitPrice: item.unitPrice,
		quantity: item.quantity,
		department: dept.name,
		description: item.description,
		image: item.image
	 */
	
	$scope.item = ItemService.getItem();
	
	$scope.discountShow = false;
	$scope.showQuantityWarning = false;
	$scope.showReviewWarning = false;
	$scope.finishedReview = false;
	$scope.quantities = [];
	$scope.carousel = {};
	$scope.carousel.first = [];
	$scope.carousel.others = [];
	$scope.carousel.slides = [];
	//set discount info
	if($scope.item.discountid != -1){
		$http.get('rest/discount/get?id='+$scope.item.discountid).then(function(data){
			if(data.discount_Type == 0){
				$scope.discountOffer = "$" + data.amount + " off!";
				$scope.discountMessage = data.description;
			} else{
				$scope.discountOffer = data.amount + "% off!";
				$scope.discountMessage = data.description;
			}
		}) 
		$scope.discountShow = true;
	}
	
	//set quantity list
	for(var i = 1; i <= $scope.item.quantity; i++){
		$scope.quantities.push(i);
	}
	
	
	//set product reviews info and carousel
	$scope.productreviews = [];
	$scope.productreviewAvg = 0;

	$http.get('rest/productreview/getByItem?id='+$scope.item.id).then(function(response){
		$scope.productreviews = response.data;
		var sum = 0;
		for(var i = 0; i < $scope.productreviews.length; i++){
			sum = sum + $scope.productreviews[i].rating;
		}
		$scope.productreviewAvg = (sum / $scope.productreviews.length).toFixed(1);
		$scope.roundedreviewAvg = Math.floor($scope.productreviewAvg);
		//start carousel function
		$scope.loadCarousel();
	});
	
	
	//CAROUSEL
	
	$scope.loadCarousel = function(){
		//setup carousel
		// # of slides, 3 reviews per slide
		var slides = Math.ceil($scope.productreviews.length / 3);
		
		//if no reviews made, make dummy review
		if(slides == 0){
			var r = {
					id:-1,
					rating: 0,
					description: "No product reviews made."
			};
			$scope.carousel.first.push(r);
		} else{
			for(var i = 0; i < 3; i++){
				if(i == $scope.productreviews.length){
					break;
				}
				
				$scope.carousel.first.push($scope.productreviews[i]);
				$scope.carousel.slides.push(i);
			}
			
			for(var j = 1; j < slides; j++){
				var product_review_set = [];
				for(var k = 0; k < 3; k++){
					if(j*3 + k == $scope.productreviews.length){
						break;
					}
					product_review_set.push($scope.productreviews[j*3 + k]);
					$scope.carousel.slides.push(j*3 + k);
				}
				$scope.carousel.others.push(product_review_set);
			}
		}
		console.log($scope.carousel);
	};
	
	
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
