import * as pc from 'playcanvas'
export class Rope extends pc.Entity
{

    private readonly scaleX : number = 0.1;
    private readonly scaleY : number = 0.1;
    private scaleZ : number = 3;
    constructor(name:string)
    {
        super();
        this.name = name;
    }

    public Init() : Rope
    {
        this.setLocalScale(this.scaleX,this.scaleY,this.scaleZ);
        this.setLocalRotation(0,0,0);
        this.AddComponent();
        return this;
    }

    private AddComponent()
    {
       this.setRender();
       this.setRigidbody();
       this.setcollision();
       
       
    }
    private setcollision()
    {
        this.addComponent('collision');
        if(this.collision == null) return;
        this.collision.type  = 'box';
        this.collision.halfExtents = new pc.Vec3(this.scaleX/2,this.scaleY/2.1,this.scaleZ);
        this.collision.on('collisionstart',this.eventColision.bind(this));

    }

    public setWidthRope(scaleZ : number)
    {
        this.scaleZ = scaleZ;
        this.setLocalScale(this.scaleX,this.scaleY,this.scaleZ);
        if(this.collision == null) return;
        this.collision.halfExtents = new pc.Vec3(this.scaleX/2,this.scaleY/2.1,this.scaleZ/2);
    }

    private setRigidbody()
    {
        this.addComponent('rigidbody');
        if(this.rigidbody == null) return;
        this.rigidbody.type = pc.RIGIDBODY_TYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5; 
    }

    private setRender()
    {
        this.addComponent('render');
        if(this.render == null) return;
        this.render.type = 'box';
    }


    //call event when coli
    private eventColision(result : any)
    {
        this.fire('rope:collision',result);
    }

    public updateRope(posRoot : pc.Vec3 , posRotating : pc.Vec3)
    {
        const midPoint = new pc.Vec3((posRoot.x + posRotating.x) / 2, (posRoot.y + posRotating.y) / 2, (posRoot.z + posRotating.z) / 2);
        this.setPosition(midPoint);
        this.lookAt(posRotating);
    }

    
}