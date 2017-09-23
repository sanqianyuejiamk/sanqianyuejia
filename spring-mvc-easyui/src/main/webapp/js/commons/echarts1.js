/**
 * Created by wang on 15-1-12.
 */

function Echarts(location, id,title,subtitle) {
	// 基于准备好的dom，初始化echarts图表
	var container = echarts.init(document.getElementById(id));
	// 采用ajax异步请求数据
	$.ajax({
		type : 'post',
		url : basePath + location,
		dataType : 'json',
		success : function(result) {
			console.log("line 图像");
			console.log(result);
			if (result) {
				container.hideLoading();
				container.setOption({
					title : {
						text : title,
						subtext : subtitle,
						x: "center"
					},
					tooltip : {
						trigger : 'axis'
					},
					legend : {
						x:'right',
						data : result.legend
					},
					toolbox : {
						show : false,
						feature : {
							mark : {
								show : true
							},
							dataView : {
								show : true,
								readOnly : false
							},
							magicType : {
								show : true,
								type : [ 'line', 'bar' ]
							},
							restore : {
								show : true
							},
							saveAsImage : {
								show : true
							}
						}
					},
					dataZoom : {
						show : true,
						realtime : true,
						start : result.start,
						end : result.end
					},
					calculable : false,
					xAxis : [ {
						name: result.xAxisName,
						type : 'category',
						boundaryGap : true,
						data : function(){
							var data = [];
							for(var i = 0; i < result.axis.length; i++)
							{
								var dateFull = result.axis[i];
								var date = dateFull.split('-')[1] + '-' + dateFull.split('-')[2];
								data.push(date);
							}
							return data;
						}()
					} ],
					yAxis : [ {
						name: result.yAxisName,
						type : 'value',
						axisLabel : {
							formatter : '{value} '
						}
					} ],
					series : function(){
						var series = [];
						for(var i = 0; i < result.series.length; i++)
						{
							var item = {
									name : result.series[i].name,
									type : result.series[i].type,
									data : result.series[i].data,
									symbol : 'none',
									markLine : null,
									markPoint : {
										data : [
									        {type:'max',name:'最大值'},
									        {type:'min',name:'最小值'}
								        ]
									}	
							};
							series.push(item);
						}
						return series;
					}()
				});
				container.setSeries(result.series);
			}
		},
		error : function(errMsg) {
			console.error("加载数据失败")
		}
	});
}
