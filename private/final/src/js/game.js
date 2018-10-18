var Game = {};
var scores = [];
var Score = 0;
var scoreMod = 1;
var songA;
var songB;
Game.Preloader = function(game) {
    
};
Game.Preloader.prototype.init = function() {
    
}
Game.Preloader.prototype.preload = function() {
    /*
    Here you'll load the game assets.
    */
    game.load.audio('CharacterSelect', './assets/audio/ogg/CharacterSelect.ogg');
    game.load.audio('VaporTheme1',  ['./assets/audio/ogg/Vaporcrap1Mix.ogg', './assets/audio/mp3/Vaporcrap1Mix.mp3']);
    game.load.audio('VaporTheme2',  ['./assets/audio/ogg/Vaporcrap2.ogg', './assets/audio/mp3/Vaporcrap2.mp3']);
    game.load.audio('NewGameSound', './assets/audio/ogg/NewGame.ogg');
    
    game.load.spritesheet('ShufflerDude', './assets/spritesheets/ShufflerDude001Dance001.png', 64, 64, 16);
    game.load.spritesheet('DiscoStue', './assets/spritesheets/DiscoStue001Dance001.png', 64, 80, 4);
    game.load.spritesheet('FlashTiles', './assets/spritesheets/PHFlashTiles.png', 64, 64, 5);
    
    game.load.image('Statue_A', './assets/images/Statue.png', 64, 128);
    
    game.load.script('phaser-plugin-isometric.js', './src/lib/isometric.js');
};

Game.Preloader.prototype.create = function() {
    game.state.start('MainMenu'); // Starting the game state.
    //game.state.start('Game');
};


//#####################
// GAME STATES
//#####################

// GAME
Game.Game = function(game) {
    this.grid;
    this.player;
};

Game.Game.prototype.init = function() {
    game.time.advancedTiming = true;
    game.world.setBounds(0, 0, 2048, 1024);
    
    this.game.plugins.add(Phaser.Plugin.Isometric);
    this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    
    game.iso.anchor.setTo(0.5, 0);
    game.physics.isoArcade.gravity.setTo(0, 0, -500);
    
    game.camera.bounds.x = game.camera.bounds.x * game.camera.scale.x;
    game.camera.bounds.y = game.camera.bounds.y * game.camera.scale.y;
    
    game.camera.bounds.width = game.camera.bounds.width * game.camera.scale.x;
    game.camera.bounds.height = game.camera.bounds.height * game.camera.scale.y;
}

Game.Game.prototype.create = function() {
    songA.resume();
    this.grid = new Grid(game, 20, 20);
    
    
    let name = (selection == 0 ? 'ShufflerDude' : 'DiscoStue');
    let animation = (selection == 0 ? 18 : 8 );
    let sprite = game.add.isoSprite(200, 200, 0, name, 0, this.grid.isoGroup);
    this.player = new Player(game, sprite, 80, animation);
    this.player.registerTileMap({map: this.grid.tileArray});
   
};

Game.Game.prototype.update = function() {
    this.grid.update();
    this.player.update();
    game.physics.isoArcade.collide(this.grid.isoGroup);
    game.iso.simpleSort(this.grid.isoGroup);
    
};

Game.Game.prototype.shutdown = function() {
    this.game.world.removeAll();
}


// MAINMENU
Game.MainMenu = function(game) {
    this.hasSpawned = false;
}

Game.MainMenu.prototype.create = function () {
    songA = game.sound.play('VaporTheme1',1, true);
    
    
    
    
    console.log('Main Menu!');
}

Game.MainMenu.prototype.update = function () {
    if (songA.currentTime >= 3000 && !this.hasSpawned) {
        let textNode = document.createTextNode("N E W  G A M E");
        let newGameButton = document.createElement('button');
        newGameButton.appendChild(textNode);
        newGameButton.id = 'newGame';
        newGameButton.onclick = this.startGame;
        
        document.getElementById('gameArticle').appendChild(newGameButton);
        this.hasSpawned = true;
    }
}
Game.MainMenu.prototype.startGame = function() {
    console.log('clicked');
    game.sound.play('NewGameSound');
    document.getElementById('gameArticle').removeChild(document.getElementById('newGame'));
    songA.pause();
    game.state.start('SelectionMenu');    
}

Game.MainMenu.prototype.shutdown = function() {
    this.game.world.removeAll();
}

// SELECTION MENU
var selection;
Game.SelectionMenu = function(game) {

}

Game.SelectionMenu.prototype.create = function() {
    songA.resume();
    this.characterA = game.add.sprite(200, 200, 'ShufflerDude');
    this.characterB = game.add.sprite(1366 - 584, 200, 'DiscoStue');
    
    this.characterA.scale.x = 6;
    this.characterA.scale.y = 6;
    this.characterB.scale.x = 6;
    this.characterB.scale.y = 6;
    
    this.characterA.inputEnabled = true;
    this.characterB.inputEnabled = true;
    
    this.characterA.animations.add('Dance');
    this.characterB.animations.add('Dance');
    
    
    
    this.characterA.animations.play('Dance', 18, true);
    this.characterB.animations.play('Dance', 8, true);
    
    //songB = game.sound.play('VaporTheme1', true);
    //songB.pause();
}

Game.SelectionMenu.prototype.update = function() {
    if (this.characterA.input.pointerOver())
    {
        this.characterA.alpha = 1;
        if (game.input.activePointer.leftButton.isDown) {
            this.selectA();
        }
    }
    else
    {
        this.characterA.alpha = 0.5;
    }
    if (this.characterB.input.pointerOver())
    {
        this.characterB.alpha = 1;
        if (game.input.activePointer.leftButton.isDown) {
            this.selectB();
        }
    }
    else
    {
        this.characterB.alpha = 0.5;
    }
}


Game.SelectionMenu.prototype.selectA = function(){
    //songA.pause();
    //songB.resume();
    game.sound.play('CharacterSelect');
    selection = 0;
    songA.pause();
    game.state.start('Game');
}


Game.SelectionMenu.prototype.selectB = function(){
    //songA.pause();
    //songB.resume();
    game.sound.play('CharacterSelect');
    selection = 1;
    songA.pause();
    game.state.start('Game');
}

// GAME OVER
Game.GameOver = function(game) {
}

Game.GameOver.prototype.create = function() {
    //songA = game.sound.play('VaporTheme1',1, true);
    songA.resume();
    scores.push(Score);
    
    
    scoreMod = 1;
    
    
    this.sort(scores);
    
    
    console.log('A');
    
    let index = 0;
    let text = document.createTextNode("G A M E  O V E R");
    let gameover = [];
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    text = document.createTextNode("");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    
    text = document.createTextNode("- - - - - - - - - - - - - - - - - - - - - - - -");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    text = document.createTextNode("H I G H S C O R E");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    text = document.createTextNode("- - - - - - - - - - - - - - - - - - - - - - - -");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    console.log('B');
    
    let length = (scores.length <= 3 ? scores.length : 3);
    for (let i = 0; i < length; i++) {
        if (scores[i] == Score) {
            text = document.createTextNode("Y O U : " + scores[i]);
            gameover.push(document.createElement('p'));
            gameover[index].appendChild(text);
            gameover[index++].id = 'new';
        } 
        else {
            text = document.createTextNode("Y O U : " + scores[i]);
            gameover.push(document.createElement('p'));
            gameover[index].appendChild(text);
            gameover[index++].id = 'num';
        }
    }
    
    console.log('C');

    
    text = document.createTextNode("- - - - - - - - - - - - - - - - - - - - - - - -");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    text = document.createTextNode("P R E S S # S P A C E");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    let div = document.createElement('span');
    div.classList.add('gameOver');
    
    for (let i = 0; i < gameover.length; i++) {
        div.appendChild(gameover[i]);
    }
    document.querySelector('#gameWindow').appendChild(div);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    Score = 0;
}

Game.GameOver.prototype.sort = function(list) {
  swapped = true;
    while (swapped) {
        swapped = false;
        for (var j = 1; j < list.length; j++) {
            if (list[j - 1] < list[j]) {
                var tmp = list[j];
                list[j] = list[j - 1];
                list[j - 1] = tmp;
                swapped = true;
            }
        }
    }
}

Game.GameOver.prototype.update = function() {
    console.log('game over...');
    if (this.space.isDown) {
        var article = document.querySelector('.gameOver');
        while(article.firstChild != null) {
            article.removeChild(article.firstChild);
        }
        document.querySelector('#gameWindow').removeChild(article);
        game.sound.play('NewGameSound');
        //songB.pause();
        //songA.resume();
        songA.pause();
        game.state.start('SelectionMenu');
        
    }
   
}
Game.GameOver.prototype.shutdown = function() {
    this.game.world.removeAll();
}

// ############
// GAME OBJECTS
// ############

// OBSTACLE
console.log('js/game/obstacle.js');
Obstacle = function (game, sprite) {
    this.sprite = sprite;
    
    
    game.physics.isoArcade.enable(this.sprite);
    this.start = this.sprite.body.z;
    
    
    this.sprite.anchor.set(0.5);
    
    this.sprite.body.velocity.z = 300;
    this.sprite.body.allowGravity = true;
    this.sprite.body.bounce.set(1, 1, 0.2);
    this.sprite.body.drag.set(100, 100, 0);
    //this.sprite.body.immovable = true;
    this.sprite.checkWorldBounds = true;
    this.sprite.events.onOutOfBounds.add(this.modScore, this);
}

Obstacle.prototype.update = function() {
    //game.debug.body(this.sprite);
}

Obstacle.prototype.modScore = function() {
    Score += 100;
    this.sprite.kill();
}

// PLAYER
console.log('js/game/player.js');
Player = function(game, sprite, speed, animation) {
    this.sprite = sprite;
    this.speed = speed;
    this.tileMap;
    
    this.sprite.animations.add('Dance');
    
    this.cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.A,
        Phaser.Keyboard.D,
        Phaser.Keyboard.W,
        Phaser.Keyboard.S,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
    ]);
    
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.D = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    
    this.isJumping = true;
    
    this.space.onDown.add(function () {
        if (this.sprite.body.velocity.z == 0 && this.isJumping == false) {
            this.sprite.body.velocity.z = 200;
            this.isJumping = true;
        }
    }, this);
    
    game.physics.isoArcade.enable(this.sprite);
    
    this.sprite.checkWorldBounds = true;
    this.sprite.events.onOutOfBounds.add(this.gameOver, this);
    
    this.sprite.body.collideWorldBounds = false;
    
    this.sprite.anchor.set(0.5);
    
    game.camera.follow(this.sprite);

    this.sprite.body.velocity.z = 200;
    
    this.isMoving = false;
    
    this.circle = new Phaser.Circle(this.tileX, this.tileY, 5);
    
    this.sprite.body.setSize(16, 16, 16, 8, 8);
    
    this.tileX = this.sprite.body.x;
    this.tileY = this.sprite.body.y;
    
    this.lastZ = this.sprite.body.z;
    
    this.sprite.animations.play('Dance', animation, true);
}

Player.prototype.update = function () {
    if (this.lastZ == this.sprite.body.z) {
        this.isJumping = false;
    }
    this.lastZ = this.sprite.body.z;
    //console.log(Math.floor(this.lastZ));
    //game.debug.text("Here!", this.tileX, this.tileY);


    if (this.W.isDown) {
        //console.log("Moving up: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.y = -this.speed;
        //this.tileY -= 34;
        //this.isMoving = true;
    }
    else if (this.S.isDown) {
        //console.log("Moving down: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.y = this.speed;
        //this.tileY += 34;
        //this.isMoving = true;
    } 
    else {
        this.sprite.body.velocity.y = 0;
    }
    if (this.A.isDown) {
        //console.log("Moving left: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.x = -this.speed;
        //this.tileX -= 34;
        //this.isMoving = true;
    }
    else if (this.D.isDown) {
        //console.log("Moving right: " + this.sprite.world.x + " - " + this.sprite.world.y);
        this.sprite.body.velocity.x = this.speed;
        //this.tileX += 33;
        //this.isMoving = true;
    }
    else {
        this.sprite.body.velocity.x = 0;
    }
    /*
    if (this.isMoving && (Math.pow(this.tileX - this.sprite.body.x, 2) < 2 && (Math.pow(this.tileY - this.sprite.body.y, 2) < 2))) {
        //console.log("Stopped moving: " + this.sprite.body.x + " - " + this.sprite.body.y);
        this.sprite.body.x = this.tileX;
        this.sprite.body.y = this.tileY;
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.isMoving = false;
    }
    */
    //console.log(this.sprite.world.y);
}

Player.prototype.gameOver = function() {
    if (this.sprite.body.velocity.z <= -500) {
        songA.pause();
        game.state.start('GameOver');
    }
}

Player.prototype.registerTileMap = function(tileMap) {
    this.tileMap = tileMap.map;
}

// GRID
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
            if (this.tileArray[i][j] != null && !this.tileArray[i][j].body.collideWorldBounds) {
                isValid = true;
            }
        }
    }
    
    while (isValid) {
        x = game.rnd.integer() % this.tileArray.length;
        y = game.rnd.integer() % this.tileArray[0].length;
        if (this.tileArray[x][y] != null && !this.tileArray[x][y].body.collideWorldBounds) {
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
            if (this.tileArray[i][j] != null && this.tileArray[i][j].body.collideWorldBounds) {
                isValid = true;
            }
        }
    }
    
    while (isValid) {
        x = game.rnd.integer() % this.tileArray.length;
        y = game.rnd.integer() % this.tileArray[0].length;
        if (this.tileArray[x][y] != null && this.tileArray[x][y].body.collideWorldBounds) {
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
            if (this.tileArray[i][j] != null) {
                
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
            if (true) {
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
            } else {
                this.tileArray[i].push(null);
            }

            j++;
        }
        i++;
    }
}


//###################
// GAME BOOT
//###################
var game = new Phaser.Game(1366, 768, Phaser.AUTO, 'gameWindow', null, true);

game.state.add('Preload', Game.Preloader);
game.state.add('Game', Game.Game);
game.state.add('MainMenu', Game.MainMenu);
game.state.add('GameOver', Game.GameOver);
game.state.add('SelectionMenu', Game.SelectionMenu);

game.state.start('Preload');
