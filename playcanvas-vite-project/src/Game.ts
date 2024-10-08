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

        this.app.start();
        this.setupPhysics();
        this.sceneManager = new SceneManager(this.app);

        
        this.bladeManager = new BladeManager();
        this.app.root.addChild(this.bladeManager);

        this.grassManager = new GrassManager();
        this.app.root.addChild(this.grassManager);


        this.setupEventListeners();
        
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
