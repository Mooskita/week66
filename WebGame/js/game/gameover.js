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
    
    
    for (let i = 0; i < index; i++) {
        document.getElementById('gameArticle').appendChild(gameover[i]);
    }
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
    this.space.onDown.add(this.restart, this);
}

Game.GameOver.prototype.restart = function() {
    let del = document.querySelectAll('#num');
    let article = document.getElementById('gameArticle');
    for (let i = del.length - 1; i >= 0 ; i++) {
        article.removeChild(del[i]);
    }
    
    game.state.start('Game');
}

