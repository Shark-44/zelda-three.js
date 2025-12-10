import { Object3D } from "three";

export default class Player extends Object3D {
    constructor(mesh) {
        super()
        this.position.copy(mesh.position)
        this.initPhysic()
        this.initVisual(mesh)
    }

    initPhysic() {

    }

    initVisual(mesh) {
        mesh.position.set(0,0,0)
        mesh.castShadow = true
        this.add(mesh)
    }
}