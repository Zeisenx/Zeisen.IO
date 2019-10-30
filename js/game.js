
var GameState =
{
	UNKNOWN : 0,
	IN_MENU : 1,
	IN_GAME : 2, 
	GAME_END : 3,
}; 

var Game = {
	camera: new Vector2D(0, 0),
	max: new Vector2D(5000, 5000),
	canvas: document.getElementById("canvas"),
	ctx: this.canvas.getContext("2d"),
	state: GameState.IN_GAME,
	IsDemo: false,
	food: [],
	players: [],
	mainPlayer: -1,
	mainPlayerColor: "red",
	
	start: function() {
		alert("game start");
		
		Music.stop();
		Music.path = new Audio("etc_src/music/Interloper.mp3");
		Music.path.volume = 1.0;
		Music.play();
		
		Game.isDemo = false;
		Game.state = GameState.IN_GAME;
		Game.interval = setInterval(Game.draw, 1 / 60);
		
		Game.mainPlayer = this.players.length;
		this.players.push(new Player());
		Game.players[Game.mainPlayer].color = Game.mainPlayerColor;
		Game.players[Game.mainPlayer].index = Game.players.length - 1;
		
		for (var i = 1; i <= 7; i++)
		{
			Game.players.push(new Player());
			Game.players[Game.players.length - 1].color = "rgba("+getRandomInt(0, 255)+", "+getRandomInt(0, 255)+", "+getRandomInt(0, 255)+", 1.0)";
			Game.players[Game.players.length - 1].origin.x = getRandomInt(0, Game.max.x);
			Game.players[Game.players.length - 1].origin.y = getRandomInt(0, Game.max.y);
			Game.players[Game.players.length - 1].isAI = true;
			Game.players[Game.players.length - 1].index = Game.players.length - 1;
		}
		
		for (var i = 1; i <= 2000; i++)
			this.food.push(new Food());
	},
	
	stop: function() {
		Game.players = [];
		Game.food = [];
		
		clearInterval(Game.interval);
	},
	
	update: function() {
		
		if (Math.floor(Math.random() * 25) == 4)
			this.food.push(new Food());
		
		for (var i = 0; i < this.players.length; i++)
		{
			this.players[i].onUpdate();
			this.players[i].updateMovement();
			
			if (i == Game.mainPlayer && Game.players[i].size <= 0.0)
			{
				Game.state = GameState.GAME_END;
				
				for (j = 0; j < Game.players.length; j++)
				{
					if (Game.players[j].size > 0.0)
					{
						Game.mainPlayer = j;
						break;
					}
				}
			}
		}
		
		for (var i = 0; i < Game.food.length; i++)
			Game.food[i].onUpdate();
		
		this.camera.x = Game.players[Game.mainPlayer].origin.x - (canvas.width / 2);
		this.camera.y = Game.players[Game.mainPlayer].origin.y - (canvas.height / 2);
	},
	
	draw: function() {
		Game.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// 게임 영역을 그린다.
		Game.ctx.strokeStyle = "#ff0000";
		Game.ctx.rect(0 - Game.camera.x, 0 - Game.camera.y, Game.max.x, Game.max.y);
		Game.ctx.stroke();
		
		Game.update();
		
		var playerList;
		
		for (var i = 0; i < Game.players.length; i++)
			if (Game.players[i].size > 0) Game.players[i].draw();
		
		for (var i = 0; i < Game.food.length; i++)
			Game.food[i].draw();
		
		if (Game.state == GameState.IN_GAME)
		{
			Game.ctx.font = "25px Arial";
			Game.ctx.textAlign = "center";
			Game.ctx.fillStyle = "blue";
			Game.ctx.strokeStyle = "white";
			
			var playerCount = 0;
			playerList = Manager.getPlayerList();
			for (var i = 0; i < playerList.length; i++)
			{
				if (playerList[i].size <= 0.0)
					continue;
				
				playerCount++;
			}
			
			Game.ctx.fillText("남은 플레이어 수 : " + playerCount, Game.canvas.width / 2, 50);
			Game.ctx.strokeText("남은 플레이어 수 : " + playerCount, Game.canvas.width / 2, 50);
			
			Game.ctx.font = "30px Arial";
			Game.ctx.textAlign = "center";
			Game.ctx.fillStyle = "green";
			Game.ctx.strokeStyle = "white";
			Game.ctx.fillText("Press Spacebar to Boost", Game.canvas.width / 2, Game.canvas.height - 50);
			Game.ctx.strokeText("Press Spacebar to Boost", Game.canvas.width / 2, Game.canvas.height - 50);
			
			if (playerCount == 1 && Game.players[Game.mainPlayer].size > 0.0)
			{
				Game.ctx.font = "50px Arial";
				Game.ctx.textAlign = "center";
				Game.ctx.fillStyle = "blue";
				Game.ctx.strokeStyle = "white";
				Game.ctx.fillText("YOU WON", Game.canvas.width / 2, Game.canvas.height / 2);
				Game.ctx.strokeText("YOU WON", Game.canvas.width / 2, Game.canvas.height / 2);
			}
		}
		
		if (Game.state == GameState.GAME_END)
		{
			Game.ctx.font = "30px Arial";
			Game.ctx.textAlign = "center";
			Game.ctx.fillStyle = "red";
			Game.ctx.strokeStyle = "white";
			Game.ctx.fillText("GAME OVER", Game.canvas.width / 2, Game.canvas.height / 2);
			Game.ctx.strokeText("GAME OVER", Game.canvas.width / 2, Game.canvas.height / 2);
		}
	},
};