// import * as pc from 'playcanvas';







// // Create canvas
// const canvas = document.createElement('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// document.body.appendChild(canvas);

// // Configure and load Ammo.js
// pc.WasmModule.setConfig('Ammo', {
//   glueUrl: '/Physics/ammo.js',
//   wasmUrl: '/Physics/ammo.wasm.wasm',
//   fallbackUrl: '/Physics/ammo.wasm.js'
// });

// async function main() {
//   // Wait for Ammo.js to load
//   await new Promise((resolve) => {
//     pc.WasmModule.getInstance('Ammo', resolve);
//   });

//   // Create the app
//   const app = new pc.Application(canvas, {
//     mouse: new pc.Mouse(document.body),
//     keyboard: new pc.Keyboard(window),
//     elementInput: new pc.ElementInput(canvas)
//   });

//   // Set up physics
//   app.systems.rigidbody?.gravity.set(0, -9.8, 0);

//   // Fill the window and automatically change resolution to be the same as the canvas size
//   app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
//   app.setCanvasResolution(pc.RESOLUTION_AUTO);

//   app.start();


//   // Ensure canvas is resized when window changes size
//   window.addEventListener('resize', () => app.resizeCanvas());

//   // Create camera
//   const camera = new pc.Entity('camera');
//   camera.addComponent('camera', {
//     clearColor: new pc.Color(0.5, 0.6, 0.9)
//   });
//   app.root.addChild(camera);
//   camera.setPosition(0, 5, 10);
//   camera.lookAt(0, 0, 0);

//   // Create light
//   const light = new pc.Entity('light');
//   light.addComponent('light', {
//     type: 'directional',
//     color: new pc.Color(1, 1, 1),
//     castShadows: true,
//     intensity: 2,
//     shadowBias: 0.2,
//     shadowDistance: 16,
//     normalOffsetBias: 0.05,
//     shadowResolution: 2048
//   });
//   light.setEulerAngles(45, 0, 0);
//   app.root.addChild(light);

//   // Create ground
//   const ground = new pc.Entity('ground');
//   ground.addComponent('model', { type: 'box' });
//   ground.setLocalScale(10, 0.1, 10);
//   ground.addComponent('rigidbody', {
//     type: 'static',
//     restitution: 0.5
//   });
//   ground.addComponent('collision', {
//     type: 'box',
//     halfExtents: new pc.Vec3(5, 0.05, 5)
//   });
//   app.root.addChild(ground);

//   //blade 1
//   const blade1 = new pc.Entity('box');
//   blade1.addComponent('model', { type: 'box' });
//   blade1.setPosition(0, 2, 0);
//   blade1.setLocalScale(1.5, 0.3, 0.1);
//   blade1.addComponent('rigidbody', {
//     type: 'Kinematic',
//     mass: 1,
//     restitution: 0.5
//   });
//   blade1.addComponent('collision', {
//     type: 'box',
//     halfExtents: new pc.Vec3(0.75, 0.15, 0.05)
//   });

//   blade1.collision?.on('collisionstart',(result) => 
//     {
//       console.log("coli");
//     });
//   app.root.addChild(blade1);

//   //blade 2
//   const blade2 = new pc.Entity('box');
//   blade2.addComponent('model', { type: 'box' });
//   blade2.setPosition(2, 2, 0);
//   blade2.setLocalScale(1.5, 0.3, 0.1);
//   blade2.addComponent('rigidbody', {
//     type: 'Kinematic',
//     mass: 1,
//     restitution: 0.5
//   });
//   blade2.addComponent('collision', {
//     type: 'box',
//     halfExtents: new pc.Vec3(0.75, 0.15, 0.05)
//   });
 
//   blade2.collision?.on('collisionstart',(result) => 
//   {
//     console.log("coli");
//   });

//   console.log(blade2);
//   app.root.addChild(blade2);



//   //entity test

//   const entitytest = new pc.Entity('box');
//   entitytest.addComponent('model', { type: 'box' });
//   entitytest.setPosition(0.5, 2, 0);
//   entitytest.setLocalScale(0.1, 10, 0.1);
//   entitytest.addComponent('rigidbody', {
//     type: 'Dynamic',
//     mass: 1,
//     restitution: 0.5
//   });
//   entitytest.addComponent('collision', {
//     type: 'box',
//     halfExtents: new pc.Vec3(0.1/2, 5, 0.1/2)
//   });
 
//   app.root.addChild(entitytest);



//   //create capsual
  
 


// //   function createGrass(x:number , y:number , z:number)
// //   {
// //     const grass = new pc.Entity('sphere');
// //     grass.addComponent('model', { type: 'sphere' });
// //     grass.setPosition(x, y, z);
// //     grass.setLocalScale(1, 1, 1 );
// //     grass.addComponent('rigidbody', {
// //       type: 'Dynamic',
// //       mass: 1,
// //       restitution: 0.5
// //     });
// //     grass.addComponent('collision', {
// //       type: 'sphere',
// //       halfExtents: new pc.Vec3(0.1/2, 5, 0.1/2)
// //     });
   
// //     app.root.addChild(grass);
// //   }



// //   for (let i = -10; i < 10; i += 1) {
// //     for (let j = -10; j < 10; j += 1) {
// //         createGrass(i,0,j);
// //     }
// // }


  


//   let root = blade1;
//   let rotating = blade2;

//   let angle = 0;
//   let radius = 3;
//   let dir = 1;
//   // Update function to rotate the box
//   app.on('update', (dt) => {


//     blade1.rotate(0, 100 * dt, 0);
//     blade2.rotate(0, 100 * dt, 0);


//     angle += dir * (1 * dt);
//     var rootPos = root.getPosition();
//     var x = Math.cos(angle) * radius;
//     var z = Math.sin(angle) * radius;
//     rotating.setPosition(rootPos.x + x, rootPos.y, rootPos.z + z);

//   });




//     //event mouse
//     const mouse = new pc.Mouse(document.body);
//     mouse.on('mousedown', function (event) {
//       console.log("click");
//       let temp = root;
//       root = rotating;
//       rotating = temp;
//       dir *= -1;
//       angle += 3.14159265358980;
//     });
  
  

// }

// main().catch(console.error);


import * as pc from 'playcanvas';
import { Game } from './Game';

// Configure and load Ammo.js
pc.WasmModule.setConfig('Ammo', {
  glueUrl: '/Physics/ammo.js',
  wasmUrl: '/Physics/ammo.wasm.wasm',
  fallbackUrl: '/Physics/ammo.wasm.js'
});

async function main() {
    await new Promise<void>((resolve) => {
        pc.WasmModule.getInstance('Ammo', () => resolve());
    });

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    new Game(canvas);
}

main().catch(console.error);