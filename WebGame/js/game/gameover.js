Game.GameOver = function(game) {
}

Game.GameOver.prototype.create = function() {
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
    
    text = document.createTextNode("Y O U");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    text = document.createTextNode("- - - - - - - - - - - - - - - - - - - - - - - -");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    text = document.createTextNode("P R E S S  S P A C E");
    gameover.push(document.createElement('p'));
    gameover[index].appendChild(text);
    gameover[index++].id = 'num';
    
    let div = document.createElement('span');
    
    for (let i = 0; i < index; i++) {
        div.appendChild(gameover[i]);
    }
    document.querySelector('#gameWindow').appendChild(div);
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

Game.GameOver.prototype.update = function() {
    console.log('game over...');
    if (this.space.isDown) {
        var article = document.querySelector('canvas');
        while(article.firstChild) {
            article.removeChild(article.firstChild);
            
        }
        

        game.state.start('Game');
        
    }
   
}

