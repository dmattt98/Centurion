Game = {
    // This  defines our grid's size and the size of each of its tiles
    map_grid: {
        width: 40,
        height: 24,
        width: 50,
        height: 25,
        tile: {
            width: 16,
            height: 16
        }
    },
    
    // The total width of the game screen. Since our game takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },
    
    // The total height of the game screen. Since our gird takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    
    // Initialize and start our game
    start: function () {
        // Start Crafty and set a background color so we can see it is working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(249, 223, 125)');
        
        // Simply start the "Game" scene to get things going
        Crafty.scene('Game');
    }
}
