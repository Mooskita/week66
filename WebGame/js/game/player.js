console.log('js/game/player.js');
Player = function(game, sprite, speed) {
    this.sprite = sprite;
    
    this.speed = speed
    
    this.cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
    ]);
    
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.space.onDown.add(function () {
        this.sprite.body.velocity.z = 300;
    }, this);
    
    game.physics.isoArcade.enable(this.sprite);
    
    this.sprite.body.collideWorldBounds = false;
    
    this.sprite.anchor.set(0.5);
    
    game.camera.follow(this.sprite);
    
    this.sprite.body.z = 300;
}

Player.prototype.update = function () {
    if (this.cursors.up.isDown) {
        this.sprite.body.velocity.y = -this.speed;
    }
    else if (this.cursors.down.isDown) {
        this.sprite.body.velocity.y = this.speed;
    }
    else {
        this.sprite.body.velocity.y = 0;
    }

    if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -this.speed;
    }
    else if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x = this.speed;
    }
    else {
        this.sprite.body.velocity.x = 0;
    }
}