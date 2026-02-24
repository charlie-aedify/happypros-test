import Phaser from 'phaser'

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  create() {
    const { width, height } = this.scale

    // Background gradient via graphics
    const bg = this.add.graphics()
    bg.fillGradientStyle(0x0a0a2e, 0x0a0a2e, 0x1a1060, 0x1a1060, 1)
    bg.fillRect(0, 0, width, height)

    // Decorative stars
    for (let i = 0; i < 80; i++) {
      const x = Phaser.Math.Between(0, width)
      const y = Phaser.Math.Between(0, height * 0.7)
      const r = Phaser.Math.FloatBetween(1, 2.5)
      this.add.circle(x, y, r, 0xffffff, Phaser.Math.FloatBetween(0.3, 1))
    }

    // Logo
    const logo = this.add.image(width / 2, height * 0.35, 'logo')
    logo.setScale(Math.min(0.55, (width * 0.65) / logo.width))

    // Pulsing "Press Enter to Play" text
    const startText = this.add.text(width / 2, height * 0.68, 'PRESS  ENTER  TO  PLAY', {
      fontSize: '22px',
      color: '#f5a623',
      fontFamily: 'monospace',
      stroke: '#000',
      strokeThickness: 4,
    }).setOrigin(0.5)

    this.tweens.add({
      targets: startText,
      alpha: 0.2,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut',
    })

    // Version label
    this.add.text(width / 2, height * 0.84, '20th Anniversary Web Edition', {
      fontSize: '13px',
      color: '#aaaaaa',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    this.add.text(width / 2, height * 0.9, 'Arrow Keys: Move  |  Up / Space: Jump  |  Double-Jump supported', {
      fontSize: '11px',
      color: '#777777',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    // Enter key to start
    const enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    const spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    const goToLevel = () => {
      this.cameras.main.fadeOut(400, 0, 0, 0)
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('Level1Scene')
      })
    }

    enterKey.once('down', goToLevel)
    spaceKey.once('down', goToLevel)
    this.input.once('pointerdown', goToLevel)
  }
}
