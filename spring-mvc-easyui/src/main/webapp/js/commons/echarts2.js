/**
 * 双纵轴，左侧两数据（是否充电中、电池电压），右侧两数据（充电电压、温度）
 * 
 * @param location
 * @param id
 * @param title
 * @param subtitle
 */
function Echarts2(location, id, title, subtitle) {
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

				/*var x = (result.axis + '').split(',');
				var xs = [];
				for(var i = 0; i < x.length; i++)
				{
					var x1 = x[i];
					var x2 = x1.split(':')[0];
					var x3 = x2.split('-')[1] + "-" + x2.split('-')[2];
					xs[i] = x3;
				}*/
				//alert(xs);
				
				container.hideLoading();
				container.setOption({
					title : {
						text : title,
						subtext : subtitle,
						x: "center"
					},
					tooltip : {
						trigger : 'axis'/*,
						formatter : '{b}<br/>{a0} : {c0}<br/>{a1} : {c1}<br/>{a2} : {c2}'*/
						/*,formatter: function(params) {  
			                var res = params.name+'<br/>';  
			                var myseries = result.series;  
			                for (var i = 0; i < myseries.length; i++) {  
			                    for(var j=0;j<myseries[i].data.length;j++){  
			                        if(myseries[i].data[j].name==params.name){  
			                            res+=myseries[i].name +' : '+myseries[i].data[j].value+'</br>';  
			                        }  
			                    }  
			                }  
			                return res;  
			            }*/	
						/*,formatter: function() {  
			                var myseries = result.series; 
			                for(var i = 0; i < result.axis.length; i++){
			                	var res = result.axis[i]+'<br/>';  
			                	for (var j = 0; j < myseries.length; j++) {  
			                		res+=myseries[j].name +' : '+myseries[j].data[i]+'</br>';  
			                	}
			                	break;
			                }
			                return res;  
			            }*/
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
						/*name : result.yAxisName.split(',')[0],*/
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
				        /*name : result.yAxisName.split(',')[1],*/
				        axisLabel : {
				        	formatter : '{value} '
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
									}
						        },
						        {type:'min',name:'最小值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[0].name + '<br>' + '最小值：' + params.value;
							        		return tip;
							        	}
									}
						        }
					        ]
						}
					},
					{
						name : result.series[1].name,
						type : 'line',
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
					},
					{
						name : result.series[2].name,
						type : 'line',
						yAxisIndex : 1,
						data : result.series[2].data,
						symbol : 'none',
						markLine : null,
						markPoint : {
							data : [
						        {type:'max',name:'最大值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[2].name + '<br>' + '最大值：' + params.value;
							        		return tip;
							        	}
									}
						        },
						        {type:'min',name:'最小值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[2].name + '<br>' + '最小值：' + params.value;
							        		return tip;
							        	}
									}
						        }
					        ]
						}
					},
					{
						name : result.series[3].name,
						type : 'line',
						yAxisIndex : 1,
						data : result.series[3].data,
						symbol : 'none',
						markLine : null,
						markPoint : {
							data : [
						        {type:'max',name:'最大值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[3].name + '<br>' + '最大值：' + params.value;
							        		return tip;
							        	}
									}
						        },
						        {type:'min',name:'最小值',
							        tooltip : {
							        	trigger : 'item',
							        	formatter : function(params){
							        		var tip = result.series[3].name + '<br>' + '最小值：' + params.value;
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