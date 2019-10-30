
var food = [];
var Game = {
	camera: new Vector2D(0, 0),
	max: new Vector2D(8000, 8000),
	canvas: document.getElementById("canvas"),
	ctx: this.canvas.getContext("2d"),
	
	start: function() {
		alert("game start");
		
		this.interval = setInterval(this.draw, 1 / 60);
		
		window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
		
		player = new Player();
		for (var i = 1; i <= 500; i++)
		{
			food.push(new Food());
		}
	},
	
	update: function() {
		
		if (Math.floor(Math.random() * 25) == 4)
			food.push(new Food());
		
		player.size -= 0.005;
		for (var i = 0; i < food.length; i++)
		{ 
			if (food[i].isVisible == false)
				continue;
			
			var length = player.origin.getLength(food[i].origin);
			if (length <= player.size + food[i].size + 35)
			{
				var vector = player.origin.getVectorFromPoints(food[i].origin);
				
				vector = vector.getNormalizeVector();
				
				food[i].origin.addVector(vector);
			}
			if (length <= player.size + food[i].size)
			{
				player.size += 1;
				food.splice(i, 1);
			}
		}
		
		this.camera.x = player.origin.x - (canvas.width / 2);
		this.camera.y = player.origin.y - (canvas.height / 2);
	},
	
	draw: function() {
		Game.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		Game.update();
		player.updateMovement();
		
		player.draw();
		
		for (var i = 0; i < food.length; i++)
		{
			food[i].draw();
		}
	}
};