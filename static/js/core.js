/* 
  v2014.11.18 last updated by LikWee

  At 2014.10.29, bugs fixed on Array detect on multiple frame in single window
  At 2014.11.14, bugs fixed on compiling element already created at writeDocuments method
  At 2014.11.17, new features of frames and textbox
  At 2014.11.18, bugs fixed on re-update object_frame
*/
var CoreHelpers = function() {}
var CompiledObject = function(json_obj) { this.initial(json_obj); }
var CompiledAnimation = function(json_anim, compiled_animation_name, target_animation_element) { this.initial(json_anim, compiled_animation_name, target_animation_element); }
var ParsingEngine = function() {this.initial();}
var FrameHelper = function(key, frames, imgTag){ this.initial(key, frames, imgTag); }
var CoreConstants = {
  getSelectors : function() { return "img,div,iframe"; }
}
// default value
// if there is any configuration by user, the value's below will be 
// overwr by user value
ParsingEngine.prototype.default = {
  height: "100px",
  width: "100px",
  radius: "50px",
  backgroundColor: "blue",
  animeDuration: "5s",
  animeInitial: "0s",
  frameDuration: 150,
}

// FrameHelper Class
// This class is used to assist animation object by frames
FrameHelper.prototype.initial = function(key, frames, imgTag) {
  this.key = key;
  this[key] = 0;
  this.imgTag = imgTag;
  this.frames = frames;
}
FrameHelper.prototype.intervalFunct = function(){
  var t = this;
  var _count = t[t.key];
  t.imgTag.src = t.frames[_count];
  _count += 1;
  if(_count >= t.frames.length){
    t[t.key] = 0;
  }else{
    t[t.key] = _count;  
  }
  
}

CoreHelpers.prototype.splitNumberAndUnit = function(len){
  var result = len.match(/(\d*\.?\d*)(.*)/);
  if(result.length == 3){
    return {
      value: parseFloat(result[1]),
      unit: result[2],
    }
  }else{
    console.error("Unable to parse length: "+len);
    return {
      value: 0,
      unit: "px",
    }
  }
}

// Checks if either attribute is second unit or not. 
// Second unit means 3s (3 seconds), 5.3s (5.3 seconds), combination of numbers and single alphabet letter 's' at the ends
// If attribute is second unit, return true, otherwise return false
CoreHelpers.prototype.isSecondUnit = function(attr){
  var fistCharCode = attr.charCodeAt(0);
  var lastCharCode = attr.charCodeAt(attr.length-1);
  
  return fistCharCode > 48 && fistCharCode < 57 && lastCharCode == 115;
}

// ======= configure default value ==========
//
// styling element with default value
CompiledObject.prototype.initial = function(json_obj){

  var t = this;

  t.name = json_obj["name"];
  t.type = json_obj["type"];
  t.groups = [];
  t.click_event = null;
  this.characteristics = json_obj["characteristics"];

  if(typeof json_obj["group"] !== "undefined"){
    t.addGroupName(json_obj["group"]);  
  }
  if(typeof json_obj["click"] !== "undefined"){
    t.click_event = [];
    var temp_json_click = json_obj["click"];
    
    // Due to multiple frame in single document, my_array instanceof Array is unable to checking either my_array is Array or not.
    // Solution on this problem can be solved by Object.prototype.toString.call(temp_json_click) === '[object Array]')
    //
    // for more details ... 
    // http://stackoverflow.com/a/6473338/1799322
    if(Object.prototype.toString.call(temp_json_click) === '[object Array]'){

      for (var i = 0; i < json_obj["click"].length; i++) {
        t.click_event.push(json_obj["click"][i]);
      }
    }else{

      t.click_event.push(json_obj["click"]);
    }
  }

  if(json_obj["type"] === "object_frame"){
    t.frames = json_obj["frames"];
    if(typeof json_obj["frameDuration"] !== "undefined"){
      t.frameDuration = parseInt(json_obj["frameDuration"]);
      if(isNaN(t.frameDuration)) {
        t.frameDuration = t.default.frameDuration;
      }
    }else{
      t.frameDuration = t.default.frameDuration;
    }
  }

  // 
  t.compiled_css = {};
  t.compiled_click_event = [];

  // implement function of core helpers
  var _c = new CoreHelpers();
  for(var _func in _c){
    t[_func] = _c[_func];
  }

  t.default_style_obj = {};

  t.default_style_obj["position"] = "absolute";

  if(this.type === "object_frame"){
    t.default_style_obj["width"] = "auto";
    t.default_style_obj["height"] = "auto";
    t.default_style_obj["backgroundColor"] = "transparent";
  }else if(this.type === "object_youtube"){
    t.default_style_obj["width"] = "560px";
    t.default_style_obj["height"] = "315px";
    t.src = json_obj["src"];
  }else if(this.type === "object_image"){
    t.src = json_obj["src"];
    t.default_style_obj["width"] = "auto";
    t.default_style_obj["height"] = "auto";
  }else{
    t.default_style_obj["width"] = t.default.width;
    t.default_style_obj["height"] = t.default.height;
    t.default_style_obj["radius"] = t.default.radius;
    t.default_style_obj["backgroundColor"] = t.default.backgroundColor;
  }
}
// push group_name to object.groups if group_name is not added.
// else, neglect and do nothing
CompiledObject.prototype.addGroupName = function(group_name){
  var t = this;
  var _groups = t.groups;
  var addedFlag = false;
  for(var i = 0;i < _groups.length;i++){
    if(_groups[i] == group_name){
      addedFlag = true;
      break;
    }
  }
  if(!addedFlag){
    t.groups.push(group_name);
  }
}
CompiledObject.prototype.compile = function(){
  // compile characteristics(JSON language) to css
  var t = this;
  t.compiled_css = t.compileStyle(t.characteristics);
}

CompiledObject.prototype.compileStyle = function(characteristics){
  var t = this;
  var results = {};

  if(typeof characteristics === "undefined"){
    return results;
  }

  // copy default to results
  for(var attr in this.default_style_obj){
    results[attr] = this.default_style_obj[attr];
  }
  if(t.hasAttr(characteristics,"color")){
    results["backgroundColor"] = characteristics["color"];
  }
  if(t.hasAttr(characteristics,"height")){
    results["height"] = characteristics["height"];
  }
  if(t.hasAttr(characteristics,"width")){
    results["width"] = characteristics["width"];
  }
  if(t.hasAttr(characteristics,"length")){
    results["width"] = characteristics["length"];
  }
  if(t.hasAttr(characteristics,"radius")){
    results["radius"] = characteristics["radius"];
  }
  if(t.hasAttr(characteristics,"x")){
    results["left"] = characteristics["x"];
  }
  if(t.hasAttr(characteristics,"y")){
    results["top"] = characteristics["y"];
  }
  if(t.hasAttr(characteristics,"z")){
    results["zIndex"] = characteristics["z"];
  }
  if(t.hasAttr(characteristics,"rotate")){
    results["transform"] = "rotate("+characteristics["rotate"]+")";
  }
  if(t.hasAttr(characteristics,"display")){
    results["display"] = characteristics["display"];
  }
  if(t.hasAttr(characteristics,"opacity")){
    results["opacity"] = characteristics["opacity"];
  }
  if(t.hasAttr(characteristics,"fullScreen")){
    if(characteristics["fullScreen"] == "true" || characteristics["fullScreen"]){
      var w  = window.innerWidth || document.documentElement.clientWidth,
      h = window.innerHeight || document.documentElement.clientHeight;
      results["left"] = "0px";
      results["top"] = "0px";
      results["width"] = w + "px";
      results["height"] = h + "px";
    }
  }
  if(t.hasAttr(characteristics,"text")){

    results["text"] = characteristics["text"];
    // only available if text characteristics is exists
    if(t.hasAttr(characteristics,"fontSize")){
      results["fontSize"] = characteristics["fontSize"];
    }
    if(t.hasAttr(characteristics,"fontColor")){
      results["color"] = characteristics["fontColor"];
    }
    if(t.hasAttr(characteristics,"textAlign")){
      // translate language to css
      if(characteristics["textAlign"] == "middle"){characteristics["textAlign"] = "center";}
      results["textAlign"] = characteristics["textAlign"]; 
    }
    if(t.hasAttr(characteristics,"verticalAlign")){
      if(characteristics["textAlign"] == "center"){characteristics["textAlign"] = "middle";}
      results["verticalAlign"] = characteristics["verticalAlign"];
      results["lineHeight"] = results["height"];
      results["display"] = "block";
    }
  }
  if(t.hasAttr(characteristics,"shape")){
    if(characteristics["shape"] === "triangle"){
      var _h =  t.splitNumberAndUnit(results["height"]);
      var _w =  t.splitNumberAndUnit(results["width"]);
      var _bg = results["backgroundColor"];

      results["width"] = "0";
      results["height"] = "0";
      results["backgroundColor"] = "transparent";
      results["borderLeft"] =(_w.value/2) +_w.unit+" solid transparent";
      results["borderRight"] =(_w.value/2) +_w.unit+" solid transparent";
      results["borderBottom"]= _h.value +_h.unit+" solid "+ _bg;
    }else if(characteristics["shape"] === "circle"){
      var _r =  t.splitNumberAndUnit(results["radius"]);
      results["webkitBorderRadius"] = _r.value + _r.unit;
      results["borderRadius"] = _r.value + _r.unit;
      results["width"] = (_r.value*2) + _r.unit;
      results["height"] = (_r.value*2) + _r.unit;
    }
  }
  return results;
}
CompiledObject.prototype.hasAttr = function(compiler_obj, attr){
  return (typeof compiler_obj[attr] !== "undefined");
}

CompiledAnimation.prototype.initial = function(json_anim, compiled_animation_name, target_animation_element) {
  // ユーザが定義したキーフレームの名前
  this.original_keyframe_name = json_anim["name"];
  this.type = json_anim["type"];

  // animation object in json form
  this.target_element_animation_in_json = json_anim["animate"];

  // コンパイルしてから、わかる値になる。
  // コンパイル用のユニークなコンパイル名
  this.compiled_name = compiled_animation_name;

  // targetElement
  this.target_element = target_animation_element;
}

CompiledAnimation.prototype.compile = function() {
  var t = this;

  var temp_animations = {};
  for(var timing in t.target_element_animation_in_json){
    
    // 
    var temp_in_characteristics = {};
    for(var characteristic in t.target_element.characteristics){
      temp_in_characteristics[characteristic] = t.target_element.characteristics[characteristic];
    }
    for(var characteristic in t.target_element_animation_in_json[timing]){
      temp_in_characteristics[characteristic] =  t.target_element_animation_in_json[timing][characteristic];
    }
    
    // 
    var temp_in_css = {};
    var style_after_compiled = t.target_element.compileStyle(temp_in_characteristics);
    for(var css in style_after_compiled){
      css_in_key = css.replace(/([A-Z])/,function(matches){
        return "-"+matches.toLowerCase();
      });
      temp_in_css[css_in_key] = style_after_compiled[css];
    }
    temp_animations[timing] = temp_in_css;
  }

  t.compiled_animation = temp_animations;

}

ParsingEngine.prototype.initial = function() {
  this.compiled_objects = [];
  this.compiled_keyframes = [];

  // For checkingGrammer function to checking either name is unique or not.
  this.name_used_list = [];

  // For object_frame, use clearInterval to clear all interval function stored in 
  // intervalFunctionList and then update again
  this.intervalFunctionList = [];

  // For generateUniqueKeyFrameId function to generate unique keyframe name
  this.compile_index = 1;
  CompiledObject.prototype.default = this.default;

}

// make sure t
ParsingEngine.prototype.generateUniqueString = function() {
  var t = this;
  if(typeof t.history_unique_string_generated === "undefined"){
    t.history_unique_string_generated = [];
  }
  var rst = t.generateRandomString();
  var foundFlag = false;
  var initialFlag = true;
  for(var try_index = 0;(try_index < 3 && foundFlag) || initialFlag; try_index++){
    foundFlag = false;
    if(initialFlag){
      initialFlag = false;
    }
    for(var i = 0;i<t.history_unique_string_generated.length;i++){
      if(t.history_unique_string_generated[i] === rst){
        rst = t.generateRandomString();
        foundFlag = true;
        break;
      }
    }
  }

  if(t.history_unique_string_generated.length >= 3){
    for(var j = t.history_unique_string_generated.length-1;j>0;j--){
      t.history_unique_string_generated[j] = t.history_unique_string_generated[j-1];
    }
    t.history_unique_string_generated[0] = rst;
  }else{
    t.history_unique_string_generated.push(rst);
  }

  return rst;
}

// generate random String
ParsingEngine.prototype.generateRandomString = function() {
  var length = 50;
  var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
}

// There are two use in styling() function, RETRIEVE or SET value
// styling can used to RETRIEVE the element style value or
// 
ParsingEngine.prototype.styling = function (ele, css_key, css_value){

  // if css_value is not defined, return value
  // else set css_value
  if(typeof css_value === "undefined"){
    if(css_key === "height"){
      return ele.offsetHeight;
    }else if(css_key === "width"){
      return ele.offsetWidth;
    }else if(css.key === "text"){
      return ele.innerHTML;
    }
    return ele.style[css_key];
  }

  // set css_value if css_value is defined.
  if(css_key === "text"){
    ele.innerHTML = css_value;
  }else{
    ele.style[css_key] = css_value;
  }
}

// find the compiler from 
ParsingEngine.prototype.findCompilerByName = function(name){
  for(var i = 0; i < this.compiled_objects.length; i++){
    if(this.compiled_objects[i]["name"] === name){
      return this.compiled_objects[i];
    }
  }
}
ParsingEngine.prototype.findJsonAnimByName = function(json_anims, name) {
  for (var i = 0; i < json_anims.length; i++) {
    var ani = json_anims[i];
    if(ani["name"] === name){
      return ani;
    }
  }
  return null;
}

ParsingEngine.prototype.compileClickEventAndAnimation = function(json_anims) {
  var t = this;

  for (var compiled_item_index = 0; compiled_item_index < t.compiled_objects.length; compiled_item_index++) {
    var obj = t.compiled_objects[compiled_item_index];

    var click_event = obj.click_event;
    if(click_event != null){
      for (var i = 0; i < click_event.length; i++) {

        var compiledResults = t.compileClickEvent(obj,click_event[i]);
        // after click event is compiled, create animation for every click event
        for (var j = 0; j < compiledResults.length; j++) {
          var uid = t.generateUniqueKeyFrameId(compiledResults[j].name,compiledResults[j].animation);
          var json_anim = t.findJsonAnimByName(json_anims,compiledResults[j].animation);
          
          if(json_anim == null){
            console.log(compiledResults[j]);
            console.error("json animation is not found. ANIMATION_NAME: "+compiledResults[j].animation);
          }else{
            var target_object = t.findCompilerByName(compiledResults[j].name);

            // construct compiled_animation
            var compiled_anim = new CompiledAnimation(json_anim, uid, target_object);
            compiled_anim.compile();
            t.compiled_keyframes.push(compiled_anim);
            

            // after compiled_animation is constructed. Assign uid to animation attribute to overwrite animation attribute.
            // Reason is animation attribute will be used for construct native JavaScript click event animation 
            // and it must be unique for different element, action and animation
            compiledResults[j]["animation"] = uid;
            obj.compiled_click_event.push(compiledResults[j]);

          }
        }
      }

    }
  }
}

ParsingEngine.prototype.generateUniqueKeyFrameId = function(compiler_obj_name, animate_name) {
  this.compile_index += 1;
  return compiler_obj_name + "_" + animate_name + "_" + this.compile_index;
}

// Checking and correct the language for compiler_click_event
// ParsingEngine.prototype.compileClickEvent is assist function of compiled_objects
ParsingEngine.prototype.compileClickEvent = function(compiler_obj,click_event){
  var target_compilers = [];
console.log(click_event);
  
  // "target_compilers" are the items ready for click event.
  //
  // first, if there is specified in object, add object into target_compilers
  if(typeof click_event["object"] !== "undefined"){
    var temp_obj = this.findCompilerByName(click_event["object"]);
    if(temp_obj != null){
      target_compilers.push(temp_obj);  
    }else{
      console.error("Unable to find the object by name \""+click_event["object"]+"\" in \""+compiler_obj["name"]+"\" click event.");
    }
  }

  // then, if there is any specified in group, add group into target_compilers
  if(typeof click_event["group"] !== "undefined"){
    var temp_objs = this.findObjectsByGroupName(click_event["group"]);
    for(var i =0;i<temp_objs.length;i++){
      target_compilers.push(temp_objs[i]);
    }
  }

  // "target_compilers" are the items ready for click event.
  //
  // if target_compilers is empty OR
  // if there is no specified by user, push compiler_obj(object when clicked) into target_compilers
  if(target_compilers.length == 0){
    target_compilers.push(compiler_obj);
  }


  var results = [];
  for(var k=0;k<target_compilers.length;k++){
    var temp_obj = {};
    for(var key in click_event){
      temp_obj[key] = click_event[key];
    }
    temp_obj["name"] = target_compilers[k]["name"];  
    results.push(temp_obj);

  }
  
  return results;
}


ParsingEngine.prototype.findObjectsByGroupName = function(name) {
  var rst = [];
  for (var i = 0; i < this.compiled_objects.length; i++) {
    var _obj = this.compiled_objects[i];

    if(_obj["groups"].length > 0){
      var _foundFlag = false;
      for(var j = 0;j < !_foundFlag && _obj["groups"].length;j++){
        if(_obj["groups"][j] === name){
          rst.push(_obj);
          _foundFlag = true;
          break;
        }
      }
    }
  }
  
  return rst;
}

// ParsingEngine.prototype.generateKeyFrameRuleId = function() {
//   if(typeof this.currentKeyFrameIndex === "undefined"){
//     this.currentKeyFrameIndex = 1;
//   }
//   var s = "00000" + this.currentKeyFrameIndex;
//   var len = this.currentKeyFrameIndex.toString().length;
//   return "anim"+s.substr(len, s.length - len);
// }

// Checks to see if the specified rule is within 
// any of the stylesheets found in the document;
// returns the animation object if so
ParsingEngine.prototype.findKeyframesRule = function(rule) {
  var ss = document.styleSheets;
  for (var i = 0; i < ss.length; ++i) {
    for (var j = 0; j < ss[i].cssRules.length; ++j) {
      if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) { return ss[i].cssRules[j]; }
    }
  }
  return null;
}

// find compiled keyframe by given compiled_name in 1st paramter
// compiler keyframe is not in form of css3 but in form of objects in compiler_obj
ParsingEngine.prototype.findCompiledKeyFrameByCompiledName = function(compiledAnimationName){
  for(var i = 0; i < this.compiled_keyframes.length; i++){
    if(this.compiled_keyframes[i]["compiled_name"] === compiledAnimationName){
      return this.compiled_keyframes[i];
    }
  }
  return null;
}


// find compiled keyframe by given id in 1st paramter
// compiler keyframe is not in form of css3 but in form of objects in compiler_obj
ParsingEngine.prototype.findCompiledKeyFrameById = function(keyFrameId){
  for(var i = 0; i < this.compiled_keyframes.length; i++){
    if(this.compiled_keyframes[i]["name"] === keyFrameId){
      return this.compiled_keyframes[i];
    }
  }
  return null;
}
// create or update div element based on compiler_obj
ParsingEngine.prototype.compileElement = function(compiler_obj, ele){

  var t = this;

  // write compiler_obj["name"] to element id
  ele.id = compiler_obj["name"];

  // write compiler_obj["compiled_css"] to element css
  for (var css in compiler_obj["compiled_css"]) {
    t.styling(ele,css,compiler_obj["compiled_css"][css]);
  };

  // write compiler_obj["group"] to element class name
  var _group = "";
  for (var i = 0; i < compiler_obj["groups"].length; i++) {
    _group += compiler_obj["groups"][i];
  };
  ele.className = _group;

  // write compiler_obj["click"] to element onclick
  var _click_event_manager = [];
  var _compiled_click_event = compiler_obj["compiled_click_event"];
  for(var i = 0; i < _compiled_click_event.length;i++){
    var _event_assistance = {};
    var _name = _compiled_click_event[i]["name"];
    var _click_event = {};
    var retain_animation_flag = false;

    // initialize compiler_obj
    _click_event["animationDuration"] = t.default["animeDuration"];
    _click_event["webkitAnimationDuration"] = t.default["animeDuration"];

    for(var eve in _compiled_click_event[i]){
      if(eve === "animation"){
        _click_event["animationName"] = _compiled_click_event[i][eve];
        _click_event["webkitAnimationName"] = _compiled_click_event[i][eve];
      }else if(eve === "animationDuration"){
        _click_event["animationDuration"] = _compiled_click_event[i][eve];
        _click_event["webkitAnimationDuration"] = _compiled_click_event[i][eve];
      }else if(eve === "retainStyleAfterAnimation"){
        retain_animation_flag = (_compiled_click_event[i][eve] === "true");
      }
    }

    _event_assistance["name"] = _name;
    _event_assistance["retain_style_after_animation"] = retain_animation_flag;
    _event_assistance["action"] = _click_event;
    _click_event_manager.push(_event_assistance);
  }
  
  
  // write special object such as object_frame, object_youtube
  t.compileSpecialObjectElement(compiler_obj,ele);



  ele.onclick = function(){
    for(var j=0;j< _click_event_manager.length;j++){
      var ele_first=document.getElementById(_click_event_manager[j]["name"]);

      for(var _event in _click_event_manager[j]["action"]){
        ele_first.style[_event] = "";
      }
      if(_click_event_manager[j]["retain_style_after_animation"]){
        var transitionEndHandler = function(event){
          event.stopPropagation();
          
          var ele_animation = e.findCompiledKeyFrameByCompiledName(event.target.style.animationName);
          
          var target_object = ele_animation["target_element"];
          for(var attr in ele_animation["target_element_animation_in_json"]["100%"]){
            target_object["characteristics"][attr] = ele_animation["target_element_animation_in_json"]["100%"][attr];
          }
          target_object.compile();
          
          // after compile, write result into css
          for(var attr in target_object["compiled_css"]){
            target_object["element"]["style"][attr] = target_object["compiled_css"][attr];
          }
        };

        ele_first.addEventListener('oanimationend',transitionEndHandler,false);
        ele_first.addEventListener('animationend',transitionEndHandler,false);
        ele_first.addEventListener('webkitAnimationEnd',transitionEndHandler,false);
      }
    }

    setTimeout(function(){
      for(var j =0; j < _click_event_manager.length;j++){
        var ele_second=document.getElementById(_click_event_manager[j]["name"]);
        for(var _event in _click_event_manager[j]["action"]){
          ele_second.style[_event] = _click_event_manager[j]["action"][_event];
        }
      }
    },100);
  }
}

// if current object_type belong to CopmiledObject, return true
// else return false
ParsingEngine.prototype.isObjectType = function(obj_type) {
  var available_types = ["object","object_frame","object_youtube","object_image"];
  for(var i = 0;i < available_types.length;i++){
    if(available_types[i] === obj_type){
      return true;
    }
  }
  return false;
}

// if 
ParsingEngine.prototype.compileSpecialObjectElement = function(compiler_obj,ele) {
  if(compiler_obj["type"] === "object_frame"){
    var key = this.generateUniqueString();
    var frames = compiler_obj["frames"];
    var imgTag = ele;
    var __f = new FrameHelper(key, frames, imgTag);
    var __interval = setInterval(function(){__f.intervalFunct();} , compiler_obj["frameDuration"]);
    this.intervalFunctionList.push(__interval);
  }else if(compiler_obj["type"] === "object_youtube"){
    ele.src = this.convertYoutubeUrl(compiler_obj["src"]);
    ele.setAttribute("frameborder","0");
    ele.setAttribute("allowfullscreen","");
  }else if(compiler_obj["type"] === "object_image"){
    ele.src = compiler_obj["src"];
  }
}

ParsingEngine.prototype.convertYoutubeUrl = function(share_link) {
  // http://youtu.be/v0NPy9e2Jnc?list=FL2lSWC08hvjkKxWzQWeVQNA

  return share_link.replace("http://youtu.be/","http://www.youtube.com/embed/");
}

// Last step of compiling.
// convert compiled_obj, compiled_items to HTML, JavaScript, and CSS
ParsingEngine.prototype.writeDocuments = function() {

  // write compiled_keyframes to style tag
  var keyframe_prefix = ["@-webkit-keyframes","@keyframes"];
  
  var system_style_id = "system_style_id";
  var eleStyle = document.getElementById(system_style_id);
  if(!eleStyle){
    eleStyle = document.createElement("style");
    eleStyle.id=system_style_id;
    document.body.appendChild(eleStyle);
  }
  eleStyle.innerHTML = "";
  for(var i = 0;i < this.compiled_keyframes.length; i++){
    var temp_rule = "";
    for(var j = 0; j < keyframe_prefix.length;j++){
      temp_rule += keyframe_prefix[j]+" "+ this.compiled_keyframes[i]["compiled_name"] +" {"
      for(var timing in this.compiled_keyframes[i]["compiled_animation"]){
        temp_rule += timing+"{";
        for(var css in this.compiled_keyframes[i]["compiled_animation"][timing]){
          temp_rule += css + ":" + this.compiled_keyframes[i]["compiled_animation"][timing][css]+";";
        }
        temp_rule += "}";
      }
      temp_rule += "}";
    }
    eleStyle.innerHTML += temp_rule;
  }
  

  // Write compiler object to html element
  for(var i = 0; i < this.compiled_objects.length;i++){
    // create element
    this.compiled_objects[i]["element"] = document.getElementById(this.compiled_objects[i]["name"]);
    var ele = this.compiled_objects[i]["element"];
    
    if(this.compiled_objects[i]["element"] == null){
      if(this.compiled_objects[i]["type"] == "object_frame" || this.compiled_objects[i]["type"] == "object_image"){
        ele = document.createElement('img');
      }else if(this.compiled_objects[i]["type"] == "object_youtube"){
        ele = document.createElement('iframe');
      }else{
        ele = document.createElement('div');
      }
      document.body.appendChild(ele);
    }
    this.compileElement(this.compiled_objects[i],ele);
  }
}

// 
ParsingEngine.prototype.parseToCompilerKeyFrame = function(index){

  var compiler_obj = this.compiled_keyframes[index];

  var compiler_kf = {name:compiler_obj["name"]};
  var temp_animations = {};
  for(var timing in compiler_obj["animate"]){
    var temp_in_timing = {};
    var temp_in_css = {};
    temp_in_timing[timing] = [];
    
    // var style_after_parsed = {};
    var style_after_parsed = e.parseStyle(compiler_obj["animate"][timing], false);
    for(var css in style_after_parsed){
      css_in_key = css.replace(/([A-Z])/,function(matches){
        return "-"+matches.toLowerCase();
      });
      temp_in_css[css_in_key] = style_after_parsed[css];
    }
    temp_animations[timing] = temp_in_css;
  }
  compiler_kf["animation"] = temp_animations;

  this.compiled_keyframes[index] = compiler_kf;
}

// checking if grammer compulsory attribute is obtain in grammer or not
// 
// Grammar checking including compulsory attribute of object and "name" attribute must be unique
// 1. object["type"] is required
// 2. object["name"] is required
// 3. object["name"] must be unique
// 
// and compulsory attribute for animation object
// 4. object["type"]["animate"] is required
ParsingEngine.prototype.checkingGrammer = function(json_obj){
  if(typeof json_obj["type"] === "undefined"){
    if(typeof json_obj["name"] === "undefined"){
      throw "Object[\"name\"] and Object[\"type\"] both are missing.";
    }else{
      throw "Object[\"type\"] is missing in Object: "+json_obj["name"];
    }
  }

  var isUniqueFlag = true;
  var chk=0;
  for(;chk<this.name_used_list.length;chk++){
    if(this.name_used_list[chk] == json_obj["name"]){
      isUniqueFlag = false;
      break;
    }
  }
  this.name_used_list[chk] = json_obj["name"];
  if(!isUniqueFlag){
    throw "Object[\"name\"] must be unique. Duplicated Name :"+json_obj["name"];
  }

  if(json_obj["type"] === "animation"){
    if(typeof json_obj["animate"] === "undefined"){
      // obj["animate"] is compulsory layer 1 
      // if there is no animate attribute found in layer 1, error will be thrown
      throw "Object[\"animate\"] is missing in object \""+json_obj["name"]+"\"";
    }
  }else if(json_obj["type"] === "object_frame") {
    if(typeof json_obj["frames"] === "undefined"){
      // obj["frames"] is compulsory layer 1 for object_frame
      // if there is no frames attribute found in layer 1, error will be thrown 
      throw "Object[\"frames\"] is missing in object \""+json_obj["name"]+"\"";
    }else{
      // Due to multiple frame in single document, my_array instanceof Array is unable to checking either my_array is Array or not.
      // Solution on this problem can be solved by Object.prototype.toString.call(temp_json_click) === '[object Array]')
      //
      // for more details ... 
      // http://stackoverflow.com/a/6473338/1799322
      if(Object.prototype.toString.call(json_obj["frames"]) !== '[object Array]'){
        // obj["frames"] must be array, check if object or Array
        throw "Replace code with Object branket {} to Array branket [], example) Object[\"frames\"]={...} to Object[\"frames\"]=[...]";
      }
    }
  }else if(json_obj["type"] === "object_youtube") {
    if(typeof json_obj["src"] === "undefined"){
      // obj["src"] is compulsory layer 1 for object_youtube
      // if there is no src attribute found in layer 1, error will be thrown 
      throw "Object[\"src\"] is missing in object \""+json_obj["name"]+"\"";
    }
  }else if(json_obj["type"] === "object_image") {
    if(typeof json_obj["src"] === "undefined"){
      // obj["src"] is compulsory layer 1 for object_image
      // if there is no src attribute found in layer 1, error will be thrown 
      throw "Object[\"src\"] is missing in object \""+json_obj["name"]+"\"";
    }
  }
}

// call this method when json data is changed, 
// pass json data to 1st parameter
ParsingEngine.prototype.updateElement = function(data) {

  console.log(this.intervalFunctionList);
  for(var i = 0;i<this.intervalFunctionList.length;i++){
    clearInterval(this.intervalFunctionList[i]);
  }
  this.intervalFunctionList = [];

  var json_anims = [];

  // compile layer 1
  for (var data_index = 0; data_index < data.length; data_index++) {
    var json_obj = data[data_index];

    try{
      // if failed, exception will be thrown
      // if there is no exception is thrown in this function, it means
      // there is no grammar mistake in json file
      this.checkingGrammer(json_obj);

      if(this.isObjectType(json_obj["type"])){
        // compile object
        var compiled_obj = new CompiledObject(json_obj);
        this.compiled_objects.push(compiled_obj);  
      }else if(json_obj["type"] === "animation"){
        // compile keyframe
        // var compiled_kf = new CompiledAnimation(json_obj);
        // e.compiled_keyframes.push(compiled_kf);
        json_anims.push(json_obj);
      }
      
    }catch(err){
      console.error(err);
    }
  }

  // After compiled layer 1, compile layer 2, 3 ....
  // compile objects
  for (var compiled_item_index = 0; compiled_item_index < this.compiled_objects.length; compiled_item_index++) {
    this.compiled_objects[compiled_item_index].compile();
  }

  // compile action, such as click,hover,
  this.compileClickEventAndAnimation(json_anims);
  
  
  // last step of compiling
  // convert compiled_keyframes, compiled_objs, all kinds of compiled items to HTML, JavaScript and CSS
  this.writeDocuments();
}
