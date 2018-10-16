console.log('js/game/objstacle.js');
Obstacle = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'Statue_A');
    
    //this.anchor.setTo(0.5, 0.875);
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    
    game.add.existing(this);
    
    
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function() {
    
}