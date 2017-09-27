
var app = angular.module('custShowInfoApp', []);

app.controller('custShowInfoController', function($scope) {
	$scope.custInfo = {
		firstName: "Max",
		lastName: "Caulfield",
		email: "mcaulfi1@blackwell.com",
		address: "123 Deer St",
		city: "Arcadia Bay",
		state: "Oregon",
		zipcode: "123456",
		phone: "123-456-7890"
	}
});