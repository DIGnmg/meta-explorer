'use strict';

angular.module('metaexplorer.controllers', ['metaexplorer.services'])

  .controller('MainCtrl', ['$scope', '$rootScope', 'profileService', 'currentLocation', 'getPhotosFromLocation', 'photoTagService', 'serviceType', 'userService', 'searchLocation', 'pagingService', 'likeService', 'loginService', 'getService', function ($scope, $rootScope, profileService, currentLocation, getPhotosFromLocation, photoTagService, serviceType, userService, searchLocation, pagingService, likeService, loginService, getService) {

    $scope.data = [
      {name: "Greg", score: 98},
      {name: "Ari", score: 96},
      {name: 'Q', score: 75},
      {name: "Loser", score: 48}
    ];

    function fixDate (item){
      item['created_time'] += '000';
      return item;
    }

    function loadingMedia() {
      $scope.loading = !$scope.loading;
    }

    $scope.loading = false;
    $scope.paging = false;
    $scope.searchType = 'tags';

    $scope.megaSearch = function(search){
      $scope.search = search;
      //searching loction
      $scope.loading = true;

      getService.get($scope.searchType, $scope.search).then(function(response){
        $scope.loading = false;
        $scope.place = response.data.data;
        $scope.place.map(fixDate);
        $scope.paging = pagingService.set($scope.searchType, response.data.data[0].user.id, $scope.search, response.data.pagination);
      });
    };

    // Paging
    $scope.nextPage = function(){
      pagingService.get($scope.paging).then(function(response){
        $scope.nextpage = response.data.data;
        $scope.nextpage.map(fixDate);
        var tempArray = [];
        tempArray = $scope.place.concat($scope.nextpage);
        $scope.place = tempArray;
        $scope.paging = pagingService.set($scope.searchType, response.data.data[0].user.id, $scope.search, response.data.pagination);
      });
    };

    $scope.locationSearch = function(search){
      serviceType.get($scope.searchView, $scope.searchType, search).then(function(data){
        $scope.place = data.data.data;
      });
    };

    $scope.currentLocation = function(){
     currentLocation.getCurrentLocation().then(function(data){
        var geo = {
            lat: data.coords.latitude,
            lng: data.coords.longitude
        };
        var path = 'lat=' + geo.lat + '&lng=' + geo.lng

        return path;
      }).then(getPhotosFromLocation.get).then(function(data){
          $scope.place = data.data.data;
          $scope.place.map(fixDate);
      });
    };


    // Search Funtions for User and Tags
    $scope.searchUser = function(userID){
      userService.get(userID).then(function(response){
        $scope.place = response.data.data;
        $scope.getPageId(response.data.pagination);
      });
    };

    $scope.searchTag = function(item){
      photoTagService.get(item).then(function(data){
        $scope.place = data.data.data;
      });
    };

    $scope.likeMedia = function(item){
      likeService.post(item).then(function(data){
        console.log("Liked");
        $scope.megaSearch($scope.search);
      });
    };

    // Log user in and out
    $scope.user = loginService.logIn().then(function(res){
        $scope.locksmith = res.data.user;
        console.log($scope.locksmith);
    });

    $scope.logOut = function(item){
      loginService.logout().then(function(res){
        $scope.locksmith = res.data.user;
      });
    };

}])

.controller('UserCtrl', ['$scope', '$rootScope', 'userService', function ($scope, $rootScope, userService) {
    function fixDate (item){
      item['created_time'] += '000';
      return item;
    }
    //TODO: make it a form
    userService.get().then(function(data){
      console.log(data)
      $scope.place = data.data.data;
      $scope.place.map(fixDate);
      $scope.user = data.data.data[0].user
    });
}]);
