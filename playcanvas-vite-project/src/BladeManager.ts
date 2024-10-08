import * as pc from 'playcanvas';

export class BladeManager extends pc.Entity {

    private blade1!: pc.Entity;
    private blade2!: pc.Entity;
    private angle: number = 0;
    private radius: number = 3;
    private speed : number = 2;
    private dir: number = 1;
    private rope !: pc.Entity;

    
 
    constructor()
    {
        super();
        this.Init();
    }

    private Init( )
    {
        this.blade2 = this.createBlade(new pc.Vec3(0, 0, 0));
        this.blade1 = this.createBlade(new pc.Vec3(2, 0, 0));
        this.rope = this.createRope();
        this.setupMouseHandler();
    }


    //create blade
    private createBlade(position: pc.Vec3): pc.Entity {
        const blade = new pc.Entity('blade');
        const material = this.createMaterial();
        blade.addComponent('model', { type: 'box', Material : material });
        blade.setPosition(position);
        blade.setLocalScale(1.5, 0.3, 0.1);
        blade.addComponent('rigidbody', {
            type: 'kinematic',
            mass: 1,
            restitution: 0.5
        });
        blade.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.75, 0.15, 0.05)
        });
        this.reigisterEventColision(blade);
        this.root.addChild(blade);
        return blade;
    }


    

    //material
    private createMaterial():pc.Material
    {
        const newmaterial = new pc.StandardMaterial();
        newmaterial.diffuse.set(1,0,0);
        newmaterial.specular.set(1,1,1,);
        newmaterial.update();

        return newmaterial;
    }




    private createRope(): pc.Entity
    {
        const newRope =  new pc.Entity('rope');

        newRope.addComponent('model', {
            type :'box'
        })
        newRope.setLocalScale(0.2,0.2,3);
        this.root.addChild(newRope);
        return newRope;
    }

    private updateRope(dt : number) 
    {
        const posA = this.blade1.getPosition().clone();
        const posB = this.blade2.getPosition().clone();


        const midPoint =  new pc.Vec3((posA.x + posB.x)/2 , (posA.y + posB.y)/2 ,(posA.z + posB.z)/2 );
        this.rope.setPosition(midPoint);


        let posRotating = this.blade1.getPosition();
        let posRoot = this.blade2.getPosition();
       
        
        let dir = this.blade2.getPosition().clone().sub(this.rope.getPosition().clone());
        this.rope.lookAt(dir.x, dir.y , dir.z , 1,0,0);
    
        console.log(this.rope.forward + "-----" + dir);
       
   // this.rope.rotate(0,10 * dt,0);

    }



    //event blade colision
    private reigisterEventColision(blade : pc.Entity)
    {
        blade.collision?.on('collisionstart', (result)=>
        {
            console.log(result.other.name);
        });
    }

    //event mouse
    private setupMouseHandler() {
        const mouse = new pc.Mouse(document.body);
        mouse.on('mousedown', () => {
            this.dir *= -1;
            this.angle += Math.PI;
            [this.blade1, this.blade2] = [this.blade2, this.blade1];
        });
    }


    //update
    public update(dt: number) {
        this.blade1.rotate(0, 2000 * dt, 0);
        this.blade2.rotate(0, 2000 * dt, 0);

        this.angle += this.dir * (this.speed * dt);
        const rootPos = this.blade1.getPosition();
        const x = Math.cos(this.angle) * this.radius;
        const z = Math.sin(this.angle) * this.radius;
        this.blade2.setPosition(rootPos.x + x, rootPos.y, rootPos.z + z);

        this.updateRope(dt);
    }
}