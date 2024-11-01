import * as pc from 'playcanvas';
import { SceneGameManager } from './SceneGameManager';

// Configure and load Ammo.js
pc.WasmModule.setConfig('Ammo', {
  glueUrl: 'Physics/ammo.js',
  wasmUrl: 'Physics/ammo.wasm.wasm',
  fallbackUrl: 'Physics/ammo.wasm.js'
});

async function main() {
    await new Promise<void>((resolve) => {
        pc.WasmModule.getInstance('Ammo', () => resolve());
    });
  
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    document.body.appendChild(canvas);

    console.log(window.innerWidth);
    console.log(window.innerHeight);
    let app = new pc.Application(canvas, {
        elementInput: new pc.ElementInput(canvas),
        mouse: new pc.Mouse(document.body),
        keyboard: new pc.Keyboard(window),
    });


    new SceneGameManager(app);
}

main().catch(console.error);