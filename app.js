import {Scene} from 'three'
import Camera from './engine/camera'
import Light  from './engine/light'
import Graphic from './engine/graphic'
import {loaderWorld, loaderEntity} from './tool/loader'
import World from './entity/world'
import Player from './entity/player'
import physic from './engine/physic'

const assetW = await loaderWorld('./glb/world0.glb')
const assetP = await loaderEntity('./glb/character.glb')

const scene = new Scene()
const camera = new Camera()

const world = new World(assetW.visuals, assetW.colliders, physic)
const player = new Player(assetP, physic)
const light = new Light()


scene.add(world)
scene.add(player)
scene.add(light)


const graphic = new Graphic(scene, camera)
graphic.onUpdate(dt => {
    physic.step()
    player.update(dt)
    camera.update(player)
    light.update(player)
})