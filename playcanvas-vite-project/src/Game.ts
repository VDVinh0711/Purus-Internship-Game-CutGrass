import * as pc from 'playcanvas';
import { SceneManager } from './SceneManager.ts';
import { BladeManager } from './BladeManager.ts';
import { GrassManager } from './GrassManager.ts';

export class Game {
    private app: pc.Application;
    private sceneManager: SceneManager;
    private bladeManager: BladeManager;
    private grassManager: GrassManager;

    constructor(canvas: HTMLCanvasElement) {
        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(document.body),
            keyboard: new pc.Keyboard(window),
            elementInput: new pc.ElementInput(canvas)
        });

        this.setupPhysics();
        this.sceneManager = new SceneManager(this.app);
        this.bladeManager = new BladeManager(this.app);
        this.grassManager = new GrassManager(this.app);

       
        this.setupEventListeners();
        this.app.start();
    }

    private setupPhysics() {
        this.app.systems.rigidbody?.gravity.set(0, -9.8, 0);
    }

    private setupEventListeners() {
        window.addEventListener('resize', () => this.app.resizeCanvas());
        this.app.on('update', this.update.bind(this));
    }

    private update(dt: number) {
        this.bladeManager.update(dt);
      
    }
}
