

import * as pc from 'playcanvas'
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';

import levelData from './level.json';
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



    public async loadData(): Promise<void> {
        try {
            this.parseLevelsData(levelData);
            console.log('Level data loaded successfully');
        } catch (error) {
            console.error('Error parsing level data:', error); 
        }
    }

    private parseLevelsData(jsonData: any) {
        if (!jsonData.levels || !Array.isArray(jsonData.levels)) {
            throw new Error('Invalid JSON structure: missing or invalid levels array');
        }

        this.levels = jsonData.levels.map((level: any) => ({
            maps: level.maps.map((map: any) => ({
                posSpawmBlade: new pc.Vec3().set(
                    map.posSpawmBlade[0],
                    map.posSpawmBlade[1],
                    map.posSpawmBlade[2]
                ),
                spawnPoints: map.spawnPoints.map((point: number[]) =>
                    new pc.Vec3().set(point[0], point[1], point[2])
                )
            }))
        }));
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
        return this.levels[this.currentlevel].maps[this.currentmap].spawnPoints;
    }
    public getPosSpawmBlade() : pc.Vec3
    {
        return  this.levels[this.currentlevel].maps[this.currentmap].posSpawmBlade
    }
}