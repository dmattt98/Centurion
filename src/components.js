// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },
    
    // Locate this entity at the given position on the grid
    at: function(x, y) {
        if(x === undefined && y === undefined) {
            return {
                x: this.x / Game.map_grid.tile.width,
                y: this.y / Game.map_grid.tile.height
            }
        } else {
            this.attr({
                x: x * Game.map_grid.tile.width,
                y: y * Game.map_grid.tile.height
            });
            return this;
        }
    }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    },
});

// A Tree is just an Actor with a certian color
Crafty.c('Tree', {
    init: function() {
        this.requires('Actor, Color, Solid')
            .color('rgb(20, 125, 40)');
    },
});

// A Bush is just an Actor with a certian color
Crafty.c('Enemy', {
    _speed: -6,
    init: function() {
        this.requires('Actor, Color, Solid, Collision')
            .color('rgb(185, 25, 25)')
            .stopOnSolids();
    },
    
    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.bind('EnterFrame', function(e) {
            this.x += this._speed;
            if(this.x <= 0) {
                this.x = 50 * 17;
            }
        });
        this.onHit('Kill', this.removeEnemy);
        return this;
    },
    
    // Stops the movement
    removeEnemy: function() {
        this.destroy();
    }
});

// This is the player-controlled Character
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('Actor, Multiway, Color, Collision')
            .multiway({W: -90, S: 90, D: 0, A: 180})
            .color('rgb(20, 75, 40)')
            .stopOnSolids()
            .kill();
    },
    
    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);
        return this;
    },
    
    kill: function() {
        this.onHit('Enemy', this.destroy);
    },
    
    // Stops the movement
    stopMovement: function() {
        this._speed = 0;
        if(this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    }
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Barrier', {
    init: function() {
        this.requires('Actor, Solid, Kill, Color')
            .color('rgb(170, 125, 40)');
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height * 3
        });
    }
});

// The Player's sword
Crafty.c('Sword', {
    init: function() {
        this.requires('Actor, Solid, Kill, Color, Multiway')
            .color('rgb(127, 127, 127)')
            .multiway({W: -90, S: 90, D: 0, A: 180});
    }
});