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

var callCount = 0; //appendHTMLを呼び出された回数をカウントします。objectの区別のために導入。

function appendHTML(html){

  if(html=="san"){
    var triangle = {};
    triangle["name"] = "object" + callCount;
    triangle["type"] = "object";
    triangle["characteristics"] = {"color":"green","shape":"triangle","x":"150px","y":"120px","height":"150px","width":"200px"};
    // triangle["click"] = [{
    //   "object":"object1",
    //   "animation": "ani",
    //   "animationDuration": "0.8s"
    // }];
    _data.push(triangle);
  }else if(html=="circ"){
    var circle = {};
    circle["name"] = "object" + callCount;
    circle["type"] = "object";
    circle["characteristics"] = {"color":"blue","shape":"circle","radius":"50px","x":"50px","y":"40px"};
    _data.push(circle);
  }else if(html == "object_frame"){
    _data.push({
          "name":"my_frame_object" + callCount,
          "type":"object_frame",
          "characteristics": {"x":"200px","y":"200px"},
          "frames": [
            "/img/explosion/explosion_01.png",
            "/img/explosion/explosion_02.png",
            "/img/explosion/explosion_03.png",
            "/img/explosion/explosion_04.png",
            "/img/explosion/explosion_05.png",
            "/img/explosion/explosion_06.png",
            "/img/explosion/explosion_07.png",
            "/img/explosion/explosion_08.png",
            "/img/explosion/explosion_09.png",
            "/img/explosion/explosion_10.png",
            "/img/explosion/explosion_11.png",
            "/img/explosion/explosion_12.png",
            "/img/explosion/explosion_13.png",
            "/img/explosion/explosion_14.png",
            "/img/explosion/explosion_15.png",
            "/img/explosion/explosion_16.png",
            "/img/explosion/explosion_17.png",
          ],
        });
  }
  
  callCount ++;
//objectData["click"] = [{
//   "object":"object1",
//   "animation": "ani",
//   "animationDuration": "0.8s"
// }];
  /*
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
  */

  // HTMLやCSSなどを更新
  document.getElementById(iframeid).contentWindow.updateElement(_data);

  // dragging callback 
  // このイベントはselectorがdraggingされた時に発生するイベント
  document.getElementById(iframeid).contentWindow.selectorDragCallback = function(selector, dragTop, dragLeft) {
    // selectorがdraggingされた時に、_dataのデータをdragTopとdragLeftの値に基づいて更新
    for(var i =0 ;i<_data.length; i++){
      if(_data[i].name === selector.getSelectedElementId()){
        _data[i]["characteristics"]["x"] = dragLeft + "px";
        _data[i]["characteristics"]["y"] = dragTop + "px";
        break;
      }
    }
    // _dataを更新したので、メニューのデータを反映させる
    menu.udpateDataAndSetSelector(_data,selector);
    // _dataを更新したので、updateElementでviewを反映させる
    document.getElementById(iframeid).contentWindow.updateElement(_data);
  }

  // selectorが外されたときにselectorDeselectedCallbackが発生する
  document.getElementById(iframeid).contentWindow.selectorDeselectedCallback = function(selector) {
    // selectorが外された場合、メニューも非表示にする
    menu.hide();
  }

  // divが選択されたときにこのコールバックイベントが発生する
  // この関数の中にメニューの内容を変更イベントなどを作ってください。
  // １番目のパラメータselectorはSelectorクラスだから
  document.getElementById(iframeid).contentWindow.elementSelectedCallback = function(selector) {
    // メニューのHTMLを変更
    // そして、メニューの中身を変更
    menu.udpateDataAndSetSelector(_data,selector);
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
/*
function dispmenu(shape, eleX, eleY, eleW, eleH){
  $("#style, #color, #xywh").find(".sidemenu").each(function(index,element){
    var _e = $(element);
    _e.hide();
    if(_e.hasClass("sidemenu-"+shape)){
       document.getElementById("tri-x").value = eleX;
       document.getElementById("tri-y").value = eleY;
       document.getElementById("tri-w").value = eleW;
       document.getElementById("tri-h").value = eleH;
       _e.show();
     }
   });
}
*/

_data = [];
iframeid = "iframe";
menu = new Menu(_data, iframeid);
