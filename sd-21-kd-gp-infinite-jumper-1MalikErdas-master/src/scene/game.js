import Phaser from 'phaser';
import bgLayer from '../assets/Background/bg_layer1.png';
import platform from '../assets/Environment/ground_grass.png';
import character from '../assets/Players/bunny1_ready.png';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', bgLayer);
    this.load.image('ground_grass', platform);

    this.load.image('bunny1_ready.png', character);

  }

  create() {

     /** @type {Phaser.Physics.Arcade.StaticGroup} */
         this.platforms

    this.add.image(240, 320, 'background');

    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) 
    {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const ground_grass = this.platforms.create(x, y, 'ground_grass');
      ground_grass.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = ground_grass.body;
      body.updateFromGameObject();
    }

        this.player = this.physics.add.sprite(240, 320, 'bunny1_ready.png')
        .setScale(0.5);

        this.physics.add.collider(this.platforms, this.player);

        this.player.body.checkCollision.up = false
        this.player.body.checkCollision.left = false
        this.player.body.checkCollision.right = false

        this.cameras.main.startFollow(this.player)
  }
  update()
  {
    const touchingDown = this.player.body.touching.down

    if (touchingDown)
    {
      this.player.setVelocityY(-280)
    }
    this.platforms.children.iterate(child => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const ground_grass = child
    

      const scrollY =this.cameras.main.scrollY
      if (ground_grass.y >= scrollY + 700)
      {
        ground_grass.y = scrollY - Phaser.Math.Between(50, 100)
        ground_grass.body.updateFromGameObject()
      }
    })
    }
  }
  


