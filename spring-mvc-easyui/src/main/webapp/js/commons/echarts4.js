/**
 * 双纵轴，左侧一数据（温度），右侧一数据（电压）
 * 
 * @param location
 * @param id
 * @param title
 * @param subtitle
 */
function Echarts4(location, id, title, subtitle) {
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
						name : result.yAxisName.split(',')[0],
						position : 'left',
						type : 'value',
						axisLabel : {
							formatter : '{value} ',
							show : true,
							interval: 'auto'
						}
					},
					{
				        type : 'value',
				        name : result.yAxisName.split(',')[1],
				        /*splitNumber : 10,*/
				        axisLabel : {
				        	formatter: '{value} '
				        },
				        splitLine : {
			                show: false
			            }
					} ],
					series : [{
						name : result.series[0].name,
						type : 'line',
						data : result.series[0].data,
						symbol : 'none',
						markLine : null,
						markPoint : {
							data : [
						        {type:'max',name:'最大值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[0].name + '<br>' + '最大值：' + params.value;
							        		return tip;
							        	}
								}},
						        {type:'min',name:'最小值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[0].name + '<br>' + '最小值：' + params.value;
							        		return tip;
							        	}
									}}
					        ]
						}
					},
					{
						name : result.series[1].name,
						type : 'line',
						yAxisIndex : 1,
						data : result.series[1].data,
						symbol : 'none',
						markLine : null,
						markPoint : {
							data : [
						        {type:'max',name:'最大值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[1].name + '<br>' + '最大值：' + params.value;
							        		return tip;
							        	}
							        }
						        },
						        {type:'min',name:'最小值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[1].name + '<br>' + '最小值：' + params.value;
							        		return tip;
							        	}
									}
						        }
					        ]
						}
					}]
				});
				container.setSeries(result.series);
			}
		},
		error : function(errMsg) {
			console.error("加载数据失败")
		}
	});
}