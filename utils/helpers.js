module.exports ={
  extend: function (target) {
    var args = arguments.slice();
    for (var i = 0; i < args.length; i++){
      for (var key in args[i]){
        target[key] = args[i][key];
      }
    }
    return target;
  }
};