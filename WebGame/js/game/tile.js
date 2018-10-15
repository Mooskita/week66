console.log('js/game/tile.js');
Tile = function(game, x, y, type, debug = null) {
    Phaser.Sprite.call(this, game, x, y, 'FlashTiles');
    
    if (type == 0) {
        this.frame = 1;
    } else if (type == 1) {
        this.frame = 3;
    }
    
    this.anchor.setTo(0.5, 0.5);
    
    game.add.existing(this);
    
    this.count = 0;
    if (debug != null) {
        game.debug.text(debug);
    }
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.update = function() {
    this.count++;
    
    if (this.count % 24 == 0) {
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