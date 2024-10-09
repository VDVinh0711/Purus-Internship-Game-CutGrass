
import * as pc from 'playcanvas'
export class Blade extends pc.Entity {
    constructor(name: string) {
        super();
        this.name = name;
    }

    public Init(position: pc.Vec3): Blade {

    
        //material
        const material = new pc.StandardMaterial();
        material.diffuse = new pc.Color(1, 0, 0); 
        material.metalness = 0.7;
        material.update();

        this.addComponent('render', {type: 'box',
            material : material
        })
        this.setPosition(position);
        this.setLocalScale(1.5, 0.3, 0.1);
        this.addComponent('rigidbody', {
            type: 'kinematic',
            mass: 1,
            restitution: 0.5
        });
        this.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.75, 0.15, 0.05)
        });
        this.collision?.on('collisionstart', this.onColisionEnter.bind(this));
        
        
        return this;
    }

    private onColisionEnter(result : any) {
        this.fire('blade:collision', result);
    }


    public update(dt: number) {
        this.rotate(0, 2000 * dt, 0);
    }
}