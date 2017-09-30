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
		templateUrl: "partials/mainStorePage.html",
		controller: "getInvItemsCtrl"
	})
	.state("cart", {
		url: "/cart",
		templateUrl: "partials/cust-cart.html"
	})

	.state("getPastOrders",{
		url:"/pastOrders",
		templateUrl : "partials/cust-getOrders.html",
		controller : "getOrdersCtrl"
	});	
});

storeApp.controller('getInvItemsCtrl', function($http, $scope) {
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
