// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create an octagon shape
function createOctagonGeometry(radius = 1) {
    const shape = new THREE.Shape();
    const segments = 8; // Octagon has 8 sides
    const angleStep = (Math.PI * 2) / segments;
    
    // Move to first point
    shape.moveTo(radius * Math.cos(0), radius * Math.sin(0));
    
    // Draw the octagon
    for (let i = 1; i <= segments; i++) {
        const angle = angleStep * i;
        shape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
    }

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.5,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 3
    });

    return geometry;
}

// Create the octagon mesh
const geometry = createOctagonGeometry(1);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x00ff88,
    shininess: 100,
    specular: 0x444444
});
const octagon = new THREE.Mesh(geometry, material);

// Center the geometry
octagon.geometry.center();
scene.add(octagon);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 0.8;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Slowly rotate the octagon
    octagon.rotation.x += 0.002;
    octagon.rotation.y += 0.002;

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
});

// Start the animation loop
animate();