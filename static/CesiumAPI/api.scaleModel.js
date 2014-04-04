define(function(){
  function deleteModel(cesiumWidget, options) {
    var scene = cesiumWidget.scene;
    var id = options.id;
    if(id) {
      require(['CesiumAPI/api.idManager.js'], function() {
        var ary = window.idManager.getByID(id);
        if(ary.length>0) {
          var obj = ary[0];
          if(options.magnify=="true")
          {
            obj.scale = obj.scale+0.5;
          }
          if(options.magnify=="false"&&obj.scale>1)
          {     
            obj.scale = obj.scale-0.5;  
          }
          console.log(obj.scale);
        }   
      });
    }
  }
  return deleteModel;
})
