Game.MainMenu = function(game) {
    this.hasSpawned = false;
}

Game.MainMenu.prototype.create = function () {
    song = game.sound.play('VaporTheme');
    
    
    
    
    console.log('Main Menu!');
}

Game.MainMenu.prototype.update = function () {
    if (song.currentTime >= 3000 && !this.hasSpawned) {
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
    game.state.start('SelectionMenu');    
}