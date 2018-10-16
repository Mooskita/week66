console.log('js/game/objstacle.js');
Obstacle = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'Statue_A');
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.875);
    this.body.setSize(80,32, -8, 100);
    
    this.body.immovable = true;
    
    game.add.existing(this);
    
    
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function() {
  
    game.debug.body(this);
}