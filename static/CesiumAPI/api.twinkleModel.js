define(function(){
  function twinkleModel(cesiumWidget, options) {
    var scene = cesiumWidget.scene;
    var ellipsoid = cesiumWidget.centralBody.ellipsoid;
    var id = options.id;
    if(id) {
      require(['CesiumAPI/api.idManager.js'], function() {
        var ary = window.idManager.getByID(id);
        var times;
        if(options.time == 0) {
          times=10;
        }
        else
          times = options.time*2;
        var timeId = setInterval(function() {            
          for(var i=0;i<ary.length;i++)
          {
            ary[i].show = !ary[i].show;
          }
          times--;
          if(times<=0){
            clearInterval(timeId);
            for(var i=0;i<ary.length;i++)
            {
             ary[i].show=true;
            }
          }
        },500);          
    });
    }
  }
  return twinkleModel;
});
