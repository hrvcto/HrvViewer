define(function(){
  function removeCzml(cesiumWidget, options) {
    var timer = setInterval(function() {
      var czmlItem = options[0];
      if(czmlItem) {
require(['CesiumAPI/api.idManager.js'], function() {
  var ary = window.idManager.getByID(czmlItem.id);
  console.log(ary);
  for(var i = 0; i < ary.length; i ++) {
    cesiumWidget.dataSources.remove(ary[i]);
  }
});
}

options = options.slice(1, options.length);
console.log("options:"+JSON.stringify(options));
if (options.length<=0) {
  clearInterval(timer);
}
if(czmlItem) {
require(['CesiumAPI/api.idManager.js'], function() {
  var ary = window.idManager.getByID(czmlItem.id);
  console.log(ary);
  for(var i = 0; i < ary.length; i ++) {
    cesiumWidget.dataSources.remove(ary[i]);
  }
});
}
}, 0);   
  }
  return removeCzml;
});
