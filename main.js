import "./style.css";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const navigation = document.getElementById("navigationContainer");
console.log(navigation)

navigation.addEventListener("click", (e) => {
	console.log(e.target)

	if(e.target.value === "Test btn"){
		console.log("button 0")
	}
})


window.addEventListener("click", checkPosOfMars);
window.addEventListener("load", () => {
	geometry.dispose();
	material.dispose();
/*	texture.dispose();
*/});

const width = window.innerWidth;
const height = window.innerHeight;
const FOV = 75;

//scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.domElement.className = "fixed top-0 -z-2";
document.body.appendChild(renderer.domElement);
camera.position.z = 32;
const controls = new OrbitControls(camera, renderer.domElement);

const marsTexture = new THREE.TextureLoader().load("/textures/8k_mars_texture.jpg");
const geometry = new THREE.SphereGeometry(1, 16, 12); //15, 64, 32
const material = new THREE.MeshBasicMaterial({ map: marsTexture });
const sphere = new THREE.Mesh(geometry, material);
sphere.rotation.y = Math.random();
sphere.rotation.z = Math.random();
sphere.rotation.x = Math.random();
//racast for mouse picking
const raycaster = new THREE.Raycaster();
scene.add(sphere);

function animate(t) {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	sphere.rotation.x = 0.000001 * t;
	sphere.rotation.z = 0.000001 * t;
}
renderer.setAnimationLoop(animate());

function checkPosOfMars() {
	// Convert mouse position to normalized device coordinates (-1 to +1)
	const mouse = new THREE.Vector2(
		(event.clientX / window.innerWidth) * 2 - 1,
		-(event.clientY / window.innerHeight) * 2 + 1,
	);

	// Set raycaster
	raycaster.setFromCamera(mouse, camera);

	// Check intersection with sphere
	const intersects = raycaster.intersectObject(sphere);
	if (intersects.length > 0) {
		const intersection = intersects[0];
		const point = intersection.point; // 3D position on the sphere in world coordinates

		console.log("World coordinates:", point);

		// Convert to Cartesian coordinates relative to sphere's center
		const sphereCenter = sphere.position;
		const localPoint = new THREE.Vector3().copy(point).sub(sphereCenter); // Relative to sphere center
		console.log("Cartesian coordinates:", localPoint);

		// Convert to spherical coordinates
		const radius = localPoint.length();
		const theta = Math.acos(localPoint.y / radius); // Polar angle
		const phi = Math.atan2(localPoint.z, localPoint.x); // Azimuthal angle
		console.log("Spherical coordinates:", { radius, theta, phi });

		// Theta and phi can be converted to latitude and longitude if needed:
		const latitude = 90 - (theta * 180) / Math.PI; // Latitude in degrees
		const longitude = (phi * 180) / Math.PI; // Longitude in degrees
		console.log("Latitude:", latitude, "Longitude:", longitude);
	}
}

/*
Valles Marineris:
LAT: -21.73022797750184 LONG: 41.355653806735944
LAT: -1.9554247905699356 LONG: 7.916663886574608

*/

const handleSphereLocation = ()=> {
	console.log("clicked");
}
