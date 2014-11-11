

var Menu = function(){
	window.onload = function() {
		$("#propertyMenu, #color, #xywh").find(".sidemenu").each(function(index,element){
		    $(element).hide();
		});	
	}
	
};


// CONSTANT変数
Menu.prototype.KEY = {
	CHARACTERISTICS: "characteristics",
	TYPE: "type",
	NAME: "name",
}

Menu.prototype.setObject = function(object){
	var  t = this;

	t.shape = object[t.KEY.CHARACTERISTICS]["shape"];
	console.log(object);
	t.name = object[t.KEY.NAME];
	t.charateristic = object[t.KEY.CHARACTERISTICS];

	t.setPropertyMenu();
	t.setStyleMenu();
	t.setAnimationMenu();

	t.buildHtml();
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

Menu.prototype.buildHtml = function() {
	$("#propertyMenu, #color, #xywh").find(".sidemenu").each(function(index,element){
	    $(element).hide();
	  });

	var t = this;
	$("#propertyMenu, #xywh").find(".sidemenu").each(function(index,element){
	    var _e = $(element);
	    _e.hide();

	    if(_e.hasClass("sidemenu-"+t.shape)){

	    	if(t.shape === "triangle") {
	    		console.log(t.propertyMenu);
		      document.getElementById("tri-x").value = t.propertyMenu.x.match(/\d/g).join("");
		      document.getElementById("tri-y").value = t.propertyMenu.y.match(/\d/g).join("");
		      document.getElementById("tri-w").value = t.propertyMenu.width.match(/\d/g).join("");
		      document.getElementById("tri-h").value = t.propertyMenu.height.match(/\d/g).join("");
		      
		    }else if(t.shape === "circle") {

		    }
		    _e.show();
	    }
	    
  });
};
