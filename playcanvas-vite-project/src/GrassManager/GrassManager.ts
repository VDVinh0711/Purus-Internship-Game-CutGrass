import * as pc from 'playcanvas';
import { Grass } from './Grass';
import { PoolingGrass } from '../Utils/PoolingGrass';
import EntityManager from '../Entity/EntityManager';
import { SafeNameEntity } from '../Helper/SafeNameEntity';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { LevelManager } from '../Level/LevelManager';
export class GrassManager extends pc.Entity {
    private grasses: Grass[] = [];
    constructor() {
        super();
        this.setUpBegin();
    }


    private setUpBegin()
    {
        //regis entity
        EntityManager.getInstance().registerEntity(SafeNameEntity.GrassManager,this);
        //regis event
        EventManager.on(SafeKeyEvent.ClearGrasses,this.clearGrass.bind(this));
        EventManager.on(SafeKeyEvent.SpawmGrassFromCurMap, this.SpawmGrassCurrenMap.bind(this));
    }


    public SpawmGrassCurrenMap()
    {
        this.SpawmGrass(LevelManager.getInstance().getPosSpawmMaps());
    }
    private SpawmGrass(posSpawms :pc.Vec3[])
    {
        posSpawms.forEach(posSpawm => {
            this.createGrassInstance(posSpawm);
        });

    }
    private createGrassInstance(pos : pc.Vec3): pc.Entity {
        const grass = PoolingGrass.getInstance().spawmGrass();
        grass.setPosition(pos.x, pos.y+0.5, pos.z);
        grass.rotate(0,Math.random() * 600,0);
        grass.enabled = true;
        this.addChild(grass); 
        this.grasses.push(grass);
        return grass;
    }

    private clearGrass()
    {
        this.grasses.forEach(grass => {  
            PoolingGrass.getInstance().deSpawmGrass(grass); 
        });
        this.grasses.length = 0;
    }

    public getCountGrass() : number
    {
        return this.grasses.length;
    }

}