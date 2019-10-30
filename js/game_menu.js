
var GameMenu = {
	players: [],
	demoPlayer: -1,
	otherPlayers: [],
	food: [],
	camera: new Vector2D(0, 0),
	
	start: function() {
		
		var recentIndex;
		
		Game.isDemo = true;
		Game.state = GameState.IN_MENU;
		Game.stop();
		
		GameMenu.players.push(new Player());
		recentIndex = GameMenu.players.length - 1;
		GameMenu.demoPlayer = recentIndex;
		
		GameMenu.players[recentIndex].isAI = true;
		GameMenu.players[recentIndex].origin.x = 0;
		GameMenu.players[recentIndex].origin.y = 0;
		GameMenu.players[recentIndex].color = "rgba(0, 255, 0, 0.25)";
		
		for (var i = 1; i <= 6; i++)
		{
			GameMenu.players.push(new Player());
			GameMenu.players[recentIndex].origin.x = getRandomInt(0, 1500);
			GameMenu.players[recentIndex].origin.y = getRandomInt(0, 1500);
			GameMenu.players[recentIndex].color = "rgba("+getRandomInt(0, 255)+", "+getRandomInt(0, 255)+", "+getRandomInt(0, 255)+", 0.25)";
		}
		
		for (var i = 1; i <= 2000; i++)
		{
			GameMenu.food.push(new Food());
			GameMenu.food[GameMenu.food.length - 1].color = "rgba(255, 255, 255, 0.25)";
		}
		
		GameMenu.interval = setInterval(GameMenu.draw, 1 / 60);
	},
	
	stop: function() {
		GameMenu.players = [];
		GameMenu.food = [];
		
		clearInterval(GameMenu.interval);
	},
	
	update: function() {
		
		if (Math.floor(Math.random() * 15) == 4)
		{
			GameMenu.food.push(new Food());
			GameMenu.food[GameMenu.food.length - 1].color = "rgba(255, 255, 255, 0.25)";
		}
		
		for (var i = 0; i < GameMenu.players.length; i++)
		{
			GameMenu.players[i].onUpdate();
			GameMenu.players[i].updateMovement();
		}
		
		for (var i = 0; i < GameMenu.food.length; i++)
			GameMenu.food[i].onUpdate();
		
		GameMenu.camera.x = GameMenu.players[GameMenu.demoPlayer].origin.x - (canvas.width / 2);
		GameMenu.camera.y = GameMenu.players[GameMenu.demoPlayer].origin.y - (canvas.height / 2);
	},
	
	draw: function() {
		Game.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// 게임 영역을 그린다.
		Game.ctx.strokeStyle = "#ff0000";
		Game.ctx.rect(0 - Game.camera.x, 0 - Game.camera.y, Game.max.x, Game.max.y);
		Game.ctx.stroke();
		
		GameMenu.update();
		
		for (var i = 0; i < GameMenu.players.length; i++)
			GameMenu.players[i].draw();
		
		for (var i = 0; i < GameMenu.food.length; i++)
			GameMenu.food[i].draw();
		
		Game.ctx.font = "30px Arial";
		Game.ctx.textAlign = "center";
		Game.ctx.fillStyle = "white";
		Game.ctx.fillText("Press Spacebar to start", Game.canvas.width / 2, Game.canvas.height / 2);
		
		Game.ctx.font = "25px Arial";
		Game.ctx.textAlign = "center";
		Game.ctx.fillStyle = Game.mainPlayerColor;
		Game.ctx.fillText("Press Z to change player color", Game.canvas.width / 2, Game.canvas.height - 50);
		
		Game.ctx.font = "45px Arial";
		Game.ctx.textAlign = "center";
		Game.ctx.fillStyle = "white";
		Game.ctx.fillText("HTML Project", Game.canvas.width / 2, 75);
	},
};