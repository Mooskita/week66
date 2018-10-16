Game.Game = function(game) {
    this.grid;
    this.player;
};

Game.Game.prototype.init = function() {
    game.time.advancedTiming = true;
    game.world.setBounds(0, 0, 2048, 1024);
    
    this.game.plugins.add(Phaser.Plugin.Isometric);
    this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    
    game.iso.anchor.setTo(0.5, 0);
    game.physics.isoArcade.gravity.setTo(0, 0, -500);
    
    game.camera.bounds.x = game.camera.bounds.x * game.camera.scale.x;
    game.camera.bounds.y = game.camera.bounds.y * game.camera.scale.y;
    
    game.camera.bounds.width = game.camera.bounds.width * game.camera.scale.x;
    game.camera.bounds.height = game.camera.bounds.height * game.camera.scale.y;
}

Game.Game.prototype.create = function() {
    this.grid = new Grid(game, 20, 20);
    let sprite = game.add.isoSprite(200, 200, 0,'ShufflerDude', 0, this.grid.isoGroup);
    this.player = new Player(game, sprite, 100);
    
   
};

Game.Game.prototype.update = function() {
    this.player.update();
    game.physics.isoArcade.collide(this.grid.isoGroup);
    game.iso.simpleSort(this.grid.isoGroup);
};
