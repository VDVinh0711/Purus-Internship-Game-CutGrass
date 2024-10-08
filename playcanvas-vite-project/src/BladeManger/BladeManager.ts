import * as pc from 'playcanvas';
import { Blade } from './Blade';
import { Rope } from './Rope';
export class BladeManager extends pc.Entity {

    private enRoot!: Blade;
    private enRotating!: Blade;
    private angle: number = 0;
    private radius: number = 3;
    private speed: number = 4;
    private dir: number = 1;
    private rope !: Rope;



    constructor() {
        super();
        this.Init();
    }

    private Init() {
        

        //Blade 1
       this.enRoot = new Blade('blade1').Init(new pc.Vec3(5,1.5,0));
       this.root.addChild(this.enRoot);
       //Blade 2
       this.enRotating = new Blade('blade2').Init(new pc.Vec3(5,1.5,0));
       this.root.addChild(this.enRotating);


       // this.rope = this.createRope();
        this.rope = new Rope('Rope').Init();
        this.root.addChild(this.rope);

        //event click
        this.setupMouseHandler();
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
    public update(dt: number) {
        this.updateBlade(dt);
        this.rotateChainSaw(dt);

        //update rope
        this.rope.updateRope(this.enRoot.getPosition(), this.enRotating.getPosition());
    }


    private rotateChainSaw(dt:number)
    {
        this.angle += this.dir * (this.speed * dt);
        const rootPos = this.enRoot.getPosition();
        const x = Math.cos(this.angle) * this.radius;
        const z = Math.sin(this.angle) * this.radius;
        this.enRotating.setPosition(rootPos.x + x, rootPos.y, rootPos.z + z);
    }
    private updateBlade(dt:number)
    {
        this.enRoot.update(dt);
        this.enRotating.update(dt);
    }


}