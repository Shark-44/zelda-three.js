import { LoopOnce, AnimationMixer } from "three";
import { findByName } from "../tool/function";

export default class Animator {

    animations = new Map() // la liste des animations
    mixer = null 
    clips = null // les animations dispo dans le fichier GLB
    current = null // en cours

    constructor(mesh) {
        this.mixer = new AnimationMixer(mesh)
        this.clips = mesh.clips
    }
    load(name, duration, once) {
        const clip = findByName(name, this.clips)
        const animation = this.mixer.clipAction(clip)
        animation.setDuration(duration)
        if(once) animation.setLoop(LoopOnce)
        this.animations.set(name, animation)
    }

    play(name) {
        const animation = this.animations.get(name)
        if(this.current && this.current !== animation) this.current.stop()
        this.current = animation
        if(this.current.isRunning()) return
        this.current.play()
    }

    update(dt) {
        this.mixer.update(dt)
    }
}