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
        this.setLocalScale(0.2,0.2,3);
        this.setLocalRotation(0,0,0);
        this.addComponent('model', {
            type: 'box'
        })
        this.addComponent('rigidbody', {
            type: 'kinematic',
            mass: 1,
            restitution: 0.5
        });
        this.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.1, 0.1, 3)
        });


        this.collision?.on('collisionstart', (result)  => 
            {
                if(result.other.name != 'grass') return;
                console.log(result.other.name);
                result.other.destroy();
            });

        return this;
    }


    public updateRope(posRoot : pc.Vec3 , posRotating : pc.Vec3)
    {
        const midPoint = new pc.Vec3((posRoot.x + posRotating.x) / 2, (posRoot.y + posRotating.y) / 2, (posRoot.z + posRotating.z) / 2);
        this.setPosition(midPoint);
        this.lookAt(posRotating);
    }
}