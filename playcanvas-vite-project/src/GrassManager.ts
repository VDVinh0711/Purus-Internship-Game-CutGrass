import * as pc from 'playcanvas';

export class GrassManager {
    private grasses: pc.Entity[] = [];

    constructor(private app: pc.Application) {
        this.createGrass();
    }

    private createGrass() {
        for (let i = -10; i < 10; i += 1) {
            for (let j = -10; j < 10; j += 1) {
                this.grasses.push(this.createGrassInstance(i, 0, j));
            }
        }
    }

    private createGrassInstance(x: number, y: number, z: number): pc.Entity {
        const grass = new pc.Entity('grass');
        grass.addComponent('model', { type: 'sphere' });
        grass.setPosition(x, y, z);
        grass.setLocalScale(1, 1, 1);
        // grass.addComponent('rigidbody', {
        //     type: 'dynamic',
        //     mass: 1,
        //     restitution: 0.5
        // });
        // grass.addComponent('collision', {
        //     type: 'sphere',
        //     radius: 0.5
        // });
        this.app.root.addChild(grass);
        return grass;
    }
}