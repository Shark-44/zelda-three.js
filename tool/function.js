import { ColliderDesc, RigidBodyDesc } from "@dimforge/rapier3d-compat";

function createColliderGeo(geo, rigidBody, physic) {
    const vertices = new Float32Array(geo.attributes.position.array)
    const indices = new Float32Array(geo.index.array)
    const colliderDesc = ColliderDesc.trimesh(vertices, indices)
    return physic.createCollider(colliderDesc, rigidBody)
}
function createColliderBall(radius, rigidBody, physic) {
    const colliderDesc = ColliderDesc.ball(radius)
    return physic.createCollider(colliderDesc, rigidBody)
}

export function createRigidBodyEntity(position, physic) {
    const rigidBodyDesc = RigidBodyDesc.dynamic()
    rigidBodyDesc.setTranslation(...position)
    const rigidBody = physic.createRigidBody(rigidBodyDesc)
    const collider = createColliderBall(0.25, rigidBody, physic)
    return {rigidBody, collider}
}

export function createRigidBodyFixed(mesh, physic) {
    const rigidBodyDesc = RigidBodyDesc.fixed()
    const rigidBody = physic.createRigidBody(rigidBodyDesc)
    const collider = createColliderGeo(mesh.geometry, rigidBody, physic)
    
}

export function floor(float, max = 0.2) {
    return Math.abs(float) < max ? 0 : float
}