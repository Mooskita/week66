console.log('js/game/grid.js');
Grid = function (game, w, h) {
    this.grid = [];
    
    let k;
    for (var i = 0; i < w; i++) {
        this.grid.push([]);
        k = 0;
        for (var j = 0; j < h; j++) {
            if (game.rnd.integer() % 100 < 90) {
                if (j % 2 == 1)
                {
                    this.grid[i].push(new Tile(game, j * 32  , i * 32 + 16 + (k * 32) - (h/4 * 32), 1));
                    k++;
                }
                else 
                {
                    this.grid[i].push(new Tile(game, j * 32  , i * 32 + (k * 32) - (h/4 * 32), 0));
                }
            } else {
                this.grid[i].push(null);
                if (j % 2 == 1) {
                    k++;
                }
            }
            
            
        }
    }
    console.log(this.grid[10][10]);
}
/*
Grid.prototype.update = function() {
    for(var i = 0; i < this.grid.count; i++) {
        for (var j = 0; j < this.grid[i].count; j++) {
            this.grid[i][j].update();
        }
    }
}
*/