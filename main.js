import "./style.css";
import * as THREE from "three";
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//setting up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xffcc})
const materialII = new THREE.LineBasicMaterial({color: 0xffff});
const cube = new THREE.Mesh( geometry, material )
scene.add(cube);

camera.position.z = 2;

function animate() {
	renderer.render(scene, camera);
	
}


//check if WEBGL is avalible
if ( WebGL.isWebGL2Available() ) {

	// Initiate function or other initializations here
	renderer.setAnimationLoop(animate);

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}
