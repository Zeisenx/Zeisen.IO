
function Food() {
	this.origin = 		new Vector2D(Math.random() * (Game.max.x + 1), Math.random() * (Game.max.y + 1));
	this.size =			5;
	this.color = 		"#ffffff";
	this.isVisible =	true;
}

Food.prototype.draw = function() { 
	if (this.isVisible == false)
		return;
		
	Game.ctx.beginPath();
	Game.ctx.arc(this.origin.x - Game.camera.x, this.origin.y - Game.camera.y, this.size, this.size, Math.PI*2, true);
	Game.ctx.fillStyle = this.color;
	Game.ctx.fill();
	Game.ctx.closePath();
};
