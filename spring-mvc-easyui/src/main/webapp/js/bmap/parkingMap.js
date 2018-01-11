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


var citCode = '111';
var cityLongitude  = '11';
var cityLatitude = '11';

$(function(){
    // 地图初始化
    initMap();
    //停车场初始化
    // var cityCode = 0;
    // var regionCode = 0;
    // var parkId = "";
    // initPark(cityCode, regionCode, parkId);
});


function initMap()
{
    var map = new BMap.Map("parkingMap");
    var param = $('#searchForm').serializeObject();
    var cityCode = param.cityCode;
    var regionCode = param.regionCode;
    var parkId = param.parkId;
    if(cityCode == "" || (cityCode != "" && citCode == cityCode))
    {
        cityCenterLon = cityLongitude;
        cityCenterLat = cityLatitude;
        map.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
    }
    // else if(cityCode != "" && citCode != cityCode && regionCode == "")
    // {
    //     var cityName = $('#cityCode').combobox('getText');
    //     if(cityName.length > 0)
    //     {
    //         map.centerAndZoom(cityName,mapLeave);
    //     }
    // }
    // else if(regionCode != "")
    // {
    //     var regionName = $('#regionCode').combobox('getText');
    //     if(regionName.length > 0)
    //     {
    //         map.centerAndZoom(regionName,mapLeave);
    //     }
    // }

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