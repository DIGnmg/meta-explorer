'use strict';

angular.module('metaexplorer.controllers', ['metaexplorer.services'])

  .controller('MainCtrl', function ($scope, $rootScope, profileService, currentLocation, getPhotosFromLocation, photoTagService) {
    $scope.listOption = [{name:"tags"}, {name:"user"},{name:"location"}];
    //TODO: make it a form
    $scope.search = function(item){
      photoTagService.query(item).then(function(data){
        $scope.place = data.data.data;
        var date = parseInt($scope.place[0].created_time);
        var date = new Date(date);
        $scope.place[0].created_time = date
        console.log(data)
      });
    }

    $scope.place = currentLocation.getCurrentLocation().then(function(data){
      var geo = {
          lat: data.coords.latitude,
          lng: data.coords.longitude
      };
      var path = 'lat=' + geo.lat + '&lng=' + geo.lng

      return path;

    }).then(getPhotosFromLocation.get).then(function(data){
       $scope.place = data.data.data;
    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('UserCtrl', function ($scope, $rootScope, userService) {
    //TODO: make it a form
    userService.get().then(function(data){
      console.log(data)
      $scope.user = data.data.data[0].user
      $scope.place = data.data.data;
    });
});
