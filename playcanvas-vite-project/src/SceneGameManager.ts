import * as pc from 'playcanvas';
import { BladeManager } from './BladeManger/BladeManager';
import { GrassManager } from './GrassManager/GrassManager';
import { MapManager } from './Map/MapManager';
import { Camera } from './Entity/Camera';
import { Light } from './Entity/Light';
import { InputSystem } from './Utils/InputSystem';
import { ItemHelperManager } from './ItemHelper/ItemHelperManager';
import { ParticleSystem } from './Particle/ParticlesManager';
import { UiManager } from './UserInterface/UIManager';
import { AssetManager } from './Utils/AssetManager';
import { GameManger } from './GameManager';

export class SceneGameManager {
    private camera!: Camera;
    private light!: pc.Entity;
    private app: pc.Application;
    private bladeManager!: BladeManager;
    private grassManager!: GrassManager;
    private mapManager!: MapManager;
    private inputSystem!: InputSystem;
    private particleSystem!: ParticleSystem;
    private itemHelperManager!: ItemHelperManager;
    private UIManager!: UiManager;
    private isLoading : boolean = true;

    constructor(app: pc.Application) {
        this.app = app;
        this.app.start();
        this.setupPhysics();
        this.setupEventListeners();
        this.initializeGame();
    }

    private initializeGame() {

        //camera
        this.camera = new Camera();
        this.app.root.addChild(this.camera);

        //light
        this.light = new Light();
        this.app.root.addChild(this.light);

        //input
        this.inputSystem = new InputSystem();

        const assetManager = AssetManager.getInstance();
        assetManager.on('assetsLoaded', this.onAssetsLoaded, this);
        assetManager.LoadAsset(this.app);
    }

    private onAssetsLoaded = () => {
        this.setUpScene();
        this.isLoading = false;
        GameManger.getInstance().onStartGame();
    }

    private setUpScene() {
       

        this.grassManager = new GrassManager();
        this.grassManager.rotate(0, -0.4, 0);
        this.grassManager.setPosition(0, 0, 0);
        this.app.root.addChild(this.grassManager);

        this.mapManager = new MapManager();
        this.app.root.addChild(this.mapManager);

        this.bladeManager = new BladeManager();
        this.app.root.addChild(this.bladeManager);

        this.itemHelperManager = new ItemHelperManager();
        this.app.root.addChild(this.itemHelperManager);

        

        this.particleSystem = new ParticleSystem();
        this.app.root.addChild(this.particleSystem);

        this.UIManager = new UiManager();
        this.app.root.addChild(this.UIManager);

    }

    private setupPhysics() {
        this.app.systems.rigidbody?.gravity.set(0, -9.8, 0);
    }

    private setupEventListeners() {
        window.addEventListener('resize', () => this.app.resizeCanvas());
        this.app.on('update', this.update.bind(this));
    }

    private update(dt: number) {
        if(this.isLoading) return;
        this.bladeManager.update(dt);
        this.camera.update(dt);

       
    }
}