import * as pc from 'playcanvas';
import { ItemType } from './TypeItem';
import { BladeManager } from '../BladeManger/BladeManager';

export abstract class ItemHelper extends pc.Entity
{
    private itemType : ItemType;
    constructor(itemType : ItemType)
    {
        super();
        this.itemType = itemType;
        
    }
    public getType():ItemType
    {
        return this.itemType;
    }
    public abstract onCollision(bladeManager : BladeManager) : void;
}