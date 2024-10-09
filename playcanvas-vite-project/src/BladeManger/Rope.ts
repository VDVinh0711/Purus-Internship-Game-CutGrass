import * as pc from 'playcanvas'
export class Rope extends pc.Entity
{
    public actionColiwithGrass : any;
    constructor(name:string)
    {
        super();
        this.name = name;
    }

    public Init() : Rope
    {
        this.setLocalScale(0.1,0.1,3);
        this.setLocalRotation(0,0,0);
        this.setRender();
        this.setRigidbody();
        this.setcollision();

       
        return this;
    }

    private setcollision()
    {
        this.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.1, 0.1, 3)
        });

        this.collision?.on('collisionstart',this.eventColision.bind(this));

    }

    private setRigidbody()
    {
        this.addComponent('rigidbody', {
            type: 'kinematic',
            mass: 1,
            restitution: 0.5
        });
    }

    private setRender()
    {
        this.addComponent('render', {
            type: 'box'
        })
       
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