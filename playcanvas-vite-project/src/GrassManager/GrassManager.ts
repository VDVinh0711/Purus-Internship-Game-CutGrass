import * as pc from 'playcanvas';
import { Grass } from './Grass';
import { PoolingGrass } from './PoolingGrass';
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


    private setUpBegin() {
        //regis entity
        EntityManager.getInstance().registerEntity(SafeNameEntity.GrassManager, this);
        //regis event
        EventManager.on(SafeKeyEvent.ClearGrasses, this.clearGrass.bind(this));
        EventManager.on(SafeKeyEvent.SpawmGrassFromCurMap, this.SpawmGrassCurrenMap.bind(this));
    }


    public SpawmGrassCurrenMap() {
        this.SpawmGrass(LevelManager.getInstance().getPosSpawmMaps());
    }
    private SpawmGrass(posSpawms: pc.Vec3[]) {
        console.log(posSpawms.length);
        posSpawms.forEach(posSpawm => {
            this.spawmGrassInstance(new pc.Vec3(posSpawm.x,posSpawm.y,posSpawm.z));
            //  this.spawmGrassInstance(new pc.Vec3(posSpawm.x-0.2,posSpawm.y,posSpawm.z-0.2));
        });

    }
    private spawmGrassInstance(pos: pc.Vec3) {
        const grass = PoolingGrass.getInstance().spawmGrass(); 
        grass.setLocalPosition(pos.x, pos.y + 1, pos.z);
        grass.rotate(0, Math.random() * 600, 0);
        grass.enabled = true;
        this.addChild(grass);
        this.grasses.push(grass);
    }

    private clearGrass() {
        // this.grasses.forEach(grass => {
        //     PoolingGrass.getInstance().deSpawmGrass(grass);
        // });
        // this.grasses.length = 0;

        this.grasses.forEach(grass => {
            if(grass.enabled)
            {
                PoolingGrass.getInstance().deSpawmGrass(grass);
            }
           
        });
        this.grasses = [];
    }

    public getCountGrass(): number {
        return this.grasses.length;
    }

}