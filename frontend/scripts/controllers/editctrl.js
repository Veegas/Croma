'use strict';

angular.module('angularPassportApp')
  .controller('EditCtrl', function ($scope,$http,$location) {
   /**
  * function edit 
  * take info of user from edit form and post it to the backend
  */
    $scope.edit = function() {
      console.log('hii');
      $http.post('api/users/'+ $scope.currentUser._id, 
        { 
        firstName:$scope.user.firstName,
        lastName: $scope.user.lastName,
        age:$scope.user.age,
        address:$scope.user.address})
        .success(function(response) {
          console.log('edited');
          })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        window.location="#/profile";
          
}
  });