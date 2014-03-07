'use strict';

angular.module('metaexplorer.services', [])
.service('profileService', ['$http','$q', function($http, $q) {

  return {
    //url = https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&client_id=6c915f96b07a44c381fb5c6bfe5e40ed
    //https://api.instagram.com/v1/users/4912390
    search: function () {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/search'
        //params:{term: urlItem }
      }).then(readMovieResponse);
    }
  }
}])

.service('listService', ['$http','$q', function($http, $q){
  return {
    query: function (type, search) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/listing/',
          params:{
            type: type,
            q: search
          }
      });
    }
  }
}])

.service('getService', ['$http','$q', function($http, $q){
  return {
    get: function (type, userID) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/get/',
          params:{
            type: type,
            q: userID
          }
      })
    }
  }
}])

.service('serviceType', ['$http','$q', function($http, $q){
  return {
    get: function (view, type, search) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/test/',
          params:{
            type: type,
            search: search
          }
      })
    }
  }
}])

.service('currentLocation', ['$q','$window', function($q, $window){
  return {
    getCurrentLocation: function(){
      var defer = $q.defer();
      $window.navigator.geolocation.getCurrentPosition(defer.resolve, defer.reject);
      return defer.promise;
      }
  }
}])

.service('searchLocation', ['$http','$q', function($http, $q){

    function getMappedComponentData(googleLocation) {
      // Map location components by type key
      var map = {};
      map.name = googleLocation.formatted_address;
      map.lat = googleLocation.geometry.location.lat;
      map.lng = googleLocation.geometry.location.lng;

      return map;
    }

  return {
    query: function(value){

      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + value).then(function (response) {

        var addresses = response.data.results.map(function (location) {
          var data = getMappedComponentData(location);
          return data;
        });
        return addresses;
      });
    }
  }
}])

.service('getPhotosFromLocation', ['$http','$q', function($http, $q){
  return {
    get: function (item) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/location/' + item
          // params:{lat: item.lat,
          //   lng: item.lng
          // }
      })
    }
  }
}])

.service('photoTagService', ['$http','$q', function($http, $q){
  return {
    query: function (item) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/tag/' + item
          // params:{lat: item.lat,
          //   lng: item.lng
          // }
      })
    },
    get: function (item) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/tag/',
          params:{
            term: item
          }
      })
    }
  }
}])

.service('userService', ['$http','$q', function($http, $q){
  return {
    query: function (item) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/usersearch/',
          params:{
            q: item
          }
      })
    },
    get: function (type, userID) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/get/',
          params:{
            type: type,
            q: userID
          }
      })
    }
  }
}])

.service('pagingService', ['$http','$q', function($http, $q){
  return {
    get: function (type, search, pagingIDs) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/paging/',
          params:{
            type: type,
            q: search,
            max: pagingIDs.nextMax,
            min: pagingIDs.nextMin
          }
      })
    }
  }
}])

.service('likeService', ['$http','$q', function($http, $q){
  return {
    post: function (mediaId) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/liking/',
          params:{
            mediaId: mediaId
          }
      })
    }
  }
}])

.service('loginService', ['$http','$q', function($http, $q){
  return {
    logIn: function () {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/login'
      })
    },
    logout: function () {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/logout'
      })
    }
  }
}]);

