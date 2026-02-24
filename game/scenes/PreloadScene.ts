import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    const { width, height } = this.scale

    // Loading bar
    const barBg = this.add.rectangle(width / 2, height / 2, 400, 20, 0x333333)
    const bar = this.add.rectangle(width / 2 - 200, height / 2, 0, 20, 0xf5a623)
    bar.setOrigin(0, 0.5)

    const logo = this.add.image(width / 2, height / 2 - 80, 'logo')
    logo.setScale(Math.min(0.5, (width * 0.6) / logo.width))

    this.load.on('progress', (value: number) => {
      bar.width = 400 * value
    })

    // Player sprite atlases (non-uniform frames from Unity meta)
    this.load.atlas('idle', '/assets/art/Idle.png', '/assets/art/idle-atlas.json')
    this.load.atlas('run',  '/assets/art/Run.png',  '/assets/art/run-atlas.json')
    this.load.atlas('jump', '/assets/art/Jump.png', '/assets/art/jump-atlas.json')
    this.load.atlas('coins', '/assets/art/coins.png', '/assets/art/coins-atlas.json')

    // Static sprites
    this.load.image('platform', '/assets/art/plataform.png')

    // Soldier walk frames
    this.load.image('soldier_idle', '/assets/art/soldier/FRAME001.png')
    this.load.image('soldier_walk0', '/assets/art/soldier/FRAME050.png')
    this.load.image('soldier_walk1', '/assets/art/soldier/FRAME051.png')
    this.load.image('soldier_walk2', '/assets/art/soldier/FRAME052.png')

    // Audio
    this.load.audio('music1', '/assets/sounds/Level_1_Music_Remastered.mp3')
    this.load.audio('coin_sfx', '/assets/sounds/fx/COIN.WAV')
  }

  create() {
    // Player animations
    this.anims.create({
      key: 'anim_idle',
      frames: [
        { key: 'idle', frame: 'Idle_0' }, { key: 'idle', frame: 'Idle_1' },
        { key: 'idle', frame: 'Idle_2' }, { key: 'idle', frame: 'Idle_3' },
        { key: 'idle', frame: 'Idle_4' }, { key: 'idle', frame: 'Idle_5' },
        { key: 'idle', frame: 'Idle_6' }, { key: 'idle', frame: 'Idle_7' },
      ],
      frameRate: 8,
      repeat: -1,
    })

    this.anims.create({
      key: 'anim_run',
      frames: [
        { key: 'run', frame: 'Run_0' }, { key: 'run', frame: 'Run_1' },
        { key: 'run', frame: 'Run_2' }, { key: 'run', frame: 'Run_3' },
        { key: 'run', frame: 'Run_4' }, { key: 'run', frame: 'Run_5' },
        { key: 'run', frame: 'Run_6' }, { key: 'run', frame: 'Run_7' },
        { key: 'run', frame: 'Run_8' }, { key: 'run', frame: 'Run_9' },
      ],
      frameRate: 12,
      repeat: -1,
    })

    this.anims.create({
      key: 'anim_jump',
      frames: [
        { key: 'jump', frame: 'Jump_0' }, { key: 'jump', frame: 'Jump_1' },
        { key: 'jump', frame: 'Jump_2' }, { key: 'jump', frame: 'Jump_3' },
        { key: 'jump', frame: 'Jump_4' }, { key: 'jump', frame: 'Jump_5' },
        { key: 'jump', frame: 'Jump_6' },
      ],
      frameRate: 10,
      repeat: 0,
    })

    this.anims.create({
      key: 'anim_coin',
      frames: [
        { key: 'coins', frame: 'coins_0' }, { key: 'coins', frame: 'coins_1' },
        { key: 'coins', frame: 'coins_2' }, { key: 'coins', frame: 'coins_3' },
        { key: 'coins', frame: 'coins_4' }, { key: 'coins', frame: 'coins_5' },
        { key: 'coins', frame: 'coins_6' }, { key: 'coins', frame: 'coins_7' },
        { key: 'coins', frame: 'coins_8' },
      ],
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'anim_soldier_walk',
      frames: [
        { key: 'soldier_walk0' }, { key: 'soldier_walk1' }, { key: 'soldier_walk2' },
      ],
      frameRate: 6,
      repeat: -1,
    })

    this.scene.start('MainMenuScene')
  }
}
