import Phaser from 'phaser';

/**
 * GameplayScene
 * The main gameplay scene with animated character.
 */
export default class GameplayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameplayScene' });

    // Initialize properties
    this.player = null;
    this.cursors = null;
  }

  /**
   * Create game objects and set up the gameplay
   */
  create() {
    // Add background images
    this.bg1 = this.add.tileSprite(0, 0, 0, 0, 'sky').setOrigin(0, 0);
    this.bg2 = this.add.tileSprite(0, 0, 0, 0, 'clouds').setOrigin(0, 0);
    this.bg3 = this.add.tileSprite(0, 0, 0, 0, 'hills').setOrigin(0, 0);
    this.bg4 = this.add.tileSprite(0, 0, 0, 0, 'sea').setOrigin(0, 0);
    this.bg5 = this.add.tileSprite(0, 0, 0, 0, 'ground').setOrigin(0, 0);

    //Scale to frame size
    this.bg1.setScale(0.35);
    this.bg2.setScale(0.35);
    this.bg3.setScale(0.35);
    this.bg4.setScale(0.35);
    this.bg5.setScale(0.35);

    // Create animations
    this.createAnimations();

    // Create player using the new method
    this.createPlayer();

    // Enable world bounds collision
    this.player.setCollideWorldBounds(true);

    // Create cursor keys for input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add escape key to end game
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('GameOverScene');
    });

    // Add instructions text
    this.add.text(600, 50, 'Use Arrow Keys to Move • Press ESC to End', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Play the walking animation to test it
    this.player.anims.play('walk', true);
  }

  /**
 * Create character animations from the sprite sheet
 */
  createAnimations() {
    // Walking animation using all 10 frames (0-9) from the cat sprite sheet
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,   // First frame
        end: 9      // Last frame (there are 10 frames total, 0-9)
      }),
      frameRate: 10,  // 10 frames per second
      repeat: -1      // -1 means loop indefinitely
    });

    // Idle Animation using first two frames of the sprite sheet
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,   // First frame
        end: 1      // Last frame
      }),
      frameRate: 2,  // 10 frames per second
      repeat: -1      // -1 means loop indefinitely
    });
  }

  /**
 * Create and configure the player character
 */
  createPlayer() {
    // Add player sprite at the left side of the screen
    this.player = this.physics.add.sprite(170, 450, 'character');

    // Scale the player down (the cat sprite is quite large)
    this.player.setScale(0.5);

    // Enable physics body
    this.player.setCollideWorldBounds(true);

    // Adjust the physics body size for better collision
    // This creates a tighter collision box around the character
    this.player.body.setSize(
      this.player.width * 0.6,  // 60% of the sprite width
      this.player.height * 0.8  // 80% of the sprite height
    );

    // Center the physics body
    this.player.body.setOffset(
      this.player.width * 0.2,  // 20% offset from left
      this.player.height * 0.2  // 20% offset from top
    );
  }

  /**
 * Update game objects on every frame
 */
  update() {
    const speed = 160;  // Movement speed in pixels per second
    const halfWidth = this.player.width * 0.5 * this.player.scale;
    const worldWidth = this.scale.width;

    // Reset horizontal velocity
    this.player.setVelocityX(0);

    // Handle left movement
    if (this.cursors.left.isDown && this.player.x > halfWidth) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);  // Flip sprite to face left
      this.player.anims.play('walk', true);

      // Move backgrounds for parallax effect (slower = farther away)
      this.bg1.tilePositionX -= 0.1;
      this.bg2.tilePositionX -= 0.1;
      this.bg3.tilePositionX -= 0.1;
      this.bg4.tilePositionX -= 0.3;
      this.bg5.tilePositionX -= 0.5;
    }
    // Handle right movement
    else if (this.cursors.right.isDown && this.player.x < worldWidth - halfWidth) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);  // Normal orientation facing right
      this.player.anims.play('walk', true);

      // Move backgrounds for parallax effect (slower = farther away)
      this.bg1.tilePositionX += 0.1;
      this.bg2.tilePositionX += 0.1;
      this.bg3.tilePositionX += 0.1;
      this.bg4.tilePositionX += 0.3;
      this.bg5.tilePositionX += 0.5;
    }
    // No movement or at edge
    else {
      // Play idle animation instead of stopping
      this.player.anims.play('idle', true);
    }
  }
}