import * as pc from 'playcanvas';
import { ItemType } from './TypeItem';

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
    public abstract onColisionEnter(result : any) : void;
}