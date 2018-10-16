console.log('js/game/grid.js');
Grid = function (game, w, h) {
    this.tileArray = [];
    this.isoGroup = game.add.group();

    var size = 34;
    
    var i = 0, tile;
    var j = 0;
    for (var x = 32 * w; x > 0; x -= size){
        this.tileArray.push([]);
        for (var y = 32 * h; y > 0; y -= size) {
            tile = game.add.isoSprite(x, y, 0,'FlashTiles', 0, this.isoGroup);
            game.physics.isoArcade.enable(tile);
            tile.anchor.set(0.5);
            tile.body.collideWorldBounds = true;
            tile.body.immovable = true;
            //tile.body.bounce.set(1, 1, 0.2);
            //tile.body.drag.set(100, 100, 0);
            if (( j) % 2 == 0) {
                tile.frame = 2;
                
            } else {
                tile.frame = 1;
            }
            this.tileArray[i].push(tile);
            j++;
        }
        i++;
    }
}

Grid.prototype.update = function() {
    
}
