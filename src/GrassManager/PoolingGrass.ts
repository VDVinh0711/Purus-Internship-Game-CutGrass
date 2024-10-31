
import { Grass } from './Grass';

export class PoolingGrass {
    private poolHolder: Grass[] = [];
    private static instance: PoolingGrass;
   

    private constructor() {
        this.createInitialGrass();
    }

    public static getInstance(): PoolingGrass {
        if (!PoolingGrass.instance) {
            PoolingGrass.instance = new PoolingGrass();
        }
        return PoolingGrass.instance;
    }

    private createInitialGrass() {
        for (let i = 0; i < 20; i++) {
            const newGrass = new Grass();
            newGrass.enabled = false;
           
            this.poolHolder.push(newGrass);
        }
    }

    public spawmGrass(): Grass {
       if(this.poolHolder.length <=0)
       {
        return new Grass();
       }
       return this.poolHolder.pop()!;
    }


    public deSpawmGrass(grass: Grass) {
        grass.enabled = false;
        this.poolHolder.push(grass);
    }

    public getCount(): number {
        return this.poolHolder.length;
    }
}   