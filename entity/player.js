import { Object3D, Vector3 } from "three";
import { createRigidBodyEntity, range} from "../tool/function"
import Gamepad from "../control/gamepad";
import Animator from "../engine/animator";

const SPEED = 3
const ATTACK = 'attack1'
const IDLE = 'idle'
const RUN = 'run'

const GRASS = 'grass'
const YELL = './sound/attack2.wav'
const GRASS_R = './sound/step_grass1.wav'
const GRASS_L = './sound/step_grass3.wav'
const STONE_R = './sound/step_stone1.wav'
const STONE_L = './sound/step_stone3.wav'
const WOOD_R = './sound/step_wood1.wav'
const WOOD_L = './sound/step_wood2.wav'
const DIRT_R = './sound/step_dirt1.wav'
const DIRT_L = './sound/step_dirt3.wav'

export default class Player extends Object3D {
    collider = null
    rigidBody = null
    animmator = null
    ctrl = new Gamepad()

    constructor(mesh, physic) {
        super()
        const origin = new Vector3(0,4,0)
        this.initPhysic(physic, origin)
        this.initVisual(mesh)
        this.initAnimations(mesh)
        this.initSounds()
    }

    initPhysic(physic, origin) {
        const {rigidBody, collider} = createRigidBodyEntity(origin, physic)
        this.rigidBody = rigidBody
        this.collider = collider
    }

    initVisual(mesh) {
        this.add(mesh)
    }

    initAnimations(mesh) {
        const animator = new Animator(mesh)
        animator.load(ATTACK, 0.3)
        animator.load(IDLE, 3)
        animator.load(RUN,0.5)
        this.animmator = animator
    }

    update(dt){
        this.updatePhysic(dt)
        this.updateVisual(dt)
        this.updateAnimation(dt)
    }

    updatePhysic(dt) {
        const x = this.ctrl.x * SPEED
        const z = this.ctrl.z * SPEED
        const y = this.rigidBody.linvel().y
        this.rigidBody.setLinvel({x,y,z}, true)
        
    }

    updateVisual(dt) {
        this.position.copy(this.rigidBody.translation())
        if(this.ctrl.moving)
        this.rotation.y += range (this.ctrl.angle, this.rotation.y) * dt * 10
    }

    updateAnimation(dt) {
        if(this.ctrl.attack) {
            this.animmator.play(ATTACK)
        } else if (this.ctrl.moving) {
            this.animmator.play(RUN)
        } else {
            this.animmator.play(IDLE)
        }
        this.animmator.update(dt)
    }
}