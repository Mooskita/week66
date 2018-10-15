var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameWindow');

game.state.add('Preload', Game.Preloader);
game.state.add('Game', Game.Game);

game.state.start('Preload');
