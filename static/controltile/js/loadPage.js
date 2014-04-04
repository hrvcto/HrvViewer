$(document).ready(function() {
//获取数据
var clickTime =0;
function contentInit(obj) {
	$.ajax({
		type:'GET',
		url: obj.url,
		cache: true,
		dataType:'json',
		success: function (data) {
			var temp_html = "";
$.each(data,function(i,item) {
	temp_html += "<li"+(item.id?" id=\""+item.id+"\"":"")+(item.actions? " data-actions=\'"+JSON.stringify(item.actions)+"\'" :"")+(item.children? " data-children=\'"+JSON.stringify(item.children)+"\'" :"")+">"+"<div class=\"zoomst\">"+(item.image?"<p><img src=\""+item.image+"\" alt=\""+item.name+"\"></p>":"")+"<p class=\"name\""+">"+"<b>"+item.name+"</b>"+"</p>"+"<i class=\"grayBg\"></i>"+"</div>"+"</li>";
})
$(".content .cf:last").append(temp_html)
}
})
}


function dms2deg(s) {
// Determine if south latitude or west longitude
var sw = /[sw]/i.test(s);
// Determine sign based on sw (south or west is -ve) 
var f = sw? -1 : 1;
// Get into numeric parts
var bits = s.match(/[\d.]+/g);
var result = 0;
// Convert to decimal degrees
for (var i=0, iLen=bits.length; i<iLen; i++) {
	result += bits[i]/f;
	f *= 60;
}
return result;
}


$("#buttonList").before("<div class=\"content\">"+"<ul class=\"cf\">");
contentInit({"url":"data/cards_def.js","container":"#buttonList","bgFlag":true});

//click
$(".content li").live("click",function() {
	var dataString = $(this).attr("data-actions");
	var childString = $(this).attr("data-children");

	var child = [];
	var data = [];
	child = $.parseJSON(childString);
	data = $.parseJSON(dataString);

	for(var i=0;i<data.length;i++) {   
		if(data[i].args.hasOwnProperty('func_name') && data[i].args.func_name =="flyTo") {

			data[i].args.position.longitude = formatLongitude(data[i].args.position.longitude.toString());
			data[i].args.position.latitude  = formatLongitude(data[i].args.position.latitude.toString());
		}
		WebSocketHelper.sendMessage(JSON.stringify(data[i]));
	};
	if(child.length>0) {
$(this).parent().parent(".content").hide();
$("#buttonList").before("<div class=\"content child\">"+"<ul class=\"cf\">");
$(".content :last").hide();
for(var i = 0;i<child.length;i++) {
	contentInit({"url":child[i].ref,"container":".child ul","bgFlag":true});
}
$(".content :last").fadeIn('1000');
clickTime++;
}

});



//返回上级
$("#buttonList .backBtn").click(function(){	
	if(clickTime >= 1)
	{
		$(".content :last").fadeOut('300');
		$(".content :last").remove();
		$(".content :last").fadeIn('300');
		clickTime--;

	}
})


//关闭
$("#buttonList .closeBtn").click(function(){

	window.opener=null;
	window.open('','_self');
	window.close();

})

//---------------dms format changTo d-----------//

function formatDegreeString(text) {

	var ret = "";
	var tmpArray = text.split(".")

	var firstPartString = tmpArray[0]; 
	var sencondPartString = tmpArray[1];
	ret += Math.abs(parseFloat(firstPartString));

	if (!sencondPartString || sencondPartString.length <= 0) {
		return ret;
	};
	ret += " ";
	ret += sencondPartString.substr(0,2);
	ret += "' ";

	if (sencondPartString.length <= 2) {
		return ret;
	};

	ret += sencondPartString.substr(2,2);

	if (6 == sencondPartString.length) {
		ret += ".";
		ret += sencondPartString.substr(4,2);
	}
	ret += "\"";
	return ret;
}


function formatLongitude(longdata)
{
	var longParsedString = "";
	if (parseFloat(longdata) >= 0.0) {
		longParsedString += "E ";
	} else {
		longParsedString += "W ";
	}

	longParsedString += formatDegreeString(longdata);
	var lont=dms2deg(longParsedString);
	return lont;
}

function formatLatitude(latdata)
{
	var latParsedString = "";
	if (parseFloat(latdata) >= 0.0) {
		latParsedString += "N ";
	} else {
		latParsedString += "S ";
	}
	latParsedString += formatDegreeString(latdata);
	var lat=dms2deg(latParsedString);
	return lat;
}

//--------------- search click-----------//

$("#search").click(function()
{
	var action = {};
	var longText = $("#longText").val()
	var lont = formatLongitude(longText);
	var latText = $("#latText").val()
	var lat = formatLongitude(latText);
	var height = $("#heightText").val();
	action = {
		"func_name": "flyTo",
		"args": {
			"position": {
				"longitude": lont,
				"latitude": lat,
				"height": height
			},
			"duration":0,
			"rotation":0
		}
	};


	WebSocketHelper.sendMessage(JSON.stringify(action));
});


//----------------------mouse animation------------------------//

$(".child ul li").live("mouseenter",(function() {
	$(this).find(".zoomst").addClass('zoomIn');
}))

$(".child ul li").live("mouseleave",(function() {
	$(this).find(".zoomst").removeClass('zoomIn');
}))
})