angular.module('metaexplorer.services', [])
.service('ColorService', function($http, $q) {
  function readMovieResponse(response) {
    var list = response.data.autocomplete;
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
    movie: function (item) {
      //jsonp(url, config)
      return $http({
        method: 'GET',
        url: 'http://localhost:8888/Elephont/index.php/movie/'+ movieName
        //params:{term: urlItem }
      }).then(readMovieResponse);
    }
  }
});
