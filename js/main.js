angular.module('myApp', ['ngRoute'])
	.config( function ($routeProvider) {

		$routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/search', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

	})
	.controller('SearchCtrl', function($scope, $rootScope, DataService, $location) {

		$scope.querySearch = "tortellini";
		$scope.searchItems = function(e) {
			e.preventDefault()

			DataService.getRecipes( $scope.querySearch )
				.then( function(recipes) {
					$rootScope.recipes = recipes;
				})

			$location.path("/search")
		}

	})
	.controller('HomeCtrl', function($scope, $rootScope) {
		$rootScope.section = "home"
		$scope.title = "HOME"
	})
	.controller('ResultsCtrl', function($scope, $rootScope) {
		$rootScope.section = "search"
		$scope.title = "SEARCH"
	})
	.factory("DataService", function( $http ) {

			function getRecipes( query ) {
				url = 'https://powerful-inlet-75906.herokuapp.com/edamam/recipes?q=' + query;
				return $http.get( url )
									.then(d => d.data)
			}

			return {
				getRecipes : getRecipes
			}

	})

