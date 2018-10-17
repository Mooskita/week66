console.log('js/game/player.js');
Player = function(game, sprite, speed) {
    this.sprite = sprite;
    this.speed = speed;
    this.tileMap;
    
    this.cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.A,
        Phaser.Keyboard.D,
        Phaser.Keyboard.W,
        Phaser.Keyboard.S,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
    ]);
    
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.D = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    /*
    this.space.onDown.add(function () {
        this.sprite.body.velocity.z = 300;
    }, this);
    */
    game.physics.isoArcade.enable(this.sprite);
    
    
    
    this.sprite.body.collideWorldBounds = false;
    
    this.sprite.anchor.set(0.5);
    
    game.camera.follow(this.sprite);
    
    this.sprite.body.velocity.z = 300;
    
    this.isMoving = false;
    
    this.circle = new Phaser.Circle(this.tileX, this.tileY, 5);
    
    this.sprite.body.setSize(16, 16, 16, 8, 8);
    
    this.tileX = this.sprite.body.x;
    this.tileY = this.sprite.body.y;
}

Player.prototype.update = function () {

    //game.debug.body(this.sprite);
    //game.debug.text("Here!", this.tileX, this.tileY);


    if (this.W.isDown) {
        //console.log("Moving up: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.y = -this.speed;
        //this.tileY -= 34;
        //this.isMoving = true;
    }
    else if (this.S.isDown) {
        //console.log("Moving down: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.y = this.speed;
        //this.tileY += 34;
        //this.isMoving = true;
    } 
    else {
        this.sprite.body.velocity.y = 0;
    }
    if (this.A.isDown) {
        //console.log("Moving left: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.x = -this.speed;
        //this.tileX -= 34;
        //this.isMoving = true;
    }
    else if (this.D.isDown) {
        //console.log("Moving right: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.x = this.speed;
        //this.tileX += 33;
        //this.isMoving = true;
    }
    else {
        this.sprite.body.velocity.x = 0;
    }
    /*
    if (this.isMoving && (Math.pow(this.tileX - this.sprite.body.x, 2) < 2 && (Math.pow(this.tileY - this.sprite.body.y, 2) < 2))) {
        //console.log("Stopped moving: " + this.sprite.body.x + " - " + this.sprite.body.y);
        this.sprite.body.x = this.tileX;
        this.sprite.body.y = this.tileY;
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.isMoving = false;
    }
    */
    //console.log(this.sprite.world.y);
}



Player.prototype.registerTileMap = function(tileMap) {
    this.tileMap = tileMap.map;
}