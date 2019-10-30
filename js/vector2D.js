
var NULL_VECTOR2D = new Vector2D(0.0, 0.0);

function Vector2D(x, y) {
	this.x = x;
	this.y = y;
}

Vector2D.prototype.add = function(value) {
	this.x += value;
	this.y += value;
};

Vector2D.prototype.addVector = function(target) {
	this.x += target.x;
	this.y += target.y;
};

Vector2D.prototype.subVector = function(target) {
	this.x -= target.x;
	this.y -= target.y;
};

Vector2D.prototype.mul = function(value) {
	this.x *= value;
	this.y *= value;
};

Vector2D.prototype.mulVector = function(target) {
	this.x *= target.x;
	this.y *= target.y;
};

Vector2D.prototype.div = function(value) {
	this.x /= value;
	this.y /= value;
};

Vector2D.prototype.divVector = function(target) {
	this.x /= target.x;
	this.y /= target.y;
};

Vector2D.prototype.getLength = function(target) {
	return Math.sqrt(Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2));
};

Vector2D.prototype.getMag = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2D.prototype.getNormalizeVector = function() {
	var length = this.getMag();
	if (length <= 0)
		return NULL_VECTOR2D;
	
	return new Vector2D(this.x / length, this.y / length);
};

Vector2D.prototype.getVectorFromPoints = function(target) {
	return new Vector2D(this.x - target.x, this.y - target.y);
};