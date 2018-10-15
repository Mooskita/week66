console.log('js/game/grid.js');
Grid = function (game, w, h) {
    this.grid = [];
    this.gridGroup = game.add.group();
    let k;
    for (var i = 0; i < w; i++) {
        this.grid.push([]);
        k = 0;
        for (var j = 0; j < h; j++) {
            if (j % 2 == 1)
            {
                this.grid.push(new Tile(game, j * 32  , i * 32 + 16 + (k * 32) - (h/4 * 32), 1));
                k++;
            }
            else 
            {
                this.grid.push(new Tile(game, j * 32  , i * 32 + (k * 32) - (h/4 * 32), 0));
            }
            
        }
    }
}

Grid.prototype.update = function() {
    for(var i = 0; i < this.grid.count; i++) {
        for (var j = 0; j < this.grid[i].count; j++) {
            this.grid[i][j].update();
        }
    }
}