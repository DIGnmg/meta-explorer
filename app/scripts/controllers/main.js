'use strict';

angular.module('metaexplorer.controllers', ['metaexplorer.services'])

  .controller('MainCtrl', function ($scope, $rootScope, profileService, currentLocation, getPhotosFromLocation, photoTagService, serviceType, userService, searchLocation, pagingService) {

    function fixDate (item){
      item['created_time'] += '000';
      return item;
    }

    $scope.searchType = 'noun';
    $scope.searchView = '';
    $scope.viewOption = [{name:"search"}, {name:"view"}];
    $scope.listOption = [{name:"location"}, {name:"users"},{name:"tags"}];

    $scope.$watch('searchView', function(newValue, oldValue) {
      console.log(newValue);
      if(newValue.name === 'view'){
        $scope.listOption = [{name:"Current location"},{name:"tags"}];
      } else {
        $scope.listOption = [{name:"location"}, {name:"users"},{name:"tags"}];
      }
    });

    $scope.$watch('searchType', function(newValue, oldValue) {
      console.log(newValue);
      if(newValue.name === 'Current location'){
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
      }
    });

    $scope.megaSearch = function(search){
      //searching loction
      if($scope.searchType.name === 'location'){
        searchLocation.query(search).then(function(data){
          $scope.place = data;
          search = data;
        });
      }

      serviceType.get($scope.searchView, $scope.searchType, search).then(function(response){
        $scope.place = response.data.data;
        if($scope.searchType.name === 'tags'){
          $scope.paging = {
            nextMin: response.data.pagination.min_tag_id,
            nextMax: response.data.pagination.next_max_tag_id
          };
        } else {
          $scope.paging = {
            nextMax: response.data.pagination.next_max_id
          };
        }
        console.log($scope.paging)
        console.log($scope.place)
      });
    };

    // Paging
    $scope.nextPage = function(){
      pagingService.get($scope.searchType, $scope.item, $scope.paging).then(function(response){
        $scope.place = response.data.data;
        console.log($scope.place)
      });
    };


    $scope.locationSearch = function(search){
      serviceType.get($scope.searchView, $scope.searchType, search).then(function(data){
        $scope.place = data.data.data;
        console.log($scope.place)
      });
    };

    // Search Funtions for links
    $scope.searchUser = function(userID){
      userService.get(userID).then(function(response){
        $scope.place = response.data.data;
        console.log($scope.place)
        console.log(response)
      });
    };

    $scope.searchTag = function(item){
      photoTagService.get(item).then(function(data){
        $scope.place = data.data.data;
        console.log($scope.place)
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
    });
});
