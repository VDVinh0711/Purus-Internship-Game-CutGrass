import * as pc from 'playcanvas';

export class GrassManager extends pc.Entity {
    private grasses: pc.Entity[] = [];

    constructor() {
        super();
       // this.createGrass();
    }

    private createGrass() {
        for (let i = -10; i <= 10; i += 1) {
            for (let j = -10; j <= 10; j += 1) {
                this.grasses.push(this.createGrassInstance(i, 0, j));
            }
        }
    }


    public SpawmGrass(posSpawms :pc.Vec3[])
    {
        posSpawms.forEach(posSpawm => {
            this.createGrassInstance(posSpawm.x, posSpawm.y+2,posSpawm.z);
        });

    }
    private createGrassInstance(x: number, y: number, z: number): pc.Entity {

        const material = new pc.StandardMaterial();

        // Customize the material properties
        material.diffuse = new pc.Color(0.56, 0.93, 0.56); // Red color
        material.metalness = 0.7;
        material.update();
        const grass = new pc.Entity('grass');
        grass.addComponent('render', { type: 'box' , material: material });
        grass.setPosition(x, y, z);
        grass.setLocalScale(0.2,2, 0.2);
        grass.addComponent('rigidbody', {
            type: pc.BODYTYPE_KINEMATIC,
            mass: 1,
            restitution: 0.5
        });
        grass.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.1, 1, 0.1)
        });
       this.root.addChild(grass);
        return grass;
    }
}