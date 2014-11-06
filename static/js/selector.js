var Selector = function(elementID){
	this.setElement(elementID);
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

Selector.prototype.moveToClickedElement = function(targetElementID, event) {
	var clickedElement = document.getElementById(targetElementID);
	var clickedElementHeight =  (event.offsetY - event.Y);
	var clickedElementWidth = (event.offsetX - event.X);

	// change selector size
	this.element.style.width = event.target.offsetWidth + "px";
	this.element.style.height = event.target.offsetHeight + "px";

	// move selector
	this.element.style.top = clickedElementHeight + "px";
	this.element.style.left = clickedElementWidth + "px";
}

