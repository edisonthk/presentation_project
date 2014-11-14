var Menu = function(_data, iframeId){

	this.data = _data;
	this.iframeId = iframeId;

	window.onload = function() {
		$("#propertyMenu, #color, #xywh").find(".sidemenu").each(function(index,element){
		    $(element).hide();
		});	
	}

	this._menuEvent_ = new MenuEvent(iframeId);
};

var MenuEvent = function(iframeId) {
	console.log(iframeId);
	
	Event.prototype.iframeId = iframeId;
}


// CONSTANT変数
Menu.prototype.KEY = {
	CHARACTERISTICS: "characteristics",
	TYPE: "type",
	NAME: "name",
	SHAPE: "shape",
}

Menu.prototype.udpateDataAndSetSelector = function(_data,selector){
	var MENU_KEY = Menu.prototype.KEY;
	var  t = this;

	// データとセレクターを更新
	t.data = _data;
	t.selector = selector;


	// メニューの中身のデータを取得
	var _selected_object = t.getSelectedObject();
	t.shape = _selected_object[MENU_KEY.CHARACTERISTICS][MENU_KEY.SHAPE];
	t.name = _selected_object[MENU_KEY.NAME];
	t.charateristic = _selected_object[MENU_KEY.CHARACTERISTICS];
		

	// 上に取得したデータのメニューの中に代入
	// ここまでは一切のHTMLは構築されない。HTMLの構築は次のbuildHTML()関数になる。
	t.setPropertyMenu();
	t.setStyleMenu();
	t.setAnimationMenu();

	// メニューのHTMLを構築
	t.buildHtml();
}

Menu.prototype.getSelectedObject = function() {
	var t = this;
	for(var i =0;i < t.data.length; i++){
      	if(t.data[i].name === t.selector.getSelectedElementId()){
        var _selected_object = _data[i];
        
        return _selected_object;
      	}
    }
    return null;
}

Menu.prototype.setPropertyMenu = function() {
	var t = this;
	t.propertyMenu = {};

	t.propertyMenu = {
			x: "",
			y: "",
			backgroundColor: "",
			opacity: "",
			rotate: "",
	}

	if(t.shape === "circle") {
		t.propertyMenu["radius"] = "";
	}else {
		t.propertyMenu["width"] = "";
		t.propertyMenu["height"] = "";
	}

	for(var _m in t.propertyMenu){
		try{
			t.propertyMenu[_m] = t.charateristic[_m];
		}catch(err){}
	}
}

Menu.prototype.setStyleMenu = function() {
	var t = this;
	
	t.styleMenu = {
		fontSize: "10px",
		fontFamily: "serif",
		color: "#fff",
	}
}

Menu.prototype.setAnimationMenu = function() {
	this.animationMenu = {
		list: []
	}
}



MenuEvent.prototype.triXChangeEvent = function(event){
	MenuEvent.prototype.baseChangeEvent(event, function(MENU_KEY, _selected_object_name, new_value ,data) {
		// _dataを更新
		for(var i=0;i<data.length;i++){
			if(data[i].name == _selected_object_name){
				data[i][MENU_KEY.CHARACTERISTICS]["x"] = new_value + "px";
			}
		}
	});
}
MenuEvent.prototype.triYChangeEvent = function(event){
	MenuEvent.prototype.baseChangeEvent(event, function(MENU_KEY, _selected_object_name, new_value ,data) {
		// _dataを更新
		for(var i=0;i<data.length;i++){
			if(data[i].name == _selected_object_name){
				data[i][MENU_KEY.CHARACTERISTICS]["y"] = new_value + "px";
			}
		}
	});
}
MenuEvent.prototype.triWChangeEvent = function(event){
	MenuEvent.prototype.baseChangeEvent(event, function(MENU_KEY, _selected_object_name, new_value ,data) {
		// _dataを更新
		for(var i=0;i<data.length;i++){
			if(data[i].name == _selected_object_name){
				data[i][MENU_KEY.CHARACTERISTICS]["width"] = new_value + "px";
			}
		}
	});
}
MenuEvent.prototype.triHChangeEvent = function(event){
	MenuEvent.prototype.baseChangeEvent(event, function(MENU_KEY, _selected_object_name, new_value ,data) {

		// _dataを更新
		for(var i=0;i<data.length;i++){
			if(data[i].name == _selected_object_name){
				data[i][MENU_KEY.CHARACTERISTICS]["height"] = new_value + "px";
			}
		}
	});
}

MenuEvent.prototype.baseChangeEvent = function(event, real_event_callback){

	var MENU_KEY = Menu.prototype.KEY;
	var new_value = event.target.value;
	var _data = event._data;
	var _selected_object_name = event._selected_object_name;

	real_event_callback(MENU_KEY, _selected_object_name, new_value ,_data);

	// HTMLやCSSなどを更新
	document.getElementById(event.iframeId).contentWindow.updateElement(_data);
	event._selector.moveToSelectedElement(_selected_object_name);
}


// setPropertyMenu,setStyleMenu, setAnimationMenuはあくまでもbuildHTML()をより簡単にHTMLが構築できるように
// udpateDataAndSetSelectorで取得したデータを整理しただけ。
// 
// setPropertyMenu,setStyleMenu, setAnimationMenuでデータの整理をしたら、buildHTMLで整理したデータを使ってhtmlの構築をします。
// HTMLを構築する祭に、
// (1) メニューデータを代入
// (2) 追加したchangeEventを削除
// (3) 削除したら、最新のchangeEventを加え
Menu.prototype.buildHtml = function() {


	$("#propertyMenu, #color, #xywh").find(".sidemenu").each(function(index,element){
	    $(element).hide();
	  });

	var t = this;
	var MenuEvent = t._menuEvent_;

	Event.prototype._selector = t.selector;
	Event.prototype._selected_object_name = t.name;
	Event.prototype._data = t.data;


	$("#propertyMenu, #xywh").find(".sidemenu").each(function(index,element){
	    var _e = $(element);
	    _e.hide();

	    if(_e.hasClass("sidemenu-"+t.shape)){
	    	if(t.shape === "triangle") {
	    		

	    		var triX = document.getElementById("tri-x");
		      	triX.value = t.propertyMenu.x.match(/\d/g).join("");
		      	triX.addEventListener("change",MenuEvent.triXChangeEvent,false);


		      	var triY = document.getElementById("tri-y");
		      	triY.value = t.propertyMenu.y.match(/\d/g).join("");
		      	triY.addEventListener("change",MenuEvent.triYChangeEvent,false);

		      	var triW = document.getElementById("tri-w");
		      	triW.value = t.propertyMenu.width.match(/\d/g).join("");
		      	triW.addEventListener("change",MenuEvent.triWChangeEvent,false);


		      	var triH = document.getElementById("tri-h");
		      	triH.value = t.propertyMenu.height.match(/\d/g).join("");
		      	triH.addEventListener("change",MenuEvent.triHChangeEvent,false);

		    }else if(t.shape === "circle") {
		    	
		    }
		    _e.show();
	    }
	    
  });

};
