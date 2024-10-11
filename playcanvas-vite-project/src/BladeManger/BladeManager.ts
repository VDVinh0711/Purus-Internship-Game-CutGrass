import * as pc from 'playcanvas';
import { Blade } from './Blade';
import { Rope } from './Rope';
import { GameManger } from '../GameManager';
import { PoolingGrass } from '../Utils/PoolingGrass';
import { GrassManager } from '../GrassManager/GrassManager';
import EntityManager from '../Entity/EntityManager';
import { SafeNameEntity } from '../Helper/SafeNameEntity';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { LevelManager } from '../Level/LevelManager';
import { ScoreManager } from '../Player/ScoreManager';
export class BladeManager extends pc.Entity {

    private enRoot!: Blade;
    private enRotating!: Blade;
    private angle: number = 0;
    private radius: number = 3;
    private speed: number = 4;
    private dir: number = 1;
    private rope !: Rope;
    private countGrassCutted : number = 0;
    public isWaiting : boolean = true;
    private grassManager !:GrassManager;
    

    constructor() 
    {
        super();
        this.Init();
        this.registerEventCollisionHandler();
        this.registerEvent();
        EntityManager.getInstance().registerEntity(SafeNameEntity.BladeManager,this);
    }

    private Init() 
    {
        //Blade 1
        this.enRoot = new Blade('blade1').Init(new pc.Vec3(0,0, 0));
        this.root.addChild(this.enRoot);
        //Blade 2
        this.enRotating = new Blade('blade2').Init(new pc.Vec3(0, 0, 0));
        this.root.addChild(this.enRotating);
        // rope
        this.rope = new Rope('Rope').Init();
        this.root.addChild(this.rope);

        this.grassManager = EntityManager.getInstance().getEntity(SafeNameEntity.GrassManager) as GrassManager;
    }

    //register event colision
    private registerEventCollisionHandler()
    {
        this.enRoot.on('blade:collision', this.onBladeCollision, this);
        this.enRotating.on('blade:collision', this.onBladeCollision, this);
        this.rope.on('rope:collision', this.onBladeCollision, this);
    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.ResetBladeManager, this.reset.bind(this));
        EventManager.on(SafeKeyEvent.SetPosBladeFromCurMap, this.setPosCurrentMap.bind(this));

        EventManager.on(SafeKeyEvent.SetWaitingBlade, this.setWaiting.bind(this));
        EventManager.on(SafeKeyEvent.UnSetWatingBlade, this.unSetWaiting.bind(this));

        EventManager.on(SafeKeyEvent.ClickIntoScreen, this.reverseDirectionAndRotate.bind(this));
    }

    private setWaiting()
    {
        this.isWaiting = true;
    }
    private unSetWaiting()
    {
        this.isWaiting = false;
        
    }



    public setPosCurrentMap()
    {
        const posSet = LevelManager.getInstance().getPosSpawmBlade()
        this.setPosition(posSet);
        this.enRoot.setPosition(posSet); 
    }
    //event colision
    private onBladeCollision(result: any) {
        if(this.isWaiting) return;
        if ( result.other.name === 'grass') {
            // Handle blade collision logic here
            PoolingGrass.getInstance().deSpawmGrass(result.other);
            ScoreManager.getInstance().AddScore(1);
            //check win 
            this.countGrassCutted ++;
            if(this.countGrassCutted != this.grassManager.getCountGrass()) return;
            GameManger.getInstance().onWin();

        }
    }

    //reset Blade
    private reset()
    {
        this.isWaiting = true;
        this.countGrassCutted = 0;
    }

    private reverseDirectionAndRotate()
    {
        this.dir *= -1;
        this.angle += Math.PI;
        [this.enRoot, this.enRotating] = [this.enRotating, this.enRoot];
    }
    
    //update
    public update(dt: number)
    {
        if(GameManger.getInstance().isLose || GameManger.getInstance().isWin) return;
        this.enRoot.update(dt);
        this.enRotating.update(dt);
        this.rotateChainSaw(dt);
        //update rope
        this.rope.updateRope(this.enRoot.getPosition(), this.enRotating.getPosition());
   
        this.checkIsOnGround();
    }
 
    private rotateChainSaw(dt: number) 
    {
        this.angle += this.dir * (this.speed * dt);
        const rootPos = this.enRoot.getPosition();
        const x = Math.cos(this.angle) * this.radius;
        const z = Math.sin(this.angle) * this.radius;
        this.enRotating.setPosition(rootPos.x + x, rootPos.y, rootPos.z + z);
    }

    

    private checkIsOnGround()
    {
        if(this.isWaiting) return;
        const posStart = this.enRoot.getPosition().clone();
        const posEnd =  new pc.Vec3(posStart.x,posStart.y - 10,posStart.z);
        pc.Application.getApplication()?.drawLine(posStart,posEnd,new pc.Color(1,0,1));
        const resultRay = pc.Application.getApplication()?.systems.rigidbody?.raycastFirst(posStart,posEnd);
        if (!resultRay) {
            console.log("Ground check failed - no ground detected");
            GameManger.getInstance().onLose();
        }
    }
}