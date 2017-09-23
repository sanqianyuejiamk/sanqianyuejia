var sy = sy || {};

/**
 * 更改easyui加载panel时的提示文字
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.panel.defaults, {
	loadingMessage : '加载中....'
});

/**
 * 更改easyui加载grid时的提示文字
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.datagrid.defaults, {
	loadMsg : '数据加载中....'
});

/**
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
$.extend($.fn.panel.defaults, {
	onBeforeDestroy : function() {
		var frame = $('iframe', this);
		try {
			if (frame.length > 0) {
				for (var i = 0; i < frame.length; i++) {
					frame[i].src = '';
					frame[i].contentWindow.document.write('');
					frame[i].contentWindow.close();
				}
				frame.remove();
				if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
					try {
						CollectGarbage();
					} catch (e) {
					}
				}
			}
		} catch (e) {
		}
	}
});

/**
 * 防止panel/window/dialog组件超出浏览器边界
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
sy.onMove = {
	onMove : function(left, top) {
		var l = left;
		var t = top;
		if (l < 1) {
			l = 1;
		}
		if (t < 1) {
			t = 1;
		}
		var width = parseInt($(this).parent().css('width')) + 14;
		var height = parseInt($(this).parent().css('height')) + 14;
		var right = l + width;
		var buttom = t + height;
		var browserWidth = $(window).width();
		var browserHeight = $(window).height();
		if (right > browserWidth) {
			l = browserWidth - width;
		}
		if (buttom > browserHeight) {
			t = browserHeight - height;
		}
		$(this).parent().css({/* 修正面板位置 */
			left : l,
			top : t
		});
	}
};
$.extend($.fn.dialog.defaults, sy.onMove);
$.extend($.fn.window.defaults, sy.onMove);
$.extend($.fn.panel.defaults, sy.onMove);

/**
 * 
 * 通用错误提示
 * 
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
sy.onLoadError = {
	onLoadError : function(XMLHttpRequest) {
		if (parent.$ && parent.$.messager) {
			parent.$.messager.progress('close');
			parent.$.messager.alert('错误', XMLHttpRequest.responseText);
		} else {
			$.messager.progress('close');
			$.messager.alert('错误', XMLHttpRequest.responseText);
		}
	}
};
$.extend($.fn.datagrid.defaults, sy.onLoadError);
$.extend($.fn.treegrid.defaults, sy.onLoadError);
$.extend($.fn.tree.defaults, sy.onLoadError);
$.extend($.fn.combogrid.defaults, sy.onLoadError);
$.extend($.fn.combobox.defaults, sy.onLoadError);
$.extend($.fn.form.defaults, sy.onLoadError);

/**
 * 扩展combobox在自动补全模式时，检查用户输入的字符是否存在于下拉框中，如果不存在则清空用户输入
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.combobox.defaults, {
	onShowPanel : function() {
		var _options = $(this).combobox('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _value = $(this).combobox('textbox').val();
			var _combobox = $(this);
			if (_value.length > 0) {
				$.post(_options.url, {
					q : _value
				}, function(result) {
					if (result && result.length > 0) {
						_combobox.combobox('loadData', result);
					}
				}, 'json');
			}
		}
	},
	onHidePanel : function() {
		var _options = $(this).combobox('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _data = $(this).combobox('getData');/* 下拉框所有选项 */
			var _value = $(this).combobox('getValue');/* 用户输入的值 */
			var _b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */
			for (var i = 0; i < _data.length; i++) {
				if (_data[i][_options.valueField] == _value) {
					_b = true;
				}
			}
			if (!_b) {/* 如果在下拉列表中没找到用户输入的字符 */
				$(this).combobox('setValue', '');
			}
		}
	}
});

/**
 * 扩展combogrid在自动补全模式时，检查用户输入的字符是否存在于下拉框中，如果不存在则清空用户输入
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.combogrid.defaults, {
	onShowPanel : function() {
		var _options = $(this).combogrid('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _value = $(this).combogrid('textbox').val();
			if (_value.length > 0) {
				$(this).combogrid('grid').datagrid("load", {
					q : _value
				});
			}
		}
	},
	onHidePanel : function() {
		var _options = $(this).combogrid('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _data = $(this).combogrid('grid').datagrid('getData').rows;/* 下拉框所有选项 */
			var _value = $(this).combogrid('getValue');/* 用户输入的值 */
			var _b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */
			for (var i = 0; i < _data.length; i++) {
				if (_data[i][_options.idField] == _value) {
					_b = true;
				}
			}
			if (!_b) {/* 如果在下拉列表中没找到用户输入的字符 */
				$(this).combogrid('setValue', '');
			}
		}
	}
});

/**
 * 扩展validatebox，添加新的验证功能
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.validatebox.defaults.rules, {
    minLength : { // 判断最小长度
        validator : function(value, param) {
            return value.length >= param[0];
        },
        message : "最少输入 {0} 个字符。"
    },
    length:{validator:function(value,param){
        var len=$.trim(value).length;
            return len>=param[0]&&len<=param[1];
        },
            message:"输入内容长度必须介于{0}和{1}之间."
        },
    phone : {// 验证电话号码
        validator : function(value) {
            return /^(((d{2,3}))|(d{3}-))?((0d{2,3})|0d{2,3}-)?[1-9]d{6,7}(-d{1,4})?$/i.test(value);
        },
        message : "格式不正确,请使用下面格式:020-88888888"
    },
    mobile : {// 验证手机号码
        validator : function(value) {
        	return /^1[3|4|5|8|7][0-9]\d{8}$/i.test(value);
            //return /^1[3|4|5|8|7][0-9]\d{4,8}$/i.test(value);
        },
        message : "手机号码格式不正确"
    },
    idcard : {// 验证身份证
        validator : function(value) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        },
        message : "身份证号码格式不正确"
    },
    intOrFloat : {// 验证整数或小数
        validator : function(value) {
            return /^d+(.d+)?$/i.test(value);
        },
        message : "请输入数字，并确保格式正确"
    },
    currency : {// 验证货币
        validator : function(value) {
            return /^d+(.d+)?$/i.test(value);
        },
        message : "货币格式不正确"
    },
    qq : {// 验证QQ,从10000开始
        validator : function(value) {
            return /^[1-9]d{4,9}$/i.test(value);
        },
        message : "QQ号码格式不正确"
    },
    integer : {// 验证整数
        validator : function(value) {
            return /^[+]?[0-9]+d*$/i.test(value);
        },
        message : "请输入整数数字"
    },
    chinese : {// 验证中文
        validator : function(value) {
            return /^[\u4e00-\u9fa5]+$/i.test(value);
        },
        message : "请输入中文"
    },
    english : {// 验证英语
        validator : function(value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message : "请输入英文"
    },
    unnormal : {// 验证是否包含空格和非法字符
        validator : function(value) {
            return  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/i.test(value);
        },
        message : "输入值不能为空和包含其他非法字符"
    },
    username : {// 验证用户名
        validator : function(value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message : "用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）"
    },
    wordornum : {// 验证英文、数字、符合
        validator : function(value) {
            return /^[A-Za-z0-9]+$/i.test(value);
        },
        message : "只能输入字母或数字"
    },
    faxno : {// 验证传真
        validator : function(value) {
//            return /^[+]{0,1}(d){1,3}[ ]?([-]?((d)|[ ]){1,12})+$/i.test(value);
            return /^(((d{2,3}))|(d{3}-))?((0d{2,3})|0d{2,3}-)?[1-9]d{6,7}(-d{1,4})?$/i.test(value);
        },
        message : "传真号码不正确"
    },
    zip : {// 验证邮政编码
        validator : function(value) {
            return /^[1-9]d{5}$/i.test(value);
        },
        message : "邮政编码格式不正确"
    },
    ip : {// 验证IP地址
        validator : function(value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message : "IP地址格式不正确"
    },
    word: {
    	/*
    	 * 用例：
    	 * 只验证中英文：validType: 'word' 
    	 * 限制最大长度：validType: 'word(10)'
    	 * 限制长度范围：validType: 'word[1, 10]'
    	 */
        validator : function(value, lengths) {
     	   if($.isNumeric(lengths) && value.length > lengths) {
     		   this.message = '长度不能大于' + lengths;
     		   return false;
     	   } else if($.isArray(lengths) && lengths.length == 2) {
     		   if(value.length < lengths[0] || value.length > lengths[1]) {
         		   this.message = '长度应在' + lengths[0] + '到' + lengths[1] + '之间';
         		   return false;
         	   }
     	   }
            return  /^[\u4e00-\u9fa5a-zA-Z]+$/i.test(value);       
         },
         message : "只能输入中文或英文"
    },
    title : {// 验证姓名，可以是中文或英文
        validator : function(value) {
           return  /^[\u4e00-\u9fa5a-zA-Z]+$/i.test(value);       
        },
        message : "只能为中文或英文"
    },
    name : {
    	/*
    	 * 用例：
    	 * 只验证中英文：validType: 'name' 
    	 * 限制最大长度：validType: 'name(10)'
    	 * 限制长度范围：validType: 'name[1, 10]'
    	 */
        validator : function(value, lengths) {
    	   if($.isNumeric(lengths) && value.length > lengths) {
    		   this.message = '姓名长度不能大于' + lengths;
    		   return false;
    	   } else if($.isArray(lengths) && lengths.length == 2) {
    		   if(value.length < lengths[0] || value.length > lengths[1]) {
        		   this.message = '姓名长度应在' + lengths[0] + '到' + lengths[1] + '之间';
        		   return false;
        	   }
    	   }
           return  /^[\u4e00-\u9fa5a-zA-Z]+$/i.test(value);       
        },
        message : "姓名必须是中文或英文"
    },
    carNo:{
        validator : function(value){
            return /^^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$|^[a-zA-Z]{2}\d{7}$ $/.test(value);
        },
        message : "车牌号码无效（例：粤J12350）"
    },
    carenergin:{
        validator : function(value){
            return /^[a-zA-Z0-9]{16}$/.test(value);
        },
        message : "发动机型号无效(例：FG6H012345654584)"
    },
    email:{
        validator : function(value){
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value);
    },
    	message : "请输入有效的电子邮件账号(例：abc@126.com)"   
    },
    msn:{
        validator : function(value){
        return /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/.test(value);
    },
    	message : "请输入有效的msn账号(例：abc@hotnail(msn/live).com)"
    },
    same:{
        validator : function(value, param){
            if($("#"+param[0]).val() != "" && value != ""){
                return $("#"+param[0]).val() == value;
            }else{
                return true;
            }
        },
        message : "两次输入的密码不一致！"   
    },
    smallThen:{//小于
    	 validator : function(value, param){
             if($("#"+param[0]).val() != "" && value != ""){
                 return  parseFloat($("#"+param[0]).val()) > parseFloat(value);
             }else{
                 return true;
             }
         },
         message : "值超出合理范围"   
    },
    smallEquThen:{//小于等于
    	validator : function(value, param){
            if($("#"+param[0]).val() != "" && value != ""){
                return  parseFloat($("#"+param[0]).val()) >= parseFloat(value);
            }else{
                return true;
            }
        },
        message : "值超出合理范围"  
    },
    cartagAddress:{//车载标签地址
    	validator : function(value) {
            return  /^(([0-9]{8})|(123[0-9]{8}))+$/i.test(value);       
         },
         message : "只能为八位数字"
    	
    },
    netIdCheck:{//网段号
    	validator : function(value){
    		return /^([1-9]|([1-9][0-9])|([1-9][0-9]{2})|([1-3][0-9]{3})|(40[0-9][0-5]))$/i.test(value);
    	},
    	message : "网段号必须在1~4095之间"
    },
    parkCodeCheck:{//停车场编号
    	validator : function(value) {
            return  /^(P[1-9][0-9]{8}[0-9]{4})$/i.test(value);       
         },
         message : "必须以P开头，9位区域编码，4位自增长数"
    },
    chnNumCheck:{//网关上配置的通道号
    	validator : function(value) {
            return  /^([0-9]|1[0-4]{1})$/i.test(value);       
         },
         message : "必须是0-14之间的数字"
    },
    netInCheck:{//允许接入的网段号
    	validator : function(value) {
            return  value.split(",").length <= 8;       
         },
         message : "允许接入网段号最多8个，中间以逗号分隔"
    },
    numCo:{//只允许数字和英文逗号
    	validator : function(value) {
            return  /^(([0-9]+),)*([0-9]+)$/i.test(value);       
         },
         message : "只允许输入数字和英文状态的逗号，并且以数字结尾"
    },
    checkAccount : {// 验证登录账号
        validator : function(value) {
            return /^[a-zA-Z0-9_]{4,20}$/i.test(value);
        },
        message : "用户账号不合法（账号长度4-20字节，账号名只能包含大写、小写字母和数字、下划线）"
    },
    checkLongitude : {//验证经度在中国范围
    	validator: function(value) {
    		return (parseFloat(value) >= 73.66 && parseFloat(value) <= 135.05);
    	},
    	message : "所选经度超出中国范围"
    },
    checkLantitude : {//验证纬度在中国范围
    	validator: function(value) {
    		return (parseFloat(value) >= 3.86 && parseFloat(value) <= 53.55);
    	},
    	message : "所选纬度超出中国范围"
    },
    berthCodeCheck : {// 验证英文、数字、_
        validator : function(value) {
            return /^[A-Za-z0-9_-]+$/i.test(value);
        },
        message : "只能输入字母、数字、下划线或者-"
    },
    sensorAddrCheck : {
    	validator : function(value) {
    		return /^[A-Fa-f0-9]+$/i.test(value);
    	},
    	message : "只能输入0~9的数字或a~f的字母(不限大小写)"
    },
    /*checkDataUrlS : {
    	validator : function(value) {
    		return /(d+.d+.d+.d+):(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])/i.test(value);
    	},
    	message : "应为 IP:PORT 格式"
    },*/
    checkDataUrl : {
    	validator : function(value) {
    		//return /^((\d+.\d+.\d+.\d+):([1-9]|([1-9][0-9])|([1-9][0-9][0-9])|([1-9][0-9][0-9][0-9])|([1-6][0-5][0-5][0-3][0-5]))|((http|https|HTTP|HTTPS):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?))$/i.test(value);
    		var strRegex = '^((https|http)://)'
    			+ '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
    			+ '(:[0-9]{1,4}))' // 端口- :80 
    			+ '|' //允许IP:PORT和域名地址URL
    			+ '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
    			+ '|' // 允许IP和DOMAIN（域名） 
    			+ '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
    			+ '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
    			+ '[a-z]{2,6})' // first level domain- .com or .museum 
    			+ '((/?)|' // a slash isn't required if there is no file name 
    			+ '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)|#$'; 
    		var re=new RegExp(strRegex);
    		return re.test(value);
    	},
    	message : "应为 IP:PORT 格式，或以 HTTP:// 或 HTTPS:// 开头，或为 # "
    }
 });


/**
 * 扩展tree和combotree，使其支持平滑数据格式
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
sy.loadFilter = {
	loadFilter : function(data, parent) {
		var opt = $(this).data().tree.options;
		var idField, textField, parentField;
		if (opt.parentField) {
			idField = opt.idField || 'id';
			textField = opt.textField || 'text';
			parentField = opt.parentField || 'pid';
			var i, l, treeData = [], tmpMap = [];
			for (i = 0, l = data.length; i < l; i++) {
				tmpMap[data[i][idField]] = data[i];
			}
			for (i = 0, l = data.length; i < l; i++) {
				if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
					if (!tmpMap[data[i][parentField]]['children'])
						tmpMap[data[i][parentField]]['children'] = [];
					data[i]['text'] = data[i][textField];
					tmpMap[data[i][parentField]]['children'].push(data[i]);
				} else {
					data[i]['text'] = data[i][textField];
					treeData.push(data[i]);
				}
			}
			return treeData;
		}
		return data;
	}
};
$.extend($.fn.combotree.defaults, sy.loadFilter);
$.extend($.fn.tree.defaults, sy.loadFilter);

/**
 * 扩展treegrid，使其支持平滑数据格式
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
$.extend($.fn.treegrid.defaults, {
	loadFilter : function(data, parentId) {
		var opt = $(this).data().treegrid.options;
		var idField, treeField, parentField;
		if (opt.parentField) {
			idField = opt.idField || 'id';
			treeField = opt.textField || 'text';
			parentField = opt.parentField || 'pid';
			var i, l, treeData = [], tmpMap = [];
			for (i = 0, l = data.length; i < l; i++) {
				tmpMap[data[i][idField]] = data[i];
			}
			for (i = 0, l = data.length; i < l; i++) {
				if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
					if (!tmpMap[data[i][parentField]]['children'])
						tmpMap[data[i][parentField]]['children'] = [];
					data[i]['text'] = data[i][treeField];
					tmpMap[data[i][parentField]]['children'].push(data[i]);
				} else {
					data[i]['text'] = data[i][treeField];
					treeData.push(data[i]);
				}
			}
			return treeData;
		}
		return data;
	}
});

/**
 * 创建一个模式化的dialog
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
sy.modalDialog = function(options) {
	var opts = $.extend({
		title : '&nbsp;',
		width : 640,
		height : 480,
		modal : true,
		onClose : function() {
			$(this).dialog('destroy');
		}
	}, options);
	opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
	if (options.url) {
		opts.content = '<iframe id="" src="' + options.url + '" allowTransparency="true" scrolling="auto" width="100%" height="98%" frameBorder="0" name=""></iframe>';
	}
	return $('<div/>').dialog(opts);
};

/**
 * 更换主题
 * 
 * @author 孙宇
 * @requires jQuery,EasyUI
 * @param themeName
 */
sy.changeTheme = function(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
	$easyuiTheme.attr('href', href);

	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for (var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			try {
				$(ifr).contents().find('#easyuiTheme').attr('href', href);
			} catch (e) {
				try {
					ifr.contentWindow.document.getElementById('easyuiTheme').href = href;
				} catch (e) {
				}
			}
		}
	}

	sy.cookie('easyuiTheme', themeName, {
		expires : 7
	});
};

sy.cookie = function(key, value, options) {
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		options = $.extend({}, options);
		if (value === null) {
			options.expires = -1;
		}
		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}
		return (document.cookie = [ encodeURIComponent(key), '=', options.raw ? String(value) : encodeURIComponent(String(value)), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : '' ].join(''));
	}
	options = value || {};
	var result, decode = options.raw ? function(s) {
		return s;
	} : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/**
 * 滚动条
 * 
 * @author 孙宇
 * @requires jQuery,EasyUI
 */
sy.progressBar = function(options) {
	if (typeof options == 'string') {
		if (options == 'close') {
			$('#syProgressBarDiv').dialog('destroy');
		}
	} else {
		if ($('#syProgressBarDiv').length < 1) {
			var opts = $.extend({
				title : '&nbsp;',
				closable : false,
				width : 300,
				height : 60,
				modal : true,
				content : '<div id="syProgressBar" class="easyui-progressbar" data-options="value:0"></div>'
			}, options);
			$('<div id="syProgressBarDiv"/>').dialog(opts);
			$.parser.parse('#syProgressBarDiv');
		} else {
			$('#syProgressBarDiv').dialog('open');
		}
		if (options.value) {
			$('#syProgressBar').progressbar('setValue', options.value);
		}
	}
};

$.extend($.fn.datagrid.defaults.editors, {  
    datetimebox: {  
        init: function(container, options){  
            var editor = $('<input />').appendTo(container);  
            editor.enableEdit = false;  
            editor.datetimebox($.extend({
            	editable: false
            }, options));  
            return editor;  
        },  
        getValue: function(target){  
            return $(target).datetimebox('getValue');
       },  
        setValue: function(target, value){  
        	$(target).datetimebox('setValue', value);
        },  
        resize: function(target, width){  
           $(target).datetimebox('resize',width);          
        },  
        destroy: function(target){  
            $(target).datetimebox('destroy');  
        }  
    }  
});

/**
 * 解决class="iconImg"的img标记，没有src的时候，会出现边框问题
 * 
 * @author 孙宇
 * 
 * @requires jQuery
 */
$(function() {
	$('.iconImg').attr('src', sy.pixel_0);
});