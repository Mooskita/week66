var game = new Phaser.Game(1366, 768, Phaser.AUTO, 'gameWindow', null, true);

game.state.add('Preload', Game.Preloader);
game.state.add('Game', Game.Game);
game.state.add('MainMenu', Game.MainMenu);
game.state.add('GameOver', Game.GameOver);




game.state.start('Preload');
