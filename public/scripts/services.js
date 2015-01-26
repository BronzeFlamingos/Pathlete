angular.module('pathleteApp.services', [])

.factory('Info', function ($http) {
  // Your code here
  var getInfo = function(){
    return $http({
      method: 'GET',
      url: '/userdata'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var logout = function(){
    return $http({
      method: 'GET',
      url: '/logout'
    })
  }

  return {
    getInfo: getInfo,
    logout: logout
  };

});
