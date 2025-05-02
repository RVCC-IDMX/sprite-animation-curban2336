// Import Phaser
import Phaser from 'phaser';

// Import scenes
import TitleScene from './scenes/TitleScene';
import GameplayScene from './scenes/GameplayScene';
import GameOverScene from './scenes/GameOverScene';

// Game configuration
const config = {
  parent: 'game-container', // Use the container from index.html
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  backgroundColor: '#87CEEB',  // Sky blue fallback color
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },  // No gravity for horizontal movement
      debug: false        // Set to true to see collision boxes
    }
  },
  // We'll add scenes to this array later
  scene: [TitleScene, GameplayScene, GameOverScene]
};

// Create the game instance (but without scenes yet)
new Phaser.Game(config);