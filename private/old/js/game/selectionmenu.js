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