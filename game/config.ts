import Phaser from 'phaser'
import { BootScene }     from './scenes/BootScene'
import { PreloadScene }  from './scenes/PreloadScene'
import { MainMenuScene } from './scenes/MainMenuScene'
import { Level1Scene }   from './scenes/Level1Scene'

export function createGame(parent: HTMLElement): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent,
    width: 900,
    height: 560,
    backgroundColor: '#0a0a1a',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 }, // gravity set per-scene
        debug: false,
      },
    },
    scene: [BootScene, PreloadScene, MainMenuScene, Level1Scene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    audio: {
      disableWebAudio: false,
    },
  }

  return new Phaser.Game(config)
}
