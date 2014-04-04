define(['./api.utils.js'],function(utils) {
  function flyTo(cesiumWidget, options) {
    var DefaultDuration = 3000;
    var scene = cesiumWidget.scene;
    var position = options.position;
    var ellipsoid = cesiumWidget.centralBody.ellipsoid;

    if(typeof position.longitude == 'string'){
      position.longitude = utils.ConvertDMStoDD(position.longitude);
      position.latitude = utils.ConvertDMStoDD(position.latitude);
    }
    var destination = Cesium.Cartographic.fromDegrees(
      position.longitude, position.latitude, position.height);

    destination = ellipsoid.cartographicToCartesian(destination);

    var flight = Cesium.CameraFlightPath.createAnimation(scene, {
      destination : destination,
      duration: options.duration || DefaultDuration
    });
    scene.animations.add(flight);
    scene.camera.controller.heading=options.rotation/360;
  }
  return flyTo;
});