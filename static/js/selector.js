var Selector = function(elementID){
	this.setElements(elementID);
};

Selector.prototype.setElement = function(elementID){
	this.element = document.getElementById(elementID);
}

Selector.prototype.getElement = function() {
	return this.element;
}

Selector.prototype.show = function() {
	this.element.style.display = "block";
}

Selector.prototype.hide = function() {
	this.element.style.display = "none";
}

Selector.prototype.moveToClickedElement = function (targetElementID) {
	var clickedElement = document.getElementById(targetElementID);
	var clickedElementHeight = 
	var clickedElementWidth = 

	// move selector
	this.element.style.top = "px";
	this.element.style.left = "px";
}

