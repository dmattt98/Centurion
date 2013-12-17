Crafty.scene('Game', function() {
    
    Game.keys = 1;
    Game.coins = 5;
    
    // A 2D array to keep track of all the occupied tiles
    this.occupied = new Array(Game.map_grid.width);
    for(var i = 0; i < Game.map_grid.width; i++) {
        this.occupied[i] = new Array(Game.map_grid.height);
        for(var y = 0; y < Game.map_grid.height; y++) {
            this.occupied[i][y] = false;
        }
    }
    
    Crafty.e('Door').at(5,5);
    
    Crafty.e('Player').at(5, 5);
    
    for(var i = 0; i < 35; i++) {
        var x = Math.floor(Math.random() * 47) + 43,
            y = Math.floor(Math.random() * 33) + 3;
        Crafty.e('Enemy').at(x, y);
    }
    
    pos_coins = [[13, 3], [26, 7], [5, 20], [39, 20], [29, 29]];
    for(var i = 0; i < pos_coins.length; i++) {
        Crafty.e('Coin').at(pos_coins[i][0], pos_coins[i][1]);
    }
    
    Crafty.e('Key').at(45, 32);
    
    // Place a hedge at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {
        var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
 
        if (at_edge) {
          // Place a tree entity at the current tile
          Crafty.e('Hedge').at(x, y);
        }
      }
    }
    
    Crafty.e('2D, DOM, Text').attr({
        x: 32,
        y: 32
    }).textColor('#ffffff').bind('EnterFrame', function() {
        this.text('Coins: ' + Game.coin + '/' +Game.coins  + '<br/>Keys: ' + Game.key + '/' + Game.keys);
    });
});

Crafty.scene('Loading', function() {
    Crafty.e('2D, DOM, Text').text('Loading; please wait...').textColor('#ffffff').attr({
        x: 0,
        y: Game.height() / 2 - 24,
        w: Game.width()
  });

  Crafty.load(['assets/Untitled.png'], function() {
        Crafty.sprite(16, 'assets/Untitled.png', {
            spr_enemy: [0,0],
            spr_player: [1,0],
            spr_coin: [0,1],
            spr_key: [1,1],
            spr_hedge: [0,2],
            spr_door: [1, 2]
        });

        Crafty.scene('Main');
    })
});

Crafty.scene('Main', function() {
    Crafty.e('2D, DOM, Text').text('Press ENTER to play').textColor('#ffffff').attr({
        x: 0,
        y: Game.height() / 2 - 24,
        w: Game.width()
    }).bind('KeyDown', function(e) {
        if(e.key == Crafty.keys['ENTER']) {
            Crafty.scene('Game');
        }
    });
});

Crafty.scene('Lose', function() {
    Crafty.e('2D, DOM, Text').text('You lost!<br/>You got ' + Game.coin + '/' + Game.coins + ' coins<br/>Press ENTER to restart').attr({
        x: 0,
        y: Game.height() / 2 - 24,
        w: Game.width()
    }).textColor('#ffffff').bind('KeyDown', function(e) {
        if(e.key == Crafty.keys['ENTER']) {
            Crafty.scene('Game');
        }
    }).unselectable();;
});

Crafty.scene('Win', function() {
    Crafty.e('2D, DOM, Text').text('You Won!<br/>You got ' + Game.coin + '/' + Game.coins + ' coins<br/>Press ENTER to restart').attr({
        x: 0,
        y: Game.height() / 2 - 24,
        w: Game.width()
    }).textColor('#ffffff').bind('KeyDown', function(e) {
        if(e.key == Crafty.keys['ENTER']) {
            Crafty.scene('Game');
        }
    });
});