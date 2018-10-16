var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameWindow', null, true);

game.state.add('Preload', Game.Preloader);
game.state.add('Game', Game.Game);
game.state.add('MainMenu', Game.MainMenu);



game.state.start('Preload');
