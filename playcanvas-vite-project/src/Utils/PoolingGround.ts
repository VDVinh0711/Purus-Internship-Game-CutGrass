
import { Ground } from '../Map/Ground';

export class PoolingGround {
    private poolHolder: Ground[] = [];
    private static instance: PoolingGround;

    private constructor() {
        this.createInitialGround();
    }

    public static getInstance(): PoolingGround {
        if (!PoolingGround.instance) {
            PoolingGround.instance = new PoolingGround();
        }
        return PoolingGround.instance;
    }

    private createInitialGround() {
        for (let i = 0; i < 20; i++) {
            const newGround = new Ground();
            newGround.enabled = false;
            this.poolHolder.push(newGround);
        }
    }

    public spawmGround(): Ground {
        let ground: Ground;
        if (this.poolHolder.length <= 0) {
            ground = new Ground();
        } else {
            ground = this.poolHolder.pop()!;
            console.log("Spawm from pool");
        }
        ground.enabled = true;
      //  ground.init(); // Re-initialize the ground
        return ground;
    }

    public deSpawmGround(ground: Ground) {
      
        // grass.removeComponent('render');
        // grass.removeComponent('rigidbody');
        // grass.removeComponent('collision');

       // grass.setLocalPosition(0, 0, 0);
       // grass.setLocalRotation(0, 0, 0, 1);
      //  grass.setLocalScale(1, 1, 1);

        ground.enabled = false;
        this.poolHolder.push(ground);
    }

    public getCount(): number {
        return this.poolHolder.length;
    }
}   