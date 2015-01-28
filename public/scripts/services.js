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
    .then(function (resp) {
      return resp.data;
    });
  }

  var login = function(){
    return $http({
      method: 'GET',
      url: '/login'
    })
    .then(function (resp) {
      return resp.data;
    });

  }

  return {
    getInfo: getInfo,
    logout: logout,
    login: login
  };

})

.factory('Tool', function($rootScope){
  var toolbarShow = true;

  var broadcast = function(state){
    $rootScope.$broadcast('state.update', state);
  }

  var toolbarOn = function(){
    toolbarShow = true;
    broadcast({state: true});
  }

  var toolbarOff = function(){
    toolbarShow = false;
    broadcast({state: false});
  }

  return {
    toolbarShow: toolbarShow,
    toolbarOn: toolbarOn,
    toolbarOff: toolbarOff
  }
})
