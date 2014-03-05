'use strict';

angular.module('metaexplorer.controllers', ['metaexplorer.services'])

  .controller('MainCtrl', function ($scope, $rootScope, profileService, currentLocation, getPhotosFromLocation, photoTagService, serviceType, userService) {

    function fixDate (item){
      item['created_time'] += '000';
      return item;
    }

    $scope.searchType = '';
    $scope.searchView = '';
    $scope.viewOption = [{name:"search"}, {name:"view"}];
    $scope.listOption = [{name:"location"}, {name:"users"},{name:"tags"}];


    $scope.search = function(item){
      console.log($scope.searchType);
      userService.query(item).then(function(data){
        $scope.place = data.data.data;
        $scope.place.map(fixDate);
        console.log($scope.place)
      });
    }

    $scope.searchUser = function(userID){
      userService.get(userID).then(function(data){
        $scope.place = data.data.data;
        console.log($scope.place)
      });
    }

    $scope.megaSearch = function(search){
      serviceType.get($scope.searchView, $scope.searchType, search).then(function(data){
        $scope.place = data.data.data;
        console.log($scope.place)
      });
    }

    $scope.searchLocation = function(userID){
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
})
  .controller('UserCtrl', function ($scope, $rootScope, userService) {
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
      $scope.place = data.data.data;
    });
});
