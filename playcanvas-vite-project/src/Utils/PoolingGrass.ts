
import { Grass } from '../GrassManager/Grass';
export class PoolingGrass
{
    private poolHolder : Grass[] = []
    private static instances : PoolingGrass;
    private constructor(){
        this.createGrass();
    }
    public static getInstance() : PoolingGrass
    {
        if(PoolingGrass.instances == null)
        {
           
            PoolingGrass.instances = new PoolingGrass();

        }
        return PoolingGrass.instances;
    }

    private createGrass()
    {
        for(let i = 0 ;i< 20 ;i++)
        {
            const newGrass = new Grass();
            this.poolHolder.push(newGrass);
        }
    }

    public spawmGrass(): Grass {
      //  if (this.poolHolder.length <= 0) {
          return new Grass();
     //  }
       // return this.poolHolder.pop()!;
    }

    public deSpawmGrass(grass : Grass)
    {
        grass.setPosition(1,0,1);
        grass.setRotation(0,0,0);
        grass.enabled = false;
        this.poolHolder.push(grass);
    }
    public getCount () : number
    {
        return this.poolHolder.length;
    }
}