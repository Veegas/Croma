'use strict'
angular.module('angularPassportApp')
.controller('ProfileController', ['$scope', '$http',
	function sendUserInfo ($scope, $http) {
		// var id = $rootScope.currentUser._id;
		$http.get('api/users/' + $scope.currentUser._id).success(function(response) {
			console.log('scope current user', $scope.currentUser._id);
			console.log(response);
		 	$scope.userInfo=response;


$scope.editedInfo=$scope.userInfo;
$scope.editorEnabled = false;

   $scope.enableEditor = function() {
     $scope.editorEnabled = true;
     $scope.editableTitle = $scope.editedInfo;
   };

   $scope.disableEditor = function() {
     $scope.editorEnabled = false;
   };

   $scope.save = function() {
$scope.editedInfo= $scope.editableTitle;
//console.log('edited info', editedInfo);
$scope.userInfo=$scope.editedInfo;
     $scope.disableEditor();
 $scope.addInfo = function() {
        $http.post('api/users/', $scope.editedInfo)
            .success(function(data) {
                $scope.userInfo = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
     

  };
   //$scope.$apply(function () {
//$scope.editedInfo= $scope.editableTitle;

//});

<<<<<<< HEAD
    });
	}
]);


=======
>>>>>>> 417945f6a5b37b6868006f1670a8f5de1d826a6f
