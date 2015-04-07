'use strict';

angular.module('angularPassportApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap'
])
//choosing a specific partial HTML and a controller for any route
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/books', {
        templateUrl: 'partials/books.html',
        controller: 'BooksCtrl'
      })
      .when('/books/new_arrivals', {
        templateUrl: 'partials/books.html',
        controller: 'NewArrivalsCtrl'
      })
      .when('/books/Genre', {
        templateUrl: 'partials/genre.html',
        controller: 'GenreCtrl'
      })
      .when('/books/:id', {
        templateUrl: 'partials/book.html',
        controller: 'BookCtrl'
      })
      
      .when('/profile', {
        templateUrl: 'partials/userprofile.html',
        controller: 'ProfileController'
      })

      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });