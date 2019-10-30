
var Manager = {
	getCameraView: function() {
		if (Game.state == GameState.IN_MENU)
			return GameMenu.camera;

		if (Game.state == GameState.IN_GAME || Game.state == GameState.GAME_END)
			return Game.camera;
		
		return new Vector2D(0, 0);
	},
	
	getPlayerList: function() {
		if (Game.state == GameState.IN_MENU)
			return [GameMenu.demoPlayer];

		if (Game.state == GameState.IN_GAME || Game.state == GameState.GAME_END)
			return Game.players;
		
		return [];
	},
	
	getFoodList: function() {
		if (Game.state == GameState.IN_MENU)
			return GameMenu.food;

		if (Game.state == GameState.IN_GAME || Game.state == GameState.GAME_END)
			return Game.food;
		
		return [];
	},
	
	refreshPlayerIndex: function() {
		playerList = Manager.getPlayerList();
		for (var i = 0; i < playerList.length; i++)
		{
			playerList[i].index = i;
		}
	}
};