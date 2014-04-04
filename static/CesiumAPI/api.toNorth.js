define(function(){
  function North(cesiumWidget, options){
    var scene = cesiumWidget.scene;
    var camera = scene.camera;
    scene.camera.controller.heading=0

  }

  return North;
});