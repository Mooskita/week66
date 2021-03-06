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


