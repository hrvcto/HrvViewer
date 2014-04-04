define(function(){
  function hideModel(cesiumWidget, options) {
    var scene = cesiumWidget.scene;
    var id = options.id;
    
    if(id) {
      require(['CesiumAPI/api.idManager.js'], function() {
        var ary = window.idManager.getByID(id);
        for(var i = 0; i < ary.length; i ++) {
          if(options.show =='false')
          ary[i].show =false;
        else
          ary[i].show =true;
        }  
      });
    }
  }
  return hideModel;
})
