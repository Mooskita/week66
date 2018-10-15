var Game = {};
Game.Preloader = function(game) {
    
};

Game.Preloader.prototype.preload = function() {
    /*
    Here you'll load the game assets.
    */
    game.load.spritesheet('ShufflerDude', './assets/ShufflerDude001Dance001.png', 64, 64, 16);
    game.load.spritesheet('FlashTiles', './assets/PHFlashTiles.png', 64, 64, 4);

    game.load.script('tile.js', './js/game/tile.js');
    game.load.script('grid.js', './js/game/grid.js');
    game.load.script('player.js', './js/game/player.js');
    
    
};

Game.Preloader.prototype.create = function() {
    game.state.start('Game'); // Starting the game state.
};