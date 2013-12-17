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
        this.requires('Actor, spr_player, Multiway, Collision')
            .multiway(4, {W: -90, S: 90, D: 0, A: 180})
            .die();
    },

    die: function() {
        this.onHit('Enemy', function() { this.destroy(); Crafty.scene('Lose'); Game.score = 0; Game.key = 0; });
        this.onHit('Hedge', this.stopMovement);
        this.onHit('Door', function() { if(Game.key == Game.keys) { Crafty.scene('Win'); Game.score = 0; Game.key = 0; } });
    },
    
    stopMovement: function() {
        this._speed = 0;
        if(this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    }
});

Crafty.c('Enemy', {
    init: function() {
        this.requires('Actor, spr_enemy')
            .wrap();
    },
    
    wrap: function() {
        var _speed = Math.floor(Math.random() * 12);
        this.bind('EnterFrame', function() {
            this.x -= _speed;
            if(this.x < 0) {
                this.x = 50 * 19;
                this.y = Math.floor(Math.random() * 554) + 16;
            }
        });
    }
});

Crafty.c('Coin', {
    init: function() {
        this.requires('Actor, spr_coin, Collision')
            .collect();
    },
    
    collect: function() {
        this.onHit('Player', function() { this.destroy(); Game.coin++; });
    }
});

Crafty.c('Key', {
    init: function() {
        this.requires('Actor, spr_key, Collision')
            .collect();
    },
    
    collect: function() {
        this.onHit('Player', function() { this.destroy(); Game.key++ });
    }
});

Crafty.c('Hedge', {
    init: function() {
        this.requires('Actor, spr_hedge');
    }
});

Crafty.c('Door', {
    init: function() {
        this.requires('Actor, spr_door');
    }
});