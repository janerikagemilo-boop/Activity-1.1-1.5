import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//Scene
const scene = new THREE.Scene()

//Object 
const geometry = new THREE.OctahedronGeometry(1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Axes Helper (X: red, Y: green, Z: blue)
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Sizes: use full viewport
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
camera.lookAt(mesh.position)
scene.add(camera)

//Renderer
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#202025', 1)

// Camera controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Animate
const tick = () => {
    // Restore rotation
    mesh.rotation.y += 0.01
    mesh.rotation.x += 0.005
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()