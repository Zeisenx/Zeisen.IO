
document.addEventListener("keyup", function(event) {
	if (Game.state == GameState.IN_GAME)
	{
		if (event.keyCode == 32)
			Game.players[Game.mainPlayer].speed = 1.0;
	}
})

document.addEventListener("keydown", function(event) {
	if (Game.state == GameState.IN_GAME)
	{
		if (event.keyCode == 32)
			Game.players[Game.mainPlayer].speed = 1.5;
	}
	if (Game.state == GameState.IN_MENU)
	{
		if (event.keyCode == 90)
		{
			var colorList = ["red", "blue", "green", "violet", "white", "#00ffff"];
			
			Game.mainPlayerColor = colorList[getRandomInt(0, colorList.length)];
			GameMenu.players[GameMenu.demoPlayer].color = Game.mainPlayerColor;
		}
		
		if (event.keyCode == 32)
		{
			GameMenu.stop();
			Game.start();
		}
	}
})