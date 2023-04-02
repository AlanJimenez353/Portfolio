import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Contenedor que contiene todos los objetos camaras y luces
const scene = new THREE.Scene();

//Primer argumento, cantidad de vision, es un numero sobre 300 grados, por lo que 75 es maso menos lo que ve el ojo humano 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

//posicionamos la camara en el centro de la pantalla
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);

//Cremos objeto ---> En los docs de Three.js estan todos los objetos para revisar
const geometry = new THREE.TorusGeometry(10, 3, 16, 100) //Anillo
//const geometryBall = new THREE.SphereGeometry( 15, 32, 16 ); //Bola


const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material);


scene.add(torus)

//Luces 

//este tipo de luz se usa para focusear ciertos objetos (Una especie de linterna)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)
//scene.add(pointLight)


//Esta luz se usa para focusear la escena entera (seria como un foco de una habitacion)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
//Grid Helper agrega una linea en el medio para orientarse en la perspectiva
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)
//Manejo de la camara con cursor
const controls = new OrbitControls(camera, renderer.domElement)

//Agregar elementos random a la escena
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);


    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star)
}
//Agrego 200 estrellas al fondo
Array(200).fill().forEach(addStar)

//Background

const spaceTexture= new THREE.TextureLoader().load('galaxy.jpg')
scene.background= spaceTexture;



//Convertir objetos en 2D en imagenes tridimencionales 
//Cubo con mi foto
const alanTexture= new THREE.TextureLoader().load('alan.png');
const alan =new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map:alanTexture})
);
//scene.add(alan)


//Moon

const moonTexture= new THREE.TextureLoader().load('moon2.jpg')
//Esta linea se encarga de darle la ilusion de profundidad a la textura de la luna
const normalTexture= new THREE.TextureLoader().load('normal.jpg')
const moon= new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
)
scene.add(moon)


function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.1;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    //Detecta y actualiza la vista en base al cursor
    controls.update();

    renderer.render(scene, camera)


}
animate()