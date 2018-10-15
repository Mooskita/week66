Game.Game = function(game) {
    this.grid;
    this.enemies = [];
};

Game.Game.prototype.create = function() {
    this.grid = new Grid(game, 20, 20);
    
    let index = 0;
    this.enemies.push(game.add.sprite(300, 200, 'ShufflerDude'));
    this.enemies[index].animations.add('Dance');
    this.enemies[index++].animations.play('Dance', 12, true);
};

Game.Game.prototype.update = function() {
    //console.log('Running...\n');
    this.grid.update();
};