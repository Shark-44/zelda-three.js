import { Object3D } from "three";

export default class Worlds extends Object3D {
    constructor(visuals, colliders) {
        super()
        this.initPhysic(colliders)
        this.initVisual(visuals)
    }

    initPhysic() {

    }

    initVisual(meshes) {
        for(const mesh of meshes) {
            mesh.receiveShadow = true
            mesh.castShadow = true
            this.add(mesh)
        }
    }
}