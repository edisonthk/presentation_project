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
    triangle["characteristics"] = {"color":"red","shape":"triangle","x":"150px","y":"150px","height":"150px","width":"200px"};
    triangle["click"] = [{
      "object":"object1",
      "animation": "ani",
      "animationDuration": "0.8s"
    }];
    _data.push(triangle);
  }
  if(html=="circ"){
    var circle = {};
    circle["name"] = "object2";
    circle["type"] = "object";
    circle["characteristics"] = {"color":"blue","shape":"circle","radius":"50px","x":"50px","y":"50px"};
    circle["click"] = [{
      "object":"object2",
      "animation": "ani",
      "animationDuration": "1s"
    }];
    _data.push(circle);
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
  console.log(_data);

  // HTMLやCSSなどを更新
  document.getElementById(iframeid).contentWindow.updateElement(_data);

  // var container = doc.createElement("div");
  // if(html=="san"){container.setAttribute("class", "sankaku");container.setAttribute("id", "sankaku");}
  // if(html=="circ"){container.setAttribute("class", "circle");container.setAttribute("id", "circle");}
  // doc.body.appendChild(container);

}
/*
function newURL(){
  document.iFrame.location.href = "#";
}
*/
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
// ダイアログを閉じる
function closeDialog() {
    var delNode = document.getElementById("dialog");
    delNode.parentNode.removeChild(delNode);
}

// Initialize core
//var core = new ParsingEngine();

window.onload = function(){
  
}