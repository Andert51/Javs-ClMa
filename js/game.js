// Global Phaser, configuracion del juego
//Para que funcione cualquier juego con phaser se necesita una config
//el objeto global define donde carga el videojuego, en este caso

const config = {

    type: Phaser.AUTO, // webgl , canvas or auto, tipo de soporte, es un objeto global, auto usa wbgl primero
    width: 256,
    height: 244, // Super Mario bros = resolution 256x244 px
    backgroundColor: '#4682b4',
    parent: 'game', // id in html, en que contenedor
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
        '../assets/entities/mario.png',
        { frameWidth: 14, frameHeight: 16 } //Framewidth es el espaciado entre posiciones en el png
    )

} //1

function create () {
    console.log('create')
    this.add.image(100, 50, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15)

    this.add.sprite(50, 210, 'mario')
    .setOrigin(0,1)

    this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
    //tileSprite(extr(x), y, x, extr(y), id)
    .setOrigin(0, 0)

    
    

} //2

function update () {
    console.log('update')
} //3 -> continuamente, estara generando fps en la seccion de consola de la web

//Los sprites son imagenes que contienen todas las posiciones de una entidad
//Se carga una sola imagen en seis posiciones o mas en lugar de cargar seis imagenes