
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
      if(this.poolHolder.length <=0)
      {
            return new Ground();
      }
      return this.poolHolder.pop()!;
    }

    public deSpawmGround(ground: Ground) {
        ground.enabled = false;
        this.poolHolder.push(ground);
    }

    public getCount(): number {
        return this.poolHolder.length;
    }
}   