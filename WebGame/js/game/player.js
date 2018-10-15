console.log('js/game/player.js');
Player = function(game, x, y, speed) {
    Phaser.Sprite.call(this, game, x, y, 'ShufflerDude');
    
    this.anchor.setTo(0.5, 0.5);
    
    this.key_W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.key_S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.key_D = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    this.key_W.onDown.add(this.moveUp, this);
    
    this.key_A.onDown.add(this.moveLeft, this);
    
    this.key_S.onDown.add(this.moveDown, this);
    
    this.key_D.onDown.add(this.moveRight, this);
    
    this.isMoving = false;
    this.destX = x;
    this.destY = y;
    this.moveSpeed = speed;
    
    game.physics.arcade.enable(this);
    
    game.add.existing(this);
    

    /**/
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.isMoving) {
        console.log('Moving...');
        game.physics.arcade.moveToXY(this, this.destX, this.destY, this.moveSpeed, 100);
    }
    if (Math.pow(this.x - this.destX, 2) < 2 || Math.pow(this.y - this.destY, 2) < 2) {
        this.x = this.destX;
        this.y = this.destY;
        this.isMoving = false;
    }
}

Player.prototype.moveUp = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.x + 32;
        this.destY = this.y - 16;
    }
}
Player.prototype.moveLeft = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.x - 32;
        this.destY = this.y - 16;
    }
}
Player.prototype.moveDown = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.x - 32;
        this.destY = this.y + 16;
    }
}
Player.prototype.moveRight = function () {
    if (!this.isMoving) {
        this.isMoving = true;
        this.destX = this.x + 32;
        this.destY = this.y + 16;
    }
}