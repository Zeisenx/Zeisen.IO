
var player;

function Player() {
	this.origin = 		new Vector2D(500, 500);
	this.size =			20;
	this.color = 		"#ff0000";
	this.outlineColor = "#00ff00";
}
	
Player.prototype.updateMovement = function() {
	if (Key.isDown(Key.LEFT))
		this.moveLeft();
	if (Key.isDown(Key.RIGHT))
		this.moveRight();
	if (Key.isDown(Key.UP))
		this.moveUp();
	if (Key.isDown(Key.DOWN))
		this.moveDown();
};

Player.prototype.draw = function() {
	Game.ctx.beginPath();
	Game.ctx.arc(player.origin.x - Game.camera.x, player.origin.y - Game.camera.y, player.size, player.size, Math.PI*2, true);
	Game.ctx.fillStyle = player.color;
	Game.ctx.fill();
	Game.ctx.closePath();
	
	Game.ctx.beginPath();
	Game.ctx.arc(player.origin.x - Game.camera.x, player.origin.y - Game.camera.y, player.size, player.size, Math.PI*2, true);
	Game.ctx.strokeStyle = player.outlineColor;
	Game.ctx.stroke();
	Game.ctx.closePath();
};

Player.prototype.moveLeft = function() { 
	this.origin.x -= 1;
};

Player.prototype.moveRight = function() {
	this.origin.x += 1;
};

Player.prototype.moveUp = function() {
	this.origin.y -= 1;
};

Player.prototype.moveDown = function() {
	this.origin.y += 1;
};
