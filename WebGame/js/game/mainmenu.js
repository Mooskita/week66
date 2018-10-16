Game.MainMenu = function(game) {
    this.song;
    this.gameArticle = document.querySelector('#gameArticle');
    
    this.newGameButton = document.createElement('button');
}

Game.MainMenu.prototype.create = function () {
    this.song = game.sound.play('VaporTheme');
    let textNode = document.createTextNode("N E W  G A M E");
    this.newGameButton.appendChild(textNode);
    this.newGameButton.id = 'newGame';
    this.newGameButton.onclick = this.startGame;
    
    gameArticle.appendChild(this.newGameButton);
    
    console.log('Main Menu!');
}
Game.MainMenu.prototype.startGame = function() {
    //this.song.pause();
    document.getElementById('gameArticle').removeChild(document.getElementById('newGame'));
    game.state.start('Game');    
}