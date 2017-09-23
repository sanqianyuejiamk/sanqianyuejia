$package('sys');
var sys = {
	/* Json 工具类 */
	isJson : function(str) {
		var obj = null;
		try {
			obj = sys.paserJson(str);
		} catch (e) {
			return false;
		}
		var result = typeof (obj) == "object"
				&& Object.prototype.toString.call(obj).toLowerCase() == "[object object]"
				&& !obj.length;
		return result;
	},
	paserJson : function(str) {
		return eval("(" + str + ")");
	},
	infoAuto : function(msg, timeout) {
		$.messager.show({
			title : '提示',
			msg : msg,
			showType : 'show',
			timeout : timeout || 3000
		});
	},
	info : function(msg, callback) {
		$.messager.alert('消息', msg, 'info', callback);
	},
	infoNoRowSelect : function(callback) {
		sys.info('请选择要操作的记录', callback);
	},
	error : function(msg, callback) {
		$.messager.alert('错误', msg, 'error', callback);
	},
	warn : function(msg, callback) {
		$.messager.alert('警告', msg, 'warning', callback);
	},
	/* 弹出框 */
	alert : function(title, msg, icon, callback) {
		$.messager.alert(title, msg, icon, callback);
	},
	/* 弹出框 */
	confirm : function(title, msg, callback) {
		$.messager.confirm(title, msg, callback);
	},
	progress : function(title, msg) {
		var win = $.messager.progress({
			title : title || '请稍等',
			msg : msg || '正在加载数据...'
		});
	},
	closeProgress : function() {
		$.messager.progress('close');
	},
	/* 重新登录页面 */
	toLogin : function() {
		window.top.location = urls['msUrl'] + "/login.action";
	},
	checkLogin : function(data) {// 检查是否登录超时
		if (data.logoutFlag) {
			sys.closeProgress();
			sys.alert('提示', "登录超时,点击确定重新登录.", 'error', sys.toLogin);
			return false;
		}
		return true;
	},
	ajaxSubmit : function(form, option) {
		form.ajaxSubmit(option);
	},
	ajaxJson : function(url, option, callback) {
		$.ajax(url, {
			type : 'post',
			dataType : 'json',
			data : option,
			async:false,
			success : function(data) {
				// 坚持登录
				if (!sys.checkLogin(data)) {
					return false;
				}
				if ($.isFunction(callback)) {
					callback(data);
				}
			},
			error : function(response, textStatus, errorThrown) {
				try {
					sys.closeProgress();
					var data = $.parseJSON(response.responseText);
					// 检查登录
					if (!sys.checkLogin(data)) 
					{
						return false;
					} 
					else 
					{
						sys.alert('提示', data.msg || "3请求出现异常,请联系管理员", 'error');
					}
				} catch (e) {
					sys.alert('提示', "4请求出现异常,请联系管理员.", 'error');
				}
			},
			complete : function() {

			}
		});
	},
	submitForm : function(form, callback, dataType) {
		var option = {
			type : 'post',
			dataType : dataType || 'json',
			async:false,
			success : function(data) {
				if ($.isFunction(callback)) {
					callback(data);
				}
			},
			error : function(response, textStatus, errorThrown) {
				try {
					sys.closeProgress();
					var data = $.parseJSON(response.responseText);
					// 检查登录
					if (!sys.checkLogin(data)) {
						return false;
					} else {
						sys.alert('提示', data.msg || "1请求出现异常,请联系管理员", 'error');
					}
				} catch (e) {
					sys.alert('提示', "2请求出现异常,请联系管理员.", 'error');
				}
			},
			complete : function() {

			}
		}
		sys.ajaxSubmit(form, option);
	},
	saveForm : function(form, callback) {
		if (form.form('validate')) {
			sys.progress('请稍等', '正在保存数据...');
			// ajax提交form
			sys.submitForm(form, function(data) {
				sys.closeProgress();
				if (true) {//data.success
					if (callback) {
						callback(data);
					} else {
						sys.alert('提示', '保存成功.', 'info');
					}
				} else {
					sys.alert('提示', data.msg, 'error');
				}
			});
		}
	},
	/**
	 * 
	 * @param {}
	 *            url
	 * @param {}
	 *            option {id:''}
	 */
	getById : function(url, option, callback) {
		sys.progress();
		sys.ajaxJson(url, option, function(data) {
			sys.closeProgress();
			if (data.success) {
				if (callback) {
					callback(data);
				}
			} else {
				sys.alert('提示', data.msg, 'error');
			}
		});
	},
	deleteForm : function(url, option, callback) {
		sys.progress();
		sys.ajaxJson(url, option, function(data) {
			sys.closeProgress();
			if (data.success) {
				if (callback) {
					callback(data);
				}
			} else {
				sys.alert('提示', data.msg, 'error');
			}
		});
	}
}

/**
 * 增加formatString功能
 * 
 * 使用方法：formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * 
 * @returns 格式化后的字符串
 */
formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};
/* 将2000-01-00 10:00:00 转成 2000-01-00 */
formatDate = function(value) {
	if (value != null) {
		var str = value.toString();
		if (str) {
			if (str.length > 10) {
				return str.substring(0, 10);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
/* 将2000-01-00 10:00:00 转成 2000-01-00 10:00*/
formatHour = function(value) {
	if (value != null) {
		var str = value.toString();
		if (str) {
			if (str.length > 16) {
				return str.substring(0, 16);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
/* 将2000-01-00 10:00:00 转成  10:00 */
formatTime = function(value){
	if (value != null) {
		var str = value.toString();
		if (str) {
			if (str.length > 10) {
				return str.substr(11,5);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
/* 表单转成json数据 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

/**
 * 初始化Grid按钮 按钮控制
 */
initTbar = function(Grid, tbars, url) {
	var _url = urls['msUrl'] + '/getActionBtn.do';
	var data = {
		'url' : url
	};
	// 查询页面授权的btnType
	sys.ajaxJson(_url, data, function(data) {
		if (data.success) {
			if (data.allType) {
				Grid.treegrid({
					'toolbar' : tbars
				});
			} else {
				var newBars = [];
				jQuery.inArray("John", data.types);
				for ( var i = 0; i < tbars.length; i++) {
					var bar = tbars[i];
					// btnType 为空显示
					if (!bar.btnType) {
						newBars.push(bar);
					} else {
						// 判断btnType是否存在,存在则显示
						if ($.inArray(bar.btnType, data.types) >= 0) {
							newBars.push(bar);
						}
					}
				}
				if (newBars.length > 0) {
					Grid.treegrid({
						'toolbar' : newBars
					});
				}
			}
		}
	});
}

/* easyui datagrid 添加和删除按钮方法 */
$.extend($.fn.datagrid.methods,
				{addToolbarItem : function(jq, items) {
						return jq.each(function() {
									var toolbar = $(this).parent().prev(
											"div.datagrid-toolbar");
									for ( var i = 0; i < items.length; i++) {
										
										var item = items[i];
										console.log(item);
										if (item === "-") {
											toolbar.append('<div class="datagrid-btn-separator"></div>');
										} else {
											var btn = $("<a href=\"javascript:void(0)\"></a>");
											btn[0].onclick = eval(item.handler
													|| function() {
													});
											btn.css("float", "left").appendTo(
													toolbar).linkbutton(
													$.extend({}, item, {
														plain : true
													}));
										}
									}
									toolbar = null;
								});
					},
					removeToolbarItem : function(jq, param) {
						return jq
								.each(function() {
									var btns = $(this).parent().prev(
											"div.datagrid-toolbar").children(
											"a");
									var cbtn = null;
									if (typeof param == "number") {
										cbtn = btns.eq(param);
									} else if (typeof param == "string") {
										var text = null;
										btns
												.each(function() {
													text = $(this).data().linkbutton.options.text;
													if (text == param) {
														cbtn = $(this);
														text = null;
														return;
													}
												});
									}
									if (cbtn) {
										var prev = cbtn.prev()[0];
										var next = cbtn.next()[0];
										if (prev
												&& next
												&& prev.nodeName == "DIV"
												&& prev.nodeName == next.nodeName) {
											$(prev).remove();
										} else if (next
												&& next.nodeName == "DIV") {
											$(next).remove();
										} else if (prev
												&& prev.nodeName == "DIV") {
											$(prev).remove();
										}
										cbtn.remove();
										cbtn = null;
									}
								});
					},
					fixRownumber : function (jq) {  
				        return jq.each(function () {  
				            var panel = $(this).datagrid("getPanel");  
				            var clone = $(".datagrid-cell-rownumber", panel).last().clone();  
				            clone.css({  
				                "position" : "absolute",  
				                left : -1000  
				            }).appendTo("body");  
				            var width = clone.width("auto").width();  
				            if (width > 25) {  
				                //多加5个像素,保持一点边距  
				                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);  
				                $(this).datagrid("resize");  
				                //一些清理工作  
				                clone.remove();  
				                clone = null;  
				            } else {  
				                //还原成默认状态  
				                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");  
				            }  
				        });  
				    }
				});
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "/u65e5",
		"1" : "/u4e00",
		"2" : "/u4e8c",
		"3" : "/u4e09",
		"4" : "/u56db",
		"5" : "/u4e94",
		"6" : "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
								: "/u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

function getNextDay(nDate) {
	var date = new Date(Date.parse(nDate.replace(/-/g, "/")));
	if (date.getTime() > 0) {
		date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
		return date.pattern("yyyy-MM-dd HH:mm:ss");
	} else {
		return "";
	}
}
function getYesterDay() {
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}

function getYesterDayMorning() {
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 00:00:00");
}

function getYesterDayEnd(){
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 23:59:59");
}

function getNowDayMorning() {
	var date = new Date();
	date.setTime(date.getTime());
	return date.pattern("yyyy-MM-dd 00:00:00");
}

function getNowDayNow() {
	var date = new Date();
	date.setTime(date.getTime());
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}

function getNextDayMorning() {
	var date = new Date();
	date.setTime(date.getTime()+1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 00:00:00");
}
// 开始时间大于当前时间，截止时间大于开始时间
function checkDate(startDate, endDate) {
	var date = getNowDayMorning();
	if (startDate < date) {
		$.messager.show({
			title : '提示',
			msg : "请输入合理的时间"
		});
		return false;
	}
	if (endDate < startDate) {
		$.messager.show({
			title : '提示',
			msg : "请输入合理的时间"
		});
		return false;
	}
	return true;
}

//截止时间大于开始时间
function compareDate(startDate, endDate) {
	if (endDate <= startDate) {
		$.messager.show({
			title : '提示',
			msg : "开始时间必须小于结束时间"
		});
		return false;
	}
	return true;
}

function getBeforeDaysMorning(days) {
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000*Number(days));
	//date.setTime(date.getTime()+1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 00:00:00");
}

function getEndOfDay(){
	var date = new Date();
	date.setTime(date.getTime());
	return date.pattern("yyyy-MM-dd 23:59:59");
}

function formatDateUntilHour(date){
	
    var y = date.getFullYear();  	
    var m = (date.getMonth()+1)>=10?date.getMonth()+1:'0'+(date.getMonth()+1); 
    var d = date.getDate()>=10?date.getDate():'0'+date.getDate();
	var h = date.getHours()>=10?date.getHours():'0'+date.getHours();
    return y + "-" + m + "-" + d + " " + h +":00:00" ;
}



/**
 * 时间控件格式化
 * @param date
 * @returns {String}
 */
function dayFormatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

function dayParser(s){
	if (!s) return new Date();
		var ss = (s.split('-'));
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
	return new Date();
	}
}
function monthFormatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	return y+'-'+(m<10?('0'+m):m);
}
function monthParser(s){
	if (!s) return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	if (!isNaN(y) && !isNaN(m)){
		return new Date(y,m-1);
	} else {
		return new Date();
	}
}
function yearFormatter(date){
	var y = date.getFullYear();
	return y;
}
function yearParser(s){
	if (!s) return new Date();
	var y = s;
	var m = 1;
	var d = 1;
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}


/**
 * 判断两个时间是否跨月
 * @param timeFrom
 * @param timeTo
 * @returns {Boolean}
 */
function extendToNextMonth(timeFrom, timeTo){
	var mf = timeFrom.split("-")[1];
	var mt = timeTo.split("-")[1];
	if(mf != mt){
		$.messager.show({
			title : '提示',
			msg : "查询时间不能跨月！"
		});
		return true;
	}
    return false;
}

/**
 * 判断时间是2个月内还是2个月前（2个月内返回true，2个月前返回false）
 * 
 * @param date
 * @returns {Boolean}
 */
function twiceMonth(date,n) {
	var now = new Date();
	var time = new Date(Date.parse(date.replace(/-/g, "/")));
	time.setMonth(time.getMonth()+n);
	if(time >= now) {
		//2个月内
		return true;
	} else {
		//2个月前
		return false;
	}
}

/**
 * 判断两个时间是否是同一天
 * @param timeFrom
 * @param timeTo
 * @returns {Boolean}
 */
function extendToSameDay(timeFrom, timeTo){
	var yf = timeFrom.split("-")[0];
	var yt = timeTo.split("-")[0];
	var mf = timeFrom.split("-")[1];
	var mt = timeTo.split("-")[1];
	var df = timeFrom.split("-")[2].substring(0,2);
	var dt = timeTo.split("-")[2].substring(0,2);
	
	var tf = timeFrom.split(" ")[1];
	var hf = tf.split(":")[0];
	var mif = tf.split(":")[1];
	var sf = tf.split(":")[2];
	
	var tt = timeTo.split(" ")[1];
	var ht = tt.split(":")[0];
	var mit = tt.split(":")[1];
	var st = tt.split(":")[2];
	
	if(!(yf == yt && mf == mt && df == dt
			|| yf == yt && mf == mt && dt-df == 1 
					&& hf == ht && mif == mit && sf == st
			|| yf == yt && mt - mf == 1 && dt == 1 
					&& hf == ht && mif == mit && sf == st
			|| yt - yf == 1 && mf == 12 && mt ==1 && df == 31 && dt == 1
					&& hf == ht && mif == mit && sf == st)){
		$.messager.show({
			title : '提示',
			msg : "查询时间不是同一天！"
		});
		return true;
	}
    return false;
}

/**
 * 精确到2位小数
 * @param value
 */
function decimalFormat(value)
{
	var f = parseFloat(value);
    if (isNaN(f)) {  
        return "";  
    }  
    var f = Math.round(value*100)/100;  
    var s = f.toString();  
    var rs = s.indexOf('.');  
    if (rs < 0) {  
        rs = s.length;  
        s += '.';  
    }  
    while (s.length <= rs + 2) {  
        s += '0';  
    } 
    return s;
}

/**
 * 与当前时间之间的时间差（精确到秒）
 * @param time
 */
function timeDifForSecond(time)
{
	//当前时间
	var now = new Date();
	//
	var passTime = new Date(Date.parse(time.replace(/-/g, "/")));
	//相差的毫秒数
	var dif = now.getTime() - passTime.getTime();
	//var difForSecond = dif/1000;
	//计算天数
	var days=Math.floor(dif/(24*3600*1000));
	//计算小时数
	//计算天数后剩余的毫秒数
	var leave1=dif%(24*3600*1000);    
	var hours=Math.floor(leave1/(3600*1000));
	//计算分钟数
	//计算小时数后剩余的毫秒数
	var leave2=leave1%(3600*1000);        
	var minutes=Math.floor(leave2/(60*1000));
	//计算秒数
	//计算分钟数后剩余的毫秒数
	var leave3=leave2%(60*1000);      
	var seconds=Math.round(leave3/1000);
	//var difForSecond = days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
	var difForSecond = "";
	if(0 != days)
	{
		difForSecond += days + "天";
	}
	if((0 != days && 0 != minutes && 0 == hours) || 0 != hours)
	{
		difForSecond += hours + "小时";
	}
	if((0 != hours && 0 != seconds && 0 == minutes) || 0 != minutes)
	{
		difForSecond += minutes + "分";
	}
	difForSecond += seconds + "秒";
	return difForSecond;
}

/**
 * 根据分钟返回xx天xx小时xx分钟
 * @param _minute
 * @returns {String}
 */
function getTimeByMinute(_minute)
{
	var returnTime = "";
	if(null != _minute)
	{
		var days = Math.floor(_minute/(60*24));
		var hours = Math.floor(_minute%(60*24)/60);
		var minutes = Math.floor(_minute%(24*60)%60);
		if(0 != days)
		{
			returnTime += days + "天";
		}
		if((0 != days && 0 != minutes && 0 == hours) || 0 != hours)
		{
			returnTime += hours + "小时";
		}
		returnTime += minutes + "分";			
	}
	return returnTime;
}

/**
 * 根据秒返回xx天xx小时xx分钟xx秒
 * @param _second
 * @returns {String}
 */
function getTimeBySecond(_second)
{
	var returnTime = "";
	if(null != _second)
	{
		var days = Math.floor(_second/(3600*24));
		var hours = Math.floor(_second%(3600*24)/3600);
		var minutes = Math.floor(_second%(24*3600)%3600/60);
		var second = Math.floor(_second%(24*3600)%3600%60);
		if(0 != days)
		{
			returnTime += days + "天";
		}
		if((0 != days && 0 != minutes && 0 == hours) || 0 != hours)
		{
			returnTime += hours + "小时";
		}
		if((0 != hours && 0 != second && 0 == minutes) || 0 != minutes)
		{
			returnTime += minutes + "分";			
		}
		returnTime += second + "秒";
	}
	return returnTime;
}
