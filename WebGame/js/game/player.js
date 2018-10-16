console.log('js/game/player.js');
Player = function(game, x, y, speed) {
    Phaser.Sprite.call(this, game, x, y, 'ShufflerDude');
    
    this.animations.add('Dance');
    
    //this.anchor.setTo(0.5, 0.5);
    
    
    
    this.key_W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.key_S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.key_D = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    this.key_W.onDown.add(this.moveUp, this);
    
    this.key_A.onDown.add(this.moveLeft, this);
    
    this.key_S.onDown.add(this.moveDown, this);
    
    this.key_D.onDown.add(this.moveRight, this);
    
    
    
    this.isMoving = false;
    this.startX = x;
    this.startY = y;
    this.destX = x;
    this.destY = y;
    this.moveSpeed = speed;
    
   
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    
    game.add.existing(this);
    console.log(this.body.x + " " + this.body.y);
    console.log(this.x + " " + this.y);
    
    /**/
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    game.debug.bodyInfo(this, 32 , 32);
    if (this.isMoving) {
        this.animations.play('Dance',6, false);
        let ang = game.physics.arcade.angleBetween({x: this.body.x, y: this.body.y}, {x: this.destX, y: this.destY});
        let dist  = Math.sqrt(Math.pow(this.destX - this.body.x) + Math.pow(this.destY - this.body.y));
        this.body.velocity.x = this.moveSpeed * Math.cos(ang);
        this.body.velocity.y = this.moveSpeed * Math.sin(ang);
    }
    if (Math.pow(this.destX - this.body.x, 2) < 2 || Math.pow( this.destY - this.body.y, 2) < 2) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.x = this.destX;
        this.body.y = this.destY;
        this.isMoving = false;
        this.startX = this.body.x;
        this.startY = this.body.y;
    }
}

Player.prototype.moveUp = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.body.x + 32;
        this.destY = this.body.y - 16;
    }
}
Player.prototype.moveLeft = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.body.x - 32;
        this.destY = this.body.y - 16;
    }
}
Player.prototype.moveDown = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.body.x - 32;
        this.destY = this.body.y + 16;
    }
}
Player.prototype.moveRight = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.body.x + 32;
        this.destY = this.body.y + 16;
    }
}

Player.prototype.bounce = function() {
    console.log('Collision');
    player.body.x = this.startX;
    player.body.y = this.startY;
}