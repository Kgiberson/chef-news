var app = angular.module('chefNews', []);
var router = angular.module('chefNews', ['ui.router']);

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', [
'$scope', 'posts',
  function($scope, posts){
    $scope.posts = posts.posts;
    // When we add a post we get the title from $scope.title, which is then cleared after the post has been created.
    $scope.addPost = function(){
      if (!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    }
}]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controlelr: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }]);