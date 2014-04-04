    define(function() {
      function createSensor(cesiumWidget, options) {
        var longitude = Cesium.Math.toRadians(0.0);
        var latitude = Cesium.Math.toRadians(0.0);
        var altitude = 5000000.0;
        var clock = 0.0;
        var cone = Cesium.Math.toRadians(0.0);
        var twist = 0.0;
        var selection = 'Rectangular';

        //修改参数
        // var longitude = Cesium.Math.toRadians(90.0);
        // var latitude = Cesium.Math.toRadians(3.0);
        // var altitude = 30000000.0;
        // var clock = 0.0;
        // var cone = Cesium.Math.toRadians(0.0);
        // var twist = 0.0;
        // var selection = 'Rectangular';

         
        var ellipsoid = cesiumWidget.centralBody.ellipsoid;
        var scene = cesiumWidget.scene;
        var primitives = scene.primitives;
        var sensors = new Cesium.SensorVolumeCollection();
        // Red circle
        //sensors.

          // appearance : new Cesium.PerInstanceColorAppearance({
            // closed : true
        primitives.add(sensors);
        sensors.removeAll();
        var rectangularPyramidSensor = sensors.addRectangularPyramid();

            var location = ellipsoid.cartographicToCartesian(new Cesium.Cartographic(longitude, latitude, altitude));
            var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(location);
            var orientation = Cesium.Matrix3.multiply(
                                Cesium.Matrix3.multiply(Cesium.Matrix3.fromRotationZ(clock), Cesium.Matrix3.fromRotationY(cone)),
                                Cesium.Matrix3.fromRotationX(twist)
                              );
              
            rectangularPyramidSensor.modelMatrix = Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation, Cesium.Cartesian3.ZERO));;
            rectangularPyramidSensor.radius = 20000000.0;
            rectangularPyramidSensor.xHalfAngle = Cesium.Math.toRadians(40.0);
            rectangularPyramidSensor.yHalfAngle = Cesium.Math.toRadians(20.0);
            rectangularPyramidSensor.material = Cesium.Material.fromType('Color');//设置颜色
            rectangularPyramidSensor.material.uniforms.color = {
                red : 0.0,
                green : 1.0,
                blue : 1.0,
                alpha : 0.5
            };
      }
      return createSensor;
    });