import { ItemHelper } from "../ItemHelper/ItemHelper";
import { ItemType } from "../ItemHelper/TypeItem";
import { BladeManager } from "./BladeManager";

export class BladeStat
{
    private bladeManager : BladeManager;
    private isPowering : boolean = false;
    private timeCountDown : number = 0;


    private radiusOrigin !: number;
    private speedOrigin !: number;
    constructor(bladeManager : BladeManager)
    {
        this.bladeManager = bladeManager;
        this.radiusOrigin = bladeManager.getRadius();
        this.speedOrigin = bladeManager.getSpeed();
       
    }


    public getIsPowering()
    {
        return this.isPowering;
    }
    public setIsPowering(value : boolean)
    {
        this.isPowering = value;
        if(value == false)
        {
            this.endStats();
        }
    }

    public reciveItemHelper(item : ItemHelper)
    {
        this.isPowering = true;
        this.timeCountDown = item.duration;
        switch (item.type)
        {
            case  ItemType.powerUp :
                {
                    this.applyPowerUpEffects();
                }
        }
        
    }

    public update(dt:number)
    {
        if(!this.isPowering) return;
        this.timeCountDown -= dt;
        if(this.timeCountDown >0) return;
        this.endStats();
    }


    private endStats()
    {
        this.isPowering = false; 
        this.bladeManager.setRadiusBaldes(this.radiusOrigin);
        this.bladeManager.setSpeedRotate(this.speedOrigin);
    }

    private applyPowerUpEffects()
    {
        this.bladeManager.setRadiusBaldes(6);
        this.bladeManager.setSpeedRotate(7);
    }
}