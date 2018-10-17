Game.GameOver = function(game) {
}

Game.GameOver.prototype.create = function() {
    scores.push(Score);
    Score = 0;
    scoreMod = 1;
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
    
    for (let i = 0; i < scores.length; i++) {
        if (i >= 3) {
            
        } else {
            text = document.createTextNode("Y O U : " + scores[i]);
            gameover.push(document.createElement('p'));
            gameover[index].appendChild(text);
            gameover[index++].id = 'num';
        }
    }
    
    

    
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
    
    for (let i = 0; i < index; i++) {
        div.appendChild(gameover[i]);
    }
    document.querySelector('#gameWindow').appendChild(div);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

Game.GameOver.prototype.update = function() {
    console.log('game over...');
    if (this.space.isDown) {
        var article = document.querySelector('.gameOver');
        while(article.firstChild) {
            article.removeChild(article.firstChild);
        }
        document.querySelector('#gameWindow').removeChild(article);

        game.state.start('Game');
        
    }
   
}

