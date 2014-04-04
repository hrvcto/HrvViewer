define(function(){
  function loadModel(cesiumViewer, options) {
    var id = options.id;
    var Cartographic = Cesium.Cartographic;
    var scene = cesiumViewer.scene;
    var primitives = scene.primitives;
    var ellipsoid = scene.primitives.centralBody.ellipsoid;
    var CartoFromDegrees = Cartographic.fromDegrees(options.position.longitude, options.position.latitude, options.position.height || 0);
    var modelpose = ellipsoid.cartographicToCartesian(CartoFromDegrees);
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(modelpose);
    var creatMode = Cesium.Model;
    console.log(options);
    var model = primitives.add(
      creatMode.fromGltf({
        url : options.url,
        modelMatrix : modelMatrix ,
        scale:options.scale
      })); 
    model.readyToRender.addEventListener(function(model) {
      var worldBoundingSphere = model.computeWorldBoundingSphere();
      var r = 5 * worldBoundingSphere.radius;
      var destination = Cesium.Cartographic.fromDegrees(options.position.longitude, options.position.latitude, options.position.height+r);
      var flight = Cesium.CameraFlightPath.createAnimationCartographic(scene, {
        destination : destination,
        duration:0
      });
      scene.animations.add(flight);
    });
    require(['CesiumAPI/api.idManager.js'], function(){
      var id = options.id || window.idManager.nextID();
      window.idManager.addObject(id, model, scene.primitives);
    });
  };
  return loadModel;
})