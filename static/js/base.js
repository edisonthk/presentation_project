function change(size){
  var topelement = document.getElementById("topcontent");
  var botelement = document.getElementById("bottomcontent");
  var element2 = document.getElementById("content2");
  if(size == 'delete'){
    topelement.style.height = '100%';
  }else if(size == 'delete2'){
    topelement.style.width = "calc(100% - 254px)";
    botelement.style.width = "calc(100% - 254px)";
    element2.style.width = "0px";
  }else if(size == 'restore'){
    topelement.style.height = 'calc(100% - 250px)';
  }else if(size == 'restore2'){
    topelement.style.width = "calc(100% - 250px - 250px)";
    botelement.style.width = "calc(100% - 250px - 250px)";
    element2.style.width = "246px";
  }
}
function changeIframe(){
  var ifelement = document.getElementById("iframe");
  ifelement.style.height = '1500px';
}
function iframeDoc(id){
  if(document.all){
    return frames[id].document;
  }else{
    return document.getElementById(id).contentDocument;
  }
}

function appendHTML(iframeid, html){
  
  var _data = [];

  if(html=="san"){
    var triangle = {};
    triangle["name"] = "object1";
    triangle["type"] = "object";
    triangle["characteristics"] = {"color":"green","shape":"triangle","x":"150px","y":"120px","height":"150px","width":"200px"};
    // triangle["click"] = [{
    //   "object":"object1",
    //   "animation": "ani",
    //   "animationDuration": "0.8s"
    // }];
    _data.push(triangle);
  }
  if(html=="circ"){
    var triangle = {};
    triangle["name"] = "object1";
    triangle["type"] = "object";
    triangle["characteristics"] = {"color":"red","shape":"triangle","x":"250px","y":"200px","height":"100px","width":"150px"};
    _data.push(triangle);
    //var circle = {};
    //circle["name"] = "object2";
    //circle["type"] = "object";
    //circle["characteristics"] = {"color":"blue","shape":"circle","radius":"50px","x":"50px","y":"40px"};
    //_data.push(circle);
  }
  var ani = {};
  ani["name"] = "ani";
  ani["type"] = "animation";
  ani["animate"] = {
    "100%": {
      "x": "10px",
      "y": "10px",
      "rotate": "40deg"
    }
  };
  _data.push(ani);
  //console.log(_data);

  // HTMLやCSSなどを更新
  document.getElementById(iframeid).contentWindow.updateElement(_data);
  document.getElementById(iframeid).contentWindow.elementSelectedCallback = function(selector) {
    // divが選択されたこのイベントが発生する
    // この関数の中にメニューの内容を変更イベントなどを作ってください。
    // １番目のパラメータselectorはSelectorクラスだから
    //console.log(selector.getSelectedElement());
    for(var i =0;i < _data.length; i++){
      if(_data[i].name === selector.getSelectedElementId()){
        var _selected_object = _data[i];
        console.log(_selected_object);
        menu.setObject(_selected_object);
        break;
      }
    }
    // var eleX = selector.getSelectedElement().style.top; var numX = eleX.match(/\d/g).join("");
    // var eleY = selector.getSelectedElement().style.left; var numY = eleY.match(/\d/g).join("");
    // var eleW = selector.getSelectedElement().style.borderRightWidth; var numW = eleW.match(/\d/g).join("");
    // var eleH = selector.getSelectedElement().style.borderBottomWidth; var numH = eleH.match(/\d/g).join("");
  }
}
function showDialog() {
    var html = document.getElementById("container").innerHTML;

    html = html + '<div id="dialog">'
                +  '<div id="dialog_back" style="height:' // ①のdiv
                +   getBrowserHeight() + 'px;"></div>'
                +  '<div id="dialog_body">'    // ②のdiv
                +  '<input type="button" onclick="closeDialog()" value="Close.">'
                + '</div>'
                + '</div>';

    document.getElementById("container").innerHTML = html;
}
// 画面の高さを取得
function getBrowserHeight() {
    if ( window.innerHeight ) {
            return window.innerHeight;
    }
    else if ( document.documentElement &&
            document.documentElement.clientHeight != 0 ) {
            return document.documentElement.clientHeight;
    }
    else if ( document.body ) {
            return document.body.clientHeight;
    }
    return 0;
}
// ダイアログを閉じる。
function closeDialog() {
  var delNode = document.getElementById("dialog");
  delNode.parentNode.removeChild(delNode);
}
// function dispmenu(shape, eleX, eleY, eleW, eleH){
//   $("#style, #color, #xywh").find(".sidemenu").each(function(index,element){
//     var _e = $(element);
//     _e.hide();
//     if(_e.hasClass("sidemenu-"+shape)){
//       document.getElementById("tri-x").value = eleX;
//       document.getElementById("tri-y").value = eleY;
//       document.getElementById("tri-w").value = eleW;
//       document.getElementById("tri-h").value = eleH;
//       _e.show();
//     }
//   });
// }

menu = new Menu();
