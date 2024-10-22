import * as pc from 'playcanvas';
import { Blade } from './Blade';
import { Rope } from './Rope';
import { GameManger } from '../GameManager';
import { PoolingGrass } from '../GrassManager/PoolingGrass';
import { GrassManager } from '../GrassManager/GrassManager';
import EntityManager from '../Entity/EntityManager';
import { SafeNameEntity } from '../Helper/SafeNameEntity';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { LevelManager } from '../Level/LevelManager';
import { ScoreManager } from '../Player/ScoreManager';
import { BladeStat } from './BladeStat';
import { AssetManager } from '../Utils/AssetManager';
import { SafeKeyAsset } from '../Helper/SafeKeyAsset';
import { ImodelChaiSaw } from '../Interface/Imodeltexure';
import { ItemHelper } from '../ItemHelper/ItemHelper';
export class BladeManager extends pc.Entity {

    private enRoot!: Blade;
    private enRotating!: Blade;
    private angle: number = 0;
    private radius: number = 0;
    private speed: number = 4;
    private dir: number = 1;
    private rope !: Rope;
    private countGrassCutted: number = 0;
    public isPause: boolean = true;
    private grassManager !: GrassManager;
    public bladeStat !: BladeStat;


    private originRadius: number = 2;






    constructor() {
        super();
        this.Init();
        this.registerEventCollisionHandler();
        this.registerEvent();
        EntityManager.getInstance().registerEntity(SafeNameEntity.BladeManager, this);


        //test change modle

        const datamodel : ImodelChaiSaw = 
        {
           model : AssetManager.getInstance().getAsset(SafeKeyAsset.ModelBlade2)!,
           texure : AssetManager.getInstance().getAsset(SafeKeyAsset.TexureBlade)!

        }
        this.enRotating.setModelBlade(datamodel);
    }

    private Init() {

        //Stat
        this.bladeStat = new BladeStat(this);
        this.isPause = true;
        // rope
        this.rope = new Rope('Rope').Init();
        this.rope.setWidthRope(this.radius);
        this.root.addChild(this.rope);

        //Blade 1
        this.enRoot = new Blade('blade1').Init(new pc.Vec3(0, 0, 0));
        this.root.addChild(this.enRoot);
        //Blade 2
        this.enRotating = new Blade('blade2').Init(new pc.Vec3(0, 0, 0));
        this.root.addChild(this.enRotating);

        this.grassManager = EntityManager.getInstance().getEntity(SafeNameEntity.GrassManager) as GrassManager;
    }

    //register event colision
    private registerEventCollisionHandler() {
        this.enRoot.on('blade:collision', this.onBladeCollision, this);
        this.enRotating.on('blade:collision', this.onBladeCollision, this);
        this.rope.on('rope:collision', this.onBladeCollision, this);
    }

    private registerEvent() {
        EventManager.on(SafeKeyEvent.ResetBladeManager, this.reset.bind(this));
        EventManager.on(SafeKeyEvent.SetPosBladeFromCurMap, this.setPosCurrentMap.bind(this));
        EventManager.on(SafeKeyEvent.SetPauseBlade, this.setWaiting.bind(this));
        EventManager.on(SafeKeyEvent.UnSetPauseBlade, this.unSetWaiting.bind(this));
        EventManager.on(SafeKeyEvent.ClickIntoScreen, this.handleClick.bind(this));
    }

    private setWaiting() {
        this.isPause = true;
    }
    private unSetWaiting() {
        this.isPause = false;
    }
    public setSpeedRotate(speed: number) {
        this.speed = speed;
    }
    public setRadiusBaldes(radius: number) {
        this.radius = radius;
        this.rope.setWidthRope(this.radius);
    }
    public getRadius(): number {
        return this.radius;
    }
    public getOriginRadius(): number {
        return this.originRadius;
    }
    public getSpeed(): number {
        return this.speed;
    }
    public getPosRootBlade(): pc.Vec3 {
        return this.enRoot.getPosition();
    }



    public setPosCurrentMap() {
        const posSet = LevelManager.getInstance().getPosSpawmBlade();
        this.setPosition(posSet);
        this.enRoot.setPosition(posSet);
        this.enRotating.setPosition(posSet);
        this.rope.updateRope(this.enRoot.getPosition(), this.enRotating.getPosition());
    }
    //event colision
    private onBladeCollision(result: any) {
        if (this.isPause) return;
        if (result.other.name === 'grass') {
            PoolingGrass.getInstance().deSpawmGrass(result.other);
            let scoreAdd = this.bladeStat.getIsPowering() ? 2 : 1;
            ScoreManager.getInstance().addScore(scoreAdd);
            EventManager.emit(SafeKeyEvent.PlayParticle, result.other.getPosition());
            EventManager.emit(SafeKeyEvent.SpawmScoreUI,result.other.getPosition(),scoreAdd)
            //check win 
            this.countGrassCutted++;
            if (this.countGrassCutted != this.grassManager.getCountGrass()) return;
            GameManger.getInstance().onWin();
            EventManager.emit(SafeKeyEvent.PlayParticleWIn, this.enRoot.getPosition());
        }
        else

        if (result.other instanceof  ItemHelper ) {
            result.other.onColisionEnter(this);
        }
    }

    //reset Blade
    private reset() {
        this.isPause = true;
        this.enRoot.enabled = true; 
        this.radius = 0;
        this.countGrassCutted = 0;
        this.bladeStat.setIsPowering(false);
    }


    //handle click
    private handleClick() {
        if (GameManger.getInstance().isLose || GameManger.getInstance().isWin) return;
        if (this.bladeStat.isLoadStat || this.bladeStat.isShrinking) return;
        if (this.isPause) return;

        //Rever
        this.reverseDirectionAndRotate();
        if (this.checkIsOnGround()) return;
        if (this.bladeStat.getIsPowering()) {
            this.reverseDirectionAndRotate();
            this.bladeStat.setIsPowering(false);
        }
        else {
            EventManager.emit(SafeKeyEvent.PlayParticleOutGround, this.enRoot.getPosition());
            this.enRoot.enabled = false;
            GameManger.getInstance().onLose();
        }
    }

    //change root rotate and dir
    private reverseDirectionAndRotate() {
       
        this.ChangeRotationDirection();
        this.angle += Math.PI;
        [this.enRoot, this.enRotating] = [this.enRotating, this.enRoot];

    }



    public ChangeRotationDirection()
    {
        this.dir *= -1;
        
    }

    //update
    public update(dt: number) {
        if (this.isPause ||GameManger.getInstance().isLose ) return;
        this.handelSetBeginBlade(dt);
        this.bladeStat.update(dt);
        this.enRoot.update(dt);
        this.enRotating.update(dt);
        this.rotateChainSaw(dt);
        //update rope
        this.rope.updateRope(this.enRoot.getPosition(), this.enRotating.getPosition());
    }



    private handelSetBeginBlade(dt: number) {
        if (this.radius < this.originRadius) {
            this.radius += dt;
            this.rope.setWidthRope(this.radius);
        }
    }

    //rotate blade
    private rotateChainSaw(dt: number) {
        this.angle += this.dir * (this.speed * dt);
        const rootPos = this.enRoot.getPosition();
        const x = Math.cos(this.angle) * this.radius;
        const z = Math.sin(this.angle) * this.radius;
        this.enRotating.setPosition(rootPos.x + x, rootPos.y, rootPos.z + z);
    }

    private checkIsOnGround(): boolean {
        if (this.isPause) return false;
        const posStart = this.enRoot.getPosition().clone();
        const posEnd = new pc.Vec3(posStart.x, posStart.y - 10, posStart.z);
       // pc.Application.getApplication()?.drawLine(posStart, posEnd, new pc.Color(1, 0, 1));
        const resultRay = pc.Application.getApplication()?.systems.rigidbody?.raycastFirst(posStart, posEnd);
        return resultRay != null;
    }
}