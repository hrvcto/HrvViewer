define(function(){
  function addAnimation(cesiumWidget, options){















/*{
    "name": "createRing",
    "args": {
      "center": {
        "longitude": 32.23,
        "latitude": 123.23,
        "height": 1000
      },
      "color": "0xFFADDFFF",
      "outlineColor": "0xFFADDFFF"
    }

       Red circle
    var circleGeometry = new Cesium.CircleGeometry({
        center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-95.0, 43.0)),
        radius : 2500000.0,
        stRotation: Cesium.Math.toRadians(90.0),
        vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
    });
    var redCircleInstance = new Cesium.GeometryInstance({
        geometry : circleGeometry,
        attributes : {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0, 0.0, 0.0, 0.5))
        }
    })

  },*/

    var Cartographic = Cesium.Cartographic;
    var Primitive = Cesium.Primitive;
    var GeometryInstance = Cesium.GeometryInstance;
    var PolylineGeometry = Cesium.PolylineGeometry;
    var PolylineMaterialAppearance = Cesium.PolylineMaterialAppearance;
    var Material = Cesium.Material;
  

    var scene = cesiumWidget.scene;
    var centralBody = cesiumWidget.centralBody;

    var primitives = scene.primitives;
    var ellipsoid = centralBody.ellipsoid;
    var RationDegree = options.stRotation;

    var extent;
    var rectangularSensor;

    scene.animations.removeAll();
     var rdis = options.radius ? options.radius :1000;

      extent = new Cesium.ExtentPrimitive({
            extent : new Cesium.Extent(
                        Cesium.Math.toRadians(-120.0),
                        Cesium.Math.toRadians(20.0),
                        Cesium.Math.toRadians(-80.0),
                        Cesium.Math.toRadians(50.0)),
            material : Cesium.Material.fromType('Color')
        });
        primitives.add(extent);

       var modelMatrix = Cesium.Transforms.northEastDownToFixedFrame(
                ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-45.0, 45.0)));
        modelMatrix = Cesium.Matrix4.multiply(
                modelMatrix,
                Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(200000.0, 0.0, -3000000.0)),
                modelMatrix);
      var sensors = new Cesium.SensorVolumeCollection();
        rectangularSensor = sensors.addRectangularPyramid({
            modelMatrix : modelMatrix,
            //三角大小
            radius : 10000000.0,
            xHalfAngle : Cesium.Math.toRadians(30.0),
            yHalfAngle : Cesium.Math.toRadians(20.0),
            material : Cesium.Material.fromType('Stripe', {
                repeat : 10
            })
        });
        primitives.add(sensors);
        scene.animations.addOffsetIncrement(rectangularSensor.material);

        extent.material.uniforms.time = 1.0;
        extent.material.uniforms.color = new Cesium.Color(1.0, 0.0, 0.0, 0.5);
        
        scene.animations.addAlpha(extent.material, 0.0, 0.5);


       // scene.animations.addAlpha(primitive.material);
    /* var circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
        center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.positions.longitude, options.positions.latitude)),
        radius : rdis
    });
    
    var circleOutlineInstance = new Cesium.GeometryInstance({
        geometry : circleOutlineGeometry,
        attributes : {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0,0.0,.0,0.5))
        }
    });

    primitives.add(new Cesium.Primitive({
        geometryInstances : [circleOutlineInstance],
        appearance : new Cesium.PerInstanceColorAppearance({
            flat : true,
            renderState : {
                depthTest : {
                    enabled : true
                },
                lineWidth : Math.min(3.0, scene.context.getMaximumAliasedLineWidth())
            }
        })
    }));

    primitives.add(new Cesium.Primitive({
        geometryInstances : new Cesium.GeometryInstance({
            geometry : new Cesium.CircleGeometry({
               center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.positions.longitude, options.positions.latitude)),
               radius : rdis,
               vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
            })
        }),
        appearance : new Cesium.PerInstanceColorAppearance()
    }));*/
      // Red circle
  
  /* var circleGeometry = new Cesium.CircleGeometry({
        center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.positions.longitude, options.positions.latitude)),
        radius : 250000.0,
        stRotation: Cesium.Math.toRadians(0.0),
        vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        material : Cesium.Material.fromType(Cesium.Material.GridType)
    });

    var redCircleInstance = new Cesium.GeometryInstance({
        geometry : circleGeometry
    });
    primitives.add(new Cesium.Primitive({
        geometryInstances: redCircleInstance,
        appearance: new Cesium.PerInstanceColorAppearance({
            closed : true
          })
    }));*/



   /*
    for(var i = 20000; i < 300000; i = i+3 )
    {

  
      circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
        center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.positions.longitude, options.positions.latitude)),
        radius : rdis
      });
    
      var circleOutlineInstance = new Cesium.GeometryInstance({
        geometry : circleOutlineGeometry,
        attributes : {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0,0.0,.0,0.5))
            //Cesium.ColorGeometryInstanceAttribute.fromType
        }
      });


      primitives.add(new Cesium.Primitive({

        geometryInstances : [circleOutlineInstance],
        appearance : new Cesium.PerInstanceColorAppearance({
            flat : true,
            renderState : {
                depthTest : {
                    enabled : true
                },
                closed : true,
            lineWidth :scene.context.getMaximumAliasedLineWidth()
            }
        })
      }));
    }
*/
  /* primitives.add(new Cesium.Primitive({
        geometryInstances : [circleOutlineInstance],
        appearance : new Cesium.PerInstanceColorAppearance({
            flat : true,
            renderState : {
                depthTest : {
                    enabled : true
                },
            lineWidth : Math.min(3.0, scene.context.getMaximumAliasedLineWidth()),
            closed: false,
            translucent : false
            }
        })
    }));*/


    /*var p = new Primitive({
      geometryInstances: new GeometryInstance({
        geometry: new CircleGeometry({
          positions: poses,
          radius: rdis,
          stRotation:Cesium.Math.toRadians(RationDegree), 
          vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
        })
      }),
      appearance : new PolylineMaterialAppearance({
        material : Material.fromType('Color', {
          color: Cesium.Color.fromCssColorString(options.color)
        })
      })
    });

    primitives.add(p);*/
  }

  return addAnimation;
});