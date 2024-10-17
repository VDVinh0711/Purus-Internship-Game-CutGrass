

import * as pc from 'playcanvas'
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
interface Map {
    posSpawmBlade : pc.Vec3;
    spawnPoints: pc.Vec3[];
  }
  
  interface Level {
    maps: Map[];
}

export class LevelManager 
{
    private static instance : LevelManager;

    private levels : Level[] = [];
    private currentlevel : number = 0;
    private currentmap : number =0;


    constructor(){
        this.createData();
    }

    public static getInstance() : LevelManager
    {
        if(LevelManager.instance == null)
        {
            LevelManager.instance  = new LevelManager();
        }
        return LevelManager.instance;
    }

    public getCurrentLevel() : number
    {
        return this.currentlevel;
    }
    public getCurrentMap() : number
    {
        return this.currentmap;
    }

    public getTotalMaps() : number
    {
        return this.levels[this.currentlevel].maps.length;
    }

    private createData()
    {
        const pcPoints = [];
        for(let i = -10 ; i<= 10;i++)
        {
            for(let j = -10 ; j<= 10 ;j++)
            {
                // if(i<j) continue;
                pcPoints.push(new pc.Vec3(i,0,j));
            }
        }

        const pcPoints2= [];
        for(let i = -10 ; i<= 10;i++)
        {
            for(let j = -10 ; j<= 10 ;j++)
            {
                if(i>j) continue;
                pcPoints2.push(new pc.Vec3(i,0,j));
            }
        }


        
        const pcPoints3= [];
        for(let i = -5 ; i<= 5;i++)
        {
            for(let j = -5 ; j<= 5 ;j++)
            {
                pcPoints3.push(new pc.Vec3(i,0,j));
            }
        }

        const level1: Level = {
            maps: [
                {
                    posSpawmBlade: new pc.Vec3(-3.5,1,-3.5),
                    spawnPoints: pcPoints
                },
                {
                    posSpawmBlade: new pc.Vec3(-2.5,1,2.5),
                    spawnPoints: pcPoints2
                },
                {
                    posSpawmBlade: new pc.Vec3(-3.5,1,-3.5),
                    spawnPoints: pcPoints
                }
            ]
        };


        this.levels.push(level1);
        this.levels.push(level1);
    }

    public nextLevel()
    {
        this.currentlevel++;
        EventManager.emit(SafeKeyEvent.OnChangeLevel,this.currentlevel);
        this.currentmap = 0;
        EventManager.emit(SafeKeyEvent.OnChangeMap,this.currentmap);
    }
    public nextMap()
    {
        this.currentmap++;
        EventManager.emit(SafeKeyEvent.OnChangeMap,this.currentmap);
    }
    public canNextoLevel () : boolean
    {
        return this.levels[this.currentlevel].maps.length -1  == this.currentmap;
    }
    public getPosSpawmMaps() : pc.Vec3[]
    {
       
        return this.levels[this.currentlevel].maps[this.currentmap].spawnPoints
       ;
    }
    public getPosSpawmBlade() : pc.Vec3
    {

        return  this.levels[this.currentlevel].maps[this.currentmap].posSpawmBlade
       
    }
}