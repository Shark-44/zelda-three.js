import { floor, angle } from '../tool/function'

const ATTACK = 0 
const JUMP = 1
const LOCK = 2
const X = 0
const Z = 1



export default class Gamepad {
    get gamepad() {
        return navigator.getGamepads()[0]
    }

    get x() {
        if(!this.gamepad) return 0
        return floor(this.gamepad.axes[X])
    }

    get z() {
        if(!this.gamepad) return 0
        return floor(this.gamepad.axes[Z])
    }

    get attack() {
        if(!this.gamepad) return false
        return this.gamepad.buttons[ATTACK].pressed
    }

    get jump() {
        if(!this.gamepad) return false
        return this.gamepad.buttons[JUMP].pressed
    }

    get lock() {
        if(!this.gamepad) return false
        return this.gamepad.buttons[LOCK].pressed
    }

    get angle() {
        return angle(this.x, this.z)
    }

    get moving() {
        return Math.abs(this.x) || Math.abs(this.z)
    }
}