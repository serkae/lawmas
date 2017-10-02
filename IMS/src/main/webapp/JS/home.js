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

storeApp.controller('MainCtrl', function($http, $rootScope, $scope, $state, CustomerService) {
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
		});
	});
	$scope.itemsToShow = itemsToShow;
	
	$rootScope.logout = function () {
		console.log("within logout");
		$rootScope.authenticated = false;
		CustomerService.resetCustomer();
		console.log(CustomerService.getCustomer());
		$state.go("mainStorePage");
	}
});

// Service that handles all things relating to Customer
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

//Service that handles all things relating to Card
storeApp.service("CardService", function($http, $q){
	console.log("in cardService");

	var cardservice = this;

	cardservice.card={
			id: -1,
			cardnumber: "",
			nameoncard: "",
			expiration: "",
			securitycode: ""
	};

	cardservice.getCard= function(){
		return cardservice.card;
	};
	
	cardservice.setCard = function(data){
		cardservice.card.id           = data.id;
		cardservice.card.cardnumber   = data.cardnumber;
		cardservice.card.nameoncard   = data.nameoncard;
		cardservice.card.expiration   = data.expiration;
		cardservice.card.securitycode = data.securtiycode;
	};
	
});

// Takes in login information and handles creating a new Customer
storeApp.controller("LoginCtrl", function(CustomerService, $rootScope, $scope, $state, $http){
	console.log("in loginctrl");
	$scope.createCust = false;
	$scope.message = "";
	$scope.messageClass = "";
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
	
	$http.get("rest/state/getAll").then(function(response){
		$scope.states = response.data;
		console.log($scope.states);
	})
	console.log($scope.states);
	
	$scope.createInfo = function() {
		var ncust = CustomerService.getCustomer();
		
			ncust.firstname = $scope.custInfo.firstName;
			ncust.lastname = $scope.custInfo.lastName;
			ncust.email = $scope.custInfo.email;
			ncust.password = $scope.custInfo.password;
			ncust.address = $scope.custInfo.address;
			ncust.city = $scope.custInfo.city;
			ncust.state = $scope.chosenState;
			ncust.zipcode = $scope.custInfo.zipcode;
			ncust.phone = $scope.custInfo.phone;
			ncust.card = null;
			
			console.log($scope.custInfo);
			console.log($scope.chosenState.id + " " + $scope.chosenState.name);
			console.log(ncust);
			
			$http.post('rest/customer/create', ncust).then(function(response){
				CustomerService.setCustomer(response.data);
				$scope.message = "Customer Created."
				$scope.messageClass = "alert-success";
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

// Displays the Customer information and handles editing the customer information
storeApp.controller('custShowInfoController', function($http, $scope, CustomerService, CardService) {
	console.log("this is custshow");
	var customer = CustomerService.getCustomer();
	
	$scope.updateCustShow = false;
	
	$scope.custInfo = {
		firstName: customer.firstname,
		lastName: customer.lastname,
		email: customer.email,
		address: customer.address,
		city: customer.city,
		state: customer.state,
		zipcode: customer.zipcode,
		phone: customer.phone,
		card: customer.card
	}
	
	if($scope.custInfo.card != null) {
		$scope.cardlf = $scope.custInfo.card.cardnumber.substr($scope.custInfo.card.cardnumber.length - 4);
	}
	
	$http.get("rest/state/getAll").then(function(response){
		$scope.states = response.data;
	})
	
	$scope.updateInfo = function(){
		customer.firstname = $scope.custInfo.firstName;
		customer.lastname = $scope.custInfo.lastName;
		customer.email = $scope.custInfo.email;
		customer.city = $scope.custInfo.city;
		customer.state = $scope.chosenState;
		customer.zipcode = $scope.custInfo.zipcode;
		customer.phone = $scope.custInfo.phone;
		
		CustomerService.setCustomer(customer);
		
		$http.post('rest/customer/update', customer).then(function(response){
			$scope.message = "Info Updated."
			$scope.messageClass = "alert-success";
			$scope.updateCustShow = false;
		});
	};
	
	$scope.updatePass = function(){
		if($scope.pass1 != $scope.pass2){
			$scope.message = "New Passwords must match!";
			$scope.messageClass = "alert-danger";
		}
		else if($scope.currPass != customer.password){
			$scope.message = "Incorrect current password!";
			$scope.messageClass = "alert-danger";
		}
		else{
			customer.password = $scope.pass1;
			$http.post('rest/customer/update', customer).then(function(response){
				CustomerService.setCustomer(customer);
				$scope.passShow = false;
				$scope.message = "Password Updated."
				$scope.messageClass = "alert-success";
			});
		}
	};
	
	$scope.createCard = function() {
		var ncard = CardService.getCard();
		
		var dateStr = String($scope.nexpdate);
		var date = dateStr.split("/");
		var month = parseInt(date[0]);
		var year = parseInt(date[1]);
		
		if(String($scope.ncardnum).length !== 16) {
			$scope.cardmessage = "Card Number must contain 16 numbers!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if($scope.ncardname == "") {
			$scope.cardmessage = "Card Name cannot be empty!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(date.length !== 2) {
			$scope.cardmessage = "Card Expiration must be MM/YY!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(month > 12 | month == 0) {
			$scope.cardmessage = "Card Expiration Month must be Between 01 - 12!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(year < 14) {
			$scope.cardmessage = "Card Expiration Year must be Greater than 14!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(String($scope.nscode).length < 3) {
			$scope.cardmessage = "Card Security Code must Contain more than 2 Numbers!";
			$scope.cardmessageClass = "alert-danger";
		}
		else {
			ncard.cardnumber   = $scope.ncardnum;
			ncard.nameoncard   = $scope.ncardname;
			ncard.expiration   = $scope.nexpdate;
			ncard.securitycode = $scope.nscode;
			
			$scope.cardlf = String(ncard.cardnumber).substr(String(ncard.cardnumber).length - 4);
			
			customer.card = {
					cardnumber: -1,
					nameoncard: "",
					expiration: "",
					securitycode: ""
			}
			
			customer.card.cardnumber   = ncard.cardnumber;
			customer.card.nameoncard   = ncard.nameoncard;
			customer.card.expiration   = ncard.expiration;
			customer.card.securitycode = ncard.securitycode;
			
			$http.post('rest/card/create', ncard).then(function(response){
				CardService.setCard(ncard);
				$http.post('rest/customer/update', customer).then(function(response){
					CustomerService.setCustomer(customer);
				})
				
				$scope.cardCustShow = false;
				$scope.cardmessage = "Card Created."
				$scope.cardmessageClass = "alert-success";
			});
		}
	};
	
	$scope.updateCard = function(){
		var dateStr = String($scope.expdate);
		var date = dateStr.split("/");
		var month = parseInt(date[0]);
		var year = parseInt(date[1]);
		
		if(String($scope.cardnum).length !== 16) {
			$scope.cardmessage = "Card Number must contain 16 numbers!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if($scope.cardname == "") {
			$scope.cardmessage = "Card Name cannot be empty!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(date.length !== 2) {
			$scope.cardmessage = "Card Expiration must be MM/YY!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(month > 12 | month == 0) {
			$scope.cardmessage = "Card Expiration Month must be Between 01 - 12!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(year < 14) {
			$scope.cardmessage = "Card Expiration Year must be Greater than 14!";
			$scope.cardmessageClass = "alert-danger";
		}
		else if(String($scope.scode).length < 3) {
			$scope.cardmessage = "Card Security Code must Contain more than 2 Numbers!";
			$scope.cardmessageClass = "alert-danger";
		}
		else {
			customer.card.cardnumber = $scope.cardnum;
			customer.card.nameoncard = $scope.cardname;
			customer.card.expiration = $scope.expdate;
			customer.card.securitycode = $scope.scode;
			
			$scope.cardlf = String($scope.cardnum).substr(String($scope.cardnum).length - 4);
			
			$http.post('rest/customer/update', customer).then(function(response){
				CustomerService.setCustomer(customer);
				$scope.cardCustShow = false;
				$scope.cardmessage = "Card Info Updated."
				$scope.cardmessageClass = "alert-success";
			});
		}
	};
	
});