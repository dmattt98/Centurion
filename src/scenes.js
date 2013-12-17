Crafty.scene('Game', function() {
    
    // A 2D array to keep track of all the occupied tiles
    this.occupied = new Array(Game.map_grid.width);
    for(var i = 0; i < Game.map_grid.width; i++) {
        this.occupied[i] = new Array(Game.map_grid.height);
        for(var y = 0; y < Game.map_grid.height; y++) {
            this.occupied[i][y] = false;
        }
    }
    
    this.sword = Crafty.e('Sword').at(6, 16);
    // Player character, placed at 5, 5 on our grid
    this.player = Crafty.e('PlayerCharacter').at(5, 16);
    this.occupied[this.player.at().x][this.player.at().y] = true;
    
    // Place a tree at every edge square on our grid of 16x16 tiles
    for(var x = 0; x < Game.map_grid.width; x++) {
        for(var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
 
            if(at_edge) {
                // Place a tree entity at the current tile
                Crafty.e('Tree').at(x, y);
                this.occupied[x][y] = true;
            } else if (x == 45 && !this.occupied[x][y] && y > 3 && y < 32 && Math.random() <= 0.7) {
                // Place a bush entity at the current tile
                var rx = Math.floor(Math.random() * 47)  + 43;
                Crafty.e('Enemy').at(rx, y);
                this.occupied[45][y] = true;
            }
        }
    }
    
    // Place down 3 barriers
    var loc_barriers = [[8, 24], [16, 8], [32, 16]];
    for(var i = 0; i < loc_barriers.length; i++) {
        Crafty.e('Barrier').at(loc_barriers[i][0], loc_barriers[i][1]);
    }
});

Crafty.scene('Lose', function() {

});