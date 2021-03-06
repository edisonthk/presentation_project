var Selector = function(elementID){
	this.setSelector(elementID);
	this.hide();
	this.selected_element = null;
};

Selector.prototype.setSelector = function(elementID){
	this.element = document.getElementById(elementID);
}

Selector.prototype.getSelector = function() {
	return this.element;
}

Selector.prototype.show = function() {
	this.element.style.display = "block";
}

Selector.prototype.hide = function() {
	this.element.style.display = "none";
}

Selector.prototype.getSelectedElement = function() {
	return this.selected_element;
}

Selector.prototype.selectElement = function(event) {
	this.show();
	this.selected_element = event.target;
	this.moveToSelectedElement(event.target);
}
Selector.prototype.moveToSelectedElement = function(targetElement) {
	if(typeof targetElement === "string"){
		targetElement = document.getElementById(targetElement);
	}

	var clickedElement = targetElement;
	var clickedElementHeight =  targetElement.offsetHeight;
	var clickedElementWidth = targetElement.offsetWidth;
	var clickedElementTop = targetElement.style.top;
	var clickedElementLeft = targetElement.style.left;

	// change selector size
	this.element.style.width = clickedElementWidth + "px";
	this.element.style.height =  clickedElementHeight+ "px";

	// move selector
	this.element.style.top = clickedElementTop;
	this.element.style.left = clickedElementLeft;

	// assign selected element

	targetElement.addEventListener("")
}
Selector.prototype.getSelectedElementId = function(){
	return this.selected_element.id;
}