define(['./api.utils.js'],function(utils) {
  function flyToExtent(cesiumWidget, options){
    var scene = cesiumWidget.scene;
    var extent = options.extent;
    var duration = options.duration || 3000;

    if(typeof extent.west == 'string') {
      extent.west = utils.ConvertDMStoDD(extent.west);
      extent.south = utils.ConvertDMStoDD(extent.south);
      extent.east = utils.ConvertDMStoDD(extent.east);
      extent.north = utils.ConvertDMStoDD(extent.north);
    }
    
    var ellipsoid = cesiumWidget.centralBody.ellipsoid;
    var west = Cesium.Math.toRadians(extent.west);
    var south = Cesium.Math.toRadians(extent.south);
    var east = Cesium.Math.toRadians(extent.east);
    var north = Cesium.Math.toRadians(extent.north);
    var extent = new Cesium.Extent(west, south, east, north);
    var flight = Cesium.CameraFlightPath.createAnimationExtent(scene, {
      destination : extent
    });
    scene.animations.add(flight);
  }
  return flyToExtent;
});