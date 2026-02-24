import Phaser from 'phaser'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    // Minimal preload: just the loading bar background
    this.load.image('logo', '/assets/art/claw_logo.png')
  }

  create() {
    this.scene.start('PreloadScene')
  }
}
