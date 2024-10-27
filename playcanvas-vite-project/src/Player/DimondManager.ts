import { SafeKeyEvent } from "../Helper/SafeKeyEvent";
import { EventManager } from "../Utils/Observer";

export class DimondManager 
{

    private countDimond : number = 0;
    private static instance : DimondManager;
    constructor()
    {

    }

    public static getInstace() : DimondManager
    {
        if(DimondManager.instance == null)
        {
            DimondManager.instance = new DimondManager();
        }
        return DimondManager.instance;
    }



    public getDimond() : number
    {
        return this.countDimond;
    }

    public addDimond(count : number) 
    {
        this.countDimond += count;
        EventManager.emit(SafeKeyEvent.OnChangeDimond, this.countDimond);
    }
    
    public canReduceDimond(count : number) : boolean
    {
        if(this.countDimond < count) return false;
        return true;
    }
    public reduceDimond (count : number)
    {
        this.countDimond -= count;
        EventManager.emit(SafeKeyEvent.OnChangeDimond, this.countDimond);
    }
    
}