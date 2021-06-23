var capMaterial = null;
var bodyMaterial = null;

var scene = new THREE.Scene();
scene.background = new THREE.Color('0xf1f1f1');

const canvas = document.querySelector('#scene1');

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(5,5,5);
scene.add(camera);

var renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.autoRotate = true;
//controls.autoRotateSpeed = 5;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(20, 20, 20);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(20, 20, -20).normalize();

var ambientLight = new THREE.AmbientLight();

scene.add(ambientLight);
//scene.add(keyLight);
//scene.add(fillLight);
//scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('https://raw.githubusercontent.com/fnaseem/3dModelTest/main/Test/Test.mtl',function(material){
   material.preload();
 
  capMaterial = material.materials.blinn8SG;
  bodyMaterial = material.materials.blinn5SG;
  
   var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(material);
	objLoader.load('https://raw.githubusercontent.com/fnaseem/3dModelTest/main/Test/TestNoMtl.obj', function(object){
	object.position.set(0,0,0);
	scene.add(object);
  //renderer.render(scene, camera);
});
});

var animate= function(){
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
};

animate();

function updateColor(classNaming){
  varPart = classNaming.substring(0,3);
  varColor = classNaming.substring(3,classNaming.length);
 
   if(varPart ==="Cap"){
     console.log(varColor);
     capMaterial.color.set(varColor);
      }else{
        bodyMaterial.color.set(varColor);
      }
  
  animate();
}