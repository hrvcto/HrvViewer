 [
    {
      "id" : "中国",
      "name" : "中国",
      "image" : "images/country/01.png",
      "actions" : [ 
                  {
                    "name": "loadModel",
                    "args": {
                      "id": 1211,
                      "position": 
                      {
                      "longitude": 121.6,
                      "latitude": 41.6,
                      "height": 50
                     },
                     "url":"models/CesiumAir/Cesium_Air.json"
                    }
                  },
                    {
                    "name": "loadModel",
                    "args": {
                      "id": 1211,
                      "position": 
                      {
                      "longitude": 121.602,
                      "latitude": 41.6,
                      "height": 50
                     },
                     "url":"models/CesiumAir/Cesium_Air.json"
                    }
                  }


                 ],
      "children" : [{
                       "ref" : "data/china/airport.js"
                    },
                    {
                       "ref" : "data/china/train.js"
                    }]
    },
    {
      "id" : "american",
      "name" : "美国",
      "image" : "images/country/10.jpg",
      "actions" : [
            {
             "func_name": "flyTo",
             "args": {
                  "position": {
                  "longitude": -77.013222,
                  "latitude": 38.913611,
                   "height": 80000
                 },
                  "duration": 4000,
                  "rotation": 120
                }
            }],
      "children" : [{
                       "ref" : "data/usa/airport.js"
                    },
                    {
                       "ref" : "data/usa/train.js"
                    },
                    {
                       "ref" : "data/usa/seaport.js"
                    }
                    ]
    },
    {
      "id" : "亚美尼亚",
      "name" : "亚美尼亚",
      "image" : "images/country/03.png",
      "actions" : [ {
                    "func_name":"createPolyline",
                    "args":{
                      "id":"http://sdfsdsdfdsf",
                      "positions":[{
                        "longitude":-100.0,
                        "latitude":36.0,
                        "height":0
                      },
                      {"longitude":-92.0,
                      "latitude":35.0,
                      "height":0}],
                      "color":"blue",
                      "width":1.0,
                      "outlineColor":"0xFFADDFFF",
                      "arrow":"head/tail/none"
                    }
                   }],
      "children" : [{
                       "ref" : "data/jap/airport.js"
                    },
                    {
                       "ref" : "data/jap/train.js"
                    }]
    },
    {
      "id" : "日本",
      "name" : "日本",
      "image" : "images/country/02.png",
      "actions" : [],
      "children" : [{
                       "ref" : "data/jap/airport.js"
                    },
                    {
                       "ref" : "data/jap/train.js"
                    }]
    },
    {
      "id" : "阿塞拜疆",
      "name" : "阿塞拜疆",
      "image" : "images/country/04.png",
      "actions" : [],
      "children" : [{
                       "ref" : "data/jap/airport.js"
                    },
                    {
                       "ref" : "data/jap/train.js"
                    }]
    },
    {
      "id" : "文莱",
      "func_name" : "文莱",
      "image" : "images/country/05.png",
      "actions" : [],
      "children" : [{
                       "ref" : "data/jap/airport.js"
                    },
                    {
                       "ref" : "data/jap/train.js"
                    }]
    },

    {
      "id" : "印度",
      "name" : "印度",
      "image" : "images/country/06.png",
      "actions" : [],
      "children" : [{
                       "ref" : "data/jap/airport.js"
                    },
                    {
                       "ref" : "data/jap/train.js"
                    }]
    },
    {
     "id" : "以色列",
      "name" : "以色列",
      "image" : "images/country/07.png",
      "actions" : [],
      "children" : [{
                       "ref" : "data/jap/airport.js"
                    },
                    {
                       "ref" : "data/jap/train.js"
                    }]
    }

]
