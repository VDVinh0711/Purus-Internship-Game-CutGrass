
import * as pc from 'playcanvas';
import { ItemHelper } from './ItemHelper';
import { ItemType } from './TypeItem';
import { LevelManager } from '../Level/LevelManager';
import { EventManager } from '../Utils/Observer';
import { SafeKeyEvent } from '../Helper/SafeKeyEvent';
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
       this.spawmItemHelper(pos[4]);
       
    }
    private spawmItemHelper(posSpawm : pc.Vec3)
    {
        const itemSpawm = new ItemHelper(ItemType.powerUp);
        itemSpawm.setPosition(posSpawm);
        this.items.push(itemSpawm);
        this.addChild(itemSpawm);
    }

    private clearItemsHepler()
    {
        this.items.forEach(item => {
            item.destroy();
        });
        this.items.length = 0;
    }
}