import "./style.css";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

class ThreeObject{
	constructor(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.FOV = 75;

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(this.FOV, this.width / this.height, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);
		document.body.appendChild(this.renderer.domElement);
	}


}

//setting up the scene
/*const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xffccff });
const sphere_1 = new THREE.Mesh(geometry, material);*/

// camera.position.z = 20;

function animate() {
}
	
//check if WEBGL is avalible
if (WebGL.isWebGL2Available()) {
	// Initiate function or other initializations here
	renderer.setAnimationLoop(animate);
} else {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById("container").appendChild(warning);
}

