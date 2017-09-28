
var app = angular.module('manShowInfoApp', []);

app.controller('manShowInfoController', function($scope) {
	$scope.manInfo = {
		firstName: "Michael",
		lastName: "Scott",
		email: "mscott@mailinator.com"
	}
});