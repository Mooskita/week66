console.log('js/game/obstacle.js');
Obstacle = function (game, sprite) {
    this.sprite = sprite;
    
    
    game.physics.isoArcade.enable(this.sprite);
    this.start = this.sprite.body.z;
    
    
    this.sprite.anchor.set(0.5);
    
    this.sprite.body.velocity.z = 300;
    this.sprite.body.allowGravity = true;
    this.sprite.body.bounce.set(1, 1, 0.2);
    this.sprite.body.drag.set(100, 100, 0);
    //this.sprite.body.immovable = true;
    this.sprite.checkWorldBounds = true;
    this.sprite.events.onOutOfBounds.add(this.modScore, this);
}

Obstacle.prototype.update = function() {
    //game.debug.body(this.sprite);
}

Obstacle.prototype.modScore = function() {
    Score += 100;
    this.sprite.kill();
}