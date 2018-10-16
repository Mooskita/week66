Game.Game = function(game) {
    this.zoomAmount = 0.5;
    this.grid;
    this.enemies = [];
    this.player;
    this.gameWorld;
};

Game.Game.prototype.create = function() {
    game.world.setBounds(-1024, -1024, 2048, 2048);

    
    this.grid = new Grid(game, 20, 20);
    
    let index = 0;
    
    this.player = new Player(game, this.grid.grid[10][10].x, this.grid.grid[10][10].y, 1)
    /*
    this.enemies.push(game.add.sprite(300, 200, 'ShufflerDude'));
    this.enemies[index].animations.add('Dance');
    this.enemies[index++].animations.play('Dance', 12, true);
    */
    
    
    game.camera.follow(this.player);
    
    game.camera.scale.x += this.zoomAmount;
    game.camera.scale.y += this.zoomAmount;

    game.camera.bounds.x = game.camera.bounds.x * game.camera.scale.x;
    game.camera.bounds.y = game.camera.bounds.y * game.camera.scale.y;
    game.camera.bounds.width = game.camera.bounds.width * game.camera.scale.x;
    game.camera.bounds.height = game.camera.bounds.height * game.camera.scale.y;
    
};

Game.Game.prototype.update = function() {
    //console.log('Running...\n');
    var isFalling = true;
    for (var i = 0; i < this.grid.grid.length; i++) {
        for (var j = 0; j < this.grid.grid[i].length; j++) {
            if (!this.grid.grid[i][j] == null && checkOverlap(this.player, this.grid.grid[i][j])) {
                isFalling = false;
            }
            
        }
    }
    if (isFalling) {
        this.player.body.gravity.y = 50000;
        console.log('Gravity!');
    }
};

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}