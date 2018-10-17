console.log('js/game/healthhearth.js')
HealthHearth = function(game, charge, number) {
   
    this.number = number;
    this.charge = charge;
    this.hearth = document.createElement('img');
    this.hearth.src = './assets/HealthHearth.png';
    this.hearth.id = 'hearth';
    document.querySelectorAll('#hearthContainer')[this.number].appendChild(this.hearth);
    console.log(this.hearth.style);
    
}

HealthHearth.prototype.update = function() {
    switch (this.charge) {
        case 4:
            this.hearth.style.objectPosition = "0 0";
            // css updates
            break;
        case 3:
            this.hearth.style.objectPosition = "25% 0";
            // css updates
            break;
        case 2:
            this.hearth.style.objectPosition = "50% 0";
            // css updates
            break;
        case 1:
            this.hearth.style.objectPosition = "75% 0";
            // css updates
            break;
        case 0:
            this.hearth.style.objectPosition = "100% 0";
            // css updates
            break;
        default:
            break;
            
    }
}

HealthHearth.prototype.clean = function() {
    document.querySelectorAll('#hearthContainer')[this.number].removeChild(this.hearth);
}