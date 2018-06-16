var contactCtrl;
(function(){
	var app = angular.module('akContact', []);

	app.directive("contactDir", function(){
		return {
			restrict: "E",
			templateUrl: "Contact.html"				
		};		
	});	
	
	app.controller('contactController', function($scope){
		contactCtrl = this;
		this.showMenu = false;
		
		this.toggleMenu = function(){
//			console.log("Toggling menu");
			this.showMenu = !this.showMenu;
			$scope.$applyAsync();
		};
		
	});
	
})();


