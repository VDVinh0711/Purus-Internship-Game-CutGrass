
import * as pc from 'playcanvas';
import { PowerUpItem } from './PowerUpItem';
import { LevelManager } from '../Level/LevelManager';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
import { ChestReward } from './ChestReward';
import { ItemHelper } from './itemhelper';
export class ItemHelperManager extends pc.Entity
{
    private items : ItemHelper[]  = [];
    
    constructor()
    {   
        super();
        this.registerEvent();
    }

    private registerEvent()
    {
        EventManager.on(SafeKeyEvent.SpawmItemHelper, this.spawmItemHeplerCurMap.bind(this));
        EventManager.on(SafeKeyEvent.ClearsItemsHelper, this.clearItemsHepler.bind(this));
    }

    private spawmItemHeplerCurMap()
    {
        let pos =  LevelManager.getInstance().getPosSpawmMaps();

        let indexSpawmPoweUp = this.randomIndex(pos.length-1);
        this.spawmItemPowerUp(pos[indexSpawmPoweUp]);


        let indexSpawmChest = this.randomIndex(pos.length-1);
        this.spawmChestReward(pos[indexSpawmChest]);
       
    }

    private randomIndex(  end : number) : number
    {
       return  Math.floor(Math.random()* end);
    }

    private spawmItemPowerUp(posSpawm : pc.Vec3)
    {
        const itemSpawm = new PowerUpItem();
        itemSpawm.setPosition(posSpawm);
        this.items.push(itemSpawm);
        this.addChild(itemSpawm);
        
    }

    private spawmChestReward(posSpawm : pc.Vec3)
    {
        const chessReward = new ChestReward();
        this.addChild(chessReward);
        this.items.push();
        chessReward.setPosition(new pc.Vec3(posSpawm.x,posSpawm.y+1, posSpawm.z));

    }

    private clearItemsHepler()
    {
        this.items.forEach(item => {
            
            item.destroy();
        });
        this.items.length = 0;
    }
}