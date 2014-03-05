'use strict';

angular.module('metaexplorer.services', [])

.service('profileService', function($http, $q) {

  function readMovieResponse(response) {
    var list = response.data;
    console.log(list);
    return list;
  }
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    },
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

  function builder() {

  };

  return {
    getServiceType: function(type, search){
      var defer = $q.defer();
      var buildType=['location','users','tags'];

      //$window.navigator.geolocation.getCurrentPosition(defer.resolve, defer.reject);
      return defer.promise;
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
          url: 'http://localhost:3000/tag/' + item
          // params:{lat: item.lat,
          //   lng: item.lng
          // }
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
});

