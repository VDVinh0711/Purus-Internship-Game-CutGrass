import * as pc from 'playcanvas'
export class Rope extends pc.Entity
{
    constructor(name:string)
    {
        super();
        this.name = name;
    }

    public Init() : Rope
    {
        this.setLocalScale(0.1,0.1,3);
        this.setLocalRotation(0,0,0);

        this.AddComponent();
        this.setRender();
        this.setRigidbody();
        this.setcollision();

       
        return this;
    }

    private AddComponent()
    {
        this.addComponent('collision');
        this.addComponent('rigidbody');
        this.addComponent('render');
    }
    private setcollision()
    {
        if(this.collision == null) return;
        this.collision.type  = 'box';
        this.collision.halfExtents = new pc.Vec3(0.1,0.1,3);

        this.collision?.on('collisionstart',this.eventColision.bind(this));

    }

    private setRigidbody()
    {
        if(this.rigidbody == null) return;
        this.rigidbody.type = pc.RIGIDBODY_TYPE_KINEMATIC;
        this.rigidbody.mass = 1;
        this.rigidbody.restitution = 0.5; 
    }

    private setRender()
    {
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