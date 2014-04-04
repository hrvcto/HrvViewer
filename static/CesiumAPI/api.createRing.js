define(['./api.utils.js'],function(utils){
  function createRing(cesiumWidget, options){

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

    /*var poses = [];
    for(var i = 0; i < options.positions.length; i ++){
      poses.push(
        ellipsoid.cartographicToCartesian(
          Cartographic.fromDegrees(options.positions[i].longitude, options.positions[i].latitude, options.positions[i].height || 0)
          )
        );
    }*/

    //var w = options.width ? options.width : 1.0;
     var outradius = options.outradius ? options.outradius :20000;
     var inradius = options.intradius ? options.intradius :10000;
   // console.log(JSON.stringify(options.radius));
      
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

        // var circle = primitives.add(new Cesium.Polygon({
        //     positions : Cesium.Shapes.computeCircleBoundary(
        //         ellipsoid,
        //         ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.0, 40.0)),
        //         300000.0)
        // }));
      
   /* var circleGeometry = new Cesium.CircleGeometry({
        center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.positions.longitude, options.positions.latitude)),
        radius : 2500000.0,
        stRotation: Cesium.Math.toRadians(0.0),
        vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
    });

    var redCircleInstance = new Cesium.GeometryInstance({
        geometry : circleGeometry,
        attributes : {
             color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0,0.0,.0,0.5))
        }
    });
    primitives.add(new Cesium.Primitive({
        geometryInstances: redCircleInstance,
        appearance: new Cesium.PerInstanceColorAppearance({
            closed : true
          })
    }));*/


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
      //var center = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.center.longitude, options.center.latitude));
      // console.log(JSON.stringify(options.center));
    //var radius = 200000.0;
    
    // Outline of red circle
    if(typeof options.center.longitude == 'string'){
      options.center.longitude= utils.ConvertDMStoDD(options.center.longitude);
      options.center.latitude = utils.ConvertDMStoDD(options.center.latitude);
    }

    var circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
        center :ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.center.longitude, options.center.latitude)),
        radius : outradius 
    });
    
    var circleOutlineInstance = new Cesium.GeometryInstance({
        geometry : circleOutlineGeometry,
        attributes : {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(options.outColor.red, options.outColor.green, options.outColor.blue, options.outColor.alpha))
        }
    });
    

    var circleOutlineinGeometry = new Cesium.CircleOutlineGeometry({
        center :ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(options.center.longitude, options.center.latitude)),
        radius : inradius 
    });
    
    var circleinOutlineInstance = new Cesium.GeometryInstance({
        geometry : circleOutlineinGeometry,
        attributes : {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(options.outColor.red, options.outColor.green, options.outColor.blue, options.outColor.alpha))
        }
    });


    primitives.add(new Cesium.Primitive({
        geometryInstances : [circleOutlineInstance, circleinOutlineInstance],
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


    // var circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
    //     center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(90, 40)),
    //     radius :100000
    // });
    
    // var circleOutlineInstance = new Cesium.GeometryInstance({
    //     geometry : circleOutlineGeometry,
    //     attributes : {
    //         color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0,0.0,.0,0.5))
    //     }
    // });

    //  // circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
    //  //    center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(90, 40)),
    //  //    radius : 100000
    //  //  });
    
    //  //  var circleOutlineInstance = new Cesium.GeometryInstance({
    //  //    geometry : circleOutlineGeometry,
    //  //    attributes : {
    //  //        color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1.0,0.0,.0,0.5))
    //  //    }
    //  //  });


    //   primitives.add(new Cesium.Primitive({

    //     geometryInstances : [circleOutlineInstance],
    //     appearance : new Cesium.PerInstanceColorAppearance({
    //         flat : true,
    //         renderState : {
    //             depthTest : {
    //                 enabled : true
    //             },
    //             closed : true,
    //         lineWidth :scene.context.getMaximumAliasedLineWidth()
    //         }
    //     })
    //   }));

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

  return createRing;
});