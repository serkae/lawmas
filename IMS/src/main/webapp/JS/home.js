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
			templateUrl: "partials/mainStorePage.html"
		})
		.state("cart", {
			url: "/cart",
			templateUrl: "partials/cust-cart.html"
		});
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
