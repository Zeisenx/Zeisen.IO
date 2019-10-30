
var mouseOrigin = new Vector2D(0, 0);

function Player() {
	this.origin 		= new Vector2D(500, 500);			// 플레이어의 위치
	this.size 			= 20;								// 플레이어의 크기
	this.color 			= "rgba(125, 0, 255, 1.0)";			// 플레이어의 색깔
	this.outlineColor 	= "rgba(255, 255, 255, 0.0)";		// 플레이어의 바깥라인 색깔
	this.isAI 			= false;							// 플레이어가 AI인가?4
	this.speed			= 1.0								// 플레이어의 기본 속도
	this.index			= -1;								// 플레이어의 배열 첨자
}

addEventListener('mousemove', UpdateMouseOrigin, false);

function UpdateMouseOrigin(e) {
	var rect = Game.canvas.getBoundingClientRect();
    mouseOrigin.x = e.pageX - rect.left;
    mouseOrigin.y = e.pageY - rect.top;
}

Player.prototype.onUpdate = function() {
	if (!Game.isDemo)
		this.size -= 0.005 * this.speed;
	
	var playerList = Manager.getPlayerList();
	for (var i = 0; i < playerList.length; i++)
	{
		if (Game.isDemo)
			break;
		
		if (i == this.index)
			continue;
		
		if (playerList[i].size <= 0.0)
			continue;
		
		if (playerList[i].size > this.size)
			continue;
		
		var length = this.origin.getLength(playerList[i].origin);
		if (length <= this.size + playerList[i].size)
		{
			this.size += playerList[i].size;
			playerList[i].size = -1.0;
		}
	}
	
	var foodList = Manager.getFoodList();
	for (var i = 0; i < foodList.length; i++)
	{
		var length = this.origin.getLength(foodList[i].origin);
		if (length <= this.size + foodList[i].size + 35)
		{
			var vector = this.origin.getVectorFromPoints(foodList[i].origin);
			vector = vector.getNormalizeVector();
			foodList[i].origin.addVector(vector);
		}
		
		if (length <= this.size + foodList[i].size)
		{
			this.size += 0.5;
			foodList.splice(i, 1);
		}
	}
};

Player.prototype.updateMovement = function() {
	var vector;
	var speed = this.speed - (this.size * 0.003);
	if (speed < 0.1)
		speed = 0.1;

	if (this.size <= 0.0)
		return;

	if (this.isAI)
	{
		var playerList = Manager.getPlayerList();
		var foodList = Manager.getFoodList();
		
		var camera = Manager.getCameraView();
		
		var targetPlayer = -1;
		var targetFood = -1;
		
		for (var i = 0; i < playerList.length; i++)
		{
			if (Game.isDemo)
				break;
			
			if (playerList[i].size <= 0.0 ||
				i == this.index)
				continue;
				
			if (this.size < playerList[i].size)
				continue;
			
			if (this.origin.getLength(playerList[i].origin) <= (Game.canvas.width + Game.canvas.height) / 2)
				targetPlayer = playerList[i];
		}
		
		for (var i = 0; i < foodList.length; i++)
		{ 
			if (foodList[i].isVisible == false)
				continue;
			
			if (targetFood == -1 ||
				this.origin.getLength(targetFood.origin) > this.origin.getLength(foodList[i].origin))
			{
				targetFood = foodList[i];
			}
		}
		
		if (targetPlayer != -1)
		{
			vector = targetPlayer.origin.getVectorFromPoints(this.origin);
			vector = vector.getNormalizeVector();
			vector.mul(speed);
			this.origin.addVector(vector);
		}
		else if (targetFood != -1)
		{
			targetFood.color = "rgba(255, 0, 0, 1.0)";
			
			Game.ctx.beginPath();
			Game.ctx.moveTo(this.origin.x - camera.x, this.origin.y - camera.y);
			Game.ctx.lineTo(targetFood.origin.x - camera.x, targetFood.origin.y - camera.y);
			Game.ctx.stroke();

			vector = targetFood.origin.getVectorFromPoints(this.origin);
			vector = vector.getNormalizeVector();
			vector.mul(speed);
			this.origin.addVector(vector);
		}
	}
	else
	{
		vector = mouseOrigin.getVectorFromPoints(new Vector2D(Game.canvas.width / 2, Game.canvas.height / 2));
		vector = vector.getNormalizeVector();
		vector.mul(speed);
		this.origin.addVector(vector);
	}
	
	// 플레이어가 바깥에 나가지 않도록 제어한다.
	if (this.origin.x < 0)
		this.origin.x = 0;
	else if (this.origin.x > Game.max.x)
		this.origin.x = Game.max.x;
	if (this.origin.y < 0)
		this.origin.y = 0;
	else if (this.origin.y > Game.max.y)
		this.origin.y = Game.max.y;
};

Player.prototype.draw = function() {
	
	var camera = Manager.getCameraView();
	
	Game.ctx.beginPath();
	Game.ctx.arc(this.origin.x - camera.x, this.origin.y - camera.y, this.size, this.size, Math.PI*2, true);
	Game.ctx.fillStyle = this.color;
	Game.ctx.fill();
	Game.ctx.closePath();
	
	Game.ctx.beginPath();
	Game.ctx.arc(this.origin.x - camera.x, this.origin.y - camera.y, this.size, this.size, Math.PI*2, true);
	Game.ctx.strokeStyle = this.outlineColor;
	Game.ctx.stroke();
	Game.ctx.closePath();
};
