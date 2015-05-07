// This source is the javascript needed to build a sky box in **three.js**
// It is the source about this [blog post](/blog/2011/08/15/lets-do-a-sky/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var skyboxMesh;

// ## bootstrap functions
// initialiaze everything
init();
// make it move			
animate();

// ## Initialize everything
function init() {

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
scene = new THREE.Scene();

	var urls = [
	  'images/posx.jpg',
	  'images/posy.jpg',
	  'images/posz.jpg',
	  'images/negx.jpg',
	  'images/negy.jpg',
	  'images/negz.jpg'
	];
		
	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );
	
	var shader = THREE.ShaderLib['cube'];
	shader.uniforms['tCube'].value= textureCube;
	var material = new THREE.ShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: shader.uniforms,
		  side: THREE.BackSide

	});

	skyboxMesh	= new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );

	scene.add( skyboxMesh );

	container = document.createElement( 'div' );
	document.body.appendChild( container );

renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
}

// ## Animate and Display the Scene
function animate() {
	// render the 3D scene
	render();
	// relaunch the 'timer' 
	requestAnimationFrame( animate );
	// update the stats
	stats.update();
}


// ## Render the 3D Scene
function render() {
	// move the camera based on a timer
	var timer = - new Date().getTime() * 0.0002; 
	camera.position.x = 1000 * Math.cos( timer );
	camera.position.z = 1000 * Math.sin( timer );
 

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
