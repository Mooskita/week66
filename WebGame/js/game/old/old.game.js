Game.Game = function(game) {
    this.grid;
    this.zoomAmount = 1.5;
    this.enemies = [];
    this.player;
    this.gameWorld;
};

Game.Game.prototype.init = function() {
    game.time.advancedTiming = true;
    this.game.plugins.add(Phaser.Plugin.Isometric);
    this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.iso.anchor.setTo(0.5, 0.2);
    game.physics.isoArcade.gravity.setTo(0, 0, -500);
    game.world.setBounds(-1024, -1024, 2048, 2048);
    
    this.cursors = game.input.keyboard.createCursorKeys();

    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
    ]););
}

Game.Game.prototype.create = function() {
    this.grid = new Grid(game, 20, 20);
    /*
    let x = -1;
    let y = -1;
    do {
        x = game.rnd.integer() % 20;
        y = game.rnd.integer() % 20;
    } while (this.grid.grid[x][y] == null);
    this.player = new Player(game, this.grid.grid[x][y].body.x, this.grid.grid[x][y].body.y, 120);
    */
    //this.player.registerGrid(this.grid);
    //this.grid.sorting.add(this.player);
    /*
    game.camera.follow(this.player);
    
    game.camera.scale.x += this.zoomAmount;
    game.camera.scale.y += this.zoomAmount;

    game.camera.bounds.x = game.camera.bounds.x * game.camera.scale.x;
    game.camera.bounds.y = game.camera.bounds.y * game.camera.scale.y;
    game.camera.bounds.width = game.camera.bounds.width * game.camera.scale.x;
    game.camera.bounds.height = game.camera.bounds.height * game.camera.scale.y;
    */
    
};

Game.Game.prototype.update = function() {
    //console.log('Running...\n');
    /*
    this.grid.sorting.sort('y', Phaser.Group.SORT_ASCENDING);
    if (game.physics.arcade.collide(this.player, this.grid.blocking, collisionHandler, processHandler, this)) {
        console.log('Collision');
    }
    var isFalling = true;
    if (game.physics.arcade.overlap(this.player, this.grid.ground)) {
        isFalling = false;
    }
    if (isFalling) {
        this.grid.ground.enable = false;
        this.player.body.gravity.y = 20000;
    }
    */
};

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function processHandler(player, blocking) {
    return true;
}

function collisionHandler(player, blocking) {
    player.bounce();
}