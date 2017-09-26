
var app = angular.module('showAllCustsApp', []);

app.controller('showAllCustsController', function($scope) {
	$scope.allCusts = [
		{
			firstName: "Max",
			lastName: "Caulfield",
			email: "mcaulfi1@blackwell.com",
			address: "123 Deer St",
			city: "Arcadia Bay",
			state: "Oregon",
			zipcode: "123456",
			phone: "123-456-7890"
		},
		{
			firstName: "Chloe",
			lastName: "Price",
			email: "cprice1@blackwell.com",
			address: "123 Butterfly St",
			city: "Arcadia Bay",
			state: "Oregon",
			zipcode: "123456",
			phone: "234-567-8901"
		},
		{
			firstName: "Rachel",
			lastName: "Amber",
			email: "ramber1@blackwell.com",
			address: "123 Junk St",
			city: "Arcadia Bay",
			state: "Oregon",
			zipcode: "123456",
			phone: "345-678-9012"
		}
	]
});