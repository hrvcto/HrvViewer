2014.4.4 created by lzc
/-----------1--------------/
api.creatEllipse.js
api.creatEllipsold.js
api.creatPolygon.js
api.ployLine.js
api.flyTo.js
api.creatRing.js
api.addLable.js
api.flyToExtent.js
api.addBillboard.js
上诉文件增加了经纬度转换功能。

说明：有关经纬度参数命令中，如果为"longitude":121.303012，表示为点度。如果以字符串形式"longitude":"121.303012"，则表示度分秒形式。



/------------2------------/
api.js: 

1.所有commandObject.name 改为 ommandObject.func_name；
说明：参数中的"name":"function name",为了更直观28所要求将"name"改为"func_name"；

2.将if(commandObject.name&&commandObject.args) 改为
if(commandObject.func_name）；
说明：由于有的参数命令中没有args，该段会引起报错，所以删除commandObject.args。


/----------3-------------/


