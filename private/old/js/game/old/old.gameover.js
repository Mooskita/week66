Game.GameOver = function(game) {
    this.text = [];
}

Game.GameOver.prototype.create = function() {
    soundA.resume();
    
    scores.push(Score);
    
    this.sort(score);
    
    this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.text.push("G A M E    O V E R");
    this.text.push("");
    this.text.push("------------------");
    this.text.push("H I G H  S C O R E S");
    this.text.push("------------------");
    this.text.push("------------------");
    
    
    this.isRegistered = false;
    
    this.bmpText = game.add.bitmapText(32, 32, 'gem', text, 16);
    
   let c = 0;
    for (let i = 0; i < this.text.length + scores.length; i++) {
        if ( i < 5 && i > 4 + scores.length) {
            this.bmpText.text += this.text[i];
        } else {
            this.bmpText.text += names[c] + " : " + scores[c];
        }
    }
}

Game.GameOver.prototype.update = function() {
 
    console.log('game over...');
    if (this.space.isDown) {
        soundA.pause();
        game.state.start('SelectionMenu');
    }
}

Game.GameOver.prototype.sort = function(list) {
  swapped = true;
    while (swapped) {
        swapped = false;
        for (var j = 1; j < list.length; j++) {
            if (list[j - 1] < list[j]) {
                var tmp = list[j];
                var nm = names[j];
                list[j] = list[j];
                names[j] =
                list[j] = tmp;
                swapped = true;
            }
        }
    }
}