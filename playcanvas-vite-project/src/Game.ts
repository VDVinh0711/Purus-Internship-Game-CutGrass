import * as pc from 'playcanvas';
import { SceneManager } from './SceneManager.ts';
import { BladeManager } from './BladeManger/BladeManager.ts';
import { GrassManager } from './GrassManager.ts';
import { MapManager } from './Map/MapManager.ts';

export class Game {
    private app: pc.Application;
    private sceneManager: SceneManager;
    private bladeManager: BladeManager;
    private grassManager: GrassManager;
    private mapManager : MapManager;

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
        this.grassManager.rotate(0,-0.4,0);
        this.grassManager.setPosition(0,0,0);
        this.app.root.addChild(this.grassManager);


        this.mapManager = new MapManager(this.app);
        this.app.root.addChild(this.mapManager);


        const pcPoints = [
            new pc.Vec3(0, 0, 0),
            new pc.Vec3(1, 0, 0),
            new pc.Vec3(-1, 0, 0),
            new pc.Vec3(0, 0, 1),
            new pc.Vec3(0, 0, -1),
            // new pc.Vec3(3, 0, 7),
            // new pc.Vec3(-4, 0, -9),
            // new pc.Vec3(8, 0, 2),
            // new pc.Vec3(0, 0, -10),
            // new pc.Vec3(-7, 0, 6),
            // new pc.Vec3(5, 0, 0),
            // new pc.Vec3(-2, 0, 4),
            // new pc.Vec3(9, 0, -3),
            // new pc.Vec3(-1, 0, 8)
        ];

        this.mapManager.Spawmmap(pcPoints);
        this.grassManager.SpawmGrass(pcPoints);

        


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
        this.mapManager.update(dt);
      
    }
}
