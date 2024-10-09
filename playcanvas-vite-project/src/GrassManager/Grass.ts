import * as pc from 'playcanvas'

export class Grass  extends pc.Entity
{
    private material!: pc.Material;
    constructor()
    {
        super();
        this.name = 'grass';
        this.init();
    }

    init() 
    {
        this.material = this.createMaterial();
        this.addComponent('render', { type: 'box' , material: this.material });
        this.setLocalScale(0.2,2, 0.2);
        this.addComponent('rigidbody', {
            type: pc.BODYTYPE_KINEMATIC,
            mass: 1,
            restitution: 0.5
        });
        this.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.1, 1, 0.1)
        });
        return this;
    }

    private createMaterial() : pc.Material
    {
        const material = new pc.StandardMaterial();
        material.diffuse = new pc.Color(0.56, 0.93, 0.56); // Red color
        material.metalness = 0.7;
        material.update();
        return material;
    }

    
}