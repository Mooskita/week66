console.log('js/game/grid.js');
Grid = function (game, w, h) {
    this.tileArray = [];
    this.obstacleArray = [];
    this.isoGroup = game.add.group();

    this.generate(w, h);
    
    this.count = 0;
}

Grid.prototype.update = function() {
    if (this.count % 30 == 0) {
        this.alternate();
        Score += scoreMod;
    }
    if (this.count % 3 == 0) {
        this.destroy();
        scoreMod++;
    }
    if (this.count % 10 == 0) {
        this.respawn();
    }
    this.updateObstacles();
    this.count++;
    console.log(Score);
}

Grid.prototype.respawn = function() {
    var x = -1;
    var y = -1;
    var isValid = false;
    for (var i = 0; i < this.tileArray.length; i++) {
        for (var j = 0; j < this.tileArray[i].length; j++) {
            if (!this.tileArray[i][j].body.collideWorldBounds) {
                isValid = true;
            }
        }
    }
    
    while (isValid) {
        x = game.rnd.integer() % this.tileArray.length;
        y = game.rnd.integer() % this.tileArray[0].length;
        if (!this.tileArray[x][y].body.collideWorldBounds) {
            isValid = false;
        }
    }
    
    if (x != -1 && y != -1) {
        console.log("Respawn");
        this.tileArray[x][y].frame = game.rnd.integer() % 4;
        this.tileArray[x][y].body.z = 0;
        this.tileArray[x][y].body.collideWorldBounds = true;
    }
}

Grid.prototype.updateObstacles = function() {
    this.obstacleArray.forEach( function(row) {
        row.forEach(function (obj) {
            if (obj != null)
                obj.update();
        });
    });
}

Grid.prototype.destroy = function() {
    var x = -1;
    var y = -1;
    var isValid = false;
    for (var i = 0; i < this.tileArray.length; i++) {
        for (var j = 0; j < this.tileArray[i].length; j++) {
            if (this.tileArray[i][j].body.collideWorldBounds) {
                isValid = true;
            }
        }
    }
    
    while (isValid) {
        x = game.rnd.integer() % this.tileArray.length;
        y = game.rnd.integer() % this.tileArray[0].length;
        if (this.tileArray[x][y].body.collideWorldBounds) {
            isValid = false;
        }
    }
    
    if (x != -1 && y != -1) {
        this.tileArray[x][y].frame = 4;
        this.tileArray[x][y].body.velocity.z = 50;
        this.tileArray[x][y].body.collideWorldBounds = false;
    }
}

Grid.prototype.alternate = function() {
    for (var i = 0; i < this.tileArray.length; i++) {
        for (var j = 0; j < this.tileArray[i].length; j++) {
            if (this.tileArray[i][j].frame == 0) {
                this.tileArray[i][j].frame = 1
            } else if (this.tileArray[i][j].frame == 1) {
                this.tileArray[i][j].frame = 0
            } else if (this.tileArray[i][j].frame == 2) {
                this.tileArray[i][j].frame = 3
            } else if (this.tileArray[i][j].frame == 3) {
                this.tileArray[i][j].frame = 2
            }
        }
    }
    this.count = 0;
}

Grid.prototype.generate = function(w, h) {
    var size = 34;
    var i = 0, tile, obstacle;
    var j = 0;
    for (var x = 0; x < 32 * w; x += size){
        this.tileArray.push([]);
        this.obstacleArray.push([]);
        for (var y = 0; y < 32 * h; y += size) {
            if (w >= i*i && h >= j*j) {
                if (game.rnd.integer() % 100 > 95) {
                    obstacle = game.add.isoSprite(x, y, 0, 'Statue_A', 0, this.isoGroup);
                    this.obstacleArray[i].push(new Obstacle(game, obstacle));
                } else {
                    this.obstacleArray[i].push(null);
                }
                tile = game.add.isoSprite(x, y, 0,'FlashTiles', 0, this.isoGroup);
                game.physics.isoArcade.enable(tile);
                tile.anchor.set(0.5);
                tile.body.collideWorldBounds = true;
                tile.body.immovable = true;

                if (( j) % 2 == 0) {
                    tile.frame = 2;

                } else {
                    tile.frame = 0;
                }
                this.tileArray[i].push(tile); 
            }

            j++;
        }
        i++;
    }
}

// Complete garbage! Doesn't do what I want it too do.
Grid.prototype.sort = function(array) {
    var sorted = [];
    var previous = null;
    var index = 0;
    for (var x = 0; x < array.length; x++) {        
        for (var y = 0; y < array[x].length; y++) {            
            var current = array[x][y].world.x;
            if (previous == null || current > previous) {
                sorted.push([]);
                sorted[index++].push(array[x][y])
                previous = current;
            } else {
                for (var i = 0; i < sorted.length; i++) {
                    if (array[x][y].world.x == sorted[i][0].world.x) {
                        sorted[i].push(array[x][y])
                    }
                }
            }
        }        
    }
    var swapped = true;
    for (var i = 0; i < sorted.length; i++) {
        while (swapped) {
            swapped = false;
            for (var j = 1; j < sorted[i].length; j++) {
                if (sorted[i][j - 1].world.y > sorted[i][j].world.y) {
                    var tmp = sorted[i][j - 1];
                    sorted[i][j - 1] = sorted[i][j];
                    sorted[i][j] = tmp;
                    swapped = true;
                }
            }
        }
    }
    
  
}
