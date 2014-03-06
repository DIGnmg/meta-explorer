'use strict';

angular.module('metaexplorer.services', [])

.service('profileService', function($http, $q) {

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
})

.service('serviceType', function($http, $q){
  return {
    get: function (view, type, search) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/test/',
          params:{view: view.name,
            type: type.name,
            search: search
          }
      })
    }
  }
})

.service('currentLocation', function($q, $window){
  return {
    getCurrentLocation: function(){
      var defer = $q.defer();
      $window.navigator.geolocation.getCurrentPosition(defer.resolve, defer.reject);
      return defer.promise;
      }
  }
})

.service('searchLocation', function($http, $q){

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
})

.service('getPhotosFromLocation', function($http, $q){
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
})

.service('photoTagService', function($http, $q){
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
})

.service('userService', function($http, $q){
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
    get: function (userID) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/user/',
          params:{
            q: userID
          }
      })
    }
  }
})

.service('pagingService', function($http, $q){
  return {
    get: function (type, search, pagingIDs) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/paging/',
          params:{
            type: type.name,
            q: search,
            max: pagingIDs.nextMax,
            min: pagingIDs.nextMin
          }
      })
    }
  }
})

.service('likeService', function($http, $q){
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
})

.service('loginService', function($http, $q){
  return {
    get: function () {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/liking/',
          params:{
            mediaId: mediaId
          }
      })
    }
  }
});

