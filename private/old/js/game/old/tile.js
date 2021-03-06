console.log('js/game/tile.js');
Tile = function(game, x, y, type, debug) {
    Phaser.Sprite.call(this, game, x, y, 'FlashTiles');
    
    if (type == 0) {
        this.frame = 1;
    } else if (type == 1) {
        this.frame = 3;
    }
    this.debug = debug;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(96, 48, -12, 6);
    this.anchor.setTo(0.5, 0.5);
    
    this.count = 0;
    
    game.add.existing(this);
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.update = function() {
    if (this.debug != null) 
        game.debug.body(this)
    this.count++;
    
    if (this.count % 48 == 0) {
        if (this.frame == 1) {
            this.frame = 0;
        } else if (this.frame == 0) {
            this.frame = 1;
        } else if (this.frame == 2) {
            this.frame = 3;
        } else if (this.frame == 3) {
            this.frame = 2;
        }
        this.count = 0;
    }
    
}