import Phaser from 'phaser'

const WORLD_WIDTH  = 5600
const WORLD_HEIGHT = 560
const GROUND_Y     = 535   // y-center of ground tiles
const TILE_W       = 95
const TILE_H       = 45
const GRAVITY      = 600
const PLAYER_SPEED = 200
const JUMP_VEL     = -480
const PLAYER_SCALE = 0.55

// Platform layout: { x: left edge, y: center, tiles: count }
const PLATFORM_DEFS = [
  { x: 150,  y: 430, tiles: 3 },
  { x: 450,  y: 370, tiles: 4 },
  { x: 730,  y: 430, tiles: 3 },
  { x: 980,  y: 360, tiles: 4 },
  { x: 1260, y: 310, tiles: 4 },
  { x: 1550, y: 400, tiles: 3 },
  { x: 1790, y: 350, tiles: 4 },
  { x: 2060, y: 430, tiles: 3 },
  { x: 2300, y: 375, tiles: 5 },
  { x: 2650, y: 325, tiles: 3 },
  { x: 2900, y: 405, tiles: 3 },
  { x: 3150, y: 355, tiles: 4 },
  { x: 3440, y: 430, tiles: 3 },
  { x: 3680, y: 370, tiles: 4 },
  { x: 3980, y: 310, tiles: 5 },
  { x: 4340, y: 400, tiles: 3 },
  { x: 4580, y: 345, tiles: 4 },
  { x: 4870, y: 425, tiles: 3 },
  { x: 5120, y: 375, tiles: 4 },
]

// Enemy patrol: { x: start, y: platform top, range: patrol distance }
const ENEMY_DEFS = [
  { x: 1000, y: 360, range: 280 },
  { x: 1800, y: 350, range: 280 },
  { x: 3160, y: 355, range: 270 },
  { x: 4590, y: 345, range: 280 },
]

export class Level1Scene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private platforms!: Phaser.Physics.Arcade.StaticGroup
  private coins!: Phaser.Physics.Arcade.StaticGroup
  private enemies!: Phaser.Physics.Arcade.Group
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private spaceKey!: Phaser.Input.Keyboard.Key
  private jumpKey!: Phaser.Input.Keyboard.Key
  private score: number = 0
  private scoreText!: Phaser.GameObjects.Text
  private livesText!: Phaser.GameObjects.Text
  private music?: Phaser.Sound.BaseSound
  private coinSfx?: Phaser.Sound.BaseSound
  private jumpCount: number = 0
  private prevJumpDown: boolean = false
  private enemyDirs: Map<Phaser.Physics.Arcade.Sprite, number> = new Map()
  private enemyStarts: Map<Phaser.Physics.Arcade.Sprite, number> = new Map()
  private enemyRanges: Map<Phaser.Physics.Arcade.Sprite, number> = new Map()

  constructor() {
    super({ key: 'Level1Scene' })
  }

  create() {
    this.physics.world.gravity.y = GRAVITY
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)

    this.createBackground()
    this.createPlatforms()
    this.createCoins()
    this.createPlayer()
    this.createEnemies()
    this.setupCamera()
    this.setupUI()
    this.setupInput()
    this.setupColliders()
    this.playMusic()

    // Fade in
    this.cameras.main.fadeIn(500, 0, 0, 0)
  }

  // ── Background ──────────────────────────────────────────────────────────────

  private createBackground() {
    // Deep navy-to-midnight sky
    const bg = this.add.graphics()
    bg.fillGradientStyle(0x0d0d2b, 0x0d0d2b, 0x1c1040, 0x1c1040, 1)
    bg.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
    bg.setScrollFactor(0.1) // parallax

    // Stars
    for (let i = 0; i < 200; i++) {
      const sx = Phaser.Math.Between(0, WORLD_WIDTH)
      const sy = Phaser.Math.Between(0, WORLD_HEIGHT * 0.65)
      const sr = Phaser.Math.FloatBetween(0.8, 2)
      this.add.circle(sx, sy, sr, 0xffffff, Phaser.Math.FloatBetween(0.2, 0.9))
        .setScrollFactor(0.15)
    }

    // Ground fill (dark stone)
    const gfx = this.add.graphics()
    gfx.fillStyle(0x2a1a0a)
    gfx.fillRect(0, GROUND_Y + TILE_H / 2, WORLD_WIDTH, WORLD_HEIGHT - GROUND_Y - TILE_H / 2)
  }

  // ── Platforms ────────────────────────────────────────────────────────────────

  private createPlatforms() {
    this.platforms = this.physics.add.staticGroup()

    // Ground
    for (let x = 0; x < WORLD_WIDTH; x += TILE_W) {
      this.platforms.create(x + TILE_W / 2, GROUND_Y, 'platform')
    }

    // Elevated platforms
    for (const def of PLATFORM_DEFS) {
      for (let i = 0; i < def.tiles; i++) {
        this.platforms.create(def.x + i * TILE_W + TILE_W / 2, def.y, 'platform')
      }
    }

    this.platforms.refresh()
  }

  // ── Coins ────────────────────────────────────────────────────────────────────

  private createCoins() {
    this.coins = this.physics.add.staticGroup()

    // Coins along the ground
    for (let x = 200; x < WORLD_WIDTH - 200; x += 190) {
      const coin = this.coins.create(x, GROUND_Y - 55, 'coins', 'coins_0') as Phaser.Physics.Arcade.Sprite
      coin.anims.play('anim_coin')
      coin.setScale(1.4)
    }

    // Coins above each elevated platform
    for (const def of PLATFORM_DEFS) {
      const midX = def.x + (def.tiles * TILE_W) / 2
      const coinY = def.y - 48
      // 1–3 coins per platform
      const count = Math.min(def.tiles, 3)
      for (let i = 0; i < count; i++) {
        const cx = midX - ((count - 1) * 40) / 2 + i * 40
        const coin = this.coins.create(cx, coinY, 'coins', 'coins_0') as Phaser.Physics.Arcade.Sprite
        coin.anims.play('anim_coin')
        coin.setScale(1.4)
      }
    }

    this.coins.refresh()
  }

  // ── Player ───────────────────────────────────────────────────────────────────

  private createPlayer() {
    this.player = this.physics.add.sprite(80, GROUND_Y - 100, 'idle', 'Idle_0')
    this.player.setScale(PLAYER_SCALE)
    this.player.setCollideWorldBounds(true)
    this.player.setMaxVelocity(PLAYER_SPEED, 800)
    // Shrink hitbox to body width (sprites are wide due to pose offset)
    this.player.setBodySize(40, 90, true)
  }

  // ── Enemies ──────────────────────────────────────────────────────────────────

  private createEnemies() {
    this.enemies = this.physics.add.group()

    for (const def of ENEMY_DEFS) {
      const enemy = this.physics.add.sprite(def.x, def.y - 80, 'soldier_idle') as Phaser.Physics.Arcade.Sprite
      enemy.setScale(0.7)
      enemy.setCollideWorldBounds(true)
      enemy.setImmovable(false)
      enemy.anims.play('anim_soldier_walk')
      this.enemies.add(enemy)
      this.enemyDirs.set(enemy, 1)
      this.enemyStarts.set(enemy, def.x)
      this.enemyRanges.set(enemy, def.range)
    }
  }

  // ── Camera ───────────────────────────────────────────────────────────────────

  private setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12)
    this.cameras.main.setDeadzone(80, 60)
  }

  // ── HUD ──────────────────────────────────────────────────────────────────────

  private setupUI() {
    const hudStyle = {
      fontSize: '18px',
      color: '#f5d442',
      fontFamily: 'monospace',
      stroke: '#000',
      strokeThickness: 4,
    }
    this.scoreText = this.add.text(16, 12, 'SCORE: 0', hudStyle).setScrollFactor(0)
    this.livesText = this.add.text(16, 36, 'LEVEL: 1', hudStyle).setScrollFactor(0)

    this.add.text(this.scale.width / 2, 12, '⬅ ➡ Move   ↑ / Space: Jump (x2)', {
      fontSize: '11px', color: '#aaaaaa', fontFamily: 'monospace',
    }).setOrigin(0.5, 0).setScrollFactor(0)
  }

  // ── Input ─────────────────────────────────────────────────────────────────────

  private setupInput() {
    this.cursors = this.input.keyboard!.createCursorKeys()
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.jumpKey  = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
  }

  // ── Colliders ────────────────────────────────────────────────────────────────

  private setupColliders() {
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemies, this.platforms)
    this.physics.add.overlap(
      this.player, this.coins,
      this.collectCoin as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined, this
    )
  }

  // ── Music ────────────────────────────────────────────────────────────────────

  private playMusic() {
    try {
      this.music = this.sound.add('music1', { loop: true, volume: 0.25 })
      this.music.play()
    } catch {
      // Audio may be blocked by browser autoplay policy; user interaction will unlock it
    }
    this.coinSfx = this.sound.add('coin_sfx', { volume: 0.6 })
  }

  // ── Coin collection ──────────────────────────────────────────────────────────

  private collectCoin(
    _player: Phaser.GameObjects.GameObject,
    coinObj: Phaser.GameObjects.GameObject
  ) {
    const coin = coinObj as Phaser.Physics.Arcade.Sprite
    coin.destroy()
    this.score += 100
    this.scoreText.setText(`SCORE: ${this.score}`)
    try { this.coinSfx?.play() } catch { /* autoplay */ }

    // Pop text
    const pop = this.add.text(coin.x, coin.y - 20, '+100', {
      fontSize: '14px', color: '#ffff00', fontFamily: 'monospace',
      stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5)
    this.tweens.add({ targets: pop, y: pop.y - 40, alpha: 0, duration: 700,
      onComplete: () => pop.destroy() })
  }

  // ── Update loop ──────────────────────────────────────────────────────────────

  update() {
    this.handlePlayerMovement()
    this.updateEnemies()
  }

  private handlePlayerMovement() {
    const body = this.player.body as Phaser.Physics.Arcade.Body
    const onGround = body.blocked.down

    // Reset jump count when landing
    if (onGround) {
      this.jumpCount = 0
    }

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_SPEED)
      this.player.flipX = true
      if (onGround) this.player.anims.play('anim_run', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_SPEED)
      this.player.flipX = false
      if (onGround) this.player.anims.play('anim_run', true)
    } else {
      this.player.setVelocityX(0)
      if (onGround) this.player.anims.play('anim_idle', true)
    }

    // Jump (with double-jump support, matching original Unity design)
    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                        Phaser.Input.Keyboard.JustDown(this.spaceKey) ||
                        Phaser.Input.Keyboard.JustDown(this.jumpKey)

    if (jumpPressed && this.jumpCount < 2) {
      this.player.setVelocityY(JUMP_VEL)
      this.player.anims.play('anim_jump', true)
      this.jumpCount++
    }

    // Keep jump animation while airborne
    if (!onGround && this.player.anims.currentAnim?.key !== 'anim_jump') {
      this.player.anims.play('anim_jump', true)
    }
  }

  private updateEnemies() {
    this.enemies.getChildren().forEach((obj) => {
      const enemy = obj as Phaser.Physics.Arcade.Sprite
      const dir    = this.enemyDirs.get(enemy) ?? 1
      const startX = this.enemyStarts.get(enemy) ?? enemy.x
      const range  = this.enemyRanges.get(enemy) ?? 200

      enemy.setVelocityX(dir * 80)
      enemy.flipX = dir < 0

      // Reverse at patrol bounds
      if (enemy.x > startX + range) {
        this.enemyDirs.set(enemy, -1)
      } else if (enemy.x < startX) {
        this.enemyDirs.set(enemy, 1)
      }
    })
  }
}
