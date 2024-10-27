import { ImodelChaiSaw } from "../Interface/Imodeltexure";

export class ItemDataShop
{
    private dataModel !: ImodelChaiSaw;
    private price !: number;
    private isBought : boolean = false;
    private imgIcon !: pc.Asset; 
    private isActive : boolean = false;


    private onDataChangeCallback: (() => void) | null = null;

    constructor(data : ImodelChaiSaw , price : number, icon : pc.Asset)
    {
        this.dataModel = data;
        this.price =price;
        this.imgIcon = icon;
    }



    public registerUpdateCallback(callback: () => void): void {
        this.onDataChangeCallback = callback;
    }

    public unregisterUpdateCallback(): void {
        this.onDataChangeCallback = null;
    }

    public getIsBought() : boolean
    {
        return this.isBought;
    }

    public setIsBought(value : boolean)
    {
        this.isBought = value;
        this.onChangeItemData();
    }

    public getDataModel(): ImodelChaiSaw
    {
        return this.dataModel;
    }

    public getPrice() : number
    {
        return this.price;
    }

    public getIcon() : pc.Asset
    {
        return this.imgIcon;
    }

    public getActive() : boolean
    {
        return this.isActive;
    }
    
    public setAcitve(value : boolean)
    {
        this.isActive = value;
        this.onChangeItemData();
    }

    private onChangeItemData()
    {
        if (this.onDataChangeCallback) {
            this.onDataChangeCallback();
        }
    }


}