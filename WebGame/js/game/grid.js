console.log('js/game/grid.js');
Grid = function (game, w, h) {
    this.grid = [];
    this.obstacles = [];
    this.blocking = game.add.physicsGroup();
    this.ground = game.add.physicsGroup();
    this.sorting = game.add.group();
    this.enemies = [];
    this.blocking.enableBody = true;
    
    let k;
    for (var i = 0; i < w; i++) {
        this.grid.push([]);

        k = 0;
        for (var j = 0; j < h; j++) {
            let debug = null;
            if ((game.rnd.integer() % 100) < 90) {
                if (j % 2 == 1)
                {
                    this.grid[i].push(new Tile(game, j * 32  , i * 32 + 16 + (k * 32) - (h/4 * 32), 1, debug));
                    k++;
                }
                else 
                {
                    this.grid[i].push(new Tile(game, j * 32  , i * 32 + (k * 32) - (h/4 * 32), 0, debug));
                }
                this.ground.add(this.grid[i][j]);
                
            } else {
                this.grid[i].push(null);
                if (j % 2 == 1) {
                    k++;
                }
            }
        }
    }
    for (var i = 0; i < w; i++) {
        this.obstacles.push([]);
        this.enemies.push([]);
        for (var j = 0; j < h; j++) {
            if (this.grid[i][j] != null && (game.rnd.integer() % 100) > 95) {
                let obstacle = new Obstacle(game, this.grid[i][j].x, this.grid[i][j].y);
                this.obstacles[i].push(obstacle);
                
                this.blocking.add(obstacle);
                this.sorting.add(obstacle);
            } else if (this.grid[i][j] != null && (game.rnd.integer() % 100) > 85) {
                this.enemies[i].push(new Enemy(game, this.grid[i][j].x, this.grid[i][j].y));
            } else {
                this.enemies[i].push(null)
                this.obstacles[i].push(null);
            }
        }
    }
    game.world.bringToTop(this.sorting);
}
