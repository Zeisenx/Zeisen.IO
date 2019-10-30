
function Food() {
	this.origin = 		new Vector2D(Math.random() * (Game.max.x + 1), Math.random() * (Game.max.y + 1));
	this.size =			5;
	this.color = 		"rgba(255, 255, 255, 1.0)";
	this.isVisible =	true;
}

Food.prototype.onUpdate = function() {
	if (this.isVisible == false)
		return;
};

Food.prototype.draw = function() { 
	if (this.isVisible == false)
		return;
		
	var camera = Manager.getCameraView();

	Game.ctx.beginPath();
	Game.ctx.arc(this.origin.x - camera.x, this.origin.y - camera.y, this.size, this.size, Math.PI*2, true);
	Game.ctx.fillStyle = this.color;
	Game.ctx.fill();
	Game.ctx.closePath();
};
