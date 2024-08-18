// Global Phaser, configuracion del juego
//Para que funcione cualquier juego con phaser se necesita una config
//el objeto global define donde carga el videojuego, en este caso

import { createAnimations } from "../animations.js"

const config = {

    type: Phaser.AUTO, // webgl , canvas or auto, tipo de soporte, es un objeto global, auto usa wbgl primero
    width: 256,
    height: 244, // Super Mario bros = resolution 256x244 px
    backgroundColor: '#4682b4',
    parent: 'game', // id in html, en que contenedor
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300 },
            debug: false
        }
    },
    scene: {

        preload, // se ejecuta para precragar recursos, cargar sprites, etc, ejec 1
        create,  // se ejecuta cuando el juego comienza, dibujar los sprites, ejec 1
        update  // se ejecuta en cada frame, ejec each frame

    }
}

new Phaser.Game(config) //Inicializar el juego pasando la configuracion del juego

function preload () {
    console.log('preload')
    //this -> game -> Es el juego, con this se refiere a si mismo accediendo a sus metodos y atributos
    // image(x, y, id-asset)
    this.load.image(
        'cloud1',
        '../assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        '../assets/scenery/overworld/floorbricks.png'
    )

    this.load.spritesheet(
        'mario', //id 
        '../assets/entities/mario.png', //ubicacion
        { frameWidth: 18, frameHeight: 16 } //Framewidth es el espaciado entre posiciones en el png
    )

    this.load.audio( 
        'gameover',
        '../assets/sound/music/gameover.mp3'
    )

     this.load.audio(
         'jump',
         '../assets/sound/effects/jump.mp3'
    )

} //1

function create () {

    console.log('create')
    this.add.image(100, 50, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15)

    this.floor = this.physics.add.staticGroup()

    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor
        .create(160, config.height -16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    // this.add.tileSprite(0, config.height - 32, 64, 32, 'floorbricks')
    //     //tileSprite(extr(x), y, x, extr(y), id)
    //     .setOrigin(0, 0)

    // this.add.tileSprite(100, config.height - 32, 64, 32, 'floorbricks')
    //     .setOrigin(0, 0)

    // this.mario = this.add.sprite(50, 210, 'mario')
    // .setOrigin(0,1)

    this.mario = this.physics.add.sprite(50, 11, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(500)

    this.physics.world.setBounds(0, 0, 2000, config.height)

    this.physics.add.collider(this.mario, this.floor)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    createAnimations(this)

    this.keys = this.input.keyboard.createCursorKeys()
    //permite identificar las teclas del teclado

} //2

function update () {
    console.log('update')
    if (this.mario.isDead) return //Para terminar en caso de muerte

    if (this.keys.left.isDown){ //Si la tecla izquierda esta presionada mueve hacia la izquierda, eje x - 2
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2
        this.mario.flipX = true
    } else if (this.keys.right.isDown) { //Si la tecla derecha esta presionada mueve hacia la derecha, eje x + 2
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
        this.mario.flipX = false
    } else {
        this.mario.anims.play('mario-idle', true)
    }

    if (this.keys.up.isDown && this.mario.body.touching.down){ //Salto realista afectado por gravedad
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true)
        this.sound.add('jump', {volume: 0.2}).play()
    }

    // Muerte de Mario
    if (this.mario.y >= config.height){ // Si se excede el limite se cambia de estado y animacion de muerte
        this.mario.isDead = true
        this.mario.anims.play('mario-dead')
        this.mario.setCollideWorldBounds(false)
        this.sound.add('gameover', {volume: 0.2}).play()

        setTimeout(() => { //Esperar 100 mlseg y desplazar hacia arriba
            this.mario.setVelocityY(-350)
        }, 100)

        setTimeout(() => { //Esperar 2000 mlseg y reiniciar la escena 
            this.scene.restart()
        }, 2000)
    }
} //3 -> continuamente, estara generando fps en la seccion de consola de la web

//Los sprites son imagenes que contienen todas las posiciones de una entidad
//Se carga una sola imagen en seis posiciones o mas en lugar de cargar seis imagenes