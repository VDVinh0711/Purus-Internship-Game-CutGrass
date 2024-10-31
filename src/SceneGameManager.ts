import * as pc from 'playcanvas';
import { BladeManager } from './BladeManger/BladeManager';
import { GrassManager } from './GrassManager/GrassManager';
import { GroundManager } from './Ground/GroundManager';
import { Camera } from './Entity/Camera';
import { Light } from './Entity/Light';
import { InputSystem } from './Utils/InputSystem';
import { ItemHelperManager } from './ItemHelper/ItemHelperManager';
import { ParticleSystem } from './Particle/ParticlesManager';
import { UiManager } from './UserInterface/UIManager';
import { AssetManager } from './Utils/AssetManager';
import { GameManger } from './GameManager';
import { Plane } from './Entity/Plane';
import { LevelManager } from './Level/LevelManager';
import { SoundManager } from './SoundManager/SoundManager';



export class SceneGameManager {
    private camera!: Camera;
    private light!: pc.Entity;
    private app: pc.Application;
    private bladeManager!: BladeManager;
    private grassManager!: GrassManager;
    private mapManager!: GroundManager;
    private inputSystem!: InputSystem;
    private particleSystem!: ParticleSystem;
    private itemHelperManager!: ItemHelperManager;
    private UIManager!: UiManager;
    private isLoading : boolean = true;
    private backGround !: pc.Entity ;
    private soundManager !: SoundManager;
   

    constructor(app: pc.Application) {
        this.app = app;
        this.app.start();
        this.setupEventListeners();
        this.initializeGame();
    }

    private async initializeGame() {

        //camera
        this.camera = new Camera();
        this.app.root.addChild(this.camera);

        //light
        this.light = new Light();
        this.app.root.addChild(this.light);

        //input
        this.inputSystem = new InputSystem();
        this.inputSystem.doSomething();

         //UiManager
        this.UIManager = new UiManager(this.app);
        this.app.root.addChild(this.UIManager);
        

        await LevelManager.getInstance().loadData();


        const assetManager = AssetManager.getInstance();
        assetManager.on('assetsLoaded', this.onAssetsLoaded, this);
        assetManager.LoadAsset(this.app);
    }

    private onAssetsLoaded = () => {
        this.setUpScene();
        this.isLoading = false;

    }

    private setUpScene() {
       

        //background
        this.backGround = new Plane();
        this.app.root.addChild(this.backGround);
       
        //Sound
        this.soundManager = new SoundManager();
        this.app.root.addChild(this.soundManager);

        //GrassManager
        this.grassManager = new GrassManager();
        this.app.root.addChild(this.grassManager);

        //MapManager
        this.mapManager = new GroundManager();
        this.app.root.addChild(this.mapManager);

        //BladeManager
        this.bladeManager = new BladeManager();
        this.app.root.addChild(this.bladeManager);

        //ItemHelper
        this.itemHelperManager = new ItemHelperManager();
        this.app.root.addChild(this.itemHelperManager);

        //ParticleSystem
        this.particleSystem = new ParticleSystem();
        this.app.root.addChild(this.particleSystem);

      
    
        //UI
        this.UIManager.init();
    
        //Start Game
        GameManger.getInstance().setUpBegin();

    }

    
    private setupEventListeners() {
        window.addEventListener('resize', () => this.app.resizeCanvas());
        this.app.on('update', this.update.bind(this));
    }

    private update(dt: number) {
        if(this.isLoading) return;
        this.bladeManager.update(dt);
        this.camera.update();
        this.UIManager.upDate();
    }
}