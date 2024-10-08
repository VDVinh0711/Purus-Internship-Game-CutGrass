

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