
var Music = {
	path: "Unknown",
	
	play: function() {
		Music.path.play();
	},
	
	stop: function() {
		Music.path.pause();
		Music.path.currentTime = 0;
	},
	
	pause: function() {
		Music.path.pause();
	}
};

