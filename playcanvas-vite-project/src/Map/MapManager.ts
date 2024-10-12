import * as pc from 'playcanvas'
import { Ground } from './Ground';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import EntityManager from '../Entity/EntityManager';
import { SafeNameEntity } from '../Helper/SafeNameEntity';
import { LevelManager } from '../Level/LevelManager';
import { PoolingGround } from '../Utils/PoolingGround';

export class MapManager extends pc.Entity
{
    private width : number = 10;
    private height :number = 10 ;
    private space  :number = 1;
    private grounds : Ground[] = [];
    constructor()
    {
      super();
      this.setUpBegin();
    }


    
    private setUpBegin()
    {
        EntityManager.getInstance().registerEntity(SafeNameEntity.MapManager, this);
        EventManager.on(SafeKeyEvent.ClearGround, this.clearMap.bind(this));
        EventManager.on(SafeKeyEvent.SpawmGroundFromCurMap, this.SpawmGroundCurrentMap.bind(this));
    }

    //draw line to debug
    private createGridMap()
    {
        for(let i = -10 ;i<= this.width;i+=this.space)
        {
            pc.Application.getApplication()?.drawLine(new pc.Vec3(i,1,-10), new pc.Vec3(i,1,10) , new pc.Color(1,1,0) );
        }

        for(let i = -10 ;i<= this.height;i+=this.space)
        {
            pc.Application.getApplication()?.drawLine(new pc.Vec3(-10,1,i), new pc.Vec3(this.width,1,i) , new pc.Color(1,0,0)  );
        }
    }


    public SpawmGroundCurrentMap()
    {
       this.Spawmmap(LevelManager.getInstance().getPosSpawmMaps());
    }

    private Spawmmap(listPosSpawm : pc.Vec3[])
    {
        console.log(listPosSpawm.length);
         listPosSpawm.forEach(posSpawm => {
         
            const groundSpawm = PoolingGround.getInstance().spawmGround();
            groundSpawm.setPosition(posSpawm);
            groundSpawm.enabled = true;
            this.grounds.push(groundSpawm);
            this.root.addChild(groundSpawm);
         });   

    }


    private clearMap()
    {
      this.grounds.forEach(ground => {
       PoolingGround.getInstance().deSpawmGround(ground);
      });
    }
    update(dt:number)
    {
      this.createGridMap();
    }
}