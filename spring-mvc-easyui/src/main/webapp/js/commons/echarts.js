/**
 * Created by wang on 15-1-12.
 */

function Echarts(location,id){
    // 基于准备好的dom，初始化echarts图表
    var container = echarts.init(document.getElementById(id));
    //采用ajax异步请求数据
    $.ajax({
        type:'post',
        url:basePath +location,
        dataType:'json',
        success:function(result){
            console.log("line 图像");
            console.log(result);
            if(result){
                container.hideLoading();
                container.setOption({
                    title : {
                        text: '',
                        subtext: ''
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:result.legend
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : true,
                            data :result.axis
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value} '
                            }
                        }
                    ]
                });
                container.setSeries(result.series);
            }
        },
        error:function(errMsg){
            console.error("加载数据失败")
        }
    });
}


