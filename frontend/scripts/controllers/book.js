'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {
   	$http.get('api/books/'+ShareService.getValue()).success(function(response) {
			console.log("I received the book");
		 	$scope.book=response.book;
		});
   	$scope.rating= {}
   	//rate function's job is to send to the backend am object consisting of a user and his rating
   	$scope.rate = function() {
   		console.log($scope.rating);
   	   	//console.log($scope.rating.user);

   	$http.post('api/books/'+ShareService.getValue()+'/rate',$scope.rating)
            .success(function(data) {
                $scope.book=response.book;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

   };
  });

  

  