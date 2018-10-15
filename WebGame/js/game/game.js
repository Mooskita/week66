Game.Game = function(game) {
    this.grid;
    this.enemies = [];
    this.player;
};

Game.Game.prototype.create = function() {
    this.grid = new Grid(game, 20, 20);
    
    let index = 0;
    
    this.player = new Player(game, this.grid.grid[10][10].x, this.grid.grid[10][19].y, 1)
    /*
    this.enemies.push(game.add.sprite(300, 200, 'ShufflerDude'));
    this.enemies[index].animations.add('Dance');
    this.enemies[index++].animations.play('Dance', 12, true);
    */
};

Game.Game.prototype.update = function() {
    //console.log('Running...\n');
    this.grid.update();
    this.player.update();
};