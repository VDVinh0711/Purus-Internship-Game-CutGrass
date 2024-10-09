import * as pc from 'playcanvas';
import { BladeManager } from './BladeManger/BladeManager.ts';
import { GrassManager } from './GrassManager/GrassManager.ts';
import { MapManager } from './Map/MapManager.ts';
import { Camera } from './Entity/Camera.ts';
import { Light } from './Entity/Light.ts';
import { GameManger } from './GameManager.ts';
export class SceneGameManager {
    private camera!: Camera;
    private light!: pc.Entity;

    private app: pc.Application;
    private bladeManager!: BladeManager;
    private grassManager!: GrassManager;
    private mapManager !: MapManager;


    
    constructor(canvas: HTMLCanvasElement) {
        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(document.body),
            keyboard: new pc.Keyboard(window),
            elementInput: new pc.ElementInput(canvas)
        });

        this.app.start();
        this.setupPhysics();
        this.setupEventListeners();
        this.setUpScene();


        //this.setupMouseHandler();
        //test debug
        GameManger.getInstance().onStartGame();
    
        
    }


    private setUpScene() {
        //Camera
        this.camera = new Camera();
        this.app.root.addChild(this.camera);

        //Light
        this.light = new Light();
        this.app.root.addChild(this.light);


        //GrassManager
        this.grassManager = new GrassManager();
        this.grassManager.rotate(0,-0.4,0);
        this.grassManager.setPosition(0,0,0);
        this.app.root.addChild(this.grassManager);

        //MapManager
        this.mapManager = new MapManager();
        this.app.root.addChild(this.mapManager);

         //BladeManger
         this.bladeManager = new BladeManager();
         this.app.root.addChild(this.bladeManager);

    }
 
    private setupPhysics() {
        this.app.systems.rigidbody?.gravity.set(0, -9.8, 0);
    }

    private setupEventListeners() {
        window.addEventListener('resize', () => this.app.resizeCanvas());
        this.app.on('update', this.update.bind(this));
    }



    private setupMouseHandler() {
        const mouse = new pc.Mouse(document.body);
        mouse.on('mousedown', () => {
               GameManger.getInstance().nextMapInLevel();
        });
    }

    private update(dt: number) {
        
        this.bladeManager.update(dt);
        //this.mapManager.update(dt);
      
    }



    
}