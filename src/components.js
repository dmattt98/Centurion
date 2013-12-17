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

// The Player
Crafty.c('Player', {
    init: function() {
        this.requires('Actor, spr_player, Color, fourway, Collision')
            .color('rgb(200, 200, 200)')
            .die();
    },
    
    die: function() {
        this.onHit('Enemy', this.kill);
    },
    
    kill: function() {
        this.destroy();
    }
});

Crafty.c('Enemy', {
    init: function() {
        this.requires('Actor, spr_enemy, Collision')
            //.color('rgb(200, 20, 25)')
            .wrap();
    },
    
    wrap: function() {
        this.bind('EnterFrame', function() {
            this.x -= 4;
            if(this.x < 0)
                this.x = 50 * 19;
        });
    }
});