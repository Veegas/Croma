

  var myApp = angular.module('myApp',[]);

myApp.controller('ProfileController', ['$scope', 'Profile', function($scope,Profile) {
$scope.user = Profile.get({id: $routeParams.id}, function(profile) {

    $scope.picUrl = profile.images[0];
//     function ClickToEditCtrl($scope) {
//   $scope.firstname = Profile.firstName;
// }
  });
//$scope.user=Profile.query();
//$scope.profPicUrl="big.jpg";
// $scope.mainImageUrl = user.profilephoto[0];
});

 $scope.setImage = function(imageUrl) {
      $scope.picUrl = imageUrl;
  };

}]);

directive('fileInput',['$parse',function($parse){
	return{
		restrict:A,
		link:function(scope,elm,attrs){
			elm.bind('change',function(){
				$parse(attrs.fileInput)
				.assign(scope,elm[0].files)
				scope.$apply()
			})
		}
	}
}])
controller('uploader',['$scope','$http',
function($scope,$http){
	$scope.files=elm.files
	$scope.$apply();
}
$scope.upload=function(){
	var fd=new FormData()
	angular.forEach($scope.files,function(file){
		fd.append('file',file)
	})
	$http.post('upload.ashx',fd,
	{
		transformRequest:angular.identity,
		headers:{'Content-Type':undefined}
	})
	.success(function(d)){
		console.log(d)
	})
	
}
}
])


// <div ng-app>
//   <div ng-controller="ClickToEditCtrl">
//     <div ng-hide="editorEnabled">
//       {{profile.firstName}}
//       <a href="#" ng-click="editorEnabled=!editorEnabled">Edit</a>
//     </div>
//     <div ng-show="editorEnabled">
//       <input ng-model="profile">
//       <a href="#" ng-click="editorEnabled=!editorEnabled">Done editing?</a>
//     </div>
//   </div>
// </div>
