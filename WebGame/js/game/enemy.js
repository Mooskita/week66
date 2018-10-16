console.log('js/game/enemy.js');
Enemy = function(game, x, y, type) {
    Phaser.Sprite.call(this, game, x, y, 'DiscoStue');
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(32, 32, 16, 60);
    this.anchor.setTo(0.5, 0.5);
    
    this.animations.add('Dance');
    this.animations.play('Dance', 12, true);
    
    game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
}