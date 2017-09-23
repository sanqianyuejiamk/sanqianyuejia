var YDataGrid = function(config){
		config = config || {};
		var dataGrid = config.dataGrid || {}
		//Actions
		var actionUrl =  config.action || {}
		var Action = {
			'save': actionUrl.save ||'save.do',
			'getId': actionUrl.getId||'getId.do',
			'remove': actionUrl.remove||'delete.do'
		}
		
		//Grid DataList
		var Grid = $('#data-list');
		
		//Form
		var Form = {search:$("#searchForm"),
					edit:$("#editForm")}
		//Win 窗口
		var Win = { edit:$("#edit-win")}
		
		//处理函数
		var Handler = {
			//serach 查询事件
			search: function(callback){
				Events.refresh();
				//回调函数
				if(jQuery.isFunction(callback)){
					callback();
				}
				return false;	
			},
			//add按钮事件
			add: function(callback){
				var combos = $("#editForm .easyui-combobox");
				$.each(combos,function(i,combo){
					var id = '#'+combo.id;
					$(id).combobox('reset');
				})
				Win.edit.dialog('open');
				
				//Form.edit.resetForm();
				Form.edit.form('reset');
				//回调函数
				if(jQuery.isFunction(callback)){
					callback();
				}
			},
			//edit 按钮事件
			edit:  function(callback){
				var record = Utils.getCheckedRows();
				if (Utils.checkSelectOne(record)){
					sys.progress();
					var data ={};
					var idKey = dataGrid.idField || 'id'; //主键名称
 					data[idKey] = (record[0][idKey]);
					sys.getById(Action.getId,data,function(result){
						sys.closeProgress();
						Form.edit.form('load',result.data);
						Win.edit.dialog('open'); 
						
						//回调函数
						if(jQuery.isFunction(callback)){
							callback(result);
						}
					});
				}
			},
			//刷新Grid 数据
			refresh: function(callback){
				var param = Form.search.serializeObject();
				Grid.datagrid('load',param);
				//回调函数
				if(jQuery.isFunction(callback)){
					callback();
				}
			},
			//删除记录
			remove: function(callback){
				var records = Utils.getCheckedRows();
				if (Utils.checkSelect(records)){
					$.messager.confirm('确认','确认删除记录?',function(r){  
					    if (r){
					    	sys.progress();
					    	var arr = [],idKey = dataGrid.idField || 'id'; //主键名称
					    	$.each(records,function(i,record){
					    		arr.push('id='+record[idKey]);
					    	});
					    	var data = arr.join("&");
					   		sys.deleteForm(Action.remove,data,function(result){
								sys.closeProgress();
								Events.refresh();
								//回调函数
								if(jQuery.isFunction(callback)){
									callback(result);
								}
							});
					    }  
					});
				}
			},//保存调用方法
			save: function(callback){
				if(Form.edit.form('validate')){
					sys.progress();
					Form.edit.attr('action',Action.save);
					var parentId =$('#search_parentId').val();
					$("#edit_parentId").val(parentId)
					sys.saveForm(Form.edit,function(data){
						sys.closeProgress();
						Win.edit.dialog('close');
						var param = Form.search.serializeObject();
						Grid.datagrid('reload',param);
					    Form.edit.resetForm();
					     //回调函数
						if(jQuery.isFunction(callback)){
							callback(data);
						}
					});
				 }
			},
			//关闭按钮事件
			close : function (callback){
				Win.edit.dialog('close');
				console.log(callback);
			}
		}
		
		//Grid 工具类
		var Utils = {
			getCheckedRows : function(){
				return Grid.datagrid('getChecked');			
			},
			checkSelect : function(rows){//检查grid是否有勾选的行, 有返回 true,没有返回true
				var records =  rows;
				if(records && records.length > 0){
					return true;
				}
				sys.alert('警告','未选中记录.','warning');  
				return false;
				
			},
			checkSelectOne : function(rows){//检查grid是否只勾选了一行,是返回 true,否返回true
				var records = rows;
				if(!Utils.checkSelect(records)){
					return false;
				}
				if(records.length == 1){
					return true;
				}
				sys.alert('警告','只能选择一行记录.','warning');  
				return false;
			}
		}
		
		
		//自定义事件
		var evt= config.event || {};
		
		
		//默认事件
		var Events ={
			//serach 查询事件
			search: evt.search || Handler.search,
			//add按钮事件
			add: evt.add || Handler.add,
			//edit 按钮事件
			edit: evt.edit || Handler.edit,
			//刷新Grid 数据
			refresh: evt.refresh || Handler.refresh,
			//删除记录
			remove: evt.remove || Handler.remove,
			//保存调用方法
			save: evt.save || Handler.save,
			//关闭按钮事件
			close : evt.close ||  Handler.close
		}
		
		//按钮控制 btnType 用来控制按钮是否显示,后台根据授权控制是否显示
		var bar_add ={	
						id:'btnadd',
						text:'添加',
						iconCls:'icon-add',
						btnType:'add',
						handler: Events.add
					 };
		var bar_edit = {
							id:'btnedit',
							text:'修改',
							iconCls:'icon-edit',
							btnType:'edit',
							handler: Events.edit
						};
		var bar_remove = { id:'btnremove',
						text:'删除',
						iconCls:'icon-remove',
						btnType:'remove',
						handler:Events.remove
					   };
		//var toolbarConfig = [bar_add,bar_edit,bar_remove];
		var getToolbar = function (){
			var tbars = [];
			if (dataGrid.toolbar != undefined && dataGrid.toolbar.length > 0) {
				for ( var i = 0; i < dataGrid.toolbar.length; i++) {
					var bar = dataGrid.toolbar[i];
					if(!bar){
						continue;
					}
					if(bar.btnType=='add'){
						tbars.push({id:bar.id || bar_add.id,text:bar.text || bar_add.text ,iconCls: bar.iconCls || bar_add.iconCls, btnType: bar.btnType || bar_add.btnType,handler:bar.handler || bar_add.handler});
						continue;
					}
					if(bar.btnType=='edit'){
						tbars.push({id:bar.id || bar_edit.id,text:bar.text || bar_edit.text ,iconCls: bar.iconCls || bar_edit.iconCls,btnType: bar.btnType || bar_edit.btnType,handler:bar.handler || bar_edit.handler});
						continue;
					}
					if(bar.btnType=='remove'){
						tbars.push({id:bar.id || bar_remove.id,text:bar.text || bar_remove.text ,iconCls: bar.iconCls || bar_remove.iconCls,btnType: bar.btnType || bar_remove.btnType,handler:bar.handler || bar_remove.handler});
						continue;
					}
					tbars.push({id:bar.id,text:bar.text,iconCls:bar.iconCls,class:bar.class,btnType: bar.btnType,handler:bar.handler,disabled:bar.disabled});
				}
			}
			return tbars;
		}
	
		//初始化表格
		var initGrid = function(toolBar){
			var dataconfig = {
				title: '数据列表',
				iconCls: 'icon-save',
				fit:true,
				border:false,
				nowrap: true,
				autoRowHeight: false,
				striped: false,
				collapsible:false,
				remoteSort: true,
				pagination:true,
				rownumbers:true,
				singleSelect:false,
				checkOnSelect:false,
				selectOnCheck:false,
				toolBar:dataGrid.toolbar,
				url: dataGrid.url,
				idField : dataGrid.idFile,
				method: 'post',
				loadMsg: '正在加载数据...',
				onLoadSuccess: function(){
					
					if(dataGrid.keepChoice == null){
						
						Grid.datagrid('unselectAll');
						Grid.datagrid('uncheckAll');
						Grid.datagrid("fixRownumber");
					}
				},
				onSelect:function(rowIndex, rowData){
					//选择一行
					var rows = Grid.datagrid('getRows');
					$.each(rows,function(i){
						
						if(i != rowIndex){
							
							Grid.datagrid('uncheckRow',i);
							Grid.datagrid('unselectRow',i);
						}
					})
					Grid.datagrid('checkRow',rowIndex);
				}
			};
			dataGrid.toolbar = toolBar;
			Grid.datagrid($.extend(dataconfig, dataGrid));
		}
		//初始化Grid按钮 按钮控制
		var dataGridTB;
		var initTbar = function(){
			var tbars = getToolbar();
			var _url = urls['msUrl'] + '/getActionBtn.do';
			var data = {'url':window.location.href};
			//查询页面授权的btnType
			sys.ajaxJson(_url,data,function(data){
				if(data.success){
					if(data.allType){
						dataGridTB = tbars;
					}else{
						var newBars = [];
						jQuery.inArray("John", data.types);				
						for(var i=0;i< tbars.length; i++){
							var bar = tbars[i];
							//btnType 为空显示
							if(!bar.btnType){
								newBars.push(bar);
							}else{
								//判断btnType是否存在,存在则显示
								if($.inArray(bar.btnType, data.types) >= 0 ){
									newBars.push(bar);
								}	
							}
						}
						if(newBars.length > 0){
							dataGridTB = newBars;
						}
						dataGridTB = newBars;
					}
				}else{
					dataGridTB = null;
					sys.alert('提示',data.msg);
				}
			});
		}
		
		//初始话form
		var initForm = function(){
			if(Form.search && Form.search[0]){
				Form.search.find("#btn-search").click(Events.search); //查询事件
			}
			$(".ui-search-panel").keydown(
					function(e) {
						if (e.keyCode == 13) {
							var param = Form.search.serializeObject();
							//显示第一页数据
							Grid.datagrid('options').pageNumber = 1;
							//分页栏跳转到第一页
							Grid.datagrid('getPager').pagination({pageNumber:1});
							
							Grid.datagrid('reload',param);
						}
			});
		}
		
		var initWin = function(){
			if(Win.edit && Win.edit[0]){
				//判断页面是否设置buttons，如果没有设置默认按钮
				var btns = Win.edit.attr("buttons");
				if(!btns){
					//设置 保存,关闭按钮
					Win.edit.dialog({
						buttons:[
							{
								text:'保存',
								handler:Events.save
							},{
								text:'关闭',
								handler:Events.close
							}
						]
					});
				}
				//Win.edit.find("#btn-submit").click(Events.save); //保存事件
				//Win.edit.find("#btn-close").click(Events.close);//关闭窗口
			}
		}
		
		//this 返回属性
		this.win = Win;
		this.form = Form;
		this.grid = Grid;
		this.utils = Utils;
		this.handler = Handler;
		
		//初始化方法
		this.init = function(){
			initTbar();
			initGrid(dataGridTB);
			initForm();			
			initWin();
		}
		
		//调用初始化
		return this;
};