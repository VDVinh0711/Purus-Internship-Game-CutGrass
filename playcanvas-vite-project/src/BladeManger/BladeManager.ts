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
    

    constructor() 
    {
        super();
        this.Init();
       // this.setupMouseHandler();
        this.registerEventCollisionHandler();
        this.registerEvent();
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
    }

    private setWaiting()
    {
        this.isWaiting = true;
    }
    private unSetWaiting()
    {
        this.isWaiting = false;
        
    }



    private setPosCurrentMap()
    {
        this.setPosition(LevelManager.getInstance().getPosSpawmBlade())
    }
    //event colision
    private onBladeCollision(result: any) {
        if(this.isWaiting) return;
        if ( result.other.name === 'grass') {
            // Handle blade collision logic here
            PoolingGrass.getInstance().deSpawmGrass(result.other);

            //check win 
            this.countGrassCutted ++;
            const grassManager = EntityManager.getInstance().getEntity(SafeNameEntity.GrassManager) as GrassManager;
            if(this.countGrassCutted == grassManager.getCountGrass())
            {
                GameManger.getInstance().onWin();
            }

        }
    }

    //reset Blade
    private reset()
    {
        this.countGrassCutted = 0;
    }



    
    //event mouse
    private setupMouseHandler() {
        const mouse = new pc.Mouse(document.body);
        mouse.on('mousedown', () => {
            this.dir *= -1;
            this.angle += Math.PI;
            [this.enRoot, this.enRotating] = [this.enRotating, this.enRoot];
        });
    }

    //update
    public update(dt: number)
    {
        if(GameManger.getInstance().isLose || GameManger.getInstance().isWin) return;
        this.updateBlade(dt);
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

    private updateBlade(dt: number) 
    {
       
        this.enRoot.update(dt);
        this.enRotating.update(dt);
        
    }

    private checkIsOnGround()
    {
        if(this.isWaiting) return;
        const posStart = this.enRoot.getPosition();
        const posEnd =  new pc.Vec3(posStart.x,posStart.y - 5,posStart.z);
        pc.Application.getApplication()?.drawLine(posStart,posEnd,new pc.Color(1,0,1));
        const resultRay = pc.Application.getApplication()?.systems.rigidbody?.raycastFirst(posStart,posEnd);
        if(resultRay)
        {
           // console.log("inonground");
        } 
        else
        {
           GameManger.getInstance().onLose();
        }
    }
}