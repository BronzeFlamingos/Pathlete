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

  return {
    getInfo: getInfo,
  };

});
