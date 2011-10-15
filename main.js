var includes = ['constants.js', 'world.js', 'world_creator.js', 'tile.js', 'utils.js',
                'wooden_tile.js', 'ground_tile.js', 'terminal_tile.js',
                'stone_tile.js', 'water_tile.js', 'free_tile.js', 'magician.js',
                'scientist.js', 'player.js', 'actor.js'];

for (var i = 0; i < includes.length; i++) {
  document.write('<script type="text/javascript" src="' + includes[i] +
                 '"></script>');
}
if (level) {
  document.write('<script type="text/javascript" src="' + level + '"></script>');
}
