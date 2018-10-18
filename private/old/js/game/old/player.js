console.log('js/game/player.js');
Player = function(game, x, y, speed) {
    Phaser.Sprite.call(this, game, x, y, 'ShufflerDude');
    
    this.animations.add('Dance');
    
    
    
    this.key_W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.key_S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.key_D = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    this.key_W.onDown.add(this.moveUp, this);
    
    this.key_A.onDown.add(this.moveLeft, this);
    
    this.key_S.onDown.add(this.moveDown, this);
    
    this.key_D.onDown.add(this.moveRight, this);
    
    
    this.health = [];
    this.health.push(new HealthHearth(game, 5, 0));
    this.health.push(new HealthHearth(game, 5, 1));
    this.health.push(new HealthHearth(game, 5, 2));
    
    
    this.isMoving = false;
    this.grid = null;
    this.gridX = 10;
    this.gridY = 10;
    this.startX = x;
    this.startY = y;
    this.destX = x;
    this.destY = y;
    this.moveSpeed = speed;
    
   
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.4);
    this.body.setSize(54,54, 8, 44);
    
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.gameOver, this);
    
    game.add.existing(this);
    
    /**/
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    game.debug.body(this);
    for (var i = 0; i < 3; i++) {
        this.health[i].update();
    }
    if (this.body.checCollision) {
        game.debug.body(this, 'rgba(255,0,0,0.8)');
    }
    if (this.isMoving) {
        this.animations.play('Dance', 14, false);
        let ang = game.physics.arcade.angleBetween({x: this.x, y: this.y}, {x: this.destX, y: this.destY});
        let dist  = Math.sqrt(Math.pow(this.destX - this.x) + Math.pow(this.destY - this.y));
        this.body.velocity.x = this.moveSpeed * Math.cos(ang);
        this.body.velocity.y = this.moveSpeed * Math.sin(ang);
    }
    if (Math.pow(this.destX - this.x, 2) < 2 || Math.pow( this.destY - this.y, 2) < 2) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.x = this.destX;
        this.y = this.destY;
        this.isMoving = false;
        this.startX = this.x;
        this.startY = this.y;
        this.frame = 0;
    }
}

Player.prototype.moveUp = function () {
    
    if (!this.isMoving && this.isValidMove(-1, 1)) {
        this.isMoving = true;
        this.destX = this.x + 32;
        this.destY = this.y - 16;
        this.gridX--;
        this.gridY++;
    }
}
Player.prototype.moveLeft = function () {
    if (!this.isMoving && this.isValidMove(0, -1)) {
        this.isMoving = true;
        this.destX = this.x - 32;
        this.destY = this.y - 16;
        this.gridY--;
    }
}
Player.prototype.moveDown = function () {
    if (!this.isMoving && this.isValidMove(1, -1)) {
        this.isMoving = true;
        this.destX = this.x - 32;
        this.destY = this.y + 16;
        this.gridX++;
        this.gridY--;
    }
}
Player.prototype.moveRight = function () {
    if (!this.isMoving && this.isValidMove(0, 1)) {
        this.isMoving = true;
        this.destX = this.x + 32;
        this.destY = this.y + 16;
        this.gridY++;
    }
}

Player.prototype.bounce = function() {
    console.log('Collision');
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    player.body.x = this.startX;
    player.body.y = this.startY;
}

Player.prototype.isValidMove = function(modx, mody) {
    if (this.grid.obstacles[this.gridX + modx + 1][this.gridY + mody] == null) {
        if (this.grid.enemies[this.gridX + modx + 1][this.gridY + mody] != null) {
            this.looseLife();
            return false;
        }
        return true;
    }
    else
        return false;
}

Player.prototype.registerGrid = function(grid) {
    this.grid = grid;
}
Player.prototype.looseLife = function() {
    
    if (this.health[2].charge > 0) {
        this.health[2].charge--;
    } else if (this.health[1].charge > 0) {
        this.health[1].charge--;
    } else if (this.health[0].charge > 0) {
        this.health[0].charge--;
    } else {
        this.clean();
        game.state.start('GameOver');
    }
}

Player.prototype.gameOver = function() {
    this.clean();
    game.state.start('GameOver');
}

Player.prototype.clean = function() {
    for (let i = 0; i < this.health.length; i++) {
        this.health[i].clean();
    }
}