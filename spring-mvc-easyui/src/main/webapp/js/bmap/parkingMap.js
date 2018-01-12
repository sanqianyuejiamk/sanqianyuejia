//全局经度
var globLon = "";
// 全局纬度
var globLat = "";
// 全局地图对象
var globMap = "";
// 全局覆盖物对象
var globMarker = "";
// 全局Point对象
var globPoint = "";
// 默认缩放级别
var mapLeave = 16;
// 自动刷新的任务ID
var timeoutId = "";
// 城市中心经度
var cityCenterLon = "";
// 城市中心纬度
var cityCenterLat = "";
var internalTime = 60000;
var centerFlag = true;
var flag = true;

var cityCod = 3301;
var cityLon = 100;
var cityLat = 100;


$(function(){
    // 地图初始化
    initMap();
    //停车场初始化
    var cityCode = 0;
    var regionCode = 0;
    var parkId = "";
    initPark(cityCode, regionCode, parkId);
});

function initMap()
{
    var map = new BMap.Map("parkingMap");
    var param = $('#searchForm').serializeObject();
    var cityCode = param.cityCode;
    var regionCode = param.regionCode;
    var parkId = param.parkId;
    if(cityCode == "" || (cityCode != "" && 3301 == cityCode))
    {
        cityCenterLon = cityLongitude;
        cityCenterLat = cityLatitude;
        map.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
    }
    else if(cityCode != "" && 3301 != cityCode && regionCode == "")
    {
        var cityName = $('#cityCode').combobox('getText');
        if(cityName.length > 0)
        {
            map.centerAndZoom(cityName,mapLeave);
        }
    }
    else if(regionCode != "")
    {
        // var regionName = $('#regionCode').combobox('getText');
        // if(regionName.length > 0)
        // {
        //     map.centerAndZoom(regionName,mapLeave);
        // }
    }

    globMap = map;
    map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();

    var top_left_control = new BMap.ScaleControl({
        anchor : BMAP_ANCHOR_TOP_LEFT
    });// 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件

    map.addControl(top_left_control);
    map.addControl(top_left_navigation);
    $('#mainLayout').layout('collapse', 'east');
}

function initPark(cityCode, regionCode, parkId)
{
    $('#parkingList').tree({
        title : '停车点列表',
        height : 600,
        width : 200,
        url : '/bmap/getParkingList.do?cityCode=111&regionCode=222&parkId=333',
        checkbox : true,
        multiple : true,
        cascadeCheck : true,
        onCheck : function(node, checked)
        {
            $('#mainLayout').layout('collapse', 'east');
            createOverlay(node, checked);
            releaseRAM();
        },
        onSelect : function(node, checked)
        {
            centerFlag = true;
            selectFn(node, checked);
        },
        onLoadSuccess : function(node, data)
        {
            var param = $('#searchForm').serializeObject();
            var parkId = param.parkId;
            if(flag || parkId == "")
            {
                if(data.length != 0)
                {
                    for ( var i = 0; i < data.length; i++)
                    {
                        for ( var j = 0; j < data[i].children.length; j++)
                        {
                            createAllPark(data[i].children[j],cityCode,regionCode,parkId);
                            for(var k = 0; k < data[i].children[j].children.length; k++)
                            {
                                if(null != data[i].children[j].children[k].children)
                                {
                                    createAllPark(data[i].children[j].children[k],cityCode,regionCode,parkId);
                                }
                            }
                        }
                    }
                    flag = false;
                }
                else
                {
                    // var cityName = $('#cityCode').combobox('getText');
                    // if(cityName.length > 0)
                    // {
                    //     globMap.centerAndZoom(cityName,mapLeave);
                    // }
                }
            }
        }
    });
}

function selectFn(node, checked)
{
    if (node.attributes.type == 1)
    {
        globMap.clearOverlays();
        var longitude = node.attributes.longitude;
        var latitude = node.attributes.latitude;
        var myIcon = createIconForPark(node.attributes.idelBerthCount);
        var marker = new BMap.Marker(new BMap.Point(
            longitude, latitude), {
            icon : myIcon
        });

        if (centerFlag)
        {
            globMap.centerAndZoom(new BMap.Point(longitude, latitude),mapLeave);
            centerFlag = false;
        }

        var labelInfo = "<input type='hidden' id='parkId' value="
            + node.attributes.id + ">" + node.attributes.parkName;//node.text
        var label = new BMap.Label(labelInfo, {
            offset : new BMap.Size(20, -10)
        });
        marker.setLabel(label);
        globMap.addOverlay(marker);

        showParkDetail(marker);
    }
}

function releaseRAM()
{
    document.getElementById("parkingDetail").innerHTML = null;
}

function calcDis()
{
    var myDis = new BMapLib.DistanceTool(globMap);
    myDis.open();
}

//重置地图
function refreshMap()
{
    globMap.reset();
}

function createIconForPark(idelBerthCount)
{
    var myIcon = "";
    if (idelBerthCount == null || idelBerthCount == "")
    {
        myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/red/0.png",
            new BMap.Size(25, 25), {
                imageSize : new BMap.Size(25, 25)
            });
    }
    else if (idelBerthCount <= 10)
    {
        myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/red/" + idelBerthCount + ".png",
            new BMap.Size(25, 25), {
                imageSize : new BMap.Size(25, 25)
            });
    }
    else if (idelBerthCount > 10 && idelBerthCount <= 20)
    {
        myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/blue/" + idelBerthCount + ".png",
            new BMap.Size(25, 25), {
                imageSize : new BMap.Size(25, 25)
            });
    }
    else if (idelBerthCount > 20 && idelBerthCount<=99)
    {
        myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/green/" + idelBerthCount + ".png",
            new BMap.Size(25, 25), {
                imageSize : new BMap.Size(25, 25)
            });
    }
    else if(idelBerthCount >99)
    {
        myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/green/99.png",
            new BMap.Size(25, 25), {
                imageSize : new BMap.Size(25, 25)
            });
    }
    return myIcon
}

function createAllPark(data,cityCode,regionCode,parkId)
{
    var nodes = data.children;
    for ( var i = 0; i < nodes.length; i++)
    {
        var node = nodes[i];
        if (node.attributes.type == 1)
        {
            var longitude = node.attributes.longitude;
            var latitude = node.attributes.latitude;

            var myIcon = createIconForPark(node.attributes.idelBerthCount);
            var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
                icon : myIcon
            });

            if (centerFlag && 0 != cityCode && cityCode != 3301)
            {
                globMap.setCenter(new BMap.Point(longitude, latitude),mapLeave);
                centerFlag = false;
            }
            if(cityCode == citCode && parkId == "")
            {
                globMap.setCenter(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
            }
            if(parkId != "")
            {
                var checked;
                centerFlag = true;
                selectFn(node, checked);
            }
            if(cityCode != "" && 3301 != cityCode && regionCode == "")
            {
                // var cityName = $('#cityCode').combobox('getText');
                // if(cityName.length > 0)
                // {
                    globMap.centerAndZoom("杭州市",mapLeave);
                // }
            }
            else if(regionCode != "" && parkId == "")
            {
                // var regionName = $('#regionCode').combobox('getText');
                // if(regionName.length > 0)
                // {
                    globMap.centerAndZoom("杭州市",mapLeave);
                // }
            }

            var labelInfo = "<input type='hidden' id='parkId' value="
                + node.attributes.id + ">";
            var label = new BMap.Label(labelInfo, {
                offset : new BMap.Size(0, 0)
            });
            label.setStyle({
                color : "#fff",
                fontSize : "16px",
                backgroundColor : "0.05",
                border : "0",
                fontWeight : "bold"
            });
            marker.setLabel(label);

            marker.addEventListener("click", function(e) {
                showParkDetail(this);
            });
            marker.setTitle(node.attributes.parkName);
            globMap.addOverlay(marker);
        }
    }
}

function showParkDetail(e)
{
    var idValue;
    if(e != null)
    {
        var label = e.getLabel().content.toString();
        var start = label.lastIndexOf("=") + 1;
        var end = label.lastIndexOf(">");
        idValue = label.substring(start, end);
    }
    else
    {
        var param = $('#searchForm').serializeObject();
        idValue = param.parkId;
    }
    $.ajax({
        url : 'bmap/parkDetail.do',
        type : 'post',
        data : {
            parkId : idValue
        },
        success : function(result) {
            fillTheParkDetail(result);
            $('#queryParkId').val(idValue);
        }
    });
}

function fillTheParkDetail(result)
{
    $('#mainLayout').layout('expand', 'east');
    var parkingText = "<span>";
    var carList = result.carList;
    var berthList = result.berthList;
    var totalBerthCount = result.berthCount==null?"":result.berthCount;
    var idelBerthCount = result.idelBerthCount==null?"":result.idelBerthCount;
    var parkName = result.parkName == null?"":result.parkName;
    var address = result.address == null?"":result.address;

    parkingText += "停车点名称：<font color=red>" + parkName + "</font>";
    parkingText += "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：<font color=red>" + address + "</font>";
    parkingText += "<br>&nbsp;&nbsp;&nbsp;&nbsp;总泊位数：<font color=red>" + totalBerthCount + "</font>";
    parkingText += "<br>&nbsp;&nbsp;&nbsp;&nbsp;空泊位数：<font color=red>" + idelBerthCount + "</font>";
    parkingText += "</span><br>";
    showText = "<table>";
    showText = showText + "<tr><td colspan='2'>" + parkingText + "</td></tr>";
    showText = showText + "</table><table>";
    for(var i = 0; i < carList.length; i++)
    {
        if(i%2 == 0)
        {
            if(carList[i].arrivalTime != null)
            {
                showText = showText + "<tr style='height:80px;'><td style='width:135px;'><div style='text-align:center;'>" + createIconForBerth(carList[i])
                    + "<br>" + carList[i].berthCode
                    + "<br>" + carList[i].arrivalTime
                    +"</div></td>";
            }
            else
            {
                showText = showText + "<tr style='height:80px;'><td style='width:135px;'><div style='text-align:center;'>" + createIconForBerth(carList[i])
                    + "<br>" + carList[i].berthCode
                    +"</div></td>";
            }
        }
        if(i%2 == 1)
        {
            if(carList[i].arrivalTime != null)
            {
                showText = showText + "<td><div style='text-align:center;'>" + createIconForBerth(carList[i])
                    + "<br>" + carList[i].berthCode
                    + "<br>" + carList[i].arrivalTime
                    +"</div></td></tr>";
            }
            else
            {
                showText = showText + "<td><div style='text-align:center;'>" + createIconForBerth(carList[i])
                    + "<br>" + carList[i].berthCode
                    +"</div></td></tr>";
            }
        }
    }
    showText += "</table>";
    document.getElementById("parkingDetail").innerHTML = showText;
}

function createIconForBerth(obj)
{
    var myIcon = "";
    var picPath = "";
    if (obj.arrivalTime == null)
    {
        picPath = basePath + "/assets/images/park/empty.png";
        myIcon = "<img src='" + picPath + "'>";
    }
    else
    {
        picPath = basePath + "/assets/images/park/car_red.png";
        myIcon = "<img src='" + picPath + "' title='"
            + obj.parkName + "&#10;" + obj.berthCode + "&#10;"
            + obj.arrivalTime + "&#10;" + timeDifForSecond(obj.arrivalTime) + "'>"
    }
    return myIcon;
}

function createOverlay()
{
    var nodes = $('#parkingList').tree('getChecked');
    globMap.clearOverlays();
    var parkName = "";
    var parkCode = "";
    var totalBerthCount = 0;
    var idelBerthCount = 0;
    var parkingText = "";
    var showText;
    if(nodes.length == 0)
    {
        document.getElementById("parkingDetail").innerHTML = parkingText;
        return;
    }
    centerFlag = true;
    for ( var i = 0; i < nodes.length; i++)
    {
        var node = nodes[i];
        if (node.attributes.type == 1)
        {
            var longitude = node.attributes.longitude;
            var latitude = node.attributes.latitude;
            if (centerFlag)
            {
                globMap.centerAndZoom(new BMap.Point(longitude, latitude),
                    mapLeave);
                centerFlag = false;
            }
            var myIcon = createIconForPark(node.attributes.idelBerthCount);
            var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
                icon : myIcon
            });
            var labelInfo = "<input type='hidden' id='parkId' value="
                + node.attributes.id + ">" + node.text;
            var label = new BMap.Label(labelInfo, {
                offset : new BMap.Size(20, -10)
            });
            marker.setLabel(label);
            marker.addEventListener("click", function(e) {
                showParkDetail(this);
            });
            globMap.addOverlay(marker);
        }
    }
    if (centerFlag)
    {
        globMap.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat),mapLeave);
    }
}


/**
 * 某个城市、某个行政区下停车点信息统计
 */
function getSummerInfo(cityCode, regionCode)
{
    $.ajax({
        url : 'bmap/initData.do',
        type : 'post',
        data : {
            cityCode : cityCode,
            regionCode : regionCode
        },
        success : function(result){
            var parkCnt = result.parkCnt;
            var totalBerthCnt = result.totalBerthCnt;
            var idelBerthCnt = result.idelBerthCnt;
            var busiBerthCnt = result.busiBerthCnt;
            releaseRAM();

            var parkingText = "<span>";

            parkingText += "停车点总数：<font color=red>" + parkCnt + "</font>";
            parkingText += "<br>&nbsp;&nbsp;&nbsp;&nbsp;总泊位数：<font color=red>" + totalBerthCnt + "</font>";
            parkingText += "<br>&nbsp;&nbsp;&nbsp;&nbsp;空泊位数：<font color=red>" + idelBerthCnt + "</font>";
            parkingText += "<br>占用泊位数：<font color=red>" + busiBerthCnt + "</font>";
            parkingText += "</span><br>";
            showText = "<table>";
            showText = showText + "<tr><td colspan='2'>" + parkingText + "</td></tr>";
            showText = showText + "</table><table>";

            showText += "</table>";
            document.getElementById("parkingDetail").innerHTML = showText;
        }
    });
}

function searchPark()
{
    $('#mainLayout').layout('collapse', 'west');
    var param = $('#searchForm').serializeObject();
    var cityCode = param.cityCode;
    if("" == cityCode)
    {
        cityCode = 0;
    }
    var regionCode = param.regionCode;
    if("" == regionCode)
    {
        regionCode = 0;
    }
    var parkId = param.parkId;

//	initMap();
    flag = true;
    globMap.clearOverlays();
    initPark(cityCode, regionCode, parkId);
    releaseRAM();
    if("" == parkId && cityCode != 0)
    {
        getSummerInfo(cityCode, regionCode);
    }

//	searchOne();
}